"use server";

import { UserProgress } from "@/components/user-progress";
import db from "@/database/drizzle";
import { getUserCourseProgress } from "@/database/queries";
import { challengeOptions, challengeProgress, challengeProgressRelations, challenges, userCourseProgress } from "@/database/schema";
import { auth, currentUser } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const upsertChallengeProgress = async (challengeId: number, optionsId: number) => {
    const { userId } = await auth();

    if (!userId) 
    {
        throw new Error("Unauthenticated");
    }

    const challengeOption = await db.query.challengeOptions.findFirst({
        where: and(eq(challengeOptions.challengeId, challengeId), eq(challengeOptions.id, optionsId))
    });

    if (!challengeOption || !challengeOption.correct)
    {
        return;
    }

    const currentUserProgress = await getUserCourseProgress();

    if (!currentUserProgress)
    {
        throw new Error("User progress is not found!");
    }

    const challenge = await db.query.challenges.findFirst({
        where: eq(challenges.id, challengeId)
    });

    if (!challenge)
    {
        throw new Error("Challenge not found!");
    }

    const lessonId = challenge.lessonId;

    const existingChallengeProgress = await db.query.challengeProgress.findFirst({
        where: and(
            eq(challengeProgress.userId, userId), eq(challengeProgress.challengeId, challengeId),
        ),
    });

    const isPractice = !!existingChallengeProgress;

    if (currentUserProgress.hearts === 0 && !isPractice)
    {
        return { error: "hearts"};
    }

    if (isPractice)
    {
        await db.update(challengeProgress).set({
            completed: true
        }).where(eq(challengeProgress.id, challengeId));

        await db.update(userCourseProgress).set({
            hearts: Math.min(currentUserProgress.hearts + 1, 5),
            points: currentUserProgress.points + 10,
        }).where(eq(userCourseProgress.userId, userId));

        revalidatePath('/learn');
        revalidatePath('/lesson');
        revalidatePath('/quests');
        revalidatePath("/leaderboard");
        revalidatePath(`/lesson/${lessonId}`);

        return;
    }

    await db.insert(challengeProgress).values({
        challengeId, userId, completed: true
    });

    await db.update(userCourseProgress).set({
        points: currentUserProgress.points + 10
    }).where(eq(userCourseProgress.userId, userId));

    revalidatePath('/learn');
    revalidatePath('/lesson');
    revalidatePath('/quests');
    revalidatePath("/leaderboard");
    revalidatePath(`/lesson/${lessonId}`);
}