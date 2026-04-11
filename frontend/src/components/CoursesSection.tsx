// src/components/CoursesSection.tsx
// ÚJ FÁJL – illeszd be a többi komponens mellé
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap } from "lucide-react";
import { useTranslation } from "@/TranslationContext";

interface Course {
  id: number;
  icon: string;
  titleHu: string;
  titleEn: string;
  level: string;
  duration: string;
  descriptionHu: string;
  descriptionEn: string;
  price: string;
}

// ============================================================
// TANFOLYAM ADATOK – itt szerkeszd a saját kurzusaidat!
// ============================================================
const COURSES: Course[] = [
  {
    id: 1,
    icon: "🎨",
    titleHu: "Akvarell alapok",
    titleEn: "Watercolor basics",
    level: "Kezdő / Beginner",
    duration: "8 alkalom",
    descriptionHu:
      "Ismerkedj meg az akvarell technikájával lépésről lépésre. Alapvető ecsetkezelés, színkeverés, nedves-nedves technika.",
    descriptionEn:
      "Learn watercolor step by step. Brush handling, color mixing, wet-on-wet technique.",
    price: "35 000 Ft",
  },
  {
    id: 2,
    icon: "🖌️",
    titleHu: "Akril festészet",
    titleEn: "Acrylic painting",
    level: "Haladó / Advanced",
    duration: "10 alkalom",
    descriptionHu:
      "Fedezd fel az akrilfesték sokoldalúságát. Textúrák, rétegezés, impasztó és vegyes technikák.",
    descriptionEn:
      "Discover the versatility of acrylics. Textures, layering, impasto and mixed techniques.",
    price: "42 000 Ft",
  },
  {
    id: 3,
    icon: "🖼",
    titleHu: "Olajfestészet",
    titleEn: "Oil painting",
    level: "Haladó / Advanced",
    duration: "12 alkalom",
    descriptionHu:
      "Klasszikus olajfestészeti technikák: alépítés, glazúrozás, fény és árnyék, portré és tájkép.",
    descriptionEn:
      "Classic oil painting techniques: underpainting, glazing, light and shadow, portrait and landscape.",
    price: "48 000 Ft",
  },
  {
    id: 4,
    icon: "✏️",
    titleHu: "Ceruza & rajz",
    titleEn: "Pencil & drawing",
    level: "Minden szint / All levels",
    duration: "6 alkalom",
    descriptionHu:
      "A rajzolás alapjaitól a részletgazdag ceruzarajzokig. Arányok, perspektíva, tónusok.",
    descriptionEn:
      "From drawing basics to detailed pencil work. Proportions, perspective, values.",
    price: "28 000 Ft",
  },
];

const LEVEL_COLORS: Record<string, string> = {
  "Kezdő / Beginner": "bg-green-500",
  "Haladó / Advanced": "bg-orange-500",
  "Minden szint / All levels": "bg-blue-500",
};

const CoursesSection = () => {
  const { language } = useTranslation();
  const [contactCourse, setContactCourse] = useState<string | null>(null);

  const scrollToContact = (courseTitle: string) => {
    setContactCourse(courseTitle);
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
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
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {language === "hu"
              ? "Kis csoportokban, személyre szabott oktatás – válaszd ki a számodra legmegfelelőbb kurzust!"
              : "Small groups, personalized instruction – find the course that fits you best!"}
          </p>
        </div>

        {/* Course Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {COURSES.map((course) => (
            <Card
              key={course.id}
              className="border-0 shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1 flex flex-col"
            >
              <CardHeader className="pb-2">
                <div className="text-4xl mb-3">{course.icon}</div>
                <span
                  className={`inline-block self-start px-2 py-0.5 rounded-full text-xs font-bold text-white mb-2 ${
                    LEVEL_COLORS[course.level] ?? "bg-gray-500"
                  }`}
                >
                  {course.level}
                </span>
                <CardTitle className="text-lg leading-snug">
                  {language === "hu" ? course.titleHu : course.titleEn}
                </CardTitle>
              </CardHeader>

              <CardContent className="flex flex-col flex-1 gap-4">
                <p className="text-muted-foreground text-sm flex-1">
                  {language === "hu"
                    ? course.descriptionHu
                    : course.descriptionEn}
                </p>

                <div className="flex items-center justify-between text-sm border-t pt-3">
                  <span className="text-muted-foreground">
                    ⏱ {course.duration}
                  </span>
                  <span className="font-bold text-primary">{course.price}</span>
                </div>

                <button
                  onClick={() =>
                    scrollToContact(
                      language === "hu" ? course.titleHu : course.titleEn,
                    )
                  }
                  className="
                    w-full py-2.5 rounded-full text-sm font-semibold
                    bg-red-500 hover:bg-red-600 text-white
                    transition-all duration-200 hover:-translate-y-0.5
                  "
                >
                  {language === "hu" ? "Jelentkezés" : "Sign up"}
                </button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Egyéni óra megjegyzés */}
        <div className="bg-white/60 border border-border rounded-xl px-6 py-4 text-center text-muted-foreground text-sm">
          💬{" "}
          {language === "hu"
            ? "Egyéni óra is lehetséges – érdeklődj a Kapcsolat oldalon!"
            : "Private lessons available – ask via the Contact section!"}
        </div>
      </div>
    </section>
  );
};

export default CoursesSection;
