import ReactDOM from 'react-dom/client';
import UiModal, { UiModalTitle } from "./ui/UiModal";
import { useEffect, useRef } from 'react';


export type OpenModalProps = {
    context: React.ReactNode,
    title?: string,
    description?: React.ReactNode
}
const openModal = (props: OpenModalProps) => {

    const container = document.createElement("div");
    const body = document.body;
    body.appendChild(container);
    const App = ReactDOM.createRoot(
        container
    )
    const destroy = () => {
        App.unmount()
        body.removeChild(container);
    };
    App.render((
        <OpenModalDom
            {...props}
            destory={destroy}
        />
    ));
    return destroy;
}
export default openModal
const OpenModalDom = ({
    title,
    description,
    context,
    destory
}: OpenModalProps & { destory: () => void }) => {
    const ref = useRef<HTMLDialogElement>(null);
    useEffect(() => {
        ref.current?.showModal()
    }, []);
    return (
        <UiModal
            onCancel={destory}
            ref={ref}
        >
            <UiModalTitle>
                {title}
            </UiModalTitle>
            <div>
                {description}
            </div>
            {context}
        </UiModal>
    )
}