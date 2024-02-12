import UiButton from "@/components/ui/UiButton"
import UiDatePicker from "@/components/ui/UiDatePicker"
import UiDropdown from "@/components/ui/UiDropdown"
import UiForm, { UiFormItem } from "@/components/ui/UiForm"
import UiInput from "@/components/ui/UiInput"
import UiModal, { UiModalTitle } from "@/components/ui/UiModal"
import ClassesEntity from "@/interfaces/ClassesEntity"
import { useCallback, useRef } from "react"


const ClassesWork = ({
    classes,
    power,
    refetch
}: { classes: ClassesEntity, power: boolean, refetch: () => any }) => {
    const addRef = useRef<HTMLDialogElement>(null);
    const onClickAddModal = useCallback(() => addRef.current?.showModal(), []);
    const onCancelAddModal = useCallback(() => addRef.current?.close(), []);
    const onAddSubmit = useCallback(() => {

    }, [])
    return (
        <div>
            <UiDatePicker />
            {power && (
                <div className="flex gap-2">
                    <UiButton onClick={onClickAddModal}>
                        添加作业
                    </UiButton>
                    <UiModal
                        ref={addRef}
                    >
                        <UiModalTitle>添加作业</UiModalTitle>
                        <UiDropdown
                            Trigger={(
                                <div>
                                    添加条件
                                </div>
                            )}
                        >
                            123123123
                        </UiDropdown>
                        <UiForm onSubmit={onAddSubmit}>
                            <UiFormItem label="作业名称" name="title">
                                <UiInput />
                            </UiFormItem>
                            <UiFormItem label="截止日期" name="deadline">
                                <UiInput />
                            </UiFormItem>
                            <UiFormItem label="描述" name="description">
                                <UiInput />
                            </UiFormItem>
                        </UiForm>
                        <div className="flex w-full justify-end">
                            <UiButton>
                                提交
                            </UiButton>
                        </div>
                    </UiModal>
                    <UiButton>
                        删除作业
                    </UiButton>
                </div>
            )}
        </div>
    )
}
export default ClassesWork