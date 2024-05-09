import { cn } from "@/lib/utils";
import Image from "next/image";

interface ResultCardProps {
    variant: "points" | "hearts";
    value: number;
};

export const ResultCard = ({ variant, value } : ResultCardProps) => 
{
    const iconSrc = variant === "hearts" ? "/icons/heart.svg" : "/icons/point.svg";

    return (
        <div className={cn("rounded-2xl border-[3px] w-full", variant === "points" && "bg-orange-400 border-orange-400", variant === "hearts" && "bg-rose-500 border-rose-500")}>
            <div className={cn("p-1.5 text-white rounded-t-xl font-bold text-center uppercase text-xs", variant === "points" && "bg-orange-400", variant === "hearts" && "bg-rose-500")}>
                { variant === 'hearts' ? "Hearts Left" : "Total XP Gained"}
            </div>
            <div className={cn("rounded-2xl bg-white items-center flex justify-center p-6 font-bold text-lg", variant === "hearts" && "text-rose-500", variant === "points" && "text-orange-400")}>
                <Image src={iconSrc} alt="points" height={30} width={30} className="mr-1.5"/>
                { value }
            </div>
        </div>
    );
}