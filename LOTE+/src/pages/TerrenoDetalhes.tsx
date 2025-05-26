
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, FileText, BarChart3, Check, X } from "lucide-react";

const TerrenoDetalhes = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Dados de exemplo (normalmente viriam de uma API)
  const terrenosExemplo = [
    {
      id: "1",
      nome: "Terreno Jardim das Flores",
      endereco: "Av. Principal, 123 - São Paulo, SP",
      tamanho: "1200",
      tipoSolo: "Argiloso",
      usoPretendido: "Residencial",
      dataCadastro: "10/05/2024",
      descricao: "Terreno plano localizado em área residencial com grande valorização. Próximo a parques e escolas.",
      documentacao: true,
      topografia: "Plana",
      ocupacoes: false,
      restricoesAmbientais: false,
      imagens: ["imagem1.jpg", "imagem2.jpg"]
    },
    {
      id: "2",
      nome: "Lote Comercial Centro",
      endereco: "Rua do Comércio, 456 - São Paulo, SP",
      tamanho: "850",
      tipoSolo: "Misto",
      usoPretendido: "Comercial",
      dataCadastro: "08/05/2024",
      descricao: "Lote estrategicamente localizado no centro comercial da cidade. Alta circulação de pessoas.",
      documentacao: true,
      topografia: "Levemente inclinado",
      ocupacoes: true,
      restricoesAmbientais: false,
      imagens: []
    },
    {
      id: "3",
      nome: "Terreno Parque Industrial",
      endereco: "Rodovia BR-101, Km 45 - Rio de Janeiro, RJ",
      tamanho: "5000",
      tipoSolo: "Arenoso",
      usoPretendido: "Industrial",
      dataCadastro: "05/05/2024",
      descricao: "Área ampla com acesso direto à rodovia, ideal para instalação de galpões e indústrias.",
      documentacao: false,
      topografia: "Irregular",
      ocupacoes: false,
      restricoesAmbientais: true,
      imagens: ["imagem3.jpg"]
    }
  ];

  // Procurando o terreno pelo ID
  const terreno = terrenosExemplo.find(t => t.id === id);

  if (!terreno) {
    return (
      <div className="flex flex-col items-center justify-center h-[500px] space-y-4">
        <FileText size={64} className="text-muted-foreground opacity-50" />
        <h1 className="text-2xl font-bold">Terreno não encontrado</h1>
        <p className="text-muted-foreground">
          O terreno que você está procurando não existe ou foi removido
        </p>
        <Button onClick={() => navigate("/meus-terrenos")}>
          Voltar para Meus Terrenos
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold">{terreno.nome}</h1>
          <div className="flex items-center text-muted-foreground mt-1">
            <MapPin size={16} className="mr-1" />
            <span>{terreno.endereco}</span>
          </div>
        </div>
        <div className="flex gap-3">
          <Button 
            variant="outline"
            onClick={() => navigate(`/analise-terreno/${terreno.id}`)}
          >
            <BarChart3 size={16} className="mr-2" />
            Analisar
          </Button>
          <Button 
            variant="outline"
            onClick={() => navigate(`/editar-terreno/${terreno.id}`)}
          >
            Editar
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Descrição do Terreno</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{terreno.descricao}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Informações Adicionais</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Documentação em dia</p>
                  <div className="flex items-center">
                    {terreno.documentacao ? (
                      <Check size={18} className="text-green-500 mr-1" />
                    ) : (
                      <X size={18} className="text-red-500 mr-1" />
                    )}
                    <span>{terreno.documentacao ? "Sim" : "Não"}</span>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Topografia</p>
                  <p className="font-medium">{terreno.topografia}</p>
                </div>
                
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Ocupações existentes</p>
                  <div className="flex items-center">
                    {terreno.ocupacoes ? (
                      <Check size={18} className="text-amber-500 mr-1" />
                    ) : (
                      <X size={18} className="text-green-500 mr-1" />
                    )}
                    <span>{terreno.ocupacoes ? "Sim" : "Não"}</span>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Restrições ambientais</p>
                  <div className="flex items-center">
                    {terreno.restricoesAmbientais ? (
                      <Check size={18} className="text-amber-500 mr-1" />
                    ) : (
                      <X size={18} className="text-green-500 mr-1" />
                    )}
                    <span>{terreno.restricoesAmbientais ? "Sim" : "Não"}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Documentos e Imagens</CardTitle>
            </CardHeader>
            <CardContent>
              {terreno.imagens.length === 0 ? (
                <div className="text-center py-8">
                  <FileText size={32} className="mx-auto text-muted-foreground opacity-50 mb-2" />
                  <p className="text-muted-foreground">Nenhum documento ou imagem anexado</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {terreno.imagens.map((imagem, index) => (
                    <div 
                      key={index}
                      className="border rounded-md h-40 bg-slate-100 flex items-center justify-center"
                    >
                      <FileText size={32} className="text-muted-foreground opacity-50" />
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Adicionar Documento ou Imagem
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informações Básicas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Tamanho</p>
                <p className="text-lg font-medium">{terreno.tamanho} m²</p>
              </div>
              
              <Separator />
              
              <div>
                <p className="text-sm text-muted-foreground">Tipo de Solo</p>
                <p className="text-lg font-medium">{terreno.tipoSolo}</p>
              </div>
              
              <Separator />
              
              <div>
                <p className="text-sm text-muted-foreground">Uso Pretendido</p>
                <Badge variant="outline" className="mt-1">{terreno.usoPretendido}</Badge>
              </div>
              
              <Separator />
              
              <div className="flex items-center">
                <Calendar size={16} className="mr-2 text-muted-foreground" />
                <span className="text-sm">
                  Cadastrado em <span className="font-medium">{terreno.dataCadastro}</span>
                </span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Localização</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-slate-100 h-64 rounded-md flex items-center justify-center">
                <MapPin size={32} className="text-muted-foreground opacity-50" />
              </div>
              <p className="text-sm text-muted-foreground text-center mt-2">
                {terreno.endereco}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TerrenoDetalhes;
