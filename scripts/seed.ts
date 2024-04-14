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
        
        await db.insert(schema.courses).values([
            {
                title: "Chinese",
                imageSrc: "/flags/CN.svg"
            },
            {
                title: "Korean",
                imageSrc: "/flags/KR.svg"
            },
            {
                title: "French",
                imageSrc: "/flags/FR.svg"
            },
            {
                title: "Spanish",
                imageSrc: "/flags/ES.svg"
            },
            {
                title: "Japanese",
                imageSrc: "/flags/JP.svg"
            }
            
        ]);

        console.log("Seeding finished.");

    } catch (error)
    {
        console.log(error);
        throw new Error("Failed to seed the database");
    }
}

main();