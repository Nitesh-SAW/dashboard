'use client'
import Link from "next/link";
import Navigation from "@/components/Navigation";
import { Provider } from "react-redux";
import store from "@/lib/store";


export default function RootLayout({ children }) {
    return (

        <div className="h-screen flex">
            <div className="w-[15%] md:w-[8%] lg:w-[15%] bg-slate-900 text-white overflow-y-scroll">
                <Link href="/admin/home" className="flex justify-center items-center mt-2 text-white">
                    <span className="hidden lg:block">Breezendtech</span>
                </Link>
                <Navigation />
            </div>
            <Provider store={store}>
                <div className="h-full w-[85%] px-3 bg-slate-100 overflow-auto">
                    {children}
                </div>
            </Provider>
        </div >
    );
}