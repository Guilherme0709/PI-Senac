
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/components/ui/use-toast";

// Dados de exemplo para os terrenos
const terrenosExemplo = [
  {
    id: "1",
    nome: "Terreno Residencial Alvorada",
    localizacao: "Rua das Flores, 123 - Jardim Alvorada",
    tamanho: "500",
    tipoSolo: "arenoso",
    usoPretendido: "residencial",
    valor: "180000"
  },
  {
    id: "2",
    nome: "Terreno Comercial Centro",
    localizacao: "Avenida Central, 500 - Centro",
    tamanho: "1200",
    tipoSolo: "argiloso",
    usoPretendido: "comercial",
    valor: "450000"
  },
  {
    id: "3",
    nome: "Lote Industrial ZN",
    localizacao: "Rodovia BR-101, Km 15 - Zona Norte",
    tamanho: "5000",
    tipoSolo: "misto",
    usoPretendido: "industrial",
    valor: "950000"
  }
];

// Schema de validação do formulário de análise
const formSchema = z.object({
  terrenoId: z.string().min(1, { message: "Selecione um terreno para análise." }),
  acessoInfraestrutura: z.number().min(1).max(5),
  zoneamento: z.string().min(1, { message: "Selecione o zoneamento." }),
  distanciaCentro: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
    message: "A distância deve ser um número positivo.",
  }),
  potencialValorizacao: z.number().min(1).max(5),
  resultado: z.string().min(1, { message: "Selecione o resultado da análise." }),
  observacoes: z.string().optional(),
  valorTerreno: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "O valor deve ser um número positivo.",
  }),
});

const AnaliseTerreno = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [terreno, setTerreno] = useState<any>(null);

  // Configurar o formulário
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      terrenoId: id || "",
      acessoInfraestrutura: 3,
      zoneamento: "",
      distanciaCentro: "",
      potencialValorizacao: 3,
      resultado: "",
      observacoes: "",
      valorTerreno: ""
    },
  });

  useEffect(() => {
    // Verificar se o usuário está logado e tem permissão
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      
      if (userData.userType !== "analista" && userData.userType !== "diretoria") {
        toast({
          title: "Acesso restrito",
          description: "Apenas analistas e diretoria podem realizar análises de terrenos.",
          variant: "destructive",
        });
        navigate("/dashboard");
      }
    } else {
      navigate("/");
    }

    // Se temos um ID nos parâmetros, carregar o terreno específico
    if (id) {
      const terrenoEncontrado = terrenosExemplo.find(t => t.id === id);
      if (terrenoEncontrado) {
        setTerreno(terrenoEncontrado);
        form.setValue("terrenoId", terrenoEncontrado.id);
        form.setValue("valorTerreno", terrenoEncontrado.valor);
      }
    }
  }, [navigate, toast, id, form]);

  // Quando o usuário selecionar um terreno diferente
  const handleTerrenoChange = (terrenoId: string) => {
    const terrenoSelecionado = terrenosExemplo.find(t => t.id === terrenoId);
    if (terrenoSelecionado) {
      setTerreno(terrenoSelecionado);
      form.setValue("valorTerreno", terrenoSelecionado.valor);
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    // Simulando envio para API
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast({
      title: "Análise concluída",
      description: `A análise do terreno foi registrada com sucesso.`,
    });

    console.log("Dados da análise:", values);
    
    setIsLoading(false);
    navigate("/dashboard");
  };

  if (!user) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Análise de Terreno</h1>
        <p className="text-muted-foreground">
          Realize análises técnicas e avaliações de viabilidade
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Formulário de Análise</CardTitle>
          <CardDescription>
            Preencha os campos para realizar a análise técnica do terreno selecionado.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="terrenoId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Selecione o Terreno</FormLabel>
                    <Select 
                      onValueChange={(value) => {
                        field.onChange(value);
                        handleTerrenoChange(value);
                      }}
                      defaultValue={field.value}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione um terreno para análise" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {terrenosExemplo.map((terreno) => (
                          <SelectItem key={terreno.id} value={terreno.id}>
                            {terreno.nome}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {terreno && (
                <div className="bg-muted p-4 rounded-md space-y-2">
                  <h3 className="font-medium">Informações do Terreno</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium">Localização:</p>
                      <p className="text-sm">{terreno.localizacao}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Tamanho:</p>
                      <p className="text-sm">{terreno.tamanho} m²</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Tipo de Solo:</p>
                      <p className="text-sm capitalize">{terreno.tipoSolo}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Uso Pretendido:</p>
                      <p className="text-sm capitalize">{terreno.usoPretendido}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="acessoInfraestrutura"
                  render={({ field: { value, onChange } }) => (
                    <FormItem>
                      <FormLabel>Acesso e Infraestrutura (1-5)</FormLabel>
                      <FormControl>
                        <div className="space-y-2">
                          <Slider
                            min={1}
                            max={5}
                            step={1}
                            value={[value]}
                            onValueChange={(vals) => onChange(vals[0])}
                          />
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>Ruim (1)</span>
                            <span>Excelente (5)</span>
                          </div>
                        </div>
                      </FormControl>
                      <FormDescription>
                        Avalie a qualidade de acessos e infraestrutura disponível.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="zoneamento"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Zoneamento</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o zoneamento" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="residencial">Zona Residencial</SelectItem>
                          <SelectItem value="comercial">Zona Comercial</SelectItem>
                          <SelectItem value="industrial">Zona Industrial</SelectItem>
                          <SelectItem value="mista">Zona Mista</SelectItem>
                          <SelectItem value="rural">Zona Rural</SelectItem>
                          <SelectItem value="especial">Zona de Uso Especial</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Zoneamento urbano conforme legislação municipal.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="distanciaCentro"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Distância de Centros Urbanos (km)</FormLabel>
                      <FormControl>
                        <Input type="number" min="0" step="0.1" {...field} />
                      </FormControl>
                      <FormDescription>
                        Distância em quilômetros até o centro urbano mais próximo.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="potencialValorizacao"
                  render={({ field: { value, onChange } }) => (
                    <FormItem>
                      <FormLabel>Potencial de Valorização (1-5)</FormLabel>
                      <FormControl>
                        <div className="space-y-2">
                          <Slider
                            min={1}
                            max={5}
                            step={1}
                            value={[value]}
                            onValueChange={(vals) => onChange(vals[0])}
                          />
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>Baixo (1)</span>
                            <span>Alto (5)</span>
                          </div>
                        </div>
                      </FormControl>
                      <FormDescription>
                        Avalie o potencial de valorização futura do terreno.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="valorTerreno"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Valor do Terreno (R$)</FormLabel>
                      <FormControl>
                        <Input type="number" min="0" {...field} />
                      </FormControl>
                      <FormDescription>
                        Valor estimado do terreno após análise técnica.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="resultado"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Resultado da Análise</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o resultado" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="aprovado">Aprovado para Aquisição</SelectItem>
                          <SelectItem value="aprovado_condicional">Aprovado com Ressalvas</SelectItem>
                          <SelectItem value="reprovado">Reprovado</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="observacoes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Observações do Analista</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Insira suas observações técnicas sobre o terreno..."
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? "Enviando..." : "Concluir Análise"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnaliseTerreno;
