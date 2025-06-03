"use client";

import { useRef, useTransition } from "react";
import ActionBtn from "./action-btn"
import { Translations } from "@/utils/types/translations";

const SendEmailForm = ({ sectionTranslations }: { sectionTranslations: Translations['contact'] }) => {
    const nameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const messageRef = useRef<HTMLTextAreaElement>(null);

    const [pending, startTransition] = useTransition();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const name = nameRef.current?.value;
        const email = emailRef.current?.value;
        const message = messageRef.current?.value;

        if (!name || !email || !message) {
            alert(sectionTranslations.form.sendRequire);
            return;
        }

        try {
            startTransition(async () => {
                const response = await fetch('/api/mail', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ name, email, message }),
                });

                if (!response.ok) {
                    console.error("Failed to send email:", response.statusText);
                    alert(sectionTranslations.form.sendError);
                    return;
                }

                alert(sectionTranslations.form.sendSuccess);
            });
        } catch (error) {
            console.error("Error sending email:", error);
        }

        // Reset form fields after submission
        if (nameRef.current) nameRef.current.value = "";
        if (emailRef.current) emailRef.current.value = "";
        if (messageRef.current) messageRef.current.value = "";
    };

    return (
        <div className='flex-1 p-6 rounded-2xl shadow-lg w-full bg-dark/5 border border-primary/30 hover:bg-dark/10 transition-all duration-300'>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <div className="bg-primary/5 p-3 rounded-lg border border-primary/30 focus-within:border-primary/50 transition-all duration-300">
                    <label htmlFor="name" className='hidden'>{sectionTranslations.form.name.toUpperCase()}</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        placeholder={sectionTranslations.form.name}
                        className="w-full bg-transparent text-foreground focus:outline-none placeholder:text-light/50"
                        ref={nameRef}
                    />
                </div>

                <div className="bg-primary/5 p-3 rounded-lg border border-primary/30 focus-within:border-primary/50 transition-all duration-300">
                    <label htmlFor="email" className='hidden'>{sectionTranslations.form.email.toUpperCase()}</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        placeholder={sectionTranslations.form.email}
                        className="w-full bg-transparent text-foreground focus:outline-none placeholder:text-light/50"
                        ref={emailRef}
                    />
                </div>

                <div className="bg-primary/5 p-3 rounded-lg border border-primary/30 focus-within:border-primary/50 transition-all duration-300">
                    <label htmlFor="message" className='hidden'>{sectionTranslations.form.message.toUpperCase()}</label>
                    <textarea
                        id="message"
                        name="message"
                        rows={4}
                        required
                        placeholder={sectionTranslations.form.message}
                        className='w-full bg-transparent text-foreground focus:outline-none placeholder:text-light/50'
                        ref={messageRef}
                    ></textarea>
                </div>

                <ActionBtn
                    pending={pending}
                    type="submit"
                    className='bg-primary/30 hover:bg-primary/40 text-foreground p-2 rounded-lg transition-all duration-300'
                    action={{ state1: sectionTranslations.form.submit, state2: sectionTranslations.form.submitting }}
                    title={sectionTranslations.form.submit}
                />
            </form>
        </div>
    )
}

export default SendEmailForm