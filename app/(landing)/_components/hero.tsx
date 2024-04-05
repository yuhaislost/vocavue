'use client';

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton"
import { SignedIn, SignedOut, SignInButton} from "@clerk/clerk-react"
import { ClerkLoaded, ClerkLoading } from "@clerk/nextjs"
import Link from "next/link";

export const Hero = () => {
    return (
        <div className="flex flex-col text-center gap-5">
            <div className="flex gap-5 flex-col items-center">
                <div>
                    <p className="border-2 m-0 inline-flex py-2 px-4 uppercase text-indigo-600 font-bold text-sm rounded-xl border-indigo-300">Achieve Language Mastery</p>
                </div>
                <h1 className="text-4xl font-extrabold">Interactive Language Learning Platform For<br/>The <span className="bg-gradient-to-r from-indigo-700 to-indigo-500 inline-block text-transparent bg-clip-text">Future of Education</span></h1>
                <p className="max-w-[55ch] text-center">
                    Unlock your language potential with Vocavue, the free, fun, and effective way to learn a language
                </p>
            </div>
            <div className="flex flex-col gap-5 items-center justify-center">
                <ClerkLoading>
                    <Skeleton className="h-12 w-[40%]"/>
                </ClerkLoading>
                <ClerkLoaded>
                    <SignedOut>
                        <SignInButton mode="modal" afterSignInUrl="/learn" afterSignUpUrl="/learn">
                            <Button variant={'secondary'} size={'lg'}>Let&apos;s reach your potential</Button>
                        </SignInButton>
                    </SignedOut>
                    <SignedIn>
                        <Button size={'lg'} asChild variant={'secondary'}>
                            <Link href={'/learn'}>
                                Continue Learning
                            </Link>
                        </Button>
                    </SignedIn>
                </ClerkLoaded>
            </div>
        </div>
    )
}


