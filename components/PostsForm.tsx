import { CourseStatus } from "@/interfaces/enums"
import { UiOption } from "./reactDraftEditor/components/ui/UiSelect"
import UiForm, { UiFormItem, UiFormSubmit } from "./ui/UiForm"
import UiImage from "./ui/UiImage"
import UiInput from "./ui/UiInput"
import UiSelect from "./ui/UiSelect"
import UiTags from "./ui/UiTags"
import UiButton from "./ui/UiButton"
import UiTextarea from "./ui/UiTextarea"


export type PostsFormProps = {
    onSubmit: (data: any) => void,
    defaultValue?: any,
    loading?: boolean
}
const PostsForm = ({
    onSubmit,
    loading = false,
    defaultValue
}: PostsFormProps) => {
    return (
        <UiForm
            onSubmit={onSubmit}
        >
            <UiFormItem
                label="封面"
                name="file"
            >
                <UiImage />
            </UiFormItem>
            <UiFormItem
                label="标题"
                name="name"
            >
                <UiInput />
            </UiFormItem>
            <UiFormItem
                label="标签"
                name="tags"
            >
                <UiTags />
            </UiFormItem>
            <UiFormItem
                name="status"
                label="文章状态"
            >
                <UiSelect defaultValue={defaultValue?.status || CourseStatus.HIDE}>
                    <UiOption value="HIDE">隐藏</UiOption>
                    <UiOption value="DISPLAY">显示</UiOption>
                    <UiOption value="SUSPEND">停止</UiOption>
                </UiSelect>
            </UiFormItem>
            <UiFormItem
                label="简介"
                name="description"
            >
                <UiTextarea />
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
export default PostsForm