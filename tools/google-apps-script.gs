/**
 * LíderTec – recebe os formulários do site e grava numa planilha Google.
 *
 * Como usar (passo a passo completo no README, seção "Receber os contatos"):
 * 1. Crie uma planilha no Google Planilhas.
 * 2. Menu Extensões > Apps Script. Apague o código de exemplo e cole este arquivo.
 * 3. (Opcional) Preencha EMAIL_AVISO para receber um e-mail a cada novo contato.
 * 4. Implantar > Nova implantação > Tipo: App da Web
 *      Executar como: Eu
 *      Quem pode acessar: Qualquer pessoa
 * 5. Copie a URL que termina em /exec e cole em formEndpoint, no arquivo assets/js/config.js.
 */

// E-mail que recebe aviso de cada novo contato. Deixe "" para não enviar.
const EMAIL_AVISO = "";

// Nome da aba onde os contatos são gravados
const ABA = "Contatos";

// Colunas da planilha (na ordem)
const COLUNAS = [
  ["enviado_em", "Data/hora"],
  ["nome", "Nome"],
  ["whatsapp", "WhatsApp"],
  ["email", "E-mail"],
  ["cidade_estado", "Cidade/UF"],
  ["curso", "Curso"],
  ["experiencia", "Experiência"],
  ["mensagem", "Mensagem"],
  ["referencia", "Código"],
  ["origem", "Origem"],
  ["pagina", "Página"],
  ["utm_source", "utm_source"],
  ["utm_medium", "utm_medium"],
  ["utm_campaign", "utm_campaign"],
  ["utm_term", "utm_term"],
  ["gclid", "gclid"],
  ["consentimento", "Consentimento"],
  ["suspeito", "Possível spam"],
];

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const data = JSON.parse((e && e.postData && e.postData.contents) || "{}");

    // Proteção básica: ignora envios sem nome ou WhatsApp
    if (!data.nome || !data.whatsapp) return resposta({ ok: false, erro: "dados incompletos" });

    const planilha = SpreadsheetApp.getActiveSpreadsheet();
    let aba = planilha.getSheetByName(ABA);
    if (!aba) aba = planilha.insertSheet(ABA);
    if (aba.getLastRow() === 0) {
      aba.appendRow(COLUNAS.map((c) => c[1]));
      aba.setFrozenRows(1);
      aba.getRange(1, 1, 1, COLUNAS.length).setFontWeight("bold");
    }

    const dataHora = data.enviado_em ? new Date(data.enviado_em) : new Date();
    const linha = COLUNAS.map(([chave]) => {
      if (chave === "enviado_em") return dataHora;
      if (chave === "whatsapp") return "'" + String(data.whatsapp || ""); // mantém zeros e evita notação científica
      if (chave === "consentimento") return data.consentimento ? "Sim" : "Não";
      if (chave === "suspeito") return data.suspeito ? "Sim" : "";
      return data[chave] !== undefined ? String(data[chave]).slice(0, 2000) : "";
    });
    aba.appendRow(linha);

    if (EMAIL_AVISO) {
      const wa = String(data.whatsapp || "").replace(/\D/g, "");
      MailApp.sendEmail({
        to: EMAIL_AVISO,
        subject: `Novo contato LíderTec: ${data.nome} – ${data.curso || "curso não informado"}`,
        htmlBody:
          `<p><b>Nome:</b> ${data.nome}<br><b>WhatsApp:</b> <a href="https://wa.me/55${wa}">${data.whatsapp}</a>` +
          `<br><b>E-mail:</b> ${data.email || "-"}<br><b>Cidade/UF:</b> ${data.cidade_estado || "-"}` +
          `<br><b>Curso:</b> ${data.curso || "-"}<br><b>Experiência:</b> ${data.experiencia || "-"}` +
          `<br><b>Mensagem:</b> ${data.mensagem || "-"}<br><b>Código:</b> ${data.referencia || data.origem || "-"}</p>` +
          `<p><a href="${planilha.getUrl()}">Abrir planilha</a></p>`,
      });
    }
    return resposta({ ok: true });
  } catch (err) {
    return resposta({ ok: false, erro: String(err) });
  } finally {
    lock.releaseLock();
  }
}

function resposta(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
