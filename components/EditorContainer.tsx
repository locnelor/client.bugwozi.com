

const EditorContainer = ({ children }: React.PropsWithChildren) => {

    return (
        <div style={{ maxWidth: 1000 }} className="ml-auto mr-auto mt-2">
            {children}
        </div>
    )
}
export default EditorContainer