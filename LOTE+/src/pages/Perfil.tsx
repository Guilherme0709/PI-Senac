
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

const Perfil = () => {
  const [user, setUser] = useState<{
    name: string;
    email: string;
    userType: string;
  } | null>(null);
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  
  const { toast } = useToast();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      setName(userData.name || "");
      setEmail(userData.email || "");
    }
  }, []);

  const handleSaveProfile = () => {
    if (name && email) {
      // Salvar informações de perfil
      const updatedUser = { ...user, name, email };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      setIsEditing(false);
      
      toast({
        title: "Perfil atualizado",
        description: "Suas informações foram salvas com sucesso."
      });
    }
  };

  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      toast({
        title: "Erro",
        description: "As senhas não correspondem.",
        variant: "destructive",
      });
      return;
    }
    
    // Aqui normalmente verificaria a senha atual no backend
    // Simulação de alteração de senha
    setIsChangingPassword(false);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    
    toast({
      title: "Senha alterada",
      description: "Sua senha foi alterada com sucesso."
    });
  };

  if (!user) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Perfil</h1>
        <p className="text-muted-foreground">Gerencie suas informações pessoais</p>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Informações pessoais</CardTitle>
          <CardDescription>Visualize e edite seus dados cadastrais</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="userType">Tipo de Usuário</Label>
            <Input id="userType" value={user.userType} disabled />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="name">Nome completo</Label>
            <Input 
              id="name" 
              value={name} 
              onChange={(e) => setName(e.target.value)}
              disabled={!isEditing} 
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              disabled={!isEditing} 
            />
          </div>

          {isEditing ? (
            <div className="flex gap-2">
              <Button onClick={handleSaveProfile}>Salvar alterações</Button>
              <Button variant="outline" onClick={() => setIsEditing(false)}>Cancelar</Button>
            </div>
          ) : (
            <Button onClick={() => setIsEditing(true)}>Editar informações</Button>
          )}
          
          <div className="border-t pt-4 mt-4">
            <h3 className="font-medium mb-2">Alterar senha</h3>
            
            {isChangingPassword ? (
              <div className="space-y-3">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Senha atual</Label>
                  <Input 
                    id="currentPassword" 
                    type="password"
                    value={currentPassword} 
                    onChange={(e) => setCurrentPassword(e.target.value)} 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="newPassword">Nova senha</Label>
                  <Input 
                    id="newPassword" 
                    type="password"
                    value={newPassword} 
                    onChange={(e) => setNewPassword(e.target.value)} 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirmar nova senha</Label>
                  <Input 
                    id="confirmPassword" 
                    type="password"
                    value={confirmPassword} 
                    onChange={(e) => setConfirmPassword(e.target.value)} 
                  />
                </div>
                
                <div className="flex gap-2">
                  <Button onClick={handleChangePassword}>Alterar senha</Button>
                  <Button variant="outline" onClick={() => setIsChangingPassword(false)}>Cancelar</Button>
                </div>
              </div>
            ) : (
              <Button variant="outline" onClick={() => setIsChangingPassword(true)}>
                Alterar senha
              </Button>
            )}
          </div>
        </CardContent>
        <CardFooter className="border-t pt-4"></CardFooter>
      </Card>
    </div>
  );
};

export default Perfil;
