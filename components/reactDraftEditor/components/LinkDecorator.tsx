import { Popover, PopoverContent, PopoverPortal, PopoverTrigger } from "@radix-ui/react-popover";
import withDecorator from "../hooks/withDecorator";


const LinkDecorator = withDecorator(({
    contentState,
    children,
    entityKey
}) => {
    const { link } = contentState.getEntity(entityKey).getData();
    return (
        <Popover>
            <PopoverTrigger>
                <span className="text-blue-600 hover:text-rose-600 duration-500">
                    {children}
                </span>
            </PopoverTrigger>
            <PopoverPortal>
                <PopoverContent
                    className="rounded p-5 w-[260px] bg-white shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] focus:shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2),0_0_0_2px_theme(colors.violet7)] will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade"
                    sideOffset={5}
                >
                    <a
                        href={link}
                        target="_blank"
                        title={link}
                    >
                        {link}
                    </a>
                </PopoverContent>
            </PopoverPortal>
        </Popover>
    )
}, (block, callback, contentState) => {
    block.findEntityRanges(
        (character) => {
            const entityKey = character.getEntity();
            return (
                entityKey !== null &&
                contentState.getEntity(entityKey).getType() === 'LINK'
            );
        }, (...arr) => {
            callback(...arr)
        }
    );
})
export default LinkDecorator