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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useToast } from "@/components/ui/use-toast";
import {
  Heart,
  MessageCircle,
  Star,
  Search,
  Filter,
  MoreHorizontal,
  Share2,
  BookmarkPlus,
  Users,
} from "lucide-react";

// Sample data for community itineraries
const sampleItineraries = [
  {
    id: 1,
    title: "Tokyo in 7 Days: A Complete Itinerary",
    author: {
      name: "Alex Johnson",
      avatar: "https://i.pravatar.cc/150?img=1",
    },
    dateCreated: new Date("2023-10-15"),
    thumbnail: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26",
    description: "Explore the vibrant city of Tokyo with this comprehensive 7-day itinerary covering everything from historical temples to modern districts.",
    likes: 145,
    comments: 32,
    rating: 4.8,
    tags: ["Japan", "Tokyo", "City", "Culture"]
  },
  {
    id: 2,
    title: "Italian Coastline Road Trip",
    author: {
      name: "Maria Rossi",
      avatar: "https://i.pravatar.cc/150?img=5",
    },
    dateCreated: new Date("2023-11-02"),
    thumbnail: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963",
    description: "A scenic journey along the Italian coastline, exploring charming villages, pristine beaches, and amazing local cuisine.",
    likes: 210,
    comments: 47,
    rating: 4.9,
    tags: ["Italy", "Road Trip", "Beach", "Food"]
  },
  {
    id: 3,
    title: "New Zealand Adventure: North & South Island",
    author: {
      name: "David Kim",
      avatar: "https://i.pravatar.cc/150?img=8",
    },
    dateCreated: new Date("2023-09-28"),
    thumbnail: "https://images.unsplash.com/photo-1493606278519-11aa9f86e40a",
    description: "An epic 2-week adventure across both North and South Islands of New Zealand, featuring breathtaking landscapes and outdoor activities.",
    likes: 178,
    comments: 39,
    rating: 4.7,
    tags: ["New Zealand", "Nature", "Adventure", "Hiking"]
  },
  {
    id: 4,
    title: "Parisian Weekend Getaway",
    author: {
      name: "Emma Thompson",
      avatar: "https://i.pravatar.cc/150?img=9",
    },
    dateCreated: new Date("2023-10-05"),
    thumbnail: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
    description: "Make the most of a weekend in Paris with this carefully crafted itinerary covering iconic landmarks and hidden gems.",
    likes: 132,
    comments: 21,
    rating: 4.6,
    tags: ["France", "Paris", "Weekend", "City"]
  },
  {
    id: 5,
    title: "Thailand: Bangkok to Beaches",
    author: {
      name: "Ryan Chen",
      avatar: "https://i.pravatar.cc/150?img=11",
    },
    dateCreated: new Date("2023-11-12"),
    thumbnail: "https://images.unsplash.com/photo-1506665531195-3566af2b4dfa",
    description: "From the bustling streets of Bangkok to the serene beaches of Krabi and Phi Phi Islands, this 10-day itinerary covers it all.",
    likes: 156,
    comments: 28,
    rating: 4.5,
    tags: ["Thailand", "Beach", "Culture", "Food"]
  },
];

export default function CommunityPage() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("popular");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTag, setFilterTag] = useState("");
  const [likedItineraries, setLikedItineraries] = useState<number[]>([]);
  const [itineraries, setItineraries] = useState(sampleItineraries);
  
  // Filter itineraries based on tab, search term, and tag
  const filteredItineraries = itineraries.filter(itinerary => {
    // Filter by search term
    if (searchTerm && !itinerary.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !itinerary.description.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    // Filter by tag
    if (filterTag && !itinerary.tags.includes(filterTag)) {
      return false;
    }
    
    return true;
  });
  
  // Sort itineraries based on active tab
  const sortedItineraries = [...filteredItineraries].sort((a, b) => {
    if (activeTab === "popular") {
      return b.likes - a.likes;
    } else if (activeTab === "recent") {
      return new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime();
    } else if (activeTab === "top-rated") {
      return b.rating - a.rating;
    }
    return 0;
  });
  
  // Toggle like on an itinerary
  const toggleLike = (itineraryId: number) => {
    if (likedItineraries.includes(itineraryId)) {
      setLikedItineraries(likedItineraries.filter(id => id !== itineraryId));
    } else {
      setLikedItineraries([...likedItineraries, itineraryId]);
      toast({
        title: "Itinerary liked!",
        description: "This itinerary has been added to your liked collection.",
      });
    }
  };
  
  // Bookmark an itinerary
  const bookmarkItinerary = (itineraryId: number) => {
    toast({
      title: "Itinerary bookmarked!",
      description: "This itinerary has been saved to your bookmarks.",
    });
  };
  
  // Share an itinerary
  const shareItinerary = (itineraryId: number) => {
    toast({
      title: "Share link copied!",
      description: "A link to this itinerary has been copied to your clipboard.",
    });
  };
  
  // Get all unique tags from itineraries
  const allTags = Array.from(
    new Set(itineraries.flatMap(itinerary => itinerary.tags))
  );
  
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Community Itineraries</h1>
          <p className="text-gray-500 mt-1">Discover and share travel experiences</p>
        </div>
        <Button className="mt-4 md:mt-0">
          <Users className="h-4 w-4 mr-2" />
          My Public Itineraries
        </Button>
      </div>
      
      {/* Search and filters */}
      <div className="grid gap-4 md:grid-cols-[1fr_auto] mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search itineraries..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              {filterTag || "Filter by Tag"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Tags</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setFilterTag("")}>
              All Tags
            </DropdownMenuItem>
            {allTags.map((tag) => (
              <DropdownMenuItem key={tag} onClick={() => setFilterTag(tag)}>
                {tag}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      {/* Tab navigation */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
          <TabsTrigger value="popular">Popular</TabsTrigger>
          <TabsTrigger value="recent">Recent</TabsTrigger>
          <TabsTrigger value="top-rated">Top Rated</TabsTrigger>
        </TabsList>
      </Tabs>
      
      {/* Itineraries grid */}
      <div className="space-y-6">
        {sortedItineraries.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedItineraries.map((itinerary) => (
              <Card key={itinerary.id} className="overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all">
                <div className="relative h-48">
                  <img 
                    src={`${itinerary.thumbnail}?q=80&w=800&auto=format&fit=crop`}
                    alt={itinerary.title}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="bg-white/80 dark:bg-black/60 text-gray-800 dark:text-gray-200 rounded-full h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => bookmarkItinerary(itinerary.id)}>
                          <BookmarkPlus className="h-4 w-4 mr-2" />
                          Bookmark
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => shareItinerary(itinerary.id)}>
                          <Share2 className="h-4 w-4 mr-2" />
                          Share
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                <CardContent className="pt-4">
                  <div className="flex items-center mb-2">
                    <Avatar className="h-6 w-6 mr-2">
                      <AvatarImage src={itinerary.author.avatar} />
                      <AvatarFallback>{itinerary.author.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">{itinerary.author.name}</span>
                    <span className="mx-2 text-muted-foreground">•</span>
                    <span className="text-xs text-muted-foreground">
                      {itinerary.dateCreated.toLocaleDateString()}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold leading-tight mb-2">{itinerary.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                    {itinerary.description}
                  </p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {itinerary.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-4">
                      <button
                        className="flex items-center text-sm text-muted-foreground"
                        onClick={() => toggleLike(itinerary.id)}
                      >
                        {likedItineraries.includes(itinerary.id) ? (
                          <Heart className="h-4 w-4 mr-1 text-red-500 fill-red-500" />
                        ) : (
                          <Heart className="h-4 w-4 mr-1" />
                        )}
                        {itinerary.likes + (likedItineraries.includes(itinerary.id) ? 1 : 0)}
                      </button>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MessageCircle className="h-4 w-4 mr-1" />
                        {itinerary.comments}
                      </div>
                    </div>
                    <div className="flex items-center text-sm text-yellow-500">
                      <Star className="h-4 w-4 mr-1 fill-yellow-400" />
                      {itinerary.rating}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-lg text-gray-500">No itineraries found matching your search.</p>
          </div>
        )}
        
        {/* Pagination */}
        <Pagination className="mt-8">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
} 