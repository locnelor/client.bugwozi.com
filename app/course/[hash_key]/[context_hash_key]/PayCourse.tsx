"use client"

import { gql, useMutation, useQuery } from "@apollo/client"
import GetCourseByHashKey from "@/queries/GetCourseByHashKey.gql"
import PayQrcodeCard from "@/components/PayQrcodeCard";


const CourseWxNativeQrcode = gql`
    mutation CourseWxNativeQrcode($hash_key:String!){
        courseWxNativeQrcode(hash_key:$hash_key){
            base64
            hash_key
        }
    }
`
const PayCourse = ({
    hash_key
}: { hash_key: string }) => {
    const {
        data,
        loading,
        error
    } = useQuery(GetCourseByHashKey, {
        variables: {
            hash_key
        }
    });
    const [getQrcode, {
        data: QrcodeData,
        error: QrcodeError
    }] = useMutation(CourseWxNativeQrcode)

    return (
        <div
            className="flex h-full w-full justify-center items-center"
        >
            <PayQrcodeCard
                loading={loading}
                title={data?.getCourseByHashKey.name}
                total={data?.getCourseByHashKey.price}
            />

        </div>
    )
}
export default PayCourse