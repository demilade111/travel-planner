import React, { ReactNode, useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Globe, Menu, Moon, Sun, UserCircle, X } from "lucide-react";
import { Toaster } from "@/components/ui/toaster";

// Import pages
import HomePage from "./pages/HomePage";
import DashboardPage from "./pages/DashboardPage";
import CreateItineraryPage from "./pages/CreateItineraryPage";
import ExplorePage from "./pages/ExplorePage";
import PackingListPage from "./pages/PackingListPage";
import AiPlannerPage from "./pages/AiPlannerPage";
import CommunityPage from "./pages/CommunityPage";
import ExpensesPage from "./pages/ExpensesPage";

// Import typography styles
import "./styles/typography.css";

// Navigation menu items
const navItems = [
  { name: "Home", path: "/" },
  { name: "My Trips", path: "/dashboard" },
  { name: "Create New", path: "/create-itinerary" },
  { name: "Explore", path: "/explore" },
];

// Layout Component
const Layout = ({ children }: { children: ReactNode }) => {
  // Get stored dark mode preference or default to system preference
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [darkMode, setDarkMode] = useState(() => {
    const stored = localStorage.getItem("darkMode");
    return stored !== null ? stored === "true" : prefersDark;
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Apply dark mode class on component mount and when darkMode changes
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    // Store preference
    localStorage.setItem("darkMode", darkMode.toString());
  }, [darkMode]);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Check if the current path is active
  const isActivePath = (path: string) => {
    if (path === "/" && location.pathname !== "/") return false;
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-200">
      {/* Header */}
      <header className="border-b border-gray-100 dark:border-gray-800 sticky top-0 z-50 bg-white dark:bg-gray-950 backdrop-blur-sm bg-opacity-80 dark:bg-opacity-80">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <Globe className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              <span className="ml-2 text-xl font-bold">Travel Planner</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-sm font-medium transition-colors ${
                    isActivePath(item.path)
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              {/* Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label="Toggle dark mode"
              >
                {darkMode ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </button>

              {/* User Menu (placeholder) */}
              <Button variant="ghost" size="icon" className="rounded-full">
                <UserCircle className="h-6 w-6" />
              </Button>

              {/* Mobile menu button */}
              <button
                className="md:hidden p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-950 border-b border-gray-100 dark:border-gray-800">
          <div className="container mx-auto px-4 py-3">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`py-2 text-sm font-medium ${
                    isActivePath(item.path)
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-grow">{children}</main>

      {/* Footer */}
      <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
        <div className="container mx-auto py-12 px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Globe className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                <span className="ml-2 text-lg font-bold">Travel Planner</span>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                Plan your perfect trip with ease and discover amazing
                destinations around the world.
              </p>
            </div>

            <div>
              <h3 className="font-medium mb-4">Features</h3>
              <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                <li>
                  <a
                    href="/"
                    className="hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    Trip Planning
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className="hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    Budget Tracking
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className="hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    Destination Guides
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className="hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    Trip Sharing
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                <li>
                  <a
                    href="/"
                    className="hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className="hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className="hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className="hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                <li>
                  <a
                    href="/"
                    className="hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className="hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className="hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              © {new Date().getFullYear()} Travel Planner. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a
                href="/"
                className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
              >
                <span className="sr-only">Facebook</span>
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a
                href="/"
                className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
              >
                <span className="sr-only">Instagram</span>
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a
                href="/"
                className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
              >
                <span className="sr-only">Twitter</span>
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/create-itinerary" element={<CreateItineraryPage />} />
          <Route path="/edit-itinerary/:id" element={<CreateItineraryPage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/packing-list" element={<PackingListPage />} />
          <Route path="/ai-planner" element={<AiPlannerPage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/expenses/:tripId?" element={<ExpensesPage />} />
          <Route path="/view-itinerary/:id" element={<DashboardPage />} />
          <Route
            path="*"
            element={
              <div className="container mx-auto py-12 text-center">
                <h1 className="text-2xl">Page Not Found</h1>
              </div>
            }
          />
        </Routes>
      </Layout>
      <Toaster />
    </Router>
  );
}

export default App;
