
import { Application, CriteriaStatus } from "@/types/application";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { CriteriaSelect } from "./CriteriaSelect";

interface ApplicationTableProps {
  applications: Application[];
  pendingChanges: { [key: string]: Partial<Application> };
  onStatusChange: (applicationId: string, field: keyof Application, value: string) => void;
  onSave: (applicationId: string) => void;
  onViewDetails: (application: Application) => void;
  getApplicationValue: (applicationId: string, field: keyof Application, originalValue: string) => string;
}

export const ApplicationTable = ({
  applications,
  pendingChanges,
  onStatusChange,
  onSave,
  onViewDetails,
  getApplicationValue,
}: ApplicationTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Nome</TableHead>
          <TableHead>Categoria Cultural</TableHead>
          <TableHead>Critério A</TableHead>
          <TableHead>Critério B</TableHead>
          <TableHead>Critério C</TableHead>
          <TableHead>Critério D</TableHead>
          <TableHead>Critério E</TableHead>
          <TableHead>Item em Divergência</TableHead>
          <TableHead>Item 2.5.1-IV</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {applications.map((application) => (
          <TableRow key={application.id}>
            <TableCell>{application.id}</TableCell>
            <TableCell>{application.name}</TableCell>
            <TableCell>{application.culturalCategory}</TableCell>
            <TableCell>
              <CriteriaSelect
                value={getApplicationValue(
                  application.id,
                  "criteriaA",
                  application.criteriaA
                )}
                onChange={(value) =>
                  onStatusChange(application.id, "criteriaA", value)
                }
              />
            </TableCell>
            <TableCell>
              <CriteriaSelect
                value={getApplicationValue(
                  application.id,
                  "criteriaB",
                  application.criteriaB
                )}
                onChange={(value) =>
                  onStatusChange(application.id, "criteriaB", value)
                }
              />
            </TableCell>
            <TableCell>
              <CriteriaSelect
                value={getApplicationValue(
                  application.id,
                  "criteriaC",
                  application.criteriaC
                )}
                onChange={(value) =>
                  onStatusChange(application.id, "criteriaC", value)
                }
              />
            </TableCell>
            <TableCell>
              <CriteriaSelect
                value={getApplicationValue(
                  application.id,
                  "criteriaD",
                  application.criteriaD
                )}
                onChange={(value) =>
                  onStatusChange(application.id, "criteriaD", value)
                }
              />
            </TableCell>
            <TableCell>
              <CriteriaSelect
                value={getApplicationValue(
                  application.id,
                  "criteriaE",
                  application.criteriaE
                )}
                onChange={(value) =>
                  onStatusChange(application.id, "criteriaE", value)
                }
              />
            </TableCell>
            <TableCell>
              <CriteriaSelect
                value={getApplicationValue(
                  application.id,
                  "criteriaF",
                  application.criteriaF
                )}
                onChange={(value) =>
                  onStatusChange(application.id, "criteriaF", value)
                }
              />
            </TableCell>
            <TableCell>
              <CriteriaSelect
                value={getApplicationValue(
                  application.id,
                  "item2514",
                  application.item2514
                )}
                onChange={(value) =>
                  onStatusChange(application.id, "item2514", value)
                }
              />
            </TableCell>
            <TableCell>
              <CriteriaSelect
                value={getApplicationValue(
                  application.id,
                  "status",
                  application.status
                )}
                onChange={(value) =>
                  onStatusChange(application.id, "status", value)
                }
                options={[
                  { value: "DEFERIDO", label: "Deferido" },
                  { value: "DEFERIDO_COM_RESSALVAS", label: "Deferido com ressalvas" },
                  { value: "INDEFERIDO", label: "Indeferido" },
                ]}
              />
            </TableCell>
            <TableCell className="space-x-2">
              <Button
                onClick={() => onViewDetails(application)}
                variant="outline"
                size="sm"
              >
                Detalhes
              </Button>
              <Button
                onClick={() => onSave(application.id)}
                variant="outline"
                size="sm"
                className={
                  pendingChanges[application.id]
                    ? "bg-primary text-white hover:bg-primary/90"
                    : ""
                }
              >
                Salvar
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
