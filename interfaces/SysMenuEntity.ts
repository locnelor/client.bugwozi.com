import { sys_menu } from "@prisma/client";


export interface SysMenuEntity extends sys_menu {
    children?: SysMenuEntity[]
    key?: number
}