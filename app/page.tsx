import CourseEntity from "@/interfaces/CourseEntity";
import { getQuery } from "@/lib/client";
import { Metadata } from "next";
import SelCourse from "@/queries/SelCourse.gql"
import Container from "@/components/Container";
import CourseContext from "@/components/CourseContext";

export const metadata: Metadata = {
  title: "Bug窝子"
}

const HomePage = async () => {
  const { data } = await getQuery<{
    selCourse: CourseEntity[]
  }>(SelCourse)
  return (
    <Container>
      {/* <div className="flex flex-wrap justify-center gap-5">
        <div className="grow h-96 skeleton min-w-96">

        </div>
        <div className="skeleton h-96 max-w-full w-96">

        </div>
      </div> */}
      <div className="mt-5">
        <CourseContext
          course={data?.selCourse || []}
        />
      </div>
    </Container>
  );
}
export default HomePage
