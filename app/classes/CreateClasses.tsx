"use client"

import UiButton from "@/components/ui/UiButton"
import UiForm, { UiFormItem, UiFormSubmit } from "@/components/ui/UiForm"
import UiInput from "@/components/ui/UiInput"
import UiModal, { UiModalTitle } from "@/components/ui/UiModal"
import { useMutation } from "@apollo/client"
import gql from "graphql-tag"
import { useCallback, useRef } from "react"

const CreateClassesMutation = gql`
    mutation CreateClasses($name:String!){
        createClasses(name:$name){
            id
        }
    }
`
const CreateClasses = ({ refetch }: { refetch: () => void }) => {
    const ref = useRef<HTMLDialogElement>(null);
    const [create, { loading }] = useMutation(CreateClassesMutation, {
        onCompleted() {
            refetch();
            ref.current?.close();
        },
    })
    const onClick = useCallback(() => {
        ref.current?.showModal();
    }, [])
    const onSubmit = useCallback(({ name }: any) => {
        create({
            variables: {
                name
            }
        })
    }, []);
    return (
        <div>
            <UiButton className="w-full" onClick={onClick}>
                创建班级
            </UiButton>
            <UiModal ref={ref}>
                <UiModalTitle>创建班级</UiModalTitle>
                <UiForm onSubmit={onSubmit}>
                    <UiFormItem
                        label="班级名称"
                        name="name"
                        valueMissing="必选项不得为空"
                    >
                        <UiInput required />
                    </UiFormItem>
                    <div className="flex justify-end">
                        <UiFormSubmit>
                            <UiButton
                                submit
                                loading={loading}
                            >
                                提交
                            </UiButton>
                        </UiFormSubmit>
                    </div>
                </UiForm>
            </UiModal>
        </div>
    )
}
export default CreateClasses