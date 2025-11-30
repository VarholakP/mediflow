import { Outlet } from "react-router";
import ChatComponent from "~/components/chat-component";

function DashboardLayout() {
    return (
        <>
            <ChatComponent/>
            <main>
                <Outlet/>
            </main>
        </>
    )
}

export default DashboardLayout