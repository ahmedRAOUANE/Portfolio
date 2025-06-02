import React from 'react';
import SendEmailForm from '../send-email-form';

const Contact = () => {
    return (
        <section id='contact' className="contact-section py-12 bg-background text-foreground">
            <div className='container p-4 mx-auto max-w-4xl flex gap-4 flex-col lg:flex-row items-start justify-center'>
                <div className='flex-1'>
                    <h2 className="text-3xl mb-4 text-primary font-bold">Get in Touch</h2>
                    
                    <p className="text-sm text-light p-6 bg-primary/5 rounded-2xl border border-primary/30 hover:bg-primary/10 transition-all duration-300">
                        I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
                    </p>
                </div>

                {/* Contact Form */}
                <SendEmailForm />
            </div>
        </section>
    );
};

export default Contact; 