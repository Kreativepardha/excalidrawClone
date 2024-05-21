import { useEffect, useLayoutEffect, useState } from 'react';
import rough from 'roughjs';
import { ACTIONS } from './constant';

const roughGenerator = rough.generator();

export function Canvas({ canvasRef, ctxRef, elements, setElements, action, fillColor }) {
    const [isDrawing, setIsDrawing] = useState(false);
    const [canvasWidth, setCanvasWidth] = useState(0);
    const [canvasHeight, setCanvasHeight] = useState(0);

    useEffect(() => {
        const updateCanvasDimensions = () => {
            setCanvasWidth(window.innerWidth);
            setCanvasHeight(window.innerHeight);
        };

        if (typeof window !== 'undefined') {
            updateCanvasDimensions();
            window.addEventListener('resize', updateCanvasDimensions);
        }

        return () => {
            if (typeof window !== 'undefined') {
                window.removeEventListener('resize', updateCanvasDimensions);
            }
        };
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctxRef.current = ctx;

        ctx.strokeStyle = fillColor;
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';

        // Ensure the canvas dimensions are set correctly
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;

    }, [canvasRef, ctxRef, fillColor, canvasWidth, canvasHeight]);

    useEffect(() => {
        ctxRef.current.strokeStyle = fillColor;
    }, [fillColor]);

    useLayoutEffect(() => {
        const roughCanvas = rough.canvas(canvasRef.current);

        if (elements.length > 0) {
            ctxRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        }
        elements.forEach((element) => {
            if (element.type === ACTIONS.RECTANGLE) {
                roughCanvas.draw(
                    roughGenerator.rectangle(element.offsetX, element.offsetY, element.width, element.height, {
                        stroke: element.stroke,
                        strokeWidth: 2,
                        roughness: 0,
                    })
                );
            } else if (element.type === ACTIONS.CIRCLE) {
                roughCanvas.draw(
                    roughGenerator.ellipse(element.offsetX, element.offsetY, element.width, element.height, {
                        stroke: element.stroke,
                        strokeWidth: 2,
                        roughness: 0,
                    })
                );
            } else if (element.type === ACTIONS.SCRIBBLE) {
                roughCanvas.linearPath(element.path, {
                    stroke: element.stroke,
                    strokeWidth: 2,
                    roughness: 0,
                });
            } else if (element.type === ACTIONS.ARROW) {
                roughCanvas.draw(
                    roughGenerator.line(element.offsetX, element.offsetY, element.width, element.height, {
                        stroke: element.stroke,
                        strokeWidth: 2,
                        roughness: 0,
                    })
                );
            }
        });
    }, [canvasRef, elements]);

    const handleMouseDown = (e) => {
        const { offsetX, offsetY } = e.nativeEvent;
        if (action === ACTIONS.SCRIBBLE) {
            setElements((prevElements) => [
                ...prevElements,
                {
                    type: 'SCRIBBLE',
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
                    type: 'ARROW',
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
                    type: 'RECTANGLE',
                    offsetX,
                    offsetY,
                    width: 0,
                    height: 0,
                    stroke: fillColor,
                },
            ]);
        } else if (action === ACTIONS.CIRCLE) {
            setElements((prevElements) => [
                ...prevElements,
                {
                    type: 'CIRCLE',
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
            } else if (action === ACTIONS.CIRCLE) {
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
            style={{ width: canvasWidth, height: canvasHeight }}
        />
    );
}
