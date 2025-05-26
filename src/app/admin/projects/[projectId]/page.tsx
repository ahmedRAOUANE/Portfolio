import { getSingleProject } from "@/actions/projects";
import UpdateProject from "@/components/admin-components/update-project";
import { Project } from "@/utils/types/project";

const AdminUpdateProjectPage = async ({ params }: { params: Promise<{ projectId: string }> }) => {
    const { projectId } = await params;
    const { success, data } = await getSingleProject(projectId)
    const project = (Array.isArray(data) ? data[0] : data) as Project;

    return (
        <div className="flex flex-col gap-8">
            <div className="bg-primary/5 text-center p-6 rounded-2xl border border-primary/30">
                <h1 className="text-3xl font-bold text-primary mb-4">Admin Projects</h1>

                <p className="text-light">
                    Manage your projects here. Add new projects or modify existing ones.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {!success && (
                    <div>
                        <h2>No project found</h2>
                        <p>it seems theres an error fetching the project data or no project found</p>
                    </div>
                )}

                {success && (
                    <div className="bg-dark/5 p-6 rounded-2xl border border-primary/30 transition-all duration-300">
                        <UpdateProject project={project} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminUpdateProjectPage;