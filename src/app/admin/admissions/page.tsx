'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import StaggeredMenu from '@/components/StaggeredMenu'

interface Enquiry {
  _id: string
  studentName: string
  parentName: string
  phone: string
  email?: string
  occupation: string
  category: string
  message?: string
  remarks: string
  status: 'New' | 'Contacted' | 'Not Responding' | 'Follow Up' | 'Enrolled' | 'Rejected'
  source: string
  createdAt: string
  updatedAt: string
}

interface InquiryStats {
  all: number
  new: number
  contacted: number
  notResponding: number
  followUp: number
  enrolled: number
  rejected: number
}

export default function AdminAdmissionsPage() {
  const router = useRouter()
  const [selectedStatus, setSelectedStatus] = useState('All')
  const [sortOrder, setSortOrder] = useState('newest')
  const [currentPage, setCurrentPage] = useState(1)
  const [showRemarksModal, setShowRemarksModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null)
  const [remarks, setRemarks] = useState('')
  const [editFormData, setEditFormData] = useState<Enquiry | null>(null)
  const [enquiries, setEnquiries] = useState<Enquiry[]>([])
  const [stats, setStats] = useState<InquiryStats>({
    all: 0,
    new: 0,
    contacted: 0,
    notResponding: 0,
    followUp: 0,
    enrolled: 0,
    rejected: 0
  })
  const [totalPages, setTotalPages] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [isUpdating, setIsUpdating] = useState(false)

  const menuItems = [
    { label: 'Dashboard', ariaLabel: 'Go to dashboard', link: '/admin/dashboard' },
    { label: 'Admissions', ariaLabel: 'Manage admissions', link: '/admin/admissions' },
    { label: 'Event Gallery', ariaLabel: 'Manage events and gallery', link: '/admin/events' },    { label: 'News & Events', ariaLabel: 'Manage news and events', link: '/admin/news-events' } // CHANGED HERE

  ]

  const statusOptions = [
    { label: 'All', key: 'all', color: 'bg-gray-100 text-gray-700' },
    { label: 'New', key: 'new', color: 'bg-blue-100 text-blue-700' },
    { label: 'Contacted', key: 'contacted', color: 'bg-yellow-100 text-yellow-700' },
    { label: 'Not Responding', key: 'notResponding', color: 'bg-orange-100 text-orange-700' },
    { label: 'Follow Up', key: 'followUp', color: 'bg-purple-100 text-purple-700' },
    { label: 'Enrolled', key: 'enrolled', color: 'bg-green-100 text-green-700' },
    { label: 'Rejected', key: 'rejected', color: 'bg-red-100 text-red-700' }
  ]

  // Check authentication
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/admin-login')
    }
  }, [router])

  // Fetch inquiries from API
  const fetchInquiries = async () => {
    setIsLoading(true)
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        router.push('/admin-login')
        return
      }

      const params = new URLSearchParams({
        status: selectedStatus,
        sort: sortOrder,
        page: currentPage.toString(),
        limit: '15'
      })

      const response = await fetch(`/api/inquiries?${params}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      })

      if (response.status === 401) {
        localStorage.removeItem('token')
        router.push('/admin-login')
        return
      }

      const data = await response.json()

      if (data.success) {
        setEnquiries(data.data || [])
        setStats(data.stats || {
          all: 0,
          new: 0,
          contacted: 0,
          notResponding: 0,
          followUp: 0,
          enrolled: 0,
          rejected: 0
        })
        setTotalPages(data.pagination?.totalPages || 1)
      } else {
        console.error('Failed to fetch inquiries:', data.message)
      }
    } catch (error) {
      console.error('Error fetching inquiries:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchInquiries()
  }, [selectedStatus, sortOrder, currentPage])

  const handleStatusChange = async (enquiryId: string, newStatus: string) => {
    console.log('🎯 [STATUS] Changing status:', enquiryId, 'to', newStatus)
    setIsUpdating(true)
    
    try {
      const token = localStorage.getItem('token')
      
      if (!token) {
        alert('Please login again')
        router.push('/admin-login')
        return
      }

      const response = await fetch(`/api/inquiries/${enquiryId}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ status: newStatus })
      })

      const data = await response.json()

      if (response.ok && data.success) {
        console.log('✅ [STATUS] Success!')
        await fetchInquiries()
      } else {
        console.error('❌ [STATUS] Failed:', data.message)
        alert('Failed to update status: ' + data.message)
      }
    } catch (error: any) {
      console.error('❌ [STATUS] Error:', error)
      alert('Error updating status: ' + error.message)
    } finally {
      setIsUpdating(false)
    }
  }

  const handleDelete = async (enquiryId: string) => {
    if (!confirm('Are you sure you want to delete this enquiry?')) {
      return
    }

    console.log('🗑️ [DELETE] Deleting:', enquiryId)

    try {
      const token = localStorage.getItem('token')
      
      if (!token) {
        alert('Please login again')
        router.push('/admin-login')
        return
      }

      const response = await fetch(`/api/inquiries/${enquiryId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      })

      const data = await response.json()

      if (response.ok && data.success) {
        console.log('✅ [DELETE] Success!')
        await fetchInquiries()
        alert('Enquiry deleted successfully')
      } else {
        console.error('❌ [DELETE] Failed:', data.message)
        alert('Failed to delete enquiry: ' + data.message)
      }
    } catch (error: any) {
      console.error('❌ [DELETE] Error:', error)
      alert('Error deleting enquiry: ' + error.message)
    }
  }

  const handleRemarksSubmit = async () => {
    if (!selectedEnquiry) return

    console.log('📝 [REMARKS] Saving for:', selectedEnquiry._id)
    setIsUpdating(true)
    
    try {
      const token = localStorage.getItem('token')
      
      if (!token) {
        alert('Please login again')
        router.push('/admin-login')
        return
      }

      const response = await fetch(`/api/inquiries/${selectedEnquiry._id}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ remarks })
      })

      const data = await response.json()

      if (response.ok && data.success) {
        console.log('✅ [REMARKS] Success!')
        setShowRemarksModal(false)
        setRemarks('')
        setSelectedEnquiry(null)
        await fetchInquiries()
        alert('Remarks saved successfully')
      } else {
        console.error('❌ [REMARKS] Failed:', data.message)
        alert('Failed to update remarks: ' + data.message)
      }
    } catch (error: any) {
      console.error('❌ [REMARKS] Error:', error)
      alert('Error updating remarks: ' + error.message)
    } finally {
      setIsUpdating(false)
    }
  }

  const handleEditClick = (enquiry: Enquiry) => {
    setEditFormData({ ...enquiry })
    setShowEditModal(true)
  }

  const handleEditSubmit = async () => {
    if (!editFormData) return

    console.log('✏️ [EDIT] Updating:', editFormData._id)
    setIsUpdating(true)

    try {
      const token = localStorage.getItem('token')
      
      if (!token) {
        alert('Please login again')
        router.push('/admin-login')
        return
      }

      const response = await fetch(`/api/inquiries/${editFormData._id}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          studentName: editFormData.studentName,
          parentName: editFormData.parentName,
          email: editFormData.email,
          phone: editFormData.phone,
          occupation: editFormData.occupation,
          category: editFormData.category,
          status: editFormData.status,
          message: editFormData.message,
          remarks: editFormData.remarks
        })
      })

      const data = await response.json()

      if (response.ok && data.success) {
        console.log('✅ [EDIT] Success!')
        setShowEditModal(false)
        setEditFormData(null)
        await fetchInquiries()
        alert('Enquiry updated successfully')
      } else {
        console.error('❌ [EDIT] Failed:', data.message)
        alert('Failed to update enquiry: ' + data.message)
      }
    } catch (error: any) {
      console.error('❌ [EDIT] Error:', error)
      alert('Error updating enquiry: ' + error.message)
    } finally {
      setIsUpdating(false)
    }
  }

  const getStatusBadgeColor = (status: string) => {
    const statusMap: Record<string, string> = {
      'New': 'bg-blue-100 text-blue-700',
      'Contacted': 'bg-yellow-100 text-yellow-700',
      'Not Responding': 'bg-orange-100 text-orange-700',
      'Follow Up': 'bg-purple-100 text-purple-700',
      'Enrolled': 'bg-green-100 text-green-700',
      'Rejected': 'bg-red-100 text-red-700'
    }
    return statusMap[status] || 'bg-gray-100 text-gray-700'
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' })
  }

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true })
  }

  if (isLoading && enquiries.length === 0) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
          <div className="text-primary text-xl font-display">Loading inquiries...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <StaggeredMenu
        position="right"
        items={menuItems}
        displayItemNumbering={false}
        menuButtonColor="#580B57"
        openMenuButtonColor="#580B57"
        changeMenuColorOnOpen={true}
        colors={['#D1A3FF', '#580B57']}
        accentColor="#580B57"
        logoUrl="/fulllogo.svg"
        isFixed={true}
        displaySocials={false}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-7xl">
        <header className="mb-12 md:mt-20">
          <h1 className="font-display text-5xl md:text-6xl font-bold text-primary mb-4 tracking-tight">
            Admission Enquiries
          </h1>
          <p className="font-body text-xl text-gray-600">
            {stats.all} total enquiries
          </p>
        </header>

        {/* Status Filters */}
        <section className="mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {statusOptions.map((status) => (
              <button
                key={status.label}
                onClick={() => {
                  setSelectedStatus(status.label)
                  setCurrentPage(1)
                }}
                className={`p-4 border-2 transition-all duration-300 cursor-pointer ${
                  selectedStatus === status.label 
                    ? 'border-primary bg-primary/5' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="font-display text-3xl font-bold text-primary mb-2">
                  {stats[status.key as keyof InquiryStats]}
                </div>
                <div className="font-body text-sm text-gray-600">
                  {status.label}
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Controls */}
        <div className="flex justify-between items-center mb-6 pb-6 border-b border-gray-200">
          <h2 className="font-display text-2xl font-semibold text-primary">
            {selectedStatus} Enquiries
          </h2>
          <div className="flex items-center gap-4">
            <span className="font-body text-sm text-gray-600">Sort:</span>
            <select
              value={sortOrder}
              onChange={(e) => {
                setSortOrder(e.target.value)
                setCurrentPage(1)
              }}
              className="font-body px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
            >
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
            </select>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <p className="mt-2 text-gray-600">Loading...</p>
          </div>
        )}

        {/* No Results */}
        {!isLoading && enquiries.length === 0 && (
          <div className="text-center py-12 border border-gray-200">
            <p className="text-xl text-gray-600 font-body">No enquiries found</p>
          </div>
        )}

        {/* Data Table */}
        {!isLoading && enquiries.length > 0 && (
          <div className="overflow-x-auto border border-gray-200">
            <table className="w-full">
              <thead className="bg-secondary">
                <tr>
                  <th className="font-body text-sm font-semibold text-primary text-left p-4 border-b border-gray-200">Student Info</th>
                  <th className="font-body text-sm font-semibold text-primary text-left p-4 border-b border-gray-200">Parent Details</th>
                  <th className="font-body text-sm font-semibold text-primary text-left p-4 border-b border-gray-200">Contact</th>
                  <th className="font-body text-sm font-semibold text-primary text-left p-4 border-b border-gray-200">Category</th>
                  <th className="font-body text-sm font-semibold text-primary text-left p-4 border-b border-gray-200">Message</th>
                  <th className="font-body text-sm font-semibold text-primary text-left p-4 border-b border-gray-200">Remarks</th>
                  <th className="font-body text-sm font-semibold text-primary text-left p-4 border-b border-gray-200">Date</th>
                  <th className="font-body text-sm font-semibold text-primary text-left p-4 border-b border-gray-200">Status</th>
                  <th className="font-body text-sm font-semibold text-primary text-left p-4 border-b border-gray-200">Actions</th>
                </tr>
              </thead>
              <tbody>
                {enquiries.map((enquiry) => (
                  <tr key={enquiry._id} className="hover:bg-secondary/30 transition-colors border-b border-gray-200 last:border-b-0">
                    <td className="p-4 font-body text-sm text-gray-700">
                      {enquiry.studentName || '-'}
                    </td>
                    <td className="p-4">
                      <div className="font-body text-sm text-gray-700">{enquiry.parentName || '-'}</div>
                      <div className="font-body text-xs text-gray-500">{enquiry.occupation || '-'}</div>
                    </td>
                    <td className="p-4">
                      <div className="font-body text-sm text-gray-700">{enquiry.phone}</div>
                      <div className="font-body text-xs text-gray-500">{enquiry.email || '-'}</div>
                    </td>
                    <td className="p-4 font-body text-sm text-gray-700 capitalize">{enquiry.category}</td>
                    <td className="p-4 font-body text-sm text-gray-700 max-w-xs truncate">
                      {enquiry.message || '-'}
                    </td>
                    <td className="p-4">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          setSelectedEnquiry(enquiry)
                          setRemarks(enquiry.remarks)
                          setShowRemarksModal(true)
                        }}
                        className="font-body text-sm text-primary hover:text-[#6B0F6B] underline cursor-pointer"
                      >
                        {enquiry.remarks || 'Add remarks'}
                      </button>
                    </td>
                    <td className="p-4">
                      <div className="font-body text-sm text-gray-700">{formatDate(enquiry.createdAt)}</div>
                      <div className="font-body text-xs text-gray-500">{formatTime(enquiry.createdAt)}</div>
                    </td>
                    <td className="p-4">
                      <select
                        value={enquiry.status}
                        onChange={(e) => {
                          e.stopPropagation()
                          handleStatusChange(enquiry._id, e.target.value)
                        }}
                        onClick={(e) => e.stopPropagation()}
                        disabled={isUpdating}
                        className={`font-body text-xs font-semibold px-3 py-1.5 rounded ${getStatusBadgeColor(enquiry.status)} border-0 focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer disabled:opacity-50`}
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Not Responding">Not Responding</option>
                        <option value="Follow Up">Follow Up</option>
                        <option value="Enrolled">Enrolled</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleEditClick(enquiry)
                          }}
                          className="font-body text-sm text-primary hover:text-[#6B0F6B] transition-colors cursor-pointer"
                        >
                          Edit
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDelete(enquiry._id)
                          }}
                          className="font-body text-sm text-red-600 hover:text-red-700 transition-colors cursor-pointer"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-between items-center mt-6">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="font-body px-6 py-2 border-2 border-gray-300 text-gray-700 hover:border-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              Prev
            </button>
            <span className="font-body text-gray-600">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="font-body px-6 py-2 border-2 border-gray-300 text-gray-700 hover:border-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* Remarks Modal */}
      {showRemarksModal && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowRemarksModal(false)
              setRemarks('')
              setSelectedEnquiry(null)
            }
          }}
        >
          <div className="bg-white w-full max-w-md" onClick={(e) => e.stopPropagation()}>
            <div className="p-8">
              <h3 className="font-display text-3xl font-bold text-primary mb-6">
                Edit Remarks
              </h3>
              <textarea
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary resize-none mb-6"
                placeholder="Add remarks..."
                disabled={isUpdating}
              />
              <div className="flex gap-4">
                <button
                  onClick={() => {
                    setShowRemarksModal(false)
                    setRemarks('')
                    setSelectedEnquiry(null)
                  }}
                  disabled={isUpdating}
                  className="flex-1 font-body font-semibold px-6 py-3 border-2 border-gray-300 text-gray-700 hover:border-gray-400 transition-colors cursor-pointer disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleRemarksSubmit}
                  disabled={isUpdating}
                  className="flex-1 font-body font-semibold px-6 py-3 bg-primary text-white hover:bg-[#6B0F6B] transition-colors cursor-pointer disabled:opacity-50"
                >
                  {isUpdating ? 'Saving...' : 'Save'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Enquiry Modal */}
      {showEditModal && editFormData && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowEditModal(false)
              setEditFormData(null)
            }
          }}
        >
          <div className="bg-white w-full max-w-2xl my-8" onClick={(e) => e.stopPropagation()}>
            <div className="p-8">
              <h3 className="font-display text-3xl font-bold text-primary mb-6">
                Edit Enquiry
              </h3>
              
              <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                {/* Student Name */}
                <div>
                  <label className="block font-body text-sm font-medium text-gray-700 mb-2">
                    Student Name
                  </label>
                  <input
                    type="text"
                    value={editFormData.studentName}
                    onChange={(e) => setEditFormData({ ...editFormData, studentName: e.target.value })}
                    disabled={isUpdating}
                    className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary transition-all disabled:opacity-50"
                  />
                </div>

                {/* Parent Name */}
                <div>
                  <label className="block font-body text-sm font-medium text-gray-700 mb-2">
                    Parent Name
                  </label>
                  <input
                    type="text"
                    value={editFormData.parentName}
                    onChange={(e) => setEditFormData({ ...editFormData, parentName: e.target.value })}
                    disabled={isUpdating}
                    className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary transition-all disabled:opacity-50"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block font-body text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={editFormData.email || ''}
                    onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })}
                    disabled={isUpdating}
                    className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary transition-all disabled:opacity-50"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block font-body text-sm font-medium text-gray-700 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={editFormData.phone}
                    onChange={(e) => setEditFormData({ ...editFormData, phone: e.target.value })}
                    disabled={isUpdating}
                    className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary transition-all disabled:opacity-50"
                  />
                </div>

                {/* Occupation */}
                <div>
                  <label className="block font-body text-sm font-medium text-gray-700 mb-2">
                    Parent's Occupation
                  </label>
                  <input
                    type="text"
                    value={editFormData.occupation}
                    onChange={(e) => setEditFormData({ ...editFormData, occupation: e.target.value })}
                    disabled={isUpdating}
                    className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary transition-all disabled:opacity-50"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block font-body text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={editFormData.category}
                    onChange={(e) => setEditFormData({ ...editFormData, category: e.target.value })}
                    disabled={isUpdating}
                    className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary transition-all disabled:opacity-50"
                  >
                    <option value="Admission">Admission</option>
                    <option value="Inquiry">Inquiry</option>
                    <option value="Visit">Visit</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Status */}
                <div>
                  <label className="block font-body text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    value={editFormData.status}
                    onChange={(e) => setEditFormData({ ...editFormData, status: e.target.value as any })}
                    disabled={isUpdating}
                    className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary transition-all disabled:opacity-50"
                  >
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Not Responding">Not Responding</option>
                    <option value="Follow Up">Follow Up</option>
                    <option value="Enrolled">Enrolled</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block font-body text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    value={editFormData.message || ''}
                    onChange={(e) => setEditFormData({ ...editFormData, message: e.target.value })}
                    disabled={isUpdating}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none disabled:opacity-50"
                  />
                </div>

                {/* Remarks */}
                <div>
                  <label className="block font-body text-sm font-medium text-gray-700 mb-2">
                    Remarks
                  </label>
                  <textarea
                    value={editFormData.remarks}
                    onChange={(e) => setEditFormData({ ...editFormData, remarks: e.target.value })}
                    disabled={isUpdating}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none disabled:opacity-50"
                  />
                </div>
              </div>

              <div className="flex gap-4 mt-6 pt-6 border-t border-gray-200">
                <button
                  onClick={() => {
                    setShowEditModal(false)
                    setEditFormData(null)
                  }}
                  disabled={isUpdating}
                  className="flex-1 font-body font-semibold px-6 py-3 border-2 border-gray-300 text-gray-700 hover:border-gray-400 transition-colors cursor-pointer disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleEditSubmit}
                  disabled={isUpdating}
                  className="flex-1 font-body font-semibold px-6 py-3 bg-primary text-white hover:bg-[#6B0F6B] transition-colors cursor-pointer disabled:opacity-50"
                >
                  {isUpdating ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
