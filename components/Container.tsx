import classNames from "classnames"


const Container = ({
    children,
    className = "",
    style = {}
}: React.PropsWithChildren<{ className?: string, style?: any }>) => {
    return (
        <div
            className={classNames("container m-auto mb-5 pl-1 pr-1", className)}
            style={style}
        >
            {children}
        </div>
    )
}
export default Container