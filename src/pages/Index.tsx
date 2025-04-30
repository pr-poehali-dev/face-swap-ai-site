
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ImageUploader } from "@/components/ImageUploader";
import { FaceSwapResult } from "@/components/FaceSwapResult";
import { HowItWorks } from "@/components/HowItWorks";
import { useState } from "react";
import { Rocket, Image, Wand2, AlertCircle } from "lucide-react";
import { faceSwapService } from "@/lib/api";
import { toast } from "sonner";

const Index = () => {
  const [sourceImage, setSourceImage] = useState<string | null>(null);
  const [targetImage, setTargetImage] = useState<string | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSwapFaces = async () => {
    if (!sourceImage || !targetImage) return;
    
    setIsProcessing(true);
    setError(null);
    
    try {
      // Используем демо метод, если API_KEY не установлен
      // В реальном приложении используйте .swapFaces вместо .demoSwapFaces
      const isDemoMode = import.meta.env.VITE_FACESWAP_API_KEY === undefined;
      const swapMethod = isDemoMode ? faceSwapService.demoSwapFaces : faceSwapService.swapFaces;
      
      const result = await swapMethod(sourceImage, targetImage);
      
      if (result.success) {
        setResultImage(result.resultUrl);
        toast.success("Готово!", {
          description: result.message || "Изображение успешно обработано"
        });
      } else {
        setError(result.message || "Не удалось обработать изображения");
        toast.error("Ошибка", {
          description: result.message || "Не удалось обработать изображения"
        });
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Неизвестная ошибка";
      setError(errorMessage);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-blue-50">
      <header className="container mx-auto py-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Wand2 className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold text-primary">ФейсСвап</h1>
          </div>
          <Button variant="outline">О сервисе</Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <section className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-3 text-gray-900">Замена лиц на фото с ИИ</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Меняйте лица на фотографиях с помощью искусственного интеллекта быстро и качественно
          </p>
        </section>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle>Исходное лицо</CardTitle>
              <CardDescription>Загрузите фото с лицом, которое хотите использовать</CardDescription>
            </CardHeader>
            <CardContent>
              <ImageUploader 
                image={sourceImage} 
                onImageSelected={setSourceImage} 
                icon={<Image className="h-8 w-8 text-gray-400" />}
                label="Загрузить фото с лицом"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Целевое фото</CardTitle>
              <CardDescription>Загрузите фото, на котором нужно заменить лицо</CardDescription>
            </CardHeader>
            <CardContent>
              <ImageUploader 
                image={targetImage} 
                onImageSelected={setTargetImage} 
                icon={<Image className="h-8 w-8 text-gray-400" />}
                label="Загрузить целевое фото"
              />
            </CardContent>
          </Card>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md text-red-600 flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            <p>{error}</p>
          </div>
        )}

        <div className="flex justify-center mb-12">
          <Button 
            size="lg" 
            disabled={!sourceImage || !targetImage || isProcessing}
            onClick={handleSwapFaces}
            className="px-8 py-6 text-lg"
          >
            {isProcessing ? "Обработка..." : "Заменить лицо"} 
            {!isProcessing && <Rocket className="ml-2 h-5 w-5" />}
          </Button>
        </div>

        {resultImage && (
          <FaceSwapResult resultImage={resultImage} />
        )}

        <HowItWorks />
      </main>

      <footer className="container mx-auto py-6 text-center text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} ФейсСвап. Все права защищены.</p>
      </footer>
    </div>
  );
};

export default Index;
