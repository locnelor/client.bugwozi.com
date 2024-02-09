import { useCallback, useEffect, useRef, useState } from "react"
import useSelectionFile, { imageSuffix } from "./useSelectionFile"
const useCanvasImage = () => {
    const [file, setFile] = useState<File>()
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [width, height] = [300, 300];
    const [per, setPer] = useState(100);
    const [img, setImg] = useState<HTMLImageElement>();
    const [[x, y], setPosition] = useState([0, 0]);
    const [result, setResult] = useState("");
    const open = useSelectionFile(imageSuffix);
    const upd = useCallback((bool: boolean) => {
        if (!img) return;
        const after = per + (bool ? 1 : -1) * 10
        setPer(after <= 1 ? 1 : after);
        if (x !== 0 || y !== 0) setPosition([0, 0]);
    }, [img, per, x, y]);
    useEffect(() => {
        if (!canvasRef.current) return
        if (!file) return;
        const img = new Image();
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = ({
            target
        }) => {
            if(!target?.result)return;
            img.src = target.result.toString();
            img.onload = () => {
                setImg(img);
            }
        }
    }, [file])
    const fill = useCallback((addX: number, addY: number) => {
        if (!img || !canvasRef.current) return;
        const car = canvasRef.current.getContext("2d");
        if (!car) return;
        car.clearRect(0, 0, width, height);
        let p = img.width / img.height;
        const [w, h] = [width * per / 100,
        (width / p) * per / 100]
        car.drawImage(img,
            (width - w) / 2 + x + addX,
            (height - h) / 2 + y + addY,
            w,
            h
        );
        setResult(canvasRef.current.toDataURL("jpg"));
    }, [img, per])
    useEffect(() => {
        fill(x, y)
    }, [img, per, x, y])
    useEffect(() => {
        if (!canvasRef.current) return
        canvasRef.current.width = width;
        canvasRef.current.height = height;
    }, []);
    const onMoveDown = useCallback(({
        pageX,
        pageY
    }:{
        pageX:number,
        pageY:number
    }) => {
        if (!img) return;
        document.onmousemove = (e) => {
            fill(e.pageX - pageX + x, e.pageY - pageY + y)
        }
        document.onmouseup = (e) => {
            setPosition([x + e.pageX - pageX, y + e.pageY - pageY])
            document.onmousemove = null;
            document.onmouseup = null;
        }
    }, [img, per, x, y]);
    const show = useCallback(() => {
        open((file) => {
            setFile(file);
            setPer(100);
            setPosition([0, 0]);
        })
    }, [])
    return {
        show,
        canvasRef,
        upd,
        onMoveDown,
        result
    }
}
export default useCanvasImage