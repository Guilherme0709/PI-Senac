
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import CadastrarTerreno from "./pages/CadastrarTerreno";
import MeusTerrenos from "./pages/MeusTerrenos";
import AnaliseTerreno from "./pages/AnaliseTerreno";
import TerrenoDetalhes from "./pages/TerrenoDetalhes";
import AprovacaoPropostas from "./pages/AprovacaoPropostas";
import Perfil from "./pages/Perfil";
import NotFound from "./pages/NotFound";
import AppLayout from "./components/layout/AppLayout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/cadastrar-terreno" element={<CadastrarTerreno />} />
            <Route path="/meus-terrenos" element={<MeusTerrenos />} />
            <Route path="/analise-terreno" element={<AnaliseTerreno />} />
            <Route path="/analise-terreno/:id" element={<AnaliseTerreno />} />
            <Route path="/terreno/:id" element={<TerrenoDetalhes />} />
            <Route path="/aprovacao-propostas" element={<AprovacaoPropostas />} />
            <Route path="/perfil" element={<Perfil />} />
          </Route>
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
