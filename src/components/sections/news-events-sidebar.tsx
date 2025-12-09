"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { X, Play, Calendar, MapPin, Clock, ArrowRight } from "lucide-react";

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
          isOpen ? 'opacity-70' : 'opacity-0 pointer-events-none'
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
          className={`bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden transform transition-all duration-300 ${
            isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'
          }`}
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          {/* Modal Header Image */}
          <div className="relative h-56 md:h-72 w-full">
            <Image
              src={item.imageUrl}
              alt={item.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all hover:scale-105"
              aria-label="Close modal"
            >
              <X className="h-5 w-5 text-primary" />
            </button>
            
            {/* Type Badge */}
            <div className="absolute top-4 left-4">
              <span className={`px-3 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase shadow-lg ${
                item.type === "news" 
                  ? "bg-primary text-white" 
                  : "bg-green-500 text-white"
              }`}>
                {item.type}
              </span>
            </div>
            
            {/* Title on Image */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h2 
                id="modal-title"
                className="font-display font-bold text-xl md:text-2xl text-white leading-tight drop-shadow-lg"
              >
                {item.title}
              </h2>
            </div>
          </div>
          
          {/* Modal Body */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-18rem)]">
            {/* Meta Information */}
            <div className="flex flex-wrap gap-4 mb-6 pb-4 border-b border-gray-200">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="h-4 w-4 text-primary" />
                <span>{new Date(item.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</span>
              </div>
              {item.type === "event" && item.time && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="h-4 w-4 text-primary" />
                  <span>{item.time}</span>
                </div>
              )}
              {item.type === "event" && item.location && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span>{item.location}</span>
                </div>
              )}
            </div>
            
            {/* Content */}
            <div className="prose prose-sm max-w-none">
              <div className="space-y-4">
                {item.fullContent.split('\n\n').map((paragraph, idx) => (
                  <p key={idx} className="text-gray-700 font-body leading-relaxed">
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
    <div className="mb-8">
      <div className="mb-4">
        <h3 className="font-display text-xl font-semibold text-primary mb-2">
          Featured Video
        </h3>
        <p className="text-sm text-gray-600 font-body leading-relaxed">
          Mornings with Mr. Mulder
        </p>
      </div>
      <div className="relative aspect-video w-full overflow-hidden rounded-lg shadow-md">
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
              className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 z-10 group hover:bg-opacity-50 transition-all"
            >
              <div className="bg-green-500 p-4 rounded-full transition-transform group-hover:scale-110 shadow-lg">
                <Play className="h-6 w-6 text-white fill-white" />
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
        className={`fixed top-0 right-0 h-full w-full bg-white z-50 shadow-2xl transition-transform duration-300 ease-out ${isOpen ? "translate-x-0" : "translate-x-full"}`}
        aria-label="News & Events"
        role="dialog"
        aria-modal="true"
      >
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="bg-primary px-6 py-6 flex-shrink-0">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="font-display font-bold text-2xl md:text-3xl text-white mb-2">
                  News & Events
                </h2>
                <p className="text-white/90 text-sm font-body">
                  Stay connected with the Mysore International School community
                </p>
              </div>
              <button
                onClick={onClose}
                aria-label="Close news & events"
                className="text-white hover:text-gray-200 transition-colors p-1 flex-shrink-0"
              >
                <X size={28} />
              </button>
            </div>
            
            {/* Filter Pills */}
<div className="flex gap-2 flex-wrap">
  <button
    onClick={() => setActiveFilter("all")}
    className={`px-4 py-2 rounded-full font-body font-semibold text-sm transition-all ${
      activeFilter === "all"
        ? "bg-white text-primary shadow-md"
        : "bg-white/20 text-white hover:bg-white/30"
    }`}
  >
    All
  </button>
  <button
    onClick={() => setActiveFilter("news")}
    className={`px-4 py-2 rounded-full font-body font-semibold text-sm transition-all ${
      activeFilter === "news"
        ? "bg-white text-primary shadow-md"
        : "bg-white/20 text-white hover:bg-white/30"
    }`}
  >
    News
  </button>
  <button
    onClick={() => setActiveFilter("event")}
    className={`px-4 py-2 rounded-full font-body font-semibold text-sm transition-all ${
      activeFilter === "event"
        ? "bg-white text-primary shadow-md"
        : "bg-white/20 text-white hover:bg-white/30"
    }`}
  >
    Events
  </button>
</div>

          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="px-6 py-8">
              {/* Featured Video */}
              <FeaturedVideo />

              {/* Divider */}
              <div className="border-t border-gray-200 my-8"></div>

              {/* Loading State */}
              {isLoading && (
                <div className="text-center py-12">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  <p className="mt-4 text-gray-600 font-body">Loading...</p>
                </div>
              )}

              {/* News & Events List */}
              {!isLoading && (
                <div className="space-y-6">
                  {filteredItems.map((item) => (
                    <article 
                      key={item._id} 
                      className="group cursor-pointer"
                      onClick={() => handleItemClick(item)}
                    >
                      <div className="block">
                        <div className="flex gap-4">
                          {/* Thumbnail */}
                          <div className="relative w-32 h-24 flex-shrink-0 rounded-lg overflow-hidden shadow-sm">
                            <Image
                              src={item.imageUrl}
                              alt={item.title}
                              fill
                              className="object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className="absolute top-2 left-2">
                              <span className={`px-2 py-1 rounded text-xs font-bold tracking-wider uppercase ${
                                item.type === "news" 
                                  ? "bg-primary text-white" 
                                  : "bg-green-500 text-white"
                              }`}>
                                {item.type}
                              </span>
                            </div>
                          </div>
                          
                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <h3 className="font-display font-semibold text-base leading-tight text-primary mb-2 group-hover:text-[#6B0F6B] transition-colors line-clamp-2">
                              {item.title}
                            </h3>
                            <div className="flex flex-col gap-1 text-xs text-gray-600 font-body">
                              <div className="flex items-center gap-1.5">
                                <Calendar className="h-3 w-3" />
                                <span>{new Date(item.date).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'short',
                                  day: 'numeric'
                                })}</span>
                              </div>
                              {item.type === "event" && item.time && (
                                <div className="flex items-center gap-1.5">
                                  <Clock className="h-3 w-3" />
                                  <span>{item.time}</span>
                                </div>
                              )}
                              {item.type === "event" && item.location && (
                                <div className="flex items-center gap-1.5">
                                  <MapPin className="h-3 w-3" />
                                  <span className="truncate">{item.location}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      {filteredItems.indexOf(item) < filteredItems.length - 1 && (
                        <div className="border-t border-gray-200 mt-6"></div>
                      )}
                    </article>
                  ))}
                </div>
              )}

              {/* Empty State */}
              {!isLoading && filteredItems.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-600 font-body text-sm">
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
