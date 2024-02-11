import Container from "@/components/Container"
import UiButton from "@/components/ui/UiButton"


const CourseType = ["全部", "专升本", "考研"]
const CoursePage = () => {


    return (
        <Container>
            <div className="flex gap-2">
                {CourseType.map((type, key) => (
                    <UiButton
                        key={key}
                        defaultChecked
                        disabled={type === "全部"}
                    >
                        {type}
                    </UiButton>
                ))}
            </div>
        </Container>
    )
}
export default CoursePage