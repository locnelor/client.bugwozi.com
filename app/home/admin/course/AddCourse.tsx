import UiButton from "@/components/ui/UiButton";
import UiForm, { UiFormItem, UiFormSubmit } from "@/components/ui/UiForm";
import UiImage from "@/components/ui/UiImage";
import UiInput from "@/components/ui/UiInput";
import UiModal, { useModalEvent, UiModalTitle } from "@/components/ui/UiModal";
import UiTextarea from "@/components/ui/UiTextarea";
import { file2base64 } from "@/lib/img";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { useCallback } from "react";

const AddCourseMutation = gql`
    mutation AddCourse(
        $name:String!,
        $price:Float!,
        $avatar:String!,
        $description:String,
        $prePrice:Float
    ){
        addCourse(
            name:$name,
            price:$price,
            avatar:$avatar,
            description:$description,
            prePrice:$prePrice
        ){
            id
            hash_key
        }
    }
`

const AddCourse = () => {
    const [modalRef, open, cancel] = useModalEvent();
    const [addCourse, { loading }] = useMutation(AddCourseMutation, {
        onCompleted() {
            cancel()
        },
    })
    const onSubmit = useCallback(async ({ name, price, file, description, prePrice }: any) => {
        const avatar = await file2base64(file);
        addCourse({
            variables: {
                avatar,
                name,
                price: parseFloat(price),
                description,
                prePrice: parseFloat(!!prePrice ? prePrice : price)
            }
        })
    }, []);

    return (
        <div>
            <UiButton loading={loading} onClick={open}>添加课程</UiButton>
            <UiModal
                ref={modalRef}
            >
                <UiModalTitle>添加课程</UiModalTitle>
                <UiForm onSubmit={onSubmit}>
                    <UiFormItem label="封面" name="file">
                        <UiImage width={200} required />
                    </UiFormItem>
                    <UiFormItem
                        name="name"
                        label="课程名"
                    >
                        <UiInput required />
                    </UiFormItem>
                    <UiFormItem
                        name="price"
                        label="课程单价"
                        valueMissing="123"
                        typeMismatch="456"
                    >
                        <UiInput step={.1} type="number" required />
                    </UiFormItem>
                    <UiFormItem
                        name="prePrice"
                        label="优惠价格"
                    >
                        <UiInput step={.1} type="number" />
                    </UiFormItem>
                    <UiFormItem
                        name="description"
                        label="描述"
                    >
                        <UiTextarea />
                    </UiFormItem>
                    <UiFormSubmit>
                        <div className="flex justify-end">
                            <UiButton
                                submit
                            >
                                提交
                            </UiButton>
                        </div>
                    </UiFormSubmit>
                </UiForm>
            </UiModal>
        </div>
    )
}
export default AddCourse