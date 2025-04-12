import { useEffect, useRef } from "react";

interface CanvasAreaProps {
  image: string | null;
}

function CanvasArea({ image }: CanvasAreaProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!image) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const img = new Image();

    img.onload = () => {
      if (!canvas || !ctx) return;

      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
    };

    img.src = image;
  }, [image]);

  return (
    <div className="flex justify-center">
      <canvas ref={canvasRef} className="border shadow-lg rounded-lg" />
    </div>
  );
}

export default CanvasArea;
