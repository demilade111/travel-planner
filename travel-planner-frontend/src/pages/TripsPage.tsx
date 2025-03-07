import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import TripCard from "../components/trips/TripCard";

interface Trip {
  _id: string;
  name: string;
  destination: string;
  startDate: string;
  endDate: string;
  image: string;
  status: "planning" | "upcoming" | "ongoing" | "completed";
  description: string;
}

const TripsPage: React.FC = () => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("all");

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        setIsLoading(true);
        // Replace with your actual API endpoint
        const response = await fetch("/api/trips", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch trips");
        }

        const data = await response.json();
        setTrips(data.data);
        setError(null);
      } catch (err) {
        setError("Error fetching trips. Please try again later.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrips();
  }, []);

  const filteredTrips =
    statusFilter === "all"
      ? trips
      : trips.filter((trip) => trip.status === statusFilter);

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">My Trips</h1>
          <Link
            to="/trips/new"
            className="inline-flex items-center px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2"
            >
              <path d="M5 12h14" />
              <path d="M12 5v14" />
            </svg>
            New Trip
          </Link>
        </div>

        <div className="bg-card rounded-lg p-4 border">
          <div className="mb-4">
            <h2 className="text-lg font-medium mb-2">Filter by Status</h2>
            <div className="flex flex-wrap gap-2">
              {["all", "planning", "upcoming", "ongoing", "completed"].map(
                (status) => (
                  <button
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    className={`px-3 py-1 rounded-full text-sm ${
                      statusFilter === status
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted hover:bg-muted/90"
                    }`}
                  >
                    {status === "all"
                      ? "All Trips"
                      : status.charAt(0).toUpperCase() + status.slice(1)}
                  </button>
                )
              )}
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : error ? (
          <div className="bg-destructive/10 text-destructive p-4 rounded-md">
            {error}
          </div>
        ) : filteredTrips.length === 0 ? (
          <div className="text-center py-12 border rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mx-auto mb-4 text-muted-foreground"
            >
              <path d="M18 20V6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v14" />
              <path d="M2 20h20" />
              <path d="M14 12v.01" />
            </svg>
            <h3 className="text-lg font-medium mb-2">No trips found</h3>
            <p className="text-muted-foreground mb-4">
              {statusFilter === "all"
                ? "You haven't created any trips yet."
                : `You don't have any ${statusFilter} trips.`}
            </p>
            <Link
              to="/trips/new"
              className="inline-flex items-center px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Create Your First Trip
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTrips.map((trip) => (
              <TripCard key={trip._id} trip={trip} />
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default TripsPage;
