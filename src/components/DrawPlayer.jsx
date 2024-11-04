import { useEffect, useRef } from "react";

const DrawPlayer = ({ errors }) => {
    const canvasRef = useRef(null);
    
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        function drawBase() {
            ctx.beginPath();
            ctx.moveTo(10, 240);  // Línea base
            ctx.lineTo(190, 240);
            ctx.stroke();
        }
    
        function drawPost() {
            ctx.beginPath();
            ctx.moveTo(50, 240);  // Poste vertical
            ctx.lineTo(50, 20);
            ctx.lineTo(130, 20);  // Poste horizontal
            ctx.lineTo(130, 50);  // Cuerda
            ctx.stroke();
        }
    
        function drawHead() {
            ctx.beginPath();
            ctx.arc(130, 70, 20, 0, Math.PI * 2);  // Cabeza
            ctx.stroke();
        }
    
        function drawBody() {
            ctx.beginPath();
            ctx.moveTo(130, 90);  // Cuerpo
            ctx.lineTo(130, 150);
            ctx.stroke();
        }
    
        function drawLeftArm() {
            ctx.beginPath();
            ctx.moveTo(130, 100);  // Brazo izquierdo
            ctx.lineTo(110, 130);
            ctx.stroke();
        }
    
        function drawRightArm() {
            ctx.beginPath();
            ctx.moveTo(130, 100);  // Brazo derecho
            ctx.lineTo(150, 130);
            ctx.stroke();
        }
    
        function drawLeftLeg() {
            ctx.beginPath();
            ctx.moveTo(130, 150);  // Pierna izquierda
            ctx.lineTo(110, 180);
            ctx.stroke();
        }
    
        function drawRightLeg() {
            ctx.beginPath();
            ctx.moveTo(130, 150);  // Pierna derecha
            ctx.lineTo(150, 180);
            ctx.stroke();
        }

        const steps = [
            drawBase,
            drawPost,
            drawHead,
            drawBody,
            drawLeftArm,
            drawRightArm,
            drawLeftLeg,
            drawRightLeg
        ]

        for (let i = 0; i < errors; i++) {
            steps[i]();
        }

    }, [errors])

    


    return <canvas id="ahorcadoCanvas" width="200" height="250" ref={canvasRef}></canvas>
}

export default DrawPlayer