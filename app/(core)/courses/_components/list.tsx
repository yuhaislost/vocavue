"use client";

import { courses, userCourseProgress } from "@/database/schema";
import { Card } from "./card";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { upsertUserCourseProgress } from "@/actions/user-course-progress";
import { toast } from "sonner";

interface ListProps {
    courses: typeof courses.$inferSelect[];
    activeCourseId?: typeof userCourseProgress.$inferInsert.activeCourseId;
};

export const List = ({ courses, activeCourseId } : ListProps) => {

    const router = useRouter();

    const [pending, startTransition] = useTransition();

    const onClick = (id: number) => {
        if (pending) return;

        if (id === activeCourseId)
        {
            return router.push('/learn');
        }

        startTransition(() => {
            upsertUserCourseProgress(id).catch(() => toast.error("Something went wrong!"));
        });
    }


    return (
        <div className="pt-6 grid grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(210px,1fr))] gap-4">
            { courses.map((course) => (<Card key={course.id} id={course.id} title={course.title} imageSrc={course.imageSrc} onClick={onClick} disabled={false} active={course.id === activeCourseId}/>))}
        </div>
    );
}