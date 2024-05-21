'use client'
import { useRef, useState } from "react";
import { TbRectangle } from "react-icons/tb";
import { IoMdDownload } from "react-icons/io";
import { FaLongArrowAltRight } from "react-icons/fa";
import { LuPencil } from "react-icons/lu";
import { FaArrowPointer } from "react-icons/fa6";
import { FaRegCircle } from "react-icons/fa6";
import { ACTIONS } from "./constant";
import { Canvas } from "./Canvas";
import { FaTrash } from "react-icons/fa";

export default function Appbar() {
    const [action, setAction] = useState(ACTIONS.SELECT);
    const [fillColor, setFillColor] = useState("#FFFFFF");

    const canvasRef = useRef(null);
    const ctxRef = useRef(null);
    const [elements, setElements] = useState([]);

    function handleCanvasClear(){
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        ctx.fillRect = "yellow";
        ctx.clearRect(0,0,canvasRef.current.width,canvasRef.current.height)
        setElements([])
    }
    return (
        <div className="relative w-full h-screen ">
            <div className="absolute top-0 z-10 w-full py-2 ">
                <div className="flex justify-center items-center bg-yellow-200 gap-3 py-2 px-3 w-fit mx-auto  rounded-lg shadow-2xl border-third border-2">
                    <button className={action === ACTIONS.SELECT ? "bg-violet-300 p-1 rounded" : "p-1 hover:bg-violet-100 rounded"} onClick={() => setAction(ACTIONS.SELECT)}>
                        <FaArrowPointer size={"2rem"} />
                    </button>
                    <button className={action === ACTIONS.RECTANGLE ? "bg-violet-300 p-1 rounded" : "p-1 hover:bg-violet-100 rounded"} onClick={() => setAction(ACTIONS.RECTANGLE)}>
                        <TbRectangle size={"2rem"} />
                    </button>
                    <button className={action === ACTIONS.CIRCLE ? "bg-violet-300 p-1 rounded" : "p-1 hover:bg-violet-100 rounded"} onClick={() => setAction(ACTIONS.CIRCLE)}>
                        <FaRegCircle size={"1.5rem"} />
                    </button>
                    <button className={action === ACTIONS.ARROW ? "bg-violet-300 p-1 rounded" : "p-1 hover:bg-violet-100 rounded"} onClick={() => setAction(ACTIONS.ARROW)}>
                        <FaLongArrowAltRight size={"2rem"} />
                    </button>
                    <button className={action === ACTIONS.SCRIBBLE ? "bg-violet-300 p-1 rounded" : "p-1 hover:bg-violet-100 rounded"} onClick={() => setAction(ACTIONS.SCRIBBLE)}>
                        <LuPencil size={"1.5rem"} />
                    </button>
                    <button>
                        <input className="w-6 h-6" type="color" value={fillColor} onChange={(e) => setFillColor(e.target.value)} />
                    </button>
                    <button onClick={handleCanvasClear}>
                        <FaTrash size={"1.3rem"} />
                    </button>
                </div>
            </div>
            <div className="h-full w-full bg-fourth pt-[50px] flex justify-center absolute items-center">
                <Canvas
                    canvasRef={canvasRef}
                    ctxRef={ctxRef}
                    elements={elements}
                    setElements={setElements}
                    action={action}
                    fillColor={fillColor}
                    
                />
            </div>
        </div>
    );
}
