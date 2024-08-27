import { getLesson, getUserCourseProgress, getUserSubscription } from "@/database/queries";
import { redirect } from "next/navigation";
import { Quiz } from "../_components/quiz";

type Props = {
    params: {
        lessonId: number;
    };
};

const LessonIdPage = async ({ params } : Props) => {

    const lessonPromise = getLesson(params.lessonId);

    const userProgressPromise = getUserCourseProgress();
    const userSubscriptionPromise = getUserSubscription();

    const [lesson, userProgress, userSubscription] = await Promise.all([lessonPromise, userProgressPromise, userSubscriptionPromise]);

    if (!lesson || !userProgress)
    {
        redirect('/learn');
    }

    const initialPercentage = lesson.challenges.filter((challenge) => challenge.completed).length / lesson.challenges.length * 100;

    return (
        <Quiz initialLessonId={lesson.id} initialLessonChallenges={lesson.challenges} initialHearts={userProgress.hearts} initialPercentage={initialPercentage} userSubscription={userSubscription}/>
    );
}

export default LessonIdPage;