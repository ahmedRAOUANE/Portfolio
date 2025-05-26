import { isFeatureEnabled } from '@/utils/featureflags-service';
import React from 'react';
import ActionBtn from '../action-btn';

const Contact = () => {
    const isEnabled = isFeatureEnabled("contact-form");
    if (!isEnabled) {
        return null;
    }

    return (
        <section id='contact' className="contact-section py-12 px-4 bg-background text-foreground">
            <div className='container p-4 mx-auto max-w-4xl flex gap-4 flex-col lg:flex-row items-start justify-center'>
                <div className='flex-1 p-6 bg-primary/5 rounded-2xl border border-primary/30 hover:bg-primary/10 transition-all duration-300'>
                    <h2 className="text-3xl mb-4 text-primary font-bold">Get in Touch</h2>
                    
                    <p className="text-sm text-light">
                        I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
                    </p>
                </div>

                {/* Contact Form */}
                <div className='flex-1 p-6 rounded-2xl shadow-lg w-full bg-dark/5 border border-primary/30 hover:bg-dark/10 transition-all duration-300'>
                    <form action="" method="POST" className="flex flex-col gap-4">
                        <div className="bg-primary/5 p-3 rounded-lg border border-primary/30 focus-within:border-primary/50 transition-all duration-300">
                            <label htmlFor="name" className='hidden'>Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                required
                                placeholder='Name'
                                className="w-full bg-transparent text-foreground focus:outline-none placeholder:text-light/50"
                            />
                        </div>

                        <div className="bg-primary/5 p-3 rounded-lg border border-primary/30 focus-within:border-primary/50 transition-all duration-300">
                            <label htmlFor="email" className='hidden'>Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                required
                                placeholder='Email'
                                className="w-full bg-transparent text-foreground focus:outline-none placeholder:text-light/50"
                            />
                        </div>

                        <div className="bg-primary/5 p-3 rounded-lg border border-primary/30 focus-within:border-primary/50 transition-all duration-300">
                            <label htmlFor="message" className='hidden'>Message</label>
                            <textarea
                                id="message"
                                name="message"
                                rows={4}
                                required
                                placeholder='Message'
                                className='w-full bg-transparent text-foreground focus:outline-none placeholder:text-light/50'
                            ></textarea>
                        </div>

                        <ActionBtn
                            type="submit"
                            className='bg-primary/30 hover:bg-primary/40 text-foreground p-2 rounded-lg transition-all duration-300'
                            action={{ state1: "Send Message", state2: "Sending..." }}
                            title="Send Message"
                        />
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Contact; 