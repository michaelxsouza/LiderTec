/* =========================================================
   LíderTec – CONFIGURAÇÃO ÚNICA DO SITE
   Vale para o site principal e para todas as páginas de captura (lp/).
   ========================================================= */

window.LIDERTEC_CONFIG = {
  // Número do WhatsApp (DDI + DDD + número, só dígitos)
  whatsappNumber: "553171942302",

  // Para onde os formulários são enviados. Vazio = envio simulado (nada chega).
  // Aceita:
  //  - URL do Google Apps Script (planilha Google). Ex.: "https://script.google.com/macros/s/XXXX/exec"
  //  - URL do Formspree. Ex.: "https://formspree.io/f/abcdwxyz"
  //  - Qualquer servidor que aceite POST em JSON
  // Passo a passo no README, seção "Receber os contatos".
  formEndpoint: "",

  // Google Ads (opcional). Ex.: "AW-123456789" e os rótulos das conversões.
  googleAdsId: "",
  conversionLabelForm: "",
  conversionLabelWhatsapp: "",
};

/* =========================================================
   Daqui para baixo não precisa editar
   ========================================================= */
(function () {
  const CFG = window.LIDERTEC_CONFIG;

  // Google Ads (gtag)
  if (CFG.googleAdsId) {
    const s = document.createElement("script");
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${CFG.googleAdsId}`;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { dataLayer.push(arguments); };
    gtag("js", new Date());
    gtag("config", CFG.googleAdsId);
  }

  function track(label, extra = {}) {
    if (CFG.googleAdsId && label && window.gtag) {
      gtag("event", "conversion", { send_to: `${CFG.googleAdsId}/${label}`, ...extra });
    }
  }

  async function sendLead(data) {
    const url = (CFG.formEndpoint || "").trim();
    if (!url) {
      await new Promise((r) => setTimeout(r, 800));
      console.warn("[LíderTec] Envio SIMULADO: configure formEndpoint em assets/js/config.js.", data);
      return { simulated: true };
    }
    if (url.includes("script.google.com")) {
      // Google Apps Script: envio sem pré-verificação CORS (resposta não é lida)
      await fetch(url, { method: "POST", mode: "no-cors", headers: { "Content-Type": "text/plain;charset=utf-8" }, body: JSON.stringify(data) });
      return { ok: true };
    }
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return { ok: true };
  }

  // Esconde qualquer texto pendente ([INSERIR ...] / [CONFIRMAR ...]) que tenha ficado na página
  function hidePending() {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const hits = [];
    while (walker.nextNode()) {
      if (/\[(INSERIR|CONFIRMAR)/.test(walker.currentNode.nodeValue)) hits.push(walker.currentNode);
    }
    hits.forEach((node) => {
      const el = node.parentElement && node.parentElement.closest("details, li, blockquote, figure, dd, p, h3");
      if (el && !el.hidden) {
        el.hidden = true;
        console.warn("[LíderTec] Conteúdo pendente escondido:", node.nodeValue.trim().slice(0, 80));
      }
    });
  }

  // Leva o visitante para a página de obrigado depois do envio.
  // A conversão do Google Ads é registrada na própria página de obrigado.
  // Na página, <body data-root="../../"> indica o caminho até a raiz do site (páginas de captura).
  function goThankYou(info) {
    try { sessionStorage.setItem("lt_lead", JSON.stringify({ ...info, pending: true, t: Date.now() })); } catch (e) {}
    const root = document.body.dataset.root || "";
    const q = new URLSearchParams();
    if (info.slug) q.set("curso", info.slug);
    q.set("origem", info.origem || "site");
    location.href = `${root}obrigado/?${q.toString()}`;
  }

  window.LiderTec = { config: CFG, sendLead, track, hidePending, goThankYou };
  document.addEventListener("DOMContentLoaded", hidePending);
})();
