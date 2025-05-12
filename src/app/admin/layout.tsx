import Header from "@/components/admin-components/header";
import Footer from "@/components/sections/footer";
import { Routes } from "@/utils/types/routes";
import Link from "next/link";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="grid bg-background min-h-screen md:grid-cols-[200px_1fr]">
            {/* Header */}
            <Header />

            {/* Sidebar */}
            <nav className="pt-16 fixed -left-[200px] md:left-0 md:static w-[200px] h-full">
                <div className="p-4 flex flex-col justify-between gap-4 bg-dark backdrop-blur h-full">
                    <ul className="flex flex-col gap-4 text-foreground">
                        <li><Link href={`${Routes.admin}`} className="hover:underline">Home</Link></li>
                        <li><Link href={`${Routes.admin}/projects`} className="hover:underline">Projects</Link></li>
                        <li><Link href={`${Routes.admin}/settings`} className="hover:underline">Settings</Link></li>
                    </ul>

                    <Footer className="text-xs-light-center" />
                </div>
            </nav>

            {/* Main Content */}
            <main className="flex-grow p-4 text-foreground overflow-auto h-screen">
                {children}
            </main>
        </div>
    );
};

export default AdminLayout;