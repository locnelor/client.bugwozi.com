"use client"

import UiTabs, { UiTabsItem } from "@/components/ui/UiTabs";
import { PageProps } from "@/interfaces/page";
import ClassesInfoBy from "@/queries/ClassesInfoBy.gql"
import { useQuery } from "@apollo/client";
import ClassesInformation from "./ClassesInformation";
import { useMemo } from "react";
import ClassesEmpty from "./ClassesEmpty";
import ClassesMembers from "./ClassesMembers";
import useClientViewer from "@/hooks/useClientViewer";
import { getPowers, ClassesPower } from "@/lib/route";
import ClassesEntity from "@/interfaces/ClassesEntity";

const ClassesIdPage = ({
    params: {
        hash_key
    }
}: PageProps<{}, { hash_key: string }>) => {
    const {
        data: classesQuery,
        loading,
        refetch
    } = useQuery(ClassesInfoBy, { variables: { hash_key } })
    const { data } = useClientViewer();
    const classes: ClassesEntity = useMemo(() => classesQuery?.getClassesInfoBy, [classesQuery]);
    const power = useMemo(() => {
        if (!data) return false;
        if (!classes) return false;
        const n = getPowers(ClassesPower, data.viewer.role)
        return data.viewer.id === classes.masterId || n >= 2;
    }, [data, classesQuery])
    const isAdmin = useMemo(() => {
        if (!data || !classes) return power;
        return power || !!(classes.UserOnClasses?.find(e => e.userId === data.viewer.id)?.isAdmin)
    }, [data, classesQuery, power])
    if (!!classesQuery && !classes) return <ClassesEmpty />
    if (loading) return (
        <div className="skeleton w-full h-32"></div>
    )
    return (
        <div>
            <div className="flex">
                <UiTabs>
                    <UiTabsItem name="班级信息">
                        <ClassesInformation
                            classes={classes}
                            power={power}
                        />
                    </UiTabsItem>
                    <UiTabsItem name="成员列表">
                        <ClassesMembers
                            classes={classes}
                            power={isAdmin || power}
                            refetch={refetch}
                        />
                    </UiTabsItem>
                    <UiTabsItem name="任务中心">
                        3
                    </UiTabsItem>
                </UiTabs>
            </div>
        </div>
    )
}
export default ClassesIdPage