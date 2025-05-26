
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, FileText, BarChart3, CheckCircle2 } from "lucide-react";

const Dashboard = () => {
  const [user, setUser] = useState<{ name: string, email: string, userType: string } | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Cards específicos para cada tipo de usuário
  const clienteCards = [
    {
      title: "Cadastrar Novo Terreno",
      description: "Adicione informações sobre um novo terreno ao sistema",
      icon: MapPin,
      route: "/cadastrar-terreno",
      color: "bg-blue-500",
    },
    {
      title: "Meus Terrenos",
      description: "Visualize e gerencie seus terrenos cadastrados",
      icon: FileText,
      route: "/meus-terrenos",
      color: "bg-green-500",
    }
  ];

  const analistaCards = [
    {
      title: "Todos os Terrenos",
      description: "Visualize todos os terrenos cadastrados no sistema",
      icon: FileText,
      route: "/meus-terrenos",
      color: "bg-blue-500",
    },
    {
      title: "Análise de Terreno",
      description: "Realize análises técnicas e avaliações de viabilidade",
      icon: BarChart3,
      route: "/analise-terreno",
      color: "bg-purple-500",
    }
  ];

  const diretoriaCards = [
    {
      title: "Todos os Terrenos",
      description: "Visualize todos os terrenos cadastrados no sistema",
      icon: FileText,
      route: "/meus-terrenos",
      color: "bg-blue-500",
    },
    {
      title: "Análise de Terreno",
      description: "Realize análises técnicas e avaliações de viabilidade",
      icon: BarChart3,
      route: "/analise-terreno",
      color: "bg-purple-500",
    },
    {
      title: "Aprovação de Propostas",
      description: "Revise e aprove propostas de compra",
      icon: CheckCircle2,
      route: "/aprovacao-propostas",
      color: "bg-amber-500",
    }
  ];

  // Seleciona os cards baseado no tipo de usuário
  const getUserCards = () => {
    switch (user?.userType) {
      case 'cliente':
        return clienteCards;
      case 'analista':
        return analistaCards;
      case 'diretoria':
        return diretoriaCards;
      default:
        return clienteCards; // Fallback para cliente
    }
  };

  const cards = getUserCards();

  const getUserTitle = () => {
    if (!user) return "Usuário";
    return `${user.name} (${user.userType.charAt(0).toUpperCase() + user.userType.slice(1)})`;
  };

  const getMetrics = () => {
    switch (user?.userType) {
      case 'cliente':
        return {
          terrenos: '0',
          analises: '0',
          ultima: 'Hoje'
        };
      case 'analista':
        return {
          terrenos: '15',
          analises: '8',
          ultima: 'Hoje'
        };
      case 'diretoria':
        return {
          terrenos: '15',
          analises: '8',
          propostas: '5',
          ultima: 'Hoje'
        };
      default:
        return {
          terrenos: '0',
          analises: '0',
          ultima: 'Hoje'
        };
    }
  };

  const metrics = getMetrics();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Bem-vindo, {getUserTitle()}!</h1>
        <p className="text-muted-foreground">
          Gerencie seus terrenos e análises em um só lugar
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {cards.map((card, index) => (
          <a href={card.route} key={index}>
            <Card className="hover:shadow-lg transition-all cursor-pointer h-full">
              <CardHeader className={`${card.color} text-white rounded-t-lg`}>
                <div className="flex justify-between items-center">
                  <CardTitle>{card.title}</CardTitle>
                  <card.icon size={24} />
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <CardDescription>{card.description}</CardDescription>
              </CardContent>
            </Card>
          </a>
        ))}
      </div>

      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Visão Geral</CardTitle>
            <CardDescription>Informações sobre sua conta e atividades</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total de terrenos:</span>
                <span className="font-medium">{metrics.terrenos}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Análises realizadas:</span>
                <span className="font-medium">{metrics.analises}</span>
              </div>
              {user?.userType === 'diretoria' && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Propostas pendentes:</span>
                  <span className="font-medium">{metrics.propostas}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-muted-foreground">Última atividade:</span>
                <span className="font-medium">{metrics.ultima}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
