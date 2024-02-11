import { useCallback } from "react"

export type UiTableProps = {
    data?: any[],
    columns: {
        title?: React.ReactNode,
        dataIndex?: string,
        render?: (line: any, data: any[]) => React.ReactNode
    }[],
    selected?: any[],
    onSelected?: (selected: any[]) => any
}
const UiTable = ({
    data = [],
    columns,
    selected,
    onSelected
}: UiTableProps) => {
    const onChange = useCallback((e:any)=>{
        
    },[])
    return (
        <div className="overflow-x-auto">
            <table className="table tables-zebra">
                <thead>
                    <tr>
                        {!!onSelected && (
                            <th>
                            </th>
                        )}
                        {columns.map(({
                            title
                        }, key) => (
                            <th key={key}>
                                {title}
                            </th>
                        ))}
                    </tr>
                </thead>
                {data.map((line, row) => {
                    return (
                        <tr key={row}>
                            {!!onSelected && (
                                <th>
                                    <label>
                                        <input onChange={onChange} type="checkbox" className="checkbox" />
                                    </label>
                                </th>
                            )}
                            {columns.map(({
                                render,
                                dataIndex
                            }, col) => {
                                return (
                                    <th key={`${row}_${col}`}>
                                        {!!render ? render((!!dataIndex && line[dataIndex]) || line, data) : (!!dataIndex && line[dataIndex])}
                                    </th>
                                )
                            })}
                        </tr>
                    )
                })}
            </table>
        </div>
    )
}
export default UiTable