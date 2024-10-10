'use client';

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/app/components/ui/alert-dialog';
import {Button} from "@/app/components/ui/button";
import {IconSolarLogout2} from "@/app/components/icons";
import {cn} from "@/lib/utils";

export const SignOutButton = () => {
    async function handleLogout() {

    }
    return(
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button
                className={cn(
                    'lg:!w-full  text-primary-foreground bg-muted-foreground/10 hover:bg-muted-foreground/20',
                )}>
                    <span className='hidden lg:inline-block'>Log Out</span>
                    <IconSolarLogout2/>
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogTrigger>
                    <AlertDialogTitle>Tip</AlertDialogTitle>
                    <AlertDialogDescription>Are you sure to log out？</AlertDialogDescription>
                </AlertDialogTrigger>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleLogout}>Confirm</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
