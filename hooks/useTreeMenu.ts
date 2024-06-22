import { SysMenuEntity } from "@/interfaces/SysMenuEntity";
import { useCallback, useMemo } from "react";

const useTreeMenu = (menuList: SysMenuEntity[]) => {
    const getTree = useCallback((arr: SysMenuEntity[], parent?: number) => {
        const target = arr.filter(e => e.parentId == parent).map(e => ({ ...e, key: e.id }));
        const other = arr.filter(e => e.parentId !== parent);
        for (const item of target) item.children = getTree(other, item.id);
        return target;
    }, [])
    const tree = useMemo(() => getTree(menuList), [menuList])
    return tree;
}
export default useTreeMenu