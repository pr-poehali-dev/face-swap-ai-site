
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, Cpu, Download } from "lucide-react";

export const HowItWorks = () => {
  const steps = [
    {
      icon: <Upload className="h-10 w-10 text-primary" />,
      title: "Загрузите фотографии",
      description: "Загрузите исходное фото с лицом и целевое изображение, где нужно заменить лицо"
    },
    {
      icon: <Cpu className="h-10 w-10 text-primary" />,
      title: "ИИ обрабатывает",
      description: "Наш искусственный интеллект анализирует и меняет лица на изображениях с высокой точностью"
    },
    {
      icon: <Download className="h-10 w-10 text-primary" />,
      title: "Скачайте результат",
      description: "Получите готовое изображение с замененным лицом и сохраните его себе"
    }
  ];

  return (
    <section className="py-12">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-2">Как это работает</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Процесс замены лиц прост и занимает всего несколько секунд
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {steps.map((step, index) => (
          <Card key={index} className="flex flex-col items-center text-center">
            <CardHeader>
              <div className="mb-2">{step.icon}</div>
              <CardTitle>{step.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">{step.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
