import { Form, FormControl, FormField, FormLabel, FormMessage, FormProps, FormSubmit } from "@radix-ui/react-form";
import { FormEvent, PropsWithChildren, forwardRef, useCallback } from "react";


export type UiFormData = { [k in string]: any }
export type UiFormProps = FormProps &
    React.RefAttributes<HTMLFormElement> &
{ onSubmit: (data: UiFormData) => void }
const UiForm = forwardRef<
    HTMLFormElement,
    UiFormProps
>(({ children, onSubmit, ...rest }, ref) => {
    const onFormSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.currentTarget));
        onSubmit(data);
    }, [])
    return (
        <Form ref={ref} onSubmit={onFormSubmit} {...rest}>
            {children}
        </Form>
    )
})
export default UiForm
UiForm.displayName = "UiForm"

export type UiFormItemProps = PropsWithChildren<{
    name: string,
    label?: string,
    valueMissing?: string,
    typeMismatch?: string,
    match?: (value: string, formData: any) => boolean,
    matchMessage?: string,
    serverInvalid?: string
}>
export const UiFormItem = ({
    name,
    children,
    label,
    valueMissing,
    typeMismatch,
    match,
    matchMessage,
    serverInvalid
}: UiFormItemProps) => {
    return (
        <FormField className="mb-3" name={name}>
            <div className="flex items-baseline justify-between">
                {!!label && <FormLabel className="text-[15px] font-medium leading-[35px]">
                    {label}
                </FormLabel>}
                {!!valueMissing && <FormMessage className="text-[13px] opacity-[0.8]" match="valueMissing">
                    {valueMissing}
                </FormMessage>}
                {!!typeMismatch && <FormMessage className="text-[13px] opacity-[0.8]" match="typeMismatch">
                    {typeMismatch}
                </FormMessage>}
                {!!matchMessage && !!match && <FormMessage className="text-[13px] opacity-[0.8]" match={match}>
                    {matchMessage}
                </FormMessage>}
            </div>
            <FormControl asChild>
                {children}
            </FormControl>
            {!!serverInvalid && <FormMessage>
                {serverInvalid}
            </FormMessage>}
        </FormField>
    )
}
export const UiFormSubmit = ({ children }: PropsWithChildren) => {
    return (
        <FormSubmit className="mt-6" asChild>
            {children}
        </FormSubmit>
    )
}