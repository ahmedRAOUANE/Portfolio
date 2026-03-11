
import { getResumes } from "@/actions/resumes";
import { FaFile } from "react-icons/fa";

const OtherResumes = async () => {
    const resumes = await getResumes();

    return (
        <div className="w-full">
            <h2 className="text-2xl font-bold mb-6 text-primary">Other ResOtherResumes</h2>

            <div className="flex flex-col gap-4">
                {!resumes || resumes.length === 0 ? (
                    <div className="bg-primary/5 p-6 rounded-lg border border-primary/30 text-center">
                        <p className="text-light">No resumes available.</p>
                    </div>
                ) : (
                    resumes.map((resume) => {
                        const resumeId = resume.createdAt;
                        if (!resumeId) return null;

                        return (
                            <div
                                key={resumeId}
                                className="group flex items-center gap-4 p-4 bg-primary/5 rounded-lg border border-primary/30 hover:bg-primary/10 transition-all duration-300"
                            >
                                <FaFile className="text-5xl" />

                                <div className="grow">
                                    <h3 className="text-bold text-2xl">
                                        {resume.resumeName}
                                    </h3>
                                    <div className="flex justify-between">
                                        <p className="text-sm text-light line-clamp-2">
                                            {resume.description}
                                        </p>
                                        <p className="text-sm text-light line-clamp-2">
                                            {resume.createdAt} 
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    )
}

export default OtherResumes;