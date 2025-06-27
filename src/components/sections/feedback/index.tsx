import { selectFrom } from "@/utils/data/data-cruds";
import { Roles } from "@/utils/types/roles";
import { Translations } from "@/utils/types/translations";
import Link from "next/link";

interface Feedback {
  id?: number;
  username: string;
  email: string;
  rating: string;
  message: string;
  date?: string;
}

const Feedback = async ({ translations }: { translations: Translations }) => {
  const { data: feedbacks } = await selectFrom<Feedback[]>("feedback", "*", Roles.anone, undefined, 3) || { data: [] };

  return (
    <section id='feedback' className="projects-section mt-16 py-12 px-4 bg-background text-foreground">
      <div className="container mx-auto max-w-4xl relative">
        <h2 className="text-3xl font-bold mb-8 text-primary">{translations.feedback.title}</h2>

        <div className="w-full overflow-x-auto">
          <div className="flex flex-nowrap gap-4">
            {feedbacks && (feedbacks as Feedback[]).length > 0 ? (
              (feedbacks as Feedback[]).map((f: Feedback, index: number) => (
                <div
                  key={index}
                  className="card feedback-card min-w-[300px] w-1/3 flex flex-col gap-4 p-4 bg-primary/20 overflow-hidden rounded-lg shadow-xl border border-primary/20 hover:border-primary/40 transition-colors"
                >
                  <div className="flex flex-col justify-start">
                    <h3 className="text-xl font-semibold text-foreground">
                      {f.username ? f.username : f.email}
                    </h3>
                    {f.username && (
                      <p className="text-xs text-light mb-2">{f.email}</p>
                    )}
                  </div>
                  <p className="text-sm text-light flex-1">{f.message}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {Array.from({ length: parseInt(f.rating) || 0 }).map((_, i) => (
                        <svg
                          key={i}
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-warning"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M10 15l-5.878 3.09 1.121-6.528L1 7.545l6.545-.954L10 1l2.455 5.591L19 7.545l-4.243 3.017 1.121 6.528z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-xs text-light">{f.date}</span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-light">{translations.feedback.noFeedbackAvailable}</p>
            )}
          </div>
        </div>

        <div className="w-full mt-8 flex justify-center">
          <Link href="/feedback" className="px-4 py-2 rounded-full border border-primary text-primary">{translations.feedback.leaveFeedback}</Link>
        </div>
      </div>
    </section>
  );
}

export default Feedback;