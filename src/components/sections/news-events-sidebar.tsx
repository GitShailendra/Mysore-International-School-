"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { X, Play, Calendar, MapPin, Clock } from "lucide-react";

interface NewsEventsSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

type FilterType = "all" | "news" | "event";

interface ContentItem {
  _id: string;
  type: "news" | "event";
  title: string;
  imageUrl: string;
  excerpt: string;
  fullContent: string;
  date: string;
  time?: string;
  location?: string;
  status: string;
}

// Detail Modal Component
const DetailModal = ({ 
  item, 
  isOpen, 
  onClose 
}: { 
  item: ContentItem | null; 
  isOpen: boolean; 
  onClose: () => void;
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!item) return null;

  return (
    <>
      {/* Modal Backdrop */}
      <div
        className={`fixed inset-0 bg-black z-[60] transition-opacity duration-300 ${
          isOpen ? 'opacity-50' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Modal Content */}
      <div
        className={`fixed inset-0 z-[70] flex items-center justify-center p-4 transition-all duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      >
        <div
          className={`bg-white max-w-3xl w-full max-h-[90vh] overflow-hidden transform transition-all duration-300 ${
            isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'
          }`}
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 hover:bg-gray-100 transition-colors z-10"
            aria-label="Close modal"
          >
            <X className="h-5 w-5 text-gray-700" />
          </button>

          {/* Modal Body */}
          <div className="p-12 overflow-y-auto max-h-[90vh]">
            {/* Type Badge */}
            <div className="mb-6">
              <span className="font-body text-xs font-semibold text-primary uppercase tracking-widest">
                {item.type}
              </span>
            </div>

            {/* Title */}
            <h2 
              id="modal-title"
              className="font-display font-bold text-4xl text-primary mb-8 leading-tight"
            >
              {item.title}
            </h2>
            
            {/* Meta Information */}
            <div className="flex flex-wrap gap-6 mb-8 pb-8 border-b border-gray-200">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="h-4 w-4" />
                <span className="font-body">{new Date(item.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</span>
              </div>
              {item.type === "event" && item.time && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="h-4 w-4" />
                  <span className="font-body">{item.time}</span>
                </div>
              )}
              {item.type === "event" && item.location && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span className="font-body">{item.location}</span>
                </div>
              )}
            </div>

            {/* Image */}
            <div className="relative h-80 w-full mb-8">
              <Image
                src={item.imageUrl}
                alt={item.title}
                fill
                className="object-cover"
              />
            </div>
            
            {/* Content */}
            <div className="space-y-6">
              {item.fullContent.split('\n\n').map((paragraph, idx) => (
                <p key={idx} className="text-gray-700 font-body text-lg leading-relaxed">
                  {paragraph.split('\n').map((line, lineIdx) => (
                    <span key={lineIdx}>
                      {line}
                      {lineIdx < paragraph.split('\n').length - 1 && <br />}
                    </span>
                  ))}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const FeaturedVideo = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlay = () => {
    if (videoRef.current) {
      setIsPlaying(true);
      videoRef.current.play().catch(error => {
        console.error("Video play failed:", error);
        setIsPlaying(false);
      });
    }
  };

  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      const handleVideoEnd = () => setIsPlaying(false);
      videoElement.addEventListener('ended', handleVideoEnd);
      return () => {
        videoElement.removeEventListener('ended', handleVideoEnd);
      };
    }
  }, []);

  return (
    <div className="mb-12">
      <div className="mb-6">
        <h3 className="font-display text-2xl font-semibold text-primary mb-2">
          Featured Video
        </h3>
        <p className="text-gray-600 font-body">
          Mornings with Mr. Mulder
        </p>
      </div>
      <div className="relative aspect-video w-full overflow-hidden bg-gray-100">
        {!isPlaying && (
          <>
            <Image
              src="https://resources.finalsite.net/images/f_auto,q_auto,t_image_size_5/v1758560946/Mysore International School/mnh4f799uabm8q8n4o7k/GoodMorningwithHOSPieterMulder-optimized.jpg"
              alt="Mornings with Mr. Mulder thumbnail"
              fill
              className="object-cover"
            />
            <button
              onClick={handlePlay}
              aria-label="Play video: Mornings with Mr. Mulder"
              className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 z-10 transition-all"
            >
              <div className="bg-white p-5 transition-transform hover:scale-105">
                <Play className="h-8 w-8 text-primary fill-primary" />
              </div>
            </button>
          </>
        )}
        <video
          ref={videoRef}
          className={`w-full h-full object-cover transition-opacity duration-300 ${isPlaying ? 'opacity-100' : 'opacity-0 absolute pointer-events-none'}`}
          controls={isPlaying}
          preload="metadata"
          playsInline
        >
          <source src="https://resources.finalsite.net/videos/t_video_mp4_1080/v1758560625/Mysore International School/cfydvcawjqkuuem9wbk4/GoodMorningwithHOSPieterMulder-optimized.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

const NewsEventsSidebar: React.FC<NewsEventsSidebarProps> = ({ isOpen, onClose }) => {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [selectedItem, setSelectedItem] = useState<ContentItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [items, setItems] = useState<ContentItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch news and events from API
  useEffect(() => {
    const fetchNewsEvents = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/news-events');
        const data = await response.json();
        
        if (data.success) {
          setItems(data.data);
        }
      } catch (error) {
        console.error('Error fetching news/events:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (isOpen) {
      fetchNewsEvents();
    }
  }, [isOpen]);

  const filteredItems = items.filter(item => {
    if (activeFilter === "all") return true;
    return item.type === activeFilter;
  });

  const handleItemClick = (item: ContentItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedItem(null), 300);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black z-40 transition-opacity duration-300 ${isOpen ? 'opacity-50' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Sidebar Panel */}
      <aside
        className={`fixed top-0 right-0 h-full w-full bg-white z-50 transition-transform duration-300 ease-out ${isOpen ? "translate-x-0" : "translate-x-full"}`}
        aria-label="News & Events"
        role="dialog"
        aria-modal="true"
      >
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="px-8 py-8 flex-shrink-0 border-b border-gray-200">
            <div className="flex items-start justify-between mb-8">
              <div>
                <h2 className="font-display font-bold text-5xl text-primary mb-3 tracking-tight">
                  News & Events
                </h2>
                <p className="text-gray-600 font-body">
                  Stay connected with our community
                </p>
              </div>
              <button
                onClick={onClose}
                aria-label="Close news & events"
                className="text-gray-700 hover:text-primary transition-colors p-2"
              >
                <X size={28} />
              </button>
            </div>
            
            {/* Filter Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => setActiveFilter("all")}
                className={`px-6 py-2 font-body font-medium border-2 transition-all ${
                  activeFilter === "all"
                    ? "border-primary text-primary"
                    : "border-gray-300 text-gray-700 hover:border-gray-400"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setActiveFilter("news")}
                className={`px-6 py-2 font-body font-medium border-2 transition-all ${
                  activeFilter === "news"
                    ? "border-primary text-primary"
                    : "border-gray-300 text-gray-700 hover:border-gray-400"
                }`}
              >
                News
              </button>
              <button
                onClick={() => setActiveFilter("event")}
                className={`px-6 py-2 font-body font-medium border-2 transition-all ${
                  activeFilter === "event"
                    ? "border-primary text-primary"
                    : "border-gray-300 text-gray-700 hover:border-gray-400"
                }`}
              >
                Events
              </button>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="px-8 py-12">
              {/* Featured Video */}
              <FeaturedVideo />

              {/* Divider */}
              <div className="border-t border-gray-200 my-12"></div>

              {/* Loading State */}
              {isLoading && (
                <div className="text-center py-20">
                  <div className="inline-block animate-spin rounded-full h-10 w-10 border-2 border-primary border-t-transparent"></div>
                  <p className="mt-6 text-gray-600 font-body">Loading...</p>
                </div>
              )}

              {/* News & Events List */}
              {!isLoading && (
                <div className="space-y-0">
                  {filteredItems.map((item, index) => (
                    <article 
                      key={item._id} 
                      className="group cursor-pointer py-8 border-b border-gray-200 last:border-b-0 hover:bg-gray-50 transition-colors"
                      onClick={() => handleItemClick(item)}
                    >
                      <div className="flex gap-6">
                        {/* Thumbnail */}
                        <div className="relative w-40 h-28 flex-shrink-0 overflow-hidden bg-gray-100">
                          <Image
                            src={item.imageUrl}
                            alt={item.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        
                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="mb-3">
                            <span className="font-body text-xs font-semibold text-primary uppercase tracking-widest">
                              {item.type}
                            </span>
                          </div>
                          <h3 className="font-display font-semibold text-xl leading-tight text-primary mb-3 group-hover:text-[#6B0F6B] transition-colors">
                            {item.title}
                          </h3>
                          <div className="flex flex-wrap gap-4 text-sm text-gray-600 font-body">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4" />
                              <span>{new Date(item.date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                              })}</span>
                            </div>
                            {item.type === "event" && item.time && (
                              <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4" />
                                <span>{item.time}</span>
                              </div>
                            )}
                            {item.type === "event" && item.location && (
                              <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4" />
                                <span>{item.location}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}

              {/* Empty State */}
              {!isLoading && filteredItems.length === 0 && (
                <div className="text-center py-20">
                  <p className="text-gray-600 font-body">
                    No {activeFilter === "all" ? "items" : activeFilter} to display.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>

      {/* Detail Modal */}
      <DetailModal 
        item={selectedItem} 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
      />
    </>
  );
};

export default NewsEventsSidebar;