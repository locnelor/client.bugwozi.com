import { ContentBlock, ContentState, DraftDecorator } from "draft-js"
import React from "react"


type DecoratorProps = {
    blockKey: string
    children: any
    contentState: ContentState
    decoratedText: string
    entityKey: string
}

const withDecorator = (
    component: React.FC<DecoratorProps>,
    strategy: (
        block: ContentBlock,
        callback: (start: number, end: number) => void,
        contentState: ContentState
    ) => void
) => {
    return {
        strategy,
        component
    } as DraftDecorator
}
export default withDecorator