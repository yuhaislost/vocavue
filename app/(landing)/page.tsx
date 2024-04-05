import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Hero } from "./_components/hero";

export default function Home() {
    return (
        <div className="lg:max-w-screen-lg mx-auto flex flex-col h-full mt-[calc(20vh)]">
            <Hero/>
        </div>
    );
}
