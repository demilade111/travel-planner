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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  BarChart, 
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";
import { v4 as uuidv4 } from "uuid";
import { 
  DollarSign, 
  CreditCard, 
  Coffee, 
  Home, 
  Utensils, 
  Bus, 
  Ticket, 
  ShoppingBag, 
  Plane, 
  Download, 
  PlusCircle,
  Clock,
  Users,
  Calendar,
  Settings,
  FileText,
  Save,
  Trash,
  Plus,
  Filter
} from "lucide-react";

// Dummy data for expense categories
const EXPENSE_CATEGORIES = [
  { id: "food", name: "Food & Dining", icon: <Utensils className="h-4 w-4" />, color: "#4CAF50" },
  { id: "accommodation", name: "Accommodation", icon: <Home className="h-4 w-4" />, color: "#2196F3" },
  { id: "transportation", name: "Transportation", icon: <Bus className="h-4 w-4" />, color: "#FFC107" },
  { id: "activities", name: "Activities", icon: <Ticket className="h-4 w-4" />, color: "#9C27B0" },
  { id: "shopping", name: "Shopping", icon: <ShoppingBag className="h-4 w-4" />, color: "#E91E63" },
  { id: "flights", name: "Flights", icon: <Plane className="h-4 w-4" />, color: "#3F51B5" },
  { id: "coffee", name: "Coffee & Drinks", icon: <Coffee className="h-4 w-4" />, color: "#795548" },
  { id: "other", name: "Other", icon: <CreditCard className="h-4 w-4" />, color: "#607D8B" },
];

// Dummy data for currencies
const CURRENCIES = [
  { code: "USD", name: "US Dollar", symbol: "$" },
  { code: "EUR", name: "Euro", symbol: "€" },
  { code: "GBP", name: "British Pound", symbol: "£" },
  { code: "JPY", name: "Japanese Yen", symbol: "¥" },
  { code: "CAD", name: "Canadian Dollar", symbol: "CA$" },
  { code: "AUD", name: "Australian Dollar", symbol: "A$" },
  { code: "CNY", name: "Chinese Yuan", symbol: "¥" },
  { code: "INR", name: "Indian Rupee", symbol: "₹" },
];

export default function TripExpenses({ tripId, tripName, tripStartDate, tripEndDate }) {
  const { toast } = useToast();
  const [expenses, setExpenses] = useState([]);
  const [totalBudget, setTotalBudget] = useState(2000);
  const [newExpense, setNewExpense] = useState({
    description: "",
    amount: "",
    category: "",
    date: new Date(),
    currency: "USD",
    exchangeRate: 1,
    paidBy: "Me",
    splitWith: [],
  });
  
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);
  const [isEditBudgetOpen, setIsEditBudgetOpen] = useState(false);
  const [filterCategory, setFilterCategory] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [activeTab, setActiveTab] = useState("expenses");

  // Mock data load
  useEffect(() => {
    // In a real app, this would fetch from an API
    const mockExpenses = [
      {
        id: uuidv4(),
        description: "Hotel Reservation",
        amount: 450,
        category: "accommodation",
        date: new Date(2023, 5, 15),
        currency: "USD",
        exchangeRate: 1,
        paidBy: "Me",
        splitWith: [],
      },
      {
        id: uuidv4(),
        description: "Flight Tickets",
        amount: 850,
        category: "flights",
        date: new Date(2023, 5, 14),
        currency: "USD",
        exchangeRate: 1,
        paidBy: "Me",
        splitWith: [],
      },
      {
        id: uuidv4(),
        description: "Restaurant Dinner",
        amount: 120,
        category: "food",
        date: new Date(2023, 5, 16),
        currency: "USD",
        exchangeRate: 1,
        paidBy: "Me",
        splitWith: ["Alice", "Bob"],
      },
      {
        id: uuidv4(),
        description: "Taxi from Airport",
        amount: 45,
        category: "transportation",
        date: new Date(2023, 5, 15),
        currency: "USD",
        exchangeRate: 1,
        paidBy: "Bob",
        splitWith: ["Me"],
      },
      {
        id: uuidv4(),
        description: "Museum Tickets",
        amount: 60,
        category: "activities",
        date: new Date(2023, 5, 17),
        currency: "USD",
        exchangeRate: 1,
        paidBy: "Me",
        splitWith: [],
      },
    ];
    
    setExpenses(mockExpenses);
  }, [tripId]);

  // Calculate total expenses
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  
  // Calculate percentage of budget spent
  const budgetPercentage = Math.min(Math.round((totalExpenses / totalBudget) * 100), 100);
  
  // Function to handle adding a new expense
  const handleAddExpense = () => {
    if (!newExpense.description || !newExpense.amount || !newExpense.category) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    const expense = {
      ...newExpense,
      id: uuidv4(),
      amount: parseFloat(newExpense.amount),
    };
    
    setExpenses([...expenses, expense]);
    setNewExpense({
      description: "",
      amount: "",
      category: "",
      date: new Date(),
      currency: "USD",
      exchangeRate: 1,
      paidBy: "Me",
      splitWith: [],
    });
    
    setIsAddExpenseOpen(false);
    
    toast({
      title: "Expense Added",
      description: "Your expense has been recorded",
    });
  };
  
  // Function to handle deleting an expense
  const handleDeleteExpense = (id) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
    
    toast({
      title: "Expense Deleted",
      description: "The expense has been removed",
    });
  };
  
  // Function to update budget
  const handleUpdateBudget = (newBudget) => {
    setTotalBudget(parseFloat(newBudget));
    setIsEditBudgetOpen(false);
    
    toast({
      title: "Budget Updated",
      description: `Your budget has been set to $${newBudget}`,
    });
  };
  
  // Function to get filtered expenses
  const getFilteredExpenses = () => {
    let filtered = [...expenses];
    
    if (filterCategory !== "all") {
      filtered = filtered.filter(expense => expense.category === filterCategory);
    }
    
    filtered.sort((a, b) => {
      if (sortBy === "date") {
        return b.date - a.date;
      } else if (sortBy === "amount") {
        return b.amount - a.amount;
      } else {
        return 0;
      }
    });
    
    return filtered;
  };
  
  // Calculate expense data for charts
  const getCategoryData = () => {
    const categoryTotals = {};
    
    EXPENSE_CATEGORIES.forEach(cat => {
      categoryTotals[cat.id] = 0;
    });
    
    expenses.forEach(expense => {
      categoryTotals[expense.category] += expense.amount;
    });
    
    return EXPENSE_CATEGORIES.map(cat => ({
      name: cat.name,
      value: categoryTotals[cat.id],
      color: cat.color,
    })).filter(item => item.value > 0);
  };
  
  // Function to export expenses as CSV
  const handleExportCSV = () => {
    // Generate CSV data
    const headers = "Date,Category,Description,Amount,Currency,Paid By\n";
    const rows = expenses.map(e => 
      `${e.date.toLocaleDateString()},${e.category},${e.description},${e.amount},${e.currency},${e.paidBy}`
    ).join("\n");
    
    const csvContent = `data:text/csv;charset=utf-8,${headers}${rows}`;
    const encodedUri = encodeURI(csvContent);
    
    // Create a link to download the CSV
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `trip-expenses-${tripId}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Export Successful",
      description: "Your expenses have been exported to CSV",
    });
  };

  // Helper to format currency
  const formatCurrency = (amount, currencyCode) => {
    const currency = CURRENCIES.find(c => c.code === currencyCode);
    return `${currency.symbol}${amount.toFixed(2)}`;
  };

  // Helper to get category icon
  const getCategoryIcon = (categoryId) => {
    const category = EXPENSE_CATEGORIES.find(c => c.id === categoryId);
    return category ? category.icon : <CreditCard className="h-4 w-4" />;
  };

  // Helper to get category name
  const getCategoryName = (categoryId) => {
    const category = EXPENSE_CATEGORIES.find(c => c.id === categoryId);
    return category ? category.name : "Other";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Trip Expenses</h2>
          <p className="text-muted-foreground">
            Track and manage your expenses for {tripName}
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handleExportCSV}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button onClick={() => setIsAddExpenseOpen(true)}>
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Expense
          </Button>
        </div>
      </div>
      
      {/* Budget Overview */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle>Budget Overview</CardTitle>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setIsEditBudgetOpen(true)}
            >
              <Settings className="h-4 w-4 mr-2" />
              Edit Budget
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-sm text-muted-foreground">Total Budget</span>
                <div className="text-2xl font-bold">${totalBudget.toFixed(2)}</div>
              </div>
              <div className="space-y-1">
                <span className="text-sm text-muted-foreground">Spent</span>
                <div className="text-2xl font-bold">${totalExpenses.toFixed(2)}</div>
              </div>
              <div className="space-y-1">
                <span className="text-sm text-muted-foreground">Remaining</span>
                <div className={`text-2xl font-bold ${(totalBudget - totalExpenses) < 0 ? 'text-red-500' : ''}`}>
                  ${(totalBudget - totalExpenses).toFixed(2)}
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>{budgetPercentage}% of budget used</span>
                <span>${totalExpenses.toFixed(2)} / ${totalBudget.toFixed(2)}</span>
              </div>
              <Progress 
                value={budgetPercentage} 
                className={budgetPercentage > 90 ? 'text-red-500' : ''}
              />
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="expenses">Expenses List</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="split">Split Bills</TabsTrigger>
        </TabsList>
        
        {/* Expenses List Tab */}
        <TabsContent value="expenses" className="space-y-4">
          {/* Filters */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center space-x-2">
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {EXPENSE_CATEGORIES.map(cat => (
                    <SelectItem key={cat.id} value={cat.id}>
                      <div className="flex items-center">
                        {cat.icon}
                        <span className="ml-2">{cat.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">Sort by Date</SelectItem>
                  <SelectItem value="amount">Sort by Amount</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="text-sm text-muted-foreground">
              Showing {getFilteredExpenses().length} of {expenses.length} expenses
            </div>
          </div>
          
          {/* Expenses Table */}
          {getFilteredExpenses().length > 0 ? (
            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Paid By</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {getFilteredExpenses().map((expense) => (
                    <TableRow key={expense.id}>
                      <TableCell>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                          {expense.date.toLocaleDateString()}
                        </div>
                      </TableCell>
                      <TableCell>{expense.description}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          {getCategoryIcon(expense.category)}
                          <span className="ml-2">{getCategoryName(expense.category)}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">
                          {formatCurrency(expense.amount, expense.currency)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          {expense.paidBy === "Me" ? (
                            <span>You</span>
                          ) : (
                            <div className="flex items-center">
                              <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                              {expense.paidBy}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleDeleteExpense(expense.id)}
                        >
                          <Trash className="h-4 w-4 text-muted-foreground" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 border rounded-md">
              <CreditCard className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No expenses found</h3>
              <p className="text-muted-foreground">
                Add your first expense to start tracking your spending
              </p>
              <Button 
                className="mt-4" 
                onClick={() => setIsAddExpenseOpen(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add an Expense
              </Button>
            </div>
          )}
        </TabsContent>
        
        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Expense by Category */}
            <Card>
              <CardHeader>
                <CardTitle>Expenses by Category</CardTitle>
                <CardDescription>
                  Breakdown of your spending by category
                </CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={getCategoryData()}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {getCategoryData().map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value) => [`$${value.toFixed(2)}`, 'Amount']}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            {/* Daily Spending */}
            <Card>
              <CardHeader>
                <CardTitle>Daily Spending</CardTitle>
                <CardDescription>
                  Your spending trends over time
                </CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={expenses
                      .sort((a, b) => a.date - b.date)
                      .map(e => ({
                        date: e.date.toLocaleDateString(),
                        amount: e.amount,
                        category: getCategoryName(e.category),
                      }))}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip
                      formatter={(value) => [`$${value.toFixed(2)}`, 'Amount']}
                    />
                    <Legend />
                    <Bar dataKey="amount" fill="#4CAF50" name="Amount" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            {/* Category Breakdown */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Category Breakdown</CardTitle>
                <CardDescription>
                  Detailed spending by category
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {EXPENSE_CATEGORIES.filter(cat => 
                    expenses.some(e => e.category === cat.id)
                  ).map(category => {
                    const categoryTotal = expenses
                      .filter(e => e.category === category.id)
                      .reduce((sum, e) => sum + e.amount, 0);
                      
                    const percentage = Math.round((categoryTotal / totalExpenses) * 100);
                    
                    return (
                      <div key={category.id} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            {category.icon}
                            <span className="ml-2 font-medium">{category.name}</span>
                          </div>
                          <div className="text-right">
                            <div className="font-medium">${categoryTotal.toFixed(2)}</div>
                            <div className="text-xs text-muted-foreground">{percentage}% of total</div>
                          </div>
                        </div>
                        <Progress value={percentage} className="h-2" />
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Split Bills Tab */}
        <TabsContent value="split" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Split Summary</CardTitle>
              <CardDescription>
                See who owes what based on shared expenses
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* You paid */}
                <div>
                  <h3 className="text-sm font-medium mb-2">You paid:</h3>
                  <div className="rounded-md border bg-muted/40 p-4">
                    <div className="text-2xl font-bold">
                      ${expenses
                        .filter(e => e.paidBy === "Me")
                        .reduce((sum, e) => sum + e.amount, 0)
                        .toFixed(2)}
                    </div>
                  </div>
                </div>
                
                {/* Others paid */}
                <div>
                  <h3 className="text-sm font-medium mb-2">Others paid:</h3>
                  <div className="space-y-2">
                    {Array.from(new Set(expenses
                      .filter(e => e.paidBy !== "Me")
                      .map(e => e.paidBy)))
                      .map(person => {
                        const totalPaid = expenses
                          .filter(e => e.paidBy === person)
                          .reduce((sum, e) => sum + e.amount, 0);
                          
                        return (
                          <div 
                            key={person} 
                            className="flex justify-between items-center rounded-md border p-3"
                          >
                            <div className="flex items-center">
                              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                {person.substring(0, 1)}
                              </div>
                              <span className="ml-2 font-medium">{person}</span>
                            </div>
                            <div className="font-medium">${totalPaid.toFixed(2)}</div>
                          </div>
                        );
                      })}
                  </div>
                </div>
                
                <Separator />
                
                {/* Balance Summary */}
                <div>
                  <h3 className="text-sm font-medium mb-2">Balance Summary:</h3>
                  
                  {/* Generate settlement info */}
                  {Array.from(new Set(expenses
                    .filter(e => e.paidBy !== "Me" || e.splitWith.length > 0)
                    .flatMap(e => [e.paidBy, ...e.splitWith])
                    .filter(p => p !== "Me")))
                    .map(person => {
                      // Calculate what they paid for you
                      const theyPaidForYou = expenses
                        .filter(e => e.paidBy === person && e.splitWith.includes("Me"))
                        .reduce((sum, e) => sum + (e.amount / (e.splitWith.length + 1)), 0);
                        
                      // Calculate what you paid for them
                      const youPaidForThem = expenses
                        .filter(e => e.paidBy === "Me" && e.splitWith.includes(person))
                        .reduce((sum, e) => sum + (e.amount / (e.splitWith.length + 1)), 0);
                        
                      // Calculate net balance
                      const balance = youPaidForThem - theyPaidForYou;
                      
                      return (
                        <div 
                          key={person} 
                          className={`flex justify-between items-center rounded-md p-3 ${
                            balance > 0 
                              ? 'bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-300' 
                              : balance < 0 
                                ? 'bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-300' 
                                : 'bg-gray-50 dark:bg-gray-900'
                          }`}
                        >
                          <div className="flex-1">
                            {balance > 0 ? (
                              <span>{person} owes you</span>
                            ) : balance < 0 ? (
                              <span>You owe {person}</span>
                            ) : (
                              <span>You and {person} are settled up</span>
                            )}
                          </div>
                          <div className="font-bold">
                            ${Math.abs(balance).toFixed(2)}
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Add Expense Dialog */}
      <Dialog open={isAddExpenseOpen} onOpenChange={setIsAddExpenseOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Expense</DialogTitle>
            <DialogDescription>
              Enter the details of your expense below
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="description" className="text-right text-sm">
                Description
              </label>
              <Input
                id="description"
                className="col-span-3"
                value={newExpense.description}
                onChange={(e) => setNewExpense({...newExpense, description: e.target.value})}
                placeholder="Hotel, Dinner, etc."
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="amount" className="text-right text-sm">
                Amount
              </label>
              <div className="col-span-3 flex space-x-2">
                <Select
                  value={newExpense.currency}
                  onValueChange={(value) => setNewExpense({...newExpense, currency: value})}
                >
                  <SelectTrigger className="w-24">
                    <SelectValue placeholder="Currency" />
                  </SelectTrigger>
                  <SelectContent>
                    {CURRENCIES.map(currency => (
                      <SelectItem key={currency.code} value={currency.code}>
                        {currency.code}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Input
                  id="amount"
                  type="number"
                  className="flex-1"
                  value={newExpense.amount}
                  onChange={(e) => setNewExpense({...newExpense, amount: e.target.value})}
                  placeholder="0.00"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="category" className="text-right text-sm">
                Category
              </label>
              <Select
                value={newExpense.category}
                onValueChange={(value) => setNewExpense({...newExpense, category: value})}
              >
                <SelectTrigger className="col-span-3" id="category">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {EXPENSE_CATEGORIES.map(category => (
                    <SelectItem key={category.id} value={category.id}>
                      <div className="flex items-center">
                        {category.icon}
                        <span className="ml-2">{category.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="date" className="text-right text-sm">
                Date
              </label>
              <Input
                id="date"
                type="date"
                className="col-span-3"
                value={newExpense.date.toISOString().split('T')[0]}
                onChange={(e) => setNewExpense({
                  ...newExpense, 
                  date: new Date(e.target.value)
                })}
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="paidBy" className="text-right text-sm">
                Paid By
              </label>
              <Select
                value={newExpense.paidBy}
                onValueChange={(value) => setNewExpense({...newExpense, paidBy: value})}
              >
                <SelectTrigger className="col-span-3" id="paidBy">
                  <SelectValue placeholder="Who paid?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Me">You</SelectItem>
                  <SelectItem value="Alice">Alice</SelectItem>
                  <SelectItem value="Bob">Bob</SelectItem>
                  <SelectItem value="Charlie">Charlie</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddExpenseOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddExpense}>
              <Save className="h-4 w-4 mr-2" />
              Save Expense
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Edit Budget Dialog */}
      <Dialog open={isEditBudgetOpen} onOpenChange={setIsEditBudgetOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Update Budget</DialogTitle>
            <DialogDescription>
              Set the total budget for your trip
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="budget" className="text-right text-sm">
                Budget Amount
              </label>
              <div className="col-span-3 flex items-center">
                <DollarSign className="h-4 w-4 mr-2 text-muted-foreground" />
                <Input
                  id="budget"
                  type="number"
                  className="flex-1"
                  value={totalBudget}
                  onChange={(e) => setTotalBudget(parseFloat(e.target.value) || 0)}
                  placeholder="0.00"
                />
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditBudgetOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => handleUpdateBudget(totalBudget)}>
              <Save className="h-4 w-4 mr-2" />
              Update Budget
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
} 