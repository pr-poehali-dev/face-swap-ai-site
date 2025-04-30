
import { Button } from "@/components/ui/button";
import { ReactNode, useRef } from "react";

interface ImageUploaderProps {
  image: string | null;
  onImageSelected: (image: string) => void;
  icon?: ReactNode;
  label: string;
}

export const ImageUploader = ({ image, onImageSelected, icon, label }: ImageUploaderProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          onImageSelected(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  return (
    <div className="w-full">
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleFileChange}
        className="hidden"
      />
      
      {image ? (
        <div className="relative aspect-square overflow-hidden rounded-lg border border-gray-200">
          <img 
            src={image} 
            alt="Загруженное изображение" 
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 flex justify-end p-2">
            <Button 
              size="sm" 
              variant="secondary" 
              onClick={handleClick}
              className="opacity-80 hover:opacity-100"
            >
              Изменить
            </Button>
          </div>
        </div>
      ) : (
        <div 
          onClick={handleClick}
          className="flex flex-col items-center justify-center aspect-square rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors"
        >
          {icon}
          <span className="mt-2 text-sm font-medium text-gray-500">{label}</span>
        </div>
      )}
    </div>
  );
};
