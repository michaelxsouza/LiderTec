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

## 1. Configurações rápidas (`assets/js/main.js`, no topo)

| Variável | O que faz |
|---|---|
| `whatsappNumber` | Número usado em todos os botões de WhatsApp (DDI + DDD + número, só dígitos). |
| `FORM_ENDPOINT` | Endereço que recebe o formulário. Vazio = envio simulado. |
| `PAGE_SIZE` | Quantos cursos aparecem antes do botão "Ver mais cursos". |

## 2. Logo

O arquivo atual foi recortado da arte de divulgação e tem qualidade limitada. Substitua pelo arquivo oficial:

1. Salve o logo oficial (de preferência SVG, ou PNG com fundo transparente) em `assets/img/`.
2. No `index.html`, troque `logo-lidertec-provisorio.png` pelo nome do novo arquivo (aparece no cabeçalho e no rodapé).

## 3. Imagem do topo (Hero)

A imagem fica em `assets/img/hero-lidertec.jpg` (recorte da arte completa, guardada em `assets/img/hero-lidertec-banner.jpg`). Para trocar, substitua o arquivo mantendo o mesmo nome, ou altere o `src` da tag `<img class="hero-img">` no `index.html`. Prefira imagens horizontais com as pessoas à direita e fundo claro.

## 4. Cursos

Todos os cursos estão no objeto `COURSES` em `main.js`, separados por categoria (CT, IT, SEI). Cada curso aceita:

```js
{ n: "Enfermagem", a: "saude", desc: "Descrição própria do curso", duracao: "120 horas" }
```

- `desc` é opcional. Sem ela, o card mostra a descrição geral da área (objeto `AREAS`).
- `duracao` é opcional e só deve ser preenchida quando confirmada. Sem ela, o card mostra apenas a categoria.

## 5. Formulário de contato

O formulário já valida os campos, aplica máscara no WhatsApp, bloqueia envio vazio e tem um campo oculto anti-spam (honeypot). Sem backend, o envio é simulado e os dados aparecem no console do navegador.

Para receber os contatos de verdade, preencha `FORM_ENDPOINT` com um endereço que aceite `POST` em JSON. Opções:

**Formspree (mais simples, sem programar)**
1. Crie uma conta em formspree.io e um novo formulário.
2. Copie o endereço gerado (ex.: `https://formspree.io/f/abcdwxyz`) para `FORM_ENDPOINT`.
3. Os contatos chegam por e-mail.

**Google Planilhas (Apps Script)**
1. Crie uma planilha e abra *Extensões → Apps Script*.
2. Cole uma função `doPost(e)` que leia `JSON.parse(e.postData.contents)` e grave uma linha com `appendRow`.
3. Publique como *App da Web* (acesso: qualquer pessoa) e use o endereço gerado em `FORM_ENDPOINT`.
   Observação: o Apps Script pode exigir `Content-Type: text/plain` para evitar bloqueio de CORS; nesse caso troque o cabeçalho no `fetch` de `main.js`.

**Backend próprio (PHP, Node etc.)**
O site envia este JSON:

```json
{
  "nome": "…", "whatsapp": "31999999999", "email": "…",
  "cidade_estado": "…", "curso": "Enfermagem (2 a 7 dias · Competência SEI)",
  "mensagem": "…", "consentimento": true, "origem": "site", "enviado_em": "ISO-8601"
}
```

Responda com status 200 para sucesso. Qualquer outro status mostra uma mensagem de erro ao visitante, sugerindo o WhatsApp.

## 6. Informações a preencher antes de publicar

Procure por `[INSERIR` no `index.html` para encontrar todos os pontos:

- História, missão e diferenciais (seção Sobre)
- Reconhecimento MEC/SISTEC: já preenchido com os códigos 45630 (Parauapebas – PA) e 61295 (Redenção – PA). Confira no SISTEC antes de publicar.
- Regras para emissão do certificado (FAQ)
- Respostas do FAQ: matrícula, certificado, duração, horário, pagamento e documentos
- E-mail, endereço, horário de atendimento e CNPJ
- Três depoimentos reais, com autorização dos alunos
- Logo oficial

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

Uma página por curso, sem menu, com formulário e WhatsApp. Não aparecem na busca orgânica (`noindex`).

| Curso | Endereço | Código no WhatsApp |
|---|---|---|
| Segurança do Trabalho | `/lp/seguranca-do-trabalho/` | `LP-SST` |
| Eletrotécnica | `/lp/eletrotecnica/` | `LP-ELT` |
| Mineração | `/lp/mineracao/` | `LP-MIN` |

A mensagem do WhatsApp chega com o código entre colchetes, por exemplo `[LP-SST-GADS]`. O sufixo `-GADS` aparece quando o visitante veio de anúncio do Google (link com `gclid` ou `utm_source=google`).

**Configurações em `lp/lp.js`:** `whatsappNumber`, `FORM_ENDPOINT` (mesmo formato do formulário principal, com campos extras `experiencia`, `referencia`, `pagina`, `utm_*` e `gclid`), `GOOGLE_ADS_ID` e os rótulos de conversão `CONVERSION_LABEL_FORM` e `CONVERSION_LABEL_WHATSAPP`. Com o ID preenchido, a tag do Google Ads carrega sozinha e as conversões disparam no envio do formulário e no clique do WhatsApp.

**Antes de rodar anúncios:** preencha os `[INSERIR INFORMAÇÃO]` (requisitos, documentos, pagamento) e confirme os textos marcados com `[CONFIRMAR COM A CERTIFICADORA]` sobre registro profissional.

**Criar página para outro curso:** copie uma pasta de `lp/`, renomeie (ex.: `lp/edificacoes/`) e, no `index.html`, troque o nome do curso, o `data-course` e o `data-ref` do `<body>`, os três itens de "Para quem é", a categoria na pergunta "Quanto tempo leva?" e a resposta sobre registro profissional.
