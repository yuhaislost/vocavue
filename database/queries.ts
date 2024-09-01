import { cache } from "react";
import db from "./drizzle";
import { auth } from "@clerk/nextjs";
import { asc, eq } from "drizzle-orm";
import { challengeProgress, challenges, courses, lessons, units, userCourseProgress, userSubscription } from "./schema";

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
        with: {
            units: {
                orderBy: (units, { asc }) => [asc(units.order)],
                with: {
                    lessons: {
                        orderBy: (lessons, { asc }) => [asc(lessons.order)],
                    },
                },
            },
        },
    });

    return data;
});

export const getUnits = cache(async () => {
    const { userId } = await auth();
    const userCourseProgress = await getUserCourseProgress();

    if (!userId || !userCourseProgress?.activeCourseId)
    {
        return [];
    }

    const data = await db.query.units.findMany({
        orderBy: (units, { asc }) => [asc(units.order)],
        where: eq(units.courseId, userCourseProgress.activeCourseId),
        with: {
            lessons: {
                orderBy: (lessons, { asc }) => [asc(lessons.order)],
                with: {
                    challenges: {
                        orderBy: (challenges, { asc }) => [asc(challenges.order)],
                        with : {
                            challengeProgresses: {
                                where: eq(challengeProgress.userId, userId),
                            },
                        },
                    },
                },
            },
        },
    });


//     const data : any = await db.execute(sql.raw(`WITH
//     challenges_data AS (
//       SELECT
//         c.*,
//         JSON_AGG(
//           CASE
//             WHEN cp.user_id IS NOT NULL
//             AND cp.challenge_id IS NOT NULL THEN JSON_BUILD_OBJECT(
//               'user_id',
//               cp.user_id,
//               'challenge_id',
//               cp.challenge_id,
//               'completed',
//               cp.completed
//             )
//           END
//         ) AS challenge_progresses
//       FROM
//         challenges c
//         LEFT JOIN challenge_progress cp ON c.id = cp.challenge_id
//         AND cp.user_id = '${userCourseProgress.userId}'
//       GROUP BY
//         c.id
//     ),
//     lessons_data AS (
//       SELECT
//         l.*,
//         JSON_AGG(
//           CASE
//             WHEN cd.id IS NOT NULL THEN JSON_BUILD_OBJECT(
//               'id',
//               cd.id,
//               'lessons_id',
//               cd.lessons_id,
//               'type',
//               cd.type,
//               'question',
//               cd.question,
//               'order',
//               cd.order,
//               'challenge_progresses',
//               cd.challenge_progresses
//             )
//           END
//         ) AS challenges
//       FROM
//         lessons l
//         LEFT JOIN challenges_data cd ON l.id = cd.lessons_id
//       GROUP BY
//         l.id
//     )
//   SELECT
//     u.*,
//     JSON_AGG(
//       CASE
//         WHEN ld.id IS NOT NULL THEN JSON_BUILD_OBJECT('id', ld.id, 'unit_id', ld.unit_id, 'title', ld.title, 'order', ld.order, 'challenges', ld.challenges)
//       END
//     ) as lessons
//   FROM
//     units u
//     LEFT JOIN lessons_data ld ON u.id = ld.unit_id AND u.id = ${userCourseProgress.activeCourseId}
//   GROUP BY
//     u.id;`));

    const normalisedData = data.map((unit) => {
        const lessonsWithCompletedStatus = unit.lessons.map((lesson) => {
            if (lesson.challenges.length  === 0)
            {
                return { ...lesson, completed: false};
            }

            const allCompletedChallenges = lesson.challenges.every((challenge) => {
                return challenge.challengeProgresses && challenge.challengeProgresses.length > 0 && challenge.challengeProgresses.every((progress) => progress.completed)
            });

            return {...lesson, completed: allCompletedChallenges}
        });

        return { ...unit, lessons: lessonsWithCompletedStatus}
    });

    return normalisedData;
});

export const getCourseProgress = cache(async () => {
    const { userId } = await auth();
    const userCourseProgress = await getUserCourseProgress();

    if (!userId || !userCourseProgress?.activeCourseId)
    {
        return null;
    }

    const unitsInActiveCourse = await db.query.units.findMany({
        orderBy: (units, { asc }) => [asc(units.order)],
        where: eq(units.courseId, userCourseProgress.activeCourseId),
        with: {
            lessons: {
                orderBy: (lessons, { asc }) => [asc(lessons.order)],
                with: {
                    unit: true,
                    challenges: {
                        with: {
                            challengeProgresses: {
                                where: eq(challengeProgress.userId, userId),
                            },
                        },
                    },
                },
            },
        },
    });

    const firstUncompletedLesson = unitsInActiveCourse.flatMap((unit) => unit.lessons).find((lesson) => {
        return lesson.challenges.some((challenge) => {
            return !challenge.challengeProgresses || challenge.challengeProgresses.length === 0 || challenge.challengeProgresses.some((progress) => progress.completed === false);
        });
    });

    return {
        activeLesson: firstUncompletedLesson,
        activeLessonId: firstUncompletedLesson?.id
    };
});

export const getLesson = cache(async (id?: number) => {
    const { userId } = await auth();

    if (!userId)
    {
        return null;
    }

    const courseProgress = await getCourseProgress();

    const lessonId = id || courseProgress?.activeLessonId;

    if (!lessonId)
    {
        return null;
    }

    const data = await db.query.lessons.findFirst({
        where: eq(lessons.id, lessonId),
        with: {
            challenges: {
                orderBy: (challenges, { asc }) => [asc(challenges.order)],
                with: {
                    challengeOptions: true,
                    challengeProgresses: {
                        where: eq(challengeProgress.userId, userId)
                    },
                },
            },
        },
    });

    if (!data || !data.challenges)
    {
        return null;
    }

    const normalizedChallenges = data.challenges.map((challenge) => {
        const completed = challenge.challengeProgresses && challenge.challengeProgresses.length > 0 && challenge.challengeProgresses.every((progress) => progress.completed);

        return {...challenge, completed};
    });

    return {...data, challenges: normalizedChallenges};
});

export const getLessonPercentage = cache(async () => {
    const userCourseProgress = await getCourseProgress();

    if (!userCourseProgress?.activeLessonId)
    {
        return 0;
    };

    const lesson = await getLesson(userCourseProgress.activeLessonId);

    if (!lesson)
    {
        return 0;
    }

    const completedChallenges = lesson.challenges.filter((challenge) => challenge.completed);

    const percentage = Math.round((completedChallenges.length) / (lesson.challenges.length) * 100);

    return percentage;
});

export const getUserSubscription = cache(async () => {
    const { userId } = await auth();

    if (!userId) {
        return null;
    }

    const data = await db.query.userSubscription.findFirst({
        where: eq(userSubscription.userId, userId)
    });

    if (!data)
    {
        return null;
    }

    const isActive = data.stripePriceId && data.stripeCurrentPeriodEnd?.getTime() + 86_400_000 > Date.now();

    return {
        ...data,
        isActive: !!isActive
    };
    
});

export const getTopUsers = cache(async () => {
    const { userId } = await auth();
    
    if (!userId)
    {
        return [];
    
    }
    
    const data = await db.query.userCourseProgress.findMany({
        orderBy: (userProgress, { desc }) => [userProgress.points],
        limit: 20, 
        columns: {
            userId: true,
            userName: true,
            userImageSrc: true,
            points: true
        },
    });

    return data;
})