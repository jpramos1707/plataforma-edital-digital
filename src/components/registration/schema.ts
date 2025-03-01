
import { z } from "zod";

export const formSchema = z.object({
  fullName: z.string().min(3, "Nome completo é obrigatório"),
  cpf: z.string().min(11, "CPF inválido").max(11, "CPF inválido"),
  birthDate: z.string().min(1, "Data de nascimento é obrigatória"),
  race: z.string().min(1, "Selecione uma opção"),
  phone: z.string().min(1, "Telefone é obrigatório"),
  email: z.string().email("Email inválido"),
  culturalCategory: z.string().min(1, "Selecione uma categoria"),
  cep: z.string().min(1, "CEP é obrigatório"),
  street: z.string().min(1, "Logradouro é obrigatório"),
  number: z.string().min(1, "Número é obrigatório"),
  complement: z.string().optional(),
  neighborhood: z.string().min(1, "Bairro é obrigatório"),
  city: z.string().min(1, "Cidade é obrigatória"),
  state: z.string().min(1, "Estado é obrigatório"),
  cultureMakerName: z.string().min(1, "Nome do fazedor de cultura é obrigatório"),
  cultureHistory: z.string().min(1, "História da atuação cultural é obrigatória"),
  traditionalKnowledge: z.string().min(1, "Este campo é obrigatório"),
  diversityValue: z.string().min(1, "Este campo é obrigatório"),
});

export type FormValues = z.infer<typeof formSchema>;
