
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Share2 } from "lucide-react";

interface FaceSwapResultProps {
  resultImage: string;
}

export const FaceSwapResult = ({ resultImage }: FaceSwapResultProps) => {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = resultImage;
    link.download = 'faceswap-result.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card className="mb-12 max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-center">Результат замены лица</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="aspect-square overflow-hidden rounded-lg relative">
          <img 
            src={resultImage} 
            alt="Результат замены лица" 
            className="w-full h-full object-cover" 
          />
        </div>
      </CardContent>
      <CardFooter className="flex gap-4 justify-center">
        <Button onClick={handleDownload} variant="default">
          <Download className="mr-2 h-4 w-4" />
          Скачать
        </Button>
        <Button variant="outline">
          <Share2 className="mr-2 h-4 w-4" />
          Поделиться
        </Button>
      </CardFooter>
    </Card>
  );
};
