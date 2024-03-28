"use client"

import { gql, useMutation, useQuery } from "@apollo/client"
import GetCourseByHashKey from "@/queries/GetCourseByHashKey.gql"
import PayQrcodeCard from "@/components/PayQrcodeCard";
import { useCallback } from "react";
import { notFound } from "next/navigation";


const CourseWxNativeQrcode = gql`
    mutation CourseWxNativeQrcode($hash_key:String!){
        courseWxNativeQrcode(hash_key:$hash_key){
            base64
            hash_key
        }
    }
`
const QueryCoursePayMutation = gql`
    mutation QueryCoursePay($hash_key:String!){
        queryCoursePay(hash_key:$hash_key)
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
    if (!!error) notFound();
    const [queryCourse] = useMutation(QueryCoursePayMutation, {
        onCompleted({ queryCoursePay }) {
            if (queryCoursePay) {
                window.location.reload();
            }
        },
    })
    const query = useCallback(() => {
        queryCourse({
            variables: {
                hash_key: QrcodeData?.courseWxNativeQrcode.hash_key
            }
        })
    }, [QrcodeData])
    const refetch = useCallback(() => {
        getQrcode({ variables: { hash_key } })
    }, [])
    return (
        <div
            className="flex h-full w-full justify-center items-center"
        >
            <PayQrcodeCard
                loading={loading}
                base64={QrcodeData?.courseWxNativeQrcode.hash_key}
                refetch={refetch}
                query={query}
                error={QrcodeError}
                title={data?.getCourseByHashKey.name}
                total={data?.getCourseByHashKey.price}
            />
        </div>
    )
}
export default PayCourse