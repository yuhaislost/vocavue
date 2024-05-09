import { getLesson, getUserCourseProgress } from "@/database/queries";
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

    const [lesson, userProgress] = await Promise.all([lessonPromise, userProgressPromise]);

    if (!lesson || !userProgress)
    {
        redirect('/learn');
    }

    const initialPercentage = lesson.challenges.filter((challenge) => challenge.completed).length / lesson.challenges.length * 100;

    return (
        <Quiz initialLessonId={lesson.id} initialLessonChallenges={lesson.challenges} initialHearts={userProgress.hearts} initialPercentage={initialPercentage} userSubscription={null}/>
    );
}

export default LessonIdPage;