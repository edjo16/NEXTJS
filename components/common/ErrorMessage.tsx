'use client';

interface ErrorMessageProps {
  title?: string;
  message?: string;
}

export default function ErrorMessage({ 
  title = 'Error', 
  message = 'No se pudo cargar la información.' 
}: ErrorMessageProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <h1 className="text-2xl font-bold text-red-800 mb-2">{title}</h1>
        <p className="text-red-600">{message}</p>
      </div>
    </div>
  );
}
