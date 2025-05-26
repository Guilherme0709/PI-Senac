
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";

// Dados de exemplo para as propostas
const terrenosExemplo = [
  {
    id: "1",
    nome: "Terreno Residencial Alvorada",
    localizacao: "Rua das Flores, 123 - Jardim Alvorada",
    tamanho: "500",
    valor: "180000",
    status: "Pendente"
  },
  {
    id: "2",
    nome: "Terreno Comercial Centro",
    localizacao: "Avenida Central, 500 - Centro",
    tamanho: "1200",
    valor: "450000",
    status: "Pendente"
  },
  {
    id: "3",
    nome: "Lote Industrial ZN",
    localizacao: "Rodovia BR-101, Km 15 - Zona Norte",
    tamanho: "5000",
    valor: "950000",
    status: "Pendente"
  }
];

const AprovacaoPropostas = () => {
  const [user, setUser] = useState<any>(null);
  const [terrenos, setTerrenos] = useState(terrenosExemplo);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar se o usuário é da diretoria
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      
      if (userData.userType !== "diretoria") {
        toast({
          title: "Acesso negado",
          description: "Você não tem permissão para acessar esta página.",
          variant: "destructive",
        });
        navigate("/dashboard");
      }
    } else {
      navigate("/");
    }
  }, [navigate, toast]);

  const handleAprovarProposta = (id: string) => {
    setTerrenos(prevTerrenos => 
      prevTerrenos.map(terreno => 
        terreno.id === id ? { ...terreno, status: "Aprovado" } : terreno
      )
    );
    
    toast({
      title: "Proposta aprovada",
      description: "A proposta foi aprovada com sucesso.",
    });
  };
  
  const handleRecusarProposta = (id: string) => {
    setTerrenos(prevTerrenos => 
      prevTerrenos.map(terreno => 
        terreno.id === id ? { ...terreno, status: "Recusado" } : terreno
      )
    );
    
    toast({
      title: "Proposta recusada",
      description: "A proposta foi recusada.",
    });
  };

  const handleVerDetalhes = (id: string) => {
    navigate(`/terreno/${id}`);
  };

  if (!user || user.userType !== "diretoria") {
    return <div>Carregando...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Aprovação de Propostas</h1>
        <p className="text-muted-foreground">
          Análise e aprovação de propostas de compra de terrenos
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Propostas Pendentes</CardTitle>
          <CardDescription>Propostas que aguardam sua análise e aprovação</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome do Terreno</TableHead>
                <TableHead>Localização</TableHead>
                <TableHead>Tamanho (m²)</TableHead>
                <TableHead>Valor (R$)</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {terrenos.map((terreno) => (
                <TableRow key={terreno.id}>
                  <TableCell>{terreno.nome}</TableCell>
                  <TableCell>{terreno.localizacao}</TableCell>
                  <TableCell>{terreno.tamanho}</TableCell>
                  <TableCell>
                    {Number(terreno.valor).toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    })}
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      terreno.status === 'Aprovado' 
                        ? 'bg-green-100 text-green-800' 
                        : terreno.status === 'Recusado'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {terreno.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      {terreno.status === "Pendente" && (
                        <>
                          <Button 
                            variant="default" 
                            size="sm" 
                            onClick={() => handleAprovarProposta(terreno.id)}
                          >
                            Aprovar
                          </Button>
                          <Button 
                            variant="destructive" 
                            size="sm" 
                            onClick={() => handleRecusarProposta(terreno.id)}
                          >
                            Recusar
                          </Button>
                        </>
                      )}
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleVerDetalhes(terreno.id)}
                      >
                        Detalhes
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AprovacaoPropostas;
