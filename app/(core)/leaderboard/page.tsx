import { redirect } from "next/navigation";

import { FeedWrapper } from "@/components/feed-wrapper";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { UserProgress } from "@/components/user-progress";
import { getTopUsers, getUserCourseProgress, getUserSubscription } from "@/database/queries";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Promotion } from "@/components/promotion";

export default async function LeaderboardPage()
{
    const userProgressPromise = getUserCourseProgress();
    const userSubscriptionPromise = getUserSubscription();
    const leaderboardDataPromise = getTopUsers();

    const [ userProgress, userSubscription, leaderboardData ] = await Promise.all([ userProgressPromise, userSubscriptionPromise, leaderboardDataPromise ]);

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
                    <Image src={'/icons/leaderboard2.svg'} alt="Leaderboard" height={90} width={90}/>
                    <h1 className="text-center font-bold text-neutral-800 text-2xl my-6">Leaderboard</h1>
                    <p className="text-muted-foreground text-center text-lg mb-6">
                        See how you rank among other learners globally.
                    </p>
                    <Separator className="mb-4 h-0.5 rounded-full"/>
                    <div className="w-full flex flex-col gap-1">
                        { leaderboardData.map((userProgress, index) => (
                            <div key={userProgress.userId} className={cn("flex items-center w-full p-2 px-4 rounded-xl hover:bg-gray-200/50 transition ease-in-out duration-200")}>
                                <p className="font-bold text-blue-800 mr-4">{ index + 1}</p>
                                <div className="relative w-auto">
                                    <Image src={'/icons/crown.svg'} alt="" aria-disabled width={30} height={30} className="absolute z-50 translate-x-5 -translate-y-[20px]"/>
                                    <Avatar className="border bg-indigo-500 h-12 w-12 ml-3 mr-6">
                                        <Image src={'/icons/crown.svg'} alt="" aria-disabled width={1} height={1}/>
                                        <AvatarImage className="object-cover" src={userProgress.userImageSrc}/>
                                    </Avatar>
                                </div>
                                <p className="font-bold text-neutral-800 flex-1">{userProgress.userName}</p>
                                <p className="text-muted-text-foreground">{userProgress.points} XP</p>
                            </div>
                        ))}
                    </div>
                </div>
            </FeedWrapper>
        </div>
    );
}