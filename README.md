# Site LíderTec

Site estático (HTML, CSS e JavaScript puros). Não precisa de build: basta abrir o `index.html` ou publicar a pasta em qualquer hospedagem (Hostinger, Netlify, Vercel, GitHub Pages etc.).

```
index.html                         Estrutura e textos de todas as seções
assets/css/style.css               Estilos (cores no topo, em :root)
assets/js/main.js                  WhatsApp, lista de cursos, filtros, modal e formulário
assets/img/logo-lidertec-provisorio.png   Logo recortado do material de divulgação (PROVISÓRIO)
```

## Rodar localmente

Na primeira vez, instale as dependências:

```
npm install
```

Depois, sempre que quiser abrir o site:

```
npm run dev
```

O site abre em http://localhost:8000 e recarrega sozinho quando você salva um arquivo.

## 1. Configurações rápidas (`assets/js/config.js`)

Um único arquivo vale para o site principal e para as 65 páginas de captura.

| Configuração | O que faz |
|---|---|
| `whatsappNumber` | Número usado em todos os botões de WhatsApp (DDI + DDD + número, só dígitos). |
| `formEndpoint` | Para onde os formulários são enviados. Vazio = envio simulado (nada chega). Veja a seção 5. |
| `googleAdsId`, `conversionLabelForm`, `conversionLabelWhatsapp` | Tag e conversões do Google Ads (opcional). |

Se algum texto com `[INSERIR` ou `[CONFIRMAR` ficar na página por engano, o site o esconde automaticamente e avisa no console do navegador (F12).

## 2. Logo

O arquivo atual foi recortado da arte de divulgação e tem qualidade limitada. Substitua pelo arquivo oficial:

1. Salve o logo oficial (de preferência SVG, ou PNG com fundo transparente) em `assets/img/`.
2. No `index.html`, troque `logo-lidertec-provisorio.png` pelo nome do novo arquivo (aparece no cabeçalho e no rodapé).

## 3. Imagem do topo (Hero)

A imagem fica em `assets/img/hero-lidertec.jpg` (recorte da arte completa, guardada em `assets/img/hero-lidertec-banner.jpg`). Para trocar, substitua o arquivo mantendo o mesmo nome, ou altere o `src` da tag `<img class="hero-img">` no `index.html`. Prefira imagens horizontais com as pessoas à direita e fundo claro.

No celular (telas até 640 px) o site usa a versão vertical `assets/img/hero-lidertec-mobile.jpg` (tag `<source>` dentro do `<picture>`). O topo claro dessa imagem fica por trás dos botões, então mantenha a parte de cima da imagem limpa.

## 4. Cursos

Todos os cursos estão no objeto `COURSES` em `main.js`, separados por categoria (CT, IT, SEI). Cada curso aceita:

```js
{ n: "Enfermagem", a: "saude", desc: "Descrição própria do curso", duracao: "120 horas" }
```

- `desc` é opcional. Sem ela, o card mostra a descrição geral da área (objeto `AREAS`).
- `duracao` é opcional e só deve ser preenchida quando confirmada. Sem ela, o card mostra apenas a categoria.

## 5. Receber os contatos (formulário)

Enquanto `formEndpoint` estiver vazio em `assets/js/config.js`, o envio é **simulado**: o visitante vê "Mensagem enviada", mas nada chega. Escolha uma das opções:

### Opção A – Planilha Google (recomendada, gratuita)

Os contatos caem numa planilha e, se quiser, você recebe um e-mail a cada contato.

1. Acesse sheets.google.com e crie uma planilha em branco (ex.: "Contatos LíderTec").
2. Menu **Extensões → Apps Script**.
3. Apague o código de exemplo e cole todo o conteúdo de `tools/google-apps-script.gs`.
4. (Opcional) No início do código, preencha `EMAIL_AVISO` com o e-mail que deve receber avisos.
5. Clique em **Implantar → Nova implantação**. Em "Tipo", escolha **App da Web**.
   - Executar como: **Eu**
   - Quem pode acessar: **Qualquer pessoa**
6. Clique em **Implantar** e autorize o acesso com sua conta Google (o Google mostra um aviso de "app não verificado": clique em *Avançado → Acessar*).
7. Copie a **URL do app da Web** (termina em `/exec`) e cole em `formEndpoint` no `assets/js/config.js`:
   ```js
   formEndpoint: "https://script.google.com/macros/s/XXXXXXXX/exec",
   ```
8. Envie as alterações ao GitHub e faça um envio de teste pelo site. Uma aba "Contatos" aparece na planilha com o primeiro registro.

Se você alterar o código do Apps Script depois, use **Implantar → Gerenciar implantações → Editar → Nova versão** para manter a mesma URL.

### Opção B – Formspree (sem planilha, chega por e-mail)

1. Crie uma conta em formspree.io e um novo formulário.
2. Copie o endereço gerado (ex.: `https://formspree.io/f/abcdwxyz`) para `formEndpoint`.
3. Confirme o e-mail de ativação que o Formspree envia no primeiro contato recebido.

O plano gratuito do Formspree tem limite mensal de envios.

### Dados enviados

`nome`, `whatsapp`, `email` (site principal), `cidade_estado`, `curso`, `experiencia` (páginas de captura), `mensagem`, `referencia`, `origem`, `pagina`, `utm_*`, `gclid`, `consentimento`, `enviado_em`.

## 6. Informações que ainda faltam

Os pontos sem informação confirmada foram escondidos ou reescritos sem o dado. Quando tiver as informações:

- **Depoimentos:** a seção está oculta. Preencha os três cards em `index.html` e remova o atributo `hidden` de `<section id="depoimentos">`.
- **E-mail, endereço, horário e CNPJ:** estão comentados em `index.html` (contato e rodapé). Descomente e preencha.
- **História da LíderTec:** há um comentário na seção "Sobre" indicando onde incluir.
- **Política de Privacidade:** acrescente razão social, CNPJ e e-mail em `politica-de-privacidade.html` (há um comentário no item 1). O texto é um modelo; vale revisão de um advogado.
- **Páginas de captura:** requisitos (`REQUISITOS` em `tools/gerar_paginas.py`) e registro profissional (`REGISTRO_CONFIRMADO` em `tools/cursos.py`). Depois rode `python tools/gerar_paginas.py`.
- **Logo oficial:** veja a seção 2.

## 6.1 Prévia no WhatsApp e ícone do site

- Imagem de compartilhamento: `assets/img/og-image.jpg` (1200 × 630).
- Ícones: `assets/img/favicon-32.png`, `favicon-192.png` e `apple-touch-icon.png`.
- As tags usam o endereço `https://michaelxsouza.github.io/LiderTec`. Se passar a usar domínio próprio, troque esse endereço no `<head>` do `index.html` e em `SITE_URL` no `tools/gerar_paginas.py` (depois rode o gerador).
- O WhatsApp guarda a prévia em cache. Para testar uma mudança, envie o link com `?v=2` no final.

## 7. Cores

As cores ficam no início de `style.css`:

| Nome | Cor |
|---|---|
| Azul-marinho | `#15134F` |
| Roxo | `#4C145F` |
| Magenta | `#E5005A` |
| Rosa | `#F21B71` |
| Cinza claro | `#F5F6FA` |
| Texto | `#202038` |

## 8. Páginas de captura (Google Ads)

Existe uma página por curso (65 no total), sem menu, com formulário e WhatsApp, no endereço `/lp/<curso>/` (ex.: `/lp/seguranca-do-trabalho/`). Elas não aparecem na busca orgânica (`noindex`).

- **Lista de todas as páginas:** abra `/lp/` no navegador, ou `lp/paginas.csv` no Excel (tem a URL final de cada curso para colar no Google Ads).
- **Código no WhatsApp:** cada mensagem chega com o código do curso, ex.: `[LP-SEGURANCA-DO-TRABALHO-GADS]`. O sufixo `-GADS` aparece quando o visitante veio de anúncio do Google (`gclid` ou `utm_source=google`).
- **Configurações:** as mesmas do site principal, em `assets/js/config.js`.

### Editar as páginas (sem mexer em 65 arquivos)

As páginas são geradas por um script. Edite e rode de novo:

- `tools/gerar_paginas.py` – textos comuns a todas as páginas (título, requisitos, FAQ, reconhecimento).
- `tools/cursos.py` – dados de cada curso (área, categorias, perfis e texto de registro profissional).

```
python tools/gerar_paginas.py
```

**Antes de rodar anúncios:** configure o envio do formulário (seção 5) e, quando tiver, preencha `REQUISITOS` em `tools/gerar_paginas.py` e `REGISTRO_CONFIRMADO` em `tools/cursos.py`. Depois gere as páginas de novo.

## 9. Página de obrigado

Depois do envio de qualquer formulário (site ou páginas de captura), o visitante vai para `/obrigado/?curso=<curso>&origem=site|lp`. A página mostra o nome e o curso da pessoa, o botão do WhatsApp com a mensagem pronta, os próximos passos e o link do SISTEC. Ela não aparece na busca do Google (`noindex`).

**Conversão no Google Ads (duas opções, use só uma):**

- **Pelo código:** preencha `googleAdsId` e `conversionLabelForm` em `assets/js/config.js`. A conversão dispara na página de obrigado, uma vez por envio (recarregar a página não conta de novo).
- **Pelo endereço, sem código:** no Google Ads, crie uma conversão do tipo "Visualização de página" com a regra "URL contém `/obrigado/`". Nesse caso, deixe `conversionLabelForm` vazio para não contar duas vezes. Essa opção conta de novo se a pessoa recarregar a página.

