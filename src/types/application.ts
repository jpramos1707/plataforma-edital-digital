
export type CriteriaStatus = "APTO" | "NAO_SE_APLICA" | "";
export type ApplicationStatus = "DEFERIDO" | "DEFERIDO_COM_RESSALVAS" | "INDEFERIDO";

export interface Application {
  id: string;
  name: string;
  culturalCategory: string;
  criteriaA: CriteriaStatus;
  criteriaB: CriteriaStatus;
  criteriaC: CriteriaStatus;
  criteriaD: CriteriaStatus;
  criteriaE: CriteriaStatus;
  criteriaF: CriteriaStatus;
  item2514: CriteriaStatus;
  status: ApplicationStatus;
  divergences: string;
  cpf: string;
  birthDate: string;
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
  cultureMakerName: string;
  cultureHistory: string;
  traditionalKnowledge: string;
  diversityValue: string;
  images: string[];
  video: string | File;
  illiterateVideo: string | File;
}
