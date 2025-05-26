import Header from "@/components/admin-components/header";
// import Footer from "@/components/sections/footer";
import { Routes } from "@/utils/types/routes";
import Link from "next/link";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="grid bg-background min-h-screen md:grid-cols-[200px_1fr]">
            {/* Header */}
            <Header />

            {/* Sidebar */}
            <nav className="pt-16 fixed -left-[200px] md:left-0 md:static w-[200px] h-full transition-all duration-300">
                <div className="p-4 flex flex-col justify-between gap-4 bg-dark/5 backdrop-blur h-full border-r border-primary/30">
                    <ul className="flex flex-col gap-4 text-foreground">
                        <li>
                            <Link
                                href={`${Routes.admin}`}
                                className="p-3 rounded-lg hover:bg-primary/10 hover:text-primary transition-all duration-300 flex items-center gap-2"
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                href={`${Routes.admin}/projects`}
                                className="p-3 rounded-lg hover:bg-primary/10 hover:text-primary transition-all duration-300 flex items-center gap-2"
                            >
                                Projects
                            </Link>
                        </li>
                        <li>
                            <Link
                                href={`${Routes.admin}/settings`}
                                className="p-3 rounded-lg hover:bg-primary/10 hover:text-primary transition-all duration-300 flex items-center gap-2"
                            >
                                Settings
                            </Link>
                        </li>
                    </ul>

                    {/* <Footer /> */}
                </div>
            </nav>

            {/* Main Content */}
            <main className="flex-grow pt-24 p-8 text-foreground overflow-auto h-screen bg-background">
                <div className="max-w-4xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;