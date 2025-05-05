import React from 'react';

const Contact = () => {
    return (
        <section id='contact' className="contact-section">
            <div className='container p-4 mx-auto max-w-4xl flex gap-4 flex-col lg:flex-row items-start justify-center'>
                <div className='flex-1'>
                    <h2 className="text-3xl mb-4">Get in Touch</h2>
                    
                    <p className="text-sm text-light">
                        I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
                    </p>
                </div>

                <div className='flex-1 p-4 rounded-lg shadow-md w-full'>
                    <form action="" method="POST" className="flex flex-col gap-4">
                        <div className="bg-dark p-2 rounded-lg">
                            <label htmlFor="name" className='hidden'>Name</label>
                            <input type="text" id="name" name="name" required placeholder='Name' />
                        </div>
                        <div className="bg-dark p-2 rounded-lg">
                            <label htmlFor="email" className='hidden'>Email</label>
                            <input type="email" id="email" name="email" required placeholder='Email' />
                        </div>
                        <div className="bg-dark p-2 rounded-lg">
                            <label htmlFor="message" className='hidden'>Message</label>
                            <textarea id="message" name="message" rows={4} required placeholder='Message' className='w-full'></textarea>
                        </div>

                        <button type="submit" className='cursor-pointer bg-[var(--primary)] p-2 rounded-lg'>Send Message</button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Contact; 