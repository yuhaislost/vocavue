import Image from "next/image"
import { FooterTab } from "./footer-tab";
import Link from "next/link";

const FOOTER_NAVIGATION = [
    {
        title: 'About Us',
        sublinks : [
            {
                title: 'Courses',
                href: "/"
            },
            {
                title: 'Mission',
                href: "/"
            },
            {
                title: 'Future & Vision',
                href: '/'
            }, 
            {
                title: 'Approach',
                href: '/'
            },
            {
                title: 'Contact',
                href: '/'
            }
        ]
    },
    {
        title: 'Support',
        sublinks: [
            {
                title: 'Help Center',
                href: '/'
            },
            {
                title: 'Vocavue FAQs',
                href: '/'
            },
            {
                title: 'Status',
                href: '/'
            }
        ]
    },
    {
        title: 'Legal',
        sublinks: [
            {
                title: 'Terms & Coniditions',
                href: '/'
            },
            {
                title: 'Privacy Policy',
                href: '/'
            },
            {
                title: 'Cookies',
                href: '/'
            },
            {
                title: 'Trademark',
                href: '/'
            }
        ]
    },
    {
        title: 'Socials',
        sublinks: [
            {
                title: 'Blog',
                href: '/',
            },
            {
                title: 'Instagram',
                href: '/'
            },
            {
                title: 'Facebook',
                href: '/'
            },
            {
                title: 'Skool',
                href: '/'
            }
        ]
    },
    {
        title: 'Careers',
        sublinks: [
            {
                title: 'Working at Vocavue',
                href: '/',
            },
            {
                title: 'Job & Contracting Opportunities',
                href: '/'
            },
            {
                title: 'Employee Benefits',
                href: '/'
            },
            {
                title: 'The Community',
                href: '/'
            }
        ]
    }
];

export const Footer = () => {
    return (
        <footer className="block w-full">
            <div className="relative overflow-x-hidden">
                <div className="relative flex flex-row items-center justify-center overflow-y-hidden">
                    <div className="w-full bg-indigo-500 h-[370px] translate-y-[186px] hidden lg:block"/>
                    <Image src={'/footer_illustration_v2.svg'} width={50} height={50} alt="Voca Mascot Illustration Footer" className="md:h-auto md:w-auto w-full h-full object-cover z-50"/>
                    <div className="w-full bg-indigo-500 h-[370px] translate-y-[186px] hidden lg:block"/>
                </div>
            </div>
            <div className="w-full bg-indigo-500 py-20 xl:px-0 px-10">
                <div className="lg:max-w-screen-lg mx-auto flex flex-col gap-20 ">
                    <div className="w-full flex flex-row flex-wrap gap-y-10 justify-between">
                        { FOOTER_NAVIGATION.map((item, index) => (<FooterTab key={index} title={item.title} tabElements={item.sublinks} className="lg:w-auto w-[300px]"/>)) }
                    </div>
                    <div className="w-full h-[2px] bg-indigo-400 rounded-lg"/>
                    <div className="flex flex-row justify-between items-centerr">
                        <Link href={'/'}>
                            <div className="flex items-center gap-x-3">
                                <Image src={'/vocavue_pictorial_logo.svg'} height={40} width={40} alt="Vocavue Mascot"/>
                                <span className="text-xl font-extrabold text-white tracking-wide">Vocavue</span>
                            </div>
                        </Link>
                        <p className="text-white text-sm my-auto">Vocavue. All rights reserved.</p>
                    </div>
                </div>
            </div>  
        </footer>
    )
}