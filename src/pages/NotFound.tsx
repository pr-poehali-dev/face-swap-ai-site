
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-b from-purple-50 to-blue-50">
      <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-8">Страница не найдена</p>
      <Button asChild>
        <Link to="/">Вернуться на главную</Link>
      </Button>
    </div>
  );
}
