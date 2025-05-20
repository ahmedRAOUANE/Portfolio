import { getSingleProject } from "@/actions/projects";
import UpdateProject from "@/components/admin-components/update-project";
import { Project } from "@/utils/types/project";

const AdminUpdateProjectPage = async ({ params }: { params: Promise<{ projectId: string }> }) => {
    const { projectId } = await params;
    const { success, data } = await getSingleProject(projectId)
    const project = (Array.isArray(data) ? data[0] : data) as Project;

    return (
        <div className="flex flex-col items-center justify-center mt-20 p-4">
            <div className="flex flex-col items-center justify-center mb-8">
                <h1 className="text-4xl-bold mb-6 text-primary">Admin Projects</h1>

                <p className="text-md text-foreground-light mb-8">
                    Manage your project here.
                </p> 
            </div>

            <div className="w-full">
                {!success && (
                    <div>
                        <h2>No project found</h2>
                        <p>it seems theres an error fetching the project data or no project found</p>
                    </div>
                )}

                {success && <UpdateProject project={project} />}
            </div>
        </div>
    );
};

export default AdminUpdateProjectPage;