import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Send, MessageCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";

const WHATSAPP_NUMBER = "919310178956";

const leadFormSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  phone: z.string().trim().min(1, "Phone number is required").max(20, "Phone number must be less than 20 characters"),
  age: z.string().trim().min(1, "Age is required"),
  gender: z.string().min(1, "Please select your gender"),
  message: z.string().trim().max(1000, "Message must be less than 1000 characters").optional(),
});

type ActionType = "chat" | "book_free" | "book_paid" | "enroll_program";

interface LeadCaptureDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  actionType: ActionType;
  title?: string;
  programName?: string;
  programPrice?: string;
}

const LeadCaptureDialog = ({ open, onOpenChange, actionType, title, programName, programPrice }: LeadCaptureDialogProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    gender: "",
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

  const handleGenderChange = (value: string) => {
    setFormData(prev => ({ ...prev, gender: value }));
    if (errors.gender) {
      setErrors(prev => ({ ...prev, gender: "" }));
    }
  };

  const getWhatsAppMessage = () => {
    const genderLabel = formData.gender === "male" ? "Male" : formData.gender === "female" ? "Female" : "Other";
    const submissionDate = new Date().toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
    
    if (actionType === "chat") {
      const programText = programName 
        ? `I'd like to know more about your *${programName}* program.`
        : `I'd like to know more about your wellness programs.`;
      
      return `📅 *Submitted on:* ${submissionDate}

Hi! I'm ${formData.name}.

📋 *My Details*
• Age: ${formData.age}
• Gender: ${genderLabel}
• Email: ${formData.email}
• Phone: ${formData.phone}
${formData.message ? `\n💬 Message: ${formData.message}` : ""}

${programText}`;
    } else if (actionType === "book_free") {
      return `📅 *Submitted on:* ${submissionDate}

Hi! I'm interested in booking a FREE Discovery Call.

📋 *My Details*
• Name: ${formData.name}
• Age: ${formData.age}
• Gender: ${genderLabel}
• Email: ${formData.email}
• Phone: ${formData.phone}
${formData.message ? `\n💬 Message: ${formData.message}` : ""}

Please let me know the available slots.`;
    } else if (actionType === "enroll_program" && programName && programPrice) {
      return `📅 *Submitted on:* ${submissionDate}

Hi! I'm interested in enrolling in the *${programName}* (${programPrice}).

📋 *My Details*
• Name: ${formData.name}
• Age: ${formData.age}
• Gender: ${genderLabel}
• Email: ${formData.email}
• Phone: ${formData.phone}
${formData.message ? `\n💬 Message: ${formData.message}` : ""}

Please guide me on the payment process and next steps.`;
    } else {
      return `📅 *Submitted on:* ${submissionDate}

Hi! I'm interested in booking the Paid Discovery Call (₹999).

📋 *My Details*
• Name: ${formData.name}
• Age: ${formData.age}
• Gender: ${genderLabel}
• Email: ${formData.email}
• Phone: ${formData.phone}
${formData.message ? `\n💬 Message: ${formData.message}` : ""}

Please guide me on the payment process and available slots.`;
    }
  };

  const getButtonText = () => {
    if (isSubmitting) return "Sending...";
    if (actionType === "chat") return "Chat Now";
    return "Book Now";
  };

  const getDialogTitle = () => {
    if (title) return title;
    if (actionType === "chat") return "Chat with Us";
    if (actionType === "book_free") return "Book Free Consultation";
    if (actionType === "enroll_program" && programName && programPrice) return `Enroll — ${programName} (${programPrice})`;
    return "Book Paid Consultation — ₹999";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      leadFormSchema.parse(formData);
      
      // Save lead via secure edge function (with rate limiting)
      const { error: fnError } = await supabase.functions.invoke("submit-lead", {
        body: {
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          age: formData.age.trim(),
          gender: formData.gender,
          message: formData.message?.trim() || null,
          action_type: actionType,
          source_page: window.location.pathname,
        },
      });

      if (fnError) {
        // Log only in development
        if (import.meta.env.DEV) {
          console.error("Error saving lead:", fnError);
        }
        // Continue to WhatsApp even if save fails
      }
      
      const message = getWhatsAppMessage();
      const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
      
      window.open(whatsappUrl, "_blank");
      
      toast({
        title: "Redirecting to WhatsApp!",
        description: "Your details have been prepared. Just hit send!",
      });
      
      // Reset form and close dialog
      setFormData({ name: "", email: "", phone: "", age: "", gender: "", message: "" });
      setErrors({});
      onOpenChange(false);
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            {actionType === "chat" ? (
              <MessageCircle className="h-5 w-5 text-green-500" />
            ) : (
              <Send className="h-5 w-5 text-primary" />
            )}
            {getDialogTitle()}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="lead-name" className="text-foreground font-medium">
              Full Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="lead-name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter your full name"
              className={`rounded-xl h-11 ${errors.name ? "border-destructive focus-visible:ring-destructive" : ""}`}
            />
            {errors.name && <p className="text-destructive text-sm">{errors.name}</p>}
          </div>

          {/* Age & Gender in row */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="lead-age" className="text-foreground font-medium">
                Age <span className="text-destructive">*</span>
              </Label>
              <Input
                id="lead-age"
                name="age"
                type="number"
                min="1"
                max="120"
                value={formData.age}
                onChange={handleInputChange}
                placeholder="Your age"
                className={`rounded-xl h-11 ${errors.age ? "border-destructive focus-visible:ring-destructive" : ""}`}
              />
              {errors.age && <p className="text-destructive text-sm">{errors.age}</p>}
            </div>

            <div className="space-y-2">
              <Label className="text-foreground font-medium">
                Gender <span className="text-destructive">*</span>
              </Label>
              <RadioGroup 
                value={formData.gender} 
                onValueChange={handleGenderChange}
                className="flex gap-3 pt-2"
              >
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="female" id="lead-female" />
                  <Label htmlFor="lead-female" className="cursor-pointer text-sm">Female</Label>
                </div>
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="male" id="lead-male" />
                  <Label htmlFor="lead-male" className="cursor-pointer text-sm">Male</Label>
                </div>
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="other" id="lead-other" />
                  <Label htmlFor="lead-other" className="cursor-pointer text-sm">Other</Label>
                </div>
              </RadioGroup>
              {errors.gender && <p className="text-destructive text-sm">{errors.gender}</p>}
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="lead-email" className="text-foreground font-medium">
              Email Address <span className="text-destructive">*</span>
            </Label>
            <Input
              id="lead-email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email address"
              className={`rounded-xl h-11 ${errors.email ? "border-destructive focus-visible:ring-destructive" : ""}`}
            />
            {errors.email && <p className="text-destructive text-sm">{errors.email}</p>}
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Label htmlFor="lead-phone" className="text-foreground font-medium">
              Phone Number <span className="text-destructive">*</span>
            </Label>
            <Input
              id="lead-phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="+91 XXXXX XXXXX"
              className={`rounded-xl h-11 ${errors.phone ? "border-destructive focus-visible:ring-destructive" : ""}`}
            />
            {errors.phone && <p className="text-destructive text-sm">{errors.phone}</p>}
          </div>

          {/* Message (optional) */}
          <div className="space-y-2">
            <Label htmlFor="lead-message" className="text-foreground font-medium">
              Message <span className="text-muted-foreground text-sm">(optional)</span>
            </Label>
            <Textarea
              id="lead-message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Any specific concerns or questions?"
              rows={2}
              className={`rounded-xl resize-none ${errors.message ? "border-destructive focus-visible:ring-destructive" : ""}`}
            />
            {errors.message && <p className="text-destructive text-sm">{errors.message}</p>}
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className={`w-full gap-2 h-12 rounded-xl ${actionType === "chat" ? "bg-green-500 hover:bg-green-600" : ""}`}
            variant={actionType === "chat" ? "default" : "wellness"}
          >
            {actionType === "chat" ? (
              <MessageCircle className="w-4 h-4" />
            ) : (
              <Send className="w-4 h-4" />
            )}
            {getButtonText()}
          </Button>

          <p className="text-center text-muted-foreground text-xs">
            Your details will be sent via WhatsApp for a quick response.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LeadCaptureDialog;
