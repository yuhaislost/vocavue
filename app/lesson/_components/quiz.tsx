'use client';

import { challengeOptions, challenges, userSubscription } from "@/database/schema";
import { useState, useTransition } from "react";
import { Header } from "./header";
import { QuestionBubble } from "./question-bubble";
import { Challenge } from "./challenge";
import { Footer } from "./footer";
import { reduceHearts, upsertChallengeProgress } from "@/actions/challenge-progress";
import { toast } from "sonner";
import { useAudio, useMount } from "react-use";
import Image from "next/image";
import { ResultCard } from "./result-card";
import { useRouter } from "next/navigation";
import { useHeartModal } from "@/store/use-heart-modal";
import { usePracticeModal } from "@/store/use-practice-modal";

interface QuizProps {
    initialPercentage: number;
    initialLessonId: number;
    initialLessonChallenges: (typeof challenges.$inferInsert & {
        completed: boolean;
        challengeOptions: typeof challengeOptions.$inferInsert[];
    })[];
    initialHearts: number;
    userSubscription: typeof userSubscription.$inferSelect & { isActive: boolean; } | null;
};

export const Quiz = ({ initialPercentage, initialLessonId, initialLessonChallenges, initialHearts, userSubscription} : QuizProps) => {
    const router = useRouter();
    const { open: openHeartsModal } = useHeartModal();
    const { open: openPracticeModal } = usePracticeModal();

    useMount(() => {
        if (initialPercentage === 100) {{
            openPracticeModal();
        }}
    });

    const [correctAudio, _c, correctAudioControls] = useAudio({ src: '/voices/correct.wav'});
    const [incorrectAudio, _i, incorrectAudioControls] = useAudio({ src: '/voices/incorrect.wav'});
    const [isPending, startTransition] = useTransition();
    const [hearts, setHearts] = useState(initialHearts);
    const [percentage, setPercentage] = useState(() => {
        return initialPercentage === 100 ? 0 : initialPercentage;
    });
    const [challenges] = useState(initialLessonChallenges);
    const [lessonId] = useState(initialLessonId);
    const [activeIndex, setActiveIndex] = useState(() => {
        const uncompletedIndex = challenges.findIndex((challenge) => !challenge.completed);
        return uncompletedIndex === -1 ? 0 : uncompletedIndex;
    });
    const [status, setStatus] = useState<"correct" | "wrong" | "none">("none");
    const [selectedOption, setSelectedOption] = useState<number>();

    const challenge = challenges[activeIndex];
    const options = challenge?.challengeOptions ?? [];
    
    const onSelect = (id: number) => {
        if (status !== "none") return;

        setSelectedOption(id);
    };

    const onNext = () => {
        setActiveIndex((current) => current + 1);
    };

    const onContinue = () => {
        if (!selectedOption) return;

        if (status === "wrong")
        {
            setStatus("none");
            setSelectedOption(undefined);
            return;
        }

        if (status === "correct")
        {
            onNext();
            setStatus("none");
            setSelectedOption(undefined);
            return;
        }

        const correctOption = options.find((option) => option.correct);

        if (!correctOption) return;

        if (correctOption.id === selectedOption)
        {
            startTransition(() => {
                upsertChallengeProgress(challenge.id!, selectedOption).then((response) => {
                    if (response?.error === 'hearts')
                    {
                        openHeartsModal();
                        return;
                    }

                    setStatus("correct");
                    setPercentage((prev) => prev + 100 / challenges.length);
                    correctAudioControls.play();

                    if (initialPercentage === 100)
                    {
                        setHearts((prev) => Math.min(prev + 1, 5));
                    }
                }).catch(() => toast.error("Something went wrong. Please try again."))
            })
        }
        else {
            startTransition(() => {
                reduceHearts(challenge.id!).then((response) => {
                    if (response?.error === 'hearts')
                    {
                        openHeartsModal();
                        return;
                    }

                    setStatus("wrong");

                    incorrectAudioControls.play();

                    if (!response?.error)
                    {
                        setHearts((prev) => Math.max(prev - 1, 0));
                    }
                }).catch(() => toast.error("Something went wrong. Please try again."));
            });
        }

    }

    if (!challenge)
    {
        return (
            <>
                <div className="flex flex-col gap-y-4 lg:gap-y-8 max-w-lg mx-auto text-center items-center justify-center h-full"> 
                    <Image src={'/icons/finish1.svg'} alt="Finish" className="hidden lg:block" height={100} width={100}/>
                    <Image src={'/icons/finish1.svg'} alt="Finish" className="block lg:hidden" height={50} width={50}/>
                    <h1 className="text-2xl lg:text-3xl font-bold text-neutral-700">Amazing work! <br/> You&apos;ve completed the lesson.</h1>
                    <div className="flex items-center gap-x-4 w-full">
                        <ResultCard variant={'points'} value={challenges.length * 10}/>
                        <ResultCard variant={'hearts'} value={hearts}/>
                    </div>
                </div>
                <Footer lessonId={lessonId} status="completed" onCheck={() => router.push('/learn')}/>
            </>
        );
    }

    const title = challenge.type === "ASSIST" ? "Select the correct meaning" : challenge.question;
    
    return (
        <>
            <Header hearts={hearts} percentage={percentage} hasActiveSubscription={!!userSubscription?.isActive}/>
            {correctAudio}
            {incorrectAudio}
            <div className="flex-1">
                <div className="h-full flex items-center justify-center">
                    <div className="lg:min-h-[350px] lg:w-[600px] md:w-[600px] w-full px-6 lg:px-0 flex flex-col gap-y-12">
                        <h1 className="text-lg lg:text-3xl text-center lg:text-start font-bold text-neutral-700">
                            { title }
                        </h1>
                        <div>
                            {challenge.type === "ASSIST" && (<QuestionBubble question={challenge.question}/>)}
                            <Challenge options={options} onSelect={onSelect} status={status} selectedOption={selectedOption} disabled={isPending} type={challenge.type}/>
                        </div>
                    </div>
                </div>
            </div>
            <Footer disabled={isPending || !selectedOption} status={status} onCheck={onContinue}/>
        </>
    )
}