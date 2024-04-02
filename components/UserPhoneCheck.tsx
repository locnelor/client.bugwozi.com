import UserEntity from "@/interfaces/UserEntity"
import UiButton from "./ui/UiButton"
import { gql, useMutation } from "@apollo/client"
import { useCallback } from "react"

const CheckUserPhoneMutation = gql`
    mutation CheckUserPhone($user_id:Int!){
        checkUserPhone(user_id:$user_id)
    }
`
const UserPhoneCheck = ({
    user
}: {
    user: UserEntity
}) => {
    const [check, { data, loading }] = useMutation(CheckUserPhoneMutation)
    const onClick = useCallback(() => {
        check({
            variables: {
                user_id: user.id
            }
        })
    }, [user])
    if(!!data)return (
        <div>
            {data.checkUserPhone}
        </div>
    )
    return (
        <UiButton loading={loading} onClick={onClick}>
            点击查看
        </UiButton>
    )
}
export default UserPhoneCheck