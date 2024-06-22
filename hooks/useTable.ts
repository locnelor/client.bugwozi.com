import { useMemo } from "react"


export const useColumns = <T>(data: T[]) => {
    const columns = useMemo(() => data.map((item, key) => ({ key, ...item })), [data])
    return columns
}
export const useDataSource = <T>(data: T[]) => {
    const dataSource = useMemo(() => data.map((item, key) => ({ key, ...item })), [data]);
    return dataSource
}