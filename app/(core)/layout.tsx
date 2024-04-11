import { MobileHeader } from "@/components/mobile-header";
import { Sidebar } from "@/components/sidebar";

interface CoreLayoutProps {
    children: React.ReactNode;
}

const CoreLayout = ({ children } : CoreLayoutProps) => {
    return (
        <>
            <MobileHeader/>
            <Sidebar className="hidden lg:flex"/>
            <main className="lg:pl-[256px] h-full lg:pt-0 pt-[50px]">
                <div className='max-w-[1056px] mx-auto p-6 h-full'>
                    { children }
                </div>
            </main>
        </>
    );
}

export default CoreLayout;