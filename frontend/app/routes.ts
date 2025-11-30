import { type RouteConfig, index, route, layout } from "@react-router/dev/routes";


export default [
    index("./routes/dashboard/home.tsx"),
    layout("./routes/dashboard/_layout.tsx", [
        route("appointments", "./routes/dashboard/appointments.tsx"),
        route("adminappointments", "./routes/dashboard/admin-appointments.tsx"),
        route("gpadminappointments", "./routes/dashboard/gp-admin-appointments.tsx")
    ])
] satisfies RouteConfig;
