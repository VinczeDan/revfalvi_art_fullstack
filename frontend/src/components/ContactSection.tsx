// src/components/ContactSection.tsx
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, Palette } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "@/TranslationContext";

const ContactSection = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

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
      toast({ title: "Success", description: "Message sent!" });
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 px-4 bg-gradient-soft">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-primary mb-6">
            <Mail className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {t("contact.title")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("contact.text")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <Card className="border-0 shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                    <Palette className="w-5 h-5 text-white" />
                  </div>
                  {t("contact.title")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  • Házasságkötés • Babavárás • Páros tánc • Egyedi portré
                  készítés • Hangszeres előadás
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div>
            <Card className="border-0 shadow-medium">
              <CardHeader>
                <CardTitle className="text-2xl">
                  {t("contact.button")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <Input
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                  <Input
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                  <Input
                    name="subject"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                  />
                  <Textarea
                    name="message"
                    placeholder="Message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                  />
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-primary text-white"
                  >
                    {isSubmitting ? "Sending..." : t("contact.button")}
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
