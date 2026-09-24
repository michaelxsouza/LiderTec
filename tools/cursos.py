import unicodedata, re

def slugify(s):
    s = unicodedata.normalize("NFD", s).encode("ascii", "ignore").decode()
    return re.sub(r"[^a-z0-9]+", "-", s.lower()).strip("-")

CAT = {
    "CT": "na categoria 10 a 15 dias (competência CT)",
    "IT": "na categoria 7 dias (competência IT)",
    "SEI": "na categoria 2 a 7 dias (competência SEI)",
}

AREA_ICON = {
    "saude": "a-saude", "gestao": "a-gestao", "tecnologia": "a-tecnologia", "industria": "a-industria",
    "agro": "a-agro", "construcao": "a-construcao", "seguranca": "a-seguranca", "design": "a-design",
    "servicos": "a-servicos", "educacao": "a-educacao",
}

C = "[CONFIRMAR COM A CERTIFICADORA]"
def conselho(nome, orgao):
    return f"O registro profissional de {nome} é feito no {orgao}, que segue regras próprias. {C}"
GENERICO = f"Se a atuação exigir registro em conselho ou órgão profissional, valem as regras desse órgão. Tire suas dúvidas com um consultor antes de se inscrever. {C}"
CRT = "Conselho Regional dos Técnicos Industriais (CRT)"
CRTA = "Conselho Regional dos Técnicos Agrícolas (CRTA)"

# nome: (área, categorias, [2 perfis], registro)
DATA = {
 "Administração": ("gestao", ["CT", "SEI"], ["Atua em rotinas administrativas, como controle de documentos, compras, atendimento e finanças.", "Trabalha em escritórios, comércio, indústria ou órgãos públicos."], GENERICO),
 "Agente Comunitário de Saúde": ("saude", ["SEI"], ["Atua em visitas domiciliares e ações de prevenção e promoção da saúde.", "Trabalha junto a equipes de saúde da família e à comunidade."], GENERICO),
 "Agricultura": ("agro", ["IT", "SEI"], ["Atua no cultivo, manejo do solo, plantio e colheita.", "Trabalha em propriedades rurais, cooperativas ou empresas do agronegócio."], conselho("técnico agrícola", CRTA)),
 "Agricultura e Agroindústria": ("agro", ["SEI"], ["Atua na produção agrícola e no processamento de produtos do campo.", "Trabalha em propriedades rurais, cooperativas ou agroindústrias."], conselho("técnico agrícola", CRTA)),
 "Agroindústria": ("agro", ["SEI"], ["Atua no processamento e na conservação de produtos de origem vegetal e animal.", "Trabalha em laticínios, frigoríficos, cooperativas ou indústrias de alimentos."], conselho("técnico agrícola", CRTA)),
 "Agrimensura": ("construcao", ["SEI"], ["Atua com levantamentos topográficos, medições e demarcação de terrenos.", "Trabalha em obras, loteamentos, escritórios de topografia ou regularização fundiária."], conselho("técnico em agrimensura", CRT)),
 "Agropecuária": ("agro", ["IT"], ["Atua na produção agrícola e na criação de animais.", "Trabalha em fazendas, cooperativas ou empresas do agronegócio."], conselho("técnico em agropecuária", CRTA)),
 "Análises Clínicas": ("saude", ["CT", "SEI"], ["Atua na coleta, no preparo e no processamento de amostras laboratoriais.", "Trabalha em laboratórios de análises clínicas, hospitais ou clínicas."], GENERICO),
 "Automação Industrial": ("industria", ["SEI"], ["Atua com CLPs, sensores, inversores e sistemas de controle.", "Trabalha na instalação e na manutenção de linhas automatizadas."], conselho("técnico em automação industrial", CRT)),
 "Aquicultura": ("agro", ["SEI"], ["Atua na criação de peixes, camarões ou outros organismos aquáticos.", "Trabalha em pisciculturas, fazendas aquícolas ou cooperativas."], conselho("técnico em aquicultura", CRTA)),
 "Biotecnologia": ("industria", ["SEI"], ["Atua em laboratórios com processos biológicos, análises e controle de qualidade.", "Trabalha em indústrias, centros de pesquisa ou empresas do setor."], GENERICO),
 "Celulose e Papel": ("industria", ["CT"], ["Atua em etapas da produção de celulose e papel.", "Trabalha em fábricas do setor, na operação ou no controle de processos."], GENERICO),
 "Contabilidade": ("gestao", ["SEI"], ["Atua com lançamentos contábeis, rotinas fiscais e departamento pessoal.", "Trabalha em escritórios de contabilidade ou no setor financeiro de empresas."], GENERICO),
 "Cuidador de Idosos": ("saude", ["CT", "SEI"], ["Cuida de idosos na rotina diária, com higiene, alimentação e acompanhamento.", "Trabalha em residências, casas de repouso ou instituições de longa permanência."], GENERICO),
 "Defesa Civil": ("seguranca", ["SEI"], ["Atua na prevenção de desastres e no apoio à população em situações de emergência.", "Trabalha em órgãos públicos, brigadas ou equipes de resposta."], GENERICO),
 "Desenvolvimento de Sistemas": ("tecnologia", ["SEI"], ["Atua no desenvolvimento, teste ou manutenção de sistemas e aplicativos.", "Trabalha em empresas de tecnologia, setores de TI ou como freelancer."], GENERICO),
 "Design de Interiores": ("design", ["SEI"], ["Atua no planejamento e na decoração de ambientes residenciais ou comerciais.", "Trabalha em escritórios, lojas de móveis planejados ou por conta própria."], GENERICO),
 "Design Gráfico": ("design", ["SEI"], ["Atua na criação de peças gráficas, identidades visuais e materiais digitais.", "Trabalha em agências, gráficas, empresas ou como freelancer."], GENERICO),
 "Edificações": ("construcao", ["SEI"], ["Atua em obras, orçamentos, desenho técnico ou acompanhamento de execução.", "Trabalha em construtoras, escritórios de projeto ou órgãos públicos."], conselho("técnico em edificações", CRT)),
 "Eletroeletrônica": ("industria", ["IT"], ["Atua com instalações elétricas, circuitos e equipamentos eletrônicos.", "Trabalha na manutenção elétrica e eletrônica em indústrias ou empresas de serviço."], conselho("técnico em eletroeletrônica", CRT)),
 "Eletromecânica": ("industria", ["SEI"], ["Atua na manutenção de máquinas e equipamentos elétricos e mecânicos.", "Trabalha em indústrias, mineradoras ou empresas de manutenção."], conselho("técnico em eletromecânica", CRT)),
 "Eletrotécnica": ("industria", ["SEI"], ["Atua com instalações e manutenção elétrica residencial, predial ou industrial.", "Trabalha com quadros de distribuição, comandos elétricos ou painéis."], conselho("técnico em eletrotécnica", CRT)),
 "Eletrônica": ("industria", ["SEI"], ["Atua na montagem, no reparo ou na manutenção de equipamentos eletrônicos.", "Trabalha em assistências técnicas, indústrias ou empresas de automação."], conselho("técnico em eletrônica", CRT)),
 "Enfermagem": ("saude", ["SEI"], ["Atua em cuidados de enfermagem sob supervisão, em hospitais, clínicas ou unidades de saúde.", "Trabalha na assistência direta a pacientes."], conselho("técnico em enfermagem", "Conselho Regional de Enfermagem (COREN)")),
 "Equipamentos Biomédicos": ("saude", ["SEI"], ["Atua na instalação e na manutenção de equipamentos médico-hospitalares.", "Trabalha em hospitais, clínicas ou empresas de engenharia clínica."], GENERICO),
 "Estética": ("saude", ["CT", "SEI"], ["Atua com procedimentos estéticos faciais e corporais.", "Trabalha em clínicas, salões, spas ou por conta própria."], GENERICO),
 "Eventos": ("servicos", ["SEI"], ["Atua no planejamento, na organização ou na execução de eventos.", "Trabalha em buffets, agências, hotéis ou por conta própria."], GENERICO),
 "Farmácia": ("saude", ["CT", "SEI"], ["Atua no atendimento, na dispensação e no controle de estoque de medicamentos.", "Trabalha em drogarias, farmácias de manipulação ou hospitais."], GENERICO),
 "Finanças": ("gestao", ["IT"], ["Atua com contas a pagar e a receber, fluxo de caixa e controles financeiros.", "Trabalha em empresas, bancos, cooperativas ou escritórios."], GENERICO),
 "Gastronomia": ("servicos", ["SEI"], ["Atua no preparo de alimentos e na rotina de cozinhas profissionais.", "Trabalha em restaurantes, hotéis, buffets ou com negócio próprio."], GENERICO),
 "Gerência em Saúde": ("saude", ["SEI"], ["Atua na gestão administrativa de serviços de saúde.", "Trabalha em hospitais, clínicas, laboratórios ou unidades de saúde."], GENERICO),
 "Guia de Turismo": ("servicos", ["CT", "SEI"], ["Atua conduzindo e orientando turistas em passeios e roteiros.", "Trabalha com agências, receptivos ou por conta própria."], conselho("guia de turismo", "Cadastur, do Ministério do Turismo,")),
 "Informática": ("tecnologia", ["IT"], ["Atua com suporte técnico, manutenção de computadores e redes.", "Trabalha em empresas, assistências técnicas ou setores de TI."], GENERICO),
 "Informática para Internet": ("tecnologia", ["SEI"], ["Atua na criação de sites, sistemas web ou lojas virtuais.", "Trabalha em agências, empresas de tecnologia ou como freelancer."], GENERICO),
 "Logística": ("gestao", ["SEI"], ["Atua com armazenagem, estoque, expedição ou transporte.", "Trabalha em centros de distribuição, transportadoras, indústrias ou comércio."], GENERICO),
 "Manutenção de Máquinas Industriais": ("industria", ["SEI"], ["Atua na manutenção preventiva e corretiva de máquinas industriais.", "Trabalha em fábricas, usinas ou empresas de manutenção."], conselho("técnico em manutenção de máquinas industriais", CRT)),
 "Manutenção de Máquinas Navais": ("industria", ["SEI"], ["Atua na manutenção de motores e sistemas de embarcações.", "Trabalha em estaleiros, portos ou empresas de navegação."], conselho("técnico em manutenção de máquinas navais", CRT)),
 "Manutenção de Máquinas Pesadas": ("industria", ["SEI"], ["Atua na manutenção de tratores, escavadeiras, caminhões fora de estrada e similares.", "Trabalha em mineradoras, construtoras, locadoras ou oficinas."], conselho("técnico em manutenção de máquinas pesadas", CRT)),
 "Marketing": ("gestao", ["SEI"], ["Atua com divulgação, redes sociais, vendas ou atendimento ao cliente.", "Trabalha em empresas, agências ou com negócio próprio."], GENERICO),
 "Mecânica": ("industria", ["IT", "SEI"], ["Atua com manutenção mecânica, usinagem, montagem ou ajustagem.", "Trabalha em indústrias, oficinas ou empresas de manutenção."], conselho("técnico em mecânica", CRT)),
 "Meio Ambiente": ("agro", ["SEI"], ["Atua com gestão de resíduos, licenciamento ou monitoramento ambiental.", "Trabalha em empresas, consultorias ou órgãos públicos."], GENERICO),
 "Metalurgia": ("industria", ["SEI"], ["Atua em processos de fundição, laminação, tratamento térmico ou soldagem.", "Trabalha em siderúrgicas, metalúrgicas ou indústrias do setor."], conselho("técnico em metalurgia", CRT)),
 "Mineração": ("industria", ["SEI"], ["Atua em operações de lavra, perfuração, desmonte ou beneficiamento.", "Trabalha em mineradoras ou em empresas prestadoras de serviço do setor."], conselho("técnico em mineração", CRT)),
 "Nutrição e Dietética": ("saude", ["SEI"], ["Atua no preparo e no controle de refeições em serviços de alimentação.", "Trabalha em cozinhas industriais, hospitais, escolas ou restaurantes."], conselho("técnico em nutrição e dietética", "Conselho Regional de Nutricionistas (CRN)")),
 "Óptica": ("saude", ["SEI"], ["Atua na montagem de óculos e no atendimento em óticas.", "Trabalha em óticas e laboratórios ópticos."], GENERICO),
 "Prevenção e Combate a Incêndios": ("seguranca", ["SEI"], ["Atua em brigadas de incêndio, inspeção de equipamentos ou planos de emergência.", "Trabalha em empresas, indústrias, condomínios ou eventos."], GENERICO),
 "Qualidade": ("gestao", ["SEI"], ["Atua com inspeção, controle de processos, auditorias ou normas de qualidade.", "Trabalha em indústrias, laboratórios ou empresas de serviço."], GENERICO),
 "Química": ("industria", ["SEI"], ["Atua em laboratórios ou processos químicos industriais.", "Trabalha em indústrias, estações de tratamento ou laboratórios de análise."], conselho("técnico em química", "Conselho Regional de Química (CRQ)")),
 "Radiologia": ("saude", ["SEI"], ["Atua na realização de exames de imagem, como raio-X.", "Trabalha em hospitais, clínicas de imagem ou consultórios."], conselho("técnico em radiologia", "Conselho Regional de Técnicos em Radiologia (CRTR)")),
 "Recursos Humanos": ("gestao", ["SEI"], ["Atua com recrutamento, departamento pessoal ou treinamento.", "Trabalha em empresas, consultorias ou escritórios de contabilidade."], GENERICO),
 "Refrigeração e Climatização": ("industria", ["SEI"], ["Atua na instalação e na manutenção de ar-condicionado e sistemas de refrigeração.", "Trabalha em empresas de climatização, indústrias ou por conta própria."], conselho("técnico em refrigeração e climatização", CRT)),
 "Rede de Computadores": ("tecnologia", ["SEI"], ["Atua com instalação, configuração e manutenção de redes.", "Trabalha em provedores, empresas de TI ou setores de infraestrutura."], GENERICO),
 "Saúde Bucal": ("saude", ["SEI"], ["Atua no apoio ao cirurgião-dentista em procedimentos e prevenção.", "Trabalha em consultórios, clínicas odontológicas ou unidades de saúde."], conselho("técnico em saúde bucal", "Conselho Regional de Odontologia (CRO)")),
 "Secretaria Escolar": ("educacao", ["SEI"], ["Atua com matrículas, documentação e rotinas administrativas de escolas.", "Trabalha em secretarias de escolas públicas ou particulares."], GENERICO),
 "Secretaria Escolar Eletrônica": ("educacao", ["SEI"], ["Atua com sistemas de gestão escolar e documentação digital.", "Trabalha em secretarias de escolas públicas ou particulares."], GENERICO),
 "Segurança do Trabalho": ("seguranca", ["CT", "SEI"], ["Atua em rotinas de segurança do trabalho, como inspeções, controle de EPIs e treinamentos.", "Trabalha em empresas, obras ou indústrias apoiando a prevenção de acidentes."], conselho("técnico em segurança do trabalho", "Ministério do Trabalho e Emprego")),
 "Serviços Jurídicos": ("gestao", ["SEI"], ["Atua no apoio a rotinas jurídicas, como protocolos, prazos e documentos.", "Trabalha em escritórios de advocacia, cartórios ou departamentos jurídicos."], GENERICO),
 "Sistema de Energia Renovável": ("industria", ["SEI"], ["Atua na instalação ou na manutenção de sistemas de energia renovável.", "Trabalha em empresas integradoras, indústrias ou prestadoras de serviço."], GENERICO),
 "Telecomunicações": ("tecnologia", ["IT", "SEI"], ["Atua com instalação e manutenção de redes de telefonia, fibra óptica ou TV.", "Trabalha em provedores, operadoras ou prestadoras de serviço."], GENERICO),
 "Teologia": ("educacao", ["IT"], ["Atua em atividades religiosas, pastorais ou comunitárias.", "Participa de ministérios, igrejas ou projetos sociais."], GENERICO),
 "Tradução e Interpretação de Libras": ("educacao", ["SEI"], ["Atua na interpretação entre Libras e língua portuguesa.", "Trabalha em escolas, eventos, órgãos públicos ou instituições religiosas."], GENERICO),
 "Transações Imobiliárias": ("gestao", ["CT", "SEI"], ["Atua na compra, venda ou locação de imóveis.", "Trabalha em imobiliárias, construtoras ou por conta própria."], conselho("corretor de imóveis", "Conselho Regional de Corretores de Imóveis (CRECI)")),
 "Trânsito": ("seguranca", ["SEI"], ["Atua com fiscalização, educação ou operação de trânsito.", "Trabalha em órgãos de trânsito, autoescolas ou empresas de transporte."], GENERICO),
 "Vendas": ("gestao", ["SEI"], ["Atua no atendimento, na negociação e no pós-venda.", "Trabalha no comércio, em representação comercial ou com vendas externas."], GENERICO),
 "Veterinária": ("saude", ["CT", "SEI"], ["Atua no apoio a médicos-veterinários em clínicas e no manejo de animais.", "Trabalha em clínicas, pet shops, fazendas ou laboratórios."], GENERICO),
}

ORDER = ["CT", "IT", "SEI"]
COURSES = []
for nome, (area, cats, perfis, registro) in DATA.items():
    cats = sorted(cats, key=ORDER.index)
    txt = " e ".join(CAT[c] for c in cats).replace(" e na categoria", " e na categoria")
    slug = slugify(nome)
    COURSES.append(dict(
        slug=slug, name=nome, ref="LP-" + slug.upper(), icon=AREA_ICON[area], area=area, catlist=cats,
        cats=txt, profiles=perfis + ["Quer formalizar a experiência com uma certificação."], registro=registro,
    ))
