import { Footer } from "./_components/footer";
import { Header } from "./_components/header";

interface LandingLayoutProps{
    children: React.ReactNode;
};

const LandingLayout = ({ children } : LandingLayoutProps) => {
    return (
        <div className="min-h-screen flex flex-col overflow-x-hidden">
            <Header/>
            <main className="flex-1 flex flex-col items-center justify-center mt-20">
                { children }
            </main>
            <Footer/>
        </div>
    );
}

export default LandingLayout;