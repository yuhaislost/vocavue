import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Hero } from "./_components/hero";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-flags";

export default function Home() {
    return (
        <div className="relative lg:max-w-screen-lg flex flex-col h-full my-28 antialiased items-center justify-center overflow-x-hidden gap-28">
            <Hero/> 
            <InfiniteMovingCards items={testimonials} direction="right" speed="slow"  className="w-screen"/>
        </div>
    );
}

const testimonials = [
    {
        image: '/flags/CN.svg',
        label: 'Chinese',
    },
    {
        image: '/flags/ES.svg',
        label: 'Spanish',
    },
    {
        image: '/flags/FR.svg',
        label: 'French',
    },
    {
        image: '/flags/JP.svg',
        label: 'Japanese',
    },
    {
        image: '/flags/KR.svg',
        label: 'Korean',
    }
];