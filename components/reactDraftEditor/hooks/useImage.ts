import { useCallback } from "react"


const useImage = () => {
    const getImage = useCallback(() => {
        return new Promise<File>((resolve, rejects) => {
            const input = document.createElement("input")
            input.type = "file"
            input.click();
            input.onchange = () => {
                const files = input.files;
                if (!files) return rejects();
                else resolve(files[0]);
            }
        })
    }, []);
    return getImage
}

const suffixs = [".png", ".jpg", ".jpeg"]
export const fileToBase64 = (file: File) => {
    return new Promise<string>((resolve, rejects) => {
        const suffix = file.name.slice(file.name.lastIndexOf(".")).toLowerCase();
        if (!suffixs.some(e => e === suffix)) {
            rejects("请选择 " + suffixs.join(" ") + " 类型的图片");
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            resolve(e.target?.result?.toString() || "");
        }
        reader.readAsDataURL(file);
    })
}
export const IMAGE_MAX = 1200
export const fileToCanvas = (file: File) => {
    return new Promise<HTMLCanvasElement>((resolve, rejects) => {
        fileToBase64(file)
            .then((base64) => {
                const img = new Image();
                img.src = base64;
                img.onload = () => {
                    const canvas = document.createElement("canvas");
                    const car = canvas.getContext("2d");
                    if (!car) return;
                    canvas.width = img.width > IMAGE_MAX ? IMAGE_MAX : img.width;
                    canvas.height = (canvas.width / img.width) * img.height;
                    car.drawImage(img, 0, 0, canvas.width, canvas.height);
                    resolve(canvas);
                }
            })
            .catch(rejects)
    })
}

export default useImage
