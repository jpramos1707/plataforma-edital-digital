
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CriteriaSelectProps {
  value: string;
  onChange: (value: string) => void;
  options?: { value: string; label: string }[];
}

export const CriteriaSelect = ({ value, onChange, options }: CriteriaSelectProps) => {
  const defaultOptions = [
    { value: "APTO", label: "APTO" },
    { value: "NAO_SE_APLICA", label: "Não se aplica" },
  ];

  const selectOptions = options || defaultOptions;

  return (
    <Select onValueChange={onChange} value={value}>
      <SelectTrigger className="w-32">
        <SelectValue placeholder="Selecione" />
      </SelectTrigger>
      <SelectContent>
        {selectOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
