import { Header } from "@/components/Header"
import { Card, CardContent } from "@/components/ui/card"

const Team = () => {
  const teamMembers = [
    {
      id: 1,
      name: "Dr. Ana Silva",
      role: "Coordenadora Geral",
      description: "Especialista em arborização urbana com mais de 15 anos de experiência em projetos de sustentabilidade ambiental."
    },
    {
      id: 2,
      name: "Carlos Mendes",
      role: "Analista de Dados",
      description: "Desenvolvedor especializado em análise de dados ambientais e criação de dashboards para monitoramento arbóreo."
    },
    {
      id: 3,
      name: "Maria Santos",
      role: "Bióloga",
      description: "Bióloga com foco em ecologia urbana e diagnóstico de saúde de árvores em ambientes metropolitanos."
    },
    {
      id: 4,
      name: "João Oliveira",
      role: "Engenheiro Florestal",
      description: "Engenheiro florestal responsável pelos estudos de risco e análise de estrutura das árvores urbanas."
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Main Content */}
      <main className="pt-28 px-4 md:px-6 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Conheça Nossa Equipe
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Profissionais especializados trabalhando para o futuro da arborização urbana
            </p>
          </div>
          
          {/* Grade de Membros da Equipe */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member) => (
              <Card key={member.id} className="bg-card hover:shadow-md transition-shadow duration-300 border border-border">
                <CardContent className="p-6 text-center">
                  {/* Placeholder para foto */}
                  <div className="w-24 h-24 bg-muted rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-muted-foreground text-xs">Foto</span>
                  </div>
                  
                  {/* Informações do membro */}
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {member.name}
                  </h3>
                  <p className="text-primary font-medium mb-3">
                    {member.role}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {member.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-background border-t border-border py-4 mt-8">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex items-center justify-center space-x-2">
            <span className="text-sm text-muted-foreground">Powered by</span>
            <img 
              src="/uploads/02aa4817-e1d0-4029-86e4-e7275defe1e0.png" 
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

export default Team