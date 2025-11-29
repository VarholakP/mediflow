import { Outlet } from "react-router";
import { SidebarLayout } from "~/components/ui/sidebar/SidebarLayout";

function DashboardLayout() {
    return (
        <>
            <main>
                <Outlet/>
            </main>
        </>
    )
}

export default DashboardLayout