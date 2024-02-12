

export type UiDropdownProps = React.PropsWithChildren<{
    Trigger: React.ReactNode
}>
const UiDropdown = ({
    Trigger,
    children
}: UiDropdownProps) => {

    return (
        <div className="dropdown">
            <div tabIndex={0} role="button" className="btn m-1">
                {Trigger}
            </div>
            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                <li><a>Item 1</a></li>
                <li><a>Item 2</a></li>
            </ul>
        </div>
    )
}
export default UiDropdown