import { FeedWrapper } from "@/components/feed-wrapper";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { Header } from "./_components/header";
import { UserProgress } from "@/components/user-progress";

export default function LearnPage()
{
    return (
        <div className="flex flex-row-reverse gap-[48px] lg:px-6">
            <StickyWrapper>
                <UserProgress activeCourse={{ title: "Korean", imageSrc: "/flags/KR.svg" }} hearts={5} points={100} hasActiveSubscription={false}/>
            </StickyWrapper>
            <FeedWrapper>
                <Header title="Korean"/>
            </FeedWrapper>
        </div>
    );
}