<!DOCTYPE html>
<html lang="pt-BR">
<body>

  <h1>🍊 Projeto OrangeHRM - Testes Automatizados</h1>
  <p>Este repositório contém a automação de testes para o site OrangeHRM utilizando <strong>Playwright</strong> e o padrão <strong>Page Object Model (POM)</strong>. O framework foi desenvolvido para oferecer testes robustos e de fácil manutenção.</p>

  <h2>🚀 Recursos Principais</h2>
  <ul>
    <li>📋 Padrão Page Object Model implementado</li>
    <li>🧪 Suítes de teste para login, gerenciamento de usuários e informações pessoais</li>
    <li>♻️ Funções utilitárias reutilizáveis</li>
    <li>⚙️ Workflow do GitHub Actions para CI/CD</li>
    <li>📊 Relatórios detalhados de execução</li>
  </ul>

  <h2>🛠️ Tecnologias Utilizadas</h2>
  <ul>
    <li>🟢 Node.js (v14 ou superior)</li>
    <li>📦 npm/yarn</li>
    <li>🎭 Playwright</li>
    <li>📄 Dotenv (para variáveis de ambiente)</li>
  </ul>

  <h2>📋 Como Executar os Testes</h2>

  <h3>🖥️ Execução Local</h3>
  <p><strong>1.</strong> Clone o repositório:</p>
  <pre><code>git clone &lt;repository-url&gt;
cd orangehrm-automation</code></pre>

  <p><strong>2.</strong> Instale as dependências:</p>
  <pre><code>npm install
npx playwright install</code></pre>

  <p><strong>3.</strong> Comandos de execução:</p>
  
  <h4>🧪 Execução geral</h4>
  <pre><code>
npm test
 ou
npx playwright test --headed</code></pre>

  <h4>🔍 Execução com debug</h4>
  <pre><code>
npx playwright test tests/Login.spec.js --debug
npx playwright test tests/MinhaInfo.spec.js --debug
npx playwright test tests/Usuario.spec.js --debug</code></pre>

  <h4>🌐 Execução por navegador</h4>
  <pre><code>
npx playwright test --project=chromium
npx playwright test --project=firefox</code></pre>

  <h4>📱 Execução mobile</h4>
  <pre><code>
npx playwright test --project="iPhone 13"
npx playwright test --project="Pixel"</code></pre>

  <h4>⚙️ Executar com slow motion (1 segundo entre ações)</h4>
  <pre><code>
npx playwright test --slowmo=1000</code></pre>

  <h3>☁️ Execução via GitHub Actions</h3>
  <p>O pipeline está configurado para executar:</p>
  <ul>
    <li>📌 Automaticamente em pushes para a branch principal</li>
    <li>🚀 Via acionamento manual</li>
  </ul>

  <p><strong>Para executar manualmente:</strong></p>
  <ol>
    <li>Acesse a aba <strong>Actions</strong> no repositório</li>
    <li>Selecione o workflow <code>run-tests</code></li>
    <li>Clique em <strong>Run workflow</strong></li>
  </ol>

  <h2>⚙️ Configuração</h2>
  <p>Personalize o arquivo <code>.env</code> com suas configurações:</p>
  <pre><code>ADMIN_USERNAME=Admin
ADMIN_PASSWORD=admin123
BASE_URL=https://opensource-demo.orangehrmlive.com
HEADLESS=true
DEFAULT_TIMEOUT=30000</code></pre>

  <h2>🗂️ Estrutura do Projeto</h2>
  <pre><code>├── .github/workflows  # Configurações do GitHub Actions
├── pageObjects        # Classes do Page Object Model
├── tests              # Arquivos de teste
├── utils              # Funções utilitárias
├── .env               # Variáveis de ambiente
├── playwright.config.js  # Configuração do Playwright
└── package.json       # Dependências e scripts</code></pre>

  <h2>📊 Relatórios e Evidências</h2>
  <ul>
    <li>Relatórios HTML gerados automaticamente após cada execução</li>
    <li>Screenshots capturados para testes falhos (disponíveis em <code>screenshots/</code>)</li>
    <li>Visualize os relatórios com:
      <pre><code>npm run test:report</code></pre>
    </li>
  </ul>

  <h2>🧪 Cenários de Teste Implementados</h2>
  <h3>1. Testes de Login</h3>
  <ul>
    <li>Credenciais inválidas</li>
    <li>Login bem-sucedido</li>
    <li>Navegação para "Esqueci a senha"</li>
  </ul>

  <h3>2. Gerenciamento de Usuários</h3>
  <ul>
    <li>Adição de novo usuário</li>
  </ul>

  <h3>3. Minhas Informações</h3>
  <ul>
    <li>Atualização de dados pessoais</li>
  </ul>

  <h2>📌 Considerações</h2>
  <ul>
    <li>✅ Estrutura modular e de fácil manutenção</li>
    <li>📘 Foco em boas práticas de automação com POM</li>
    <li>🌐 Pronto para integração com outros ambientes e pipelines</li>
  </ul>
</body>
</html>
