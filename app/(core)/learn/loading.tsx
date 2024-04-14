import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
    return (
        <div className="h-full max-w-[912px] px-3 mx-auto">
            <div className="pt-6 grid grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(210px,1fr))] gap-4">
                <Skeleton className={"h-full min-h-[217px] min-w-[200px] p-3 pb-6"}/>
                <Skeleton className={"h-full min-h-[217px] min-w-[200px] p-3 pb-6"}/>
                <Skeleton className={"h-full min-h-[217px] min-w-[200px] p-3 pb-6"}/>
                <Skeleton className={"h-full min-h-[217px] min-w-[200px] p-3 pb-6"}/>
                <Skeleton className={"h-full min-h-[217px] min-w-[200px] p-3 pb-6"}/>
            </div>
        </div>
    );
}

export default Loading;