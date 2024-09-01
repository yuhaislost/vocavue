import { redirect } from "next/navigation";

import { FeedWrapper } from "@/components/feed-wrapper";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { UserProgress } from "@/components/user-progress";
import { getUserCourseProgress, getUserSubscription } from "@/database/queries";
import Image from "next/image";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { Promotion } from "@/components/promotion";
import { QUESTS } from "@/constants";

export default async function QuestsPage()
{
    const userProgressPromise = getUserCourseProgress();
    const userSubscriptionPromise = getUserSubscription();

    const [ userProgress, userSubscription ] = await Promise.all([ userProgressPromise, userSubscriptionPromise ]);

    if (!userProgress || !userProgress.activeCourse)
    {
        redirect('/courses');
    }

    return (
        <div className="flex flex-row-reverse gap-[48px] px-6">
            <StickyWrapper>
                <UserProgress activeCourse={userProgress.activeCourse} hearts={userProgress.hearts} points={userProgress.points} hasActiveSubscription={!!userSubscription?.isActive}/>
                { !(!!userSubscription?.isActive) && <Promotion/>}
            </StickyWrapper>
            <FeedWrapper>
                <div className="w-full flex flex-col items-center">
                    <Image src={'/icons/quests.svg'} alt="Quests" height={90} width={90}/>
                    <h1 className="text-center font-bold text-neutral-800 text-2xl my-6">Quests</h1>
                    <p className="text-muted-foreground text-center text-lg mb-6">
                        Hey, c&apos;mon challenge yourself! Earn points to complete your quests.
                    </p>
                    <ul className="w-full">
                        {QUESTS.map((quest) => {
                            let progress = (userProgress.points / quest.value) * 100;

                            if (progress > 100)
                            {
                                progress = 100;
                            }

                            return (
                                <div className="flex items-center w-full p-4 gap-x-4 border-t-2" key={quest.title}>
                                    <Image src={'/icons/point.svg'} alt="Point" width={60} height={60}/>
                                    <div className="flex flex-col gap-y-2 w-full">
                                        <p className="text-neutral-700  text-xl font-bold">
                                            {quest.title}
                                        </p>
                                        {
                                            progress < 100 ? <Progress value={progress} className="h-3"/> : (
                                                <div className="flex flex-row gap-x-2">
                                                    <p className="text-muted-foreground text-medium">Completed</p>
                                                    <Image src={'/icons/clapping-hands-default.svg'} alt="Completed" width={20} height={20}/>
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                            );
                        })}
                    </ul>
                </div>
            </FeedWrapper>
        </div>
    );
}