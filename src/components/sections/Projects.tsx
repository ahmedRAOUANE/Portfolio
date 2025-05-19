import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getProjects } from '@/actions/projects';
import { Project } from '@/utils/types/project';

const Projects = async () => {
  const { data } = await getProjects()
  const projectList = data as Project[]

  return (
    <section id='projects' className="projects-section py-12 px-4 bg-background text-foreground">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-3xl font-bold mb-8">My Projects</h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 px-4 md:px-0">
          {projectList.map((project, index) => (
            <div key={index} className="card project-card bg-dark overflow-hidden rounded-lg shadow-xl border border-light">
              <Image src={project.image.url} alt={project.name} width={400} height={300} className="rounded-t-lg w-full" />

              <div className="p-2">
                <h3 className="text-xl-semibold mb-2">{project.name}</h3>
                <p className="text-sm-light mb-4">{project.description}</p>
                
                <Link href={project.project_link} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">View Project</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects; 