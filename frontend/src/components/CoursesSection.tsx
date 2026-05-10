import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, Loader2, ChevronDown } from "lucide-react";
import { useTranslation } from "@/TranslationContext";
import { useQuery } from "@tanstack/react-query";
import { useScrollReveal } from "@/hooks/useScrollReveal";

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

// Egyedi kártya komponens lenyitható (Accordion) funkcióval
const CourseCard = ({
  course,
  language,
  index,
  scrollToContact,
}: {
  course: Course;
  language: string;
  index: number;
  scrollToContact: (title: string) => void;
}) => {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 });
  const [isOpen, setIsOpen] = useState(false); // Lenyitás állapota

  const delays = [
    "",
    "reveal-delay-1",
    "reveal-delay-2",
    "reveal-delay-3",
    "reveal-delay-4",
    "reveal-delay-5",
  ];
  const delay = delays[index % delays.length];

  return (
    <div
      ref={ref}
      className={`reveal reveal-up ${delay} ${isVisible ? "is-visible" : ""} flex w-full md:w-[calc(45%-1rem)] lg:w-[calc(30%-1rem)] min-w-[320px] max-w-[450px] h-fit`}
    >
      <Card className="border-0 shadow-soft hover:shadow-medium transition-all duration-300 flex flex-col w-full overflow-hidden bg-card">
        {/* Kattintható fejléc: Ikon, Szint, Ár és Cím */}
        <div
          className="cursor-pointer p-6 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="flex justify-between items-start mb-4">
            <div className="text-4xl">{course.icon || "🎨"}</div>
            <div
              className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
            >
              <ChevronDown className="w-5 h-5 text-muted-foreground" />
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-3">
            <span
              className={`px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wider font-bold text-white ${
                LEVEL_MAP[course.level]?.color || "bg-gray-500"
              }`}
            >
              {language === "hu"
                ? LEVEL_MAP[course.level]?.hu
                : LEVEL_MAP[course.level]?.en}
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wider font-bold bg-muted text-muted-foreground">
              {course.price}
            </span>
          </div>

          <h3 className="text-xl md:text-2xl font-bold leading-tight">
            {course.title}
          </h3>
        </div>

        {/* Lenyitható tartalom: Leírás, Időtartam és Jelentkezés gomb */}
        <div
          className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
            isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          }`}
        >
          <div className="overflow-hidden">
            <CardContent className="pt-0 pb-6 flex flex-col gap-6">
              <div className="h-px bg-border w-full mb-2" />

              <p className="text-muted-foreground text-base whitespace-pre-line leading-relaxed">
                {course.description}
              </p>

              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <span className="text-lg">⏱</span>
                <span>{course.duration}</span>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation(); // Ne csukódjon be a kártya a gombra kattintáskor
                  scrollToContact(course.title);
                }}
                className="w-full py-3 rounded-full text-sm font-bold bg-red-500 hover:bg-red-600 text-white shadow-sm hover:shadow-md transition-all active:scale-95"
              >
                {language === "hu"
                  ? "Jelentkezés a tanfolyamra"
                  : "Sign up for course"}
              </button>
            </CardContent>
          </div>
        </div>
      </Card>
    </div>
  );
};

const CoursesSection = () => {
  const { language } = useTranslation();
  const header = useScrollReveal({ threshold: 0.2 });

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
        <div
          ref={header.ref}
          className={`text-center mb-16 reveal reveal-up ${header.isVisible ? "is-visible" : ""}`}
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-primary mb-6">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {language === "hu" ? "Tanfolyamok" : "Courses"}
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6 shadow-sm"></div>
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

        {/* Dinamikus kártyák flexibilis elrendezéssel */}
        <div className="flex flex-wrap justify-center gap-8 mb-10 items-start">
          {courses?.map((course, index) => (
            <CourseCard
              key={course.id}
              course={course}
              language={language}
              index={index}
              scrollToContact={scrollToContact}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoursesSection;
