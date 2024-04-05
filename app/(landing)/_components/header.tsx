'use client';

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useScrollTop } from "@/hooks/use-scroll-top";
import { cn } from "@/lib/utils";
import { ClerkLoaded, SignedOut, SignInButton } from "@clerk/clerk-react";
import { ClerkLoading, SignedIn, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

export const Header = () => {
    const scrolled = useScrollTop();

    return (
        <header className={cn("h-20 w-full px-4 py-2 border-b-2 border-transparent bg-white transition duration-500 fixed top-0 m-0 z-[100]", scrolled && ('fixed top-0 border-b-2 border-slate-200'))}>
            <div className="lg:max-w-screen-lg mx-auto flex items-center justify-between h-full">
                <Link href={'/'}>
                    <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3">
                        <Image src={'/vocavue_pictorial_logo.svg'} height={40} width={40} alt="Vocavue Mascot"/>
                        <span className="text-xl font-extrabold text-indigo-600 tracking-wide">Vocavue</span>
                    </div>
                </Link>
                <ClerkLoading>
                    <div className="h-12 w-[30%] md:w-[20%] rounded-none">
                        <Skeleton className="h-full w-full text-muted-foreground rounded-sm"/>
                    </div>
                </ClerkLoading>
                <ClerkLoaded>
                    <SignedIn>
                        <UserButton afterSignOutUrl="/"/>
                    </SignedIn>
                    <SignedOut>
                        <SignInButton mode="modal" afterSignInUrl="/learn" afterSignUpUrl="/learn">
                            <Button size={'lg'} variant={'secondary'} className="transition duration-500">Get Started</Button>
                        </SignInButton>
                    </SignedOut>
                </ClerkLoaded>

            </div>
        </header>
    );
}