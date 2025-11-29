import { type RouteConfig, index, route, layout } from "@react-router/dev/routes";


export default [
    index("./routes/dashboard/home.tsx"),
    layout("./routes/dashboard/_layout.tsx", [
        route("create-appointment", "./routes/dashboard/create-appointment.tsx"),
        route("appointments", "./routes/dashboard/appointments.tsx") 
    ])
] satisfies RouteConfig;
