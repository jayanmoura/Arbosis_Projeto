import { useState, useEffect } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User, FileText, BarChart3, X, ChevronDown, Settings, Menu, Trash2 } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export const Header = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [selectedProject, setSelectedProject] = useState("todos")
  const [selectedProjectName, setSelectedProjectName] = useState("Arbosis")
  const [currentLogo, setCurrentLogo] = useState("/uploads/02aa4817-e1d0-4029-86e4-e7275defe1e0.png")
  const [showSystemText, setShowSystemText] = useState(true) // Controla se mostra "Sistema de Diagnóstico"
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false) // Controla se o usuário é admin
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSuperAdminModalOpen, setIsSuperAdminModalOpen] = useState(false)
  const [isSuperAdmin, setIsSuperAdmin] = useState(false)
  
  // Super Admin form states
  const [newUsername, setNewUsername] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [newUserRole, setNewUserRole] = useState("")
  const [allocatedProject, setAllocatedProject] = useState("")
  const [activeSection, setActiveSection] = useState("usuarios") // Controla qual seção está ativa no super admin

  const navItems = [
    { id: "inicio", label: "Início", path: "/" },
    { id: "sobre", label: "Sobre o Projeto", path: "/sobre" },
    { id: "equipe", label: "Equipe", path: "/equipe" }
  ]

  const projectOptions = [
    { id: "projeto1", name: "Projeto de Arborização Urbana - RJ" },
    { id: "projeto2", name: "Análise de Risco de Queda - SP" },
    { id: "projeto3", name: "Inventário Florestal - MG" }
  ]

  const projectItems = [
    { 
      id: "todos", 
      label: "Todos os Projetos", 
      icon: BarChart3, 
      logoUrl: "/uploads/02aa4817-e1d0-4029-86e4-e7275defe1e0.png"
    },
    { 
      id: "diagnosticos", 
      label: "Diagnósticos Ativos", 
      icon: FileText,
      logoUrl: "https://placehold.co/150x50/E63946/FFFFFF/png?text=Logo+Diagnóstico"
    },
    { 
      id: "relatorios", 
      label: "Relatórios", 
      icon: BarChart3,
      logoUrl: "https://placehold.co/150x50/457B9D/FFFFFF/png?text=Logo+Relatórios"
    }
  ]

  const adminParameters = [
    "Dendrometria",
    "Espécies", 
    "Fitossanidade",
    "Qualificação",
    "Riscos",
    "Conflitos",
    "Mitigação",
    "Entorno",
    "Valoração"
  ]

  const handleViewSelect = (viewId: string) => {
    setSelectedProject(viewId)
    
    // APENAS emite o evento para mudar a visualização, SEM alterar o cabeçalho
    window.dispatchEvent(new CustomEvent('projectChanged', { 
      detail: { projectId: viewId } 
    }))
  }

  const handleParameterSelect = (parameter: string) => {
    // Emite evento específico para gerenciamento de parâmetros
    window.dispatchEvent(new CustomEvent('parameterManagementChanged', { 
      detail: { parameter } 
    }))
  }

  const handleLogin = () => {
    console.log("Tentativa de login:", { username, password })
    
    // Verifica se os campos estão vazios
    if (!username.trim() || !password.trim()) {
      alert("Por favor, preencha usuário e senha.")
      return
    }
    
    // Verifica as credenciais
    if (username.trim() === "teste" && password.trim() === "123456") {
      console.log("Login bem-sucedido")
      // Login bem-sucedido - adiciona ambas as classes para o usuário teste
      document.body.classList.add('admin-logged-in')
      document.body.classList.add('super-admin-logged-in')
      
      // Fecha o modal e limpa os campos
      setIsLoginModalOpen(false)
      setUsername("")
      setPassword("")
    } else {
      console.log("Credenciais inválidas")
      // Login falhou
      alert("Usuário ou senha inválidos.")
    }
  }

  const handleOpenLoginModal = () => {
    setIsLoginModalOpen(true)
  }

  const handleLogout = () => {
    // Remove ambas as classes admin do body
    document.body.classList.remove('admin-logged-in')
    document.body.classList.remove('super-admin-logged-in')
  }

  const handleCreateUser = () => {
    if (!newUsername.trim() || !newPassword.trim() || !newUserRole) {
      alert("Por favor, preencha todos os campos.")
      return
    }
    
    // Para Sub-Administrador, também validar o projeto alocado
    if (newUserRole === "sub-admin" && !allocatedProject) {
      alert("Por favor, selecione um projeto para o Sub-Administrador.")
      return
    }
    
    // Aqui seria implementada a lógica de criação do usuário
    console.log("Criar usuário:", { newUsername, newPassword, newUserRole, allocatedProject })
    
    const projectText = newUserRole === "sub-admin" && allocatedProject 
      ? ` e alocado ao projeto "${projectOptions.find(p => p.id === allocatedProject)?.name}"`
      : ""
    
    alert(`Usuário "${newUsername}" criado com sucesso${projectText}!`)
    
    // Limpar campos
    setNewUsername("")
    setNewPassword("")
    setNewUserRole("")
    setAllocatedProject("")
  }

  const handleDeleteUser = (username: string) => {
    if (confirm(`Tem certeza que deseja excluir o usuário "${username}"?`)) {
      // Aqui seria implementada a lógica de exclusão do usuário
      console.log("Excluir usuário:", username)
      alert(`Usuário "${username}" excluído com sucesso!`)
    }
  }

  const handleProjectModalSelect = (projectId: string, projectName: string) => {
    setSelectedProjectName(projectName)
    setIsModalOpen(false)
    
    // Se for "Arbosis", volta ao padrão (logo Arbosis + texto)
    if (projectName === "Arbosis") {
      setCurrentLogo("/uploads/02aa4817-e1d0-4029-86e4-e7275defe1e0.png")
      setShowSystemText(true)
    } else {
      // Para outros projetos, usa logo genérico e oculta o texto
      setCurrentLogo("https://placehold.co/100x100/457B9D/FFFFFF/png?text=" + encodeURIComponent(projectName.split(' ')[0]))
      setShowSystemText(false)
    }
  }

  const handleHomeClick = () => {
    navigate("/")
    handleViewSelect("todos")
  }

  // Fechar menu mobile ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (isMobileMenuOpen && !target.closest('.mobile-menu-container') && !target.closest('.mobile-menu-trigger')) {
        setIsMobileMenuOpen(false)
      }
    }

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isMobileMenuOpen])

  const getActiveTab = () => {
    if (location.pathname === "/sobre") return "sobre"
    if (location.pathname === "/equipe") return "equipe"
    return "inicio"
  }

  // Effect para garantir que o logo padrão seja mostrado no carregamento inicial
  useEffect(() => {
    const logoElement = document.getElementById('logo-principal-projeto') as HTMLImageElement
    if (logoElement) {
      logoElement.src = currentLogo
    }
  }, [currentLogo])

  // Effect para verificar se o usuário é admin
  useEffect(() => {
    const checkAdminStatus = () => {
      setIsAdmin(document.body.classList.contains('admin-logged-in'))
      setIsSuperAdmin(document.body.classList.contains('super-admin-logged-in'))
    }
    
    checkAdminStatus()
    
    // Observer para detectar mudanças na classe do body
    const observer = new MutationObserver(checkAdminStatus)
    observer.observe(document.body, { 
      attributes: true, 
      attributeFilter: ['class'] 
    })
    
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <header className="arbosis-header fixed top-0 left-0 right-0 z-50 px-4 md:px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Menu Hambúrguer - Visível apenas em mobile */}
          <button 
            className="mobile-menu-trigger md:hidden flex items-center p-2 text-foreground hover:bg-muted rounded-lg"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu className="h-5 w-5" />
          </button>
          
          {/* Navegação Desktop - Oculta em mobile */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Button
                key={item.id}
                variant={getActiveTab() === item.id ? "arbosis-nav-active" : "arbosis-nav"}
                asChild={item.id !== "inicio"}
                onClick={item.id === "inicio" ? handleHomeClick : undefined}
              >
                {item.id === "inicio" ? (
                  <span>{item.label}</span>
                ) : (
                  <Link to={item.path}>{item.label}</Link>
                )}
              </Button>
            ))}

            {/* Dropdown Gerenciar Parâmetros - apenas para admins */}
            {isAdmin && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="arbosis-nav" className="space-x-2">
                    <Settings className="h-4 w-4" />
                    <span>Gerenciar Parâmetros</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-48 bg-popover border border-border shadow-lg">
                  {adminParameters.map((parameter) => (
                    <DropdownMenuItem 
                      key={parameter}
                      className="cursor-pointer hover:bg-muted focus:bg-muted"
                      onClick={() => handleParameterSelect(parameter)}
                    >
                      <span>{parameter}</span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </nav>

        {/* Logo Central */}
        <div className="flex-1 flex justify-center">
          <div className="flex items-center space-x-2 md:space-x-3">
            <img 
              id="logo-principal-projeto"
              src={currentLogo}
              alt="Logo do Projeto" 
              className="h-8 w-8 md:h-12 md:w-12 object-contain"
            />
            {showSystemText && (
              <div className="text-center">
                <h1 className="text-lg md:text-xl font-bold text-primary">Arbosis</h1>
                <p className="text-xs text-muted-foreground hidden md:block">Sistema de Diagnóstico</p>
              </div>
            )}
          </div>
        </div>

          {/* Navegação Direita */}
          <div className="flex items-center space-x-2 md:space-x-3">
            {/* Dropdown de Projeto - Oculto em mobile */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  id="seletor-de-projeto"
                  variant="arbosis-dropdown" 
                  className="space-x-2 hidden sm:flex"
                >
                  <span className="hidden lg:inline">Projeto: </span>
                  <span className="lg:hidden">{selectedProjectName}</span>
                  <span className="hidden lg:inline">{selectedProjectName}</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
               <DropdownMenuContent align="end" className="w-56 bg-popover border border-border shadow-lg">
                <DropdownMenuItem 
                  className="cursor-pointer hover:bg-muted focus:bg-muted"
                  onClick={() => handleViewSelect("diagnosticos")}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  <span>Diagnósticos Ativos</span>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="cursor-pointer hover:bg-muted focus:bg-muted"
                  onClick={() => handleViewSelect("relatorios")}
                >
                  <BarChart3 className="mr-2 h-4 w-4" />
                  <span>Relatórios</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  className="cursor-pointer hover:bg-muted focus:bg-muted"
                  onClick={() => setIsModalOpen(true)}
                >
                  <span>Selecionar Outro Projeto...</span>
                </DropdownMenuItem>
                {isSuperAdmin && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      className="cursor-pointer hover:bg-muted focus:bg-muted"
                      onClick={() => setIsSuperAdminModalOpen(true)}
                    >
                      <span>Painel de Controle Total</span>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Botão Administração / Deslogar - Compacto em mobile */}
            <Button 
              variant="arbosis-primary" 
              className="space-x-2"
              onClick={isAdmin ? handleLogout : handleOpenLoginModal}
            >
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">{isAdmin ? "Deslogar" : "Administração"}</span>
            </Button>
          </div>
        </div>
        
        {/* Menu Mobile - Visível apenas quando hamburger estiver aberto */}
        {isMobileMenuOpen && (
          <div className="mobile-menu-container md:hidden absolute top-full left-0 right-0 bg-background border-t border-border shadow-lg z-50">
            <div className="px-4 py-4 space-y-2">
              {navItems.map((item) => (
                <Button
                  key={item.id}
                  variant={getActiveTab() === item.id ? "arbosis-nav-active" : "arbosis-nav"}
                  asChild={item.id !== "inicio"}
                  onClick={() => {
                    if (item.id === "inicio") handleHomeClick()
                    setIsMobileMenuOpen(false)
                  }}
                  className="w-full justify-start"
                >
                  {item.id === "inicio" ? (
                    <span>{item.label}</span>
                  ) : (
                    <Link to={item.path} onClick={() => setIsMobileMenuOpen(false)}>
                      {item.label}
                    </Link>
                  )}
                </Button>
              ))}
              
              {/* Dropdown de Projeto no menu mobile */}
              <div className="pt-2 border-t border-border">
                <p className="text-sm text-muted-foreground mb-2">Projeto: {selectedProjectName}</p>
                <Button
                  variant="outline"
                  onClick={() => {
                    handleViewSelect("diagnosticos")
                    setIsMobileMenuOpen(false)
                  }}
                  className="w-full justify-start mb-2"
                >
                  <FileText className="mr-2 h-4 w-4" />
                  <span>Diagnósticos Ativos</span>
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    handleViewSelect("relatorios")
                    setIsMobileMenuOpen(false)
                  }}
                  className="w-full justify-start mb-2"
                >
                  <BarChart3 className="mr-2 h-4 w-4" />
                  <span>Relatórios</span>
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsModalOpen(true)
                    setIsMobileMenuOpen(false)
                  }}
                  className="w-full justify-start"
                >
                  <span>Selecionar Outro Projeto...</span>
                </Button>
              </div>
              
              {/* Menu de parâmetros admin no mobile */}
              {isAdmin && (
                <div className="pt-2 border-t border-border">
                  <p className="text-sm text-muted-foreground mb-2">Gerenciar Parâmetros</p>
                  {adminParameters.map((parameter) => (
                    <Button
                      key={parameter}
                      variant="outline"
                      onClick={() => {
                        handleParameterSelect(parameter)
                        setIsMobileMenuOpen(false)
                      }}
                      className="w-full justify-start mb-1"
                    >
                      <span>{parameter}</span>
                    </Button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Modal de Seleção de Projetos */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent id="modal-projetos" className="max-w-2xl bg-card border border-border shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-foreground">
              Selecionar Projeto
            </DialogTitle>
          </DialogHeader>
          
          <div className="grid gap-4">
            {/* Projeto Padrão Arbosis */}
            <Card 
              className="cursor-pointer hover:bg-muted/50 transition-colors border border-border"
              onClick={() => handleProjectModalSelect("arbosis", "Arbosis")}
            >
              <CardContent className="p-4">
                <h3 className="font-medium text-foreground">Arbosis - Sistema Principal</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Projeto principal de diagnóstico arbóreo
                </p>
              </CardContent>
            </Card>

            {/* Outros projetos */}
            {projectOptions.map((project) => (
              <Card 
                key={project.id}
                className="cursor-pointer hover:bg-muted/50 transition-colors border border-border"
                onClick={() => handleProjectModalSelect(project.id, project.name)}
              >
                <CardContent className="p-4">
                  <h3 className="font-medium text-foreground">{project.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Clique para selecionar este projeto
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal de Login */}
      <Dialog open={isLoginModalOpen} onOpenChange={setIsLoginModalOpen}>
        <DialogContent id="login-modal" className="max-w-md bg-card border border-border shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-foreground">
              Acesso Administrativo
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-sm font-medium text-foreground">
                Usuário
              </Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Digite seu usuário"
                className="w-full"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-foreground">
                Senha
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite sua senha"
                className="w-full"
              />
            </div>
            
            <div className="flex justify-end space-x-2 pt-4">
              <Button
                variant="outline"
                onClick={() => setIsLoginModalOpen(false)}
              >
                Cancelar
              </Button>
              <Button
                variant="arbosis-primary"
                onClick={handleLogin}
              >
                Entrar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal de Super Admin */}
      <Dialog open={isSuperAdminModalOpen} onOpenChange={setIsSuperAdminModalOpen}>
        <DialogContent id="super-admin-modal" className="max-w-[95vw] lg:max-w-[80vw] w-full bg-card border border-border shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-foreground">
              Painel de Controle Total
            </DialogTitle>
          </DialogHeader>
          
          <div className="flex flex-col lg:flex-row h-[650px]">
            {/* Menu de Navegação - Horizontal em telas pequenas, Vertical em telas grandes */}
            <div className="w-full lg:w-56 bg-muted/10 border-b lg:border-b-0 lg:border-r border-border">
              <nav className="flex lg:flex-col p-4 lg:p-6 lg:pt-4 space-x-2 lg:space-x-0 lg:space-y-2">
                <Button
                  variant="ghost"
                  onClick={() => setActiveSection("usuarios")}
                  className={`flex-1 lg:w-full justify-center lg:justify-start py-2 lg:py-3 px-3 lg:px-4 text-sm transition-all ${
                    activeSection === "usuarios" 
                      ? "text-primary bg-primary/10 font-medium" 
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  <User className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Usuários</span>
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => setActiveSection("projetos")}
                  className={`flex-1 lg:w-full justify-center lg:justify-start py-2 lg:py-3 px-3 lg:px-4 text-sm transition-all ${
                    activeSection === "projetos" 
                      ? "text-primary bg-primary/10 font-medium" 
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Projetos</span>
                </Button>
              </nav>
            </div>

            {/* Área de Conteúdo */}
            <div className="flex-1 p-4 lg:p-6 overflow-y-auto">
              {/* Seção Usuários */}
              {activeSection === "usuarios" && (
                <div className="space-y-8">
                  {/* Seção Criar Novo Usuário */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-foreground">Criar Novo Usuário</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="new-username" className="text-sm font-medium text-foreground">
                          Nome de Usuário
                        </Label>
                        <Input
                          id="new-username"
                          type="text"
                          value={newUsername}
                          onChange={(e) => setNewUsername(e.target.value)}
                          placeholder="Digite o nome de usuário"
                          className="w-full"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="new-password" className="text-sm font-medium text-foreground">
                          Senha Temporária
                        </Label>
                        <Input
                          id="new-password"
                          type="password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder="Digite a senha temporária"
                          className="w-full"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="new-role" className="text-sm font-medium text-foreground">
                          Função
                        </Label>
                        <Select value={newUserRole} onValueChange={setNewUserRole}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Selecione a função" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="super-admin">Super Administrador</SelectItem>
                            <SelectItem value="sub-admin">Sub-Administrador</SelectItem>
                            <SelectItem value="user">Usuário</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      {/* Campo "Alocar ao Projeto" - Visível apenas para Sub-Administrador */}
                      {newUserRole === "sub-admin" && (
                        <div className="space-y-2">
                          <Label htmlFor="allocated-project" className="text-sm font-medium text-foreground">
                            Alocar ao Projeto
                          </Label>
                          <Select value={allocatedProject} onValueChange={setAllocatedProject}>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Selecione o projeto" />
                            </SelectTrigger>
                            <SelectContent>
                              {projectOptions.map((project) => (
                                <SelectItem key={project.id} value={project.id}>
                                  {project.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                    </div>
                    
                    <Button
                      variant="arbosis-primary"
                      onClick={handleCreateUser}
                      className="w-full md:w-auto"
                    >
                      Criar Usuário
                    </Button>
                  </div>
                  
                  {/* Seção Gerenciar Usuários Existentes */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-foreground">Usuários Atuais</h3>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border border-border">
                        <div className="flex-1">
                          <span className="text-foreground">Usuário: </span>
                          <span className="font-mono text-sm bg-background px-2 py-1 rounded">subadmin_rj</span>
                          <span className="text-muted-foreground mx-2">|</span>
                          <span className="text-foreground">Função: </span>
                          <span className="text-primary font-medium">Sub-Administrador</span>
                        </div>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteUser("subadmin_rj")}
                          className="ml-4"
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Excluir
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border border-border">
                        <div className="flex-1">
                          <span className="text-foreground">Usuário: </span>
                          <span className="font-mono text-sm bg-background px-2 py-1 rounded">tecnico_sp</span>
                          <span className="text-muted-foreground mx-2">|</span>
                          <span className="text-foreground">Função: </span>
                          <span className="text-muted-foreground font-medium">Usuário</span>
                        </div>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteUser("tecnico_sp")}
                          className="ml-4"
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Excluir
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border border-border">
                        <div className="flex-1">
                          <span className="text-foreground">Usuário: </span>
                          <span className="font-mono text-sm bg-background px-2 py-1 rounded">supervisor_mg</span>
                          <span className="text-muted-foreground mx-2">|</span>
                          <span className="text-foreground">Função: </span>
                          <span className="text-muted-foreground font-medium">Usuário</span>
                        </div>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteUser("supervisor_mg")}
                          className="ml-4"
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Excluir
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Seção Projetos */}
              {activeSection === "projetos" && (
                <div className="space-y-8">
                  {/* Seção Criar Novo Projeto */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-foreground">Criar Novo Projeto</h3>
                    
                    <div className="grid grid-cols-1 gap-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="project-name" className="text-sm font-medium text-foreground">
                            Nome do Projeto
                          </Label>
                          <Input
                            id="project-name"
                            type="text"
                            placeholder="Digite o nome do projeto"
                            className="w-full"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="project-location" className="text-sm font-medium text-foreground">
                            Local (Cidade/Estado)
                          </Label>
                          <Input
                            id="project-location"
                            type="text"
                            placeholder="Ex: Rio de Janeiro/RJ"
                            className="w-full"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="project-logo" className="text-sm font-medium text-foreground">
                          Logo do Projeto
                        </Label>
                        <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                          <Input
                            id="project-logo"
                            type="file"
                            accept="image/png"
                            className="hidden"
                          />
                          <label htmlFor="project-logo" className="cursor-pointer">
                            <div className="space-y-2">
                              <div className="text-muted-foreground">
                                Clique para enviar o logo
                              </div>
                              <div className="text-xs text-muted-foreground">
                                Dimensão recomendada: 200x60 pixels, formato PNG com fundo transparente
                              </div>
                            </div>
                          </label>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="sub-admin-select" className="text-sm font-medium text-foreground">
                          Designar Sub-Admin
                        </Label>
                        <Select>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Selecione um Sub-Administrador" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="subadmin_rj">subadmin_rj</SelectItem>
                            <SelectItem value="usuario_sem_permissao_1">usuario_sem_permissao_1</SelectItem>
                            <SelectItem value="usuario_sem_permissao_2">usuario_sem_permissao_2</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <Button
                      variant="arbosis-primary"
                      className="w-full md:w-auto"
                    >
                      Criar Projeto
                    </Button>
                  </div>
                  
                  {/* Seção Gerenciar Projetos Existentes */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-foreground">Gerenciar Projetos Existentes</h3>
                    
                    <div className="space-y-4">
                      {/* Card de Projeto 1 */}
                      <Card className="border border-border">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-3">
                            <h4 className="text-lg font-medium text-foreground">
                              Projeto de Arborização Urbana - RJ
                            </h4>
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm">
                                Editar
                              </Button>
                              <Button variant="destructive" size="sm">
                                Excluir
                              </Button>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <div>
                              <span className="text-foreground font-medium">Sub-Admin: </span>
                              <span className="font-mono text-sm bg-background px-2 py-1 rounded">subadmin_rj</span>
                            </div>
                            
                            <div>
                              <span className="text-foreground font-medium">Lista de Usuários:</span>
                              <div className="mt-1 space-y-1">
                                <div className="font-mono text-sm bg-muted/30 px-2 py-1 rounded inline-block mr-2">
                                  tecnico_sp
                                </div>
                                <div className="font-mono text-sm bg-muted/30 px-2 py-1 rounded inline-block">
                                  supervisor_mg
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      
                      {/* Card de Projeto 2 */}
                      <Card className="border border-border">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-3">
                            <h4 className="text-lg font-medium text-foreground">
                              Análise de Risco de Queda - SP
                            </h4>
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm">
                                Editar
                              </Button>
                              <Button variant="destructive" size="sm">
                                Excluir
                              </Button>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <div>
                              <span className="text-foreground font-medium">Sub-Admin: </span>
                              <span className="font-mono text-sm bg-background px-2 py-1 rounded">outro_subadmin</span>
                            </div>
                            
                            <div>
                              <span className="text-foreground font-medium">Lista de Usuários:</span>
                              <div className="mt-1">
                                <div className="font-mono text-sm bg-muted/30 px-2 py-1 rounded inline-block">
                                  tecnico_sp
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
