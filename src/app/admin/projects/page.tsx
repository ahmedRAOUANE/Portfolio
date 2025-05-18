
import AddProject from "@/components/admin-components/add-project";
import OtherProjects from "@/components/admin-components/other-projects";

const AdminProjectsPage = async () => {
    return (
        <div className="flex flex-col items-center justify-center mt-20 p-4">
            <h1 className="text-4xl-bold mb-6 text-primary">Admin Projects</h1>
            <p className="text-md text-foreground-light mb-8">
                Manage your projects here.
            </p>

            <div className="w-full flex gap-6 ">
                <AddProject />

                <OtherProjects />
            </div>
        </div>
    );
};

export default AdminProjectsPage;