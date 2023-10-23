import withPage from "@/hooks/withPage";
import { Container } from "@radix-ui/themes";
import { useTranslations } from "next-intl";
import Link from "next/link";



const HomePage = () => {
    const t = useTranslations("home")
    return (
        <Container>
            {t("test")}1
            <Link href="/">
                to index
            </Link>
        </Container>
    )
}
export default HomePage