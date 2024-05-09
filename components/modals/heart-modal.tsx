'use client';

import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { useEffect, useState } from "react";
import { useHeartModal } from "@/store/use-heart-modal";
import Image from "next/image";
import { Button } from "../ui/button";

export const HeartModal = () => {
    const router = useRouter();
    const [isClient, setIsClient] = useState(false);
    const { isOpen, close } = useHeartModal();
     
    useEffect(() => setIsClient(true), []);

    if (!isClient)
    {
        return null;
    }

    const onClick = () => {
        close();
        router.push('/store');
    }

    return (
        <Dialog open={isOpen} onOpenChange={close}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <div className="flex items-center w-full justify-center mb-5">
                        <Image src={'/icons/confounded-face.svg'} alt="Sad" height={80} width={80}/>
                    </div>
                    <DialogTitle className="text-center font-bold text-2xl">
                        You ran out of hearts!
                    </DialogTitle>
                    <DialogDescription className="text-center text-base">
                        Get Ace for unlimited hearts, or purchase them in the store.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="mb-4">
                    <div className="flex flex-col gap-y-4 w-full">
                        <Button variant={'primary'} className="w-full" size={'lg'} onClick={onClick}>
                            Get unlimited hearts
                        </Button>
                        <Button variant={'primaryOutline'} className="w-full" size={'lg'} onClick={close}>
                            No thanks
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}