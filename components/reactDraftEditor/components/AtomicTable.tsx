import withToggleButton from "../hooks/withToggleButton";
import ToggleButton from "./ToggleButton";
import withAtomic from "../hooks/withAtomic";
import UiTooltip from "./ui/UiTooltip";
import { useCallback, useState } from "react";
import classNames from "classnames";
import { insertBlock, mergeBlock } from "../hooks/blockUtil";
import openModal from "./openModal";
import UiButton from "./ui/UiButton";
import UiTable from "./ui/UiTable";
import UiInput from "./ui/UiInput";
import { TableFile } from "@icon-park/react";

const EditTable = ({
    onFinish,
    table,
    head
}: {
    onFinish: (table: string[][], head: string[]) => any,
    table: string[][],
    head: string[]
}) => {
    const [data, setData] = useState<string[][]>(() => {
        return new Array(table.length).fill("").map((_, i) => {
            return [...table[i]]
        })
    })
    const [headData, setHead] = useState<string[]>([...head])
    const onSubmit = useCallback(() => {
        onFinish(data, headData);
    }, [data, headData, onFinish]);
    const onChangeHead = useCallback((index: number, { target: { value } }: any) => {
        headData[index] = value;
        setHead([...headData]);
    }, [headData])
    const onChangeData = useCallback((row: number, col: number, { target: { value } }: any) => {
        data[row][col] = value;
        setData([...data.map(e => [...e])]);
    }, [data]);
    return (
        <div>
            <div className="w-full overflow-x-auto">
                <div style={{ minWidth: data[0].length * 100 + "px" }}>
                    <UiTable className="min-w-full">
                        <thead>
                            <tr>
                                {headData.map((value, key) => (
                                    <th className="min-w-3" key={key}>
                                        <UiInput
                                            className="min-w-3"
                                            value={value}
                                            onChange={onChangeHead.bind(null, key)}
                                        />
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((line, row) => {
                                return (
                                    <tr key={row}>
                                        {line.map((value, col) => (
                                            <td className="min-w-3" key={`${row}-${col}`}>
                                                <UiInput
                                                    value={value}
                                                    onChange={onChangeData.bind(null, row, col)}
                                                />
                                            </td>
                                        ))}
                                    </tr>
                                )
                            })}
                        </tbody>
                    </UiTable>
                </div>
            </div>
            <div className="flex mt-2 justify-end">
                <UiButton
                    onClick={onSubmit}
                >
                    提交
                </UiButton>
            </div>
        </div>
    )
}
export type AtomicBlockTableData = {
    table: string[][],
    head: string[]
}
export const AtomicBlockTable = withAtomic<AtomicBlockTableData>(({
    data: {
        table,
        head
    },
    blockProps: {
        editorState,
        onChange,
        readOnly
    },
    block
}) => {
    const onDoubleClick = useCallback(() => {
        if (readOnly) return;
        const onFinish = (table: string[][], head: string[]) => {
            onChange(mergeBlock(
                block,
                editorState,
                {
                    table,
                    head
                }))
            destory();
        }
        const destory = openModal({
            title: "编辑表格",
            context: (
                <EditTable
                    table={table}
                    head={head}
                    onFinish={onFinish}
                />
            )
        })
    }, [editorState, onChange, readOnly, table, head, block])
    return (
        <div className="overflow-x-auto overflow-y-auto" onDoubleClick={onDoubleClick}>
            <UiTable>
                <thead>
                    <tr>
                        {head.map((value, key) => (
                            <th key={key}>
                                {value}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {table.map((line, row) => {
                        return (
                            <tr key={row}>
                                {line.map((value, col) => (
                                    <td key={`${row}-${col}`}>
                                        {value}
                                    </td>
                                ))}
                            </tr>
                        )
                    })}
                </tbody>
            </UiTable>
        </div>
    )
})
export const TableBlockName = "Table"
const Table = withToggleButton(({
    editorState,
    onChange,
    className
}) => {
    const [index, setIndex] = useState(-1);
    const onMouseEnter = useCallback((index: number) => {
        setIndex(index)
    }, []);
    const onClick = useCallback((index: number) => {
        const row = Math.floor(index / 10) + 1;
        const col = index % 10 + 1;
        const table = new Array(row).fill(0).map(() => new Array(col).fill("1"));
        insertBlock(onChange, editorState, TableBlockName, {
            table,
            head: new Array(col).fill("")
        });
    }, [editorState, onChange]);
    return (
        <UiTooltip
            trigger={(
                <ToggleButton
                    value={TableBlockName}
                    className={className}
                >
                    <TableFile />
                </ToggleButton>
            )}
        >
            {index !== -1 ? `${Math.floor(index / 10) + 1}x${index % 10 + 1}` : "0x0"}
            {new Array(10).fill(0).map((_, row) => {
                return (
                    <div className="grid grid-cols-10 gap-1 mb-1" key={row}>
                        {new Array(10).fill(0).map((_, col) => (
                            <div
                                className={classNames(
                                    "w-5 h-5 border cursor-pointer",
                                    (Math.floor(index / 10) >= row && (index % 10) >= col) ? "bg-blue-600" : ""
                                )}
                                key={`${row}-${col}`}
                                onMouseOver={onMouseEnter.bind(null, row * 10 + col)}
                                onClick={onClick.bind(null, (row * 10 + col))}
                            />
                        ))}
                    </div>
                )
            })}
        </UiTooltip>
    )
})
export default Table