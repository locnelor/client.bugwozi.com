import Link from "next/link";
import withDecorator from "../hooks/withDecorator";


const LinkDecorator = withDecorator(({
    contentState,
    children,
    entityKey
}) => {
    const { href, ...rest } = contentState.getEntity(entityKey).getData();
    return (
        <Link
            className="text-blue-500 cursor-pointer"
            href={href}
            {...rest}
            target="_blank"
            title="link"
        >
            {children}
        </Link>
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