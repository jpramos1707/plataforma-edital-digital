
import { useFormContext } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const AddressSection = () => {
  const { register, formState: { errors }, setValue } = useFormContext();

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="cep">CEP</Label>
        <Input
          id="cep"
          {...register("cep")}
          className="w-full"
          placeholder="Digite seu CEP"
        />
        {errors.cep && (
          <span className="text-red-500 text-sm">
            {errors.cep.message as string}
          </span>
        )}
      </div>

      <div>
        <Label htmlFor="street">Logradouro</Label>
        <Input
          id="street"
          {...register("street")}
          className="w-full"
          placeholder="Digite seu endereço"
        />
        {errors.street && (
          <span className="text-red-500 text-sm">
            {errors.street.message as string}
          </span>
        )}
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
          {errors.number && (
            <span className="text-red-500 text-sm">
              {errors.number.message as string}
            </span>
          )}
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
        {errors.neighborhood && (
          <span className="text-red-500 text-sm">
            {errors.neighborhood.message as string}
          </span>
        )}
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
          {errors.city && (
            <span className="text-red-500 text-sm">
              {errors.city.message as string}
            </span>
          )}
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
          {errors.state && (
            <span className="text-red-500 text-sm">
              {errors.state.message as string}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddressSection;
