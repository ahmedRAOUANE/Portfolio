"use client";

import { useEffect, useRef } from "react";
import { initSnow } from "./winter/snow";

export default function WinterSnow() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        if (!canvasRef.current) return;

        const cleanup = initSnow(canvasRef.current);
        return cleanup;
    }, []);

    return (
        <canvas
            ref={canvasRef}
            id="snow"
            className="fixed inset-0 -z-1 pointer-events-none bg-background"
        />
    );
}
