import { Children, useEffect, useState } from "react"


const UiTabs = ({ children }: React.PropsWithChildren) => {
    const [index, setIndex] = useState(0)
    const childrenArray = Children.toArray(children);
    useEffect(() => {
        childrenArray.forEach((child: any) => {
            if (child.type.name !== "UiTabsItem") throw new Error("UiTabsItem")
        })
    }, [childrenArray])
    return (
        <div>
            <div className="flex">
                <div className="tabs tabs-bordered" role="tablist">
                    {childrenArray.map((child: any, key) => {
                        return (
                            <a
                                role="tab"
                                key={key}
                                onClick={() => setIndex(key)}
                                className={`tab ${index === key ? "tab-active" : ""}`}
                            >
                                {child.props.name}
                            </a>
                        )
                    })}
                </div>
            </div>
            {childrenArray[index]}
        </div>
    )
}
export default UiTabs
export type UiTabsItemProps = React.PropsWithChildren<{
    name: string
}>
export const UiTabsItem = ({ children }: UiTabsItemProps) => {
    return children
}