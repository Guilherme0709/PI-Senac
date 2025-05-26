
import { useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Home, MapPin, FileText, BarChart3, User, LogOut, CheckCircle2 } from "lucide-react";
import { 
  Sidebar, 
  SidebarContent, 
  SidebarFooter, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarGroupLabel, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem, 
  SidebarTrigger
} from "@/components/ui/sidebar";
import { useToast } from "@/components/ui/use-toast";

export function AppSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [user, setUser] = useState<{ name: string, email: string, userType: string } | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Menu items baseados no tipo de usuário
  const getMenuItems = () => {
    const baseItems = [
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: Home,
      }
    ];

    const clienteItems = [
      ...baseItems,
      {
        title: "Cadastrar Terreno",
        url: "/cadastrar-terreno",
        icon: MapPin,
      },
      {
        title: "Meus Terrenos",
        url: "/meus-terrenos",
        icon: FileText,
      },
    ];

    const analistaItems = [
      ...baseItems,
      {
        title: "Todos os Terrenos",
        url: "/meus-terrenos",
        icon: FileText,
      },
      {
        title: "Análise de Terreno",
        url: "/analise-terreno",
        icon: BarChart3,
      },
    ];

    const diretoriaItems = [
      ...baseItems,
      {
        title: "Todos os Terrenos",
        url: "/meus-terrenos",
        icon: FileText,
      },
      {
        title: "Análise de Terreno",
        url: "/analise-terreno",
        icon: BarChart3,
      },
      {
        title: "Aprovação de Propostas",
        url: "/aprovacao-propostas",
        icon: CheckCircle2,
      },
    ];

    // Adicionar link para o perfil para todos os tipos de usuário
    const profileItem = {
      title: "Perfil",
      url: "/perfil",
      icon: User,
    };

    switch (user?.userType) {
      case 'cliente':
        return [...clienteItems, profileItem];
      case 'analista':
        return [...analistaItems, profileItem];
      case 'diretoria':
        return [...diretoriaItems, profileItem];
      default:
        return [...clienteItems, profileItem]; // Fallback para cliente
    }
  };

  const menuItems = getMenuItems();

  const handleLogout = () => {
    localStorage.removeItem("user");
    toast({
      title: "Sessão encerrada",
      description: "Você foi desconectado com sucesso.",
    });
    navigate("/");
  };

  return (
    <Sidebar>
      <SidebarHeader className="flex flex-col items-center p-4">
        <div className="flex items-center justify-between w-full">
          <span className="text-lg font-semibold text-sidebar-foreground">Lote+</span>
          <SidebarTrigger className="md:hidden" />
        </div>
        {user && (
          <div className="w-full text-sm text-sidebar-foreground/70 mt-2 px-2">
            {user.name} ({user.userType})
          </div>
        )}
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground opacity-70">Navegação</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={location.pathname === item.url}>
                    <Link to={item.url} className="flex items-center gap-3">
                      <item.icon size={18} />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 w-full p-2 rounded-md hover:bg-sidebar-accent text-sidebar-foreground"
        >
          <LogOut size={18} />
          <span>Sair</span>
        </button>
      </SidebarFooter>
    </Sidebar>
  );
}

export default AppSidebar;
