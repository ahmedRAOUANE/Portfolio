import { Translations } from "@/utils/types/translations";
import { headerLinks } from "./utils";
import Link from "next/link";

const NavLinks = ({ className, id, translations }: {
    className?: string,
    id?: string,
    translations: Translations['header']
}) => {
    return (
        <nav>
            <ul id={id} className={className}>
                {headerLinks.map((link) => (
                    <li key={link.href}>
                        <Link
                            href={link.href}
                            className='cursor-pointer text-foreground hover:text-primary transition-colors duration-300 font-medium flex items-center gap-2'
                        >
                            <span className="inline-block text-xl">{link.icon}</span>
                            <span className='cursor-pointer hidden md:block'>{translations.nav[link.label]}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default NavLinks;