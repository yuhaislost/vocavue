"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import { QUESTS } from "@/constants";
import { Progress } from "./ui/progress";

interface QuestsProps {
    points: number;
};

export const Quests = ({ points } : QuestsProps) => {

    function getCurrentQuest(threshold: number) {
        for (let i=0; i < QUESTS.length; i++)
        {
            if (QUESTS[i].value > threshold)
            {
                return QUESTS[i];
            }
        }
    }

    const currentQuest = getCurrentQuest

    return (
        <div className="border-2 rounded-xl p-4 space-y-4">
            <div className="flex items-center justify-between w-full space-y-2">
                <h3 className="font-bold text-lg">
                    Current Quest
                </h3>
                <Link href={'/quests'}>
                    <Button variant={'primaryOutline'} size={'sm'}>
                        View all
                    </Button>
                </Link>
            </div>
            <ul className="w-full space-y-4">
                { !!currentQuest ? (
                    <div className="flex items-center w-full p-2 gap-x-4">
                        <Image src={'/icons/point.svg'} alt="Point" width={50} height={50}/>
                        <div className="flex flex-col gap-y-2 w-full">
                            <p className="text-neutral-700  text-lg font-bold">
                                {currentQuest.title}
                            </p>
                            <Progress value={(points / currentQuest.value) * 100} className="h-3"/>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col justify-center items-center text-center gap-y-4 ">
                        <Image src={'/icons/winking-face.svg'} width={60} height={60} alt="No quests"/>
                        <p className="w-11/12 text-muted-foreground">Congrats for completing all the quests! You&apos;re a true language master.</p>
                    </div>
                )}
            </ul>
        </div>
    );
}