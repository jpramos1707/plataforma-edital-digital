
import { supabase } from "@/integrations/supabase/client";
import { Application, CriteriaStatus, ApplicationStatus } from "@/types/application";

interface ApplicationTable {
  id: string;
  name: string;
  cultural_category: string;
  criteria_a: string;
  criteria_b: string;
  criteria_c: string;
  criteria_d: string;
  criteria_e: string;
  criteria_f: string;
  item_2514: string;
  status: string;
  divergences: string;
  cpf: string;
  birth_date: string;
  race: string;
  phone: string;
  email: string;
  cep: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  culture_maker_name: string;
  culture_history: string;
  traditional_knowledge: string;
  diversity_value: string;
  video: string;
  illiterate_video: string;
  created_at: string;
}

interface ApplicationImage {
  id: string;
  application_id: string;
  image_url: string;
  created_at: string;
}

export const useSupabase = () => {
  // Função para fazer upload de um arquivo para o Supabase Storage
  const uploadFile = async (file: File, path: string): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${path}/${Math.random()}.${fileExt}`;
    
    const { data, error } = await supabase.storage
      .from('applications')
      .upload(fileName, file);
      
    if (error) {
      console.error('Erro ao fazer upload:', error);
      throw new Error('Falha ao fazer upload do arquivo');
    }
    
    const { data: { publicUrl } } = supabase.storage
      .from('applications')
      .getPublicUrl(fileName);
      
    return publicUrl;
  };

  // Função para salvar uma aplicação no Supabase
  const saveApplication = async (application: Omit<Application, 'id'>, images: File[]): Promise<string> => {
    try {
      // Converter as imagens para URLs
      const imageUrls: string[] = [];
      
      // Upload das imagens
      if (images.length > 0) {
        for (const image of images) {
          const imageUrl = await uploadFile(image, 'images');
          imageUrls.push(imageUrl);
        }
      }
      
      // Upload do vídeo principal, se existir
      let videoUrl = '';
      if (typeof application.video === 'object' && application.video !== null) {
        videoUrl = await uploadFile(application.video as File, 'videos');
      }
      
      // Upload do vídeo de analfabetos, se existir
      let illiterateVideoUrl = '';
      if (typeof application.illiterateVideo === 'object' && application.illiterateVideo !== null) {
        illiterateVideoUrl = await uploadFile(application.illiterateVideo as File, 'videos');
      }
      
      // Inserir aplicação no banco de dados
      const { data, error } = await supabase
        .from<ApplicationTable>('applications')
        .insert({
          name: application.name,
          cultural_category: application.culturalCategory,
          criteria_a: application.criteriaA,
          criteria_b: application.criteriaB,
          criteria_c: application.criteriaC,
          criteria_d: application.criteriaD,
          criteria_e: application.criteriaE,
          criteria_f: application.criteriaF,
          item_2514: application.item2514,
          status: application.status,
          divergences: application.divergences,
          cpf: application.cpf,
          birth_date: application.birthDate,
          race: application.race,
          phone: application.phone,
          email: application.email,
          cep: application.cep,
          street: application.street,
          number: application.number,
          complement: application.complement,
          neighborhood: application.neighborhood,
          city: application.city,
          state: application.state,
          culture_maker_name: application.cultureMakerName,
          culture_history: application.cultureHistory,
          traditional_knowledge: application.traditionalKnowledge,
          diversity_value: application.diversityValue,
          video: videoUrl,
          illiterate_video: illiterateVideoUrl
        } as any)
        .select('id')
        .single();
        
      if (error) {
        console.error('Erro ao salvar aplicação:', error);
        throw new Error('Falha ao salvar a inscrição');
      }
      
      if (!data) {
        throw new Error('Falha ao obter ID da inscrição após salvamento');
      }
      
      // Inserir imagens relacionadas à aplicação
      if (imageUrls.length > 0) {
        const imageData = imageUrls.map(url => ({
          application_id: data.id,
          image_url: url
        }));
        
        const { error: imageError } = await supabase
          .from<ApplicationImage>('application_images')
          .insert(imageData as any);
          
        if (imageError) {
          console.error('Erro ao salvar imagens:', imageError);
          throw new Error('Falha ao salvar as imagens');
        }
      }
      
      return data.id;
    } catch (error) {
      console.error('Erro durante o processo de salvamento:', error);
      throw error;
    }
  };

  // Função para buscar todas as aplicações
  const fetchApplications = async (): Promise<Application[]> => {
    try {
      const { data, error } = await supabase
        .from<ApplicationTable>('applications')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) {
        console.error('Erro ao buscar aplicações:', error);
        throw new Error('Falha ao carregar as inscrições');
      }
      
      if (!data) {
        return [];
      }
      
      // Buscar imagens para cada aplicação
      const applications = await Promise.all(
        data.map(async (app) => {
          const { data: imageData, error: imageError } = await supabase
            .from<ApplicationImage>('application_images')
            .select('image_url')
            .eq('application_id', app.id);
            
          if (imageError) {
            console.error('Erro ao buscar imagens:', imageError);
            return mapDatabaseToApplication(app, []);
          }
          
          const images = imageData ? imageData.map(img => img.image_url as string) : [];
          return mapDatabaseToApplication(app, images);
        })
      );
      
      return applications;
    } catch (error) {
      console.error("Erro ao buscar aplicações:", error);
      throw error;
    }
  };

  // Função para buscar uma aplicação específica
  const fetchApplicationById = async (id: string): Promise<Application> => {
    try {
      const { data, error } = await supabase
        .from<ApplicationTable>('applications')
        .select('*')
        .eq('id', id)
        .single();
        
      if (error) {
        console.error('Erro ao buscar aplicação:', error);
        throw new Error('Falha ao carregar a inscrição');
      }
      
      if (!data) {
        throw new Error('Inscrição não encontrada');
      }
      
      // Buscar imagens da aplicação
      const { data: imageData, error: imageError } = await supabase
        .from<ApplicationImage>('application_images')
        .select('image_url')
        .eq('application_id', id);
        
      if (imageError) {
        console.error('Erro ao buscar imagens:', imageError);
        return mapDatabaseToApplication(data, []);
      }
      
      const images = imageData ? imageData.map(img => img.image_url as string) : [];
      return mapDatabaseToApplication(data, images);
    } catch (error) {
      console.error("Erro ao buscar aplicação por ID:", error);
      throw error;
    }
  };

  // Função para atualizar uma aplicação
  const updateApplication = async (id: string, updates: Partial<Application>): Promise<void> => {
    try {
      const { error } = await supabase
        .from<ApplicationTable>('applications')
        .update({
          criteria_a: updates.criteriaA,
          criteria_b: updates.criteriaB,
          criteria_c: updates.criteriaC,
          criteria_d: updates.criteriaD,
          criteria_e: updates.criteriaE,
          criteria_f: updates.criteriaF,
          item_2514: updates.item2514,
          status: updates.status,
          divergences: updates.divergences
        } as any)
        .eq('id', id);
        
      if (error) {
        console.error('Erro ao atualizar aplicação:', error);
        throw new Error('Falha ao atualizar a inscrição');
      }
    } catch (error) {
      console.error("Erro ao atualizar aplicação:", error);
      throw error;
    }
  };

  // Função auxiliar para mapear dados do banco para o formato da aplicação
  const mapDatabaseToApplication = (dbData: ApplicationTable, images: string[]): Application => {
    return {
      id: dbData.id,
      name: dbData.name,
      culturalCategory: dbData.cultural_category,
      criteriaA: dbData.criteria_a as CriteriaStatus || "" as CriteriaStatus,
      criteriaB: dbData.criteria_b as CriteriaStatus || "" as CriteriaStatus,
      criteriaC: dbData.criteria_c as CriteriaStatus || "" as CriteriaStatus,
      criteriaD: dbData.criteria_d as CriteriaStatus || "" as CriteriaStatus,
      criteriaE: dbData.criteria_e as CriteriaStatus || "" as CriteriaStatus,
      criteriaF: dbData.criteria_f as CriteriaStatus || "" as CriteriaStatus,
      item2514: dbData.item_2514 as CriteriaStatus || "" as CriteriaStatus,
      status: dbData.status as ApplicationStatus,
      divergences: dbData.divergences || "",
      cpf: dbData.cpf,
      birthDate: dbData.birth_date,
      race: dbData.race,
      phone: dbData.phone,
      email: dbData.email,
      cep: dbData.cep,
      street: dbData.street,
      number: dbData.number,
      complement: dbData.complement || "",
      neighborhood: dbData.neighborhood,
      city: dbData.city,
      state: dbData.state,
      cultureMakerName: dbData.culture_maker_name,
      cultureHistory: dbData.culture_history,
      traditionalKnowledge: dbData.traditional_knowledge,
      diversityValue: dbData.diversity_value,
      images: images,
      video: dbData.video || "",
      illiterateVideo: dbData.illiterate_video || ""
    };
  };

  return {
    saveApplication,
    fetchApplications,
    fetchApplicationById,
    updateApplication,
    uploadFile
  };
};
