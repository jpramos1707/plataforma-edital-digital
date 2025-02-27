
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Application } from "@/types/application";
import { ApplicationTable } from "./admin/ApplicationTable";
import { EvaluationCriteria } from "./admin/EvaluationCriteria";
import ApplicationDetailsModal from "./ApplicationDetailsModal";

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
      cpf: "123.456.789-00",
      birthDate: "01/01/1990",
      race: "Parda",
      phone: "(84) 99999-9999",
      email: "joao@example.com",
      cep: "59000-000",
      street: "Rua Principal",
      number: "123",
      neighborhood: "Centro",
      city: "Poço Branco",
      state: "RN",
      cultureMakerName: "Grupo Musical João Silva",
      cultureHistory: "História cultural do artista...",
      traditionalKnowledge: "Conhecimentos tradicionais...",
      diversityValue: "Valorização da diversidade...",
      images: [
        "https://example.com/image1.jpg",
        "https://example.com/image2.jpg",
      ],
      video: "https://example.com/video.mp4",
      illiterateVideo: "https://example.com/video2.mp4",
    },
  ]);

  const [selectedApplication, setSelectedApplication] = useState<Application | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
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
    return (pendingChanges[applicationId]?.[field] as string) || originalValue;
  };

  const openApplicationDetails = (application: Application) => {
    setSelectedApplication(application);
    setIsModalOpen(true);
  };

  return (
    <div className="container mx-auto p-6 animate-fadeIn">
      <Card className="bg-white shadow-lg rounded-xl p-6">
        <h1 className="text-2xl font-semibold text-center mb-6 text-primary">
          Painel do Parecerista(Avaliação)
        </h1>
        
        <EvaluationCriteria />
        
        <div className="overflow-x-auto">
          <ApplicationTable
            applications={applications}
            pendingChanges={pendingChanges}
            onStatusChange={updateApplicationStatus}
            onSave={saveChanges}
            onViewDetails={openApplicationDetails}
            getApplicationValue={getApplicationValue}
          />
        </div>
      </Card>
      
      <ApplicationDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        application={selectedApplication}
      />
    </div>
  );
};

export default AdminPanel;
