
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Plus, FileText } from "lucide-react";

const MeusTerrenos = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("recentes");

  // Dados de exemplo (normalmente viriam de uma API)
  const terrenosExemplo = [
    {
      id: 1,
      nome: "Terreno Jardim das Flores",
      endereco: "Av. Principal, 123 - São Paulo, SP",
      tamanho: "1200",
      tipoSolo: "Argiloso",
      usoPretendido: "Residencial",
      dataCadastro: "2024-05-10"
    },
    {
      id: 2,
      nome: "Lote Comercial Centro",
      endereco: "Rua do Comércio, 456 - São Paulo, SP",
      tamanho: "850",
      tipoSolo: "Misto",
      usoPretendido: "Comercial",
      dataCadastro: "2024-05-08"
    },
    {
      id: 3,
      nome: "Terreno Parque Industrial",
      endereco: "Rodovia BR-101, Km 45 - Rio de Janeiro, RJ",
      tamanho: "5000",
      tipoSolo: "Arenoso",
      usoPretendido: "Industrial",
      dataCadastro: "2024-05-05"
    }
  ];

  // Filtragem e ordenação
  const filteredTerrenos = terrenosExemplo
    .filter(terreno => 
      filter === "" || 
      terreno.nome.toLowerCase().includes(filter.toLowerCase()) ||
      terreno.endereco.toLowerCase().includes(filter.toLowerCase())
    )
    .sort((a, b) => {
      if (sort === "recentes") {
        return new Date(b.dataCadastro).getTime() - new Date(a.dataCadastro).getTime();
      } else if (sort === "antigos") {
        return new Date(a.dataCadastro).getTime() - new Date(b.dataCadastro).getTime();
      } else if (sort === "nome") {
        return a.nome.localeCompare(b.nome);
      } else if (sort === "tamanho") {
        return parseFloat(b.tamanho) - parseFloat(a.tamanho);
      }
      return 0;
    });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Meus Terrenos</h1>
          <p className="text-muted-foreground">
            Gerencie todos os seus terrenos cadastrados
          </p>
        </div>
        <Button 
          className="bg-terra-500 hover:bg-terra-600"
          onClick={() => navigate("/cadastrar-terreno")}
        >
          <Plus size={18} className="mr-2" />
          Novo Terreno
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <Input
          placeholder="Buscar por nome ou localização..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="sm:max-w-xs"
        />
        <Select
          value={sort}
          onValueChange={(value) => setSort(value)}
        >
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Ordenar por" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="recentes">Mais recentes</SelectItem>
            <SelectItem value="antigos">Mais antigos</SelectItem>
            <SelectItem value="nome">Nome (A-Z)</SelectItem>
            <SelectItem value="tamanho">Tamanho (maior)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTerrenos.length === 0 ? (
          <div className="col-span-full text-center py-8">
            <FileText size={48} className="mx-auto text-muted-foreground opacity-50 mb-4" />
            <h3 className="text-lg font-medium">Nenhum terreno encontrado</h3>
            <p className="text-muted-foreground">
              Tente ajustar os filtros ou cadastre um novo terreno
            </p>
          </div>
        ) : (
          filteredTerrenos.map((terreno) => (
            <Card key={terreno.id} className="overflow-hidden hover:shadow-lg transition-all">
              <div className="bg-gray-100 h-40 flex items-center justify-center">
                <MapPin size={48} className="text-muted-foreground opacity-50" />
              </div>
              <CardHeader className="pb-2">
                <CardTitle>{terreno.nome}</CardTitle>
                <CardDescription className="flex items-start gap-1">
                  <MapPin size={14} className="mt-1 flex-shrink-0" />
                  <span>{terreno.endereco}</span>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">Tamanho:</span>
                    <p className="font-medium">{terreno.tamanho} m²</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Tipo de solo:</span>
                    <p className="font-medium">{terreno.tipoSolo}</p>
                  </div>
                  <div className="col-span-2">
                    <span className="text-muted-foreground">Uso pretendido:</span>
                    <p className="font-medium">{terreno.usoPretendido}</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between pt-2">
                <Button 
                  variant="outline"
                  size="sm"
                  onClick={() => navigate(`/analise-terreno/${terreno.id}`)}
                >
                  Analisar
                </Button>
                <Button 
                  variant="outline"
                  size="sm"
                  onClick={() => navigate(`/terreno/${terreno.id}`)}
                >
                  Ver Detalhes
                </Button>
              </CardFooter>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default MeusTerrenos;
