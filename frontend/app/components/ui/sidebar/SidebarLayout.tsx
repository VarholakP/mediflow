import React from "react";
import { NavLink } from "react-router";


const navItems = [
  { label: "Home", to: "/" },
  { label: "Appointments", to: "/appointments" },
  { label: "New Appointment", to: "/create-appointment" },
];

interface SidebarLayoutProps {
  children: React.ReactNode;
}

export function SidebarLayout({ children }: SidebarLayoutProps) {
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#f9fafb",
      }}
    >
      {/* SIDEBAR */}
      <aside
        style={{
          width: "280px",             
          padding: "24px",
          borderRight: "1px solid #e5e7eb",
          background: "#ffffff",
        }}
      >
        {/* LOGO */}
<div
  style={{
    display: "flex",
    justifyContent: "center",
    marginBottom: "48px",
  }}
>
  <img
    src="/logo.png"    
    alt="Brand Logo"
    style={{
      width: "200px",
      opacity: 0.9,
    }}
  /> */
</div>

        <nav
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              style={{ textDecoration: "none" }}
            >
              {({ isActive }) => (
                <div
                  style={{
                    width: "100%",              // FULL WIDTH
                    height: "36px",
                    padding: "0 14px",
                    borderRadius: "9999px",
                    display: "flex",
                    alignItems: "center",
                    whiteSpace: "nowrap",
                    fontSize: "14px",
                    background: isActive ? "#619dcdff" : "transparent",
                    color: isActive ? "#ffffff" : "#4b5563ff",
                    cursor: "pointer",
                  }}
                >
                  {item.label}
                </div>
              )}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* CONTENT */}
      <main
        style={{
          flex: 1,
          padding: "24px",
        }}
      >
        {children}
      </main>
    </div>
  );
}
