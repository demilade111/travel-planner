import React from "react";
import { useParams } from "react-router-dom";
import TripExpenses from "@/components/expenses/TripExpenses";

export default function ExpensesPage() {
  const { tripId } = useParams();
  
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Trip Expenses</h1>
      <TripExpenses tripId={tripId || "1"} />
    </div>
  );
} 