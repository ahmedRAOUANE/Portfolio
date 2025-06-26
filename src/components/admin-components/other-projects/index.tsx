import Link from "next/link";
import Image from "next/image";
import { selectFrom } from "@/utils/data/data-cruds";
import { Roles } from "@/utils/types/roles";
import { Project } from "@/utils/types/project";

const OtherProjects = async () => {
    const {data: otherProjects} = await selectFrom<Project[]>("projects", "*", Roles.admin);
    // const [otherProjects, setOtherProjects] = useState<Project[]>([]);
    // const [isLoading, setIsLoading] = useState(true);

    // const fetchProjects = async () => {
    //     try {
    //         setIsLoading(true);
    //         const res = await fetch(`${baseUrl}/api/projects`);
    //         const { data }: { data: Project[] } = await res.json();
    //         setOtherProjects(data);
    //     } catch (error) {
    //         console.error('Failed to fetch projects:', error);
    //     } finally {
    //         setIsLoading(false);
    //     }
    // };

    // useEffect(() => {
    //     fetchProjects();
    // }, []);

    return (
        <div className="w-full">
            <h2 className="text-2xl font-bold mb-6 text-primary">Other Projects</h2>

            <div className="flex flex-col gap-4">
                {!otherProjects || otherProjects.length === 0 ? (
                    <div className="bg-primary/5 p-6 rounded-lg border border-primary/30 text-center">
                        <p className="text-light">No projects available.</p>
                    </div>
                ) : (
                    (otherProjects as Project[]).map((project) => {
                        const projectId = project.id?.toString();
                        if (!projectId) return null;

                        return (
                            <div
                                key={projectId}
                                className="group flex items-center gap-4 p-4 bg-primary/5 rounded-lg border border-primary/30 hover:bg-primary/10 transition-all duration-300"
                            >
                                {project.image && (
                                    <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                                        <Image
                                            src={project.image.url}
                                            alt={project.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                )}

                                <div className="flex-grow">
                                    <Link
                                        href={`/admin/projects/${projectId}`}
                                        className="text-lg font-semibold text-primary hover:text-primary/80 transition-colors duration-300"
                                    >
                                        {project.name}
                                    </Link>
                                    <p className="text-sm text-light line-clamp-2">
                                        {project.description}
                                    </p>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    )
}

export default OtherProjects;