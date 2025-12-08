'use client'

import { useState } from 'react'
import StaggeredMenu from '@/components/StaggeredMenu'

interface Enquiry {
  id: number
  studentName: string
  parentName: string
  phone: string
  email: string
  occupation: string
  category: string
  message: string
  remarks: string
  date: string
  time: string
  status: 'New' | 'Contacted' | 'Not Responding' | 'Follow Up' | 'Enrolled' | 'Rejected'
  source: string
}

export default function AdminAdmissionsPage() {
  const [selectedStatus, setSelectedStatus] = useState('All')
  const [sortOrder, setSortOrder] = useState('newest')
  const [currentPage, setCurrentPage] = useState(1)
  const [showRemarksModal, setShowRemarksModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null)
  const [remarks, setRemarks] = useState('')
  const [editFormData, setEditFormData] = useState<Enquiry | null>(null)
  const [enquiries, setEnquiries] = useState<Enquiry[]>([
    {
      id: 1,
      studentName: 'Raj Kumar',
      parentName: 'Suresh Kumar',
      phone: '91086 94484',
      email: 'suresh@example.com',
      occupation: 'Business',
      category: 'Admission',
      message: 'Interested in admission for Grade 5',
      remarks: 'No remarks',
      date: '04/12/2025',
      time: '05:24 PM',
      status: 'New',
      source: 'Website'
    },
    {
      id: 2,
      studentName: 'Priya Sharma',
      parentName: 'Amit Sharma',
      phone: '98765 43210',
      email: 'amit@example.com',
      occupation: 'Engineer',
      category: 'Admission',
      message: 'Looking for Grade 3 admission',
      remarks: 'Called back',
      date: '03/12/2025',
      time: '02:15 PM',
      status: 'Contacted',
      source: 'Facebook'
    },
    {
      id: 3,
      studentName: 'Arjun Patel',
      parentName: 'Neha Patel',
      phone: '91234 56789',
      email: 'neha@example.com',
      occupation: 'Doctor',
      category: 'Visit',
      message: 'Want to schedule a campus visit',
      remarks: 'No remarks',
      date: '02/12/2025',
      time: '10:30 AM',
      status: 'New',
      source: 'Instagram'
    },
  ])

  const menuItems = [
    { label: 'Dashboard', ariaLabel: 'Go to dashboard', link: '/admin/dashboard' },
    { label: 'Admissions', ariaLabel: 'Manage admissions', link: '/admin/admissions' },
    { label: 'Event Gallery', ariaLabel: 'Manage events and gallery', link: '/admin/events' },
    { label: 'Analytics', ariaLabel: 'View analytics', link: '/admin/analytics' }
  ]

  const statusOptions = [
    { label: 'All', count: 458, color: 'bg-gray-100 text-gray-700' },
    { label: 'New', count: 323, color: 'bg-blue-100 text-blue-700' },
    { label: 'Contacted', count: 45, color: 'bg-yellow-100 text-yellow-700' },
    { label: 'Not Responding', count: 49, color: 'bg-orange-100 text-orange-700' },
    { label: 'Follow Up', count: 25, color: 'bg-purple-100 text-purple-700' },
    { label: 'Enrolled', count: 0, color: 'bg-green-100 text-green-700' },
    { label: 'Rejected', count: 16, color: 'bg-red-100 text-red-700' }
  ]

  const totalPages = Math.ceil(enquiries.length / 15)

  const handleStatusChange = (enquiryId: number, newStatus: string) => {
    console.log(`Changing status for ${enquiryId} to ${newStatus}`)
    setEnquiries(enquiries.map(enq => 
      enq.id === enquiryId ? { ...enq, status: newStatus as any } : enq
    ))
    alert(`Status changed to: ${newStatus}`)
  }

  const handleDelete = (enquiryId: number) => {
    if (confirm('Are you sure you want to delete this enquiry?')) {
      console.log(`Deleting enquiry ${enquiryId}`)
      setEnquiries(enquiries.filter(enq => enq.id !== enquiryId))
      alert('Enquiry deleted successfully')
    }
  }

  const handleRemarksSubmit = () => {
    if (selectedEnquiry) {
      console.log(`Saving remarks for enquiry ${selectedEnquiry.id}:`, remarks)
      setEnquiries(enquiries.map(enq => 
        enq.id === selectedEnquiry.id ? { ...enq, remarks: remarks } : enq
      ))
      alert('Remarks saved successfully')
    }
    setShowRemarksModal(false)
    setRemarks('')
    setSelectedEnquiry(null)
  }

  const handleEditClick = (enquiry: Enquiry) => {
    setEditFormData({ ...enquiry })
    setShowEditModal(true)
  }

  const handleEditSubmit = () => {
    if (editFormData) {
      console.log('Saving edited enquiry:', editFormData)
      setEnquiries(enquiries.map(enq => 
        enq.id === editFormData.id ? editFormData : enq
      ))
      alert('Enquiry updated successfully')
      setShowEditModal(false)
      setEditFormData(null)
    }
  }

  const getStatusBadgeColor = (status: string) => {
    const option = statusOptions.find(opt => opt.label === status)
    return option?.color || 'bg-gray-100 text-gray-700'
  }

  const filteredEnquiries = selectedStatus === 'All' 
    ? enquiries 
    : enquiries.filter(enq => enq.status === selectedStatus)

  const sortedEnquiries = [...filteredEnquiries].sort((a, b) => {
    if (sortOrder === 'newest') {
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    } else {
      return new Date(a.date).getTime() - new Date(b.date).getTime()
    }
  })

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
            {filteredEnquiries.length} enquiries
          </p>
        </header>

        {/* Status Filters */}
        <section className="mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {statusOptions.map((status) => (
              <button
                key={status.label}
                onClick={() => setSelectedStatus(status.label)}
                className={`p-4 border-2 transition-all duration-300 cursor-pointer ${
                  selectedStatus === status.label 
                    ? 'border-primary bg-primary/5' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="font-display text-3xl font-bold text-primary mb-2">
                  {status.count}
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
            Admission Enquiries
          </h2>
          <div className="flex items-center gap-4">
            <span className="font-body text-sm text-gray-600">Sort:</span>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="font-body px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
            >
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
            </select>
          </div>
        </div>

        {/* Data Table */}
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
              {sortedEnquiries.length === 0 ? (
                <tr>
                  <td colSpan={9} className="p-8 text-center font-body text-gray-500">
                    No enquiries found for this filter
                  </td>
                </tr>
              ) : (
                sortedEnquiries.map((enquiry) => (
                  <tr key={enquiry.id} className="hover:bg-secondary/30 transition-colors border-b border-gray-200 last:border-b-0">
                    <td className="p-4 font-body text-sm text-gray-700">
                      {enquiry.studentName || '.'}
                    </td>
                    <td className="p-4">
                      <div className="font-body text-sm text-gray-700">{enquiry.parentName || '.'}</div>
                      <div className="font-body text-xs text-gray-500">{enquiry.occupation || '.'}</div>
                    </td>
                    <td className="p-4">
                      <div className="font-body text-sm text-gray-700">{enquiry.phone}</div>
                      <div className="font-body text-xs text-gray-500">{enquiry.email || '.'}</div>
                    </td>
                    <td className="p-4 font-body text-sm text-gray-700">{enquiry.category}</td>
                    <td className="p-4 font-body text-sm text-gray-700 max-w-xs truncate">
                      {enquiry.message || '.'}
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => {
                          setSelectedEnquiry(enquiry)
                          setRemarks(enquiry.remarks)
                          setShowRemarksModal(true)
                        }}
                        className="font-body text-sm text-primary hover:text-[#6B0F6B] underline cursor-pointer"
                      >
                        {enquiry.remarks}
                      </button>
                    </td>
                    <td className="p-4">
                      <div className="font-body text-sm text-gray-700">{enquiry.date}</div>
                      <div className="font-body text-xs text-gray-500">{enquiry.time}</div>
                    </td>
                    <td className="p-4">
                      <select
                        value={enquiry.status}
                        onChange={(e) => handleStatusChange(enquiry.id, e.target.value)}
                        className={`font-body text-xs font-semibold px-3 py-1.5 rounded ${getStatusBadgeColor(enquiry.status)} border-0 focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer`}
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
                          onClick={() => handleEditClick(enquiry)}
                          className="font-body text-sm text-primary hover:text-[#6B0F6B] transition-colors cursor-pointer"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(enquiry.id)}
                          className="font-body text-sm text-red-600 hover:text-red-700 transition-colors cursor-pointer"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
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
              />
              <div className="flex gap-4">
                <button
                  onClick={() => {
                    setShowRemarksModal(false)
                    setRemarks('')
                    setSelectedEnquiry(null)
                  }}
                  className="flex-1 font-body font-semibold px-6 py-3 border-2 border-gray-300 text-gray-700 hover:border-gray-400 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleRemarksSubmit}
                  className="flex-1 font-body font-semibold px-6 py-3 bg-primary text-white hover:bg-[#6B0F6B] transition-colors cursor-pointer"
                >
                  Save
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
                    className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
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
                    className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block font-body text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={editFormData.email}
                    onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
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
                    className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
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
                    className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
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
                    className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
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
                    className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
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
                    value={editFormData.message}
                    onChange={(e) => setEditFormData({ ...editFormData, message: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none"
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
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none"
                  />
                </div>
              </div>

              <div className="flex gap-4 mt-6 pt-6 border-t border-gray-200">
                <button
                  onClick={() => {
                    setShowEditModal(false)
                    setEditFormData(null)
                  }}
                  className="flex-1 font-body font-semibold px-6 py-3 border-2 border-gray-300 text-gray-700 hover:border-gray-400 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleEditSubmit}
                  className="flex-1 font-body font-semibold px-6 py-3 bg-primary text-white hover:bg-[#6B0F6B] transition-colors cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}