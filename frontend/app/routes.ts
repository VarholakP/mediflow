import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("whatever","./routes/whatever.tsx"),
    route("appointments", "./routes/appointments.tsx") 

] satisfies RouteConfig;
