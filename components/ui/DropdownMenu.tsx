import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuItemProps, DropdownMenuPortal, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { ChevronRightIcon } from "@radix-ui/react-icons"
import classNames from "classnames"
import { forwardRef } from "react"


export type UiDropdownMenuProps = React.PropsWithChildren<{
    trigger: React.ReactNode
}>
const UiDropdownMenu = ({
    trigger,
    children
}: UiDropdownMenuProps) => {

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                {trigger}
            </DropdownMenuTrigger>
            <DropdownMenuPortal>
                <DropdownMenuContent
                    className="min-w-[220px] bg-white rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
                    sideOffset={5}
                >
                    {children}
                </DropdownMenuContent>
            </DropdownMenuPortal>
        </DropdownMenu>
    )
}
export const UiDropdownMenuItem = forwardRef<
    HTMLDivElement,
    DropdownMenuItemProps & React.RefAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
    return (
        <DropdownMenuItem
            className={
                classNames(
                    "group text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1",
                    className
                )
            }
            {...props}
            ref={ref}
        />
    )
})
export type UiDropdownMenuSubProps = React.PropsWithChildren<{
    trigger: React.ReactNode
}>
export const UiDropdownMenuSub = ({
    children,
    trigger
}: UiDropdownMenuSubProps) => {
    return (
        <DropdownMenuSub>
            <DropdownMenuSubTrigger className="group text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[state=open]:bg-violet4 data-[state=open]:text-violet11 data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1 data-[highlighted]:data-[state=open]:bg-violet9 data-[highlighted]:data-[state=open]:text-violet1">
                {trigger}
                <div className="ml-auto pl-[20px] text-mauve11 group-data-[highlighted]:text-white group-data-[disabled]:text-mauve8">
                    <ChevronRightIcon />
                </div>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
                <DropdownMenuSubContent>
                    {children}
                </DropdownMenuSubContent>
            </DropdownMenuPortal>
        </DropdownMenuSub>
    )
}
export default UiDropdownMenu