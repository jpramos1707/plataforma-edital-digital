import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";  
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  fullName: z.string().min(3, "Nome completo é obrigatório"),
  cpf: z.string().min(11, "CPF inválido").max(11, "CPF inválido"),
  birthDate: z.string(),
  race: z.string(),
  phone: z.string(),
  email: z.string().email("Email inválido"),
  culturalCategory: z.string(),
  cep: z.string(),
  street: z.string(),
  number: z.string(),
  complement: z.string().optional(),
  neighborhood: z.string(),
  city: z.string(),
  state: z.string(),
});

const RegistrationForm = () => {
  const [selectedImages, setSelectedImages] = useState<File[]>([]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (selectedImages.length + files.length > 5) {
      toast.error("Selecione no máximo 5 imagens.");
      return;
    }
    setSelectedImages([...selectedImages, ...files]);
  };

  const removeImage = (index: number) => {
    setSelectedImages(selectedImages.filter((_, i) => i !== index));
  };
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      // Here you would typically send the data to your backend
      console.log(data);
      toast.success("Inscrição enviada com sucesso!");
    } catch (error) {
      toast.error("Erro ao enviar inscrição");
    }
  };

  return (
    <div className="container mx-auto p-6 animate-fadeIn">
      <Card className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-xl">
        <h1 className="text-2xl font-semibold text-center mb-6 text-primary">
          Plataforma de Inscrição - Edital n° 01/2025 - Poço Branco
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="fullName">Nome completo (Proponente/artista fazedor de cultura)</Label>
              <Input
                id="fullName"
                {...register("fullName")}
                className="w-full"
                placeholder="Digite seu nome completo"
              />
              {errors.fullName && (
                <span className="text-red-500 text-sm">
                  {errors.fullName.message as string}
                </span>
              )}
            </div>

            <div>
              <Label htmlFor="cpf">CPF</Label>
              <Input
                id="cpf"
                {...register("cpf")}
                className="w-full"
                placeholder="Digite seu CPF"
              />
              {errors.cpf && (
                <span className="text-red-500 text-sm">
                  {errors.cpf.message as string}
                </span>
              )}
            </div>

            <div>
              <Label htmlFor="birthDate">Data de Nascimento</Label>
              <Input
                id="birthDate"
                type="text"
                placeholder="dd/mm/aaaa"
                {...register("birthDate")}
                className="w-full"
              />
            </div>

            <div>
              <Label htmlFor="race">Raça/Cor</Label>
              <Select onValueChange={(value) => setValue("race", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione sua raça/cor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="branca">Branca</SelectItem>
                  <SelectItem value="preta">Preta</SelectItem>
                  <SelectItem value="parda">Parda</SelectItem>
                  <SelectItem value="amarela">Amarela</SelectItem>
                  <SelectItem value="indigena">Indígena</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="phone">Telefone</Label>
              <Input
                id="phone"
                {...register("phone")}
                className="w-full"
                placeholder="Digite seu telefone"
              />
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                {...register("email")}
                className="w-full"
                placeholder="Digite seu email"
              />
              {errors.email && (
                <span className="text-red-500 text-sm">
                  {errors.email.message as string}
                </span>
              )}
            </div>

            <div>
              <Label htmlFor="culturalCategory">Área de Atuação</Label>
              <Select
                onValueChange={(value) => setValue("culturalCategory", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione sua área de atuação" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="antropologia">Antropologia</SelectItem>
                  <SelectItem value="arqueologia">Arqueologia</SelectItem>
                  <SelectItem value="arquitetura-urbanismo">Arquitetura-Urbanismo</SelectItem>
                  <SelectItem value="arquivo">Arquivo</SelectItem>
                  <SelectItem value="arte-digital">Arte Digital</SelectItem>
                  <SelectItem value="arte-de-rua">Arte de Rua</SelectItem>
                  <SelectItem value="artes-visuais">Artes Visuais</SelectItem>
                  <SelectItem value="artes-integradas">Artes Integradas</SelectItem>
                  <SelectItem value="artesanato">Artesanato</SelectItem>
                  <SelectItem value="audiovisual">Audiovisual</SelectItem>
                  <SelectItem value="cinema">Cinema</SelectItem>
                  <SelectItem value="circo">Circo</SelectItem>
                  <SelectItem value="comunicacao">Comunicação</SelectItem>
                  <SelectItem value="cultura-afro-brasileira">Cultura Afro-brasileira</SelectItem>
                  <SelectItem value="cultura-cigana">Cultura Cigana</SelectItem>
                  <SelectItem value="cultura-digital">Cultura Digital</SelectItem>
                  <SelectItem value="cultura-estrangeira">Cultura Estrangeira (imigrantes)</SelectItem>
                  <SelectItem value="cultura-indigena">Cultura Indígena</SelectItem>
                  <SelectItem value="cultura-lgbt">Cultura LGBT</SelectItem>
                  <SelectItem value="cultura-negra">Cultura Negra</SelectItem>
                  <SelectItem value="cultura-popular">Cultura Popular</SelectItem>
                  <SelectItem value="danca">Dança</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                  <SelectItem value="educacao">Educação</SelectItem>
                  <SelectItem value="esporte">Esporte</SelectItem>
                  <SelectItem value="fotografia">Fotografia</SelectItem>
                  <SelectItem value="gastronomia">Gastronomia</SelectItem>
                  <SelectItem value="gestao-cultural">Gestão Cultural</SelectItem>
                  <SelectItem value="humor">Humor</SelectItem>
                  <SelectItem value="literatura">Literatura</SelectItem>
                  <SelectItem value="quilombola">Quilombola</SelectItem>
                  <SelectItem value="teatro">Teatro</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="cep">CEP</Label>
              <Input
                id="cep"
                {...register("cep")}
                className="w-full"
                placeholder="Digite seu CEP"
              />
            </div>

            <div>
              <Label htmlFor="street">Logradouro</Label>
              <Input
                id="street"
                {...register("street")}
                className="w-full"
                placeholder="Digite seu endereço"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="number">Número</Label>
                <Input
                  id="number"
                  {...register("number")}
                  className="w-full"
                  placeholder="Número"
                />
              </div>

              <div>
                <Label htmlFor="complement">Complemento</Label>
                <Input
                  id="complement"
                  {...register("complement")}
                  className="w-full"
                  placeholder="Complemento"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="neighborhood">Bairro</Label>
              <Input
                id="neighborhood"
                {...register("neighborhood")}
                className="w-full"
                placeholder="Digite seu bairro"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="city">Município</Label>
                <Input
                  id="city"
                  {...register("city")}
                  className="w-full"
                  placeholder="Digite sua cidade"
                />
              </div>

              <div>
                <Label htmlFor="state">Estado</Label>
                <Select onValueChange={(value) => setValue("state", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="AC">Acre</SelectItem>
                    <SelectItem value="AL">Alagoas</SelectItem>
                    <SelectItem value="AP">Amapá</SelectItem>
                    <SelectItem value="AM">Amazonas</SelectItem>
                    <SelectItem value="BA">Bahia</SelectItem>
                    <SelectItem value="CE">Ceará</SelectItem>
                    <SelectItem value="DF">Distrito Federal</SelectItem>
                    <SelectItem value="ES">Espírito Santo</SelectItem>
                    <SelectItem value="GO">Goiás</SelectItem>
                    <SelectItem value="MA">Maranhão</SelectItem>
                    <SelectItem value="MT">Mato Grosso</SelectItem>
                    <SelectItem value="MS">Mato Grosso do Sul</SelectItem>
                    <SelectItem value="MG">Minas Gerais</SelectItem>
                    <SelectItem value="PA">Pará</SelectItem>
                    <SelectItem value="PB">Paraíba</SelectItem>
                    <SelectItem value="PR">Paraná</SelectItem>
                    <SelectItem value="PE">Pernambuco</SelectItem>
                    <SelectItem value="PI">Piauí</SelectItem>
                    <SelectItem value="RJ">Rio de Janeiro</SelectItem>
                    <SelectItem value="RN">Rio Grande do Norte</SelectItem>
                    <SelectItem value="RS">Rio Grande do Sul</SelectItem>
                    <SelectItem value="RO">Rondônia</SelectItem>
                    <SelectItem value="RR">Roraima</SelectItem>
                    <SelectItem value="SC">Santa Catarina</SelectItem>
                    <SelectItem value="SP">São Paulo</SelectItem>
                    <SelectItem value="SE">Sergipe</SelectItem>
                    <SelectItem value="TO">Tocantins</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="cultureMakerName">Nome do fazedores de cultura ou do projeto desenvolvido</Label>
              <Input
                id="cultureMakerName"
                {...register("cultureMakerName")}
                className="w-full"
                placeholder="Digite o nome"
              />
            </div>

            <div>
              <Label htmlFor="cultureHistory">História da sua atuação Cultural</Label>
              <Textarea
                id="cultureHistory"
                {...register("cultureHistory")}
                className="w-full"
                placeholder="Descreva sua história"
              />
            </div>

            <div>
              <Label htmlFor="traditionalKnowledge">As iniciativas desenvolvidas envolvem práticas ou conhecimentos tradicionais da cidade e região?</Label>
              <Textarea
                id="traditionalKnowledge"
                {...register("traditionalKnowledge")}
                className="w-full"
                placeholder="Explique"
              />
            </div>

            <div>
              <Label htmlFor="diversityValue">A atuação artística ou cultural valoriza a diversidade cultural e humana?</Label>
              <Textarea
                id="diversityValue"
                {...register("diversityValue")}
                className="w-full"
                placeholder="Explique"
              />
            </div>

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
              <span className="text-sm text-gray-500">"Eu - seu nome - afirmo que sou artista fazedor de cultura e autorizo a realização da minha inscrição no edital da cultura de Poço Branco."</span>
              <Input
                type="file"
                accept="video/*"
              />
            </div>

            <div>
              <Label>Vídeo para pessoas não alfabetizadas ou com dificuldades tecnológicas (até 4 minutos)</Label>
              <span className="block text-sm text-gray-500 mt-1">Envie um vídeo apresentando o seu projeto e respondendo às perguntas do edital.</span>
              <Input
                type="file"
                accept="video/*"
                className="mt-2"
              />
            </div>

          </div>

          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 text-white"
          >
            Enviar Inscrição
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default RegistrationForm;
