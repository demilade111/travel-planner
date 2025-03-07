import  { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  PlusCircle,
  Search,
  Calendar,
  Edit,
  Eye,
  Filter,
} from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

// Format date function
function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

// // Calculate days until trip
// function daysUntil(date: Date): number {
//   const today = new Date();
//   const timeDiff = date.getTime() - today.getTime();
//   return Math.ceil(timeDiff / (1000 * 3600 * 24));
// }

// Mock data for trips
const trips = [
  {
    id: 1,
    name: "Paris Adventure",
    destination: "Paris, France",
    startDate: new Date("2024-06-15"),
    endDate: new Date("2024-06-25"),
    travelers: 2,
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3",
    status: "upcoming",
  },
  {
    id: 2,
    name: "Tokyo Discovery",
    destination: "Tokyo, Japan",
    startDate: new Date("2024-08-10"),
    endDate: new Date("2024-08-24"),
    travelers: 1,
    image:
      "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3",
    status: "upcoming",
  },
  {
    id: 3,
    name: "NYC Weekend",
    destination: "New York, USA",
    startDate: new Date("2024-12-01"),
    endDate: new Date("2024-12-08"),
    travelers: 4,
    image:
      "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    status: "upcoming",
  },
  {
    id: 4,
    name: "Bali Relaxation",
    destination: "Bali, Indonesia",
    startDate: new Date("2023-11-15"),
    endDate: new Date("2023-11-29"),
    travelers: 2,
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=2938&auto=format&fit=crop&ixlib=rb-4.0.3",
    status: "past",
  },
];

export default function DashboardPage() {
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTrips = trips.filter((trip) => {
    if (filter === "upcoming" && trip.status !== "upcoming") return false;
    if (filter === "past" && trip.status !== "past") return false;

    if (
      searchTerm &&
      !trip.destination.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !trip.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  return (
    <div className="container mx-auto py-12 px-4">
      {/* Dashboard Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">My Trips</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage and view all your travel plans in one place
        </p>
      </div>

      {/* Actions Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        {/* Search Bar */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search trips..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800"
          />
        </div>

        {/* Filter Dropdown */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="flex items-center">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-48">
            <Button
              variant={filter === "all" ? "default" : "outline"}
              onClick={() => setFilter("all")}
              className="w-full"
            >
              All Trips
            </Button>
            <Button
              variant={filter === "upcoming" ? "default" : "outline"}
              onClick={() => setFilter("upcoming")}
              className="w-full"
            >
              Upcoming
            </Button>
            <Button
              variant={filter === "past" ? "default" : "outline"}
              onClick={() => setFilter("past")}
              className="w-full"
            >
              Past
            </Button>
          </PopoverContent>
        </Popover>

        {/* Create Trip Button */}
        <Button asChild className="md:ml-auto">
          <Link to="/create-itinerary">
            <PlusCircle className="h-4 w-4 mr-2" />
            New Trip
          </Link>
        </Button>
      </div>

      {/* Trips Grid */}
      {filteredTrips.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTrips.map((trip) => (
            <Card key={trip.id} className="overflow-hidden border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-lg transition-all duration-200">
              <img src={trip.image} alt={trip.destination} className="h-48 w-full object-cover" />
              <CardHeader className="py-3">
                <CardTitle>{trip.name}</CardTitle>
                <CardDescription>{trip.destination}</CardDescription>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  <Calendar className="inline-block h-4 w-4 mr-1" />
                  {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
                </p>
              </CardHeader>
              <CardFooter className="pt-0 pb-4 flex justify-between">
                <Button variant="outline" size="sm" asChild>
                  <Link to={`/edit-itinerary/${trip.id}`}>
                    <Edit className="h-3.5 w-3.5 mr-1" />
                    Edit
                  </Link>
                </Button>
                <Button size="sm" asChild>
                  <Link to={`/view-itinerary/${trip.id}`}>
                    <Eye className="h-3.5 w-3.5 mr-1" />
                    View Details
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-center">No trips found.</p>
      )}
    </div>
  );
}
