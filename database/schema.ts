import { Relation, relations } from "drizzle-orm";
import { integer, pgEnum, pgTable, serial, text, boolean } from "drizzle-orm/pg-core";

export const courses = pgTable("courses", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    imageSrc: text("image_src").notNull(),
});

export const coursesRelations = relations(courses, ({ many }) => ({
    userCourseProgress: many(userCourseProgress),
    units: many(units),
}));


export const units = pgTable("units", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    description: text("description").notNull(),
    courseId: integer("course_id").references(() => courses.id, {
        onDelete: "cascade"
    }).notNull(),
    order: integer("order").notNull()
});

export const unitsRelations = relations(units, ({ many, one }) => ({
    course: one(courses, {
        fields: [units.courseId],
        references: [courses.id]
    }),
    lessons: many(lessons)
}));


export const lessons   = pgTable("lessons", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    unitId: integer("unit_id").references(() => units.id, {
        onDelete: 'cascade'
    }).notNull(),
    order: integer("order").notNull(),
});

export const lessonsRelation = relations(lessons, ({ one, many }) => ({
    unit: one(units, {
        fields: [lessons.unitId],
        references: [units.id]
    }),
    challenges: many(challenges),
}));


export const challengesEnum = pgEnum("type", ["SELECT", "ASSIST"]);

export const challenges = pgTable("challenges", {
    id: serial("id").primaryKey(),
    lessonId: integer("lessons_id").references(() => lessons.id, {
        onDelete: 'cascade'
    }),
    type: challengesEnum("type").notNull(),
    question: text("question").notNull(),
    order: integer("order").notNull(),
});

export const challengesRelation = relations(challenges, ({ one, many }) => ({
    lesson: one(lessons, {
        fields: [challenges.lessonId],
        references: [lessons.id],
    }),
    challengeOptions: many(challengeOptions),
    challengeProgresses: many(challengeProgress),
}));

export const challengeOptions = pgTable("challenge_options", {
    id: serial("id").primaryKey(),
    challengeId: integer("challenge_id").references(() => challenges.id, {
        onDelete: "cascade"
    }).notNull(),
    text: text("text").notNull(),
    correct: boolean("correct").notNull(),
    imageSrc: text("image_src"),
    audioSrc: text("audio_src"),
});

export const challengeOptionsRelation = relations(challengeOptions, ({ one }) => ({
    challenge: one(challenges, {
        fields: [challengeOptions.challengeId],
        references: [challenges.id]
    })
}));

export const challengeProgress = pgTable("challenge_progress", {
    id: serial("id").primaryKey(),
    userId: text("user_id").notNull(),
    challengeId: integer("challenge_id").references(() => challenges.id, {
        onDelete: 'cascade'
    }).notNull(),
    completed: boolean("completed").notNull().default(false),
});

export const challengeProgressRelations = relations(challengeProgress, ({ one }) => ({
    challenge: one(challenges, {
        fields: [challengeProgress.challengeId],
        references: [challenges.id]
    })
}));


export const userCourseProgress = pgTable("user_course_progress", {
    userId: text('user_id').primaryKey(),
    userName: text("username").notNull().default("User"),
    userImageSrc: text("user_image_src").notNull().default("/vocavue_pictorial_logo.svg"),
    activeCourseId: integer("active_course_id").references(() => courses.id, { onDelete: "cascade"}),
    hearts: integer("hearts").notNull().default(5),
    points
    : integer("points").notNull().default(0),

});

export const userCourseProgressRelations = relations(userCourseProgress, ({ one }) => ({
    activeCourse: one(courses, {
        fields: [userCourseProgress.activeCourseId],
        references: [courses.id]
    })
}));