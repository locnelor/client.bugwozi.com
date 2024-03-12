import UiButton from "@/components/ui/UiButton"
import UiForm, { UiFormItem, UiFormSubmit } from "@/components/ui/UiForm"
import UiInput from "@/components/ui/UiInput"
import UiSelect from "@/components/ui/UiSelect"
import UiTextarea from "@/components/ui/UiTextarea"
import CourseContentEntity from "@/interfaces/CourseContentEntity"
import CourseEntity from "@/interfaces/CourseEntity"
import { useCallback, useEffect, useRef } from "react"


export type ContextFormProps = React.PropsWithChildren<{
    onSubmit: (data: any) => void,
    defaultValue?: CourseContentEntity,
    loading?: boolean,
    course: CourseEntity
}>
const ContextForm = ({
    onSubmit,
    defaultValue,
    loading = false,
    course,
    children
}: ContextFormProps) => {
    const ref = useRef<HTMLInputElement>(null);
    const getDefaultLength = useCallback((index: number = 0) => {
        if (!course.CourseChapter) return "1";
        if (!course.CourseChapter[index]) return "1"
        const len = course.CourseChapter[index].CourseContent?.length;
        if (!len) return "1";
        return len + 1 + "";
    }, [course])
    const onChange = useCallback(({ target }: any) => {
        if (!ref.current) return;
        ref.current.value = getDefaultLength(course.CourseChapter?.findIndex((e) => e.id === Number(target.value)))
    }, [course, getDefaultLength])
    useEffect(() => {
        if (!ref.current) return;
        if (ref.current.value) return;
        ref.current.value = getDefaultLength()
    }, []);
    return (
        <UiForm onSubmit={onSubmit}>
            <UiFormItem
                name="name"
                label="标题"
            >
                <UiInput
                    required
                    defaultValue={defaultValue?.name}
                />
            </UiFormItem>
            <UiFormItem
                name="chapterId"
                label="所属"
            >
                <UiSelect
                    defaultValue={defaultValue?.courseChapterId}
                    required
                    onChange={onChange}
                >
                    {course.CourseChapter?.map(((chapter) => (
                        <option key={chapter.id} value={chapter.id}>
                            {chapter.id}-{chapter.name}
                        </option>
                    )))}
                </UiSelect>
            </UiFormItem>
            <UiFormItem
                name="order"
                label="排序"
            >
                <UiInput
                    ref={ref}
                    required
                    type="number"
                    defaultValue={defaultValue?.order}
                />
            </UiFormItem>
            <UiFormItem
                name="type"
                label="类型"
            >
                <UiSelect
                    defaultValue={defaultValue?.type || "FREE"}
                    required
                >
                    <option value="FREE">免费</option>
                    <option value="PAID">收费</option>
                </UiSelect>
            </UiFormItem>

            <UiFormItem
                name="keywords"
                label="关键字"
            >
                <UiTextarea
                    required
                    defaultValue={defaultValue?.keywords}
                />
            </UiFormItem>
            <UiFormSubmit>
                <UiButton submit loading={loading}>提交</UiButton>
            </UiFormSubmit>
            {children}
        </UiForm>
    )
}
export default ContextForm