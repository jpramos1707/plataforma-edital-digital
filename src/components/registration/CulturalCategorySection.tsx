
import { useFormContext } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const CulturalCategorySection = () => {
  const { formState: { errors }, setValue } = useFormContext();

  return (
    <div>
      <Label htmlFor="culturalCategory">Área de Atuação</Label>
      <Select onValueChange={(value) => setValue("culturalCategory", value)}>
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
      {errors.culturalCategory && (
        <span className="text-red-500 text-sm">
          {errors.culturalCategory.message as string}
        </span>
      )}
    </div>
  );
};

export default CulturalCategorySection;
