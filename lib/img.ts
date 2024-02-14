

export const file2base64 = (file: File) => {
    return new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = ({
            target
        }) => {
            const base64 = target?.result?.toString() || ""
            resolve(base64.slice(base64.indexOf(",") + 1));
        }
    })
}