import { getResumes } from "@/actions/resumes";
import { Roles } from "@/utils/types/roles";
import Link from "next/link"
import { useLayoutEffect, useState } from "react";

const ResumeLink = ({translations}: {translations: string}) => {
    const fallbackLink = "https://zwwezzcdnksqfwabneed.supabase.co/storage/v1/object/public/projects/resume/ahmed-cv-v1.6.pdf";
    const [lastResume, setLastResume] = useState(fallbackLink);

    useLayoutEffect(() => {
        async function fetchResume() {
            const resume = await getResumes(Roles.anone, undefined, 1);
            setLastResume(resume?.[0].link ?? fallbackLink)
        }
        
        fetchResume();
    })

    // const resumes = use(resumePromise);
    // const lastResume = resumes?.[0];
    
    return (
        <Link
            target="_blank"
            href={lastResume} 
            className="w-full justify-start px-4 py-2 bg-primary/10 hover:bg-primary/20 text-foreground rounded-lg"
        >
            {translations}
        </Link>
    )
}

export default ResumeLink