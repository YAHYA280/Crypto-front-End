'use client';

interface TranslationTextProps {
  originalText: string;
  translatedText: string;
}

export default function TranslatedText({ originalText, translatedText }: TranslationTextProps) {
  return (
    <div className="group relative overflow-hidden shadow-sm">
      <div className="relative overflow-hidden">
        <p className="transform transition-transform duration-300 ease-in-out group-hover:-translate-y-full">
          {originalText}
        </p>
        <p className="absolute inset-x-0 top-0 transform transition-transform duration-300 ease-in-out group-hover:translate-y-0 translate-y-full">
          {translatedText}
        </p>
      </div>
    </div>
  );
}
