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
  MapPin,
  Calendar,
  Users,
  Save,
  Clock,
  DollarSign,
  Text,
  ImageIcon,
  PlusCircle,
  Trash,
  X,
  ChevronLeft,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DatePicker, DateRangePicker } from "@/components/ui/date-picker";
import { useToast } from "@/components/ui/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import AiTripGenerator from "@/components/ai/AiTripGenerator";

export default function CreateItineraryPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("details");
  const [selectedImage, setSelectedImage] = useState("");
  const [tripName, setTripName] = useState("");
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [tripType, setTripType] = useState("vacation");
  const [description, setDescription] = useState("");
  const [days, setDays] = useState([
    {
      id: 1,
      events: [
        {
          id: 101,
          time: "09:00",
          activity: "Breakfast at hotel",
          location: "Hotel restaurant",
        },
        {
          id: 102,
          time: "10:30",
          activity: "Visit museum",
          location: "National Museum",
        },
      ],
    },
    {
      id: 2,
      events: [],
    },
  ]);

  // Mock destinations for the destination dropdown
  const destinations = [
    "Paris, France",
    "Tokyo, Japan",
    "New York, USA",
    "Rome, Italy",
    "London, UK",
    "Sydney, Australia",
    "Barcelona, Spain",
    "Amsterdam, Netherlands",
    "Dubai, UAE",
    "Singapore",
  ];

  const coverImages = [
    "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=2938&auto=format&fit=crop&ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3",
  ];

  // Function to handle save
  const handleSave = () => {
    // Here you would normally save the form data
    // For this demo, we'll just redirect to the dashboard
    navigate("/dashboard");
  };

  // Function to handle cancel
  const handleCancel = () => {
    navigate("/dashboard");
  };

  const addDay = () => {
    const newDayId = Math.max(...days.map((day) => day.id), 0) + 1;
    setDays([...days, { id: newDayId, events: [] }]);
    toast({
      title: "Day added",
      description: `Day ${days.length + 1} has been added to your itinerary.`,
    });
  };

  const deleteDay = (dayId) => {
    setDays(days.filter((day) => day.id !== dayId));
    toast({
      title: "Day removed",
      description: "The day has been removed from your itinerary.",
    });
  };

  const addEvent = (dayId) => {
    const updatedDays = days.map((day) => {
      if (day.id === dayId) {
        const newEventId =
          Math.max(...day.events.map((event) => event.id || 0), 100) + 1;
        return {
          ...day,
          events: [
            ...day.events,
            { id: newEventId, time: "", activity: "", location: "" },
          ],
        };
      }
      return day;
    });
    setDays(updatedDays);
  };

  const updateEvent = (dayId, eventId, field, value) => {
    const updatedDays = days.map((day) => {
      if (day.id === dayId) {
        return {
          ...day,
          events: day.events.map((event) => {
            if (event.id === eventId) {
              return { ...event, [field]: value };
            }
            return event;
          }),
        };
      }
      return day;
    });
    setDays(updatedDays);
  };

  const deleteEvent = (dayId, eventId) => {
    const updatedDays = days.map((day) => {
      if (day.id === dayId) {
        return {
          ...day,
          events: day.events.filter((event) => event.id !== eventId),
        };
      }
      return day;
    });
    setDays(updatedDays);
    toast({
      title: "Event removed",
      description: "The event has been removed from your itinerary.",
    });
  };

  const applyAiPlan = (plan) => {
    setTripName(plan.tripName);
    setDestination(plan.destination);
    setDescription(plan.description);
    setStartDate(plan.startDate);
    setEndDate(plan.endDate);
    setDays(plan.days);

    if (plan.accommodation) {
      setAccommodation({
        name: plan.accommodation.name,
        location: plan.accommodation.location,
        checkIn: plan.accommodation.checkIn,
        checkOut: plan.accommodation.checkOut,
        confirmation: plan.accommodation.confirmation,
        notes: "",
      });
    }

    // Switch to the itinerary tab to show the results
    setActiveTab("itinerary");

    toast({
      title: "AI Plan Applied",
      description: "The AI-generated plan has been applied to your itinerary.",
    });
  };

  return (
    <div className="container mx-auto py-12 px-4">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Create New Itinerary</h1>
        <AiTripGenerator onApplyPlan={applyAiPlan} />
      </div>

      {/* Form Tabs */}
      <div className="flex border-b border-gray-200 dark:border-gray-800 mb-6">
        <button
          className={`py-2 px-4 font-medium text-sm ${
            activeTab === "details"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("details")}
        >
          Trip Details
        </button>
        <button
          className={`py-2 px-4 font-medium text-sm ${
            activeTab === "itinerary"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("itinerary")}
        >
          Daily Itinerary
        </button>
        <button
          className={`py-2 px-4 font-medium text-sm ${
            activeTab === "accommodation"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("accommodation")}
        >
          Accommodation
        </button>
      </div>

      {/* Form Content */}
      <div className="grid grid-cols-12 gap-8">
        {/* Main Form Content */}
        <div className="col-span-12 lg:col-span-8">
          <Card className="border-gray-100 dark:border-gray-800 shadow-md">
            {activeTab === "details" && (
              <>
                <CardHeader>
                  <CardTitle className="text-xl">Trip Details</CardTitle>
                  <CardDescription>
                    Basic information about your trip
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Trip Name</label>
                      <Input
                        type="text"
                        value={tripName}
                        onChange={(e) => setTripName(e.target.value)}
                        placeholder="Enter trip name"
                        className="w-full"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Destination</label>
                      <Input
                        type="text"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        placeholder="Where are you going?"
                        className="w-full"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Date Range</label>
                      <DateRangePicker
                        dateRange={{ from: startDate, to: endDate }}
                        setDateRange={({ from, to }) => {
                          setStartDate(from);
                          setEndDate(to);
                        }}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Trip Type</label>
                      <Select value={tripType} onValueChange={setTripType}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select trip type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="vacation">Vacation</SelectItem>
                          <SelectItem value="business">Business</SelectItem>
                          <SelectItem value="adventure">Adventure</SelectItem>
                          <SelectItem value="road-trip">Road Trip</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="col-span-1 md:col-span-2 space-y-2">
                      <label className="text-sm font-medium">
                        Trip Description
                      </label>
                      <Textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Describe your trip..."
                        className="w-full min-h-[100px]"
                      />
                    </div>
                  </div>

                  {/* Cover Image Selection */}
                  <div className="space-y-4">
                    <label className="text-sm font-medium leading-none">
                      Cover Image
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                      {coverImages.map((img, i) => (
                        <div
                          key={i}
                          className={`relative aspect-[4/3] rounded-lg overflow-hidden cursor-pointer border-2 ${
                            selectedImage === img
                              ? "border-blue-500"
                              : "border-transparent"
                          }`}
                          onClick={() => setSelectedImage(img)}
                        >
                          <img
                            src={img}
                            alt={`Cover option ${i + 1}`}
                            className="w-full h-full object-cover"
                          />
                          {selectedImage === img && (
                            <div className="absolute inset-0 bg-blue-500/20 flex items-center justify-center">
                              <div className="bg-blue-500 text-white rounded-full p-1">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="3"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                      <div className="aspect-[4/3] rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700 flex items-center justify-center">
                        <div className="text-center">
                          <ImageIcon className="h-6 w-6 mx-auto text-gray-400" />
                          <span className="text-sm text-gray-500 mt-2">
                            Upload
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </>
            )}

            {activeTab === "itinerary" && (
              <>
                <CardHeader>
                  <CardTitle className="text-xl">Daily Itinerary</CardTitle>
                  <CardDescription>
                    Plan activities for each day of your trip
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Itinerary Days */}
                  {days.map((day, index) => (
                    <div
                      key={day.id}
                      className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden"
                    >
                      <div className="bg-gray-50 dark:bg-gray-900 px-4 py-3 flex justify-between items-center">
                        <div className="font-medium">Day {index + 1}</div>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This will delete Day {index + 1} and all its
                                events from your itinerary.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                className="bg-red-500 hover:bg-red-600"
                                onClick={() => deleteDay(day.id)}
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                      <div className="p-4 space-y-4">
                        {day.events.length > 0 ? (
                          day.events.map((event) => (
                            <div
                              key={event.id}
                              className="grid grid-cols-12 gap-4 items-start"
                            >
                              <div className="col-span-3">
                                <label className="text-xs text-gray-500 block mb-1">
                                  Time
                                </label>
                                <div className="flex items-center border rounded-md px-2 py-1">
                                  <Clock className="h-3 w-3 text-gray-400 mr-1" />
                                  <Input
                                    type="time"
                                    value={event.time}
                                    onChange={(e) =>
                                      updateEvent(
                                        day.id,
                                        event.id,
                                        "time",
                                        e.target.value
                                      )
                                    }
                                    className="text-sm bg-transparent outline-none w-full border-0 p-0 h-6"
                                  />
                                </div>
                              </div>
                              <div className="col-span-6">
                                <label className="text-xs text-gray-500 block mb-1">
                                  Activity
                                </label>
                                <Input
                                  type="text"
                                  value={event.activity}
                                  onChange={(e) =>
                                    updateEvent(
                                      day.id,
                                      event.id,
                                      "activity",
                                      e.target.value
                                    )
                                  }
                                  placeholder="E.g., Museum Visit, Dinner, etc."
                                  className="w-full text-sm"
                                />
                              </div>
                              <div className="col-span-3 relative">
                                <label className="text-xs text-gray-500 block mb-1">
                                  Location
                                </label>
                                <div className="flex items-center border rounded-md px-2 py-1">
                                  <MapPin className="h-3 w-3 text-gray-400 mr-1" />
                                  <Input
                                    type="text"
                                    value={event.location}
                                    onChange={(e) =>
                                      updateEvent(
                                        day.id,
                                        event.id,
                                        "location",
                                        e.target.value
                                      )
                                    }
                                    placeholder="Location"
                                    className="text-sm bg-transparent outline-none w-full border-0 p-0 h-6"
                                  />
                                </div>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="absolute top-6 right-0 h-7 w-7 text-red-500 hover:text-red-700 hover:bg-red-50"
                                  onClick={() => deleteEvent(day.id, event.id)}
                                >
                                  <X className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="p-4 text-gray-500 text-sm italic text-center">
                            No activities planned yet
                          </div>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full text-gray-500"
                          onClick={() => addEvent(day.id)}
                        >
                          <PlusCircle className="h-3 w-3 mr-1" />
                          Add Activity
                        </Button>
                      </div>
                    </div>
                  ))}

                  <Button className="w-full" variant="outline" onClick={addDay}>
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add Another Day
                  </Button>
                </CardContent>
              </>
            )}

            {activeTab === "accommodation" && (
              <>
                <CardHeader>
                  <CardTitle className="text-xl">Accommodation</CardTitle>
                  <CardDescription>
                    Add details about where you'll be staying
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden p-4 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Accommodation Name
                        </label>
                        <input
                          type="text"
                          className="w-full border rounded-md px-3 py-2"
                          placeholder="Hotel, Airbnb, etc."
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Location</label>
                        <div className="flex items-center border rounded-md px-3 py-2">
                          <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                          <input
                            type="text"
                            className="flex-1 bg-transparent outline-none"
                            placeholder="Address"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Check-in</label>
                        <div className="flex items-center border rounded-md px-3 py-2">
                          <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                          <input
                            type="date"
                            className="flex-1 bg-transparent outline-none"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Check-out</label>
                        <div className="flex items-center border rounded-md px-3 py-2">
                          <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                          <input
                            type="date"
                            className="flex-1 bg-transparent outline-none"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Notes</label>
                      <textarea
                        className="w-full rounded-md border px-3 py-2 min-h-[80px]"
                        placeholder="Confirmation number, special requests, etc."
                      />
                    </div>
                  </div>

                  <Button className="w-full" variant="outline">
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add Another Accommodation
                  </Button>
                </CardContent>
              </>
            )}

            <CardFooter className="flex justify-end space-x-4 pt-6">
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button onClick={handleSave}>
                <Save className="mr-2 h-4 w-4" />
                Save Itinerary
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="col-span-12 lg:col-span-4">
          <div className="sticky top-4 space-y-6">
            {/* Trip Summary Card */}
            <Card className="border-gray-100 dark:border-gray-800 shadow-md">
              <CardHeader>
                <CardTitle className="text-lg">Trip Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Trip Details List */}
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">
                      Destination:
                    </span>
                    <span className="font-medium">Paris, France</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">
                      Duration:
                    </span>
                    <span className="font-medium">7 Nights</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">
                      Dates:
                    </span>
                    <span className="font-medium">Jun 15 - Jun 22, 2024</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">
                      Travelers:
                    </span>
                    <span className="font-medium">2 People</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">
                      Budget:
                    </span>
                    <span className="font-medium">$2,500 USD</span>
                  </div>
                </div>
                <div className="pt-2 border-t border-gray-100 dark:border-gray-800">
                  <div className="text-xs text-gray-500 mb-1">
                    Trip Completion
                  </div>
                  <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: "35%" }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">35% complete</div>
                </div>
              </CardContent>
            </Card>

            {/* Tips Card */}
            <Card className="border-gray-100 dark:border-gray-800 shadow-md bg-blue-50 dark:bg-blue-900/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Trip Planning Tips</CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-3">
                <div className="flex gap-2">
                  <div className="h-5 w-5 rounded-full bg-blue-100 dark:bg-blue-800 flex items-center justify-center text-blue-600 dark:text-blue-300 text-xs font-bold">
                    1
                  </div>
                  <p>
                    Start by setting your budget to guide your other decisions
                  </p>
                </div>
                <div className="flex gap-2">
                  <div className="h-5 w-5 rounded-full bg-blue-100 dark:bg-blue-800 flex items-center justify-center text-blue-600 dark:text-blue-300 text-xs font-bold">
                    2
                  </div>
                  <p>Research local attractions and create a daily itinerary</p>
                </div>
                <div className="flex gap-2">
                  <div className="h-5 w-5 rounded-full bg-blue-100 dark:bg-blue-800 flex items-center justify-center text-blue-600 dark:text-blue-300 text-xs font-bold">
                    3
                  </div>
                  <p>
                    Consider booking accommodations near public transportation
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
