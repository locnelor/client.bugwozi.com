import prisma from "@/lib/prisma";
import ClientPage from "./ClientPage";
import Container from "@/components/Container";

export default async function Home() {
  const users = await prisma.sys_user.findMany();
  const menu = await prisma.sys_menu.findMany();
  return (
    <Container>
      <ClientPage
        users={users}
        menuList={menu}
      />
    </Container>
  );
}
