import UiButton from "@/components/ui/UiButton"
import UiForm, { UiFormItem, UiFormSubmit } from "@/components/ui/UiForm";
import UiInput from "@/components/ui/UiInput";
import UiModal, { UiModalTitle, openInformationModal, useModalEvent } from "@/components/ui/UiModal"
import UserEntity from "@/interfaces/UserEntity";
import { gqlError } from "@/lib/apollo-error";
import { PowerList, getPowers, setPowers } from "@/lib/route";
import { gql, useMutation } from "@apollo/client";
import { useCallback } from "react";

const SetPowerMutation = gql`
    mutation SetPower($id:Int!,$power:Int!){
        setPower(id:$id,power:$power){
            message
        }
    }
`
export type AccountInformationModal = {
    user: UserEntity
}
const AccountInformationModal = ({
    user
}: AccountInformationModal) => {
    const [modalRef, open] = useModalEvent();
    const [setPower] = useMutation(SetPowerMutation, {
        onError(error) {
            gqlError(error)
        },
        onCompleted() {
            openInformationModal(() => ({ children: "修改成功" }))
        }
    })
    const onSubmit = useCallback((data: any) => {
        let power = user.role;
        for (const key in data) {
            const type = PowerList.find(e => e.name === key);
            if (!type) continue;
            power = setPowers(type.power, power, data[key]);
        }
        setPower({
            variables: {
                power,
                id: user.id
            }
        });
    }, [user])
    return (
        <div>
            <UiModal
                ref={modalRef}
            >
                <UiModalTitle>用户权限</UiModalTitle>
                <UiForm
                    onSubmit={onSubmit}
                >
                    {PowerList.map(({ name, power }, key) => (
                        <UiFormItem
                            key={key}
                            name={name}
                            label={name}
                        >
                            <UiInput
                                type="number"
                                defaultValue={getPowers(power, user.role)}
                            />
                        </UiFormItem>
                    ))}
                    <UiFormSubmit>
                        <div className="flex justify-end">
                            <UiButton
                                submit
                            >
                                修改
                            </UiButton>
                        </div>
                    </UiFormSubmit>
                </UiForm>
            </UiModal>
            <UiButton
                onClick={open}
            >
                查看
            </UiButton>
        </div>
    )
}
export default AccountInformationModal