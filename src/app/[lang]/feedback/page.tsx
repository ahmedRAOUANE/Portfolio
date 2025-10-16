// import { addFeedback } from "@/actions/feedbacks";
import RatingStars from "@/components/rating-starts";
import { loadTranslation } from "@/utils/data/load-translations";
import { Language } from "@/utils/types/languages";
import Link from "next/link";
import NotFound from "./not-found";

const FeedbackPage = async ({ params }: { params: Promise<{ lang: string }> }) => {
  
  const { lang } = await params;
  const translations = await loadTranslation(lang as Language);
  return <NotFound translations={translations} lang={lang as Language} />;

  return (
    <div className="container mx-auto py-16 px-4 bg-background text-foreground min-h-screen">
      <div className="relative w-full max-w-4xl mx-auto bg-primary/5 border border-primary rounded-xl shadow-lg p-8">
        <Link href={`/${lang}`} className="absolute -top-5 -right-5 shadow-lg text-danger bg-danger/10 hover:bg-danger/20 transition-colors duration-200 rounded-full p-2 w-10 aspect-square flex items-center justify-center">
          X
        </Link>
        
        <div className="mb-4">
          <h1 className="text-2xl font-semibold mb-3">{translations.feedback.title}</h1>
          <p>{translations.feedback.description}</p>
        </div>

        <form 
          // action={addFeedback} 
          className="p-4 space-y-4 border-primary/20 border rounded-lg bg-primary/10">
          <div className="w-full">
            <label htmlFor="name" className="hidden">{translations.feedback.form.name}</label>
            <input
              placeholder={translations.feedback.form.name}
              className="w-full bg-transparent text-foreground focus:outline-none placeholder:text-light/50 border border-primary/50 focus:border-primary/80 px-4 py-2 rounded-lg"
              required
              type="text"
              id="name"
              name="name"
            />
          </div>

          <div className="w-full">
            <label htmlFor="email" className="hidden">{translations.feedback.form.email}</label>
            <input type="email" id="email" name="email"
              className="w-full bg-transparent text-foreground focus:outline-none placeholder:text-light/50 border border-primary/50 focus:border-primary/80 px-4 py-2 rounded-lg"
              placeholder={translations.feedback.form.email}
              required
            />
          </div>

          <div>
            <label htmlFor="message" className="hidden">{translations.feedback.form.message}</label>
            <textarea id="message" name="message" className="w-full bg-transparent text-foreground focus:outline-none placeholder:text-light/50 border border-primary/50 focus:border-primary/80 px-4 py-2 rounded-lg" placeholder={translations.feedback.form.message}></textarea>
          </div>

          <RatingStars translations={translations} />

          <button type="submit" className="mt-4 cursor-pointer bg-primary/10 text-primary rounded-lg px-4 py-2 border border-primary w-full">publish</button>
        </form>
      </div>
    </div>
  );
}

export default FeedbackPage;