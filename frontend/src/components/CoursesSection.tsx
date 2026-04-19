import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, Loader2 } from "lucide-react";
import { useTranslation } from "@/TranslationContext";
import { useQuery } from "@tanstack/react-query";

// 1. Típus definíció a backend adatokhoz
interface Course {
  id: number;
  icon: string;
  title: string;
  description: string;
  level: "beginner" | "advanced" | "all";
  duration: string;
  price: string;
}

// Szintek fordítása és színei a backend kulcsok alapján
const LEVEL_MAP: Record<string, { hu: string; en: string; color: string }> = {
  beginner: { hu: "Kezdő", en: "Beginner", color: "bg-green-500" },
  advanced: { hu: "Haladó", en: "Advanced", color: "bg-orange-500" },
  all: { hu: "Minden szint", en: "All levels", color: "bg-blue-500" },
};

const CoursesSection = () => {
  const { language } = useTranslation();

  // 2. Adatlekérés React Query-vel
  const {
    data: courses,
    isLoading,
    error,
  } = useQuery<Course[]>({
    queryKey: ["courses", language],
    queryFn: async () => {
      const response = await fetch(`/api/courses/?lang=${language}`);
      if (!response.ok) throw new Error("Hiba az adatok letöltésekor");
      return response.json();
    },
  });

  const scrollToContact = (courseTitle: string) => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="courses" className="py-20 px-4 bg-gradient-soft">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-primary mb-6">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {language === "hu" ? "Tanfolyamok" : "Courses"}
          </h2>
        </div>

        {/* Töltés jelzése */}
        {isLoading && (
          <div className="flex justify-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-primary" />
          </div>
        )}

        {/* Hibaüzenet */}
        {error && (
          <div className="text-center text-red-500 py-10">
            {language === "hu"
              ? "Nem sikerült betölteni a tanfolyamokat."
              : "Failed to load courses."}
          </div>
        )}

        {/* Dinamikus kártyák listázása - Flexbox-szal az egyenletes elosztásért */}
        <div className="flex flex-wrap justify-center gap-6 mb-10">
          {courses?.map((course) => (
            <Card
              key={course.id}
              className="border-0 shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1 flex flex-col w-full md:w-[calc(50%-1.5rem)] lg:w-[calc(25%-1.5rem)] min-w-[280px] max-w-[350px]"
            >
              <CardHeader className="pb-2">
                <div className="text-4xl mb-3">{course.icon || "🎨"}</div>
                <span
                  className={`inline-block self-start px-2 py-0.5 rounded-full text-xs font-bold text-white mb-2 ${
                    LEVEL_MAP[course.level]?.color || "bg-gray-500"
                  }`}
                >
                  {language === "hu"
                    ? LEVEL_MAP[course.level]?.hu
                    : LEVEL_MAP[course.level]?.en}
                </span>
                <CardTitle>{course.title}</CardTitle>
              </CardHeader>

              <CardContent className="flex flex-col flex-1 gap-4">
                {/* whitespace-pre-line biztosítja a sortörések megjelenítését */}
                <p className="text-muted-foreground text-sm flex-1 whitespace-pre-line">
                  {course.description}
                </p>

                <div className="flex items-center justify-between text-sm border-t pt-3">
                  <span className="text-muted-foreground">
                    ⏱ {course.duration}
                  </span>
                  <span className="font-bold text-primary">{course.price}</span>
                </div>

                <button
                  onClick={() => scrollToContact(course.title)}
                  className="w-full py-2.5 rounded-full text-sm font-semibold bg-red-500 hover:bg-red-600 text-white transition-all duration-200"
                >
                  {language === "hu" ? "Jelentkezés" : "Sign up"}
                </button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoursesSection;
