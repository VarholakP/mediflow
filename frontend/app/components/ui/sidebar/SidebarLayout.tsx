import React from "react";
import { NavLink } from "react-router";
/* import logo from "../../public/logo.png"; */


const navItems = [
  { label: "Home", to: "/" },
  { label: "Appointments", to: "/appointments" },
  { label: "Whatever", to: "/whatever" },
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
        <div
          style={{
            fontWeight: 600,
            fontSize: "20px",
            marginBottom: "32px",
            whiteSpace: "nowrap",
            color: "#111827",
          }}
        >
          MediFlow
        </div>
        {/* LOGO */}
        {/* <img
          src={logo}
          alt="Brand Logo"
          style={{
            width: "120px",
            marginBottom: "48px",
            opacity: 0.9,
          }}
        /> */}

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
                    background: isActive ? "#111827" : "transparent",
                    color: isActive ? "#ffffff" : "#4b5563",
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
