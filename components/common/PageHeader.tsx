'use client';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
}

export default function PageHeader({ title, subtitle, description }: PageHeaderProps) {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
        {subtitle && (
          <p className="text-xl md:text-2xl mb-4 text-blue-100">{subtitle}</p>
        )}
        {description && (
          <p className="text-lg max-w-3xl mx-auto text-blue-50">{description}</p>
        )}
      </div>
    </div>
  );
}
