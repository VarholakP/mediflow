import { type RouteConfig, index, route, layout } from "@react-router/dev/routes";


export default [
    index("./routes/dashboard/home.tsx"),
    layout("./routes/dashboard/_layout.tsx", [
        route("whatever", "./routes/dashboard/whatever.tsx"),
        route("appointments", "./routes/appointments.tsx") 
    ])
] satisfies RouteConfig;
