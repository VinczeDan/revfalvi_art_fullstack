import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, Palette } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "@/TranslationContext"; // <-- Importáljuk a fordítást

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  // Translation context
  const { t } = useTranslation();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/send-contact-email/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || `HTTP error! status: ${response.status}`
        );
      }

      toast({
        title: t("contact.successTitle") || "Sikeres küldés!",
        description:
          t("contact.successDescription") ||
          "Üzenetét megkaptuk, hamarosan válaszolunk.",
      });

      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      toast({
        title: t("contact.errorTitle") || "Hiba",
        description: error instanceof Error ? error.message : "Ismeretlen hiba",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 px-4 bg-gradient-soft">
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="slide-in-left inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-primary mb-6">
            <Mail className="w-8 h-8 text-white" />
          </div>

          <h2 className="slide-in-right text-4xl md:text-5xl font-bold text-foreground mb-4">
            {t("contact.title")}
          </h2>

          <p className="fade-in-up text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("contact.text")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="slide-in-left space-y-8">
            <Card className="border-0 shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                    <Palette className="w-5 h-5 text-white" />
                  </div>
                  {t("contact.servicesTitle") || "Művészeti szolgáltatások"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  {t("contact.servicesList") ||
                    "• Házasságkötés <br />• Babavárás <br />• Páros tánc <br />• Egyedi portré készítés <br />• Hangszeres előadás"}
                </p>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <div className="fade-in-up stagger-1 flex items-center gap-4">
                <div className="w-12 h-12 bg-artist-blue rounded-full flex items-center justify-center">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">
                    {t("contact.emailTitle") || "Email"}
                  </h3>
                  <p className="text-muted-foreground">
                    revfalvi.peter@googlemail.com
                  </p>
                </div>
              </div>

              <div className="fade-in-up stagger-2 flex items-center gap-4">
                <div className="w-12 h-12 bg-artist-turquoise rounded-full flex items-center justify-center">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">
                    {t("contact.phoneTitle") || "Telefon"}
                  </h3>
                  <p className="text-muted-foreground">06 30 862 3832</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="slide-in-right">
            <Card className="border-0 shadow-medium">
              <CardHeader>
                <CardTitle className="text-2xl">
                  {t("contact.formTitle") || "Üzenet küldése"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="fade-in-up stagger-1">
                      <Input
                        name="name"
                        placeholder={t("contact.formName") || "Teljes név"}
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        minLength={2}
                        className="h-12"
                      />
                    </div>
                    <div className="fade-in-up stagger-2">
                      <Input
                        name="email"
                        type="email"
                        placeholder={t("contact.formEmail") || "Email cím"}
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
                        className="h-12"
                      />
                    </div>
                  </div>

                  <div className="fade-in-up stagger-3">
                    <Input
                      name="subject"
                      placeholder={t("contact.formSubject") || "Tárgy"}
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      minLength={3}
                      className="h-12"
                    />
                  </div>

                  <div className="fade-in-up stagger-4">
                    <Textarea
                      name="message"
                      placeholder={t("contact.formMessage") || "Üzenet..."}
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      minLength={10}
                      rows={6}
                      className="resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-primary hover:opacity-90 transition-opacity text-white font-medium h-12 rounded-full"
                  >
                    {isSubmitting
                      ? t("contact.sending") || "Küldés..."
                      : t("contact.sendButton") || "Üzenet küldése"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
