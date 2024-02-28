import CourseForm from "@/components/CourseForm";
import UiButton from "@/components/ui/UiButton";
import UiModal, { useModalEvent, UiModalTitle, openInformationModal } from "@/components/ui/UiModal";
import { fileShear } from "@/lib/img";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { useCallback } from "react";

const AddCourseMutation = gql`
    mutation AddCourse(
        $name:String!,
        $price:Float!,
        $prePrice:Float!,
        $keywords:String!,
        $type:String!,
        $status:String!,
        $avatar:String!
    ){
        addCourse(
            name:$name,
            price:$price,
            prePrice:$prePrice,
            avatar:$avatar,
            type:$type,
            status:$status,
            keywords:$keywords
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
    const onSubmit = useCallback(async ({ price, file, prePrice, ...rest }: any) => {
        const avatar = await fileShear(file, 300, 200);
        addCourse({
            variables: {
                avatar,
                price: parseFloat(price),
                prePrice: parseFloat(!!prePrice ? prePrice : price),
                ...rest
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