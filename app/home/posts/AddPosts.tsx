import CourseForm from "@/components/CourseForm";
import PostsForm from "@/components/PostsForm";
import UiButton from "@/components/ui/UiButton";
import UiModal, { useModalEvent, UiModalTitle, openInformationModal } from "@/components/ui/UiModal";
import { file2base64, fileShear } from "@/lib/img";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { useCallback } from "react";

const AddPostsMutation = gql`
    mutation AddPosts(
        $name:String!,
        $description:String,
        $status:String!,
        $keywords:[String!]!,
        $avatar:String!
    ){
        addPosts(
            name:$name,
            description:$description,
            status:$status,
            keywords:$keywords,
            avatar:$avatar
        ){
            id
            hash_key
        }
    }
`

const AddPosts = ({ refetch }: { refetch: () => void }) => {
    const [modalRef, open, cancel] = useModalEvent();
    const [addPosts, { loading }] = useMutation(AddPostsMutation, {
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
    const onSubmit = useCallback(async ({ file, ...rest }: any) => {
        // const avatar = await fileShear(file, 300, 200);
        // addPosts({
        //     variables: {
        //         avatar,
        //         price: parseFloat(price),
        //         prePrice: parseFloat(!!prePrice ? prePrice : price),
        //         ...rest
        //     }
        // })
        console.log(rest)
    }, []);

    return (
        <div>
            <UiButton onClick={open}>添加文章</UiButton>
            <UiModal
                ref={modalRef}
            >
                <UiModalTitle>添加文章</UiModalTitle>
                {/* <CourseForm
                    onSubmit={onSubmit}
                    loading={loading}
                /> */}
                <PostsForm
                    onSubmit={onSubmit}
                />
            </UiModal>
        </div>
    )
}
export default AddPosts