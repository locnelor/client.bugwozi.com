
import { Button, Text, TextField } from "@radix-ui/themes";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";

const RichEditor = dynamic(() => import("@/components/editor/RichEditor"), { ssr: false })
const RootPage = () => {
    const t = useTranslations("homePage")
    return (
        <div className="container">
            <RichEditor />
            {t("test")}
        </div>
    )
}
export default RootPage