import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
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
  Check,
  Plus,
  Trash,
  Save,
  Share2,
  Download,
  CheckSquare,
  PenSquare,
  ChevronLeft,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function PackingListPage() {
  const [items, setItems] = useState([
    { id: 1, name: "Passport", category: "documents", packed: false },
    { id: 2, name: "Travel Insurance Documents", category: "documents", packed: false },
    { id: 3, name: "Flight Tickets", category: "documents", packed: false },
    { id: 4, name: "Credit Cards", category: "documents", packed: false },
    { id: 5, name: "T-Shirts", category: "clothing", packed: false },
    { id: 6, name: "Pants/Shorts", category: "clothing", packed: false },
    { id: 7, name: "Underwear", category: "clothing", packed: false },
    { id: 8, name: "Socks", category: "clothing", packed: false },
    { id: 9, name: "Jacket/Sweater", category: "clothing", packed: false },
    { id: 10, name: "Toothbrush & Toothpaste", category: "toiletries", packed: false },
    { id: 11, name: "Shampoo & Conditioner", category: "toiletries", packed: false },
    { id: 12, name: "Sunscreen", category: "toiletries", packed: false },
    { id: 13, name: "Deodorant", category: "toiletries", packed: false },
    { id: 14, name: "Phone Charger", category: "electronics", packed: false },
    { id: 15, name: "Camera", category: "electronics", packed: false },
    { id: 16, name: "Power Adapter", category: "electronics", packed: false },
  ]);

  const [newItem, setNewItem] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [editMode, setEditMode] = useState(false);

  const categories = [
    { id: "all", name: "All Items" },
    { id: "documents", name: "Documents" },
    { id: "clothing", name: "Clothing" },
    { id: "toiletries", name: "Toiletries" },
    { id: "electronics", name: "Electronics" },
    { id: "misc", name: "Miscellaneous" },
  ];

  const filteredItems = selectedCategory === "all" 
    ? items 
    : items.filter(item => item.category === selectedCategory);

  const packedItems = filteredItems.filter(item => item.packed).length;
  const totalItems = filteredItems.length;
  const progressPercentage = totalItems > 0 ? (packedItems / totalItems) * 100 : 0;

  const handleAddItem = () => {
    if (newItem.trim() !== "") {
      const category = selectedCategory === "all" ? "misc" : selectedCategory;
      setItems([
        ...items,
        {
          id: Date.now(),
          name: newItem,
          category,
          packed: false,
        },
      ]);
      setNewItem("");
    }
  };

  const handleToggleItem = (id) => {
    setItems(
      items.map(item =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  };

  const handleDeleteItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex items-center mb-8">
        <Button
          variant="ghost"
          size="sm"
          className="text-gray-500 hover:text-gray-700 mr-4"
          onClick={() => window.history.back()}
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back
        </Button>
        <h1 className="text-3xl font-bold">Packing List</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="border-gray-200 dark:border-gray-700 shadow-sm">
            <CardHeader className="pb-3 flex flex-row justify-between items-center">
              <div>
                <CardTitle>Trip Items</CardTitle>
                <CardDescription>
                  Keep track of everything you need to pack
                </CardDescription>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setEditMode(!editMode)}
              >
                {editMode ? (
                  <>
                    <CheckSquare className="h-4 w-4 mr-2" />
                    Done
                  </>
                ) : (
                  <>
                    <PenSquare className="h-4 w-4 mr-2" />
                    Edit
                  </>
                )}
              </Button>
            </CardHeader>

            <CardContent>
              {/* Category Tabs */}
              <Tabs defaultValue="all" value={selectedCategory} onValueChange={setSelectedCategory}>
                <TabsList className="grid grid-cols-3 md:grid-cols-6 mb-6">
                  {categories.map(category => (
                    <TabsTrigger key={category.id} value={category.id}>
                      {category.name}
                    </TabsTrigger>
                  ))}
                </TabsList>
                
                {/* Add Item Form */}
                <div className="flex mb-6">
                  <Input
                    type="text"
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                    placeholder="Add new item..."
                    className="flex-grow rounded-r-none"
                    onKeyDown={(e) => e.key === "Enter" && handleAddItem()}
                  />
                  <Button
                    className="rounded-l-none"
                    onClick={handleAddItem}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add
                  </Button>
                </div>

                {/* Items List - one TabsContent for each category */}
                {categories.map(category => (
                  <TabsContent key={category.id} value={category.id} className="space-y-2 mt-0">
                    {(category.id === "all" ? items : items.filter(item => item.category === category.id)).length > 0 ? (
                      (category.id === "all" ? items : items.filter(item => item.category === category.id)).map(item => (
                        <div
                          key={item.id}
                          className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
                            item.packed
                              ? "bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300"
                              : "bg-gray-50 dark:bg-gray-800/40"
                          }`}
                        >
                          <div className="flex items-center">
                            <Checkbox
                              checked={item.packed}
                              onCheckedChange={() => handleToggleItem(item.id)}
                              className="mr-3"
                            />
                            <span
                              className={item.packed ? "line-through opacity-70" : ""}
                            >
                              {item.name}
                            </span>
                          </div>
                          {editMode && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                              onClick={() => handleDeleteItem(item.id)}
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        No items in this category. Add some items to get started!
                      </div>
                    )}
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="sticky top-4 border-gray-200 dark:border-gray-700 shadow-sm">
            <CardHeader>
              <CardTitle>Packing Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>
                    {packedItems} of {totalItems} items packed
                  </span>
                  <span className="font-medium">
                    {Math.round(progressPercentage)}%
                  </span>
                </div>
                <Progress value={progressPercentage} className="h-2.5" />
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <Button className="w-full">
                  <Save className="h-4 w-4 mr-2" />
                  Save List
                </Button>
                <Button variant="outline" className="w-full">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share List
                </Button>
                <Button variant="outline" className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Export as PDF
                </Button>
              </div>

              {/* Tips */}
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <h3 className="font-medium text-blue-700 dark:text-blue-300 mb-2">
                  Packing Tips
                </h3>
                <ul className="text-sm text-blue-600 dark:text-blue-300 space-y-1">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Roll clothes to save space</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Pack essentials in carry-on</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Use packing cubes for organization</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 