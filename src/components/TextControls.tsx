
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Slider } from "./ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Button } from "./ui/button";
import { AlignLeft, AlignCenter, AlignRight } from "lucide-react";

interface TextControlsProps {
  topText: string;
  bottomText: string;
  fontSize: number;
  fontFamily: string;
  textColor: string;
  textAlign: "left" | "center" | "right";
  onTopTextChange: (text: string) => void;
  onBottomTextChange: (text: string) => void;
  onFontSizeChange: (size: number) => void;
  onFontFamilyChange: (font: string) => void;
  onTextColorChange: (color: string) => void;
  onTextAlignChange: (align: "left" | "center" | "right") => void;
}

const FONT_OPTIONS = [
  { value: "Impact", label: "Impact" },
  { value: "Arial", label: "Arial" },
  { value: "Comic Sans MS", label: "Comic Sans" },
  { value: "Helvetica", label: "Helvetica" },
  { value: "Times New Roman", label: "Times New Roman" },
];

export function TextControls({
  topText,
  bottomText,
  fontSize,
  fontFamily,
  textColor,
  textAlign,
  onTopTextChange,
  onBottomTextChange,
  onFontSizeChange,
  onFontFamilyChange,
  onTextColorChange,
  onTextAlignChange,
}: TextControlsProps) {
  return (
    <div className="space-y-6 rounded-lg border p-6 backdrop-blur">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="topText">Top Text</Label>
          <Input
            id="topText"
            value={topText}
            onChange={(e) => onTopTextChange(e.target.value)}
            placeholder="Enter top text"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="bottomText">Bottom Text</Label>
          <Input
            id="bottomText"
            value={bottomText}
            onChange={(e) => onBottomTextChange(e.target.value)}
            placeholder="Enter bottom text"
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Font Size ({fontSize}px)</Label>
          <Slider
            value={[fontSize]}
            onValueChange={(value) => onFontSizeChange(value[0])}
            min={12}
            max={72}
            step={1}
          />
        </div>

        <div className="space-y-2">
          <Label>Font Family</Label>
          <Select value={fontFamily} onValueChange={onFontFamilyChange}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {FONT_OPTIONS.map((font) => (
                <SelectItem key={font.value} value={font.value}>
                  {font.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="textColor">Text Color</Label>
          <div className="flex gap-2">
            <Input
              id="textColor"
              type="color"
              value={textColor}
              onChange={(e) => onTextColorChange(e.target.value)}
              className="h-10 w-20"
            />
            <Input
              value={textColor}
              onChange={(e) => onTextColorChange(e.target.value)}
              placeholder="#000000"
              className="flex-1"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Text Alignment</Label>
          <div className="flex gap-2">
            <Button
              variant={textAlign === "left" ? "default" : "outline"}
              size="icon"
              onClick={() => onTextAlignChange("left")}
            >
              <AlignLeft className="h-4 w-4" />
            </Button>
            <Button
              variant={textAlign === "center" ? "default" : "outline"}
              size="icon"
              onClick={() => onTextAlignChange("center")}
            >
              <AlignCenter className="h-4 w-4" />
            </Button>
            <Button
              variant={textAlign === "right" ? "default" : "outline"}
              size="icon"
              onClick={() => onTextAlignChange("right")}
            >
              <AlignRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
