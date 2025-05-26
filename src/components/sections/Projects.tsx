"use client";

import React, { useEffect, useState, useTransition } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Project } from '@/utils/types/project';
import { baseUrl } from '@/utils/constansts';

const Projects = () => {
  const [projectList, setProjectList] = useState<Project[]>([]);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const fetchProjects = async () => {
      startTransition(async () => {
        const res = await fetch(`${baseUrl}/api/projects?is_active=true`);
        const { data }: { data: Project[] } = await res.json();
        setProjectList(data);
      });
    };
    fetchProjects();
  }, []);

  return (
    <section id='projects' className="projects-section py-12 px-4 bg-background text-foreground">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-3xl font-bold mb-8 text-primary">My Projects</h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 px-4 md:px-0">
          {projectList.length === 0 ? (
            <>
              {isPending ? (
                <ProjectFallback />
              ) : (
                  <p className="text-lg text-light">No projects available.</p>
              )}
            </>
          ) : (
            <>
              {
                projectList.map((project, index) => (
                  <div key={index} className="card project-card bg-dark/50 overflow-hidden rounded-lg shadow-xl border border-primary/20 hover:border-primary/40 transition-colors">
                    <Image src={project.image.url} alt={project.name} width={400} height={300} className="rounded-t-lg h-48 w-full object-cover" />

                    <div className="p-4">
                      <h3 className="text-xl font-semibold mb-2 text-foreground">{project.name}</h3>
                      <p className="text-sm text-light mb-4">{project.description}</p>

                      <div className='flex gap-2'>
                        <Link
                          href={project.project_link}
                          target='_blank' className='text-primary hover:underline'
                          title="View Project in a new tab"
                        >View Project</Link>
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

const ProjectFallback = () => {
  return (
    <div className="card project-card bg-dark overflow-hidden rounded-lg shadow-xl border border-light">
      {/* <Image src="/placeholder.jpg" alt="Placeholder" width={400} height={300} className="rounded-t-lg w-full" /> */}
      <div className='bg-gray-200 h-48 w-full animate-pulse'></div>

      <div className="p-2">
        <h3 className="text-xl-semibold mb-2 animate-pulse bg-gray-200 p-3 rounded-xl"></h3>
        <p className="text-sm-light mb-4 animate-pulse bg-gray-200 p-2 rounded-xl w-1/2"></p>

        <Link
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline animate-pulse"
          onClick={(e) => e.preventDefault()}
        >View Project</Link>
      </div>
    </div>
  )
}

export default Projects; 