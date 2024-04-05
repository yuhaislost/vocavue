import Image from "next/image"

export const Footer = () => {
    return (
        <footer className="hidden lg:block w-full">
            <div className="relative flex flex-row items-center justify-center">
                <Image src={'/footer_illustration.svg'} width={50} height={50} alt="Voca Mascot Illustration Footer" className="h-auto w-auto"/>
            </div>
            <div className="min-h-screen">

            </div>
        </footer>
    )
}