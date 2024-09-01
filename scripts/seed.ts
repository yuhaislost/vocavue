import "dotenv/config";

import * as schema from '@/database/schema';
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

const sql = neon(process.env.DATABASE_URL!);

const db = drizzle(sql, { schema: schema });

const main = async () => {
    try{
        console.log("Seeding database...");
        await db.delete(schema.courses);
        await db.delete(schema.userCourseProgress);
        await db.delete(schema.units);
        await db.delete(schema.lessons);
        await db.delete(schema.challengeOptions);
        await db.delete(schema.challenges);
        await db.delete(schema.challengeProgress);
        await db.delete(schema.userSubscription);

        await db.insert(schema.courses).values([
            {
                id: 1,
                title: "Chinese",
                imageSrc: "/flags/CN.svg"
            },
            {
                id: 2,
                title: "Korean",
                imageSrc: "/flags/KR.svg"
            },
            {
                id: 3,
                title: "French",
                imageSrc: "/flags/FR.svg"
            },
            {
                id: 4,
                title: "Spanish",
                imageSrc: "/flags/ES.svg"
            },
            {
                id: 5,
                title: "Japanese",
                imageSrc: "/flags/JP.svg"
            }
            
        ]);

        await db.insert(schema.units).values([
            {
                id: 1,
                courseId: 4,
                title: "Unit 1",
                description: "Learn the basics of common Spanish words.",
                order: 1,
            }
        ]);

        await db.insert(schema.lessons).values([
            {
                id: 1,
                unitId: 1,
                order: 1,
                title: "Nouns"
            },
            {
                id: 2,
                unitId: 1,
                order: 2,
                title: "Verbs"
            }
        ]);

        await db.insert(schema.challenges).values([
            {
                id: 1,
                lessonId: 1,
                type: "SELECT",
                order: 1,
                question: 'Which one of these is "the man"'
            },
            {
                id: 2,
                lessonId: 1,
                type: "ASSIST",
                order: 2,
                question: '"the man"'
            },
            {
                id: 3,
                lessonId: 2,
                type: "ASSIST",
                order: 1,
                question: '"the man"'
            },
            {
                id: 4,
                lessonId: 2,
                type: "ASSIST",
                order: 2,
                question: '"the man"'
            },
        ]);

        await db.insert(schema.challengeOptions).values([
            {
                id: 1,
                challengeId: 1,
                correct: true,
                text: "el hombre",
                audioSrc: "/voices/es_man.mp3",
            },
            {
                id: 2,
                challengeId: 1,
                correct: false,
                text: "la mujer",
                audioSrc: "/voices/es_la_mujer.mp3",
            },
            {
                id: 3,
                challengeId: 1,
                correct: false,
                text: "el robot",
                audioSrc: "/voices/es_el_robot.mp3",
            },
            {
                id: 4,
                challengeId: 2,
                correct: true,
                text: "el hombre",
                audioSrc: "/voices/es_man.mp3",
            },
            {
                id: 5,
                challengeId: 2,
                correct: false,
                text: "la mujer",
                audioSrc: "/voices/es_la_mujer.mp3",
            },
            {
                id: 6,
                challengeId: 2,
                correct: false,
                text: "el robot",
                audioSrc: "/voices/es_el_robot.mp3",
            },
            {
                id: 7,
                challengeId: 3,
                correct: true,
                text: "el hombre",
                audioSrc: "/voices/es_man.mp3",
            },
            {
                id: 8,
                challengeId: 3,
                correct: false,
                text: "la mujer",
                audioSrc: "/voices/es_la_mujer.mp3",
            },
            {
                id: 9,
                challengeId: 3,
                correct: false,
                text: "el robot",
                audioSrc: "/voices/es_el_robot.mp3",
            },
            {
                id: 10,
                challengeId: 4,
                correct: true,
                text: "el hombre",
                audioSrc: "/voices/es_man.mp3",
            },
            {
                id: 11,
                challengeId: 4,
                correct: false,
                text: "la mujer",
                audioSrc: "/voices/es_la_mujer.mp3",
            },
            {
                id: 12,
                challengeId: 4,
                correct: false,
                text: "el robot",
                audioSrc: "/voices/es_el_robot.mp3",
            },
        ])

        console.log("Seeding finished.");

    } catch (error)
    {
        console.log(error);
        throw new Error("Failed to seed the database");
    }
}

main();