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
        // API hívás a nyelvnek megfelelő paraméterrel
        const response = await fetch(
          `/api/videos/?lang=${language}`,
        );
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
      <div className="py-20 text-center text-gray-500">
        {language === "en" ? "Loading videos..." : "Videók betöltése..."}
      </div>
    );

  if (error || videos.length === 0) return null;

  return (
    <section id="videos" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {language === "en" ? "Videos" : "Videók"}
          </h2>
          <div className="w-20 h-1 bg-[#8B4513] mx-auto mb-6"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {videos.map((video) => (
            <div key={video.id} className="flex flex-col space-y-4">
              <div className="aspect-video rounded-xl overflow-hidden shadow-xl bg-black border border-gray-100 group">
                <video
                  controls
                  className="w-full h-full object-cover"
                  poster="/placeholder.svg"
                >
                  <source src={video.video_url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              <div className="px-2">
                <h3 className="text-xl font-bold mb-2 text-slate-900">
                  {video.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
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
