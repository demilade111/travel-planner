import React, { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";

interface SidebarLinkProps {
  to: string;
  icon: ReactNode;
  label: string;
  active: boolean;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({
  to,
  icon,
  label,
  active,
}) => {
  return (
    <Link
      to={to}
      className={`flex items-center p-2 rounded-lg ${
        active ? "bg-primary text-primary-foreground" : "hover:bg-muted"
      }`}
    >
      <span className="mr-3">{icon}</span>
      <span>{label}</span>
    </Link>
  );
};

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="container mx-auto p-4 flex items-center justify-between">
          <Link to="/" className="text-xl font-bold">
            Travel Planner
          </Link>
          <div className="flex items-center space-x-4">
            <Link to="/profile" className="p-2 rounded-full hover:bg-muted">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <circle cx="12" cy="8" r="5" />
                <path d="M20 21a8 8 0 1 0-16 0" />
              </svg>
            </Link>
          </div>
        </div>
      </header>

      <div className="flex-1 container mx-auto flex">
        <aside className="w-64 p-4 hidden md:block">
          <nav className="space-y-2">
            <SidebarLink
              to="/dashboard"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <rect width="18" height="18" x="3" y="3" rx="2" />
                  <path d="M9 9h.01" />
                  <path d="M15 9h.01" />
                  <path d="M9 15h.01" />
                  <path d="M15 15h.01" />
                </svg>
              }
              label="Dashboard"
              active={location.pathname === "/dashboard"}
            />
            <SidebarLink
              to="/trips"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M3 7h18" />
                  <path d="M19 7v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V7" />
                  <path d="M1 7h22" />
                  <path d="M12 7V3a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v4" />
                  <path d="M18 7V3a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4" />
                </svg>
              }
              label="My Trips"
              active={location.pathname.startsWith("/trips")}
            />
            <SidebarLink
              to="/expenses"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v12" />
                  <path d="M8 10h8" />
                </svg>
              }
              label="Expenses"
              active={location.pathname.startsWith("/expenses")}
            />
            <SidebarLink
              to="/packing"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M5 7 3 5l2-2" />
                  <path d="M9 5h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H9" />
                  <path d="M5 19 3 17l2-2" />
                  <path d="M9 11h6" />
                  <path d="M12 8v6" />
                </svg>
              }
              label="Packing Lists"
              active={location.pathname.startsWith("/packing")}
            />
            <SidebarLink
              to="/collaborate"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M15 14c.2-1 .7-1.7 1.5-2" />
                  <path d="M6.5 12c.8.3 1.3 1 1.5 2" />
                  <path d="M20 20v-2a3 3 0 0 0-1.5-2.6" />
                  <path d="M4 20v-2a3 3 0 0 1 1.5-2.6" />
                  <circle cx="8" cy="10" r="2" />
                  <circle cx="16" cy="10" r="2" />
                </svg>
              }
              label="Collaborate"
              active={location.pathname.startsWith("/collaborate")}
            />
            <SidebarLink
              to="/ai-assistant"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M12 8V4H8" />
                  <rect width="16" height="12" x="4" y="8" rx="2" />
                  <path d="M2 14h2" />
                  <path d="M20 14h2" />
                  <path d="M15 13v2" />
                  <path d="M9 13v2" />
                </svg>
              }
              label="AI Assistant"
              active={location.pathname.startsWith("/ai-assistant")}
            />
          </nav>
        </aside>

        <main className="flex-1 p-4">{children}</main>
      </div>
    </div>
  );
};

export default MainLayout;
