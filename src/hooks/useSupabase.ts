
import { supabase } from "@/integrations/supabase/client";
import { Application } from "@/types/application";

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
      if (application.video instanceof File) {
        videoUrl = await uploadFile(application.video, 'videos');
      }
      
      // Upload do vídeo de analfabetos, se existir
      let illiterateVideoUrl = '';
      if (application.illiterateVideo instanceof File) {
        illiterateVideoUrl = await uploadFile(application.illiterateVideo, 'videos');
      }
      
      // Inserir aplicação no banco de dados
      const { data, error } = await supabase
        .from('applications')
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
        })
        .select('id')
        .single();
        
      if (error) {
        console.error('Erro ao salvar aplicação:', error);
        throw new Error('Falha ao salvar a inscrição');
      }
      
      // Inserir imagens relacionadas à aplicação
      if (imageUrls.length > 0) {
        const imageData = imageUrls.map(url => ({
          application_id: data.id,
          image_url: url
        }));
        
        const { error: imageError } = await supabase
          .from('application_images')
          .insert(imageData);
          
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
    const { data, error } = await supabase
      .from('applications')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (error) {
      console.error('Erro ao buscar aplicações:', error);
      throw new Error('Falha ao carregar as inscrições');
    }
    
    // Buscar imagens para cada aplicação
    const applications = await Promise.all(
      data.map(async (app) => {
        const { data: imageData, error: imageError } = await supabase
          .from('application_images')
          .select('image_url')
          .eq('application_id', app.id);
          
        if (imageError) {
          console.error('Erro ao buscar imagens:', imageError);
          return mapDatabaseToApplication(app, []);
        }
        
        const images = imageData.map(img => img.image_url);
        return mapDatabaseToApplication(app, images);
      })
    );
    
    return applications;
  };

  // Função para buscar uma aplicação específica
  const fetchApplicationById = async (id: string): Promise<Application> => {
    const { data, error } = await supabase
      .from('applications')
      .select('*')
      .eq('id', id)
      .single();
      
    if (error) {
      console.error('Erro ao buscar aplicação:', error);
      throw new Error('Falha ao carregar a inscrição');
    }
    
    // Buscar imagens da aplicação
    const { data: imageData, error: imageError } = await supabase
      .from('application_images')
      .select('image_url')
      .eq('application_id', id);
      
    if (imageError) {
      console.error('Erro ao buscar imagens:', imageError);
      return mapDatabaseToApplication(data, []);
    }
    
    const images = imageData.map(img => img.image_url);
    return mapDatabaseToApplication(data, images);
  };

  // Função para atualizar uma aplicação
  const updateApplication = async (id: string, updates: Partial<Application>): Promise<void> => {
    const { error } = await supabase
      .from('applications')
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
      })
      .eq('id', id);
      
    if (error) {
      console.error('Erro ao atualizar aplicação:', error);
      throw new Error('Falha ao atualizar a inscrição');
    }
  };

  // Função auxiliar para mapear dados do banco para o formato da aplicação
  const mapDatabaseToApplication = (dbData: any, images: string[]): Application => {
    return {
      id: dbData.id,
      name: dbData.name,
      culturalCategory: dbData.cultural_category,
      criteriaA: dbData.criteria_a || "",
      criteriaB: dbData.criteria_b || "",
      criteriaC: dbData.criteria_c || "",
      criteriaD: dbData.criteria_d || "",
      criteriaE: dbData.criteria_e || "",
      criteriaF: dbData.criteria_f || "",
      item2514: dbData.item_2514 || "",
      status: dbData.status as any,
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
