# next-apollo-init

初始化：

```bash
yarn
or
npm i

npx prisma migrate dev --name init
```

修改prisma/schema.prisma内容:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}
```

.env文件

```bash
DATABASE_URL = "mysql://root:root1234@localhost:3306/init_apollo"
```
