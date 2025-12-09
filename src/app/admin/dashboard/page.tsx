'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import StaggeredMenu from '@/components/StaggeredMenu'

interface DashboardStats {
  totalEnquiries: number
  newEnquiries: number
  totalEvents: number
  publishedEvents: number
}

interface Activity {
  _id: string
  type: 'inquiry' | 'event' | 'news'
  title: string
  description: string
  createdAt: string
}

export default function AdminDashboard() {
  const router = useRouter()
  const [stats, setStats] = useState<DashboardStats>({
    totalEnquiries: 0,
    newEnquiries: 0,
    totalEvents: 0,
    publishedEvents: 0
  })
  const [recentActivities, setRecentActivities] = useState<Activity[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const menuItems = [
    { label: 'Dashboard', ariaLabel: 'Go to dashboard', link: '/admin/dashboard' },
    { label: 'Admissions', ariaLabel: 'Manage admissions', link: '/admin/admissions' },
    { label: 'Event Gallery', ariaLabel: 'Manage events and gallery', link: '/admin/events' },
    { label: 'News & Events', ariaLabel: 'Manage news and events', link: '/admin/news-events' }
  ]

  // Fetch dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          router.push('/admin-login')
          return
        }

        setIsLoading(true)

        // Fetch stats from multiple APIs
        const [enquiriesRes, eventsRes, newsEventsRes] = await Promise.all([
          fetch('/api/inquiries', {
            headers: { 'Authorization': `Bearer ${token}` }
          }),
          fetch('/api/events', {
            headers: { 'Authorization': `Bearer ${token}` }
          }),
          fetch('/api/news-events', {
            headers: { 'Authorization': `Bearer ${token}` }
          })
        ])
        

        if (enquiriesRes.status === 401) {
          localStorage.removeItem('token')
          router.push('/admin-login')
          return
        }

        // Process Enquiries
        const enquiriesData = await enquiriesRes.json()
        const totalEnquiries = enquiriesData.success ? enquiriesData.data.length : 0
        console.log(enquiriesData)
        // Calculate new enquiries (last 7 days)
        const sevenDaysAgo = new Date()
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
        
        const newEnquiries = enquiriesData.success 
          ? enquiriesData.data.filter((e: any) => new Date(e.createdAt) >= sevenDaysAgo).length 
          : 0

        // Process Events
        const eventsData = await eventsRes.json()
        const totalEvents = eventsData.success ? eventsData.data.length : 0
        console.log(eventsData)
        // Process News & Events
        const newsEventsData = await newsEventsRes.json()
        const publishedEvents = newsEventsData.success 
          ? newsEventsData.data.filter((item: any) => item.status === 'published').length 
          : 0
        console.log(newsEventsData)
        setStats({
          totalEnquiries,
          newEnquiries,
          totalEvents,
          publishedEvents
        })

        // Build recent activities from all sources
        const activities: Activity[] = []

        // Add recent enquiries
if (enquiriesData.success && enquiriesData.data && enquiriesData.data.length > 0) {
  enquiriesData.data.slice(0, 3).forEach((enquiry: any) => {
    // Safely extract student name and grade with fallbacks
    const studentName = enquiry.studentName || enquiry.name || 'Unknown Student'
    const grade = enquiry.grade || enquiry.class || enquiry.category || 'Not Specified'
    
    activities.push({
      _id: enquiry._id,
      type: 'inquiry',
      title: 'New Admission Enquiry',
      description: `${studentName} - ${grade}`,
      createdAt: enquiry.createdAt
    })
  })
}


        // Add recent events
        if (eventsData.success) {
          eventsData.data.slice(0, 2).forEach((event: any) => {
            activities.push({
              _id: event._id,
              type: 'event',
              title: 'Event Gallery Updated',
              description: event.title,
              createdAt: event.createdAt
            })
          })
        }

        // Add recent news & events
        if (newsEventsData.success) {
          newsEventsData.data.slice(0, 2).forEach((item: any) => {
            activities.push({
              _id: item._id,
              type: 'news',
              title: item.type === 'news' ? 'New Article Published' : 'New Event Created',
              description: item.title,
              createdAt: item.createdAt
            })
          })
        }

        // Sort by date and take top 5
        activities.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        setRecentActivities(activities.slice(0, 5))

      } catch (error) {
        console.error('Error fetching dashboard data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchDashboardData()
  }, [router])

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)
    
    if (diffInSeconds < 60) return 'Just now'
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`
    return `${Math.floor(diffInSeconds / 604800)} weeks ago`
  }

  const displayStats = [
    {
      title: 'Total Enquiries',
      value: stats.totalEnquiries.toString(),
      change: `+${stats.newEnquiries} this week`,
      positive: true
    },
    
    {
      title: 'Gallery Events',
      value: stats.totalEvents.toString(),
      change: 'Total gallery items',
      positive: true
    },
    {
      title: 'News & Events',
      value: stats.publishedEvents.toString(),
      change: 'Published items',
      positive: true
    }
  ]

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
          <div className="text-primary text-xl font-display">Loading dashboard...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* StaggeredMenu Navigation */}
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
        showLogout={true}
      />

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-7xl">
        {/* Header */}
        <header className="mb-12 md:mt-20">
          <div className="flex items-center justify-between mb-2">
            <h1 className="font-display text-5xl md:text-6xl font-bold text-primary tracking-tight">
              Dashboard
            </h1>
            <div className="font-body text-sm text-gray-500">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </div>
          </div>
          <p className="font-body text-xl text-gray-600">
            Welcome back, Admin
          </p>
        </header>

        {/* Stats Grid */}
        <section className="mb-16">
          <h2 className="font-display text-3xl font-semibold text-primary mb-8">
            Overview
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayStats.map((stat, index) => (
              <div 
                key={index}
                className="border border-gray-200 p-6 hover:border-primary transition-colors duration-300"
              >
                <div className="font-body text-sm text-gray-500 mb-2 uppercase tracking-widest">
                  {stat.title}
                </div>
                <div className="flex items-end justify-between">
                  <div className="font-display text-4xl font-bold text-primary">
                    {stat.value}
                  </div>
                  {stat.change && (
                    <div className={`font-body text-sm font-semibold ${
                      stat.positive ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.change}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Actions */}
        <section className="mb-16">
          <h2 className="font-display text-3xl font-semibold text-primary mb-8">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <button 
              onClick={() => router.push('/admin/admissions')}
              className="border-2 border-primary p-6 hover:bg-primary hover:text-white transition-all duration-300 group text-left"
            >
              <div className="font-display text-2xl font-semibold text-primary group-hover:text-white mb-2">
                Admissions
              </div>
              <div className="font-body text-gray-600 group-hover:text-white/90">
                Manage student applications and enrollment
              </div>
            </button>

            <button 
              onClick={() => router.push('/admin/events')}
              className="border-2 border-primary p-6 hover:bg-primary hover:text-white transition-all duration-300 group text-left"
            >
              <div className="font-display text-2xl font-semibold text-primary group-hover:text-white mb-2">
                Event Gallery
              </div>
              <div className="font-body text-gray-600 group-hover:text-white/90">
                Upload and organize school events
              </div>
            </button>

            <button 
              onClick={() => router.push('/admin/news-events')}
              className="border-2 border-primary p-6 hover:bg-primary hover:text-white transition-all duration-300 group text-left"
            >
              <div className="font-display text-2xl font-semibold text-primary group-hover:text-white mb-2">
                News & Events
              </div>
              <div className="font-body text-gray-600 group-hover:text-white/90">
                Manage news articles and announcements
              </div>
            </button>
          </div>
        </section>

        {/* Recent Activity */}
        <section className="mb-16">
          <h2 className="font-display text-3xl font-semibold text-primary mb-8">
            Recent Activity
          </h2>
          <div className="border border-gray-200">
            {recentActivities.length > 0 ? (
              recentActivities.map((activity) => (
                <div 
                  key={activity._id}
                  className="p-6 border-b border-gray-200 last:border-b-0 hover:bg-gray-50 transition-colors duration-300"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <span className={`px-2 py-1 rounded text-xs font-semibold uppercase ${
                          activity.type === 'inquiry' ? 'bg-blue-100 text-blue-700' :
                          activity.type === 'event' ? 'bg-purple-100 text-purple-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          {activity.type}
                        </span>
                        <h3 className="font-body font-semibold text-primary">
                          {activity.title}
                        </h3>
                      </div>
                      <p className="font-body text-gray-600">
                        {activity.description}
                      </p>
                    </div>
                    <div className="font-body text-sm text-gray-500 ml-4 flex-shrink-0">
                      {formatTimeAgo(activity.createdAt)}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-6 text-center text-gray-500">
                No recent activities
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}
