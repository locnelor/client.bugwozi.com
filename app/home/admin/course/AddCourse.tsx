import CourseForm from "@/components/CourseForm";
import UiButton from "@/components/ui/UiButton";
import UiForm, { UiFormItem, UiFormSubmit } from "@/components/ui/UiForm";
import UiImage from "@/components/ui/UiImage";
import UiInput from "@/components/ui/UiInput";
import UiModal, { useModalEvent, UiModalTitle, openInformationModal } from "@/components/ui/UiModal";
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
        $prePrice:Float!
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

const AddCourse = ({ refetch }: { refetch: () => void }) => {
    const [modalRef, open, cancel] = useModalEvent();
    const [addCourse, { loading }] = useMutation(AddCourseMutation, {
        onCompleted() {
            cancel()
            refetch()
        },
        onError(error) {
            openInformationModal(() => ({
                title: "添加失败",
                children: error.message
            }))
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
            <UiButton onClick={open}>添加课程</UiButton>
            <UiModal
                ref={modalRef}
            >
                <UiModalTitle>添加课程</UiModalTitle>
                <CourseForm
                    onSubmit={onSubmit}
                    loading={loading}
                />
            </UiModal>
        </div>
    )
}
export default AddCourse