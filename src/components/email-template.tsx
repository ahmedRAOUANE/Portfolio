interface EmailTemplateProps {
    name: string, 
    message: string,
}

const EmailTemplate = ({ name, message }: EmailTemplateProps) => {
    return (
        <div>
            <h1>message from {name}</h1>

            <p>{message}</p>
        </div>
    );
}

export default EmailTemplate;