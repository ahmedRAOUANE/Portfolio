import Image from 'next/image';
import React from 'react';

const About = () => {
    return (
        <section className=" pb-12 px-4 bg-background text-foreground">
            <div className="container mx-auto max-w-4xl">
                <div className="flex items-center gap-4 my-6 p-6 bg-primary/5 rounded-2xl border border-primary/30 hover:bg-primary/10 transition-all duration-300">
                    <div className="bg-primary/30 hover:bg-primary/40 rounded-full flex items-center justify-center transition-all duration-300">
                        {/* //! The Image display have an issue */}
                        <Image
                            src="/logo.svg"
                            alt="Logo"
                            width={40}
                            height={40}
                            className='w-10 h-10 rounded-full'
                            priority
                            unoptimized
                        />
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold text-foreground">Ahmed RAOUANE</h3>
                        <p className="text-primary font-medium">Front end Web Developer</p>
                    </div>
                </div>

                <div className='text-light space-y-4 p-6 bg-dark/5 rounded-2xl border border-primary/30 hover:bg-dark/10 transition-all duration-300'>
                    <p>I am a passionate developer with a love for creating dynamic and responsive web applications. With a background in computer science and a keen eye for design, I strive to build applications that are not only functional but also aesthetically pleasing.</p>
                    <p>My skills include JavaScript, React, Next.js, and Tailwind CSS, among others. I enjoy learning new technologies and continuously improving my skills.</p>
                    <p>In my free time, I love exploring new places, reading tech blogs, and contributing to open-source projects.</p>
                </div>
            </div>
        </section>
    );
};

export default About; 