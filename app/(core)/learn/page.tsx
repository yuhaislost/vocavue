import { FeedWrapper } from "@/components/feed-wrapper";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { Header } from "./_components/header";
import { UserProgress } from "@/components/user-progress";
import { getUserCourseProgress } from "@/database/queries";
import { redirect } from "next/navigation";

export default async function LearnPage()
{
    const userCourseProgressPromise = getUserCourseProgress();

    const [ userCourseProgress ] = await Promise.all([userCourseProgressPromise]);

    if (!userCourseProgress || !userCourseProgress.activeCourse)
        {
            redirect('/courses');
        }

    return (
        <div className="flex flex-row-reverse gap-[48px] lg:px-6">
            <StickyWrapper>
                <UserProgress activeCourse={userCourseProgress.activeCourse} hearts={userCourseProgress.hearts} points={userCourseProgress.points} hasActiveSubscription={false}/>
            </StickyWrapper>
            <FeedWrapper>
                <Header title={userCourseProgress.activeCourse.title }/>
            </FeedWrapper>
        </div>
    );
}