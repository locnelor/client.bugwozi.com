import UiButton from "@/components/ui/UiButton";
import useClientViewer from "@/hooks/useClientViewer"
import ClassesEntity from "@/interfaces/ClassesEntity";
import { ClassesPower, getPowers } from "@/lib/route";
import { useMemo } from "react";


export type ClassesInformationProps = React.PropsWithChildren<{
    classes: ClassesEntity,
    power: boolean
}>
const ClassesInformation = ({
    classes,
    power
}: ClassesInformationProps) => {
    return (
        <div>
            <div>
                班级名称: {classes.name}
            </div>
            <div>
                {classes.description}
            </div>
            <div>
                群主：{classes.master.name}
            </div>
            <div>
                群人数:{classes.UserOnClasses?.length}
            </div>
            <div className="flex flex-wrap gap-2">
                <div>
                    管理员:
                </div>
                {classes.UserOnClasses?.filter(e => e.isAdmin).map(({ user }) => {
                    return (
                        <div key={user.id}>
                            {user.name}
                        </div>
                    )
                })}
            </div>
            {power && (
                <UiButton>
                    修改信息
                </UiButton>
            )}
        </div>
    )
}
export default ClassesInformation