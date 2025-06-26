import { Translations } from "@/utils/types/translations";
import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const socialLinks = [
    {
        href: "https://github.com/ahmedRAOUANE",
        icon: <FaGithub />,
        title: (sectionTranslations: Translations["footer"]) => sectionTranslations.links.github
    },
    {
        href: "https://linkedin.com/in/ahmed-raouane",
        icon: <FaLinkedin />,
        title: (sectionTranslations: Translations["footer"]) => sectionTranslations.links.linkedin
    },
    {
        href: "https://x.com/RaouaneAhm93432",
        icon: <FaXTwitter />,
        title: (sectionTranslations: Translations["footer"]) => sectionTranslations.links.twitter
    }
]

const SocialLinks = ({translations, className}: {translations: Translations['footer'], className?: string}) => {
    return (
        <div className={className}>
            {socialLinks.map((link) => (
                <Link
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary/80 transition-all duration-300"
                    title={link.title(translations)}
                >
                    {link.icon}
                </Link>
            ))}
        </div>
    )
}

export default SocialLinks;