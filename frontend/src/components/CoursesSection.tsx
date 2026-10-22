import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  GraduationCap,
  Loader2,
  ChevronDown,
  Clock3,
  Palette,
} from "lucide-react";
import { useTranslation } from "@/TranslationContext";
import { useQuery } from "@tanstack/react-query";
import { useScrollReveal } from "@/hooks/useScrollReveal";

// 1. Típus definíció a backend adatokhoz
interface Course {
  id: number;
  icon: string;
  title: string;
  description: string;
  cover_image_url?: string | null;
  level: "beginner" | "advanced" | "all";
  duration: string;
  price: string;
}

// Szintek fordítása és színei a backend kulcsok alapján
const LEVEL_MAP: Record<string, { key: string; color: string }> = {
  beginner: { key: "beginner", color: "bg-green-500" },
  advanced: { key: "advanced", color: "bg-orange-500" },
  all: { key: "all", color: "bg-blue-500" },
};

// Egyedi kártya komponens lenyitható (Accordion) funkcióval
const CourseCard = ({
  course,
  t,
  index,
  scrollToContact,
}: {
  course: Course;
  t: (key: string) => string;
  index: number;
  scrollToContact: (title: string) => void;
}) => {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 });
  const [isOpen, setIsOpen] = useState(false); // Lenyitás állapota
  const [coverImageFailed, setCoverImageFailed] = useState(false);

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
      className={`reveal reveal-up ${delay} ${isVisible ? "is-visible" : ""} w-full`}
    >
      <Card className="group flex h-full w-full flex-col overflow-hidden border-0 bg-card shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-medium">
        <div className="relative aspect-[16/9] overflow-hidden bg-gradient-to-br from-artist-blue via-artist-light to-primary/30">
          {course.cover_image_url && !coverImageFailed ? (
            <img
              src={course.cover_image_url}
              alt={course.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              onError={() => setCoverImageFailed(true)}
            />
          ) : (
            <div
              aria-hidden="true"
              className="flex h-full items-center justify-center bg-gradient-to-br from-primary/15 via-artist-light to-secondary/20"
            >
              <span className="flex h-20 w-20 items-center justify-center rounded-full bg-background/75 text-5xl shadow-soft backdrop-blur-sm">
                {course.icon || <Palette className="h-10 w-10 text-primary" />}
              </span>
            </div>
          )}
          <span
            className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-semibold text-white shadow-sm ${
              LEVEL_MAP[course.level]?.color || "bg-gray-500"
            }`}
          >
            {t(`courses.levels.${LEVEL_MAP[course.level]?.key ?? "all"}`)}
          </span>
        </div>

        <button
          aria-expanded={isOpen}
          className="flex w-full items-start justify-between gap-4 p-6 text-left transition-colors hover:bg-accent/30"
          onClick={() => setIsOpen(!isOpen)}
          type="button"
        >
          <span className="min-w-0">
            <span className="mb-2 block text-sm font-semibold text-primary">
              {course.price}
            </span>
            <span className="block text-xl font-bold leading-tight text-foreground md:text-2xl">
              {course.title}
            </span>
          </span>
          <ChevronDown
            aria-hidden="true"
            className={`mt-1 h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

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
                <Clock3 aria-hidden="true" className="h-4 w-4 text-primary" />
                <span>{course.duration}</span>
              </div>

              <button
                onClick={(e) => {
                  scrollToContact();
                }}
                className="w-full py-3 rounded-full text-sm font-bold bg-red-500 hover:bg-red-600 text-white shadow-sm hover:shadow-md transition-all active:scale-95"
              >
                {t("courses.apply")}
              </button>
            </CardContent>
          </div>
        </div>
      </Card>
    </div>
  );
};

const CoursesSection = () => {
  const { language, t } = useTranslation();
  const header = useScrollReveal({ threshold: 0.2 });

  const {
    data: courses,
    isLoading,
    error,
  } = useQuery<Course[]>({
    queryKey: ["courses", language],
    queryFn: async () => {
      const response = await fetch(`/api/courses/?lang=${language}`);
      if (!response.ok) throw new Error("Failed to load courses");
      return response.json();
    },
  });

  const scrollToContact = () => {
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
            {t("courses.title")}
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
            {t("courses.error")}
          </div>
        )}

        {/* Dinamikus kártyák flexibilis elrendezéssel */}
        <div className="mb-10 grid grid-cols-1 items-start gap-8 md:grid-cols-2 xl:grid-cols-3">
          {courses?.map((course, index) => (
            <CourseCard
              key={course.id}
              course={course}
              t={t}
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
