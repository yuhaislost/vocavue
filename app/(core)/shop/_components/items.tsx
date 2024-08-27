"use client";

import { refillHearts } from "@/actions/user-course-progress";
import { createStripeUrl } from "@/actions/user-subscription";
import { Button } from "@/components/ui/button";
import { HEART_REFILL_COST } from "@/constants";
import Image from "next/image";
import { useTransition } from "react";
import { toast } from "sonner";

interface ItemsProps {
    hearts: number;
    points: number;
    hasActiveSubscription: boolean;
};

export const Items = ({ hearts, points, hasActiveSubscription } : ItemsProps) => {
    const [isPending, startTransition] = useTransition();

    const onRefillHearts = () => {
        if (isPending || hearts === 5 || points < HEART_REFILL_COST)
        {
            return;
        }

        startTransition(() => {
            refillHearts().catch(() => toast.error("Something went wrong"));
        });
    }

    const onUpgrade = () => {
        if (isPending)
        {
            return;
        }

        startTransition(() => {
            createStripeUrl().then((response : any) => {
                if (response.data)
                {
                    window.location.href = response.data;
                }
            }).catch(()=>toast.error("Something went wrong :("));
        });
    }


    return (
        <ul className="w-full">
            <div className="flex items-center w-full p-4 gap-x-4 border-t-2">
                <Image src={'/icons/heart.svg'} alt="heart" height={60} width={60}/>
                <div className="flex-1">
                    <p className="text-neutral-700 text-base lg:text-xl font-bold">Refill hearts</p>
                </div>
                <Button className="w-28" disabled={ isPending || hearts === 5 || points < HEART_REFILL_COST} onClick={onRefillHearts}>{ hearts === 5 ? "Full" : (
                    <div className="flex items-center">
                        <Image src={'/icons/point.svg'} alt="Points" height={20} width={20}/>
                        <p>
                            { HEART_REFILL_COST }
                        </p>
                    </div>
                )}</Button>
            </div>
            <div className="flex items-center w-full p-4 pt-8 gap-x-4 border-t-2">
                <Image src={'/icons/heart-fire.svg'} alt="Unlimited" height={60} width={60}/>
                <div className="flex-1">
                    <p className="text-neutral-700 text-base lg:text-xl font-bold">Unlimited Hearts</p>
                </div>
                <Button disabled={isPending} onClick={onUpgrade} className={"w-28"}>
                    { hasActiveSubscription ? "Settings" : "Upgrade"}
                </Button>
            </div>
        </ul>
    );
};