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
      {" "}
      {/* Világosbarnás Faber Castell háttér */}
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#4A3728]">
            {language === "en" ? "Video Gallery" : "Videó Galéria"}
          </h2>
          <div className="w-24 h-1 bg-[#8B4513] mx-auto mb-6 shadow-sm"></div>
          <p className="text-[#5D4037] max-w-2xl mx-auto text-lg italic">
            {language === "en"
              ? "Take a look at my creative process and tutorials."
              : "Tekintse meg az alkotási folyamataimat és oktatóvideóimat."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {videos.map((video, index) => (
            <div
              key={video.id}
              className={`flex flex-col space-y-6 bg-[#F5F5F0]/50 p-4 rounded-2xl shadow-md border border-[#D7CCC8] hover:shadow-xl transition-all duration-500 ${index % 2 === 0 ? "slide-in-left" : "slide-in-right"}`}
            >
              <div className="aspect-video rounded-xl overflow-hidden bg-black shadow-inner relative group">
                <video
                  key={video.video_url}
                  controls
                  preload="metadata" // Ez tölti be az első képkockát automatikusan
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                >
                  <source src={video.video_url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>

              <div className="px-2 pb-2">
                <h3 className="text-2xl font-bold mb-3 text-[#3E2723] border-b border-[#8B4513]/20 pb-2">
                  {video.title}
                </h3>
                <p className="text-[#5D4037] leading-relaxed text-base font-normal">
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
