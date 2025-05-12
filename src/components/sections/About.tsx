import Image from 'next/image';
import React from 'react';

const About = () => {
    return (
        <section className="py-12 px-4 bg-background text-foreground">
            <div className="container mx-auto max-w-4xl">
                <div className="flex items-center gap-4 my-6">
                    <div className="bg-primary rounded-full flex items-center justify-center">
                        <Image src="/logo.svg" alt="Logo" width={32} height={32} className='w-10 h-10 rounded-full' />
                    </div>

                    <div>
                        <h3 className="text-xl-semibold-foreground">Ahmed RAOUANE</h3>
                        <p className="text-primary-sm">Front end Web Developer</p>
                    </div>
                </div>

                <div className='text-light'>
                    <p className="mb-4">I am a passionate developer with a love for creating dynamic and responsive web applications. With a background in computer science and a keen eye for design, I strive to build applications that are not only functional but also aesthetically pleasing.</p>
                    <p className="mb-4">My skills include JavaScript, React, Next.js, and Tailwind CSS, among others. I enjoy learning new technologies and continuously improving my skills.</p>
                    <p className="mb-4">In my free time, I love exploring new places, reading tech blogs, and contributing to open-source projects.</p>
                </div>
            </div>
        </section>
    );
};

export default About; 