import { useState, useEffect } from "react"
import { Header } from "@/components/Header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { MultiSelectDropdown } from "@/components/MultiSelectDropdown"
import { 
  TreePine, 
  Activity, 
  BarChart3, 
  Shield, 
  Leaf,
  Zap,
  ChevronRight,
  PlayCircle,
  Triangle,
  Target,
  MapPin,
  Paperclip,
  Search,
  Bell,
  Book
} from "lucide-react"

const Index = () => {
  const [currentView, setCurrentView] = useState("todos")
  const [currentParameter, setCurrentParameter] = useState<string | null>(null)
  const [isParameterManagementMode, setIsParameterManagementMode] = useState(false)
  const metricsCards = [
    {
      title: "Total de Registros",
      value: "XXXXX",
      iconSrc: "/icons/icone_registro1.png",
      iconColor: "text-metric-green",
      bgColor: "bg-metric-green/10"
    },
    {
      title: "Nº de Espécies",
      value: "152",
      iconSrc: "/icons/icone_DAP.png",
      iconColor: "text-metric-blue",
      bgColor: "bg-metric-blue/10"
    },
    {
      title: "Nº de Famílias",
      value: "34",
      iconSrc: "/icons/icone_area_copa.png",
      iconColor: "text-metric-purple",
      bgColor: "bg-metric-purple/10"
    }
  ]

  const filterOptions = [
    { 
      label: "Família", 
      value: "familia", 
      options: [
        { value: "todas", label: "Todas" },
        { value: "myrtaceae", label: "Myrtaceae" },
        { value: "fabaceae", label: "Fabaceae" },
        { value: "arecaceae", label: "Arecaceae" },
        { value: "bignoniaceae", label: "Bignoniaceae" }
      ]
    },
    { 
      label: "Espécie", 
      value: "especie", 
      options: [
        { value: "todas", label: "Todas" },
        { value: "eucalyptus", label: "Eucalyptus" },
        { value: "ipê", label: "Ipê" },
        { value: "palmeira", label: "Palmeira" }
      ]
    },
    { 
      label: "Nome Popular", 
      value: "nome_popular", 
      options: [
        { value: "todos", label: "Todos" },
        { value: "ipe_amarelo", label: "Ipê Amarelo" },
        { value: "eucalipto", label: "Eucalipto" },
        { value: "palmeira_imperial", label: "Palmeira Imperial" }
      ]
    },
    { 
      label: "Nativas ou Exóticas", 
      value: "origem", 
      options: [
        { value: "ambas", label: "Ambas" },
        { value: "nativas", label: "Nativas" },
        { value: "exoticas", label: "Exóticas" }
      ]
    },
    { 
      label: "Bairro", 
      value: "bairro", 
      options: [
        { value: "todos", label: "Todos" },
        { value: "centro", label: "Centro" },
        { value: "jardins", label: "Jardins" },
        { value: "vila_nova", label: "Vila Nova" }
      ]
    },
    { 
      label: "Logradouro", 
      value: "logradouro", 
      options: [
        { value: "todos", label: "Todos" },
        { value: "rua_principal", label: "Rua Principal" },
        { value: "av_central", label: "Avenida Central" },
        { value: "pca_arvores", label: "Praça das Árvores" }
      ]
    }
  ]

  const features = [
    {
      icon: TreePine,
      title: "Diagnóstico Avançado",
      description: "Análise detalhada da saúde das árvores com tecnologia de ponta"
    },
    {
      icon: Activity,
      title: "Monitoramento em Tempo Real",
      description: "Acompanhamento contínuo dos indicadores de vitalidade"
    },
    {
      icon: BarChart3,
      title: "Relatórios Inteligentes",
      description: "Dashboards e relatórios automatizados para tomada de decisão"
    },
    {
      icon: Shield,
      title: "Gestão Preventiva",
      description: "Identificação precoce de problemas e medidas preventivas"
    }
  ]

  const stats = [
    { label: "Árvores Monitoradas", value: "2,847", trend: "+12%" },
    { label: "Diagnósticos Ativos", value: "156", trend: "+8%" },
    { label: "Taxa de Precisão", value: "94.2%", trend: "+2.1%" }
  ]

  // Effect para escutar mudanças de projeto do Header
  useEffect(() => {
    const handleProjectChange = (event: CustomEvent) => {
      setCurrentView(event.detail.projectId)
      setIsParameterManagementMode(false)
      setCurrentParameter(null)
    }

    const handleParameterManagementChange = (event: CustomEvent) => {
      setCurrentParameter(event.detail.parameter)
      setIsParameterManagementMode(true)
      setCurrentView("todos") // Força visualização com mapa
    }

    window.addEventListener('projectChanged', handleProjectChange as EventListener)
    window.addEventListener('parameterManagementChanged', handleParameterManagementChange as EventListener)
    
    return () => {
      window.removeEventListener('projectChanged', handleProjectChange as EventListener)
      window.removeEventListener('parameterManagementChanged', handleParameterManagementChange as EventListener)
    }
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Metrics Cards Section - Oculto no modo gerenciamento */}
      {!isParameterManagementMode && (
        <section className="px-4 md:px-6 py-8 bg-background pt-28">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {metricsCards.map((metric, index) => (
                <Card key={index} className="bg-card hover:shadow-md transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-muted-foreground mb-1">
                          {metric.title}
                        </p>
                        <p className="text-2xl font-bold text-foreground">
                          {metric.value}
                        </p>
                      </div>
                      <img 
                        src={metric.iconSrc} 
                        alt={metric.title} 
                        className="h-12 w-12 object-contain rounded-lg"
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {/* Botão Catálogo de Espécies */}
              <Button 
                className="h-full min-h-[120px] bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => console.log('Navegar para catálogo de espécies')}
              >
                <div className="flex flex-col items-center gap-2">
                  <Book className="h-8 w-8" />
                  <span>Catálogo de Espécies</span>
                </div>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Filters Section - Oculto no modo gerenciamento */}
      {!isParameterManagementMode && (
        <section className="px-4 md:px-6 py-6">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 md:p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Filtros</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                {/* Multi-Select Dropdown Filters */}
                {filterOptions.map((filter) => (
                  <div key={filter.value} className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      {filter.label}
                    </label>
                    <MultiSelectDropdown
                      options={filter.options}
                      placeholder="Selecionar"
                      onSelectionChange={(values) => {
                        console.log(`${filter.label} selected:`, values)
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Visualização de Situação - Visível apenas quando "Situação" está selecionada no gerenciamento */}
      {isParameterManagementMode && currentParameter === "Situação" && (
        <div id="situacao-view" className="pt-28">
          {/* Barra de Filtros Superior */}
          <section className="px-4 md:px-6 py-6">
            <div className="max-w-7xl mx-auto">
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 md:p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Filtros - Situação</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-4">
                  {/* Filtro Situação */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Situação
                    </label>
                    <MultiSelectDropdown
                      options={[
                        { value: "todas", label: "Todas" },
                        { value: "ativa", label: "Ativa" },
                        { value: "inativa", label: "Inativa" },
                        { value: "pendente", label: "Pendente" }
                      ]}
                      placeholder="Selecionar"
                    />
                  </div>
                  
                  {/* Filtro Família */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Família
                    </label>
                    <MultiSelectDropdown
                      options={[
                        { value: "todas", label: "Todas" },
                        { value: "myrtaceae", label: "Myrtaceae" },
                        { value: "fabaceae", label: "Fabaceae" },
                        { value: "arecaceae", label: "Arecaceae" },
                        { value: "bignoniaceae", label: "Bignoniaceae" }
                      ]}
                      placeholder="Selecionar"
                    />
                  </div>
                  
                  {/* Campo de busca Espécies */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Espécies
                    </label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input 
                        type="text" 
                        placeholder="Buscar espécies..." 
                        className="pl-10"
                      />
                    </div>
                  </div>
                  
                  {/* Filtro Bairro */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Bairro
                    </label>
                    <MultiSelectDropdown
                      options={[
                        { value: "todos", label: "Todos" },
                        { value: "centro", label: "Centro" },
                        { value: "jardins", label: "Jardins" },
                        { value: "vila_nova", label: "Vila Nova" }
                      ]}
                      placeholder="Selecionar"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Área de Conteúdo Principal - Duas Colunas */}
          <section className="px-4 md:px-6 py-6">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Coluna da Esquerda - Mapa (Maior) */}
                <div className="flex-1 md:w-2/3">
                  <div className="bg-black rounded-lg min-h-[400px] sm:min-h-[500px] md:min-h-[600px] flex items-center justify-center">
                    <h3 className="text-white text-xl sm:text-2xl md:text-3xl font-semibold text-center px-4">
                      Área do Mapa
                    </h3>
                  </div>
                </div>

                {/* Coluna da Direita - Barra Lateral com Cards */}
                <div className="md:w-1/3 space-y-4">
                  {/* Card 1 - Total de Registros (Preenchido) */}
                  <Card className="bg-white">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-muted-foreground mb-1">
                            Total de Registros
                          </p>
                          <p className="text-2xl font-bold text-foreground">
                            XXXXX
                          </p>
                        </div>
                        <img 
                          src="/icons/icone_registro1.png" 
                          alt="Total de Registros" 
                          className="h-12 w-12 object-contain rounded-lg"
                        />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Cards 2-5 - Placeholders em branco */}
                  {[1, 2, 3, 4].map((index) => (
                    <Card key={index} className="bg-white">
                      <CardContent className="p-6">
                        <div className="h-16 flex items-center justify-center">
                          <p className="text-sm text-muted-foreground">
                            Card {index + 1} - Em desenvolvimento
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* Visualização de Espécies - Visível apenas quando "Espécies" está selecionada no gerenciamento */}
      {isParameterManagementMode && currentParameter === "Espécies" && (
        <div id="especies-view" className="pt-28">
          {/* Barra de Filtros Superior */}
          <section className="px-4 md:px-6 py-6">
            <div className="max-w-7xl mx-auto">
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 md:p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Filtros - Espécies</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-4">
                  {/* Filtro Situação */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Situação
                    </label>
                    <MultiSelectDropdown
                      options={[
                        { value: "todas", label: "Todas" },
                        { value: "ativa", label: "Ativa" },
                        { value: "inativa", label: "Inativa" },
                        { value: "pendente", label: "Pendente" }
                      ]}
                      placeholder="Selecionar"
                    />
                  </div>
                  
                  {/* Filtro Família */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Família
                    </label>
                    <MultiSelectDropdown
                      options={[
                        { value: "todas", label: "Todas" },
                        { value: "myrtaceae", label: "Myrtaceae" },
                        { value: "fabaceae", label: "Fabaceae" },
                        { value: "arecaceae", label: "Arecaceae" },
                        { value: "bignoniaceae", label: "Bignoniaceae" }
                      ]}
                      placeholder="Selecionar"
                    />
                  </div>
                  
                  {/* Campo de busca Espécies */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Espécies
                    </label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input 
                        type="text" 
                        placeholder="Buscar espécies..." 
                        className="pl-10"
                      />
                    </div>
                  </div>
                  
                  {/* Filtro Bairro */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Bairro
                    </label>
                    <MultiSelectDropdown
                      options={[
                        { value: "todos", label: "Todos" },
                        { value: "centro", label: "Centro" },
                        { value: "jardins", label: "Jardins" },
                        { value: "vila_nova", label: "Vila Nova" }
                      ]}
                      placeholder="Selecionar"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Área de Conteúdo Principal - Duas Colunas */}
          <section className="px-4 md:px-6 py-6">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Coluna da Esquerda - Mapa (Maior) */}
                <div className="flex-1 md:w-2/3">
                  <div className="bg-black rounded-lg min-h-[400px] sm:min-h-[500px] md:min-h-[600px] flex items-center justify-center">
                    <h3 className="text-white text-xl sm:text-2xl md:text-3xl font-semibold text-center px-4">
                      Área do Mapa
                    </h3>
                  </div>
                </div>

                {/* Coluna da Direita - Barra Lateral com Cards */}
                <div className="md:w-1/3 space-y-4">
                  {/* Card 1 - Total de Registros */}
                  <Card className="bg-white">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-muted-foreground mb-1">
                            Total de Registros
                          </p>
                          <p className="text-2xl font-bold text-foreground">
                            XXXXX
                          </p>
                        </div>
                        <img 
                          src="/icons/icone_registro1.png" 
                          alt="Total de Registros" 
                          className="h-12 w-12 object-contain rounded-lg"
                        />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Card 2 - Painel de Espécies */}
                  <Card className="bg-white">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg font-semibold text-gray-900">Espécies</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 pt-0">
                      <div className="border rounded-lg overflow-hidden">
                        <table className="w-full text-sm">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-3 py-2 text-left font-medium text-gray-700 border-b">
                                Espécie
                              </th>
                              <th className="px-3 py-2 text-left font-medium text-gray-700 border-b">
                                Nome da Família
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b hover:bg-gray-50">
                              <td className="px-3 py-2 text-gray-800">Cecropia hololeuca</td>
                              <td className="px-3 py-2 text-gray-600">Urticaceae</td>
                            </tr>
                            <tr className="border-b hover:bg-gray-50">
                              <td className="px-3 py-2 text-gray-800">Ficus benjamina</td>
                              <td className="px-3 py-2 text-gray-600">Moraceae</td>
                            </tr>
                            <tr className="border-b hover:bg-gray-50">
                              <td className="px-3 py-2 text-gray-800">Tipuana tipu</td>
                              <td className="px-3 py-2 text-gray-600">Fabaceae</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                              <td className="px-3 py-2 text-gray-800">Handroanthus sp.</td>
                              <td className="px-3 py-2 text-gray-600">Bignoniaceae</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* Visualização de Riscos - Visível apenas quando "Riscos" está selecionada no gerenciamento */}
      {isParameterManagementMode && currentParameter === "Riscos" && (
        <div id="risco-view" className="pt-28">
          {/* Barra de Filtros Superior */}
          <section className="px-4 md:px-6 py-6">
            <div className="max-w-7xl mx-auto">
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 md:p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Filtros - Riscos</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Filtro Risco Geral */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Risco Geral
                    </label>
                    <MultiSelectDropdown
                      options={[
                        { value: "todos", label: "Todos" },
                        { value: "baixo", label: "Baixo" },
                        { value: "medio", label: "Médio" },
                        { value: "alto", label: "Alto" }
                      ]}
                      placeholder="Selecionar"
                    />
                  </div>
                  
                  {/* Filtro Situação */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Situação
                    </label>
                    <MultiSelectDropdown
                      options={[
                        { value: "todas", label: "Todas" },
                        { value: "ativa", label: "Ativa" },
                        { value: "inativa", label: "Inativa" },
                        { value: "pendente", label: "Pendente" }
                      ]}
                      placeholder="Selecionar"
                    />
                  </div>
                  
                  {/* Filtro Família */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Família
                    </label>
                    <MultiSelectDropdown
                      options={[
                        { value: "todas", label: "Todas" },
                        { value: "myrtaceae", label: "Myrtaceae" },
                        { value: "fabaceae", label: "Fabaceae" },
                        { value: "arecaceae", label: "Arecaceae" },
                        { value: "bignoniaceae", label: "Bignoniaceae" }
                      ]}
                      placeholder="Selecionar"
                    />
                  </div>
                  
                  {/* Campo de busca Espécies */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Espécies
                    </label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input 
                        type="text" 
                        placeholder="Buscar espécies..." 
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Área de Conteúdo Principal - Duas Colunas */}
          <section className="px-4 md:px-6 py-6">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Coluna da Esquerda - Mapa (Maior) */}
                <div className="flex-1 md:w-2/3">
                  <div className="bg-black rounded-lg min-h-[400px] sm:min-h-[500px] md:min-h-[600px] flex items-center justify-center">
                    <h3 className="text-white text-xl sm:text-2xl md:text-3xl font-semibold text-center px-4">
                      Área do Mapa
                    </h3>
                  </div>
                </div>

                {/* Coluna da Direita - Barra Lateral Simplificada */}
                <div className="md:w-1/3">
                  {/* Card Único - Total de Registros */}
                  <Card className="bg-white">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-muted-foreground mb-1">
                            Total de Registros
                          </p>
                          <p className="text-2xl font-bold text-foreground">
                            XXXXX
                          </p>
                        </div>
                        <img 
                          src="/icons/icone_registro1.png" 
                          alt="Total de Registros" 
                          className="h-12 w-12 object-contain rounded-lg"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* Visualização de Fitossanidade - Visível apenas quando "Fitossanidade" está selecionada no gerenciamento */}
      {isParameterManagementMode && currentParameter === "Fitossanidade" && (
        <div id="fitossanidade-view" className="pt-28">
          {/* Barra de Filtros Superior */}
          <section className="px-4 md:px-6 py-6">
            <div className="max-w-7xl mx-auto">
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 md:p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Filtros - Fitossanidade</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Filtro Situação */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Situação
                    </label>
                    <MultiSelectDropdown
                      options={[
                        { value: "todas", label: "Todas" },
                        { value: "ativa", label: "Ativa" },
                        { value: "inativa", label: "Inativa" },
                        { value: "pendente", label: "Pendente" }
                      ]}
                      placeholder="Selecionar"
                    />
                  </div>
                  
                  {/* Filtro Família */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Família
                    </label>
                    <MultiSelectDropdown
                      options={[
                        { value: "todas", label: "Todas" },
                        { value: "myrtaceae", label: "Myrtaceae" },
                        { value: "fabaceae", label: "Fabaceae" },
                        { value: "arecaceae", label: "Arecaceae" },
                        { value: "bignoniaceae", label: "Bignoniaceae" }
                      ]}
                      placeholder="Selecionar"
                    />
                  </div>
                  
                  {/* Campo de busca Espécies */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Espécies
                    </label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input 
                        type="text" 
                        placeholder="Buscar espécies..." 
                        className="pl-10"
                      />
                    </div>
                  </div>
                  
                  {/* Filtro Bairro */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Bairro
                    </label>
                    <MultiSelectDropdown
                      options={[
                        { value: "todos", label: "Todos" },
                        { value: "centro", label: "Centro" },
                        { value: "jardins", label: "Jardins" },
                        { value: "vila_nova", label: "Vila Nova" }
                      ]}
                      placeholder="Selecionar"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Duas tabelas lado a lado */}
          <section className="px-4 md:px-6 py-6">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Tabela Identificação do Indivíduo */}
                <Card className="bg-white">
                  <CardHeader className="text-center">
                    <CardTitle className="font-bold text-lg text-gray-900">
                      IDENTIFICAÇÃO DO INDIVÍDUO
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="border-b">
                            <th className="border border-gray-300 px-4 py-3 bg-gray-50 font-semibold text-center text-gray-900">ID</th>
                            <th className="border border-gray-300 px-4 py-3 bg-gray-50 font-semibold text-center text-gray-900">Família</th>
                            <th className="border border-gray-300 px-4 py-3 bg-gray-50 font-semibold text-center text-gray-900">Espécie</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="hover:bg-gray-50">
                            <td className="border border-gray-300 px-4 py-3 text-center text-gray-800">001</td>
                            <td className="border border-gray-300 px-4 py-3 text-center text-gray-800">Myrtaceae</td>
                            <td className="border border-gray-300 px-4 py-3 text-center text-gray-800">Eucalyptus</td>
                          </tr>
                          <tr className="hover:bg-gray-50">
                            <td className="border border-gray-300 px-4 py-3 text-center text-gray-800">002</td>
                            <td className="border border-gray-300 px-4 py-3 text-center text-gray-800">Fabaceae</td>
                            <td className="border border-gray-300 px-4 py-3 text-center text-gray-800">Caesalpinia</td>
                          </tr>
                          <tr className="hover:bg-gray-50">
                            <td className="border border-gray-300 px-4 py-3 text-center text-gray-800">003</td>
                            <td className="border border-gray-300 px-4 py-3 text-center text-gray-800">Arecaceae</td>
                            <td className="border border-gray-300 px-4 py-3 text-center text-gray-800">Syagrus</td>
                          </tr>
                          <tr className="hover:bg-gray-50">
                            <td className="border border-gray-300 px-4 py-3 text-center text-gray-800">004</td>
                            <td className="border border-gray-300 px-4 py-3 text-center text-gray-800">Bignoniaceae</td>
                            <td className="border border-gray-300 px-4 py-3 text-center text-gray-800">Tabebuia</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>

                {/* Tabela Qualificação */}
                <Card className="bg-white">
                  <CardHeader className="text-center">
                    <CardTitle className="font-bold text-lg text-gray-900">
                      QUALIFICAÇÃO
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="border-b">
                            <th className="border border-gray-300 px-4 py-3 bg-gray-50 font-semibold text-center text-gray-900">Agente Causador</th>
                            <th className="border border-gray-300 px-4 py-3 bg-gray-50 font-semibold text-center text-gray-900">Sintoma</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="hover:bg-gray-50">
                            <td className="border border-gray-300 px-4 py-3 text-center text-gray-800">Fungos</td>
                            <td className="border border-gray-300 px-4 py-3 text-center text-gray-800">Manchas foliares</td>
                          </tr>
                          <tr className="hover:bg-gray-50">
                            <td className="border border-gray-300 px-4 py-3 text-center text-gray-800">Insetos</td>
                            <td className="border border-gray-300 px-4 py-3 text-center text-gray-800">Desfolhamento</td>
                          </tr>
                          <tr className="hover:bg-gray-50">
                            <td className="border border-gray-300 px-4 py-3 text-center text-gray-800">Bactérias</td>
                            <td className="border border-gray-300 px-4 py-3 text-center text-gray-800">Necrose</td>
                          </tr>
                          <tr className="hover:bg-gray-50">
                            <td className="border border-gray-300 px-4 py-3 text-center text-gray-800">Vírus</td>
                            <td className="border border-gray-300 px-4 py-3 text-center text-gray-800">Mosaico</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </div>

            </div>
          </section>
        </div>
      )}

      {/* Visualização de Qualificação - Visível apenas quando "Qualificação" está selecionada no gerenciamento */}
      {isParameterManagementMode && currentParameter === "Qualificação" && (
        <div id="qualificacao-view" className="pt-28">
          {/* Barra de Filtros Superior */}
          <section className="px-4 md:px-6 py-6">
            <div className="max-w-7xl mx-auto">
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 md:p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Filtros - Qualificação</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Filtro Parte das Árvores */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Parte das Árvores
                    </label>
                    <MultiSelectDropdown
                      options={[
                        { value: "copa", label: "Copa" },
                        { value: "raiz", label: "Raiz" },
                        { value: "tronco", label: "Tronco" }
                      ]}
                      placeholder="Selecionar"
                    />
                  </div>
                  
                  {/* Filtro Parâmetro */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Parâmetro
                    </label>
                    <MultiSelectDropdown
                      options={[
                        { value: "afloramento", label: "Apresenta Afloramento de Raízes e/ou Enovelamento" },
                        { value: "bifurcacao_baixo", label: "Bifurcação Abaixo do DAP" },
                        { value: "bifurcacao_acima", label: "Bifurcação Acima do DAP" },
                        { value: "brotacoes", label: "Brotações no Tronco" },
                        { value: "colar_enterrado", label: "Colar Enterrado/Não Visível" },
                        { value: "copa_desbalanceada", label: "Copa Desbalanceada" },
                        { value: "copa_caracteristica", label: "Copa e Estipe de Acordo com as Caract. da Espécie na Arborização" },
                        { value: "copa_normal", label: "Copa Normal" },
                        { value: "fuste_tortuoso", label: "Fuste com Elevada Tortuosidade" },
                        { value: "fustes_codominantes", label: "Fustes Codominantes" },
                        { value: "inclinacao_tronco", label: "Inclinação do Tronco" },
                        { value: "necessidade_poda", label: "Necessidade de Poda" },
                        { value: "poda_desequilibrada", label: "Poda Desequilibrada" },
                        { value: "poda_inadequada", label: "Poda Inadequada" },
                        { value: "casca_inclusa", label: "Presença de Casca Inclusa" },
                        { value: "galhos_lesionados", label: "Presença de Galhos Lesionados" },
                        { value: "galhos_mortos", label: "Presença de Galhos Mortos" },
                        { value: "galhos_quebrados", label: "Presença de Galhos Quebrados" },
                        { value: "insercao_v", label: "Presença de Inserção em V" },
                        { value: "raiz_normal", label: "Raiz com Aparência Normal" },
                        { value: "raizes_conflito", label: "Raízes em Conflito" },
                        { value: "sem_bifurcacao", label: "Sem Bifurcação" }
                      ]}
                      placeholder="Selecionar"
                    />
                  </div>
                  
                  {/* Filtro Família */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Família
                    </label>
                    <MultiSelectDropdown
                      options={[
                        { value: "myrtaceae", label: "Myrtaceae" },
                        { value: "fabaceae", label: "Fabaceae" },
                        { value: "arecaceae", label: "Arecaceae" },
                        { value: "bignoniaceae", label: "Bignoniaceae" }
                      ]}
                      placeholder="Selecionar"
                    />
                  </div>
                  
                  {/* Campo de busca Espécies */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Espécies
                    </label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input 
                        type="text" 
                        placeholder="Buscar espécies..." 
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Tabela principal */}
          <section className="px-4 md:px-6 py-6">
            <div className="max-w-7xl mx-auto">
              <Card className="bg-white">
                <CardContent className="p-6">
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b">
                          <th className="border border-gray-300 px-6 py-4 bg-gray-50 font-semibold text-center text-gray-900">
                            Indivíduo
                          </th>
                          <th className="border border-gray-300 px-6 py-4 bg-gray-50 font-semibold text-center text-gray-900">
                            Espécie
                          </th>
                          <th className="border border-gray-300 px-6 py-4 bg-gray-50 font-semibold text-center text-gray-900">
                            Parâmetro Qualificação
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="hover:bg-gray-50">
                          <td className="border border-gray-300 px-6 py-4 text-center text-gray-800">ARV-001</td>
                          <td className="border border-gray-300 px-6 py-4 text-center text-gray-800">Eucalyptus grandis</td>
                          <td className="border border-gray-300 px-6 py-4 text-center text-gray-800">Copa Normal</td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                          <td className="border border-gray-300 px-6 py-4 text-center text-gray-800">ARV-002</td>
                          <td className="border border-gray-300 px-6 py-4 text-center text-gray-800">Acacia mangium</td>
                          <td className="border border-gray-300 px-6 py-4 text-center text-gray-800">Necessidade de Poda</td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                          <td className="border border-gray-300 px-6 py-4 text-center text-gray-800">ARV-003</td>
                          <td className="border border-gray-300 px-6 py-4 text-center text-gray-800">Roystonea oleracea</td>
                          <td className="border border-gray-300 px-6 py-4 text-center text-gray-800">Copa Desbalanceada</td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                          <td className="border border-gray-300 px-6 py-4 text-center text-gray-800">ARV-004</td>
                          <td className="border border-gray-300 px-6 py-4 text-center text-gray-800">Tabebuia chrysotricha</td>
                          <td className="border border-gray-300 px-6 py-4 text-center text-gray-800">Presença de Galhos Mortos</td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                          <td className="border border-gray-300 px-6 py-4 text-center text-gray-800">ARV-005</td>
                          <td className="border border-gray-300 px-6 py-4 text-center text-gray-800">Eucalyptus grandis</td>
                          <td className="border border-gray-300 px-6 py-4 text-center text-gray-800">Bifurcação Acima do DAP</td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                          <td className="border border-gray-300 px-6 py-4 text-center text-gray-800">ARV-006</td>
                          <td className="border border-gray-300 px-6 py-4 text-center text-gray-800">Acacia mangium</td>
                          <td className="border border-gray-300 px-6 py-4 text-center text-gray-800">Raízes em Conflito</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
        </div>
      )}

      {/* Visualização de Mitigação - Visível apenas quando "Mitigação" está selecionada no gerenciamento */}
      {isParameterManagementMode && currentParameter === "Mitigação" && (
        <div id="mitigacao-view" className="pt-28">
          {/* Barra de Filtros Superior */}
          <section className="px-4 md:px-6 py-6">
            <div className="max-w-7xl mx-auto">
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 md:p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Filtros - Mitigação</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Filtro Parte das Árvores */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Parte das Árvores
                    </label>
                    <MultiSelectDropdown
                      options={[
                        { value: "copa", label: "Copa" },
                        { value: "raiz", label: "Raiz" },
                        { value: "tronco", label: "Tronco" }
                      ]}
                      placeholder="Selecionar"
                    />
                  </div>
                  
                  {/* Filtro Mitigação */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Mitigação
                    </label>
                    <MultiSelectDropdown
                      options={[
                        { value: "acompanhamento", label: "Acompanhamento" },
                        { value: "avaliacao_raizes", label: "Avaliação de Raízes" },
                        { value: "dendrocirurgia", label: "Dendrocirurgia" },
                        { value: "dessoterramento", label: "Dessoterramento" },
                        { value: "nao_se_aplica", label: "Não se Aplica" },
                        { value: "poda_emergencia", label: "Poda de Emergência" },
                        { value: "poda_formacao", label: "Poda de Formação" },
                        { value: "poda_levantamento", label: "Poda de Levantamento" },
                        { value: "poda_limpeza", label: "Poda de Limpeza" },
                        { value: "substituicao", label: "Substituição" },
                        { value: "supressao", label: "Supressão" },
                        { value: "tratamento_fitossanitario", label: "Tratamento Fitossanitário" },
                        { value: "tutoramento", label: "Tutoramento" }
                      ]}
                      placeholder="Selecionar"
                    />
                  </div>
                  
                  {/* Filtro Família */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Família
                    </label>
                    <MultiSelectDropdown
                      options={[
                        { value: "todas", label: "Todas" },
                        { value: "myrtaceae", label: "Myrtaceae" },
                        { value: "fabaceae", label: "Fabaceae" },
                        { value: "arecaceae", label: "Arecaceae" },
                        { value: "bignoniaceae", label: "Bignoniaceae" }
                      ]}
                      placeholder="Selecionar"
                    />
                  </div>
                  
                  {/* Campo de busca Espécies */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Espécies
                    </label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input 
                        type="text" 
                        placeholder="Buscar espécies..." 
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Tabela de Dados */}
          <section className="px-4 md:px-6 py-6">
            <div className="max-w-7xl mx-auto">
              <Card className="bg-white">
                <CardContent className="p-6">
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b">
                          <th className="border border-gray-300 px-6 py-4 bg-gray-50 font-semibold text-center text-gray-900">
                            ID
                          </th>
                          <th className="border border-gray-300 px-6 py-4 bg-gray-50 font-semibold text-center text-gray-900">
                            Família
                          </th>
                          <th className="border border-gray-300 px-6 py-4 bg-gray-50 font-semibold text-center text-gray-900">
                            Espécie
                          </th>
                          <th className="border border-gray-300 px-6 py-4 bg-gray-50 font-semibold text-center text-gray-900">
                            Mitigação
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="hover:bg-gray-50">
                          <td className="border border-gray-300 px-6 py-4 text-center text-gray-800">ARV-001</td>
                          <td className="border border-gray-300 px-6 py-4 text-center text-gray-800">Myrtaceae</td>
                          <td className="border border-gray-300 px-6 py-4 text-center text-gray-800">Eucalyptus grandis</td>
                          <td className="border border-gray-300 px-6 py-4 text-center text-gray-800">Poda de Limpeza</td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                          <td className="border border-gray-300 px-6 py-4 text-center text-gray-800">ARV-002</td>
                          <td className="border border-gray-300 px-6 py-4 text-center text-gray-800">Fabaceae</td>
                          <td className="border border-gray-300 px-6 py-4 text-center text-gray-800">Acacia mangium</td>
                          <td className="border border-gray-300 px-6 py-4 text-center text-gray-800">Poda de Formação</td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                          <td className="border border-gray-300 px-6 py-4 text-center text-gray-800">ARV-003</td>
                          <td className="border border-gray-300 px-6 py-4 text-center text-gray-800">Arecaceae</td>
                          <td className="border border-gray-300 px-6 py-4 text-center text-gray-800">Roystonea oleracea</td>
                          <td className="border border-gray-300 px-6 py-4 text-center text-gray-800">Acompanhamento</td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                          <td className="border border-gray-300 px-6 py-4 text-center text-gray-800">ARV-004</td>
                          <td className="border border-gray-300 px-6 py-4 text-center text-gray-800">Bignoniaceae</td>
                          <td className="border border-gray-300 px-6 py-4 text-center text-gray-800">Tabebuia chrysotricha</td>
                          <td className="border border-gray-300 px-6 py-4 text-center text-gray-800">Tratamento Fitossanitário</td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                          <td className="border border-gray-300 px-6 py-4 text-center text-gray-800">ARV-005</td>
                          <td className="border border-gray-300 px-6 py-4 text-center text-gray-800">Myrtaceae</td>
                          <td className="border border-gray-300 px-6 py-4 text-center text-gray-800">Eucalyptus camaldulensis</td>
                          <td className="border border-gray-300 px-6 py-4 text-center text-gray-800">Supressão</td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                          <td className="border border-gray-300 px-6 py-4 text-center text-gray-800">ARV-006</td>
                          <td className="border border-gray-300 px-6 py-4 text-center text-gray-800">Fabaceae</td>
                          <td className="border border-gray-300 px-6 py-4 text-center text-gray-800">Caesalpinia ferrea</td>
                          <td className="border border-gray-300 px-6 py-4 text-center text-gray-800">Poda de Emergência</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Área do Mapa */}
          <section className="px-4 md:px-6 py-6">
            <div className="max-w-7xl mx-auto">
              <div className="bg-black rounded-lg min-h-[400px] sm:min-h-[500px] md:min-h-[600px] flex items-center justify-center">
                <h3 className="text-white text-xl sm:text-2xl md:text-3xl font-semibold text-center px-4">
                  Área do Mapa
                </h3>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* Painel de Gerenciamento - Visível para outros parâmetros (não Situação, Espécies, Riscos, Fitossanidade, Qualificação nem Mitigação) */}
      {isParameterManagementMode && currentParameter !== "Situação" && currentParameter !== "Espécies" && currentParameter !== "Riscos" && currentParameter !== "Fitossanidade" && currentParameter !== "Qualificação" && currentParameter !== "Mitigação" && (
        <section className="px-4 md:px-6 py-6 pt-28">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 md:p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Filtros de Gerenciamento - {currentParameter}
              </h2>
              <p className="text-gray-600">
                Os filtros específicos para este parâmetro serão adicionados aqui.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Map Section - Visível quando "todos" está selecionado OU em modo gerenciamento (exceto Situação, Espécies, Riscos, Fitossanidade, Qualificação e Mitigação) */}
      {((currentView === "todos" && !isParameterManagementMode) || 
        (isParameterManagementMode && currentParameter !== "Situação" && currentParameter !== "Espécies" && currentParameter !== "Riscos" && currentParameter !== "Fitossanidade" && currentParameter !== "Qualificação" && currentParameter !== "Mitigação")) && (
        <section className="px-4 md:px-6 py-6">
          <div className="max-w-7xl mx-auto">
            <div className="bg-black rounded-lg min-h-[400px] sm:min-h-[500px] md:min-h-[600px] lg:min-h-[700px] flex items-center justify-center">
              <h3 className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-center px-4">
                Área do Mapa
              </h3>
            </div>
          </div>
        </section>
      )}

      {/* Tabela Section - Visível apenas quando "diagnosticos" está selecionado */}
      {currentView === "diagnosticos" && (
        <section className="px-4 md:px-6 py-6">
          <div className="max-w-7xl mx-auto">
            <div id="tabela-container" className="bg-white rounded-lg shadow-sm border border-gray-100 min-h-[400px] sm:min-h-[500px] md:min-h-[600px] lg:min-h-[700px] flex items-center justify-center">
              <div className="text-center">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-800 mb-4">
                  Diagnósticos Ativos
                </h3>
                <p className="text-gray-600 text-lg">
                  Tabela de diagnósticos será carregada aqui
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Relatórios Section - Visível apenas quando "relatorios" está selecionado */}
      {currentView === "relatorios" && (
        <section className="px-4 md:px-6 py-6">
          <div className="max-w-7xl mx-auto">
            <div id="relatorios-container" className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg shadow-sm border border-blue-200 min-h-[400px] sm:min-h-[500px] md:min-h-[600px] lg:min-h-[700px] flex items-center justify-center">
              <div className="text-center">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-blue-800 mb-4">
                  Área de Relatórios
                </h3>
                <p className="text-blue-600 text-lg">
                  Dashboard de relatórios será carregado aqui
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-background border-t border-border py-4 mt-8">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex items-center justify-center space-x-2">
            <span className="text-sm text-muted-foreground">Powered by</span>
            <img 
              src="/uploads/minimalista_arbosis.png" 
              alt="Arbosis Logo" 
              className="h-6 w-6 object-contain"
            />
            <span className="text-sm font-medium text-primary">Arbosis</span>
          </div>
        </div>
      </footer>

    </div>
  )
}

export default Index