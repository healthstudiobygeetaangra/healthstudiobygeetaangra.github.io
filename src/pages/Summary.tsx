import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, Target, TrendingUp, Calendar, ArrowLeft } from "lucide-react";
import Footer from "@/components/Footer";

const Summary = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<any>(null);

  useEffect(() => {
    const data = sessionStorage.getItem("healthFormData");
    if (!data) {
      navigate("/questionnaire");
      return;
    }
    setFormData(JSON.parse(data));
  }, [navigate]);

  if (!formData) return null;

  const bmi = formData.weight && formData.height 
    ? (parseFloat(formData.weight) / Math.pow(parseFloat(formData.height) / 100, 2)).toFixed(1)
    : null;

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return "Underweight";
    if (bmi < 25) return "Normal weight";
    if (bmi < 30) return "Overweight";
    return "Obese";
  };

  return (
    <div className="min-h-screen bg-gradient-soft py-8 md:py-12 relative">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => navigate('/')}
        className="absolute top-4 left-4 gap-2"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </Button>
      <div className="container mx-auto px-4 max-w-4xl pt-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-light rounded-full mb-4">
            <CheckCircle2 className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Great Job, {formData.name}!
          </h1>
          <p className="text-lg text-muted-foreground">
            Here's your personalized health summary
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Your Profile */}
          <Card className="p-6 rounded-3xl shadow-soft">
            <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center">
              <Target className="mr-2 text-primary" />
              Your Profile
            </h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Age:</span>
                <span className="font-medium">{formData.age} years</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Gender:</span>
                <span className="font-medium capitalize">{formData.gender}</span>
              </div>
              {bmi && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">BMI:</span>
                  <span className="font-medium">{bmi} ({getBMICategory(parseFloat(bmi))})</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-muted-foreground">Activity Level:</span>
                <span className="font-medium">{formData.lifestyle?.split("(")[0]}</span>
              </div>
            </div>
          </Card>

          {/* Your Goal */}
          <Card className="p-6 rounded-3xl shadow-soft">
            <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center">
              <TrendingUp className="mr-2 text-primary" />
              Your Goal
            </h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Primary Goal:</span>
                <span className="font-medium">{formData.goal}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Timeline:</span>
                <span className="font-medium">{formData.timeline}</span>
              </div>
              {formData.conditions.length > 0 && formData.conditions[0] !== "None" && (
                <div>
                  <span className="text-muted-foreground">Health Conditions:</span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.conditions.map((condition: string) => (
                      <span key={condition} className="px-3 py-1 bg-accent rounded-full text-xs font-medium">
                        {condition}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Insights */}
        <Card className="p-6 md:p-8 rounded-3xl shadow-soft mb-8 bg-gradient-warm">
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center">
            <Calendar className="mr-2 text-primary" />
            Your Personalized Insights
          </h2>
          <div className="space-y-4 text-foreground">
            <p className="leading-relaxed">
              Based on your profile, we can see you're committed to {formData.goal.toLowerCase()}. 
              That's wonderful! Your journey is unique, and having the right guidance makes all the difference.
            </p>
            
            {formData.challenges.length > 0 && (
              <p className="leading-relaxed">
                We understand you're facing challenges like <strong>{formData.challenges[0].toLowerCase()}</strong>
                {formData.challenges.length > 1 && ` and ${formData.challenges[1].toLowerCase()}`}. 
                These are common hurdles, and our consultant specializes in helping people overcome them.
              </p>
            )}

            <p className="leading-relaxed">
              With your <strong>{formData.lifestyle?.split("(")[0].toLowerCase()}</strong> lifestyle and 
              <strong> {formData.diet.toLowerCase()}</strong> preference, we'll create a practical, sustainable plan 
              that fits seamlessly into your daily routine.
            </p>

            <div className="bg-primary-light p-4 rounded-2xl mt-6">
              <p className="font-semibold text-primary text-center">
                🎯 You're just one step away from expert guidance tailored specifically for you!
              </p>
            </div>
          </div>
        </Card>

        {/* CTA */}
        <div className="text-center">
          <h3 className="text-2xl font-semibold text-foreground mb-4">
            Ready to meet your dedicated consultant?
          </h3>
          <p className="text-muted-foreground mb-6">
            Get personalized support and start seeing real results
          </p>
          <Button 
            variant="wellness" 
            size="lg"
            onClick={() => navigate("/consultant")}
            className="hover:scale-105 transition-transform"
          >
            Meet Your Consultant
          </Button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Summary;
