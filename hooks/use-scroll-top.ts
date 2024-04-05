import { useEffect, useState } from "react";

export function useScrollTop(threshold = 10){

    const [scrolled, setScrolled] = useState(false);

    useEffect(() => { 
        const handleScroll = () => {
            if (window.scrollY > threshold)
            {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        }

        
        document.addEventListener('scroll', handleScroll);
        return () => document.removeEventListener('scroll', handleScroll);
    }, []);

    return scrolled;
}