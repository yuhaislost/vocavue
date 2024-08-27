import { FeedWrapper } from "@/components/feed-wrapper";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { Header } from "./_components/header";
import { UserProgress } from "@/components/user-progress";
import { getCourseProgress, getLessonPercentage, getUnits, getUserCourseProgress, getUserSubscription } from "@/database/queries";
import { redirect } from "next/navigation";
import { Units } from "./_components/unit";

export default async function LearnPage()
{
    const userCourseProgressPromise = getUserCourseProgress();
    const courseProgressPromise = getCourseProgress();
    const lessonPercentagePromise = getLessonPercentage();
    const unitsPromise = getUnits();
    const userSubscriptionPromise = getUserSubscription();

    const [ userCourseProgress, courseProgress, lessonPercentage, units, userSubscription ] = await Promise.all([userCourseProgressPromise, courseProgressPromise,
    lessonPercentagePromise, unitsPromise, userSubscriptionPromise]);

    if (!userCourseProgress || !userCourseProgress.activeCourse || !courseProgress)
    {
        redirect('/courses');
    }


    return (
        <div className="flex flex-row-reverse gap-[48px] lg:px-6">
            <StickyWrapper>
                <UserProgress activeCourse={userCourseProgress.activeCourse} hearts={userCourseProgress.hearts} points={userCourseProgress.points} hasActiveSubscription={!!userSubscription?.isActive}/>
            </StickyWrapper>
            <FeedWrapper>
                <Header title={userCourseProgress.activeCourse.title }/>
                {units.map((unit) => (
                    <div key={unit.id} className="mb-10">
                        <Units id={unit.id} order={unit.order} description={unit.description} title={unit.title} lessons={unit.lessons} activeLesson={courseProgress.activeLesson} activeLessonPercentage={lessonPercentage}/>
                    </div>
                ))}
            </FeedWrapper>
        </div>
    );
}