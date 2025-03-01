
import { useFormContext } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const PersonalInfoSection = () => {
  const { register, formState: { errors }, setValue } = useFormContext();

  return (
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
        {errors.birthDate && (
          <span className="text-red-500 text-sm">
            {errors.birthDate.message as string}
          </span>
        )}
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
        {errors.race && (
          <span className="text-red-500 text-sm">
            {errors.race.message as string}
          </span>
        )}
      </div>

      <div>
        <Label htmlFor="phone">Telefone</Label>
        <Input
          id="phone"
          {...register("phone")}
          className="w-full"
          placeholder="Digite seu telefone"
        />
        {errors.phone && (
          <span className="text-red-500 text-sm">
            {errors.phone.message as string}
          </span>
        )}
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
    </div>
  );
};

export default PersonalInfoSection;
