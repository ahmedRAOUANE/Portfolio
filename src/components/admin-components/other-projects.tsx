import { getProjects } from "@/actions/projects";
import { Project } from "@/utils/types/project";
import Link from "next/link";

const OtherProjects = async () => {
    const { success, data } = await getProjects();
    const otherProjects: Project[] = Array.isArray(data) ? data : [];

    return (
        <div className="w-full rounded-lg shadow-md" >
            <h2 className="text-2xl font-bold mb-4" > Other Projects </h2>

            < div className="flex flex-col gap-4 mt-4" >
                {(!success || !otherProjects || otherProjects.length === 0) && (
                    <p className="text-md text-foreground-light" >
                        No projects available.
                    </p>
                )}

                {
                    otherProjects.map((project) => (
                        <div
                            key={project.id}
                            className="flex items-center justify-between p-4 bg-dark rounded-lg shadow-md"
                        >
                            <div className="flex flex-col" >
                                <Link
                                    href={`/admin/projects/${project.id}`}
                                    className="text-lg font-bold text-primary"
                                >
                                    {project.name}
                                </Link>
                                < p className="text-sm text-foreground-light" >
                                    Description of the project.
                                </p>
                            </div>
                            < button className="text-red-500 hover:text-red-700" >
                                Delete
                            </button>
                        </div>
                    ))}
            </div>
        </div>
    )
}

export default OtherProjects