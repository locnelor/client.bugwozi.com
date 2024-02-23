"use client"

import { createEmpty } from "@/components/reactDraftEditor/DraftRichEditor";
import { EditorState } from "draft-js";
import { useCallback, useEffect, useState } from "react";
import { gql, useMutation, useSubscription } from "@apollo/client";
import UiButton from "@/components/ui/UiButton";

const SubscriptionTest = gql`
    subscription HandleMessage{
        handleMessage{
            message
        }
    }
`

const PublishMutation = gql`
    mutation Publish($data:String!){
        publishTest(data:$data){
            message
        }
    }
`

const TestPage = () => {
    const [publish] = useMutation(PublishMutation)
    const { data, loading, error } = useSubscription(SubscriptionTest, {
        onError(error) {
            console.log(error)
        },
        onComplete() {
            console.log("asd")
        },
    })
    console.log(data?.handleMessage)
    useEffect(() => {

    }, [])
    // console.log(data, loading, error)

    const [state, setState] = useState(createEmpty());
    const onChange = useCallback((value: EditorState) => {
        setState(value);
    }, [])
    const onClick = useCallback(() => {
        publish({
            variables: {
                data: `${Date.now()}`
            }
        })
    }, [])
    return (
        <div className='ml-auto mr-auto' style={{ width: "1000px" }}>
            <UiButton
                onClick={onClick}
            >
                publish
            </UiButton>
            <header className='text-center bg-slate-300'>DraftRichEditor</header>

        </div >
    );
}
export default TestPage