

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
export const base64Shear = async (base64: string, w: number, h?: number) => {
    const img = new Image();
    img.src = `data:image/png;base64,${base64}`
    return await new Promise<string>((resolve) => {
        img.onload = () => {
            const canvas = document.createElement("canvas");
            const imgHeight = img.height / (img.width / w)
            const height: number = !h ? imgHeight : h;
            canvas.width = w;
            canvas.height = height
            const car = canvas.getContext("2d");
            if (!car) return resolve("");
            car.drawImage(img, 0, (height - imgHeight) / 2, canvas.width, imgHeight)
            const data = canvas.toDataURL("png");
            resolve(data.slice(data.indexOf(",") + 1));
        }
    })

}
export const fileShear = async (file: File, width: number, height?: number) => {
    const base64 = await file2base64(file);
    return await base64Shear(base64, width, height)
}