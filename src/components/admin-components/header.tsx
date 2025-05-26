"use client";

import { logout } from "@/actions/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BiLogOut } from "react-icons/bi";
import { GoSidebarCollapse } from "react-icons/go"

const Header = () => {
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const toggleSidebar = () => {
        const sidebar = document.querySelector("nav") as HTMLElement;
        const isCollapsed = sidebar.classList.contains("-left-[200px]");

        if (isCollapsed) {
            sidebar.classList.remove("-left-[200px]");
            sidebar.classList.add("left-0");
        } else {
            sidebar.classList.remove("left-0");
            sidebar.classList.add("-left-[200px]");
        }
    };

    const handleLogout = async () => {
        setError(null);
        const result = await logout();
        if (!result.success) {
            setError(result.message || "something went wrong!, try again");
        }

        if (error) {
            console.log("Error logging out: ", error)
            return;
        }

        router.push("/");
    }

    return (
        <header className="backdrop-blur p-4 shadow-md fixed top-0 w-full z-10 flex gap-4 items-center bg-dark/5 border-b border-primary/30">
            <button
                title="Toggle Sidebar"
                className="text-foreground hover:text-primary transition-colors duration-300 cursor-pointer md:hidden p-2 rounded-lg hover:bg-primary/10"
                onClick={toggleSidebar}
                aria-label="Toggle Sidebar"
                aria-expanded="false"
                type="button"
                aria-controls="sidebar"
            >
                <GoSidebarCollapse className="w-6 h-6" />
            </button>

            <div className="flex gap-4 items-center justify-between w-full">
                <h1 className="text-2xl font-bold text-primary">Admin Dashboard</h1>

                <button
                    type="button"
                    onClick={handleLogout}
                    className="cursor-pointer text-foreground hover:text-primary transition-colors duration-300 p-2 rounded-lg hover:bg-primary/10"
                    title="Logout"
                >
                    <BiLogOut className="w-6 h-6" />
                </button>
            </div>
        </header>
    )
}

export default Header