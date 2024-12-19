'use client'
import { Provider } from "react-redux";
import store from "@/lib/store";
import Footer from "@/components/Footer";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/app-sidebar";


export default function RootLayout({ children }) {
    return (
        <SidebarProvider>
            <AppSidebar/>
            <SidebarInset className="!scroll-smooth overflow-none">
                <Provider store={store}>
                    <div className="flex flex-col min-h-screen px-3 bg-muted/50">
                        <div className="flex-1 overflow-y-auto">
                            {children}
                        </div>
                        <Footer />
                    </div>
                </Provider>
            </SidebarInset>
        </SidebarProvider>
    );
}