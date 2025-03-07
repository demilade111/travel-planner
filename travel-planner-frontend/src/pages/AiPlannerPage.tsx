import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { DateRangePicker } from "@/components/ui/date-picker";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  RadioGroup,
  RadioGroupItem
} from "@/components/ui/radio-group";
import {
  Slider
} from "@/components/ui/slider";
import {
  CheckSquare,
  Sparkles,
  Plane,
  Map,
  Calendar,
  Users,
  Compass,
  Sun,
  Moon,
  Coffee,
  Utensils,
  Music,
  Camera,
  Bookmark,
  ChevronRight,
  LoaderCircle,
  Heart,
  Percent,
  ThumbsUp,
  ThumbsDown,
  Check,
  Save,
  FileDown,
  Share2,
  Clock
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

export default function AiPlannerPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [itineraryGenerated, setItineraryGenerated] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  const [dateRange, setDateRange] = useState({ from: new Date(), to: null });
  
  // Form state
  const [destination, setDestination] = useState("");
  const [tripStyle, setTripStyle] = useState("balanced");
  const [budget, setBudget] = useState([500]);
  const [interests, setInterests] = useState([]);
  const [travelPace, setTravelPace] = useState("moderate");
  const [accommodation, setAccommodation] = useState("mid-range");
  const [additionalNotes, setAdditionalNotes] = useState("");
  
  // Mock generated itinerary data (this would come from AI)
  const [generatedItinerary, setGeneratedItinerary] = useState(null);
  
  const handleGenerate = () => {
    setIsGenerating(true);
    
    // This would be an API call to your AI service
    setTimeout(() => {
      setIsGenerating(false);
      setItineraryGenerated(true);
      setGeneratedItinerary({
        destination: destination,
        dates: { 
          from: dateRange.from,
          to: dateRange.to || new Date(dateRange.from.getTime() + (7 * 24 * 60 * 60 * 1000))
        },
        tripStyle: tripStyle,
        days: [
          {
            day: 1,
            date: new Date(dateRange.from),
            weather: "Sunny, 75°F",
            events: [
              {
                id: "e1",
                time: "09:00",
                activity: "Breakfast at local café",
                location: "City Center Café",
                cost: 15,
                notes: "Popular with locals, try their specialty coffee",
                image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y2FmZXxlbnwwfHwwfHw%3D"
              },
              {
                id: "e2",
                time: "10:30",
                activity: "Visit Art Museum",
                location: "National Art Gallery",
                cost: 25,
                notes: "Special exhibition on Impressionism currently showing",
                image: "https://images.unsplash.com/photo-1566054757965-8c4562a835de?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YXJ0JTIwbXVzZXVtfGVufDB8fDB8fA%3D%3D"
              },
              {
                id: "e3",
                time: "13:00",
                activity: "Lunch at Harbor Restaurant",
                location: "Harbor View Bistro",
                cost: 35,
                notes: "Seafood specialties, make a reservation",
                image: "https://images.unsplash.com/photo-1502301103665-0b95cc738daf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cmVzdGF1cmFudHxlbnwwfHwwfHw%3D"
              },
              {
                id: "e4",
                time: "15:00",
                activity: "Historical Walking Tour",
                location: "Old Town District",
                cost: 20,
                notes: "2-hour tour, comfortable shoes recommended",
                image: "https://images.unsplash.com/photo-1582376432754-c31c4564b5d3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8d2Fsa2luZyUyMHRvdXJ8ZW58MHx8MHx8"
              },
              {
                id: "e5",
                time: "19:00",
                activity: "Dinner at acclaimed restaurant",
                location: "Fusion Kitchen",
                cost: 60,
                notes: "Chef's tasting menu recommended, bar seating available",
                image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8cmVzdGF1cmFudHxlbnwwfHwwfHw%3D"
              }
            ]
          },
          {
            day: 2,
            date: new Date(dateRange.from.getTime() + (24 * 60 * 60 * 1000)),
            weather: "Partly cloudy, 70°F",
            events: [
              {
                id: "e6",
                time: "08:30",
                activity: "Morning yoga in the park",
                location: "Central Park",
                cost: 0,
                notes: "Free community class, bring your own mat",
                image: "https://images.unsplash.com/photo-1588286840104-8957b019727f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8eW9nYXxlbnwwfHwwfHw%3D"
              },
              {
                id: "e7",
                time: "10:00",
                activity: "Visit Botanical Gardens",
                location: "City Botanical Gardens",
                cost: 15,
                notes: "Spring flower exhibition, guided tours available",
                image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8Ym90YW5pY2FsJTIwZ2FyZGVufGVufDB8fDB8fA%3D%3D"
              }
            ]
          }
        ],
        accommodations: [
          {
            name: "Central City Hotel",
            location: "Downtown",
            cost: 150,
            notes: "4-star hotel with pool and spa",
            image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8aG90ZWx8ZW58MHx8MHx8"
          }
        ],
        totalBudget: budget[0],
        estimatedCost: 450,
      });
      
      toast({
        title: "Itinerary Generated!",
        description: "Your AI-powered travel plan is ready to explore.",
        duration: 5000,
      });
    }, 3000);
  };

  const handleSaveItinerary = () => {
    // In a real app, would save to database
    toast({
      title: "Itinerary Saved!",
      description: "Your travel plan has been saved to your account.",
      duration: 3000,
    });
    
    // Navigate to edit page
    navigate("/create-itinerary", { 
      state: { itinerary: generatedItinerary } 
    });
  };

  return (
    <div className="container mx-auto py-12 px-4 max-w-7xl">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight mb-4">
          <span className="bg-clip-text text-transparent bg-gradient-modern">
            AI Trip Planner
          </span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Tell us about your dream trip and let our AI create a personalized itinerary in seconds.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Panel */}
        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Sparkles className="h-5 w-5 mr-2 text-primary" />
                Trip Preferences
              </CardTitle>
              <CardDescription>
                Customize your preferences for the perfect trip
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {!itineraryGenerated ? (
                <>
                  {/* Step 1: Basic Trip Details */}
                  <div className={`space-y-4 ${activeStep !== 1 ? 'hidden' : ''}`}>
                    <FormItem>
                      <FormLabel>Where do you want to go?</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Paris, Japan, New York..." 
                          value={destination}
                          onChange={(e) => setDestination(e.target.value)}
                        />
                      </FormControl>
                    </FormItem>
                    
                    <FormItem>
                      <FormLabel>When do you plan to travel?</FormLabel>
                      <FormControl>
                        <DateRangePicker
                          dateRange={dateRange}
                          setDateRange={setDateRange}
                        />
                      </FormControl>
                    </FormItem>
                    
                    <FormItem>
                      <FormLabel>Trip style preference</FormLabel>
                      <RadioGroup 
                        value={tripStyle} 
                        onValueChange={setTripStyle}
                        className="flex flex-col space-y-1"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="relaxed" id="relaxed" />
                          <label htmlFor="relaxed" className="flex items-center text-sm font-medium">
                            <Sun className="h-4 w-4 mr-2 text-orange-500" />
                            Relaxed & Leisurely
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="balanced" id="balanced" />
                          <label htmlFor="balanced" className="flex items-center text-sm font-medium">
                            <Compass className="h-4 w-4 mr-2 text-blue-500" />
                            Balanced Mix
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="active" id="active" />
                          <label htmlFor="active" className="flex items-center text-sm font-medium">
                            <Plane className="h-4 w-4 mr-2 text-green-500" />
                            Active & Adventurous
                          </label>
                        </div>
                      </RadioGroup>
                    </FormItem>
                  </div>
                  
                  {/* Step 2: Budget & Interests */}
                  <div className={`space-y-4 ${activeStep !== 2 ? 'hidden' : ''}`}>
                    <FormItem>
                      <FormLabel>
                        Daily Budget (per person)
                        <span className="ml-2 text-sm font-normal text-muted-foreground">
                          ${budget}
                        </span>
                      </FormLabel>
                      <FormControl>
                        <Slider
                          defaultValue={budget}
                          max={2000}
                          min={50}
                          step={50}
                          onValueChange={setBudget}
                          className="py-4"
                        />
                      </FormControl>
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>Budget</span>
                        <span>Mid-range</span>
                        <span>Luxury</span>
                      </div>
                    </FormItem>
                    
                    <FormItem>
                      <FormLabel>Interests</FormLabel>
                      <FormControl>
                        <div className="grid grid-cols-2 gap-2">
                          {[
                            { value: "art", icon: <Camera className="h-3 w-3 mr-1" />, label: "Art & Culture" },
                            { value: "food", icon: <Utensils className="h-3 w-3 mr-1" />, label: "Food & Dining" },
                            { value: "nature", icon: <Map className="h-3 w-3 mr-1" />, label: "Nature" },
                            { value: "history", icon: <Bookmark className="h-3 w-3 mr-1" />, label: "History" },
                            { value: "nightlife", icon: <Moon className="h-3 w-3 mr-1" />, label: "Nightlife" },
                            { value: "shopping", icon: <Percent className="h-3 w-3 mr-1" />, label: "Shopping" },
                            { value: "relaxation", icon: <Coffee className="h-3 w-3 mr-1" />, label: "Relaxation" },
                            { value: "music", icon: <Music className="h-3 w-3 mr-1" />, label: "Live Music" },
                          ].map((interest) => (
                            <Button
                              key={interest.value}
                              variant={interests.includes(interest.value) ? "default" : "outline"}
                              className="flex items-center justify-start h-9"
                              onClick={() => {
                                if (interests.includes(interest.value)) {
                                  setInterests(interests.filter(i => i !== interest.value));
                                } else {
                                  setInterests([...interests, interest.value]);
                                }
                              }}
                            >
                              {interest.icon}
                              <span className="text-xs">{interest.label}</span>
                            </Button>
                          ))}
                        </div>
                      </FormControl>
                    </FormItem>
                  </div>
                  
                  {/* Step 3: Additional Preferences */}
                  <div className={`space-y-4 ${activeStep !== 3 ? 'hidden' : ''}`}>
                    <FormItem>
                      <FormLabel>Travel Pace</FormLabel>
                      <Select value={travelPace} onValueChange={setTravelPace}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select pace" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="relaxed">Relaxed (1-2 activities/day)</SelectItem>
                          <SelectItem value="moderate">Moderate (2-3 activities/day)</SelectItem>
                          <SelectItem value="busy">Busy (4+ activities/day)</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                    
                    <FormItem>
                      <FormLabel>Accommodation Preference</FormLabel>
                      <Select value={accommodation} onValueChange={setAccommodation}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select accommodation type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="budget">Budget (Hostels, 2-star hotels)</SelectItem>
                          <SelectItem value="mid-range">Mid-range (3-4 star hotels)</SelectItem>
                          <SelectItem value="luxury">Luxury (4-5 star hotels)</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                    
                    <FormItem>
                      <FormLabel>Additional Notes</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Any dietary restrictions, accessibility needs, or special requests..." 
                          value={additionalNotes}
                          onChange={(e) => setAdditionalNotes(e.target.value)}
                          className="min-h-[100px]"
                        />
                      </FormControl>
                    </FormItem>
                  </div>
                </>
              ) : (
                // Summary view after generation
                <div className="space-y-4">
                  <div className="rounded-lg bg-primary/10 p-4">
                    <h3 className="font-medium flex items-center">
                      <Check className="h-5 w-5 mr-2 text-green-500" />
                      AI Itinerary Generated!
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Your personalized trip plan is ready to explore.
                    </p>
                  </div>
                  
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="preferences">
                      <AccordionTrigger className="text-sm font-medium">
                        Your Trip Preferences
                      </AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-2 text-sm">
                          <li className="flex justify-between">
                            <span className="text-muted-foreground">Destination:</span>
                            <span className="font-medium">{destination}</span>
                          </li>
                          <li className="flex justify-between">
                            <span className="text-muted-foreground">Dates:</span>
                            <span className="font-medium">
                              {dateRange.from.toLocaleDateString()} - 
                              {dateRange.to ? dateRange.to.toLocaleDateString() : "Not specified"}
                            </span>
                          </li>
                          <li className="flex justify-between">
                            <span className="text-muted-foreground">Budget:</span>
                            <span className="font-medium">${budget}/day</span>
                          </li>
                          <li className="flex justify-between">
                            <span className="text-muted-foreground">Style:</span>
                            <span className="font-medium capitalize">{tripStyle}</span>
                          </li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex flex-col space-y-2">
              {!itineraryGenerated ? (
                <>
                  <div className="flex justify-between w-full mb-2">
                    {activeStep > 1 && (
                      <Button
                        variant="outline"
                        onClick={() => setActiveStep(activeStep - 1)}
                      >
                        Back
                      </Button>
                    )}
                    {activeStep < 3 ? (
                      <Button
                        variant="default"
                        className="ml-auto"
                        onClick={() => setActiveStep(activeStep + 1)}
                        disabled={activeStep === 1 && !destination}
                      >
                        Next
                      </Button>
                    ) : (
                      <Button
                        className="ml-auto"
                        onClick={handleGenerate}
                        disabled={isGenerating || !destination}
                      >
                        {isGenerating ? (
                          <>
                            <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                            Generating...
                          </>
                        ) : (
                          <>
                            <Sparkles className="mr-2 h-4 w-4" />
                            Generate Itinerary
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                  <div className="flex justify-center w-full gap-1">
                    {[1, 2, 3].map((step) => (
                      <div
                        key={step}
                        className={`h-1.5 rounded-full ${
                          step === activeStep
                            ? "bg-primary w-8"
                            : (step < activeStep ? "bg-primary/40" : "bg-gray-200 dark:bg-gray-700")
                        } w-5 transition-all`}
                        onClick={() => step < activeStep && setActiveStep(step)}
                        style={{ cursor: step < activeStep ? "pointer" : "default" }}
                      />
                    ))}
                  </div>
                </>
              ) : (
                <div className="flex flex-col w-full space-y-2">
                  <Button 
                    variant="default" 
                    className="w-full"
                    onClick={handleSaveItinerary}
                  >
                    <Save className="mr-2 h-4 w-4" />
                    Save & Edit Itinerary
                  </Button>
                  <Button variant="outline" className="w-full">
                    <FileDown className="mr-2 h-4 w-4" />
                    Download PDF
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Share2 className="mr-2 h-4 w-4" />
                    Share Itinerary
                  </Button>
                </div>
              )}
            </CardFooter>
          </Card>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-2">
          {isGenerating ? (
            <div className="bg-card rounded-lg border shadow-sm p-8 h-full min-h-[500px] flex flex-col items-center justify-center">
              <div className="text-center">
                <div className="relative w-20 h-20 mx-auto mb-4">
                  <div className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-primary/20 animate-pulse"></div>
                  <Sparkles className="w-12 h-12 text-primary absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                </div>
                <h3 className="text-xl font-medium mb-2">Creating Your Dream Trip</h3>
                <p className="text-muted-foreground text-sm max-w-md mx-auto">
                  Our AI is crafting a personalized itinerary based on your preferences, including local recommendations and hidden gems.
                </p>
                
                <div className="flex items-center justify-center mt-6 space-x-4">
                  <div className="w-4 h-4 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-4 h-4 rounded-full bg-primary animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-4 h-4 rounded-full bg-primary animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          ) : !itineraryGenerated ? (
            <div className="bg-card rounded-lg border shadow-sm p-8 h-full min-h-[500px] flex flex-col justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-background/80 z-0"></div>
              <div className="relative z-10 text-center max-w-xl mx-auto">
                <Sparkles className="w-12 h-12 text-primary mx-auto mb-6" />
                <h2 className="text-2xl font-bold mb-4">
                  Let AI Plan Your Perfect Trip
                </h2>
                <p className="text-muted-foreground mb-6">
                  Fill out your preferences and our AI will create a personalized itinerary with activities, restaurants, and hidden gems tailored just for you.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center mt-8">
                  {[
                    {
                      icon: <Clock className="h-10 w-10 text-primary mx-auto mb-2" />,
                      title: "Save Time",
                      description: "Create a complete travel plan in seconds instead of hours of research"
                    },
                    {
                      icon: <Map className="h-10 w-10 text-primary mx-auto mb-2" />,
                      title: "Local Expertise",
                      description: "Discover hidden gems and authentic experiences from local data"
                    },
                    {
                      icon: <Compass className="h-10 w-10 text-primary mx-auto mb-2" />,
                      title: "Personalized",
                      description: "Customized to your interests, budget, and travel style"
                    }
                  ].map((feature, index) => (
                    <div key={index} className="p-4">
                      {feature.icon}
                      <h3 className="font-medium">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Generated Itinerary */}
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">
                  Your {generatedItinerary.destination} Itinerary
                </h2>
                <div className="flex items-center space-x-2">
                  <Button size="sm" variant="ghost">
                    <ThumbsUp className="h-4 w-4 mr-1" />
                    Approve
                  </Button>
                  <Button size="sm" variant="ghost">
                    <ThumbsDown className="h-4 w-4 mr-1" />
                    Regenerate
                  </Button>
                </div>
              </div>
              
              <Tabs defaultValue="itinerary" className="w-full">
                <TabsList className="mb-4 w-full bg-muted">
                  <TabsTrigger value="itinerary" className="flex-1">
                    Daily Itinerary
                  </TabsTrigger>
                  <TabsTrigger value="summary" className="flex-1">
                    Trip Summary
                  </TabsTrigger>
                  <TabsTrigger value="accommodation" className="flex-1">
                    Accommodation
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="itinerary" className="space-y-6">
                  {generatedItinerary.days.map((day) => (
                    <Card key={day.day} className="overflow-hidden">
                      <CardHeader className="pb-3 bg-muted/50">
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-lg">
                            Day {day.day} - {day.date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
                          </CardTitle>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Sun className="h-4 w-4 mr-1" />
                            {day.weather}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="p-0">
                        <ScrollArea className="max-h-[600px]">
                          {day.events.map((event, idx) => (
                            <div 
                              key={event.id} 
                              className={`p-4 flex gap-4 ${idx % 2 === 1 ? 'bg-muted/20' : ''}`}
                            >
                              <div className="w-16 text-center">
                                <div className="text-sm font-medium">{event.time}</div>
                              </div>
                              
                              <div className="flex-1">
                                <h4 className="font-medium">{event.activity}</h4>
                                <div className="flex items-center text-sm text-muted-foreground">
                                  <MapPin className="h-3 w-3 mr-1" />
                                  {event.location}
                                </div>
                                {event.notes && (
                                  <p className="text-sm mt-1">{event.notes}</p>
                                )}
                                <div className="flex items-center mt-2 text-sm">
                                  <span className="text-green-600 dark:text-green-400 font-medium">
                                    ${event.cost}
                                  </span>
                                  <div className="ml-auto flex gap-1">
                                    <Button size="sm" variant="ghost" className="h-7 px-2">
                                      <Heart className="h-3.5 w-3.5" />
                                    </Button>
                                    <Button size="sm" variant="ghost" className="h-7 px-2">
                                      <Bookmark className="h-3.5 w-3.5" />
                                    </Button>
                                  </div>
                                </div>
                              </div>
                              
                              {event.image && (
                                <div className="hidden sm:block w-24 h-24">
                                  <img 
                                    src={event.image} 
                                    alt={event.activity} 
                                    className="w-full h-full object-cover rounded-md"
                                  />
                                </div>
                              )}
                            </div>
                          ))}
                        </ScrollArea>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>
                
                <TabsContent value="summary">
                  <Card>
                    <CardHeader>
                      <CardTitle>Trip Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <h4 className="text-sm font-medium text-muted-foreground">Destination</h4>
                          <p className="font-medium">{generatedItinerary.destination}</p>
                        </div>
                        <div className="space-y-1">
                          <h4 className="text-sm font-medium text-muted-foreground">Dates</h4>
                          <p className="font-medium">
                            {generatedItinerary.dates.from.toLocaleDateString()} - {generatedItinerary.dates.to.toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <h4 className="text-sm font-medium mb-2">Budget Breakdown</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Activities</span>
                            <span>$320</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Accommodation</span>
                            <span>$600</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Food & Dining</span>
                            <span>$400</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Transportation</span>
                            <span>$130</span>
                          </div>
                          <Separator />
                          <div className="flex justify-between font-medium">
                            <span>Total Estimated Cost</span>
                            <span>${generatedItinerary.estimatedCost}</span>
                          </div>
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>Your Budget</span>
                            <span>${generatedItinerary.totalBudget}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="accommodation">
                  <Card>
                    <CardHeader>
                      <CardTitle>Recommended Accommodations</CardTitle>
                      <CardDescription>
                        Places to stay based on your preferences
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {generatedItinerary.accommodations.map((acc) => (
                          <Card key={acc.name} className="overflow-hidden">
                            <div className="h-40 overflow-hidden">
                              <img 
                                src={acc.image} 
                                alt={acc.name} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <CardHeader className="pb-2">
                              <CardTitle className="text-lg">{acc.name}</CardTitle>
                              <div className="flex items-center text-sm text-muted-foreground">
                                <MapPin className="h-3.5 w-3.5 mr-1" />
                                {acc.location}
                              </div>
                            </CardHeader>
                            <CardContent className="pb-3">
                              <div className="flex justify-between text-sm mb-2">
                                <span className="text-muted-foreground">Price per night</span>
                                <span className="font-medium">${acc.cost}</span>
                              </div>
                              <p className="text-sm">{acc.notes}</p>
                            </CardContent>
                            <CardFooter className="pt-0">
                              <Button variant="outline" size="sm" className="w-full">
                                View Details
                              </Button>
                            </CardFooter>
                          </Card>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 