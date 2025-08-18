import { Header } from "@/components/Header"

const AboutProject = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Main Content */}
      <main className="pt-28 px-4 md:px-6 py-8 bg-background min-h-screen">
        <div className="max-w-4xl mx-auto">
          {/* Placeholder para imagem/vídeo */}
          <div className="bg-black rounded-lg min-h-[300px] md:min-h-[400px] lg:min-h-[500px] mb-8 flex items-center justify-center">
            <span className="text-white text-lg md:text-xl font-medium">
              Placeholder para Imagem/Vídeo
            </span>
          </div>
          
          {/* Conteúdo de texto */}
          <div className="bg-card rounded-lg p-6 md:p-8 shadow-sm border border-border">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
              Sobre o Projeto
            </h1>
            
            <div className="space-y-6 text-foreground/90">
              <p className="text-lg leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute 
                irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla 
                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia 
                deserunt mollit anim id est laborum.
              </p>
              
              <p className="text-lg leading-relaxed">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque 
                laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi 
                architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas 
                sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione 
                voluptatem sequi nesciunt.
              </p>
              
              <p className="text-lg leading-relaxed">
                Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci 
                velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam 
                quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis 
                suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur.
              </p>
            </div>
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

export default AboutProject