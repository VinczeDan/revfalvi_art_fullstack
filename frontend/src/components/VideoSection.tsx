import React, { useState, useEffect } from "react";
import { useTranslation } from "@/TranslationContext";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface Video {
  id: number;
  title: string;
  description: string;
  video_url: string;
  order: number;
}

const VideoCard = ({ video, index }: { video: Video; index: number }) => {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.05 });
  const delays = ["", "reveal-delay-2", "reveal-delay-3", "reveal-delay-4"];
  const delay = delays[index % 4];

  return (
    <div
      ref={ref}
      className={`reveal reveal-up ${delay} ${isVisible ? "is-visible" : ""} flex flex-col bg-card text-card-foreground rounded-xl shadow-lg border border-border overflow-hidden transition-all duration-500 hover:shadow-xl`}
    >
      <div className="aspect-[9/16] w-full bg-black relative group">
        <video
          key={video.video_url}
          controls
          preload="metadata"
          playsInline
          className="w-full h-full object-contain"
        >
          <source src={video.video_url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold mb-3 border-b border-primary/20 pb-2">
          {video.title}
        </h3>
        <p className="text-foreground/80 text-sm leading-relaxed whitespace-pre-line">
          {video.description}
        </p>
      </div>
    </div>
  );
};

const VideoSection = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { language } = useTranslation();

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/videos/?lang=${language}`);
        if (!response.ok) throw new Error("Failed to fetch videos");
        const data = await response.json();
        setVideos(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error");
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [language]);

  if (loading)
    return (
      <div className="py-20 text-center text-primary italic">
        {language === "en" ? "Loading videos..." : "Videók betöltése..."}
      </div>
    );

  if (error || videos.length === 0) return null;

  return (
    <section id="videos" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Fejléc — NEM reveal osztállyal, hogy mindig látszódjon */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            {language === "en" ? "Videos" : "Videók"}
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6 shadow-sm"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {videos.map((video, index) => (
            <VideoCard key={video.id} video={video} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
