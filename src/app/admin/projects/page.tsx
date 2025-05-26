import AddProject from "@/components/admin-components/add-project";
import OtherProjects from "@/components/admin-components/other-projects";

const AdminProjectsPage = async () => {
    return (
        <div className="flex flex-col gap-8">
            <div className="bg-primary/5 text-center p-6 rounded-2xl border border-primary/30">
                <h1 className="text-3xl font-bold text-primary mb-4">Admin Projects</h1>
                <p className="text-light">
                    Manage your projects here. Add new projects or modify existing ones.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-dark/5 p-6 rounded-2xl border border-primary/30 transition-all duration-300">
                    <AddProject />
                </div>

                <div className="bg-dark/5 p-6 rounded-2xl border border-primary/30 transition-all duration-300">
                    <OtherProjects />
                </div>
            </div>
        </div>
    );
};

export default AdminProjectsPage;