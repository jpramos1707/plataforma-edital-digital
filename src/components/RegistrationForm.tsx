
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useSupabase } from "@/hooks/useSupabase";
import { CriteriaStatus } from "@/types/application";
import { formSchema, FormValues } from "./registration/schema";

// Import form sections
import PersonalInfoSection from "./registration/PersonalInfoSection";
import CulturalCategorySection from "./registration/CulturalCategorySection";
import AddressSection from "./registration/AddressSection";
import CulturalDetailsSection from "./registration/CulturalDetailsSection";
import FileUploadSection from "./registration/FileUploadSection";

const RegistrationForm = () => {
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [identificationVideo, setIdentificationVideo] = useState<File | null>(null);
  const [illiterateVideo, setIlliterateVideo] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { saveApplication } = useSupabase();
  const navigate = useNavigate();

  const methods = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormValues) => {
    try {
      setIsSubmitting(true);
      
      // Verificar se há imagens selecionadas
      if (selectedImages.length === 0) {
        toast.error("Por favor, selecione pelo menos uma imagem do seu portfólio.");
        setIsSubmitting(false);
        return;
      }
      
      // Verificar se o vídeo de identificação foi enviado
      if (!identificationVideo) {
        toast.error("Por favor, faça o upload do vídeo de identificação.");
        setIsSubmitting(false);
        return;
      }
      
      // Preparar dados para envio ao Supabase
      const applicationData = {
        name: data.fullName,
        culturalCategory: data.culturalCategory,
        criteriaA: "" as CriteriaStatus,
        criteriaB: "" as CriteriaStatus,
        criteriaC: "" as CriteriaStatus,
        criteriaD: "" as CriteriaStatus,
        criteriaE: "" as CriteriaStatus,
        criteriaF: "" as CriteriaStatus,
        item2514: "" as CriteriaStatus,
        status: "DEFERIDO" as const,
        divergences: "",
        cpf: data.cpf,
        birthDate: data.birthDate,
        race: data.race,
        phone: data.phone,
        email: data.email,
        cep: data.cep,
        street: data.street,
        number: data.number,
        complement: data.complement || "",
        neighborhood: data.neighborhood,
        city: data.city,
        state: data.state,
        cultureMakerName: data.cultureMakerName,
        cultureHistory: data.cultureHistory,
        traditionalKnowledge: data.traditionalKnowledge,
        diversityValue: data.diversityValue,
        images: [],
        video: identificationVideo,
        illiterateVideo: illiterateVideo || null,
      };
      
      // Salvar no Supabase
      await saveApplication(applicationData, selectedImages);
      
      toast.success("Inscrição enviada com sucesso!");
      
      // Limpar o formulário
      methods.reset();
      setSelectedImages([]);
      setIdentificationVideo(null);
      setIlliterateVideo(null);
      
      // Recarregar a página após 2 segundos para mostrar a confirmação
      setTimeout(() => {
        window.location.reload();
      }, 2000);
      
    } catch (error) {
      console.error("Erro ao enviar inscrição:", error);
      toast.error("Erro ao enviar inscrição. Por favor, tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto p-6 animate-fadeIn">
      <Card className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-xl">
        <h1 className="text-2xl font-semibold text-center mb-6 text-primary">
          Plataforma de Inscrição - Edital n° 01/2025 - Poço Branco
        </h1>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-6">
              <h2 className="text-lg font-medium">Informações Pessoais</h2>
              <PersonalInfoSection />
              
              <h2 className="text-lg font-medium">Categoria Cultural</h2>
              <CulturalCategorySection />
              
              <h2 className="text-lg font-medium">Endereço</h2>
              <AddressSection />
              
              <h2 className="text-lg font-medium">Detalhes Culturais</h2>
              <CulturalDetailsSection />
              
              <h2 className="text-lg font-medium">Documentos e Mídia</h2>
              <FileUploadSection 
                selectedImages={selectedImages}
                setSelectedImages={setSelectedImages}
                identificationVideo={identificationVideo}
                setIdentificationVideo={setIdentificationVideo}
                illiterateVideo={illiterateVideo}
                setIlliterateVideo={setIlliterateVideo}
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Enviando..." : "Enviar Inscrição"}
            </Button>
          </form>
        </FormProvider>
      </Card>
    </div>
  );
};

export default RegistrationForm;
