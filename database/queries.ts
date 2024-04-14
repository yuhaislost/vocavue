import { cache } from "react";
import db from "./drizzle";
import { auth } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { courses, userCourseProgress } from "./schema";

export const getCourses = cache( async () => {
    const data = await db.query.courses.findMany();

    return data;
});

export const getUserCourseProgress = cache( async () => {
    const { userId } = await auth();

    if (!userId)
    {
        return null;
    }

    const data = await db.query.userCourseProgress.findFirst({
        where: eq(userCourseProgress.userId, userId),
        with: {
            activeCourse: true
        }
    });

    return data;
});

export const getCourseById = cache(async (courseId: number) => {
    const data = await db.query.courses.findFirst({
        where: eq(courses.id, courseId),
    });

    return data;
})