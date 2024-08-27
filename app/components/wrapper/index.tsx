import { cn } from "@/lib/utils";

interface WrapperProps
    extends React.HTMLAttributes<HTMLDivElement>,
        //allows the Wrapper component to accept any standard HTML attributes that can be applied to a div element (e.g., id, style, onClick, etc.).
        React.PropsWithChildren {}
//ensure that the Wrapper component can accept children as a prop. The children are the elements or components that are nested inside the Wrapper component

export const Wrapper = ({ className, children, ...props }: WrapperProps) => {
    return (
        <div
            {...props}
            className={cn("max-w-screen-wrapper mx-auto px-6", className)}
        >
            {children}
        </div>
    );
};