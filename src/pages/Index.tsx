
import { useState } from "react";
import { ImageUpload } from "@/components/ImageUpload";
import { TextControls } from "@/components/TextControls";
import { MemeCanvas } from "@/components/MemeCanvas";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export default function Index() {
  const [image, setImage] = useState<string | null>(null);
  const [topText, setTopText] = useState("");
  const [bottomText, setBottomText] = useState("");
  const [fontSize, setFontSize] = useState(42);
  const [fontFamily, setFontFamily] = useState("Impact");
  const [textColor, setTextColor] = useState("#ffffff");
  const [textAlign, setTextAlign] = useState<"left" | "center" | "right">("center");

  const handleImageSelect = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleExport = (dataUrl: string) => {
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = "meme.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 p-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <header className="text-center">
          <h1 className="mb-2 text-4xl font-bold">Meme Generator</h1>
          <p className="text-lg text-gray-600">Create and customize your memes</p>
        </header>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-8">
            {!image ? (
              <ImageUpload onImageSelect={handleImageSelect} />
            ) : (
              <div className="space-y-4">
                <MemeCanvas
                  image={image}
                  topText={topText}
                  bottomText={bottomText}
                  fontSize={fontSize}
                  fontFamily={fontFamily}
                  textColor={textColor}
                  textAlign={textAlign}
                  onExport={handleExport}
                />
                <Button
                  onClick={() => handleExport}
                  className="w-full"
                  size="lg"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download Meme
                </Button>
              </div>
            )}
          </div>

          <div>
            <TextControls
              topText={topText}
              bottomText={bottomText}
              fontSize={fontSize}
              fontFamily={fontFamily}
              textColor={textColor}
              textAlign={textAlign}
              onTopTextChange={setTopText}
              onBottomTextChange={setBottomText}
              onFontSizeChange={setFontSize}
              onFontFamilyChange={setFontFamily}
              onTextColorChange={setTextColor}
              onTextAlignChange={setTextAlign}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
