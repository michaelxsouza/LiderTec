/* =========================================================
   LíderTec – scripts do site
   ========================================================= */

/* ---------------- CONFIGURAÇÕES ----------------
   WhatsApp, envio do formulário e Google Ads ficam em assets/js/config.js */
const CFG = window.LIDERTEC_CONFIG || {};
const whatsappNumber = CFG.whatsappNumber || "553171942302";
const LT = window.LiderTec || { sendLead: async () => ({ simulated: true }), track: () => {} };

// Quantos cursos exibir antes do botão "Ver mais cursos"
const PAGE_SIZE = 12;

/* ---------------- CATEGORIAS ---------------- */
const CATEGORIES = {
  CT:  { label: "10 a 15 dias", competencia: "Competência CT",  badge: "badge-ct" },
  IT:  { label: "7 dias",       competencia: "Competência IT",  badge: "badge-it" },
  SEI: { label: "2 a 7 dias",   competencia: "Competência SEI", badge: "badge-sei" },
};

/* ---------------- ÁREAS (ícone + descrição padrão editável) ---------------- */
const AREAS = {
  saude:      { label: "Saúde e bem-estar",           desc: "Para quem já atua em atividades ligadas à saúde, ao cuidado e ao bem-estar." },
  gestao:     { label: "Gestão e negócios",           desc: "Para quem já atua em rotinas de gestão, negócios, atendimento e organização de empresas." },
  tecnologia: { label: "Tecnologia e comunicação",    desc: "Para quem já atua com tecnologia, sistemas, redes e comunicação digital." },
  industria:  { label: "Indústria e manutenção",      desc: "Para quem já atua em processos industriais, manutenção, equipamentos e produção." },
  agro:       { label: "Agro e meio ambiente",        desc: "Para quem já atua no campo, na produção agropecuária ou com questões ambientais." },
  construcao: { label: "Construção e infraestrutura", desc: "Para quem já atua com projetos, medições e obras de construção e infraestrutura." },
  seguranca:  { label: "Segurança e proteção",        desc: "Para quem já atua na prevenção de riscos e na proteção de pessoas." },
  design:     { label: "Design e criação",            desc: "Para quem já atua criando, planejando ambientes ou desenvolvendo comunicação visual." },
  servicos:   { label: "Turismo, eventos e serviços", desc: "Para quem já atua com turismo, eventos, gastronomia e atendimento ao público." },
  educacao:   { label: "Educação e humanidades",      desc: "Para quem já atua com educação, comunicação ou apoio a instituições e comunidades." },
};

/* ---------------- CURSOS ----------------
   Campos por curso:
   - n: nome   - a: área (chave de AREAS)
   - desc (opcional): descrição própria; se omitida, usa a descrição da área
   - duracao (opcional): preencha SOMENTE quando confirmada, ex.: duracao: "120 horas"
*/
const COURSES = {
  CT: [
    { n: "Administração", a: "gestao" },
    { n: "Análises Clínicas", a: "saude" },
    { n: "Celulose e Papel", a: "industria" },
    { n: "Cuidador de Idosos", a: "saude" },
    { n: "Estética", a: "saude" },
    { n: "Farmácia", a: "saude" },
    { n: "Guia de Turismo", a: "servicos" },
    { n: "Segurança do Trabalho", a: "seguranca" },
    { n: "Transações Imobiliárias", a: "gestao" },
    { n: "Veterinária", a: "saude" },
  ],
  IT: [
    { n: "Agricultura", a: "agro" },
    { n: "Agropecuária", a: "agro" },
    { n: "Eletroeletrônica", a: "industria" },
    { n: "Finanças", a: "gestao" },
    { n: "Informática", a: "tecnologia" },
    { n: "Mecânica", a: "industria" },
    { n: "Telecomunicações", a: "tecnologia" },
    { n: "Teologia", a: "educacao" },
  ],
  SEI: [
    { n: "Administração", a: "gestao" },
    { n: "Agente Comunitário de Saúde", a: "saude" },
    { n: "Agricultura", a: "agro" },
    { n: "Agricultura e Agroindústria", a: "agro" },
    { n: "Agroindústria", a: "agro" },
    { n: "Agrimensura", a: "construcao" },
    { n: "Análises Clínicas", a: "saude" },
    { n: "Automação Industrial", a: "industria" },
    { n: "Aquicultura", a: "agro" },
    { n: "Biotecnologia", a: "industria" },
    { n: "Contabilidade", a: "gestao" },
    { n: "Cuidador de Idosos", a: "saude" },
    { n: "Defesa Civil", a: "seguranca" },
    { n: "Desenvolvimento de Sistemas", a: "tecnologia" },
    { n: "Design de Interiores", a: "design" },
    { n: "Design Gráfico", a: "design" },
    { n: "Edificações", a: "construcao" },
    { n: "Eletromecânica", a: "industria" },
    { n: "Eletrotécnica", a: "industria" },
    { n: "Eletrônica", a: "industria" },
    { n: "Enfermagem", a: "saude" },
    { n: "Equipamentos Biomédicos", a: "saude" },
    { n: "Estética", a: "saude" },
    { n: "Eventos", a: "servicos" },
    { n: "Farmácia", a: "saude" },
    { n: "Gastronomia", a: "servicos" },
    { n: "Gerência em Saúde", a: "saude" },
    { n: "Guia de Turismo", a: "servicos" },
    { n: "Informática para Internet", a: "tecnologia" },
    { n: "Logística", a: "gestao" },
    { n: "Manutenção de Máquinas Industriais", a: "industria" },
    { n: "Manutenção de Máquinas Navais", a: "industria" },
    { n: "Manutenção de Máquinas Pesadas", a: "industria" },
    { n: "Marketing", a: "gestao" },
    { n: "Mecânica", a: "industria" },
    { n: "Meio Ambiente", a: "agro" },
    { n: "Metalurgia", a: "industria" },
    { n: "Mineração", a: "industria" },
    { n: "Nutrição e Dietética", a: "saude" },
    { n: "Óptica", a: "saude" },
    { n: "Prevenção e Combate a Incêndios", a: "seguranca" },
    { n: "Qualidade", a: "gestao" },
    { n: "Química", a: "industria" },
    { n: "Radiologia", a: "saude" },
    { n: "Recursos Humanos", a: "gestao" },
    { n: "Refrigeração e Climatização", a: "industria" },
    { n: "Rede de Computadores", a: "tecnologia" },
    { n: "Secretaria Escolar", a: "educacao" },
    { n: "Secretaria Escolar Eletrônica", a: "educacao" },
    { n: "Segurança do Trabalho", a: "seguranca" },
    { n: "Serviços Jurídicos", a: "gestao" },
    { n: "Sistema de Energia Renovável", a: "industria" },
    { n: "Saúde Bucal", a: "saude" },
    { n: "Transações Imobiliárias", a: "gestao" },
    { n: "Trânsito", a: "seguranca" },
    { n: "Tradução e Interpretação de Libras", a: "educacao" },
    { n: "Telecomunicações", a: "tecnologia" },
    { n: "Vendas", a: "gestao" },
    { n: "Veterinária", a: "saude" },
  ],
};

/* =========================================================
   A partir daqui, lógica do site (normalmente não precisa editar)
   ========================================================= */
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const norm = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

const ALL = Object.entries(COURSES).flatMap(([cat, list]) =>
  list.map((c, i) => ({ ...c, cat, id: `${cat}-${i}`, key: norm(c.n) }))
);
const slugify = (s) => norm(s).replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const lpUrl = (c) => `lp/${slugify(c.n)}/`;
const courseLabel = (c) => `${c.n} (${CATEGORIES[c.cat].label} · ${CATEGORIES[c.cat].competencia})`;

/* ---------- WhatsApp ---------- */
function waLink(message) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}
function formatPhone(num) {
  const d = num.replace(/\D/g, "");
  if (d.startsWith("55") && d.length >= 12) {
    const ddd = d.slice(2, 4), rest = d.slice(4);
    return `+55 (${ddd}) ${rest.length === 9 ? rest.slice(0, 5) + "-" + rest.slice(5) : rest.slice(0, 4) + "-" + rest.slice(4)}`;
  }
  return "+" + d;
}
function wireWhatsApp(root = document) {
  $$("[data-wa]", root).forEach((a) => {
    a.href = waLink(a.dataset.wa);
    a.target = "_blank";
    a.rel = "noopener";
    a.addEventListener("click", () => LT.track(CFG.conversionLabelWhatsapp, { event_category: "whatsapp" }));
  });
  $$(".wa-display").forEach((el) => (el.textContent = formatPhone(whatsappNumber)));
}

/* ---------- Toast ---------- */
let toastTimer;
function toast(msg) {
  const t = $("#toast");
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("show"), 3200);
}

/* ---------- Cabeçalho ---------- */
function initHeader() {
  const header = $(".site-header");
  const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 12);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  const toggle = $("#menu-toggle");
  const setMenu = (open) => {
    document.body.classList.toggle("menu-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
  };
  toggle.addEventListener("click", () => setMenu(!document.body.classList.contains("menu-open")));
  $$("#main-nav a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", (e) => e.key === "Escape" && setMenu(false));

  // Destaca o item do menu da seção visível
  const links = $$('.main-nav a[href^="#"]');
  const map = new Map(links.map((l) => [l.getAttribute("href").slice(1), l]));
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting && map.has(en.target.id)) {
          links.forEach((l) => l.classList.remove("active"));
          map.get(en.target.id).classList.add("active");
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    map.forEach((_, id) => { const s = document.getElementById(id); if (s) io.observe(s); });
  }
}

/* ---------- Catálogo de cursos ---------- */
const state = { cat: "ALL", area: "", q: "", limit: PAGE_SIZE };

function initCatalog() {
  const tabs = $("#cat-tabs");
  const tabData = [
    { id: "ALL", title: "Todos os cursos", sub: "Todas as categorias", count: ALL.length },
    ...Object.entries(CATEGORIES).map(([id, c]) => ({ id, title: c.label, sub: c.competencia, count: COURSES[id].length })),
  ];
  tabs.innerHTML = tabData.map((t) => `
    <button type="button" class="cat-tab" role="tab" data-cat="${t.id}" aria-selected="${t.id === state.cat}">
      <svg class="ic"><use href="#${t.id === "ALL" ? "i-layers" : "i-cal"}"/></svg>
      <span><span class="t-title">${t.title}</span><span class="t-sub">${t.sub}</span></span>
      <span class="t-count">${t.count}</span>
    </button>`).join("");
  tabs.addEventListener("click", (e) => {
    const b = e.target.closest(".cat-tab");
    if (!b) return;
    state.cat = b.dataset.cat;
    state.limit = PAGE_SIZE;
    $$(".cat-tab", tabs).forEach((x) => x.setAttribute("aria-selected", String(x === b)));
    renderCourses();
  });

  const areaSel = $("#area-filter");
  areaSel.innerHTML = `<option value="">Todas as áreas</option>` +
    Object.entries(AREAS).map(([k, a]) => `<option value="${k}">${a.label}</option>`).join("");
  areaSel.addEventListener("change", () => { state.area = areaSel.value; state.limit = PAGE_SIZE; renderCourses(); });

  let t;
  $("#course-search").addEventListener("input", (e) => {
    clearTimeout(t);
    t = setTimeout(() => { state.q = norm(e.target.value.trim()); state.limit = PAGE_SIZE; renderCourses(); }, 120);
  });

  $("#load-more").addEventListener("click", () => { state.limit += PAGE_SIZE; renderCourses(true); });
  $("#clear-filters").addEventListener("click", () => {
    Object.assign(state, { cat: "ALL", area: "", q: "", limit: PAGE_SIZE });
    $("#course-search").value = ""; areaSel.value = "";
    $$(".cat-tab").forEach((x) => x.setAttribute("aria-selected", String(x.dataset.cat === "ALL")));
    renderCourses();
  });

  $("#course-grid").addEventListener("click", (e) => {
    const b = e.target.closest("[data-course]");
    if (b) openInterest(b.dataset.course);
  });

  renderCourses();
}

function cardHTML(c) {
  const cat = CATEGORIES[c.cat], area = AREAS[c.a];
  return `
  <article class="course-card">
    <div class="course-top">
      <span class="course-ic"><svg class="ic"><use href="#a-${c.a}"/></svg></span>
      <span class="badge ${cat.badge}"><svg class="ic"><use href="#i-cal"/></svg>${cat.label} · ${c.cat}</span>
    </div>
    <p class="course-area">${area.label}</p>
    <h3>${esc(c.n)}</h3>
    <p class="course-desc">${esc(c.desc || area.desc)}</p>
    ${c.duracao ? `<p class="course-meta"><svg class="ic"><use href="#i-clock"/></svg>Duração: ${esc(c.duracao)}</p>` : ""}
    <div class="course-actions">
      <button type="button" class="btn btn-interest" data-course="${c.id}">Tenho interesse <svg class="ic"><use href="#i-arrow"/></svg></button>
      <a class="course-more" href="${lpUrl(c)}" aria-label="Saiba mais sobre ${esc(c.n)}">Saiba mais</a>
    </div>
  </article>`;
}

function renderCourses(append = false) {
  const list = ALL.filter((c) =>
    (state.cat === "ALL" || c.cat === state.cat) &&
    (!state.area || c.a === state.area) &&
    (!state.q || c.key.includes(state.q))
  );
  const grid = $("#course-grid");
  const shown = list.slice(0, state.limit);
  if (append) {
    const current = grid.children.length;
    grid.insertAdjacentHTML("beforeend", shown.slice(current).map(cardHTML).join(""));
  } else {
    grid.innerHTML = shown.map(cardHTML).join("");
  }
  $("#empty-state").hidden = list.length > 0;
  const more = $("#load-more");
  more.hidden = list.length <= state.limit;
  more.textContent = `Ver mais cursos (${list.length - shown.length})`;
  $("#result-count").innerHTML = list.length
    ? `Exibindo <strong>${shown.length}</strong> de <strong>${list.length}</strong> curso${list.length > 1 ? "s" : ""}`
    : "";
}

/* ---------- Modal "Tenho interesse" ---------- */
let currentCourse = null;
function openInterest(id) {
  const c = ALL.find((x) => x.id === id);
  if (!c) return;
  currentCourse = c;
  const cat = CATEGORIES[c.cat];
  $("#modal-ic").innerHTML = `<svg class="ic"><use href="#a-${c.a}"/></svg>`;
  $("#modal-cat").textContent = `${cat.label} · ${cat.competencia}`;
  $("#modal-title").textContent = c.n;
  $("#modal-desc").textContent = c.desc || AREAS[c.a].desc;
  const wa = $("#modal-wa");
  wa.href = waLink(`Olá! Tenho interesse no curso de ${c.n} (${cat.label} – ${cat.competencia}). Gostaria de mais informações.`);
  wa.target = "_blank"; wa.rel = "noopener";
  $("#modal-more").href = lpUrl(c);
  $("#modal-more-name").textContent = c.n;

  const dlg = $("#interest-modal");
  if (typeof dlg.showModal === "function") dlg.showModal();
  else goToForm(c);
}
function goToForm(c) {
  const dlg = $("#interest-modal");
  if (dlg.open) dlg.close();
  $("#f-curso").value = c.id;
  clearError("curso");
  $("#contato").scrollIntoView({ behavior: "smooth" });
  setTimeout(() => $("#f-nome").focus({ preventScroll: true }), 600);
  toast(`Curso selecionado: ${c.n}`);
}
function initModal() {
  const dlg = $("#interest-modal");
  $$("[data-close]", dlg).forEach((b) => b.addEventListener("click", () => dlg.close()));
  dlg.addEventListener("click", (e) => { if (e.target === dlg) dlg.close(); });
  $("#modal-form").addEventListener("click", () => currentCourse && goToForm(currentCourse));
}

/* ---------- Formulário ---------- */
const form = () => $("#contact-form");
function setError(name, msg) {
  const input = $(`[name="${name === "consent" ? "consentimento" : name}"]`);
  input.closest(".field").classList.add("invalid");
  input.setAttribute("aria-invalid", "true");
  input.setAttribute("aria-describedby", `e-${name}`);
  $(`#e-${name}`).textContent = msg;
}
function clearError(name) {
  const input = $(`[name="${name === "consent" ? "consentimento" : name}"]`);
  input.closest(".field").classList.remove("invalid");
  input.removeAttribute("aria-invalid");
  $(`#e-${name}`).textContent = "";
}

const validators = {
  nome: (v) => !v.trim() ? "Informe seu nome completo." : v.trim().length < 3 ? "O nome precisa ter pelo menos 3 letras." : !/\s/.test(v.trim()) ? "Informe nome e sobrenome." : "",
  whatsapp: (v) => { const d = v.replace(/\D/g, ""); return !d ? "Informe seu WhatsApp com DDD." : (d.length < 10 || d.length > 11) ? "Confira o número: use DDD + número, ex.: (31) 99999-9999." : ""; },
  email: (v) => !v.trim() ? "Informe seu e-mail." : !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? "Confira o e-mail: ex.: nome@email.com." : "",
  cidade: (v) => !v.trim() ? "Informe sua cidade e estado." : v.trim().length < 3 ? "Informe cidade e estado, ex.: Belo Horizonte – MG." : "",
  curso: (v) => !v ? "Escolha o curso de interesse." : "",
  consent: (_, el) => !el.checked ? "Para continuar, autorize o contato da LíderTec." : "",
};

function validateField(name) {
  const el = $(`[name="${name === "consent" ? "consentimento" : name}"]`);
  const msg = validators[name](el.value, el);
  msg ? setError(name, msg) : clearError(name);
  return !msg;
}

function maskPhone(v) {
  const d = v.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d ? `(${d}` : "";
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

function initForm() {
  const sel = $("#f-curso");
  sel.innerHTML = `<option value="">Selecione um curso</option>` +
    Object.entries(COURSES).map(([cat]) =>
      `<optgroup label="${CATEGORIES[cat].label} · ${CATEGORIES[cat].competencia}">` +
      ALL.filter((c) => c.cat === cat).map((c) => `<option value="${c.id}">${esc(c.n)}</option>`).join("") +
      `</optgroup>`).join("") +
    `<option value="indeciso">Ainda não sei / quero orientação</option>`;

  const phone = $("#f-whatsapp");
  phone.addEventListener("input", () => { phone.value = maskPhone(phone.value); });

  Object.keys(validators).forEach((name) => {
    const el = $(`[name="${name === "consent" ? "consentimento" : name}"]`);
    el.addEventListener("blur", () => { if (el.value || name === "consent") validateField(name); });
    el.addEventListener(el.type === "checkbox" || el.tagName === "SELECT" ? "change" : "input", () => {
      if (el.closest(".field").classList.contains("invalid")) validateField(name);
    });
  });

  form().addEventListener("submit", async (e) => {
    e.preventDefault();
    const f = form();
    const names = Object.keys(validators);
    const results = names.map(validateField);
    if (results.includes(false)) {
      const first = names[results.indexOf(false)];
      $(`[name="${first === "consent" ? "consentimento" : first}"]`).focus();
      toast("Confira os campos destacados.");
      return;
    }
    // honeypot: se preenchido, é provável spam — finge sucesso sem enviar
    if (f.empresa.value) { showSuccess(f.nome.value); return; }

    const course = ALL.find((c) => c.id === f.curso.value);
    const data = {
      nome: f.nome.value.trim(),
      whatsapp: f.whatsapp.value.replace(/\D/g, ""),
      email: f.email.value.trim(),
      cidade_estado: f.cidade.value.trim(),
      curso: course ? courseLabel(course) : "Ainda não sei / quero orientação",
      mensagem: f.mensagem.value.trim(),
      consentimento: true,
      origem: "site",
      pagina: location.pathname,
      ...(() => { const q = new URLSearchParams(location.search), o = {}; ["utm_source","utm_medium","utm_campaign","utm_term","utm_content","gclid"].forEach((k) => { if (q.get(k)) o[k] = q.get(k); }); return o; })(),
      enviado_em: new Date().toISOString(),
    };

    const btn = $("#submit-btn");
    btn.disabled = true;
    $(".btn-label", btn).textContent = "Enviando…";
    try {
      await LT.sendLead(data);
      const waMsg = `Olá! Sou ${data.nome}, de ${data.cidade_estado}. Acabei de enviar o formulário do site e tenho interesse em: ${data.curso}.`;
      if (LT.goThankYou) {
        LT.goThankYou({ nome: data.nome, curso: course ? course.n : "", slug: course ? slugify(course.n) : "", origem: "site", waMsg });
        return;
      }
      showSuccess(data.nome, data);
    } catch (err) {
      console.error(err);
      toast("Não foi possível enviar agora. Tente de novo ou fale pelo WhatsApp.");
    } finally {
      btn.disabled = false;
      $(".btn-label", btn).textContent = "Enviar mensagem";
    }
  });

  $("#form-reset").addEventListener("click", () => {
    form().reset();
    Object.keys(validators).forEach(clearError);
    $("#form-success").hidden = true;
    form().hidden = false;
    $("#f-nome").focus();
  });
}

function showSuccess(nome, data) {
  $("#success-name").textContent = nome.trim().split(/\s+/)[0];
  const msg = data
    ? `Olá! Sou ${data.nome}, de ${data.cidade_estado}. Acabei de enviar o formulário do site e tenho interesse em: ${data.curso}.`
    : "Olá! Acabei de enviar o formulário do site da LíderTec.";
  const wa = $("#success-wa");
  wa.href = waLink(msg); wa.target = "_blank"; wa.rel = "noopener";
  form().hidden = true;
  const box = $("#form-success");
  box.hidden = false;
  box.focus();
}

/* ---------- Linha do tempo (animação ao entrar na tela) ---------- */
function initSteps() {
  const steps = $(".steps");
  if (!steps || !("IntersectionObserver" in window) || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const r = steps.getBoundingClientRect();
  if (r.top < window.innerHeight) return; // já visível: mantém completo
  steps.style.setProperty("--progress", ".08");
  const io = new IntersectionObserver(([en]) => {
    if (en.isIntersecting) { steps.style.setProperty("--progress", "1"); io.disconnect(); }
  }, { threshold: .4 });
  io.observe(steps);
}

/* ---------- Início ---------- */
document.addEventListener("DOMContentLoaded", () => {
  wireWhatsApp();
  initHeader();
  initCatalog();
  initModal();
  initForm();
  initSteps();
  $("#year").textContent = new Date().getFullYear();
});
