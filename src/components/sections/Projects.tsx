import Image from 'next/image';
import Link from 'next/link';
import { Translations } from '@/utils/types/translations';
import { selectFrom } from '@/utils/data/data-cruds';
import { Project } from '@/utils/types/project';

const Projects = async ({ translations }: { translations: Translations }) => {
  const { data: projectList } = await selectFrom<Project[]>('projects', '*', 'anone', { column: 'is_active', value: true }, 4) || { data: [] };
  const sectionTranslations = translations.myProjects;

  return (
    <section id='projects' className="projects-section mt-16 py-12 px-4 bg-background text-foreground">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-3xl font-bold mb-8 text-primary">{sectionTranslations.title}</h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 px-4 md:px-0">
          {(projectList as Project[]).length === 0 ? (
            <>
              <ProjectNotFound translations={sectionTranslations} />
            </>
          ) : (
            <>
              {
                (projectList as Project[]).map((project, index) => (
                  <div key={index} className="card project-card bg-dark/50 overflow-hidden rounded-lg shadow-xl border border-primary/20 hover:border-primary/40 transition-colors">
                    <Image src={project.image.url} alt={project.name} width={400} height={300} className="rounded-t-lg h-48 w-full object-cover" />

                    <div className="p-4">
                      <h3 className="text-xl font-semibold mb-2 text-foreground">{project.name}</h3>
                      <p className="text-sm text-light mb-4">{project.description}</p>

                      <div className='flex gap-2'>
                        <Link
                          href={project.project_link}
                          target='_blank' className='text-primary hover:underline'
                          title={sectionTranslations.viewProject}
                        >{sectionTranslations.viewProject}</Link>
                        {/* <Link
                          href={`/details/${project.id}`}
                          className='text-secondary hover:underline'
                          title="View Project Details"
                        >Details</Link> */}
                      </div>
                    </div>
                  </div>
                ))
              }
            </>
          )}
        </div>
      </div>
    </section>
  );
};

const ProjectNotFound = ({ translations }: { translations: Translations['myProjects'] }) => {
  return (
    <div className="col-span-full flex flex-col items-center justify-center p-8 bg-dark/20 rounded-lg border border-primary/20">
      <div className="w-16 h-16 mb-4 rounded-full bg-primary/20 flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>

      <h3 className="text-xl font-semibold text-foreground mb-2">{translations.notFound.title}</h3>
      <p className="text-light text-center max-w-md">
        {translations.notFound.description}
      </p>
    </div>
  )
}

export default Projects; 