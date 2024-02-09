
import { redirect } from "next/navigation";
import { getViewer } from "./useViewer";
export const authQuery = async (back = "/home") => {
    const { error, data } = await getViewer();
    if (!!error || !data) return redirect(`/auth?back=${encodeURI(back)}`)
    return data
}