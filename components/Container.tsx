

const Container = ({ children }: React.PropsWithChildren) => {
    return (
        <div className="container m-auto mt-5 mb-5 pl-1 pr-1">
            {children}
        </div>
    )
}
export default Container