"use client";

import * as React from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import { motion, useInView } from "framer-motion";

import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const testimonialData = [
  {
    name: "Principal",
    poster: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/87859ba7-84c9-4d54-a99e-419b59339f88-Mysore International Schoolschool-org/assets/images/2025_Mysore International School_Chidera_002-C-S-M-9.jpg",
    videoUrl: "https://resources.finalsite.net/videos/t_video_h265_480/v1754071851/Mysore International School/ijrmxwb48vxphung3xj6/2025_Mysore International School_Chidera_002-C-S-M.mp4",
  },
  {
    name: "Vice-Principal",
    poster: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/87859ba7-84c9-4d54-a99e-419b59339f88-Mysore International Schoolschool-org/assets/images/2025_Mysore International School_Patrick_003-C-S-M-11.jpg",
    videoUrl: "https://resources.finalsite.net/videos/t_video_h265_480/v1753660284/Mysore International School/bavzlrzo4pi01x75dflw/2025_Mysore International School_Patrick_003-C-S-M.mp4",
  },
  {
    name: "Teacher",
    poster: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/87859ba7-84c9-4d54-a99e-419b59339f88-Mysore International Schoolschool-org/assets/images/Riki-13.jpg",
    videoUrl: "https://resources.finalsite.net/videos/t_video_h265_480/v1753660438/Mysore International School/uhmitwebmckcq5j2rl9c/Riki.mp4",
  },
  {
    name: "Parent",
    poster: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/87859ba7-84c9-4d54-a99e-419b59339f88-Mysore International Schoolschool-org/assets/images/CharlotteHero-15.jpg",
    videoUrl: "https://resources.finalsite.net/videos/t_video_h265_480/v1749216089/Mysore International School/zxkhwdvus9ud7xdmf97n/CharlotteHero.mp4",
  },
  {
    name: "Student",
    poster: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/87859ba7-84c9-4d54-a99e-419b59339f88-Mysore International Schoolschool-org/assets/images/2025_Mysore International School_Shorts_Alison_001-17.jpg",
    videoUrl: "https://resources.finalsite.net/videos/t_video_mp4_480/v1754070477/Mysore International School/opg7umkmvehakaaonu0f/2025_Mysore International School_Shorts_Alison_001.mp4",
  },
];

export default function StudentTestimonialsSection() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedVideo, setSelectedVideo] = React.useState<string | null>(null);
  
  const sectionRef = React.useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  React.useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const openModal = (videoUrl: string) => {
    setSelectedVideo(videoUrl);
    setIsModalOpen(true);
  };
  
  const handleModalChange = (open: boolean) => {
    setIsModalOpen(open);
    if (!open) {
      setSelectedVideo(null);
    }
  };

  return (
    <section ref={sectionRef} className="bg-primary text-white py-24 sm:py-32 overflow-hidden">
      <div className="container mx-auto px-4 text-center">
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="font-display italic text-xl md:text-2xl mb-4"
        >
          In their own words
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="font-display text-secondary font-bold text-4xl sm:text-5xl lg:text-6xl uppercase tracking-wider leading-tight mb-6"
        >
          THE Mysore International School EXPERIENCE
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="font-body text-base md:text-lg max-w-3xl mx-auto mb-8"
        >
          What makes Mysore International School unique? Hear straight from our Bears about life under the Mountain.
        </motion.p>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          className="w-32 md:w-40 h-0.5 bg-accent mx-auto mb-12 md:mb-16 origin-center"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        className="w-full"
      >
        <Carousel
          setApi={setApi}
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4 md:-ml-6">
            {testimonialData.map((testimonial, index) => (
              <CarouselItem key={index} className="basis-[85%] sm:basis-1/2 md:basis-1/3 lg:basis-[30%] xl:basis-1/4 pl-4 md:pl-6">
                <Card 
                  className="bg-transparent border-none p-0 relative aspect-[4/3] cursor-pointer group overflow-hidden"
                  onClick={() => openModal(testimonial.videoUrl)}
                >
                  <Image
                    src={testimonial.poster}
                    alt={`Testimonial from ${testimonial.name}`}
                    fill
                    sizes="(max-width: 640px) 85vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 md:w-16 md:h-16 border-2 border-white rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                      <Play className="w-7 h-7 md:w-8 md:h-8 text-white fill-white ml-1" />
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 p-4 md:p-6 w-full">
                    <h3 className="font-display text-xl md:text-2xl font-semibold text-white">
                      {testimonial.name}
                    </h3>
                  </div>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
        className="mt-12 container max-w-sm md:max-w-lg mx-auto px-4"
      >
        <div className="flex items-center gap-2">
          {testimonialData.map((_, index) => (
            <button
              key={index}
              aria-label={`Go to slide ${index + 1}`}
              onClick={() => api?.scrollTo(index)}
              className={`h-1 flex-1 rounded-sm transition-colors duration-500 ${
                index === current ? 'bg-accent' : 'bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>
      </motion.div>

      <Dialog open={isModalOpen} onOpenChange={handleModalChange}>
        <DialogContent className="bg-black p-0 border-0 max-w-5xl w-[90vw] aspect-video rounded-lg overflow-hidden data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95">
          {selectedVideo && (
            <video
              key={selectedVideo}
              className="w-full h-full"
              controls
              autoPlay
              src={selectedVideo}
              onEnded={() => handleModalChange(false)}
            >
              Your browser does not support the video tag.
            </video>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}