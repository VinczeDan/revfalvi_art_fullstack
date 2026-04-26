import React from "react";
import { useTranslation } from "@/TranslationContext";

const VideoSection = () => {
  const { t, language } = useTranslation();

  // Ideiglenes adatok, amíg a Django backend nem küldi az igaziakat
  const dummyVideos = [
    {
      id: 1,
      title_hu: "Bevezetés az angol nyelvbe",
      title_en: "Introduction to English",
      desc_hu: "Rövid bemutató videó a nyelvtanfolyamról.",
      desc_en: "A short introductory video about the language course.",
      url: "https://www.w3schools.com/html/mov_bbb.mp4",
    },
    {
      id: 2,
      title_hu: "Festési technikák alapjai",
      title_en: "Basics of Painting Techniques",
      desc_hu: "Nézd meg, hogyan készülnek az akvarell képek.",
      desc_en: "Watch how watercolor paintings are created.",
      url: "https://www.w3schools.com/html/movie.mp4",
    },
  ];

  return (
    <section id="videos" className="py-20 bg-white">
      {" "}
      {/* Az ID fontos a scrollhoz */}
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {language === "hu" ? "Videók" : "Videos"}
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {dummyVideos.map((video) => (
            <div key={video.id} className="flex flex-col space-y-4">
              <div className="aspect-video rounded-xl overflow-hidden shadow-xl bg-black border border-gray-100">
                <video controls className="w-full h-full object-cover">
                  <source src={video.url} type="video/mp4" />
                </video>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">
                  {language === "hu" ? video.title_hu : video.title_en}
                </h3>
                <p className="text-gray-600">
                  {language === "hu" ? video.desc_hu : video.desc_en}
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
