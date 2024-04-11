import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { SidebarItem } from "./sidebar-item";
import { ClerkLoaded, ClerkLoading, UserButton } from "@clerk/nextjs";
import { Skeleton } from "./ui/skeleton";

interface SidebarProps {
    className?: string;
};

export const Sidebar = ({ className } : SidebarProps) => {
    return (
        <div className={cn("h-full lg:w-[256px] lg:fixed flex left-0 top-0 px-4 lg:border-r-2 flex-col", className)}>
            <Link href={'/learn'}>
                <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3">
                    <Image src={'/vocavue_pictorial_logo.svg'} height={40} width={40} alt="Vocavue Mascot"/>
                    <span className="text-xl font-extrabold text-indigo-600 tracking-wide">Vocavue</span>
                </div>
            </Link>
            <div className="flex flex-col gap-y-2 flex-1">
                <SidebarItem label="Learn" href="/learn" iconSrc="/icons/learn2.svg"/>
                <SidebarItem label="Leaderboard" href="/leaderboard" iconSrc="/icons/leaderboard2.svg"/>
                <SidebarItem label="Quests" href="/quests" iconSrc="/icons/quests.svg"/>
                <SidebarItem label="Shop" href="/shop" iconSrc="/icons/shop.svg"/>
            </div>
            <div className="p-4">
                <ClerkLoading>
                    <Skeleton className="h-10 w-10 text-muted-foreground rounded-md"/>
                </ClerkLoading>
                <ClerkLoaded>
                    <UserButton afterSignOutUrl="/"/>
                </ClerkLoaded>
            </div>
        </div>
    )
}