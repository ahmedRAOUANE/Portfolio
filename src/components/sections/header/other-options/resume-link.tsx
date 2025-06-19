import Link from "next/link"

const ResumeLink = ({translations}: {translations: string}) => {
    // TODO: featch the latest resume from resumes table
    // TODO: add version controle logic
    return (
        <Link
            target="_blank"
            href={"https://zwwezzcdnksqfwabneed.supabase.co/storage/v1/object/public/projects/resume/ahmed-cv-v1.6.pdf"} // this will be changed to the real resume url 
            className="w-full justify-start px-4 py-2 bg-primary/10 hover:bg-primary/20 text-foreground rounded-lg"
        >
            {translations}
        </Link>
    )
}

export default ResumeLink