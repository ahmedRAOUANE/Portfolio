"use server";

type ResumeType = {
    resumeName: string;
    description: string;
    link: string;
    isActive: boolean;
    createdAt: string;
}
export const getResumes = async (): Promise<ResumeType[]> => {
    console.log("get resumes server action trigered");
    return [{
        resumeName: "resume",
        description: "resume",
        link: "link to resume",
        isActive: false,
        createdAt: "21/3/26"
    }]
}