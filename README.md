# Arbosis – Sistema de Diagnóstico e Gestão de Arborização


**Arbosis** é uma plataforma web moderna para visualização, diagnóstico e gestão de dados geoespaciais de arborização urbana. O foco do projeto é permitir que prefeituras, equipes técnicas e cidadãos visualizem de forma intuitiva o estado das árvores de uma cidade, identifiquem problemas e apoiem o planejamento de ações de manejo urbano. A aplicação apresenta um **dashboard interativo** com indicadores de desempenho (KPIs), filtros dinâmicos e visualizações em mapa, além de um painel administrativo para ajustes de parâmetros técnicos.


> **Observação:** este repositório contém atualmente apenas o **frontend** da aplicação. O backend, responsável por persistir dados e fornecer APIs, está em fase de planejamento e será implementado separadamente.


## ✨ Funcionalidades


- **Dashboard interativo:** tela principal com indicadores chave (KPIs), cards de métricas e visualização em mapa. No arquivo `Index.tsx`, os indicadores exibem dados como árvores monitoradas, diagnósticos ativos e taxa de precisão【112047477823892†L139-L143】.
- **Diagnóstico, monitoramento e relatórios:** o sistema apresenta seções de *diagnóstico avançado*, *monitoramento em tempo real*, *relatórios inteligentes* e *gestão preventiva*【112047477823892†L116-L136】. Essas seções permitem analisar a saúde das árvores, acompanhar indicadores de vitalidade e gerar relatórios automáticos para tomada de decisão.
- **Filtragem avançada:** filtros de múltipla seleção permitem refinar a análise por família botânica, espécie, nome popular, origem (nativa ou exótica), bairro e logradouro【112047477823892†L115-L113】. Quando um modo de gerenciamento específico é ativado, filtros adicionais de situação, espécies e bairro são exibidos.
- **Painel administrativo:** área restrita de gerenciamento de parâmetros técnicos como dendrometria, fitossanidade, qualificação, riscos e mitigação. O código contém estruturas para alternar entre visualizações de situação ou espécies, exibindo barras laterais com cards e mapas【112047477823892†L234-L333】.
- **Múltiplas visualizações de dados:** cada tipo de dado tem um layout adaptado, como tabelas, barras laterais e mapas. As páginas “Projeto”, “Sobre o projeto” e “Equipe” são rotas separadas dentro da aplicação.
- **Sistema de projetos:** a aplicação permite trabalhar com múltiplos projetos, alternando a identidade visual (logotipo) no cabeçalho e emitindo eventos de troca de projeto【112047477823892†L145-L161】.
- **Design responsivo:** desenvolvido com Tailwind CSS e componentes da biblioteca *shadcn/ui*, o sistema é totalmente responsivo, oferecendo uma experiência fluida em desktops, tablets e dispositivos móveis.


## 🛠️ Tecnologias Utilizadas


O frontend foi construído com tecnologias modernas focadas em desempenho e escalabilidade:


- **React** — biblioteca principal para construção de interfaces【156367575848394†L50-L53】.
- **Vite** — ferramenta de build e desenvolvimento rápido. O servidor de desenvolvimento está configurado na porta 8080【780822646895701†L6-L10】.
- **TypeScript** — superset de JavaScript que adiciona tipagem estática.
- **Tailwind CSS** — framework utilitário para estilização.
- **shadcn/ui** — biblioteca de componentes baseada em Radix UI.
- **Radix UI** — diversos componentes acessíveis e reutilizáveis, incluindo Accordion, Dialog, Tabs, Slider e Tooltip【156367575848394†L13-L40】.
- **React Router Dom** — gerenciamento de rotas na aplicação【156367575848394†L54-L56】.
- **React Query** — gerenciamento de estado assíncrono【156367575848394†L41-L42】.
- **Zod** — biblioteca de validação e parse de esquemas【156367575848394†L60-L61】.
- **Lucide-React** — ícones utilizados no dashboard【156367575848394†L48-L49】.
- **Recharts** — biblioteca de gráficos para futuros relatórios e visualizações【156367575848394†L56-L57】.
- **React Hook Form** — gerenciamento de formulários【156367575848394†L53-L54】.
- **React Resizable Panels** e **Embla Carousel** — para painéis e carrosséis interativos【156367575848394†L54-L56】.


> O backend planejado utilizará **Flask** (Python) e **Microsoft Azure SQL Database** para persistência de dados. Essa parte ainda não está presente neste repositório.


## 🚀 Como Executar o Projeto Localmente


### Pré-requisitos


- [Node.js](https://nodejs.org/) (recomenda-se a versão LTS).
- `npm` (normalmente instalado com o Node.js).


### Passo a Passo


1. **Clone o repositório:**


```bash
git clone https://github.com/jayanmoura/arbosis-diagnostics-portal.git
cd arbosis-diagnostics-portal
```


2. **Instale as dependências:**


```bash
npm install
```


3. **Inicie o servidor de desenvolvimento:**


```bash
npm run dev
```


O Vite iniciará a aplicação em modo desenvolvimento. O arquivo de configuração define a porta padrão **8080**【780822646895701†L6-L10】, então o projeto estará acessível em `http://localhost:8080`.


4. **Construir para produção (opcional):**


Para gerar a build otimizada, execute:


```bash
npm run build
```


Use `npm run preview` para visualizar a build localmente.


## 📂 Estrutura Básica do Projeto


A aplicação segue a convenção do Vite para projetos em React e está organizada da seguinte forma:


- `src/` — código-fonte principal.
- `components/` — componentes reutilizáveis (botões, cabeçalhos, menus etc.).
- `pages/` — páginas da aplicação; cada rota corresponde a um componente nesta pasta. O arquivo `Index.tsx` contém a tela inicial com métricas, filtros e visualizações【112047477823892†L115-L143】.
- `App.tsx` — define as rotas principais (`/`, `/sobre`, `/equipe`) usando React Router.
- `main.tsx` — ponto de entrada que renderiza o `App` no elemento `root`.
- `vite.config.ts` — configuração do Vite, incluindo alias `@` para `src/` e definição de porta【780822646895701†L6-L18】.
- `tailwind.config.ts` — configuração do Tailwind CSS.
- `package.json` — lista scripts (`dev`, `build`, `lint` etc.) e dependências do projeto【156367575848394†L10-L80】.


## 🤝 Contribuindo


Contribuições são bem-vindas! Caso encontre problemas ou deseje propor melhorias, abra uma *issue* ou envie um *pull request*. Como o backend ainda está em desenvolvimento, contribuições focadas na interface, acessibilidade e experiência do usuário serão muito úteis.


## 📄 Licença


Até o momento este repositório não possui um arquivo de licença definido. Caso deseje utilizar ou contribuir para o projeto, entre em contato com os mantenedores para mais informações.
EOF