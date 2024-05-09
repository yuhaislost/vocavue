"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";

interface ItemsProps {
    hearts: number;
    points: number;
    hasActiveSubscription: boolean;
};

export const Items = ({ hearts, points, hasActiveSubscription } : ItemsProps) => {
    return (
        <ul className="w-full">
            <div className="flex items-center w-full p-4 gap-x-4 border-t-2">
                <Image src={'/icons/heart.svg'} alt="heart" height={60} width={60}/>
                <div className="flex-1">
                    <p className="text-enutral-700 text-base lg:text-xl font-bold">Refill hearts</p>
                </div>
                <Button disabled={hearts === 5}>{ hearts === 5 ? "Full" : (
                    <div className="flex items-center">
                        <Image src={'/icons/points.svg'} alt="Points" height={20} width={20}/>
                        <p>
                            50
                        </p>
                    </div>
                )}</Button>
            </div>
        </ul>
    );
};