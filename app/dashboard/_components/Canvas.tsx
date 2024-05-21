import { useEffect, useLayoutEffect, useState } from 'react';
import rough from 'roughjs';
import { ACTIONS } from './constant';

const roughGenerator = rough.generator();

export function Canvas({ canvasRef, ctxRef, elements, setElements, action ,fillColor}) {
    const [isDrawing, setIsDrawing] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        ctxRef.current = ctx;
        
        ctx.strokeStyle = fillColor;
        ctx.lineWidth = 2;
        ctx.lineCap = "round"

        const setCanvasDim = () => {
            const canvasWidth = 800; // Set desired canvas width
            const canvasHeight = 600; // Set desired canvas height
            canvas.width = canvasWidth;
            canvas.height = canvasHeight;
            ctx.scale(1, 1); // Adjust as necessary for high DPI
        };

        setCanvasDim();
        window.addEventListener("resize", setCanvasDim);

        return () => {
            window.removeEventListener("resize", setCanvasDim);
        };
    }, []);
    useEffect(() => {
        ctxRef.current.strokeStyle = fillColor;

    },[fillColor])

    useLayoutEffect(() => {
        const roughCanvas = rough.canvas(canvasRef.current);

        if (elements.length > 0) {
            ctxRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        }
        elements.forEach((element) => {
            if (element.type === ACTIONS.RECTANGLE) {
                roughCanvas.draw(
                    roughGenerator.rectangle(element.offsetX, element.offsetY, element.width, element.height,{
                        stroke: element.stroke,
                        strokeWidth:2,
                        roughness:0
                    })
                );
            } else if(element.type === ACTIONS.CIRCLE){
                roughCanvas.draw(
                    roughGenerator.ellipse(element.offsetX, element.offsetY, element.width, element.height,{
                        stroke: element.stroke,
                        strokeWidth:2,
                        roughness:0
                    })
                );
            }
            else if (element.type === ACTIONS.SCRIBBLE) {
                roughCanvas.linearPath(element.path,{
                    stroke: element.stroke,
                    strokeWidth:2,
                    roughness:0
                });
            } else if (element.type === ACTIONS.ARROW) {
                roughCanvas.draw(
                    roughGenerator.line(element.offsetX, element.offsetY, element.width, element.height,{
                        stroke: element.stroke,
                        strokeWidth:2,
                        roughness:0
                    })
                );
            }
        });
    }, [elements]);

    const handleMouseDown = (e) => {
        const { offsetX, offsetY } = e.nativeEvent;
        if (action === ACTIONS.SCRIBBLE) {
            setElements((prevElements) => [
                ...prevElements,
                {
                    type: "SCRIBBLE",
                    offsetX,
                    offsetY,
                    path: [[offsetX, offsetY]],
                    stroke: fillColor,
                },
            ]);
        } else if (action === ACTIONS.ARROW) {
            setElements((prevElements) => [
                ...prevElements,
                {
                    type: "ARROW",
                    offsetX,
                    offsetY,
                    width: offsetX,
                    height: offsetY,
                    stroke: fillColor,
                },
            ]);
        } else if (action === ACTIONS.RECTANGLE) {
            setElements((prevElements) => [
                ...prevElements,
                {
                    type: "RECTANGLE",
                    offsetX,
                    offsetY,
                    width: 0,
                    height: 0,
                    stroke: fillColor,
                },
            ]);
        } else if (action === ACTIONS.CIRCLE){
            setElements((prevElements) => [
                ...prevElements,
                {
                    type: "CIRCLE",
                    offsetX,
                    offsetY,
                    width: 0,
                    height: 0,
                    stroke: fillColor,
                },
            ]);
        }
        setIsDrawing(true);
    };

    const handleMouseMove = (e) => {
        const { offsetX, offsetY } = e.nativeEvent;
        if (isDrawing) {
            if (action === ACTIONS.SCRIBBLE) {
                const { path } = elements[elements.length - 1];
                const newPath = [...path, [offsetX, offsetY]];
                setElements((prevElements) =>
                    prevElements.map((ele, index) => {
                        if (index === elements.length - 1) {
                            return {
                                ...ele,
                                path: newPath,
                            };
                        } else {
                            return ele;
                        }
                    })
                );
            } else if (action === ACTIONS.ARROW) {
                setElements((prevElements) =>
                    prevElements.map((ele, index) => {
                        if (index === elements.length - 1) {
                            return {
                                ...ele,
                                width: offsetX,
                                height: offsetY,
                            };
                        } else {
                            return ele;
                        }
                    })
                );
            } else if (action === ACTIONS.RECTANGLE) {
                setElements((prevElements) =>
                    prevElements.map((ele, index) => {
                        if (index === elements.length - 1) {
                            return {
                                ...ele,
                                width: offsetX - ele.offsetX,
                                height: offsetY - ele.offsetY,
                            };
                        } else {
                            return ele;
                        }
                    })
                );
            } else if(action === ACTIONS.CIRCLE){
                 setElements((prevElements) =>
                    prevElements.map((ele, index) => {
                        if (index === elements.length - 1) {
                            return {
                                ...ele,
                                width: offsetX - ele.offsetX,
                                height: offsetY - ele.offsetY,
                            };
                        } else {
                            return ele;
                        }
                    })
                );
            }
        }
    };

    const handleMouseUp = () => {
        setIsDrawing(false);
    };

    return (
        <canvas
            ref={canvasRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            className='overflow-hidden'
            style={{ width: window.innerWidth, height: window.innerHeight }}
        />
    );
}
