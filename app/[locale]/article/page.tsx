import { Container } from "@radix-ui/themes"
import { useTranslations } from "next-intl"


const ArticlePage = () => {
    const t = useTranslations("articlePage")
    return (
        <Container>
            {t("test")}
        </Container>
    )
}
export default ArticlePage