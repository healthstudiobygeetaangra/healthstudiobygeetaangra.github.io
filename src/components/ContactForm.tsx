import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Send } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { z } from "zod";

const contactFormSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  phone: z.string().trim().max(20, "Phone number must be less than 20 characters").optional(),
  message: z.string().trim().min(1, "Message is required").max(1000, "Message must be less than 1000 characters"),
});

interface ContactFormProps {
  compact?: boolean;
}

const ContactForm = ({ compact = false }: ContactFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const validatedData = contactFormSchema.parse(formData);
      
      const submissionDate = new Date().toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
      
      const message = `📅 *Submitted on:* ${submissionDate}%0A%0AHi! I'm ${validatedData.name}.%0A%0AEmail: ${encodeURIComponent(validatedData.email)}${validatedData.phone ? `%0APhone: ${encodeURIComponent(validatedData.phone)}` : ""}%0A%0AMessage: ${encodeURIComponent(validatedData.message)}`;
      
      window.open(`https://wa.me/919310178956?text=${message}`, "_blank");
      
      toast({
        title: "Message prepared!",
        description: "WhatsApp will open with your message. Just hit send!",
      });
      
      setFormData({ name: "", email: "", phone: "", message: "" });
      setErrors({});
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(newErrors);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={compact ? "space-y-4" : "space-y-6"}>
      <div className={compact ? "grid md:grid-cols-2 gap-4" : "space-y-6"}>
        <div className="space-y-2">
          <Label htmlFor="contact-name" className="text-foreground font-medium">
            Full Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="contact-name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter your full name"
            className={`rounded-xl h-12 ${errors.name ? "border-destructive focus-visible:ring-destructive" : ""}`}
          />
          {errors.name && <p className="text-destructive text-sm">{errors.name}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="contact-email" className="text-foreground font-medium">
            Email Address <span className="text-destructive">*</span>
          </Label>
          <Input
            id="contact-email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter your email address"
            className={`rounded-xl h-12 ${errors.email ? "border-destructive focus-visible:ring-destructive" : ""}`}
          />
          {errors.email && <p className="text-destructive text-sm">{errors.email}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact-phone" className="text-foreground font-medium">
          Phone Number
        </Label>
        <Input
          id="contact-phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleInputChange}
          placeholder="Enter your phone number"
          className={`rounded-xl h-12 ${errors.phone ? "border-destructive focus-visible:ring-destructive" : ""}`}
        />
        {errors.phone && <p className="text-destructive text-sm">{errors.phone}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact-message" className="text-foreground font-medium">
          Your Message <span className="text-destructive">*</span>
        </Label>
        <Textarea
          id="contact-message"
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          placeholder="How can we help you on your wellness journey?"
          rows={compact ? 3 : 4}
          className={`rounded-xl resize-none ${errors.message ? "border-destructive focus-visible:ring-destructive" : ""}`}
        />
        {errors.message && <p className="text-destructive text-sm">{errors.message}</p>}
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full gap-2 h-12 rounded-xl"
        variant="wellness"
      >
        <Send className="w-4 h-4" />
        {isSubmitting ? "Sending..." : "Send via WhatsApp"}
      </Button>
    </form>
  );
};

export default ContactForm;
