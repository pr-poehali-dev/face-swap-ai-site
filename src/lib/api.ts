
import { toast } from "sonner";

// Типы данных для API
export interface FaceSwapResponse {
  success: boolean;
  resultUrl: string;
  message?: string;
}

export interface FaceSwapError {
  status: number;
  message: string;
}

// Константы для API
const API_URL = "https://api.faceswap.ai/v1/swap";
const API_KEY = import.meta.env.VITE_FACESWAP_API_KEY || "demo-key";

/**
 * Сервис для обмена с API замены лиц
 */
export const faceSwapService = {
  /**
   * Отправляет запрос на замену лиц на изображениях
   * @param sourceImage - base64 изображения с лицом-источником
   * @param targetImage - base64 изображения, на котором нужно заменить лицо
   * @returns Promise с результатом обработки
   */
  swapFaces: async (sourceImage: string, targetImage: string): Promise<FaceSwapResponse> => {
    try {
      // Удаляем префикс data:image/jpeg;base64, из base64 строки, если он есть
      const sourceBase64 = sourceImage.split(",")[1];
      const targetBase64 = targetImage.split(",")[1];
      
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
          source_image: sourceBase64,
          target_image: targetBase64,
          config: {
            enhance_face: true,
            detection_threshold: 0.7
          }
        })
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw {
          status: response.status,
          message: data.message || "Ошибка при обработке изображений"
        };
      }
      
      return {
        success: true,
        resultUrl: data.result_url,
        message: "Изображение успешно обработано"
      };
    } catch (error) {
      // Если произошла ошибка в API, показываем уведомление
      const errorMessage = error instanceof Error 
        ? error.message 
        : "Произошла неизвестная ошибка";
      
      toast.error("Ошибка обработки", {
        description: errorMessage
      });
      
      throw error;
    }
  },

  /**
   * Имитирует запрос к API (для демонстрации без реального API)
   * @param sourceImage - base64 изображения с лицом-источником
   * @param targetImage - base64 изображения, на котором нужно заменить лицо
   * @returns Promise с фиктивным результатом
   */
  demoSwapFaces: (sourceImage: string, targetImage: string): Promise<FaceSwapResponse> => {
    return new Promise((resolve) => {
      // Имитация задержки запроса
      setTimeout(() => {
        // В демо-режиме просто возвращаем целевое изображение
        resolve({
          success: true,
          resultUrl: targetImage,
          message: "Демо-режим. Изображение не обрабатывалось."
        });
      }, 2000);
    });
  }
};
