"use server";

import db from "@/database/drizzle";
import { getCourseById, getUserCourseProgress } from "@/database/queries";
import { userCourseProgress } from "@/database/schema";
import { auth, currentUser } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const upsertUserCourseProgress = async (courseId: number) => {
    const { userId } = await auth();
    const user = await currentUser();

    if (!userId || !user)
    {
        throw new Error("Unauthenticated");
    }

    const course = await getCourseById(courseId);

    if (!course)
    {
        throw new Error("Course not found!");
    }

    // if (!course.units.length || !course.units[0].lessons.length)
    // {
    //     throw new Error("Course is empty");
    // }

    const exisitingUserCourseProgress = await getUserCourseProgress();

    if (exisitingUserCourseProgress)
    {
        await db.update(userCourseProgress).set({
            activeCourseId: courseId,
            userName: user.firstName || "User",
            userImageSrc: user.imageUrl || "/vocavue_pictorial_logo.svg"
        });
        revalidatePath("/courses");
        revalidatePath("/learn");
        redirect("/learn");
    }

    await db.insert(userCourseProgress).values({
        userId,
        activeCourseId: courseId,
        userName: user.firstName || "User",
        userImageSrc: user.imageUrl || "/vocavue_pictorial_logo.svg"
    });

    revalidatePath("/courses");
    revalidatePath("/learn");
    redirect("/learn");
}