import Header from "@/components/admin-components/header";
import ThemeProvider from "@/providers/theme-provider";
import { Routes } from "@/utils/types/routes";
import Link from "next/link";

const links = [
    {
        href: `${Routes.admin}`,
        label: `Home`
    },
    {
        href: `${Routes.admin}/projects`,
        label: `Projects`
    },
    {
        href: `${Routes.admin}/resumes`,
        label: `Resumes`
    },
    {
        href: `${Routes.admin}/settings`,
        label: `Settings`
    },
]

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <html lang="en">
            <body
                className={`bg-background text-foreground`}
            >
                <ThemeProvider>
                    <div className="grid bg-background min-h-screen md:grid-cols-[200px_1fr]">
                        {/* Header */}
                        <Header />

                        {/* Sidebar */}
                        <nav className="pt-16 fixed -left-50 md:left-0 md:static w-50 h-full transition-all duration-300">
                            <div className="p-4 flex flex-col justify-between gap-4 bg-dark/5 backdrop-blur h-full border-r border-primary/30">
                                <ul className="flex flex-col gap-4 text-foreground">
                                    {links.map((link, idx) => (
                                        <li key={idx}>
                                            <Link
                                                href={link.href}
                                                className="p-3 rounded-lg hover:bg-primary/10 hover:text-primary transition-all duration-300 flex items-center gap-2"
                                            >
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>

                                {/* <Footer /> */}
                            </div>
                        </nav>

                        {/* Main Content */}
                        <main className="grow pt-24 p-8 text-foreground overflow-auto h-screen bg-background">
                            <div className="max-w-4xl mx-auto">
                                {children}
                            </div>
                        </main>
                    </div>
                    {/* {children} */}
                </ThemeProvider>
            </body>
        </html>
    );
};

export default AdminLayout;