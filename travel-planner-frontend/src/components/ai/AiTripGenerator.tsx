import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Sparkles, Loader2 } from "lucide-react";

export default function AiTripGenerator({ onApplyPlan }) {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [destination, setDestination] = useState("");
  const [tripLength, setTripLength] = useState("3");
  const [preferences, setPreferences] = useState("");
  const [budget, setBudget] = useState("medium");
  const [generatedPlan, setGeneratedPlan] = useState(null);

  const generateSamplePlan = () => {
    setIsGenerating(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const plan = {
        destination: destination,
        tripName: `${destination} Adventure`,
        description: `Explore the wonders of ${destination} with this AI-generated itinerary tailored for a ${budget} budget.`,
        startDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
        endDate: new Date(Date.now() + (30 + parseInt(tripLength)) * 24 * 60 * 60 * 1000),
        days: Array.from({ length: parseInt(tripLength) }, (_, i) => ({
          id: `day-${i+1}`,
          events: [
            {
              id: `event-${i+1}-1`,
              time: "09:00",
              activity: i === 0 
                ? `Arrival and check-in to accommodation`
                : i === parseInt(tripLength) - 1
                  ? `Checkout and departure`
                  : `Visit ${["Museum", "Park", "Historical Site", "Beach", "Market"][i % 5]}`,
              location: `${destination} ${["Central", "Downtown", "Old Town", "Waterfront", "District"][i % 5]}`,
              notes: ""
            },
            {
              id: `event-${i+1}-2`,
              time: "13:00",
              activity: `Lunch at local restaurant`,
              location: `${destination} Food Quarter`,
              notes: ""
            },
            {
              id: `event-${i+1}-3`,
              time: "15:00",
              activity: `${["Shopping", "Sightseeing", "Guided Tour", "Local Experience", "Relaxation"][i % 5]}`,
              location: `${destination} ${["Square", "Avenue", "Boulevard", "Promenade", "Quarter"][i % 5]}`,
              notes: ""
            },
            {
              id: `event-${i+1}-4`,
              time: "19:00",
              activity: `Dinner and evening entertainment`,
              location: `${destination} Entertainment District`,
              notes: ""
            }
          ]
        })),
        accommodation: {
          name: `${destination} ${budget === "luxury" ? "Grand Hotel" : budget === "medium" ? "Comfort Inn" : "Budget Hostel"}`,
          location: `Central ${destination}`,
          checkIn: "14:00",
          checkOut: "11:00",
          confirmation: "AI123456"
        }
      };
      
      setGeneratedPlan(plan);
      setIsGenerating(false);
    }, 2000);
  };

  const handleApplyPlan = () => {
    onApplyPlan(generatedPlan);
    setIsOpen(false);
    toast({
      title: "AI Plan Applied",
      description: "Your AI-generated trip plan has been applied to the itinerary.",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Sparkles className="h-4 w-4" />
          Generate with AI
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>AI Trip Planner</DialogTitle>
          <DialogDescription>
            Let AI generate a personalized trip itinerary based on your preferences.
          </DialogDescription>
        </DialogHeader>
        
        {!generatedPlan ? (
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="destination" className="text-right text-sm">
                Destination
              </label>
              <Input
                id="destination"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="Paris, Tokyo, New York..."
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="length" className="text-right text-sm">
                Trip Length
              </label>
              <Select value={tripLength} onValueChange={setTripLength}>
                <SelectTrigger className="col-span-3" id="length">
                  <SelectValue placeholder="Trip length" />
                </SelectTrigger>
                <SelectContent>
                  {[3, 5, 7, 10, 14].map((days) => (
                    <SelectItem key={days} value={days.toString()}>
                      {days} days
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="budget" className="text-right text-sm">
                Budget
              </label>
              <Select value={budget} onValueChange={setBudget}>
                <SelectTrigger className="col-span-3" id="budget">
                  <SelectValue placeholder="Budget level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="budget">Budget</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="luxury">Luxury</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <label htmlFor="preferences" className="text-right text-sm">
                Preferences
              </label>
              <Textarea
                id="preferences"
                placeholder="Tell us what you're interested in... (museums, food, outdoor activities, etc.)"
                className="col-span-3"
                value={preferences}
                onChange={(e) => setPreferences(e.target.value)}
              />
            </div>
          </div>
        ) : (
          <div className="py-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>{generatedPlan.tripName}</CardTitle>
                <CardDescription>{generatedPlan.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm">
                  <strong>Duration:</strong> {generatedPlan.days.length} days
                </p>
                <p className="text-sm">
                  <strong>Highlights:</strong> Daily activities including sightseeing, local 
                  experiences, and cultural immersion
                </p>
                <p className="text-sm">
                  <strong>Accommodation:</strong> {generatedPlan.accommodation.name}
                </p>
              </CardContent>
              <CardFooter>
                <p className="text-xs text-muted-foreground">
                  This AI-generated plan is a starting point and can be fully customized.
                </p>
              </CardFooter>
            </Card>
          </div>
        )}
        
        <DialogFooter>
          {!generatedPlan ? (
            <Button onClick={generateSamplePlan} disabled={isGenerating || !destination}>
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generate Plan
                </>
              )}
            </Button>
          ) : (
            <>
              <Button variant="outline" onClick={() => setGeneratedPlan(null)}>
                Regenerate
              </Button>
              <Button onClick={handleApplyPlan}>
                Apply This Plan
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 