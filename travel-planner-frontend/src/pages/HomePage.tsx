import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  PlaneTakeoff,
  Map,
  Calendar,
  DollarSign,
  ChevronRight,
  Star,
  Clock,
  Globe,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02]" />

        <div className="container relative mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300">
                <Star className="h-3.5 w-3.5 mr-1" />
                <span>Simplify Your Travel Planning</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                Plan Your <span className="gradient-text">Dream Vacation</span>{" "}
                With Ease
              </h1>

              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300">
                Create personalized itineraries, manage bookings, and explore
                destinations—all in one place.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button size="lg" className="rounded-full" asChild>
                  <Link to="/create-itinerary">
                    Create Itinerary
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full"
                  asChild
                >
                  <Link to="/dashboard">View My Trips</Link>
                </Button>
              </div>

              <div className="flex items-center gap-6 pt-6">
                <div className="flex -space-x-2">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 border-2 border-white dark:border-gray-900"
                    />
                  ))}
                </div>
                <div className="text-sm">
                  <span className="font-semibold">1,000+</span> happy travelers
                </div>
              </div>
            </div>

            <div className="relative hidden lg:block">
              <div className="absolute top-0 -left-20 w-[600px] h-[600px] bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-3xl" />
              <div className="absolute bottom-0 -right-20 w-[600px] h-[600px] bg-purple-500/10 dark:bg-purple-500/5 rounded-full blur-3xl" />

              <div className="relative">
                <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1503220317375-aaad61436b1b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
                    alt="Travel destination"
                    className="w-full h-[500px] object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent">
                    <div className="absolute bottom-0 left-0 p-8">
                      <div className="flex items-center gap-2 text-white mb-2">
                        <Map className="h-5 w-5" />
                        <div className="text-sm font-medium">
                          Santorini, Greece
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold text-white">
                        Mediterranean Escape
                      </h3>
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-6 -right-6 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg">
                  <div className="flex items-center gap-4">
                    <div className="bg-blue-500 rounded-lg p-3 text-white">
                      <PlaneTakeoff className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Next Flight
                      </div>
                      <div className="font-semibold">JFK → ATH</div>
                    </div>
                  </div>
                </div>

                <div className="absolute -top-6 -left-6 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg">
                  <div className="flex items-center gap-4">
                    <div className="bg-purple-500 rounded-lg p-3 text-white">
                      <Calendar className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Trip Duration
                      </div>
                      <div className="font-semibold">10 Days</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Plan Your Perfect Trip
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Our travel planner makes it easy to organize every aspect of your
              journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow dark:bg-gray-900">
              <CardHeader className="pb-2">
                <div className="bg-gradient-to-br from-blue-500 to-indigo-500 w-12 h-12 rounded-xl flex items-center justify-center text-white mb-4">
                  <PlaneTakeoff className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl">Find Flights</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400">
                  Search and compare flights from hundreds of airlines to find
                  the best deals
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow dark:bg-gray-900">
              <CardHeader className="pb-2">
                <div className="bg-gradient-to-br from-fuchsia-500 to-pink-500 w-12 h-12 rounded-xl flex items-center justify-center text-white mb-4">
                  <Map className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl">Discover Places</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400">
                  Explore attractions, activities and hidden gems at your
                  destination
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow dark:bg-gray-900">
              <CardHeader className="pb-2">
                <div className="bg-gradient-to-br from-amber-500 to-orange-500 w-12 h-12 rounded-xl flex items-center justify-center text-white mb-4">
                  <Calendar className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl">Create Itinerary</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400">
                  Organize your perfect schedule with customizable day-by-day
                  planning
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow dark:bg-gray-900">
              <CardHeader className="pb-2">
                <div className="bg-gradient-to-br from-green-500 to-emerald-500 w-12 h-12 rounded-xl flex items-center justify-center text-white mb-4">
                  <DollarSign className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl">Track Budget</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400">
                  Manage expenses and stay within budget throughout your trip
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Popular Destinations
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
                Discover trending locations loved by our community
              </p>
            </div>
            <Button variant="outline" className="hidden md:flex" asChild>
              <Link to="/destinations">
                View All
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                id: 1,
                name: "Bali, Indonesia",
                image:
                  "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=2938&auto=format&fit=crop&ixlib=rb-4.0.3",
                trips: 342,
              },
              {
                id: 2,
                name: "Tokyo, Japan",
                image:
                  "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3",
                trips: 219,
              },
              {
                id: 3,
                name: "Santorini, Greece",
                image:
                  "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3",
                trips: 186,
              },
            ].map((destination) => (
              <div
                key={destination.id}
                className="group relative overflow-hidden rounded-xl"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-6 flex flex-col justify-end">
                  <h3 className="text-xl font-bold text-white">
                    {destination.name}
                  </h3>
                  <div className="flex items-center text-white/80 text-sm mt-2">
                    <Globe className="h-4 w-4 mr-1" />
                    <span>{destination.trips} trips planned</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Button variant="outline" asChild>
              <Link to="/destinations">View All Destinations</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Our Travelers Say
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Hear from people who have planned unforgettable trips with our
              platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                id: 1,
                name: "Sarah Johnson",
                location: "New York, USA",
                avatar: "https://randomuser.me/api/portraits/women/44.jpg",
                text: "Planning my Europe trip was incredibly easy. The itinerary builder helped me organize everything from flights to daily activities.",
              },
              {
                id: 2,
                name: "Michael Chen",
                location: "Toronto, Canada",
                avatar: "https://randomuser.me/api/portraits/men/32.jpg",
                text: "I used the budget tracker to manage expenses for our family vacation to Japan. We stayed right on budget thanks to this amazing tool!",
              },
              {
                id: 3,
                name: "Emma Rodriguez",
                location: "London, UK",
                avatar: "https://randomuser.me/api/portraits/women/68.jpg",
                text: "The destination guides were fantastic for our South America tour. We discovered hidden gems we would have never found otherwise.",
              },
            ].map((testimonial) => (
              <Card
                key={testimonial.id}
                className="border border-gray-100 dark:border-gray-800 shadow-md hover:shadow-lg transition-shadow"
              >
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-6">
                    {testimonial.text}
                  </p>
                  <div className="flex items-center gap-4">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <div className="font-medium">{testimonial.name}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {testimonial.location}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Plan Your Next Adventure?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Create your free account today and start planning unforgettable
            trips
          </p>
          <Button
            size="lg"
            className="bg-white text-blue-600 hover:bg-blue-50 rounded-full"
            asChild
          >
            <Link to="/create-itinerary">
              Start Planning Now
              <ChevronRight className="ml-1 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
