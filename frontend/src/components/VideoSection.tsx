import React, { useState, useEffect } from "react";
import { useTranslation } from "@/TranslationContext";

interface Video {
  id: number;
  title: string;
  description: string;
  video_url: string;
  order: number;
}

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
      {" "}
      {/* Pontosan ugyanaz a háttér, mint a többi részen */}
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            {language === "en" ? "Videos" : "Videók"}
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6 shadow-sm"></div>
          
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {videos.map((video, index) => (
            <div
              key={video.id}
              className={`flex flex-col bg-card text-card-foreground rounded-xl shadow-lg border border-border overflow-hidden transition-all duration-500 hover:shadow-xl fade-in-up stagger-${(index % 4) + 1}`}
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
