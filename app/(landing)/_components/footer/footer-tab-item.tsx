
interface FooterTabItemProps{
    title: string;
    href: string;
};

export const FooterTabItem = ({ title, href } : FooterTabItemProps) => {
    return (
        <li>
            <a href={href} className="text-indigo-200 text-sm font-medium">{title}</a>
        </li>
    )
}