/* =========================================================
   LíderTec – script das páginas de captura
   Cada página informa o curso no <body>:
   <body class="lp" data-course="Segurança do Trabalho" data-ref="LP-SST">
   ========================================================= */

/* Configurações (WhatsApp, envio do formulário, Google Ads) ficam em
   assets/js/config.js, compartilhado com o site principal. */
const CFG = window.LIDERTEC_CONFIG || {};
const whatsappNumber = CFG.whatsappNumber || "553171942302";
const LT = window.LiderTec || { sendLead: async () => ({ simulated: true }), track: () => {} };

/* ========================================================= */
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const COURSE = document.body.dataset.course || "";
const REF = document.body.dataset.ref || "LP";

/* ---------- Origem do visitante (UTM e gclid) ---------- */
const TRACK_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid"];
function getTracking() {
  const params = new URLSearchParams(location.search);
  let saved = {};
  try { saved = JSON.parse(sessionStorage.getItem("lt_tracking") || "{}"); } catch (e) {}
  const data = { ...saved };
  TRACK_KEYS.forEach((k) => { if (params.get(k)) data[k] = params.get(k); });
  try { sessionStorage.setItem("lt_tracking", JSON.stringify(data)); } catch (e) {}
  return data;
}
const tracking = getTracking();
const fromAds = Boolean(tracking.gclid || /google/i.test(tracking.utm_source || ""));
const refCode = `${REF}${fromAds ? "-GADS" : ""}`;

function trackConversion(label, extra = {}) { LT.track(label, extra); }

/* ---------- WhatsApp ---------- */
function waLink(msg) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`;
}
const defaultWaMsg = `Olá! Tenho experiência na área e quero saber sobre a certificação por competência em ${COURSE}. [${refCode}]`;
$$("[data-wa]").forEach((a) => {
  a.href = waLink(a.dataset.wa || defaultWaMsg);
  a.target = "_blank";
  a.rel = "noopener";
  a.addEventListener("click", () => trackConversion(CFG.conversionLabelWhatsapp, { event_category: "whatsapp", curso: COURSE }));
});

/* ---------- Botões "Receber informações" / "Preencher formulário" ---------- */
$$('a[href="#formulario"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    e.preventDefault();
    const card = $("#formulario");
    if (!card) return;
    card.scrollIntoView({ behavior: "smooth", block: "start" });
    const first = $("#f-nome");
    if (first) setTimeout(() => first.focus({ preventScroll: true }), 500);
    history.replaceState(null, "", "#formulario");
  });
});

/* ---------- Formulário ---------- */
// Normaliza telefone: remove +55 e zero inicial, fica só DDD + número
function phoneDigits(v) {
  let d = String(v).replace(/\D/g, "");
  if (d.length > 11 && d.startsWith("55")) d = d.slice(2);
  if (d.startsWith("0")) d = d.slice(1);
  return d;
}
function showFormAlert(form, msg) {
  let el = form.querySelector(".form-alert");
  if (!el) {
    el = document.createElement("p");
    el.className = "form-alert";
    el.setAttribute("role", "alert");
    const btn = form.querySelector('button[type="submit"]');
    btn.parentNode.insertBefore(el, btn);
  }
  el.textContent = msg;
  el.hidden = !msg;
}
function focusField(el) {
  el.scrollIntoView({ behavior: "smooth", block: "center" });
  setTimeout(() => el.focus({ preventScroll: true }), 350);
}

const form = $("#lp-form");
const fieldOf = (name) => form.elements[name];

function setError(name, msg) {
  const el = fieldOf(name);
  const box = el.closest(".field");
  box.classList.toggle("invalid", Boolean(msg));
  if (msg) { el.setAttribute("aria-invalid", "true"); el.setAttribute("aria-describedby", `e-${name}`); }
  else el.removeAttribute("aria-invalid");
  $(`#e-${name}`).textContent = msg;
}

const validators = {
  nome: (v) => v.trim().length < 2 ? "Informe seu nome." : "",
  whatsapp: (v) => { const d = phoneDigits(v); return !d ? "Informe seu WhatsApp com DDD." : (d.length < 10 || d.length > 11) ? "Confira o número: DDD + número, ex.: (31) 99999-9999." : ""; },
  cidade: (v) => v.trim().length < 3 ? "Informe sua cidade e estado." : "",
  experiencia: (v) => !v ? "Selecione seu tempo de experiência na área." : "",
  consentimento: (_, el) => !el.checked ? "Para continuar, autorize o contato da LíderTec." : "",
};
function validate(name) {
  const el = fieldOf(name);
  const msg = validators[name](el.value, el);
  setError(name, msg);
  return !msg;
}
function maskPhone(v) {
  const d = phoneDigits(v).slice(0, 11);
  if (d.length <= 2) return d ? `(${d}` : "";
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

if (form) {
  const phone = fieldOf("whatsapp");
  phone.addEventListener("input", () => { phone.value = maskPhone(phone.value); });

  Object.keys(validators).forEach((name) => {
    const el = fieldOf(name);
    const evt = el.type === "checkbox" || el.tagName === "SELECT" ? "change" : "input";
    el.addEventListener(evt, () => { if (el.closest(".field").classList.contains("invalid")) validate(name); });
    el.addEventListener("blur", () => { if (el.value && el.type !== "checkbox") validate(name); });
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const names = Object.keys(validators);
    const ok = names.map(validate);
    if (ok.includes(false)) {
      const n = ok.filter((x) => !x).length;
      showFormAlert(form, n > 1 ? `Faltam ${n} informações. Confira os campos em vermelho.` : "Falta uma informação. Confira o campo em vermelho.");
      focusField(fieldOf(names[ok.indexOf(false)]));
      return;
    }
    showFormAlert(form, "");
    if (form.elements.empresa.value) return; // honeypot anti-spam

    const data = {
      nome: fieldOf("nome").value.trim(),
      whatsapp: phoneDigits(fieldOf("whatsapp").value),
      cidade_estado: fieldOf("cidade").value.trim(),
      experiencia: fieldOf("experiencia").value,
      curso: COURSE,
      modalidade: "Certificação por competência",
      pagina: location.pathname,
      referencia: refCode,
      ...tracking,
      consentimento: true,
      enviado_em: new Date().toISOString(),
    };

    const btn = $("#lp-submit");
    btn.disabled = true;
    const label = $(".btn-label", btn);
    label.textContent = "Enviando…";
    try {
      await LT.sendLead(data);
      const waMsg = `Olá! Sou ${data.nome}, de ${data.cidade_estado}. Tenho ${data.experiencia.toLowerCase()} de experiência e quero a certificação por competência em ${COURSE}. [${refCode}]`;
      if (LT.goThankYou) {
        LT.goThankYou({ nome: data.nome, curso: COURSE, slug: document.body.dataset.slug || "", origem: "lp", ref: refCode, waMsg });
        return;
      }
      const first = data.nome.split(/\s+/)[0];
      $("#lp-success-name").textContent = first;
      const wa = $("#lp-success-wa");
      wa.href = waLink(`Olá! Sou ${data.nome}, de ${data.cidade_estado}. Tenho ${data.experiencia.toLowerCase()} de experiência e quero a certificação por competência em ${COURSE}. [${refCode}]`);
      wa.target = "_blank"; wa.rel = "noopener";
      wa.addEventListener("click", () => trackConversion(CFG.conversionLabelWhatsapp, { event_category: "whatsapp", curso: COURSE }), { once: true });
      form.hidden = true;
      $("#lp-success").hidden = false;
      $("#lp-success").focus();
    } catch (err) {
      console.error(err);
      label.textContent = "Não foi possível enviar. Tente de novo";
      setTimeout(() => (label.textContent = "Quero receber informações"), 3500);
    } finally {
      btn.disabled = false;
      if (label.textContent === "Enviando…") label.textContent = "Quero receber informações";
    }
  });
}

const y = $("#year");
if (y) y.textContent = new Date().getFullYear();
