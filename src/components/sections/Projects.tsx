import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Projects = () => {
  const projectList = [
    {
      title: 'Project One',
      description: 'A brief description of Project One, highlighting its features and technologies used.',
      image: '/project1.jpg',
      link: 'https://example.com/project-one',
    },
    {
      title: 'Project Two',
      description: 'A brief description of Project Two, highlighting its features and technologies used.',
      image: '/project2.jpg',
      link: 'https://example.com/project-two',
    },
    // Add more projects as needed
  ];

  return (
    <section id='projects' className="projects-section py-12 px-4 bg-background text-foreground">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-3xl font-bold mb-8">My Projects</h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 px-4 md:px-0">
          {projectList.map((project, index) => (
            <div key={index} className="card project-card bg-dark overflow-hidden rounded-lg shadow-xl border border-light">
              <Image src={project.image} alt={project.title} width={400} height={300} className="rounded-t-lg" />

              <div className="p-2">
                <h3 className="text-xl-semibold mb-2">{project.title}</h3>
                <p className="text-sm-light mb-4">{project.description}</p>
                
                <Link href={project.link} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">View Project</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects; 