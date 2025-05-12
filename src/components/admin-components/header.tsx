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
        <header className="bg-dark backdrop-blur p-4 shadow-md fixed top-0 w-full z-10 flex gap-4 items-center">
            <button
                title="Toggle Sidebar"
                className="text-foreground-xl hover:text-accent transition-colors duration-200 cursor-pointer md:hidden"
                onClick={toggleSidebar}
                aria-label="Toggle Sidebar"
                aria-expanded="false"
                type="button"
                aria-controls="sidebar"
            >
                <GoSidebarCollapse />
            </button>

            <div className="flex gap-4 items-center justifu-start">
                <button type="button" onClick={handleLogout} className="cursor-pointer text-foreground-xl" title="Logout">
                    <BiLogOut />
                </button>

                <h1 className="text-2xl-bold-foreground">Admin Dashboard</h1>
            </div>
        </header>
    )
}

export default Header