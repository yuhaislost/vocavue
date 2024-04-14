import { getCourses, getUserCourseProgress } from "@/database/queries";
import { List } from "./_components/list";

const CoursesPage = async () => {
    const coursesPromise =  getCourses();
    const userCourseProgressPromise = getUserCourseProgress();
    const [courses, userCourseProgress ] = await Promise.all([coursesPromise, userCourseProgressPromise]);

    return (
        <div className="h-full max-w-[912px] px-3 mx-auto">
            <h1 className="text-2xl font-bold text-neutral-700">
                Language Courses
            </h1>
            <List courses={courses} activeCourseId={userCourseProgress?.activeCourseId}/>
        </div>
    );
}

export default CoursesPage;