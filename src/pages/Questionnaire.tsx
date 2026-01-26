import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { useNavigate } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import { ChevronRight, ChevronLeft, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import Footer from "@/components/Footer";
import { z } from "zod";

// Validation schema for questionnaire
const questionnaireSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  phone: z.string().trim().min(10, "Phone must be at least 10 digits").max(20, "Phone must be less than 20 characters"),
  age: z.string().optional().refine(val => !val || (/^\d+$/.test(val) && parseInt(val) >= 1 && parseInt(val) <= 120), {
    message: "Age must be between 1 and 120"
  }),
  gender: z.string().optional(),
  weight: z.string().optional().refine(val => !val || (/^\d+(\.\d+)?$/.test(val) && parseFloat(val) >= 1 && parseFloat(val) <= 500), {
    message: "Weight must be between 1 and 500 kg"
  }),
  heightFormat: z.enum(["cm", "feet"]),
  heightCm: z.string().optional().refine(val => !val || (/^\d+$/.test(val) && parseInt(val) >= 50 && parseInt(val) <= 250), {
    message: "Height must be between 50 and 250 cm"
  }),
  heightFeet: z.string().optional().refine(val => !val || (/^\d+$/.test(val) && parseInt(val) >= 0 && parseInt(val) <= 8), {
    message: "Feet must be between 0 and 8"
  }),
  heightInches: z.string().optional().refine(val => !val || (/^\d+$/.test(val) && parseInt(val) >= 0 && parseInt(val) <= 11), {
    message: "Inches must be between 0 and 11"
  }),
  goal: z.string().max(100).optional(),
  conditions: z.array(z.string().max(50)),
  lifestyle: z.string().max(100).optional(),
  diet: z.string().max(50).optional(),
  challenges: z.array(z.string().max(50)),
  timeline: z.string().max(50).optional(),
  budget: z.string().max(100).optional(),
});

// Sanitize text to prevent injection
const sanitizeText = (text: string): string => {
  return text
    .replace(/[<>]/g, '') // Remove angle brackets
    .trim()
    .slice(0, 500); // Enforce max length
};

const WHATSAPP_NUMBER = "919310178956";

interface FormData {
  age: string;
  gender: string;
  weight: string;
  heightFormat: "cm" | "feet";
  heightCm: string;
  heightFeet: string;
  heightInches: string;
  goal: string;
  conditions: string[];
  lifestyle: string;
  diet: string;
  challenges: string[];
  timeline: string;
  budget: string;
  name: string;
  email: string;
  phone: string;
}

const Questionnaire = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const totalSteps = 5;
  const [formData, setFormData] = useState<FormData>({
    age: "",
    gender: "",
    weight: "",
    heightFormat: "feet",
    heightCm: "",
    heightFeet: "",
    heightInches: "",
    goal: "",
    conditions: [],
    lifestyle: "",
    diet: "",
    challenges: [],
    timeline: "",
    budget: "",
    name: "",
    email: "",
    phone: ""
  });
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when field is updated
    if (fieldErrors[field]) {
      setFieldErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const toggleArrayItem = (field: "conditions" | "challenges", item: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(item)
        ? prev[field].filter(i => i !== item)
        : [...prev[field], item]
    }));
  };

  // Step-specific validation
  const validateStep = (currentStep: number): boolean => {
    const errors: Record<string, string> = {};
    
    if (currentStep === 1) {
      // Step 1: Basic info - all fields required
      if (!formData.age.trim()) {
        errors.age = "Age is required";
      } else if (!/^\d+$/.test(formData.age) || parseInt(formData.age) < 1 || parseInt(formData.age) > 120) {
        errors.age = "Age must be between 1 and 120";
      }
      
      if (!formData.gender) {
        errors.gender = "Please select your gender";
      }
      
      if (!formData.weight.trim()) {
        errors.weight = "Weight is required";
      } else if (!/^\d+(\.\d+)?$/.test(formData.weight) || parseFloat(formData.weight) < 1 || parseFloat(formData.weight) > 500) {
        errors.weight = "Weight must be between 1 and 500 kg";
      }
      
      if (formData.heightFormat === "cm") {
        if (!formData.heightCm.trim()) {
          errors.heightCm = "Height is required";
        } else if (!/^\d+$/.test(formData.heightCm) || parseInt(formData.heightCm) < 50 || parseInt(formData.heightCm) > 250) {
          errors.heightCm = "Height must be between 50 and 250 cm";
        }
      } else {
        // Feet format - require at least feet
        if (!formData.heightFeet.trim()) {
          errors.heightFeet = "Feet is required";
        } else if (!/^\d+$/.test(formData.heightFeet) || parseInt(formData.heightFeet) < 0 || parseInt(formData.heightFeet) > 8) {
          errors.heightFeet = "Feet must be between 0 and 8";
        }
        if (formData.heightInches && (!/^\d+$/.test(formData.heightInches) || parseInt(formData.heightInches) < 0 || parseInt(formData.heightInches) > 11)) {
          errors.heightInches = "Inches must be between 0 and 11";
        }
      }
    }
    
    if (currentStep === 5) {
      // Step 5: Contact info - required fields
      if (!formData.name.trim()) {
        errors.name = "Name is required";
      } else if (formData.name.length > 100) {
        errors.name = "Name must be less than 100 characters";
      }
      if (!formData.email.trim()) {
        errors.email = "Email is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        errors.email = "Invalid email address";
      }
      if (!formData.phone.trim()) {
        errors.phone = "Phone number is required";
      } else if (formData.phone.length < 10) {
        errors.phone = "Phone must be at least 10 digits";
      }
    }
    
    setFieldErrors(errors);
    
    if (Object.keys(errors).length > 0) {
      const firstError = Object.values(errors)[0];
      toast.error(firstError);
      return false;
    }
    return true;
  };

  const nextStep = () => {
    if (!validateStep(step)) {
      return;
    }
    
    if (step < totalSteps) {
      setStep(step + 1);
      window.scrollTo(0, 0);
    } else {
      handleSubmit();
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setFieldErrors({});
      setStep(step - 1);
      window.scrollTo(0, 0);
    }
  };

  const formatHeight = (data: FormData): string => {
    if (data.heightFormat === "cm") {
      return data.heightCm ? `${data.heightCm} cm` : 'Not specified';
    } else {
      return data.heightFeet || data.heightInches 
        ? `${data.heightFeet || '0'}' ${data.heightInches || '0'}"` 
        : 'Not specified';
    }
  };

  const formatWhatsAppMessage = (data: FormData): string => {
    const submissionDate = new Date().toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
    
    const lines = [
      `🌿 *New Health Profile Submission*`,
      `📅 *Submitted on:* ${submissionDate}`,
      ``,
      `👤 *Personal Details*`,
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      `Phone: ${data.phone}`,
      `Age: ${data.age || 'Not specified'}`,
      `Gender: ${data.gender || 'Not specified'}`,
      `Weight: ${data.weight ? data.weight + ' kg' : 'Not specified'}`,
      `Height: ${formatHeight(data)}`,
      ``,
      `🎯 *Health Goals*`,
      `Primary Goal: ${data.goal || 'Not specified'}`,
      `Conditions: ${data.conditions.length > 0 ? data.conditions.join(', ') : 'None'}`,
      ``,
      `🏃 *Lifestyle*`,
      `Activity Level: ${data.lifestyle || 'Not specified'}`,
      `Diet Preference: ${data.diet || 'Not specified'}`,
      ``,
      `⚡ *Challenges*`,
      `${data.challenges.length > 0 ? data.challenges.join(', ') : 'None specified'}`,
      ``,
      `⏰ *Timeline & Budget*`,
      `Timeline: ${data.timeline || 'Not specified'}`,
      `Budget: ${data.budget || 'Not specified'}`,
    ];
    return lines.join('\n');
  };

  const handleSubmit = () => {
    // Validate with Zod schema
    const validationResult = questionnaireSchema.safeParse(formData);
    
    if (!validationResult.success) {
      const firstError = validationResult.error.errors[0];
      toast.error(firstError.message || "Please check your input");
      return;
    }

    // Sanitize all text fields before storing/sending
    const sanitizedData = {
      ...formData,
      name: sanitizeText(formData.name),
      email: formData.email.trim().toLowerCase().slice(0, 255),
      phone: formData.phone.replace(/[^\d+\-\s()]/g, '').slice(0, 20),
      age: formData.age.replace(/\D/g, '').slice(0, 3),
      weight: formData.weight.replace(/[^\d.]/g, '').slice(0, 6),
      heightCm: formData.heightCm.replace(/\D/g, '').slice(0, 3),
      heightFeet: formData.heightFeet.replace(/\D/g, '').slice(0, 1),
      heightInches: formData.heightInches.replace(/\D/g, '').slice(0, 2),
      budget: sanitizeText(formData.budget),
    };

    // Store sanitized form data in session storage for summary page
    sessionStorage.setItem("healthFormData", JSON.stringify(sanitizedData));
    
    // Create WhatsApp message with sanitized form data
    const message = formatWhatsAppMessage(sanitizedData);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    
    toast.success("Great! Redirecting you to WhatsApp...");
    
    // Open WhatsApp with the form data
    window.open(whatsappUrl, '_blank');
    
    // Also navigate to summary page
    navigate("/summary");
  };

  const progressPercent = (step / totalSteps) * 100;

  return (
    <div className="min-h-screen bg-gradient-soft py-8 md:py-12 relative">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => navigate(-1)}
        className="absolute top-4 left-4 gap-2"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </Button>
      <div className="container mx-auto px-4 max-w-3xl pt-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2 text-center">
            Your Health Profile
          </h1>
          <p className="text-muted-foreground text-center mb-6">
            Step {step} of {totalSteps}
          </p>
          <Progress value={progressPercent} className="h-2" />
        </div>

        <Card className="p-6 md:p-8 shadow-soft rounded-3xl">
          {/* Step 1: Basic Info */}
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                Let's start with the basics
              </h2>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="age">Age <span className="text-destructive">*</span></Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="Enter your age"
                    value={formData.age}
                    onChange={(e) => updateFormData("age", e.target.value)}
                    className={`rounded-2xl ${fieldErrors.age ? "border-destructive focus-visible:ring-destructive" : ""}`}
                  />
                  {fieldErrors.age && <p className="text-destructive text-sm mt-1">{fieldErrors.age}</p>}
                </div>

                <div>
                  <Label>Gender <span className="text-destructive">*</span></Label>
                  <RadioGroup 
                    value={formData.gender} 
                    onValueChange={(v) => updateFormData("gender", v)}
                    className={fieldErrors.gender ? "border border-destructive rounded-lg p-2" : ""}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="female" id="female" />
                      <Label htmlFor="female" className="cursor-pointer">Female</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="male" id="male" />
                      <Label htmlFor="male" className="cursor-pointer">Male</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="other" id="other" />
                      <Label htmlFor="other" className="cursor-pointer">Other</Label>
                    </div>
                  </RadioGroup>
                  {fieldErrors.gender && <p className="text-destructive text-sm mt-1">{fieldErrors.gender}</p>}
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="weight">Weight (kg) <span className="text-destructive">*</span></Label>
                    <Input
                      id="weight"
                      type="number"
                      placeholder="Your weight"
                      value={formData.weight}
                      onChange={(e) => updateFormData("weight", e.target.value)}
                      className={`rounded-2xl ${fieldErrors.weight ? "border-destructive focus-visible:ring-destructive" : ""}`}
                    />
                    {fieldErrors.weight && <p className="text-destructive text-sm mt-1">{fieldErrors.weight}</p>}
                  </div>
                  <div>
                    <Label>Height <span className="text-destructive">*</span></Label>
                    <RadioGroup 
                      value={formData.heightFormat} 
                      onValueChange={(v) => updateFormData("heightFormat", v as "cm" | "feet")}
                      className="flex gap-4 mb-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="feet" id="height-feet" />
                        <Label htmlFor="height-feet" className="cursor-pointer text-sm">Feet/Inches</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="cm" id="height-cm" />
                        <Label htmlFor="height-cm" className="cursor-pointer text-sm">Centimeters</Label>
                      </div>
                    </RadioGroup>
                    
                    {formData.heightFormat === "cm" ? (
                      <div>
                        <Input
                          id="heightCm"
                          type="number"
                          placeholder="Height in cm"
                          min="50"
                          max="250"
                          value={formData.heightCm}
                          onChange={(e) => updateFormData("heightCm", e.target.value)}
                          className={`rounded-2xl ${fieldErrors.heightCm ? "border-destructive focus-visible:ring-destructive" : ""}`}
                        />
                        <span className="text-xs text-muted-foreground mt-1 block">Centimeters</span>
                        {fieldErrors.heightCm && <p className="text-destructive text-sm mt-1">{fieldErrors.heightCm}</p>}
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <div className="flex-1">
                          <Input
                            id="heightFeet"
                            type="number"
                            placeholder="Feet"
                            min="0"
                            max="8"
                            value={formData.heightFeet}
                            onChange={(e) => updateFormData("heightFeet", e.target.value)}
                            className={`rounded-2xl ${fieldErrors.heightFeet ? "border-destructive focus-visible:ring-destructive" : ""}`}
                          />
                          <span className="text-xs text-muted-foreground mt-1 block">Feet</span>
                          {fieldErrors.heightFeet && <p className="text-destructive text-sm mt-1">{fieldErrors.heightFeet}</p>}
                        </div>
                        <div className="flex-1">
                          <Input
                            id="heightInches"
                            type="number"
                            placeholder="Inches"
                            min="0"
                            max="11"
                            value={formData.heightInches}
                            onChange={(e) => updateFormData("heightInches", e.target.value)}
                            className={`rounded-2xl ${fieldErrors.heightInches ? "border-destructive focus-visible:ring-destructive" : ""}`}
                          />
                          <span className="text-xs text-muted-foreground mt-1 block">Inches</span>
                          {fieldErrors.heightInches && <p className="text-destructive text-sm mt-1">{fieldErrors.heightInches}</p>}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Goals & Conditions */}
          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                Your health goals
              </h2>
              
              <div className="space-y-4">
                <div>
                  <Label>What's your primary goal?</Label>
                  <RadioGroup value={formData.goal} onValueChange={(v) => updateFormData("goal", v)}>
                    {["Weight Loss", "Weight Gain", "Better Fitness", "Manage Health Condition", "General Wellness"].map(goal => (
                      <div key={goal} className="flex items-center space-x-2">
                        <RadioGroupItem value={goal} id={goal} />
                        <Label htmlFor={goal} className="cursor-pointer">{goal}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <div>
                  <Label>Do you have any of these conditions? (Select all that apply)</Label>
                  <div className="space-y-2 mt-2">
                    {["PCOS", "Thyroid", "Diabetes", "Hypertension", "None"].map(condition => (
                      <div key={condition} className="flex items-center space-x-2">
                        <Checkbox
                          id={condition}
                          checked={formData.conditions.includes(condition)}
                          onCheckedChange={() => toggleArrayItem("conditions", condition)}
                        />
                        <Label htmlFor={condition} className="cursor-pointer">{condition}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Lifestyle */}
          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                Your lifestyle
              </h2>
              
              <div className="space-y-4">
                <div>
                  <Label>Activity Level</Label>
                  <RadioGroup value={formData.lifestyle} onValueChange={(v) => updateFormData("lifestyle", v)}>
                    {["Sedentary (little or no exercise)", "Lightly active (1-3 days/week)", "Moderately active (3-5 days/week)", "Very active (6-7 days/week)"].map(level => (
                      <div key={level} className="flex items-center space-x-2">
                        <RadioGroupItem value={level} id={level} />
                        <Label htmlFor={level} className="cursor-pointer">{level}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <div>
                  <Label>Diet Preference</Label>
                  <RadioGroup value={formData.diet} onValueChange={(v) => updateFormData("diet", v)}>
                    {["Vegetarian", "Non-Vegetarian", "Vegan", "No Preference"].map(diet => (
                      <div key={diet} className="flex items-center space-x-2">
                        <RadioGroupItem value={diet} id={diet} />
                        <Label htmlFor={diet} className="cursor-pointer">{diet}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Challenges & Timeline */}
          {step === 4 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                What are your challenges?
              </h2>
              
              <div className="space-y-4">
                <div>
                  <Label>Select your main challenges (Select all that apply)</Label>
                  <div className="space-y-2 mt-2">
                    {["Busy schedule", "Emotional eating", "Lack of motivation", "Food cravings", "Don't know what to eat"].map(challenge => (
                      <div key={challenge} className="flex items-center space-x-2">
                        <Checkbox
                          id={challenge}
                          checked={formData.challenges.includes(challenge)}
                          onCheckedChange={() => toggleArrayItem("challenges", challenge)}
                        />
                        <Label htmlFor={challenge} className="cursor-pointer">{challenge}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label>Timeline Expectation</Label>
                  <RadioGroup value={formData.timeline} onValueChange={(v) => updateFormData("timeline", v)}>
                    {["1-3 months", "3-6 months", "6-12 months", "Long-term lifestyle change"].map(time => (
                      <div key={time} className="flex items-center space-x-2">
                        <RadioGroupItem value={time} id={time} />
                        <Label htmlFor={time} className="cursor-pointer">{time}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <div>
                  <Label htmlFor="budget">Monthly Budget (Optional)</Label>
                  <Input
                    id="budget"
                    placeholder="Your budget for wellness program"
                    value={formData.budget}
                    onChange={(e) => updateFormData("budget", e.target.value)}
                    className="rounded-2xl"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Contact Info */}
          {step === 5 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                Almost there! How can we reach you?
              </h2>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    placeholder="Your full name"
                    value={formData.name}
                    onChange={(e) => updateFormData("name", e.target.value)}
                    className={`rounded-2xl ${fieldErrors.name ? "border-destructive focus-visible:ring-destructive" : ""}`}
                    required
                  />
                  {fieldErrors.name && <p className="text-destructive text-sm mt-1">{fieldErrors.name}</p>}
                </div>

                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={(e) => updateFormData("email", e.target.value)}
                    className={`rounded-2xl ${fieldErrors.email ? "border-destructive focus-visible:ring-destructive" : ""}`}
                    required
                  />
                  {fieldErrors.email && <p className="text-destructive text-sm mt-1">{fieldErrors.email}</p>}
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+91 XXXXX XXXXX"
                    value={formData.phone}
                    onChange={(e) => updateFormData("phone", e.target.value)}
                    className={`rounded-2xl ${fieldErrors.phone ? "border-destructive focus-visible:ring-destructive" : ""}`}
                    required
                  />
                  {fieldErrors.phone && <p className="text-destructive text-sm mt-1">{fieldErrors.phone}</p>}
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-border">
            {step > 1 && (
              <Button variant="soft" onClick={prevStep}>
                <ChevronLeft className="mr-2" />
                Previous
              </Button>
            )}
            <Button 
              variant={step === totalSteps ? "wellness" : "default"} 
              onClick={nextStep}
              className="ml-auto"
            >
              {step === totalSteps ? "View My Results" : "Continue"}
              {step < totalSteps && <ChevronRight className="ml-2" />}
            </Button>
          </div>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default Questionnaire;
