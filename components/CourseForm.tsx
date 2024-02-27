import CourseEntity from "@/interfaces/CourseEntity"
import UiButton from "./ui/UiButton"
import UiForm, { UiFormItem, UiFormSubmit } from "./ui/UiForm"
import UiImage from "./ui/UiImage"
import UiInput from "./ui/UiInput"
import UiTextarea from "./ui/UiTextarea"
import UiSelect from "./ui/UiSelect"
import { UiOption } from "./reactDraftEditor/components/ui/UiSelect"
import { CourseStatus } from "@/interfaces/enums"


export type CourseFormProps = {
    onSubmit: (data: any) => void,
    defaultValue?: CourseEntity,
    loading?: boolean
}
const CourseForm = ({
    onSubmit,
    defaultValue,
    loading = false
}: CourseFormProps) => {
    return (
        <UiForm onSubmit={onSubmit}>
            <UiFormItem label="封面" name="file">
                <UiImage required={!defaultValue} width={200} />
            </UiFormItem>
            <UiFormItem
                name="name"
                label="课程名"
            >
                <UiInput defaultValue={defaultValue?.name} required />
            </UiFormItem>
            <UiFormItem
                name="type"
                label="课程类型"
            >
                <UiInput
                    defaultValue={defaultValue?.type?.name}
                    required
                />
            </UiFormItem>
            <UiFormItem
                name="status"
                label="课程状态"
            >
                <UiSelect defaultValue={defaultValue?.status || CourseStatus.HIDE}>
                    <UiOption value="HIDE">隐藏</UiOption>
                    <UiOption value="DISPLAY">显示</UiOption>
                    <UiOption value="SUSPEND">停止</UiOption>
                </UiSelect>
            </UiFormItem>
            <UiFormItem
                name="prePrice"
                label="课程单价"
            >
                <UiInput
                    defaultValue={defaultValue?.prePrice}
                    step={.1}
                    type="number"
                    required
                />
            </UiFormItem>
            <UiFormItem
                name="price"
                label="实际价格"
            >
                <UiInput
                    defaultValue={defaultValue?.price}
                    step={.1}
                    type="number"
                    required />
            </UiFormItem>
            <UiFormItem
                name="keywords"
                label="关键字"
            >
                <UiTextarea
                    defaultValue={defaultValue?.keywords}
                />
            </UiFormItem>
            <UiFormSubmit>
                <div className="flex justify-end">
                    <UiButton
                        submit
                        loading={loading}
                    >
                        提交
                    </UiButton>
                </div>
            </UiFormSubmit>
        </UiForm>
    )
}
export default CourseForm