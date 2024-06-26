import { cn } from "@/lib/utils";
import { FooterTabItem } from "./footer-tab-item";

interface FooterTabProps{
    title: string;
    tabElements: { 
        title: string;
        href: string;
    }[];
    className?: string;
};

export const FooterTab = ({ title, tabElements, className } : FooterTabProps) => {
    return (
        <div className={cn("flex flex-col gap-4", className)}>
            <p className="text-indigo-100 font-semibold text-lg">{title}</p>
            <ul className="flex flex-col gap-2">
                { tabElements.map((element, index) => (<FooterTabItem key={index} title={element.title} href={element.href}/>))} 
            </ul>
        </div>
    );
}