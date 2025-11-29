import { Outlet } from "react-router";

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