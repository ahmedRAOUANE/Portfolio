"use client";

interface BtnProps {
    pending?: boolean;
    action?: { state1: string, state2?: string };
    className?: string;
    onclick?: () => void;
    type?: 'button' | 'submit' | 'reset';
    title?: string;
    children?: React.ReactNode
}

const ActionBtn = ({ pending, action, className, onclick, type = "button", title, children }: BtnProps) => {
    return (
        <button
            type={type}
            className={`flex items-center justify-center gap-2 p-2 rounded-lg ${pending ? "opacity-50 cursor-not-allowed" : "cursor-pointer"} ${className}`}
            disabled={pending}
            onClick={onclick}
            title={title}
        >
            {children ? (
                children
            ) : (
                <>
                    {pending ? (
                        <>
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            {action?.state2 && (<span>{action?.state2}</span>)}
                        </>
                    ) : (
                        action?.state1
                    )}
                </>
            )}
        </button>
    )
}

export default ActionBtn