import UiButton from "@/components/ui/UiButton"
import UiForm, { UiFormItem, UiFormSubmit } from "@/components/ui/UiForm"
import UiInput from "@/components/ui/UiInput"
import CourseChapterEntity from "@/interfaces/CourseChapterEntity"

export type ChapterFormProps = React.PropsWithChildren<{
    onSubmit: (data: any) => void,
    defaultValue?: CourseChapterEntity,
    loading?: boolean,
    count?: number
}>
const ChapterForm = ({
    onSubmit,
    defaultValue,
    loading,
    count = 0,
    children
}: ChapterFormProps) => {

    return (
        <UiForm
            onSubmit={onSubmit}
        >
            <UiFormItem
                label="章节名称"
                name="name"
            >
                <UiInput
                    required
                    defaultValue={defaultValue?.name}
                />
            </UiFormItem>
            <UiFormItem label="排序" name="order">
                <UiInput
                    type="number"
                    defaultValue={!!defaultValue?.order ? parseInt(defaultValue.order + "") : count + 1}
                />
            </UiFormItem>
            <UiFormSubmit>
                <UiButton loading={loading} submit>提交</UiButton>
            </UiFormSubmit>
            {children}
        </UiForm>
    )
}
export default ChapterForm