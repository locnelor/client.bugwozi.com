// import { message } from "antd";
import { useCallback } from "react"


export const imageSuffix = ["jpg", "jpeg", "png", "gif"];
const useSelectionFile = (suffixs?: string[]) => {
    const open = useCallback((callback: (file: File) => void) => {
        const input = document.createElement("input");
        input.type = "file";
        input.onchange = () => {
            if(!input.files)return;
            const file = input.files[0];
            if (!!suffixs) {
                const name = file.name;
                const suffix = name.slice(name.lastIndexOf(".") + 1);
                if (!suffixs.some(e => e === suffix)) {
                    // return message.error(`非法的文件后缀，请选择 ${suffixs.join("、")} 类型的文件`)
                    return;
                }
            }
            callback(file);
        }
        input.click();
    }, [suffixs]);
    return open
}
export default useSelectionFile
