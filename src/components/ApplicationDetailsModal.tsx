
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ApplicationDetails {
  id: string;
  name: string;
  cpf: string;
  birthDate: string;
  race: string;
  phone: string;
  email: string;
  culturalCategory: string;
  cep: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  cultureMakerName: string;
  cultureHistory: string;
  traditionalKnowledge: string;
  diversityValue: string;
  images: string[];
  video: string;
  illiterateVideo: string;
}

interface ApplicationDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  application: ApplicationDetails | null;
}

const ApplicationDetailsModal = ({
  isOpen,
  onClose,
  application,
}: ApplicationDetailsModalProps) => {
  if (!application) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[90vh]">
        <DialogHeader>
          <DialogTitle>Detalhes da Inscrição - {application.name}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-full pr-4">
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold">Nome completo</h3>
                <p>{application.name}</p>
              </div>
              <div>
                <h3 className="font-semibold">CPF</h3>
                <p>{application.cpf}</p>
              </div>
              <div>
                <h3 className="font-semibold">Data de Nascimento</h3>
                <p>{application.birthDate}</p>
              </div>
              <div>
                <h3 className="font-semibold">Raça/Cor</h3>
                <p>{application.race}</p>
              </div>
              <div>
                <h3 className="font-semibold">Telefone</h3>
                <p>{application.phone}</p>
              </div>
              <div>
                <h3 className="font-semibold">Email</h3>
                <p>{application.email}</p>
              </div>
              <div>
                <h3 className="font-semibold">Área de Atuação</h3>
                <p>{application.culturalCategory}</p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Endereço</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold">CEP</h3>
                  <p>{application.cep}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Logradouro</h3>
                  <p>{application.street}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Número</h3>
                  <p>{application.number}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Complemento</h3>
                  <p>{application.complement || "-"}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Bairro</h3>
                  <p>{application.neighborhood}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Município</h3>
                  <p>{application.city}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Estado</h3>
                  <p>{application.state}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold">Nome do projeto/fazedor de cultura</h3>
                <p>{application.cultureMakerName}</p>
              </div>
              <div>
                <h3 className="font-semibold">História da atuação Cultural</h3>
                <p className="whitespace-pre-wrap">{application.cultureHistory}</p>
              </div>
              <div>
                <h3 className="font-semibold">Práticas ou conhecimentos tradicionais</h3>
                <p className="whitespace-pre-wrap">{application.traditionalKnowledge}</p>
              </div>
              <div>
                <h3 className="font-semibold">Valorização da diversidade cultural</h3>
                <p className="whitespace-pre-wrap">{application.diversityValue}</p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Portfólio e Mídias</h3>
              
              <div>
                <h4 className="font-semibold mb-2">Imagens do Portfólio</h4>
                {application.images.length > 0 ? (
                  <div className="grid grid-cols-3 gap-4">
                    {application.images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`Imagem ${index + 1} do portfólio`}
                        className="rounded-lg w-full aspect-video object-cover"
                        onClick={() => window.open(image, '_blank')}
                        style={{ cursor: 'pointer' }}
                      />
                    ))}
                  </div>
                ) : (
                  <p>Nenhuma imagem disponível</p>
                )}
              </div>

              <div>
                <h4 className="font-semibold mb-2">Vídeo de Apresentação</h4>
                {application.video ? (
                  <video
                    controls
                    className="w-full rounded-lg"
                    src={application.video}
                  >
                    Seu navegador não suporta o elemento de vídeo.
                  </video>
                ) : (
                  <p>Vídeo não disponível</p>
                )}
              </div>

              <div>
                <h4 className="font-semibold mb-2">Vídeo Complementar</h4>
                {application.illiterateVideo ? (
                  <video
                    controls
                    className="w-full rounded-lg"
                    src={application.illiterateVideo}
                  >
                    Seu navegador não suporta o elemento de vídeo.
                  </video>
                ) : (
                  <p>Vídeo complementar não disponível</p>
                )}
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default ApplicationDetailsModal;
