
import { useState } from "react";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type CriteriaStatus = "APTO" | "NAO_SE_APLICA" | "";
type ApplicationStatus = "DEFERIDO" | "DEFERIDO_COM_RESSALVAS" | "INDEFERIDO";

interface Application {
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
}

const AdminPanel = () => {
  const [applications, setApplications] = useState<Application[]>([
    {
      id: "001",
      name: "João Silva",
      culturalCategory: "Música",
      criteriaA: "",
      criteriaB: "",
      criteriaC: "",
      criteriaD: "",
      criteriaE: "",
      criteriaF: "",
      item2514: "",
      status: "DEFERIDO",
      divergences: "",
    },
    // Add more mock data as needed
  ]);

  // Novo estado para armazenar alterações pendentes
  const [pendingChanges, setPendingChanges] = useState<{
    [key: string]: Partial<Application>;
  }>({});

  const updateApplicationStatus = (
    applicationId: string,
    field: keyof Application,
    value: string
  ) => {
    setPendingChanges((prev) => ({
      ...prev,
      [applicationId]: {
        ...(prev[applicationId] || {}),
        [field]: value,
      },
    }));
  };

  const saveChanges = (applicationId: string) => {
    const changes = pendingChanges[applicationId];
    if (!changes) return;

    setApplications((prev) =>
      prev.map((app) =>
        app.id === applicationId ? { ...app, ...changes } : app
      )
    );

    // Limpa as alterações pendentes para esta aplicação
    setPendingChanges((prev) => {
      const newPending = { ...prev };
      delete newPending[applicationId];
      return newPending;
    });

    toast.success("Alterações salvas com sucesso!");
  };

  const getApplicationValue = (
    applicationId: string,
    field: keyof Application,
    originalValue: string
  ) => {
    return (
      (pendingChanges[applicationId]?.[field] as string) || originalValue
    );
  };

  return (
    <div className="container mx-auto p-6 animate-fadeIn">
      <Card className="bg-white shadow-lg rounded-xl p-6">
        <h1 className="text-2xl font-semibold text-center mb-6 text-primary">
          Painel do Parecerista(Avaliação)
        </h1>
        
        <h3>
          Critérios de Avaliação 
        </h3>
        <h4>
          A. O Impacto cultural e social da trajetória do projeto ou espaço (4,0 pontos)
        </h4>
        <h4>
          B - O Tempo de atuação devidamente comprovada em registros de declarações e
        imagens (3,0).
        </h4>
        <h4>
          C - Projetos que apresentem a história e identidade cultural de Poço Branco (2,0
          pontos).
        </h4>
        <h4>
          D - O Alinhamento com as políticas de diversidade social , de gênero, inclusão e sustentabilidade (1,0
          pontos).
        </h4>
        <div className="overflow-x-auto">
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
                    <Select
                      onValueChange={(value) =>
                        updateApplicationStatus(
                          application.id,
                          "criteriaA",
                          value
                        )
                      }
                      value={getApplicationValue(
                        application.id,
                        "criteriaA",
                        application.criteriaA
                      )}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="APTO">APTO</SelectItem>
                        <SelectItem value="NAO_SE_APLICA">
                          Não se aplica
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Select
                      onValueChange={(value) =>
                        updateApplicationStatus(
                          application.id,
                          "criteriaB",
                          value
                        )
                      }
                      value={getApplicationValue(
                        application.id,
                        "criteriaB",
                        application.criteriaB
                      )}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="APTO">APTO</SelectItem>
                        <SelectItem value="NAO_SE_APLICA">
                          Não se aplica
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Select
                      onValueChange={(value) =>
                        updateApplicationStatus(
                          application.id,
                          "criteriaC",
                          value
                        )
                      }
                      value={getApplicationValue(
                        application.id,
                        "criteriaC",
                        application.criteriaC
                      )}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="APTO">APTO</SelectItem>
                        <SelectItem value="NAO_SE_APLICA">
                          Não se aplica
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Select
                      onValueChange={(value) =>
                        updateApplicationStatus(
                          application.id,
                          "criteriaD",
                          value
                        )
                      }
                      value={getApplicationValue(
                        application.id,
                        "criteriaD",
                        application.criteriaD
                      )}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="APTO">APTO</SelectItem>
                        <SelectItem value="NAO_SE_APLICA">
                          Não se aplica
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Select
                      onValueChange={(value) =>
                        updateApplicationStatus(
                          application.id,
                          "criteriaE",
                          value
                        )
                      }
                      value={getApplicationValue(
                        application.id,
                        "criteriaE",
                        application.criteriaE
                      )}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="APTO">APTO</SelectItem>
                        <SelectItem value="NAO_SE_APLICA">
                          Não se aplica
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Select
                      onValueChange={(value) =>
                        updateApplicationStatus(
                          application.id,
                          "criteriaF",
                          value
                        )
                      }
                      value={getApplicationValue(
                        application.id,
                        "criteriaF",
                        application.criteriaF
                      )}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="APTO">APTO</SelectItem>
                        <SelectItem value="NAO_SE_APLICA">
                          Não se aplica
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Select
                      onValueChange={(value) =>
                        updateApplicationStatus(application.id, "item2514", value)
                      }
                      value={getApplicationValue(
                        application.id,
                        "item2514",
                        application.item2514
                      )}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="APTO">APTO</SelectItem>
                        <SelectItem value="NAO_SE_APLICA">
                          Não se aplica
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Select
                      onValueChange={(value) =>
                        updateApplicationStatus(application.id, "status", value)
                      }
                      value={getApplicationValue(
                        application.id,
                        "status",
                        application.status
                      )}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="DEFERIDO">Deferido</SelectItem>
                        <SelectItem value="DEFERIDO_COM_RESSALVAS">
                          Deferido com ressalvas
                        </SelectItem>
                        <SelectItem value="INDEFERIDO">Indeferido</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => saveChanges(application.id)}
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
        </div>
      </Card>
    </div>
  );
};

export default AdminPanel;
