
import { useFormContext } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const CulturalDetailsSection = () => {
  const { register, formState: { errors } } = useFormContext();
  
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="cultureMakerName">Nome do fazedores de cultura ou do projeto desenvolvido</Label>
        <Input
          id="cultureMakerName"
          {...register("cultureMakerName")}
          className="w-full"
          placeholder="Digite o nome"
        />
        {errors.cultureMakerName && (
          <span className="text-red-500 text-sm">
            {errors.cultureMakerName.message as string}
          </span>
        )}
      </div>

      <div>
        <Label htmlFor="cultureHistory">História da sua atuação Cultural</Label>
        <Textarea
          id="cultureHistory"
          {...register("cultureHistory")}
          className="w-full"
          placeholder="Descreva sua história"
        />
        {errors.cultureHistory && (
          <span className="text-red-500 text-sm">
            {errors.cultureHistory.message as string}
          </span>
        )}
      </div>

      <div>
        <Label htmlFor="traditionalKnowledge">As iniciativas desenvolvidas envolvem práticas ou conhecimentos tradicionais da cidade e região?</Label>
        <Textarea
          id="traditionalKnowledge"
          {...register("traditionalKnowledge")}
          className="w-full"
          placeholder="Explique"
        />
        {errors.traditionalKnowledge && (
          <span className="text-red-500 text-sm">
            {errors.traditionalKnowledge.message as string}
          </span>
        )}
      </div>

      <div>
        <Label htmlFor="diversityValue">A atuação artística ou cultural valoriza a diversidade cultural e humana?</Label>
        <Textarea
          id="diversityValue"
          {...register("diversityValue")}
          className="w-full"
          placeholder="Explique"
        />
        {errors.diversityValue && (
          <span className="text-red-500 text-sm">
            {errors.diversityValue.message as string}
          </span>
        )}
      </div>
    </div>
  );
};

export default CulturalDetailsSection;
