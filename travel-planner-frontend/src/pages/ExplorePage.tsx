import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import { DatePicker } from "@/components/ui/date-picker";
import { Label } from "@/components/ui/label";
import {
  Globe,
  MapPin,
  Search,
  Palmtree,
  Mountain,
  Umbrella,
  Building,
  Utensils,
  Heart,
  ChevronRight,
  Calendar,
  PlusCircle,
  Star,
  Share2,
  Bookmark,
  BookmarkCheck,
  ExternalLink,
  Filter,
  SlidersHorizontal,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";

interface Destination {
  id: number;
  name: string;
  description: string;
  rating: number;
  price: string;
  events: string[];
  tags: string[];
  image?: string;
}

export default function ExplorePage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [priceFilter, setPriceFilter] = useState("all");
  const [savedDestinations, setSavedDestinations] = useState([]);
  const [isClient, setIsClient] = useState(false);
  const [selectedDestination, setSelectedDestination] =
    useState<Destination | null>(null);
  const [openAddToTrip, setOpenAddToTrip] = useState(false);
  const [openFilters, setOpenFilters] = useState(false);
  const { toast } = useToast();

  // Mock user trips for adding destinations
  const [userTrips, setUserTrips] = useState([
    { id: 1, name: "Summer Vacation 2024", dates: "Jun 15 - Jun 22, 2024" },
    { id: 2, name: "Winter Getaway", dates: "Dec 10 - Dec 17, 2024" },
    { id: 3, name: "Business Trip to Tokyo", dates: "Sep 5 - Sep 10, 2024" },
  ]);

  // Mock recently viewed destinations
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  useEffect(() => {
    setIsClient(true);
    // Load saved destinations from localStorage
    const saved = localStorage.getItem("savedDestinations");
    if (saved) {
      setSavedDestinations(JSON.parse(saved));
    }

    // Load recently viewed from localStorage
    const recent = localStorage.getItem("recentlyViewed");
    if (recent) {
      setRecentlyViewed(JSON.parse(recent));
    }
  }, []);

  // Featured destinations
  const destinations = [
    {
      id: 1,
      name: "Bali, Indonesia",
      category: "beach",
      image:
        "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?q=80&w=2574&auto=format&fit=crop",
      description:
        "Tropical paradise with stunning beaches, vibrant culture, and lush rice terraces.",
      rating: 4.8,
      price: "$$",
      tags: ["Beach", "Culture", "Nature"],
      events: [
        "Ubud Art Market",
        "Tegallalang Rice Terraces",
        "Uluwatu Temple Sunset",
        "Kecak Fire Dance",
      ],
    },
    {
      id: 2,
      name: "Kyoto, Japan",
      category: "culture",
      image:
        "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2670&auto=format&fit=crop",
      description:
        "Ancient temples, traditional tea houses, and beautiful cherry blossoms.",
      rating: 4.9,
      price: "$$$",
      tags: ["History", "Culture", "Food"],
      events: [
        "Fushimi Inari Shrine",
        "Arashiyama Bamboo Grove",
        "Traditional Tea Ceremony",
        "Nishiki Market Food Tour",
      ],
    },
    {
      id: 3,
      name: "Santorini, Greece",
      category: "beach",
      image:
        "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=2574&auto=format&fit=crop",
      description:
        "Stunning white buildings, blue domes, and breathtaking Aegean Sea views.",
      rating: 4.7,
      price: "$$$",
      tags: ["Romantic", "Beach", "Luxury"],
    },
    {
      id: 4,
      name: "Swiss Alps",
      category: "mountain",
      image:
        "https://images.unsplash.com/photo-1531400158697-084df3be6087?q=80&w=2670&auto=format&fit=crop",
      description:
        "Majestic mountains, picturesque villages, and world-class skiing.",
      rating: 4.9,
      price: "$$$$",
      tags: ["Adventure", "Nature", "Skiing"],
    },
    {
      id: 5,
      name: "New York City, USA",
      category: "city",
      image:
        "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=2670&auto=format&fit=crop",
      description: "Iconic skyline, world-class museums, and vibrant culture.",
      rating: 4.6,
      price: "$$$",
      tags: ["Urban", "Culture", "Shopping"],
    },
    {
      id: 6,
      name: "Marrakech, Morocco",
      category: "culture",
      image:
        "https://images.unsplash.com/photo-1597992759663-0cfa226b8a66?q=80&w=2670&auto=format&fit=crop",
      description:
        "Vibrant markets, traditional riads, and rich history in this cultural gem.",
      rating: 4.5,
      price: "$$",
      tags: ["Market", "Culture", "History"],
    },
  ];

  // Categories
  const categories = [
    {
      id: "all",
      name: "All Destinations",
      icon: <Globe className="h-5 w-5" />,
    },
    { id: "beach", name: "Beaches", icon: <Palmtree className="h-5 w-5" /> },
    {
      id: "mountain",
      name: "Mountains",
      icon: <Mountain className="h-5 w-5" />,
    },
    { id: "city", name: "Cities", icon: <Building className="h-5 w-5" /> },
    { id: "culture", name: "Cultural", icon: <Umbrella className="h-5 w-5" /> },
    { id: "food", name: "Culinary", icon: <Utensils className="h-5 w-5" /> },
    { id: "resort", name: "Resorts", icon: <Umbrella className="h-5 w-5" /> },
  ];

  // Filter destinations based on category, search and price filter
  const filteredDestinations = destinations.filter((dest) => {
    const matchesCategory =
      selectedCategory === "all" || dest.category === selectedCategory;
    const matchesSearch =
      dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesPrice =
      priceFilter === "all" ||
      (priceFilter === "budget" &&
        (dest.price === "$" || dest.price === "$$")) ||
      (priceFilter === "luxury" &&
        (dest.price === "$$$" || dest.price === "$$$$"));

    return matchesCategory && matchesSearch && matchesPrice;
  });

  // Function to save/unsave a destination
  const toggleSaveDestination = (destId: number) => {
    const newSavedDestinations = savedDestinations.includes(destId)
      ? savedDestinations.filter((id) => id !== destId)
      : [...savedDestinations, destId];

    setSavedDestinations(newSavedDestinations);
    localStorage.setItem(
      "savedDestinations",
      JSON.stringify(newSavedDestinations)
    );

    const action = savedDestinations.includes(destId)
      ? "removed from"
      : "added to";
    toast({
      title: `Destination ${action} saved list`,
      description: `You can ${
        savedDestinations.includes(destId)
          ? "add it back"
          : "find it in your profile"
      } anytime.`,
      duration: 3000,
    });
  };

  // Function to view destination details and add to recently viewed
  const viewDestinationDetails = (dest: Destination) => {
    setSelectedDestination(dest);

    // Add to recently viewed if not already there
    if (!recentlyViewed.find((item) => item.id === dest.id)) {
      const newRecentlyViewed = [dest, ...recentlyViewed].slice(0, 5); // Keep only the 5 most recent
      setRecentlyViewed(newRecentlyViewed);
      localStorage.setItem("recentlyViewed", JSON.stringify(newRecentlyViewed));
    }
  };

  // Function to add destination to a trip
  const addDestinationToTrip = (tripId: number, destId: number) => {
    setOpenAddToTrip(false);

    // In a real app, you would update your database here
    toast({
      title: "Destination added to trip",
      description: "The destination has been added to your itinerary.",
      duration: 3000,
    });
  };

  return (
    <div className="container mx-auto py-12 px-4 max-w-7xl">
      <div className="mb-10">
        <h1 className="text-4xl font-bold mb-4">Explore Destinations</h1>
        <p className="text-gray-600 dark:text-gray-400 text-xl">
          Discover new places and plan your next adventure
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-10">
        <div className="relative mb-6">
          <div className="absolute top-0 left-0 h-full flex items-center pl-4">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <Input
            type="text"
            placeholder="Search destinations, activities, or interests..."
            className="w-full pl-12 pr-4 py-6 border rounded-xl focus:ring-2 focus:ring-primary"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <div className="absolute top-0 right-0 h-full flex items-center pr-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setOpenFilters(true)}
              className="text-gray-400 hover:text-gray-600"
            >
              <SlidersHorizontal className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Filter Section (Drawer on mobile, visible on desktop) */}
        <div className="hidden md:flex space-x-2 mb-6">
          <Select value={priceFilter} onValueChange={setPriceFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Price Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Prices</SelectItem>
              <SelectItem value="budget">Budget ($ - $$)</SelectItem>
              <SelectItem value="moderate">Moderate ($$$)</SelectItem>
              <SelectItem value="luxury">Luxury ($$$$)</SelectItem>
            </SelectContent>
          </Select>

          <DatePicker
            date={new Date()}
            setDate={() => {}}
            placeholder="When are you traveling?"
            className="w-[250px]"
          />

          {/* More filter options could be added here */}
        </div>

        {/* Mobile Filters Drawer */}
        <Drawer open={openFilters} onOpenChange={setOpenFilters}>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Filters</DrawerTitle>
              <DrawerDescription>
                Refine your destination search
              </DrawerDescription>
            </DrawerHeader>
            <div className="p-4 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="price-filter">Price Range</Label>
                <Select value={priceFilter} onValueChange={setPriceFilter}>
                  <SelectTrigger id="price-filter">
                    <SelectValue placeholder="Select Price Range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Prices</SelectItem>
                    <SelectItem value="budget">Budget ($ - $$)</SelectItem>
                    <SelectItem value="moderate">Moderate ($$$)</SelectItem>
                    <SelectItem value="luxury">Luxury ($$$$)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Travel Dates</Label>
                <DatePicker
                  date={new Date()}
                  setDate={() => {}}
                  placeholder="When are you traveling?"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="destination-type">Destination Type</Label>
                <Select defaultValue="all">
                  <SelectTrigger id="destination-type">
                    <SelectValue placeholder="Destination Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="beach">Beach</SelectItem>
                    <SelectItem value="mountain">Mountain</SelectItem>
                    <SelectItem value="city">City</SelectItem>
                    <SelectItem value="countryside">Countryside</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="family-friendly">Family Friendly</Label>
                <Switch id="family-friendly" />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="pet-friendly">Pet Friendly</Label>
                <Switch id="pet-friendly" />
              </div>
            </div>
            <DrawerFooter>
              <Button className="w-full">Apply Filters</Button>
              <DrawerClose asChild>
                <Button variant="outline" className="w-full">
                  Cancel
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>

        {/* Category Filter */}
        <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              className="flex items-center space-x-2 whitespace-nowrap"
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.icon}
              <span>{category.name}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Recently Viewed (only show if there are items and we're on the client-side) */}
      {isClient && recentlyViewed.length > 0 && (
        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-6">Recently Viewed</h2>
          <div className="flex overflow-x-auto gap-4 pb-4">
            {recentlyViewed.map((dest) => (
              <div
                key={dest.id}
                className="min-w-[280px] cursor-pointer"
                onClick={() => viewDestinationDetails(dest)}
              >
                <div className="relative h-40 rounded-lg overflow-hidden">
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="text-white font-semibold">{dest.name}</h3>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      <span className="text-white text-sm ml-1">
                        {dest.rating}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Destinations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {filteredDestinations.map((destination) => (
          <Card
            key={destination.id}
            className="overflow-hidden border-gray-200 dark:border-gray-700 transition-all hover:shadow-md"
          >
            <div className="relative">
              <div className="h-48 overflow-hidden">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />
              </div>
              <div className="absolute top-3 right-3 flex flex-col gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleSaveDestination(destination.id);
                  }}
                >
                  {savedDestinations.includes(destination.id) ? (
                    <BookmarkCheck className="h-5 w-5 text-primary fill-primary" />
                  ) : (
                    <Bookmark className="h-5 w-5 text-gray-700" />
                  )}
                </Button>
              </div>
              <Badge className="absolute top-3 left-3 bg-white/80 text-gray-800 backdrop-blur-sm">
                {destination.price}
              </Badge>
            </div>

            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl">{destination.name}</CardTitle>
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-500 fill-yellow-500 mr-1" />
                  <span className="font-medium">{destination.rating}</span>
                </div>
              </div>
              <CardDescription>{destination.description}</CardDescription>
            </CardHeader>

            <CardContent>
              <div className="flex flex-wrap gap-2 mb-3">
                {destination.tags.map((tag, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-primary/10 text-primary dark:bg-primary/20 hover:bg-primary/15"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>

            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                size="sm"
                onClick={() => viewDestinationDetails(destination)}
              >
                View Details
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm">
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add to Trip
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add to Trip</DialogTitle>
                    <DialogDescription>
                      Choose which trip you want to add {destination.name} to,
                      or create a new trip.
                    </DialogDescription>
                  </DialogHeader>

                  <div className="space-y-4 my-4">
                    <div className="space-y-2">
                      <Label>Select Trip</Label>
                      <Select
                        onValueChange={(tripId) =>
                          addDestinationToTrip(tripId, destination.id)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Choose a trip" />
                        </SelectTrigger>
                        <SelectContent>
                          {userTrips.map((trip) => (
                            <SelectItem
                              key={trip.id}
                              value={trip.id.toString()}
                            >
                              {trip.name} ({trip.dates})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="text-center">
                      <span className="text-sm text-gray-500">or</span>
                    </div>

                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => {
                        // Here you would navigate to create itinerary page
                        // and pass the destination as a parameter
                        toast({
                          title: "Creating new trip",
                          description:
                            "Taking you to the trip creation page...",
                          duration: 3000,
                        });
                      }}
                    >
                      <PlusCircle className="h-4 w-4 mr-2" />
                      Create New Trip
                    </Button>
                  </div>

                  <DialogFooter>
                    <Button variant="outline">Cancel</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Destination Detail Dialog */}
      <Dialog
        open={!!selectedDestination}
        onOpenChange={(open) => !open && setSelectedDestination(null)}
      >
        <DialogContent className="max-w-3xl overflow-hidden">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              {selectedDestination?.name}
            </DialogTitle>
          </DialogHeader>

          {selectedDestination && (
            <div className="space-y-4">
              <div className="aspect-video rounded-md overflow-hidden">
                <img
                  src={selectedDestination.image}
                  alt={selectedDestination.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-yellow-500 fill-yellow-500 mr-1" />
                    <span className="font-medium">
                      {selectedDestination.rating}
                    </span>
                  </div>
                  <Badge>{selectedDestination.price}</Badge>
                </div>

                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      toggleSaveDestination(selectedDestination.id)
                    }
                  >
                    {savedDestinations.includes(selectedDestination.id) ? (
                      <>
                        <BookmarkCheck className="h-4 w-4 mr-2" />
                        Saved
                      </>
                    ) : (
                      <>
                        <Bookmark className="h-4 w-4 mr-2" />
                        Save
                      </>
                    )}
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">About</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  {selectedDestination.description}
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">
                  Popular Events & Attractions
                </h3>
                <ul className="space-y-2">
                  {selectedDestination.events.map((event, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      <span>{event}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4">
                <h3 className="font-semibold text-lg mb-2">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedDestination.tags.map((tag, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="bg-primary/10 text-primary dark:bg-primary/20"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}

          <DialogFooter className="flex justify-between sm:justify-between">
            <Button variant="outline">
              <ExternalLink className="h-4 w-4 mr-2" />
              Visit Official Site
            </Button>
            <Button onClick={() => setOpenAddToTrip(true)}>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add to Trip
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Articles Section */}
      <section className="mb-20">
        <h2 className="text-2xl font-semibold mb-6">Travel Guides & Tips</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Explore our curated travel guides to help you plan your perfect trip
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="border-gray-200 dark:border-gray-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Best Time to Visit Bali</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400">
                Learn the ideal seasons to experience Bali's magic without the
                crowds.
              </p>
            </CardContent>
            <CardFooter>
              <Button
                variant="ghost"
                className="text-primary hover:text-primary/80"
              >
                Read Guide
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>

          <Card className="border-gray-200 dark:border-gray-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Hidden Gems of Japan</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400">
                Discover lesser-known treasures beyond Tokyo and Kyoto.
              </p>
            </CardContent>
            <CardFooter>
              <Button
                variant="ghost"
                className="text-primary hover:text-primary/80"
              >
                Read Guide
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>

          <Card className="border-gray-200 dark:border-gray-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">
                Budget European Vacation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400">
                How to experience Europe's wonders without breaking the bank.
              </p>
            </CardContent>
            <CardFooter>
              <Button
                variant="ghost"
                className="text-primary hover:text-primary/80"
              >
                Read Guide
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>

      {/* Subscription Banner */}
      <section className="mt-20 bg-gradient-modern text-white rounded-2xl p-10">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-6 md:mb-0">
            <h2 className="text-2xl font-bold mb-2">Get Travel Inspiration</h2>
            <p className="text-blue-100">
              Subscribe to our newsletter for personalized travel
              recommendations
            </p>
          </div>
          <div className="flex w-full md:w-auto">
            <Input
              type="email"
              placeholder="Your email address"
              className="flex-grow px-4 py-3 rounded-l-lg text-gray-900 bg-white border-0"
            />
            <Button className="rounded-l-none bg-white text-primary hover:bg-blue-50">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
