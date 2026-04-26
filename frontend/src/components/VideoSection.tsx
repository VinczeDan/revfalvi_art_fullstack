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
        {language === "en" ? "Loading gallery..." : "Videók betöltése..."}
      </div>
    );

  if (error || videos.length === 0) return null;


  return (
    <section id="videos" className="py-20 bg-[#E8D8C3]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#3E2723]">
            {language === "en" ? "Creative Moments" : "Alkotói Pillanatok"}
          </h2>
          <div className="w-24 h-1 bg-[#8B4513] mx-auto mb-6 shadow-sm"></div>
          <p className="text-[#5D4037] max-w-2xl mx-auto text-lg italic font-normal">
            {language === "en"
              ? "Short vertical videos about my art process."
              : "Rövid álló videók az alkotási folyamataimról."}
          </p>
        </div>

        {/* A grid-cols-1 md:grid-cols-3-ra váltunk, mert az álló videók keskenyebbek */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {videos.map((video, index) => (
            <div
              key={video.id}
              className={`flex flex-col bg-[#F5F5F0]/60 rounded-3xl shadow-lg border border-[#D7CCC8] overflow-hidden transition-all duration-500 hover:shadow-2xl ${index % 3 === 0 ? "fade-in-up stagger-1" : index % 3 === 1 ? "fade-in-up stagger-2" : "fade-in-up stagger-3"}`}
            >
              {/* Itt az aspect-ratio-t 9/16-ra vagy 4/5-re állítjuk */}
              <div className="aspect-[9/16] w-full bg-black relative group">
                <video
                  key={video.video_url}
                  controls
                  preload="metadata"
                  playsInline
                  className="w-full h-full object-contain" // Az object-contain megvédi a videót a levágástól
                >
                  <source src={video.video_url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>

              <div className="p-5 bg-white/40 backdrop-blur-sm">
                <h3 className="text-lg font-bold mb-2 text-[#3E2723]">
                  {video.title}
                </h3>
                <p className="text-[#5D4037] text-sm leading-relaxed line-clamp-3">
                  {video.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};;

export default VideoSection;
