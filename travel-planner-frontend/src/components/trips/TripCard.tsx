import React from "react";
import { Link } from "react-router-dom";
import { formatDistance } from "date-fns";

interface TripCardProps {
  trip: {
    _id: string;
    name: string;
    destination: string;
    startDate: string;
    endDate: string;
    image: string;
    status: "planning" | "upcoming" | "ongoing" | "completed";
  };
}

const TripCard: React.FC<TripCardProps> = ({ trip }) => {
  const startDate = new Date(trip.startDate);
  const endDate = new Date(trip.endDate);
  const duration = Math.ceil(
    (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "planning":
        return "bg-blue-100 text-blue-800";
      case "upcoming":
        return "bg-amber-100 text-amber-800";
      case "ongoing":
        return "bg-green-100 text-green-800";
      case "completed":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTimeUntil = () => {
    const now = new Date();
    if (now > endDate) {
      return `Ended ${formatDistance(endDate, now, { addSuffix: true })}`;
    } else if (now > startDate) {
      return `Ends ${formatDistance(endDate, now, { addSuffix: true })}`;
    } else {
      return `Starts ${formatDistance(startDate, now, { addSuffix: true })}`;
    }
  };

  return (
    <Link
      to={`/trips/${trip._id}`}
      className="block overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md"
    >
      <div className="aspect-video w-full overflow-hidden">
        {trip.image ? (
          <img
            src={trip.image}
            alt={trip.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-muted">
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
              className="text-muted-foreground opacity-50"
            >
              <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
              <circle cx="12" cy="13" r="3" />
            </svg>
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="font-semibold text-lg">{trip.name}</h3>
          <span
            className={`text-xs px-2 py-1 rounded-full ${getStatusBadgeColor(
              trip.status
            )}`}
          >
            {trip.status.charAt(0).toUpperCase() + trip.status.slice(1)}
          </span>
        </div>

        <p className="text-muted-foreground text-sm mb-2">{trip.destination}</p>

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{`${duration} ${duration === 1 ? "day" : "days"}`}</span>
          <span>{getTimeUntil()}</span>
        </div>
      </div>
    </Link>
  );
};

export default TripCard;
