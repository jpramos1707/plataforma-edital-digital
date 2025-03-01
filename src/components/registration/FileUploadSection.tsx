
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface FileUploadSectionProps {
  selectedImages: File[];
  setSelectedImages: (files: File[]) => void;
  identificationVideo: File | null;
  setIdentificationVideo: (file: File | null) => void;
  illiterateVideo: File | null;
  setIlliterateVideo: (file: File | null) => void;
}

const FileUploadSection = ({
  selectedImages,
  setSelectedImages,
  identificationVideo,
  setIdentificationVideo,
  illiterateVideo,
  setIlliterateVideo
}: FileUploadSectionProps) => {
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (selectedImages.length + files.length > 5) {
      // We'll handle toast in the parent component
      return;
    }
    setSelectedImages([...selectedImages, ...files]);
  };

  const handleVideoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setIdentificationVideo(event.target.files[0]);
    }
  };

  const handleIlliterateVideoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setIlliterateVideo(event.target.files[0]);
    }
  };

  const removeImage = (index: number) => {
    setSelectedImages(selectedImages.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <div>
        <Label>Adicionar portfólio ou até 5 fotos da sua atuação Cultural</Label>
        <Input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
        />
        <div className="mt-2 flex flex-wrap gap-2">
          {selectedImages.map((image, index) => (
            <div key={index} className="border rounded p-1 relative">
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
              >
                ×
              </button>
              <img
                src={URL.createObjectURL(image)}
                alt={`Preview ${index + 1}`}
                className="h-20 w-auto rounded"
              />
            </div>
          ))}
        </div>
      </div>

      <div>
        <Label>Insira um vídeo de até 2 minutos, se identificando e solicitando a efetivação da sua inscrição.</Label>
        <span className="text-sm text-gray-500 block mb-2">"Eu - seu nome - afirmo que sou artista fazedor de cultura e autorizo a realização da minha inscrição no edital da cultura de Poço Branco."</span>
        <Input
          type="file"
          accept="video/*"
          onChange={handleVideoChange}
        />
        {identificationVideo && (
          <div className="mt-2">
            <span className="text-sm text-green-600">Vídeo selecionado: {identificationVideo.name}</span>
          </div>
        )}
      </div>

      <div>
        <Label>Vídeo para pessoas não alfabetizadas ou com dificuldades tecnológicas (até 4 minutos)</Label>
        <span className="block text-sm text-gray-500 mt-1 mb-2">Envie um vídeo apresentando o seu projeto e respondendo às perguntas do edital.</span>
        <Input
          type="file"
          accept="video/*"
          onChange={handleIlliterateVideoChange}
        />
        {illiterateVideo && (
          <div className="mt-2">
            <span className="text-sm text-green-600">Vídeo selecionado: {illiterateVideo.name}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUploadSection;
