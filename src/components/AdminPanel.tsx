
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Application } from "@/types/application";
import { ApplicationTable } from "./admin/ApplicationTable";
import { EvaluationCriteria } from "./admin/EvaluationCriteria";
import ApplicationDetailsModal from "./ApplicationDetailsModal";
import { useSupabase } from "@/hooks/useSupabase";

const AdminPanel = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pendingChanges, setPendingChanges] = useState<{
    [key: string]: Partial<Application>;
  }>({});
  const [loadError, setLoadError] = useState<string | null>(null);

  const { fetchApplications, updateApplication } = useSupabase();

  useEffect(() => {
    const loadApplications = async () => {
      try {
        setLoading(true);
        setLoadError(null);
        const data = await fetchApplications();
        setApplications(data);
      } catch (error) {
        console.error("Erro ao carregar inscrições:", error);
        setLoadError("Erro ao carregar as inscrições. Por favor, recarregue a página.");
        toast.error("Erro ao carregar as inscrições. Por favor, recarregue a página.");
      } finally {
        setLoading(false);
      }
    };

    loadApplications();
    // Este useEffect só deve ser executado uma vez ao montar o componente
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const saveChanges = async (applicationId: string) => {
    const changes = pendingChanges[applicationId];
    if (!changes) return;

    try {
      // Atualizar no Supabase
      await updateApplication(applicationId, changes);

      // Atualizar o estado local
      setApplications((prev) =>
        prev.map((app) =>
          app.id === applicationId ? { ...app, ...changes } : app
        )
      );

      // Limpar as mudanças pendentes
      setPendingChanges((prev) => {
        const newPending = { ...prev };
        delete newPending[applicationId];
        return newPending;
      });

      toast.success("Alterações salvas com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar alterações:", error);
      toast.error("Erro ao salvar as alterações. Por favor, tente novamente.");
    }
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
        
        {loading ? (
          <div className="text-center py-8">Carregando inscrições...</div>
        ) : loadError ? (
          <div className="text-center py-8 text-red-500">
            {loadError}
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 transition-colors"
            >
              Recarregar página
            </button>
          </div>
        ) : applications.length === 0 ? (
          <div className="text-center py-8">Nenhuma inscrição encontrada.</div>
        ) : (
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
        )}
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
