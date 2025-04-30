
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Share2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface FaceSwapResultProps {
  resultImage: string;
}

export const FaceSwapResult = ({ resultImage }: FaceSwapResultProps) => {
  const [isDownloading, setIsDownloading] = useState(false);
  
  const handleDownload = async () => {
    try {
      setIsDownloading(true);
      
      // Если изображение начинается с http, сначала загрузим его
      if (resultImage.startsWith('http')) {
        const response = await fetch(resultImage);
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = 'faceswap-result.jpg';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Освобождаем URL объект
        URL.revokeObjectURL(url);
      } else {
        // Если это base64, можно скачать напрямую
        const link = document.createElement('a');
        link.href = resultImage;
        link.download = 'faceswap-result.jpg';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
      
      toast.success("Изображение скачано");
    } catch (error) {
      toast.error("Ошибка при скачивании");
      console.error("Ошибка при скачивании:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: 'Результат замены лица',
          text: 'Посмотрите, что я сделал с помощью ФейсСвап!',
          url: window.location.href,
        })
        .then(() => toast.success("Успешно поделились"))
        .catch((error) => console.error("Ошибка при попытке поделиться:", error));
    } else {
      // Если Web Share API не поддерживается, копируем ссылку в буфер обмена
      navigator.clipboard.writeText(window.location.href).then(
        () => toast.success("Ссылка скопирована в буфер обмена"),
        () => toast.error("Не удалось скопировать ссылку")
      );
    }
  };

  return (
    <Card className="mb-12 max-w-2xl mx-auto animate-fade-in">
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
        <Button 
          onClick={handleDownload} 
          variant="default"
          disabled={isDownloading}
        >
          <Download className="mr-2 h-4 w-4" />
          {isDownloading ? "Скачивание..." : "Скачать"}
        </Button>
        <Button variant="outline" onClick={handleShare}>
          <Share2 className="mr-2 h-4 w-4" />
          Поделиться
        </Button>
      </CardFooter>
    </Card>
  );
};
