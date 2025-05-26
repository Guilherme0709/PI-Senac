
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useToast } from '@/components/ui/use-toast';

// Schema de validação do formulário
const formSchema = z.object({
  nome: z.string().min(3, {
    message: 'O nome do terreno deve ter pelo menos 3 caracteres.',
  }),
  localizacao: z.string().min(5, {
    message: 'Forneça um endereço válido.',
  }),
  tamanho: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: 'O tamanho deve ser um número positivo.',
  }),
  tipoSolo: z.string().min(1, {
    message: 'Selecione o tipo de solo.',
  }),
  usoPretendido: z.string().min(1, {
    message: 'Selecione o uso pretendido.',
  }),
  valor: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: 'O valor deve ser um número positivo.',
  }),
  descricao: z.string().optional(),
});

const CadastrarTerreno = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [imagens, setImagens] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  useEffect(() => {
    // Verificar se o usuário está logado e é um cliente
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      
      if (userData.userType !== "cliente" && userData.userType !== "diretoria") {
        toast({
          title: "Acesso restrito",
          description: "Apenas clientes e diretoria podem cadastrar terrenos.",
          variant: "destructive",
        });
        navigate("/dashboard");
      }
    } else {
      navigate('/');
    }
  }, [navigate, toast]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: '',
      localizacao: '',
      tamanho: '',
      tipoSolo: '',
      usoPretendido: '',
      valor: '',
      descricao: '',
    },
  });

  const handleImagemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files);
      setImagens([...imagens, ...fileArray]);
      
      // Criar URLs para preview
      const newPreviews = fileArray.map(file => URL.createObjectURL(file));
      setPreviews([...previews, ...newPreviews]);
    }
  };

  const handleRemoverImagem = (index: number) => {
    const novasImagens = [...imagens];
    const novosPreviews = [...previews];
    
    // Revogar URL para evitar memory leak
    URL.revokeObjectURL(novosPreviews[index]);
    
    novasImagens.splice(index, 1);
    novosPreviews.splice(index, 1);
    
    setImagens(novasImagens);
    setPreviews(novosPreviews);
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    // Simulando envio para API
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Exibir notificação
    toast({
      title: 'Terreno cadastrado com sucesso',
      description: `O terreno ${values.nome} foi adicionado ao sistema.`,
    });

    // Mostrar os dados no console (seria enviado para API em uma implementação real)
    console.log('Dados do terreno:', { ...values, imagens });

    setIsLoading(false);
    navigate('/meus-terrenos');
  }

  if (!user) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Cadastrar Terreno</h1>
        <p className="text-muted-foreground">
          Adicione um novo terreno ao sistema
        </p>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Informações do Terreno</CardTitle>
          <CardDescription>
            Preencha os dados abaixo para cadastrar um novo terreno.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="nome"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome do Terreno</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Terreno Residencial Jardim das Flores" {...field} />
                    </FormControl>
                    <FormDescription>
                      Um nome que identifique facilmente o terreno.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="localizacao"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Localização</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Rua das Palmeiras, 123 - Bairro Centro" {...field} />
                    </FormControl>
                    <FormDescription>
                      Endereço completo ou coordenadas do terreno.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="tamanho"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tamanho (m²)</FormLabel>
                      <FormControl>
                        <Input type="number" min="0" placeholder="Ex: 500" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="valor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Valor (R$)</FormLabel>
                      <FormControl>
                        <Input type="number" min="0" placeholder="Ex: 150000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="tipoSolo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tipo de Solo</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o tipo de solo" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="arenoso">Arenoso</SelectItem>
                          <SelectItem value="argiloso">Argiloso</SelectItem>
                          <SelectItem value="humoso">Humoso</SelectItem>
                          <SelectItem value="calcario">Calcário</SelectItem>
                          <SelectItem value="misto">Misto</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="usoPretendido"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Uso Pretendido</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o uso pretendido" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="residencial">Residencial</SelectItem>
                          <SelectItem value="comercial">Comercial</SelectItem>
                          <SelectItem value="misto">Misto</SelectItem>
                          <SelectItem value="industrial">Industrial</SelectItem>
                          <SelectItem value="agricola">Agrícola</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="descricao"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descrição (opcional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Descreva características adicionais do terreno..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div>
                <FormLabel>Imagens do Terreno</FormLabel>
                <div className="mt-2 space-y-2">
                  <Input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImagemChange}
                    className="cursor-pointer"
                  />
                  <FormDescription>
                    Você pode fazer upload de múltiplas imagens. Formatos suportados: JPG, PNG, GIF.
                  </FormDescription>
                </div>

                {previews.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium mb-2">Imagens selecionadas:</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {previews.map((preview, index) => (
                        <div key={index} className="relative">
                          <img
                            src={preview}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-20 object-cover rounded-md"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            className="absolute top-0 right-0 h-6 w-6 p-0"
                            onClick={() => handleRemoverImagem(index)}
                          >
                            ✕
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Cadastrando..." : "Salvar Terreno"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CadastrarTerreno;
