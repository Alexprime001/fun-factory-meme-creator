
import { useEffect, useRef } from "react";
import { toast } from "sonner";

interface MemeCanvasProps {
  image: string | null;
  topText: string;
  bottomText: string;
  fontSize: number;
  fontFamily: string;
  textColor: string;
  textAlign: "left" | "center" | "right";
  onExport: (dataUrl: string) => void;
}

export function MemeCanvas({
  image,
  topText,
  bottomText,
  fontSize,
  fontFamily,
  textColor,
  textAlign,
  onExport,
}: MemeCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !image) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.src = image;
    img.onload = () => {
      // Set canvas size to match image
      canvas.width = img.width;
      canvas.height = img.height;

      // Draw image
      ctx.drawImage(img, 0, 0);

      // Configure text style
      ctx.font = `${fontSize}px ${fontFamily}`;
      ctx.fillStyle = textColor;
      ctx.strokeStyle = "black";
      ctx.lineWidth = fontSize / 20;
      ctx.textAlign = textAlign;

      // Draw top text
      const x = textAlign === "left" ? 20 : textAlign === "right" ? canvas.width - 20 : canvas.width / 2;
      if (topText) {
        ctx.strokeText(topText, x, fontSize + 20);
        ctx.fillText(topText, x, fontSize + 20);
      }

      // Draw bottom text
      if (bottomText) {
        ctx.strokeText(bottomText, x, canvas.height - 20);
        ctx.fillText(bottomText, x, canvas.height - 20);
      }
    };
  }, [image, topText, bottomText, fontSize, fontFamily, textColor, textAlign]);

  const handleExport = () => {
    if (!canvasRef.current) return;
    
    try {
      const dataUrl = canvasRef.current.toDataURL("image/png");
      onExport(dataUrl);
      toast.success("Meme exported successfully!");
    } catch (error) {
      toast.error("Failed to export meme. Please try again.");
    }
  };

  return (
    <div className="relative w-full overflow-hidden rounded-lg border bg-white/50 backdrop-blur">
      <canvas
        ref={canvasRef}
        className="max-h-[600px] w-full object-contain"
      />
    </div>
  );
}
