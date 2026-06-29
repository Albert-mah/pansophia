/* =============================================================
 * 名校培养方案 (STUDY_PROGRAMS) — 按学科 id 关联;library/discipline 按 id 查渲染。
 * 部分由后台 workflow 联网检索补全(查到真实链接才收)。每条 {school,program?,year?,tag:top|strong|solid,note?,url?}。
 * ============================================================= */
window.STUDY_PROGRAMS = {
  "accounting": [
    {"school":"芝加哥大学布斯商学院 (Chicago Booth)","program":"Accounting Concentration (MBA会计方向)","year":2024,"tag":"top","note":"多学科融合,选4门,特色税务战略、创业到IPO会计","url":"https://www.chicagobooth.edu/mba/academics/curriculum/concentrations/accounting"},
    {"school":"中国人民大学商学院","program":"会计学(本科)","year":2024,"tag":"strong","note":"财务会计/管理会计/审计/税法核心,设智能会计方向","url":"https://www.rmbs.ruc.edu.cn/jxxm/bk/bkzyjs/kjxzy/index.htm"}
  ],
  "aerospace": [
    {"school":"哈尔滨工业大学","program":"飞行器设计与工程 (本科)","year":2024,"tag":"strong","note":"2024级方案,飞行器总体/结构/动力学,航天特色突出","url":"https://sa.hit.edu.cn/2024/1210/c6601a360969/page.htm"},
    {"school":"麻省理工 MIT","program":"航空航天工程 (Course 16)","year":2025,"tag":"top","note":"Unified Engineering统一工程贯通材料/流体/热力/推进/信号","url":"https://catalog.mit.edu/degree-charts/aerospace-engineering-course-16/"},
    {"school":"佐治亚理工 Georgia Tech","program":"航空航天工程理学学士 (BSAE)","year":2025,"tag":"strong","note":"131学分,气动/结构/推进+capstone(固定翼/航天/旋翼)","url":"https://catalog.gatech.edu/programs/aerospace-engineering-bs/"}
  ],
  "aerospace-engineering": [
    {"school":"哈尔滨工业大学","program":"飞行器设计与工程 (本科)","year":2024,"tag":"strong","note":"2024级方案,飞行器总体/结构/动力学,航天特色突出","url":"https://sa.hit.edu.cn/2024/1210/c6601a360969/page.htm"},
    {"school":"麻省理工 MIT","program":"航空航天工程 (Course 16)","year":2025,"tag":"top","note":"Unified Engineering统一工程贯通材料/流体/热力/推进/信号","url":"https://catalog.mit.edu/degree-charts/aerospace-engineering-course-16/"},
    {"school":"佐治亚理工 Georgia Tech","program":"航空航天工程理学学士 (BSAE)","year":2025,"tag":"strong","note":"131学分,气动/结构/推进+capstone(固定翼/航天/旋翼)","url":"https://catalog.gatech.edu/programs/aerospace-engineering-bs/"}
  ],
  "agri-econ-mgmt": [
    {"school":"西北农林科技大学","tag":"top","program":"农林经济管理(120301)本科培养方案","year":2024,"note":"国家级重点学科,设农经/林经/农村金融等5方向","url":"https://jiaowu.nwsuaf.edu.cn/docs/2024-01/6e378c9abfcb403d914746ae26032deb.pdf"},
    {"school":"中国农业大学","tag":"strong","program":"农林经济管理(农业商务)专业培养方案","year":2023,"note":"国际化农业商务方向,经管+涉农交叉","url":"https://icb.cau.edu.cn/col/col48526/index.html"},
    {"school":"湖南农业大学","tag":"solid","program":"农林经济管理(120301)2022版人才培养方案","year":2022,"note":"核心课农业经济学/技术经济学/农产品营销,165学分","url":"https://eco.hunau.edu.cn/jyjx/bkjy/pyfa/202501/t20250102_441814.html"}
  ],
  "agri-eng": [
    {"school":"Purdue University","tag":"top","program":"Agricultural Engineering (ABE, BSAGE)","year":2024,"note":"长期全美第一,机械系统与环境自然资源两方向","url":"https://engineering.purdue.edu/ABE/academics/undergraduate/ae.html"},
    {"school":"UC Davis","tag":"strong","program":"Biological Systems Engineering (EBSE, BS)","year":2024,"note":"163学分,可选农业/水产/食品/生态等七方向","url":"https://bae.ucdavis.edu/undergraduate/EBSErequirements"}
  ],
  "agri-resources": [
    {"school":"中国农业大学","tag":"solid","program":"资源与环境学院专业介绍(农业资源与环境)","year":2024,"note":"全国首个农资环学院,植物营养/气象/生态环境分系","url":"https://zihuan.cau.edu.cn/col/col49048/index.html"},
    {"school":"加州大学戴维斯分校","tag":"strong","program":"ESM专业 土壤与生物地球化学方向","year":2024,"note":"土壤水资源管理+GIS遥感+养分与污染修复","url":"https://esm.ucdavis.edu/tracks"}
  ],
  "agriculture": [
    {"school":"康奈尔大学 CALS","tag":"top","program":"Agricultural Sciences Major (BS)","year":2025,"note":"12门核心+方向选修共16门,农业与食品系统整合科学训练","url":"https://cals.cornell.edu/education/degrees-programs/agricultural-sciences-major"},
    {"school":"瓦赫宁根大学","tag":"strong","program":"BSc Plant Sciences","year":2025,"note":"180 ECTS三年制,作物/土壤/农艺贯通植株到全球尺度,含田间实践","url":"https://studyhandbook.wur.nl/studies/BPW?type=bachelor"},
    {"school":"中国农业大学 农学院","tag":"solid","program":"农学专业本科课程设置","year":2024,"note":"植物生产类,作物栽培/育种/遗传/农业生态等核心课","url":"https://cab.cau.edu.cn/col/col11229/index.html"}
  ],
  "agriculture-engineering": [
    {"school":"加州大学戴维斯分校","tag":"strong","program":"Biological Systems Engineering BS 课程目录","year":2025,"note":"ABET 认证 162学分,生物技术/农业自然资源/食品工程三方向","url":"https://catalog.ucdavis.edu/departments-programs-degrees/biological-agricultural-engineering/biological-systems-engineering-bs/"},
    {"school":"普渡大学","tag":"strong","program":"Agricultural and Biological Engineering 学位要求","year":2025,"note":"面向食品/制药/生物加工,可按职业目标定制 plan of study","url":"https://engineering.purdue.edu/ABE/academics/advising/abe-degree-requirements"}
  ],
  "animal-husbandry": [
    {"school":"康奈尔大学","tag":"top","program":"动物科学(BS)专业要求","year":2024,"note":"核心课30学分+方向(兽医预科/乳业管理等)","url":"https://cals.cornell.edu/animal-science/degrees-programs/undergraduate-studies/major-requirements"},
    {"school":"瓦赫宁根大学","tag":"strong","program":"MSc Animal Sciences","year":2024,"note":"两年制,遗传育种/营养/生态/健康行为六方向","url":"https://www.wur.nl/en/education-programmes/master/msc-programmes/msc-animal-sciences/specialisations-of-animal-sciences.htm"},
    {"school":"中国农业大学","tag":"solid","program":"动物科学专业本科培养方案","year":2015,"note":"遗传育种+营养与饲料+动物生产与管理","url":"https://cast1.cau.edu.cn/art/2015/8/13/art_18992_389986.html"}
  ],
  "anthropology": [
    {"school":"哈佛大学 (Harvard University)","program":"Anthropology(社会人类学)本科主修","year":2024,"tag":"top","note":"三必修导修(民族志方法+二/三年级导修)+考古或社人课+研究研讨","url":"https://anthropology.fas.harvard.edu/concentration-requirements"}
  ],
  "archaeology": [
    {"school":"Yale University","tag":"top","program":"Undergraduate Program in Archaeological Studies","year":2024,"note":"12门课:概论+实验+理论+毕业研究,必修田野学校","url":"https://archaeology.yale.edu/academics/undergraduate-program-archaeological-studies"},
    {"school":"Cornell University","tag":"strong","program":"Archaeology Undergraduate Program","year":2024,"note":"32学分,方法/理论+多区域+田野或实验研究必修","url":"https://archaeology.cornell.edu/undergraduate"},
    {"school":"Stanford University","tag":"top","program":"Bachelor of Arts in Archaeology","year":2024,"note":"跨学科方法/理论/伦理训练,设田野与实验环节","url":"https://archaeology.stanford.edu/academics/undergraduate-program/bachelor-arts-archaeology"}
  ],
  "architecture": [
    {"school":"同济大学","program":"建筑学 (本科, 5年制)","year":2024,"tag":"top","note":"建筑设计主干贯通五年,QS建成环境全球前列,国际化强","url":"https://jwc.tongji.edu.cn/e9/78/c28582a256376/page.htm"},
    {"school":"清华大学","program":"建筑学 (本科, 五年制)","year":2023,"tag":"strong","note":"五年≥201学分,建筑设计主干+工程技术/建筑史+古建测绘","url":"https://www.tsinghua.edu.cn/jxjywj/bkzy2023/zxzy/1.pdf"},
    {"school":"苏黎世联邦理工 ETH Zurich","program":"建筑学学士 (BSc Architecture)","year":2025,"tag":"top","note":"四能力域(艺术/历史/环境社会/建造),三年180学分+实习","url":"https://arch.ethz.ch/en/studium/studienangebot/bachelor-architektur.html"}
  ],
  "architecture-eng": [
    {"school":"同济大学","program":"建筑学 (本科, 5年制)","year":2024,"tag":"top","note":"建筑设计主干贯通五年,QS建成环境全球前列,国际化强","url":"https://jwc.tongji.edu.cn/e9/78/c28582a256376/page.htm"},
    {"school":"清华大学","program":"建筑学 (本科, 五年制)","year":2023,"tag":"strong","note":"五年≥201学分,建筑设计主干+工程技术/建筑史+古建测绘","url":"https://www.tsinghua.edu.cn/jxjywj/bkzy2023/zxzy/1.pdf"},
    {"school":"苏黎世联邦理工 ETH Zurich","program":"建筑学学士 (BSc Architecture)","year":2025,"tag":"top","note":"四能力域(艺术/历史/环境社会/建造),三年180学分+实习","url":"https://arch.ethz.ch/en/studium/studienangebot/bachelor-architektur.html"}
  ],
  "area-studies": [
    {"school":"University of Southern California","tag":"solid","program":"MA in East Asian Area Studies","year":2025,"note":"区域研究典型范式:历史/政治/语言两年制跨学科","url":"https://dornsife.usc.edu/eascenter/academics/eaas_ma_program/"},
    {"school":"Ohio State University","tag":"solid","program":"Graduate Programs, East Asian Languages & Literatures","year":2025,"note":"语言+文学+文化的区域深耕,研究型培养","url":"https://deall.osu.edu/programs/graduate"}
  ],
  "area-studies-intl": [
    {"school":"Harvard University","tag":"top","program":"Regional Studies–East Asia (AM)","year":2024,"note":"跨学科区域硕士,语言+社会+文化弹性自组课程","url":"https://gsas.harvard.edu/program/regional-studies-east-asia"},
    {"school":"University of Oxford","tag":"top","program":"MPhil in Global and Area Studies","year":2024,"note":"多学科比较型区域研究,涵盖非洲/中国/中东等七大区","url":"https://www.area-studies.ox.ac.uk/mphil-in-global-and-area-studies"},
    {"school":"北京大学","tag":"strong","program":"区域与国别研究院 国别区域研究项目","year":2025,"note":"地区+语言+学科三模块,海外田野半年以上","url":"https://sfl.pku.edu.cn/jxgl/bks/tz/167462.htm"}
  ],
  "art-studies": [
    {"school":"南京大学","tag":"top","program":"美术学学术学位硕士培养方案(2021版)","year":2021,"note":"艺术创作论/艺术理论与美学/中外美术史专题","url":"https://art.nju.edu.cn/6c/cb/c55239a617675/page.htm"},
    {"school":"中国传媒大学","tag":"strong","program":"艺术学理论(130100)研究生培养方案","year":2021,"note":"北京市重点学科,设艺术史论/艺术管理等方向","url":"https://yz.cuc.edu.cn/_upload/article/files/cd/98/d95ba24e49bf9e5d691e2b6f0341/c2ca323f-03f8-4600-862a-f73f44b2d989.pdf"},
    {"school":"深圳大学","tag":"solid","program":"艺术学理论(130100)硕士培养方案","year":2021,"note":"学制三年,授艺术学学位,理论与批评并重","url":"https://art.szu.edu.cn/info/1154/2250.htm"}
  ],
  "astronomy": [
    {"school":"Caltech(加州理工)","program":"天体物理 Astrophysics Option (Ay)","year":2025,"tag":"top","note":"Ph物理基础+Ay20/21导论+Ay101/102进阶+Ay142/144科研","url":"https://catalog.caltech.edu/current/information-for-undergraduate-students/graduation-requirements-all-options/astrophysics-option-and-minor-ay/"},
    {"school":"普林斯顿大学 Princeton","program":"天体物理科学 Astrophysical Sciences(本科)","year":2025,"tag":"top","note":"物理力学电磁量子+AST204,高能/宇宙学/恒星形成+两篇JP+毕业论文","url":"https://web.astro.princeton.edu/academic/undergraduate-program/major-requirements"},
    {"school":"中国科学技术大学 USTC","program":"天文学(本科)","year":2023,"tag":"strong","note":"国家理科人才培养基地,物理为基+天体物理/天体测量/星系宇宙学","url":"https://catalog.ustc.edu.cn/program/203004"}
  ],
  "atmospheric-sci": [
    {"school":"University of Washington","tag":"top","program":"BS Atmospheric & Climate Science","year":2025,"note":"热力学/云物理/辐射传输/边界层等核心课齐全","url":"https://atmos.uw.edu/students/undergraduate-program/academic-program/"},
    {"school":"University of Colorado Boulder","tag":"strong","program":"BS Atmospheric & Oceanic Sciences (ATOC)","year":2025,"note":"34学分数理基础+21核心+12方法+12高阶选修结构清晰","url":"https://www.colorado.edu/atoc/academics/undergraduate-students/major/degree-requirements"},
    {"school":"University of California, Davis","tag":"solid","program":"BS Atmospheric Science","year":2025,"note":"明确分上下游课程与数理预修要求","url":"https://atm.ucdavis.edu/undergraduate/degree-requirements"}
  ],
  "basic-med": [
    {"school":"北京大学医学部","program":"基础医学(八年制)","year":2023,"tag":"strong","note":"八年制本博连读,面向基础医学研究,强化科研训练与创新能力","url":"https://jiaoyuchu.bjmu.edu.cn/zsjy/zsgz/zyjs/183008.htm"},
    {"school":"复旦大学上海医学院","program":"基础医学","year":2024,"tag":"strong","note":"解剖/生化/病原等7个国家重点学科,器官系统整合+实验研究导向","url":"https://basicmed.fudan.edu.cn/ac/a7/c28509a306343/page.htm"}
  ],
  "bioeng": [
    {"school":"加州大学伯克利分校","tag":"top","program":"Bioengineering BS","year":2026,"note":"工程与生物交叉,数理化生计算基础后入专业方向","url":"https://bioeng.berkeley.edu/undergrad"},
    {"school":"莱斯大学","tag":"strong","program":"Bioengineering Undergraduate Curriculum","year":2026,"note":"前两年通识基础,三四年按技术兴趣选工程课","url":"https://bioengineering.rice.edu/academics/undergraduate-programs/undergraduate-curriculum"},
    {"school":"普渡大学","tag":"solid","program":"Biological Engineering (ABE)","year":2026,"note":"农业与生物工程系,偏生物过程与系统工程","url":"https://engineering.purdue.edu/ABE/academics/undergraduate/be.html"}
  ],
  "biology": [
    {"school":"MIT(麻省理工)","program":"生物学 Biology (Course 7)","year":2026,"tag":"top","note":"7.012导论+7.05生化+7.06细胞,3门限选选修+7.19实验生物学交流capstone","url":"https://catalog.mit.edu/degree-charts/biology-course-7/"},
    {"school":"清华大学","program":"生物科学(本科)","year":2023,"tag":"strong","note":"生化/遗传/分子全英文授课,细胞/生理双语,重实验创新,157学分","url":"https://www.tsinghua.edu.cn/jxjywj/bkzy2023/zxzy/43-1.pdf"},
    {"school":"北京大学","program":"生物科学(本科)","year":2025,"tag":"strong","note":"国家理科生物学基地,细胞/遗传/生化/分子为核,模块式教学+100%科研","url":"https://web.bio.pku.edu.cn/Uploads/file/20250923/20250923112822_71156.pdf"}
  ],
  "biomed-eng": [
    {"school":"约翰霍普金斯 Johns Hopkins","program":"生物医学工程理学学士 (BME BS)","year":2025,"tag":"top","note":"129学分,线性系统/生物控制/建模仿真+7方向(影像/神经等)","url":"https://www.bme.jhu.edu/academics/undergraduate/undergraduate-degree-requirements/"},
    {"school":"佐治亚理工-埃默里 Coulter BME","program":"生物医学工程理学学士 (BS)","year":2025,"tag":"top","note":"GT工程×Emory医学合办,问题导向PBL+守恒原理/工程分析","url":"https://bme.gatech.edu/academics/undergraduate-programs"}
  ],
  "biomedical-engineering": [
    {"school":"约翰霍普金斯 Johns Hopkins","program":"生物医学工程理学学士 (BME BS)","year":2025,"tag":"top","note":"129学分,线性系统/生物控制/建模仿真+7方向(影像/神经等)","url":"https://www.bme.jhu.edu/academics/undergraduate/undergraduate-degree-requirements/"},
    {"school":"佐治亚理工-埃默里 Coulter BME","program":"生物医学工程理学学士 (BS)","year":2025,"tag":"top","note":"GT工程×Emory医学合办,问题导向PBL+守恒原理/工程分析","url":"https://bme.gatech.edu/academics/undergraduate-programs"}
  ],
  "business": [
    {"school":"哈佛商学院 (HBS)","program":"MBA Required Curriculum","year":2024,"tag":"top","note":"一年级全核心:财务/会计/营销/运营/领导力,案例教学","url":"https://www.hbs.edu/mba/academic-experience/curriculum"},
    {"school":"北京大学光华管理学院","program":"工商管理(本科)","year":2021,"tag":"strong","note":"涵盖会计/营销/战略/管科信息系统,书院制全英文","url":"https://www.gsm.pku.edu.cn/undergraduate/kcpy/pyjh.htm"}
  ],
  "chem-eng": [
    {"school":"清华大学","program":"化学工程与工业生物工程 (本科)","year":2023,"tag":"strong","note":"153学分,数理化生基础+化工产品/设备/工艺设计,过ABET","url":"https://www.tsinghua.edu.cn/jxjywj/bkzy2023/zxzy/34.pdf"},
    {"school":"麻省理工 MIT","program":"化学工程 (Course 10)","year":2025,"tag":"top","note":"化工核心:传递/热力学/反应工程/分离+实验室","url":"https://catalog.mit.edu/degree-charts/chemical-engineering-course-10/"}
  ],
  "chemical-engineering": [
    {"school":"清华大学","program":"化学工程与工业生物工程 (本科)","year":2023,"tag":"strong","note":"153学分,数理化生基础+化工产品/设备/工艺设计,过ABET","url":"https://www.tsinghua.edu.cn/jxjywj/bkzy2023/zxzy/34.pdf"},
    {"school":"麻省理工 MIT","program":"化学工程 (Course 10)","year":2025,"tag":"top","note":"化工核心:传递/热力学/反应工程/分离+实验室","url":"https://catalog.mit.edu/degree-charts/chemical-engineering-course-10/"}
  ],
  "chemistry": [
    {"school":"MIT(麻省理工)","program":"化学 Chemistry (Course 5)","year":2026,"tag":"top","note":"5.111/5.112普化→5.12有机→5.13结构,URIECA模块化研究型实验","url":"https://catalog.mit.edu/degree-charts/chemistry-course-5/"},
    {"school":"北京大学","program":"化学(本科)","year":2023,"tag":"strong","note":"入学不分专业,普化/有机/物化/结构化学加实验,高年级定方向","url":"https://www.chem.pku.edu.cn/xwykc/bks/index.htm"},
    {"school":"中国科学技术大学 USTC","program":"化学(本科)","year":2023,"tag":"strong","note":"厚数理基础+四大化学(无机/分析/有机/物化),国家级化学实验教学中心","url":"https://catalog.ustc.edu.cn/program/207001"}
  ],
  "china-history": [
    {"school":"北京大学历史学系","program":"中国史(本科)","year":2024,"tag":"strong","note":"中国通史为基+断代史/专题史选修,通识与专业结合,本硕博连读","url":"https://history.pku.edu.cn/"}
  ],
  "chinese-lit": [
    {"school":"北京大学中国语言文学系","program":"中国语言文学(本科)","year":2023,"tag":"strong","note":"前两年统一核心基础课,三年级分文学/汉语语言学/古典文献/应用语言学","url":"https://chinese.pku.edu.cn/"},
    {"school":"复旦大学中国语言文学系","program":"汉语言文学(本科)","year":2024,"tag":"strong","note":"通才教育文史哲贯通,核心现/古汉语·中国古代文学史·文学概论","url":"https://jwc.fudan.edu.cn/_upload/article/files/d4/56/707002a8413b8a3cc690244c1118/c13743da-d1b6-4876-8c09-410fdf0042d8.pdf"}
  ],
  "civil": [
    {"school":"同济大学","program":"土木工程 (本科)","year":2025,"tag":"top","note":"工程力学→结构力学→混凝土/钢结构+结构全寿命维护","url":"https://civileng.tongji.edu.cn/75/37/c18089a357687/page.htm"},
    {"school":"代尔夫特理工 TU Delft","program":"土木工程学士 (BSc Civil Engineering)","year":2024,"tag":"top","note":"结构力学+混凝土/钢结构+水利(明渠流/水工建筑),水利见长","url":"https://www.tudelft.nl/en/student/ceg-student-portal/education/bachelor/bachelor-civil-engineering/curriculum-charts"}
  ],
  "civil-engineering": [
    {"school":"同济大学","program":"土木工程 (本科)","year":2025,"tag":"top","note":"工程力学→结构力学→混凝土/钢结构+结构全寿命维护","url":"https://civileng.tongji.edu.cn/75/37/c18089a357687/page.htm"},
    {"school":"代尔夫特理工 TU Delft","program":"土木工程学士 (BSc Civil Engineering)","year":2024,"tag":"top","note":"结构力学+混凝土/钢结构+水利(明渠流/水工建筑),水利见长","url":"https://www.tudelft.nl/en/student/ceg-student-portal/education/bachelor/bachelor-civil-engineering/curriculum-charts"}
  ],
  "classics": [
    {"school":"牛津大学","tag":"top","program":"Classics (Literae Humaniores) BA","year":2024,"note":"Mods+Greats两段制,希腊拉丁语言、文学、哲学、古史考古全覆盖","url":"https://www.classics.ox.ac.uk/classics"},
    {"school":"哈佛大学","tag":"top","program":"Classics Concentration(古典文明 / 古典语言文学双轨)","year":2024,"note":"12门课双轨设计,含研究方法导师课Classics 98","url":"https://classics.fas.harvard.edu/concentrations-0"}
  ],
  "clinical-med": [
    {"school":"哈佛医学院 Harvard Medical School","program":"Pathways MD 项目","year":2024,"tag":"top","note":"术前基础+器官系统模块,早临床纵向,PCE临床年+末段学术项目三段式","url":"https://hms.harvard.edu/education-admissions/md-program/curriculum/pathways"},
    {"school":"约翰霍普金斯医学院 Johns Hopkins SOM","program":"Genes to Society MD","year":2024,"tag":"top","note":"基因到社会框架,15个月器官系统整合主课+横向贯穿临床/社会主题","url":"https://www.hopkinsmedicine.org/som/curriculum/genes-to-society/curriculum"},
    {"school":"北京协和医学院","program":"临床医学(八年制)","year":2023,"tag":"top","note":"八年一贯本硕博融通,前2.5年清华预科,后续基础+临床+科研训练","url":"https://www.cams.cn/yxbd/cd0366454af74e2d9cca0c9d11fde479.htm"},
    {"school":"北京大学医学部","program":"临床医学(八年制)","year":2023,"tag":"strong","note":"八年一贯融通培养,器官系统整合,基础与临床融合的新课程体系","url":"https://jiaoyuchu.bjmu.edu.cn/zsjy/zsgz/zyjs/183004.htm"},
    {"school":"牛津大学 University of Oxford","program":"Medicine (BM BCh, A100)","year":2024,"tag":"top","note":"3年临床前(医学科学BA+科研项目)+3年临床,生理药理/生化遗传/群体健康","url":"https://www.medsci.ox.ac.uk/study/medicine/pre-clinical/structure"}
  ],
  "command": [
    {"school":"U.S. Army Command & General Staff College","tag":"top","program":"CGSOC / Master of Military Art and Science (MMAS)","note":"陆军参谋指挥旗舰课，含MMAS/MOS学位，170+选修","url":"https://armyuniversity.edu/cgsc/degreeprograms"},
    {"school":"USMC Command and Staff College (Quantico)","tag":"strong","program":"Master of Military Studies","note":"10个月校官中级指挥参谋课，可选军事研究硕士","url":"https://www.usmcu.edu/Colleges-and-Schools/Command-and-Staff-College/"},
    {"school":"Air Command and Staff College (Air University)","tag":"solid","program":"Master of Military Operational Art and Science (MMOAS)","note":"空军中级指挥参谋教育与作战艺术硕士","url":"https://en.wikipedia.org/wiki/Air_Command_and_Staff_College"}
  ],
  "communication-studies": [
    {"school":"西北大学","tag":"top","program":"Major in Communication Studies","year":2024,"note":"传播学院旗舰,修满12门传播学课程,口碑业界顶尖","url":"https://communication.northwestern.edu/academics/communication-studies/undergraduate-programs/major-communication-studies.html"},
    {"school":"加州大学洛杉矶分校","tag":"strong","program":"Communication Major","year":2024,"note":"四大核心领域各修一门:大众媒介/人际/数字技术/政治法律传播","url":"https://comm.ucla.edu/undergraduate/major-requirements/"},
    {"school":"北卡罗来纳大学教堂山分校","tag":"solid","program":"Communication Studies Major, BA","year":2024,"note":"修辞/媒体艺术/表演研究/新媒体多方向","url":"https://catalog.unc.edu/undergraduate/programs-study/communication-studies-major-ba/"}
  ],
  "computer-engineering": [
    {"school":"MIT","tag":"top","program":"Computer Science and Engineering (Course 6-3) 学位图","year":2025,"note":"EECS 最大本科方向,header 学科+lab+进阶课的灵活硬核体系","url":"https://catalog.mit.edu/degree-charts/computer-science-engineering-course-6-3/"},
    {"school":"卡内基梅隆大学","tag":"top","program":"BS in Electrical and Computer Engineering 培养指南","year":2025,"note":"Core/Breadth/Coverage/Depth+Capstone 五层递进,379学分","url":"https://www.ece.cmu.edu/academics/bs-in-ece/academic-guide.html"},
    {"school":"加州大学伯克利分校","tag":"top","program":"EECS Bachelor of Science 学位要求","year":2025,"note":"三门 ECE 广度+四门技术选修+工程伦理,软硬一体","url":"https://eecs.berkeley.edu/academics/undergraduate/eecs-bs/"}
  ],
  "computer-science": [
    {"school":"清华大学","program":"计算机科学与技术(本科)","year":2023,"tag":"top","note":"160 学分,大类基础+系统结构/软件理论/应用三方向限选","url":"https://www.cs.tsinghua.edu.cn/info/1043/5969.htm"},
    {"school":"北京大学","program":"计算机科学与技术(图灵班)","year":2024,"tag":"top","note":"理论/系统/应用/机器学习四方向,图灵导师小班科研轮转","url":"https://eecs.pku.edu.cn/info/1083/6426.htm"},
    {"school":"上海交通大学","program":"计算机科学与技术(ACM班/致远)","year":2022,"tag":"top","note":"研究型小班,数理逻辑+编译+操作系统,7:3 讲授讨论","url":"https://zhiyuan.sjtu.edu.cn/html/zhiyuan/service_list.php?bg=jxfw"},
    {"school":"MIT 麻省理工","program":"6-3 Computer Science and Engineering","year":2024,"tag":"top","note":"核心 6.1010 编程→6.1210 算法→6.1800 系统,先编程后理论","url":"https://catalog.mit.edu/degree-charts/computer-science-engineering-course-6-3/"},
    {"school":"Stanford 斯坦福","program":"Computer Science (BS)","year":2024,"tag":"top","note":"96 单元,数学科学打底,分 AI/系统/理论/视觉等 track","url":"https://www.cs.stanford.edu/bachelors/degree-requirements"},
    {"school":"CMU 卡内基梅隆","program":"Computer Science (BS)","year":2024,"tag":"top","note":"核心 15-122 命令式→15-150 函数式→15-213 系统,双范式打底","url":"http://coursecatalog.web.cmu.edu/schools-colleges/schoolofcomputerscience/undergraduatecomputerscience/"},
    {"school":"ETH Zürich 苏黎世联邦理工","program":"Computer Science (Bachelor)","year":2023,"tag":"strong","note":"180 学分3年,一年级系统化编程+数学,三年级三方向二选深化","url":"https://inf.ethz.ch/studies/bachelor.html"}
  ],
  "control": [
    {"school":"清华大学","program":"自动化(本科)","year":2023,"tag":"top","note":"165 学分,电路原理+信号系统+自动控制理论,AI/机器人因材施教","url":"https://www.tsinghua.edu.cn/jxjywj/bkzy2023/zxzy/27.pdf"},
    {"school":"浙江大学","program":"自动化(控制科学与工程学院)","year":2024,"tag":"strong","note":"工信大类基础+自动控制理论+传感检测+嵌入式,拓展机器人/AI","url":"https://bksy.zju.edu.cn/2024/0925/c83934a2967208/page.htm"}
  ],
  "cpc-history": [
    {"school":"河北师范大学","tag":"strong","program":"中共党史党建学一级学科简介(含二级学科与培养)","year":2024,"note":"理论/党史/党的领导与建设/党务工作四二级学科,硕博培养","url":"https://xbpjd.hebtu.edu.cn/a/2024/04/07/1F5088919E274807B3C588FDA7B0AA4B.html"},
    {"school":"当代中国研究所(国史网)","tag":"solid","program":"中共党史党建学学科建设·课程体系研讨(学科代码0307)","year":2023,"note":"2022新增法学门类一级学科,专业通开课四方向设计探讨","url":"http://hprc.cssn.cn/gsyj/xkjs/xkjsll/202311/P020231127357633014051.pdf"},
    {"school":"广西社科/外事办专题","tag":"solid","program":"中共党史党建学二级学科及课程设置思考","note":"强调党史专业本科区别通识的学术训练与课程规划","url":"http://wsb.gxzf.gov.cn/ztzl_48183/rdzt_20240516/sxbnds_2021/t16954438.shtml"}
  ],
  "criminology": [
    {"school":"宾夕法尼亚大学","tag":"top","program":"Criminology 本科主修","year":2024,"note":"犯罪学系独立设系,核心+秋季高级研究 capstone 必修不可替代","url":"https://crim.sas.upenn.edu/undergraduate/major-requirements"},
    {"school":"乔治梅森大学","tag":"strong","program":"BS in Criminology, Law and Society","year":2024,"note":"犯罪学+法律+社会三维结构,面向执法/司法实务就业","url":"https://cls.gmu.edu/programs/la-bs-cls/requirements"},
    {"school":"佛罗里达大学","tag":"solid","program":"Criminology, BA","year":2024,"note":"公立强校课程目录页,犯罪与越轨理论+研究方法主线","url":"https://catalog.ufl.edu/UGRD/colleges-schools/UGLAS/CRI_BA/"}
  ],
  "crop-sci": [
    {"school":"Iowa State University","tag":"top","program":"Agronomy (B.S.)","year":2025,"note":"农学重镇，作物+土壤一体的农艺学体系","url":"https://catalog.iastate.edu/collegeofagricultureandlifesciences/agronomy/"},
    {"school":"University of Illinois Urbana-Champaign","tag":"strong","program":"Agronomy, B.S.","year":2026,"note":"126学分，植物生物/遗传/病虫害/土壤","url":"https://catalog.illinois.edu/undergraduate/aces/agronomy-bs/"},
    {"school":"North Carolina State University","tag":"strong","program":"Crop & Soil Sciences (B.S.): Agronomy","year":2025,"note":"作物生产管理与土壤科学双方向","url":"https://catalog.ncsu.edu/undergraduate/agriculture-life-sciences/crop-soil-sciences/crop-soil-sciences-bs-agronomy/"}
  ],
  "cs": [
    {"school":"清华大学","program":"计算机科学与技术(本科)","year":2023,"tag":"top","note":"160 学分,大类基础+系统结构/软件理论/应用三方向限选","url":"https://www.cs.tsinghua.edu.cn/info/1043/5969.htm"},
    {"school":"北京大学","program":"计算机科学与技术(图灵班)","year":2024,"tag":"top","note":"理论/系统/应用/机器学习四方向,图灵导师小班科研轮转","url":"https://eecs.pku.edu.cn/info/1083/6426.htm"},
    {"school":"上海交通大学","program":"计算机科学与技术(ACM班/致远)","year":2022,"tag":"top","note":"研究型小班,数理逻辑+编译+操作系统,7:3 讲授讨论","url":"https://zhiyuan.sjtu.edu.cn/html/zhiyuan/service_list.php?bg=jxfw"},
    {"school":"MIT 麻省理工","program":"6-3 Computer Science and Engineering","year":2024,"tag":"top","note":"核心 6.1010 编程→6.1210 算法→6.1800 系统,先编程后理论","url":"https://catalog.mit.edu/degree-charts/computer-science-engineering-course-6-3/"},
    {"school":"Stanford 斯坦福","program":"Computer Science (BS)","year":2024,"tag":"top","note":"96 单元,数学科学打底,分 AI/系统/理论/视觉等 track","url":"https://www.cs.stanford.edu/bachelors/degree-requirements"},
    {"school":"CMU 卡内基梅隆","program":"Computer Science (BS)","year":2024,"tag":"top","note":"核心 15-122 命令式→15-150 函数式→15-213 系统,双范式打底","url":"http://coursecatalog.web.cmu.edu/schools-colleges/schoolofcomputerscience/undergraduatecomputerscience/"},
    {"school":"ETH Zürich 苏黎世联邦理工","program":"Computer Science (Bachelor)","year":2023,"tag":"strong","note":"180 学分3年,一年级系统化编程+数学,三年级三方向二选深化","url":"https://inf.ethz.ch/studies/bachelor.html"}
  ],
  "cultural-studies": [
    {"school":"明尼苏达大学","tag":"strong","program":"BA Cultural Studies & Comparative Literature","year":2024,"note":"跨学科,文学影视流行文化音乐视觉艺术并置分析","url":"https://cla.umn.edu/cscl/undergraduate/majors-minors/cultural-studies-comparative-literature/ba-cultural-studies-comparative-literature"},
    {"school":"利兹大学","tag":"strong","program":"Cultural and Media Studies BA","year":2024,"note":"文化与媒体研究并轨,英国文化研究传统重镇","url":"https://courses.leeds.ac.uk/g641/cultural-and-media-studies-ba"},
    {"school":"陶森大学(Towson)","tag":"solid","program":"Cultural Studies Major","year":2024,"note":"31学分:导论+方法+选修+顶点项目+12学分跨学科课","url":"https://catalog.towson.edu/undergraduate/fine-arts-communication/communication-studies/cultural-studies/cultural-studies/"}
  ],
  "cybersec": [
    {"school":"Florida International University","tag":"strong","program":"B.S. in Cybersecurity","year":2025,"note":"NSA/DHS CAE认证，工程与计算机交叉","url":"https://www.cis.fiu.edu/degree/b-s-in-cybersecurity/"},
    {"school":"University of Cincinnati","tag":"strong","program":"B.S. in Cybersecurity","year":2025,"note":"课程多为动手实验+两学期毕业设计","url":"https://www.cech.uc.edu/schools/it/undergrad-programs/bachelor-cybersecurity/bachelor-cybersecurity-curriculum.html"},
    {"school":"Michigan Technological University","tag":"solid","program":"B.S. in Cybersecurity","year":2025,"note":"应用计算系，含明确学分与课程要求","url":"https://www.mtu.edu/applied-computing/undergraduate/cybersecurity/curriculum/"}
  ],
  "dance": [
    {"school":"茱莉亚学院 (The Juilliard School)","tag":"top","program":"Dance, Bachelor of Fine Arts","year":2024,"note":"芭蕾+现代/当代技术+编舞,与哥大/巴纳德合修通识","url":"https://catalog.juilliard.edu/preview_program.php?catoid=36&poid=3313"},
    {"school":"北京舞蹈学院","tag":"top","program":"中国古典舞系 舞蹈表演本科 培养方案","year":2024,"note":"三阶段培养,身韵/汉唐/敦煌9门课程结构","url":"https://zggdw.bda.edu.cn/bxgk/pyfa/index.htm"}
  ],
  "data-science": [
    {"school":"UC Berkeley 加州伯克利","program":"Data Science (Major, CDSS)","year":2024,"tag":"top","note":"Data C8+C100 双核心,数据科学生命周期+领域 Domain Emphasis 三课","url":"https://cdss.berkeley.edu/dsus/academics/data-science-major"},
    {"school":"MIT 麻省理工","program":"6-14 Computer Science, Economics, and Data Science","year":2024,"tag":"strong","note":"CS+经济+数据科学交叉,概率优化+计量经济+机器学习","url":"https://catalog.mit.edu/degree-charts/computer-science-economics-data-science-course-6-14/"}
  ],
  "demography": [
    {"school":"Princeton University","tag":"top","program":"Ph.D. in Population Studies (OPR)","year":2022,"note":"五年制博士,通论+两方向通过考,12方向含经济/家庭/迁移人口学","url":"https://opr.princeton.edu/graduate-program/phd-population-studies-pips"},
    {"school":"University of California, Berkeley","tag":"top","program":"Demography Graduate Program","year":2022,"note":"独立人口学系,核心方法论+形式人口学严训","url":"https://www.demog.berkeley.edu/graduate-program/"},
    {"school":"Penn State University","tag":"strong","program":"Demography Dual-Title Graduate Program","year":2022,"note":"双学位制,12学分核心课加跨系结合","url":"https://demography.psu.edu/curriculum/"}
  ],
  "dentistry": [
    {"school":"哈佛牙医学院 Harvard SDM","program":"Doctor of Dental Medicine (DMD)","year":2024,"tag":"top","note":"首年与HMS同修Pathways基础医学,D2起口腔解剖/微生物/病理纵向课","url":"https://www.hsdm.harvard.edu/dmd-program"},
    {"school":"北京大学口腔医学院","program":"口腔医学(八年制本博连读)","year":2023,"tag":"strong","note":"八年本博融通,牙体牙髓/牙周/修复/正畸/颌面外科+早期科研项目","url":"https://jiaoyuchu.bjmu.edu.cn/zsjy/zsgz/zyjs/183006.htm"}
  ],
  "design": [
    {"school":"代尔夫特理工 TU Delft","program":"工业设计工程学士 (BSc IDE)","year":2023,"tag":"top","note":"人/组织/技术三支柱,设计项目贯穿三年+毕业设计","url":"https://www.tudelft.nl/en/onderwijs/opleidingen/bachelors/industrieel-ontwerpen/bsc-industrial-design-engineering"},
    {"school":"斯坦福大学 Stanford","program":"产品设计理学学士 (Design BS)","year":2025,"tag":"top","note":"机械工程基础+needfinding/原型,技术×人因×商业融合","url":"https://bulletin.stanford.edu/programs/DESIGN-BS"},
    {"school":"同济大学","program":"工业设计 (设计创意学院)","year":2024,"tag":"strong","note":"亚洲顶尖设计院,工业设计授工学位,1+3大类培养","url":"https://tjdi.tongji.edu.cn/about.do?ID=156"}
  ],
  "development-studies": [
    {"school":"伦敦政治经济学院","tag":"top","program":"MSc Development Studies","year":2024,"note":"从制度/权力/历史遗产视角分析全球不平等,毕业去向世行/IMF/联合国","url":"https://www.lse.ac.uk/study-at-lse/graduate/msc-development-studies"},
    {"school":"伦敦大学亚非学院 (SOAS)","tag":"strong","program":"MSc International Development","year":2024,"note":"批判与去殖民路径,含国际实习模块+发展实务模块","url":"https://www.soas.ac.uk/study/find-course/msc-international-development-0"},
    {"school":"伦敦大学亚非学院 (SOAS)","tag":"solid","program":"MPhil/PhD Development Studies","year":2024,"note":"发展学博士路径,跨学科社科训练+独立批判分析","url":"https://www.soas.ac.uk/study/find-course/mphil/phd-development-studies"}
  ],
  "discipline-insp": [
    {"school":"清华大学","tag":"strong","program":"纪检监察学科建设(课程/教材体系)","year":2022,"note":"中央纪委国家监委发文,研究生培养目标+课程体系建设","url":"https://www.tsinghua.edu.cn/info/1182/98333.htm"},
    {"school":"南京审计大学法学院","tag":"solid","program":"纪检监察本科人才培养","year":2025,"note":"纪法贯通、监审融合、实践导向的复合型培养路径","url":"https://law.nau.edu.cn/2025/0527/c1127a144585/page.htm"},
    {"school":"东南大学法学院","tag":"solid","program":"纪检监察学科发展与学科建构","year":2022,"note":"学科现状、建构路径与课程设置探讨","url":"https://law.seu.edu.cn/fanfufazhi/2022/0120/c20565a397976/page.psp"}
  ],
  "earth-science": [
    {"school":"MIT(麻省理工)","program":"地球大气与行星科学 EAPS (Course 12)","year":2026,"tag":"top","note":"跨学科数据驱动,4方向+数理化支撑(18.03/8.03/5.601),重野外与UROP","url":"https://catalog.mit.edu/degree-charts/earth-atmospheric-planetary-sciences-course-12/"},
    {"school":"Caltech(加州理工)","program":"地质与行星科学 GPS(本科)","year":2025,"tag":"top","note":"Ge11起步,地质/地球生物/地球化学/地球物理/行星科学多track,整合数理化","url":"https://catalog.caltech.edu/current/information-for-undergraduate-students/graduation-requirements-all-options/geological-and-planetary-sciences-gps-geology-geobiology-geochemistry-geophysics-planetary-science/"},
    {"school":"北京大学","program":"地球与空间科学(本科)","year":2024,"tag":"strong","note":"一年级不分专业修数理化,地质学类与地球物理学类两大方向","url":"https://sess.pku.edu.cn/jyjx1/bkspy/pyfa.htm"},
    {"school":"中国科学技术大学 USTC","program":"地球科学(地球物理/地球化学)(本科)","year":2023,"tag":"strong","note":"地球和空间科学学院,地球物理/地球化学/空间科学/大气科学多专业","url":"https://catalog.ustc.edu.cn/program/208001"}
  ],
  "ecology": [
    {"school":"Yale University","tag":"top","program":"Ecology & Evolutionary Biology PhD","year":2025,"note":"五年制,理论生态+数学建模+原创学位论文","url":"https://eeb.yale.edu/graduate-program-phd-requirements"},
    {"school":"University of Georgia","tag":"strong","program":"Odum School Ph.D. in Ecology","year":2025,"note":"全美独立生态学院,现代生态/种群/生态系统三核心","url":"https://ecology.uga.edu/degree/phd-ecology/"},
    {"school":"Colorado State University","tag":"solid","program":"Graduate Degree Program in Ecology","year":2025,"note":"跨系生态学位,课程体系灵活含统计与实验设计","url":"https://ecology.colostate.edu/curriculum-courses/"}
  ],
  "econ-applied": [
    {"school":"中国人民大学经济学院","program":"经济学(本科)","year":2024,"tag":"strong","note":"167学分,政经+中级微宏观+计量,国家经济学基础基地","url":"https://econ.ruc.edu.cn/jxgl/bks/zyjs1/index.htm"}
  ],
  "econ-theory": [
    {"school":"MIT经济系 (MIT)","program":"Economics, Course 14-1 (本科经济学)","year":2024,"tag":"top","note":"14.01/14.06微宏观+14.30统计,理论扎实兼独立研究","url":"https://catalog.mit.edu/degree-charts/economics-course-14/"}
  ],
  "economics": [
    {"school":"哈佛大学经济系 (Harvard)","program":"Economics Concentration (本科经济学)","year":2024,"tag":"top","note":"EC10入门+中级微宏观+统计+二年级导修,理论实证并重","url":"https://www.economics.harvard.edu/concentrating-economics"},
    {"school":"北京大学国家发展研究院","program":"经济学(国家发展方向,本科)","year":2024,"tag":"strong","note":"经济学为基础社科博雅,重批判思维+4学分专业实践","url":"https://www.nsd.pku.edu.cn/jxxm/bks/jxgl/jxjh/index.htm"},
    {"school":"复旦大学经济学院","program":"经济学(本科)","year":2025,"tag":"strong","note":"计量+博弈论+产业/劳动/发展经济学,设拔尖本博贯通","url":"https://econ.fudan.edu.cn/bkspy/zyjs.htm"}
  ],
  "education": [
    {"school":"哈佛大学教育学院 (Harvard GSE)","program":"教育学硕士 Ed.M.","year":2024,"tag":"top","note":"10个月,三支柱(项目+基础+方向),基础课学习科学/证据/公平/引领变革","url":"https://www.gse.harvard.edu/degrees/masters"},
    {"school":"北京师范大学教育学部","program":"教育学(本科)","year":2023,"tag":"strong","note":"宽口径招生大一通识后分流,教育学原理·中外教育史·教育研究方法","url":"https://fe.bnu.edu.cn/pc/cms1info/list/1/3"}
  ],
  "eecs": [
    {"school":"清华大学","tag":"top","program":"电子工程系 电子信息科学与技术专业本科培养方案","year":2023,"note":"电子科学与技术A+,基础理论+技术方法并重","url":"https://www.tsinghua.edu.cn/jxjywj/bkzy2023/zxzy/23.pdf"},
    {"school":"西安交通大学","tag":"strong","program":"电子科学与技术专业培养方案","year":2023,"note":"微电子+物理电子+电子材料合并,全国首批一级博士点","url":"https://esteie.xjtu.edu.cn/info/1029/3203.htm"},
    {"school":"东南大学","tag":"strong","program":"电子科学与工程学院 培养方案","year":2023,"note":"微电子/光电子强势,工科顶尖","url":"https://electronic.seu.edu.cn/11471/list.htm"}
  ],
  "electrical": [
    {"school":"麻省理工 MIT","program":"6-2 电气工程与计算机科学 (2024起改6-5)","year":2022,"tag":"top","note":"编程技能+离散数学6.1200+基础课,12个电气track选向","url":"https://www.eecs.mit.edu/academics/undergraduate-programs/curriculum/6-2-electrical-engineering-and-computer-science/"},
    {"school":"斯坦福大学 Stanford","program":"电气工程理学学士 (EE-BS)","year":2025,"tag":"top","note":"数理/计算基础+电子/信息/数字系统核心,选一子方向深耕","url":"https://bulletin.stanford.edu/programs/EE-BS"},
    {"school":"清华大学","program":"电气工程及其自动化 (本科)","year":2023,"tag":"strong","note":"电机学/电力系统/高电压/电力电子核心,强弱电结合","url":"https://www.tsinghua.edu.cn/jxjywj/bkzy2023/zxzy/22-1.pdf"},
    {"school":"UC Berkeley 加州伯克利","program":"EECS (BS, College of Engineering)","year":2024,"tag":"top","note":"CS61ABC+EE16AB 打底,上层 ≥20 单元 EECS 含 major design 实践","url":"https://eecs.berkeley.edu/academics/undergraduate/eecs-bs/"},
    {"school":"Stanford 斯坦福","program":"Electrical Engineering (BS)","year":2024,"tag":"top","note":"≥57 单元,工程基础+EE 核心 18 单元+硬件/信息/物理科学方向","url":"https://bulletin.stanford.edu/programs/EE-BS"},
    {"school":"MIT 麻省理工","program":"Electrical Engineering (6-5/6-1)","year":2024,"tag":"top","note":"电路/电磁/信号系统 foundation + 微电子/通信控制 header","url":"https://www.eecs.mit.edu/academics/undergraduate-programs/curriculum/"}
  ],
  "electrical-engineering": [
    {"school":"麻省理工 MIT","program":"6-2 电气工程与计算机科学 (2024起改6-5)","year":2022,"tag":"top","note":"编程技能+离散数学6.1200+基础课,12个电气track选向","url":"https://www.eecs.mit.edu/academics/undergraduate-programs/curriculum/6-2-electrical-engineering-and-computer-science/"},
    {"school":"斯坦福大学 Stanford","program":"电气工程理学学士 (EE-BS)","year":2025,"tag":"top","note":"数理/计算基础+电子/信息/数字系统核心,选一子方向深耕","url":"https://bulletin.stanford.edu/programs/EE-BS"},
    {"school":"清华大学","program":"电气工程及其自动化 (本科)","year":2023,"tag":"strong","note":"电机学/电力系统/高电压/电力电子核心,强弱电结合","url":"https://www.tsinghua.edu.cn/jxjywj/bkzy2023/zxzy/22-1.pdf"},
    {"school":"UC Berkeley 加州伯克利","program":"EECS (BS, College of Engineering)","year":2024,"tag":"top","note":"CS61ABC+EE16AB 打底,上层 ≥20 单元 EECS 含 major design 实践","url":"https://eecs.berkeley.edu/academics/undergraduate/eecs-bs/"},
    {"school":"Stanford 斯坦福","program":"Electrical Engineering (BS)","year":2024,"tag":"top","note":"≥57 单元,工程基础+EE 核心 18 单元+硬件/信息/物理科学方向","url":"https://bulletin.stanford.edu/programs/EE-BS"},
    {"school":"MIT 麻省理工","program":"Electrical Engineering (6-5/6-1)","year":2024,"tag":"top","note":"电路/电磁/信号系统 foundation + 微电子/通信控制 header","url":"https://www.eecs.mit.edu/academics/undergraduate-programs/curriculum/"}
  ],
  "electronic-engineering": [
    {"school":"UC Berkeley","tag":"top","program":"EECS B.S. 电子工程与计算机","year":2024,"note":"120学分,EECS16A/B+CS61系列打底,上分20学分含设计课","url":"https://eecs.berkeley.edu/resources/undergrads/eecs-2/degree-reqs-upperdiv-2/"},
    {"school":"Stanford University","tag":"top","program":"Electrical Engineering (MS)","year":2023,"note":"45学分,五大方向选深度12学分+广度9+技术15","url":"https://bulletin.stanford.edu/programs/EE-MS"}
  ],
  "engineering": [
    {"school":"Harvey Mudd College","tag":"strong","program":"General Engineering (B.S.)","year":2024,"note":"通用工程学位,工程科学+系统+设计实践三支,临床项目贯穿","url":"https://www.hmc.edu/engineering/curriculum/degree-requirements/"},
    {"school":"Olin College of Engineering","tag":"strong","program":"B.S. in Engineering","year":2024,"note":"项目制,软件/电子/机械打底+跨学科顶点项目","url":"https://www.olin.edu/academics/curriculum"}
  ],
  "environ-eng": [
    {"school":"斯坦福大学 Stanford","program":"环境系统工程理学学士 (ENVSE-BS)","year":2025,"tag":"top","note":"96学分,数理科学+可持续设计,四方向(海岸/能源/淡水/城市)","url":"https://bulletin.stanford.edu/programs/ENVSE-BS"},
    {"school":"同济大学","program":"环境工程 (本科)","year":2025,"tag":"strong","note":"国内环境顶尖,环境科学/环境工程/给排水全链条培养","url":"https://sese.tongji.edu.cn/"}
  ],
  "environmental-engineering": [
    {"school":"斯坦福大学 Stanford","program":"环境系统工程理学学士 (ENVSE-BS)","year":2025,"tag":"top","note":"96学分,数理科学+可持续设计,四方向(海岸/能源/淡水/城市)","url":"https://bulletin.stanford.edu/programs/ENVSE-BS"},
    {"school":"同济大学","program":"环境工程 (本科)","year":2025,"tag":"strong","note":"国内环境顶尖,环境科学/环境工程/给排水全链条培养","url":"https://sese.tongji.edu.cn/"}
  ],
  "environmental-science": [
    {"school":"加州大学伯克利分校 UC Berkeley","tag":"top","program":"Environmental Sciences 本科主修","year":2025,"note":"数学+生物+物理科学厚基础,大四全年导师制研究项目","url":"https://guide.berkeley.edu/undergraduate/degree-programs/environmental-sciences/"},
    {"school":"斯坦福大学 Stanford","tag":"strong","program":"Earth Systems Program 本科","year":2025,"note":"跨学科环境科学,自主调研人类活动与地球系统变化","url":"https://earthsystems.stanford.edu/academics-admissions/undergraduate-program"},
    {"school":"加州大学伯克利分校 UC Berkeley 工学院","tag":"solid","program":"Environmental Engineering Science","year":2025,"note":"工程视角:生化物理三选+进阶科学序列+地球科学","url":"https://engineering.berkeley.edu/students/undergraduate-guide/degree-requirements/major-programs/engineering-science/environmental-engineering-science/"}
  ],
  "environmental-studies": [
    {"school":"耶鲁大学","tag":"top","program":"Environmental Studies B.A./B.S.","year":2025,"note":"12-13学分,5核心(人文+社科+三类自然科学)+方向+毕业论文","url":"https://catalog.yale.edu/ycps/subjects-of-instruction/environmental-studies/"},
    {"school":"斯坦福大学","tag":"top","program":"Earth Systems (B.S.)","year":2024,"note":"跨学科环境科学,科学+经济+政策核心,六方向+270小时实习","url":"https://bulletin.stanford.edu/programs/EASYS-BS"}
  ],
  "ethnology": [
    {"school":"加州大学圣地亚哥分校 UCSD","tag":"top","program":"Anthropology (BA) — 社会文化/考古/生物三方向本科课程体系","year":2024,"note":"人类学三大分支+气候变化人类方向,横跨社科生科人文","url":"https://catalog.ucsd.edu/curric/ANTH-ug.html"},
    {"school":"中南民族大学","tag":"strong","program":"民族学专业本科培养方案 Undergraduate Program for Ethnology","note":"教育部A类学科+国家级一流专业,核心课民族学概论/中国民族志/田野调查","url":"https://www.scuec.edu.cn/__local/A/91/E6/E2DF286A636152324D903C36CA1_29231533_DD7BD.pdf"},
    {"school":"加州大学伯克利分校 UC Berkeley","tag":"solid","program":"Anthropology Undergraduate Program","note":"考古/生物/社会文化三基底,要求一门世界民族志区域课","url":"https://anthropology.berkeley.edu/undergraduate-program"}
  ],
  "film-tv": [
    {"school":"南加州大学电影艺术学院 (USC SCA)","tag":"top","program":"Film and Television Production, BFA","year":2024,"note":"128学分含64影艺学分,大二起写作/制片/剪辑短片序列","url":"https://catalogue.usc.edu/preview_program.php?catoid=8&poid=7336"},
    {"school":"纽约大学帝势艺术学院 (NYU Tisch)","tag":"top","program":"Film and Television, BFA","year":2024,"note":"Area I 影视54学分+通识44,理论史论制作四阶段","url":"https://bulletins.nyu.edu/undergraduate/arts/programs/film-television-bfa/film-television-bfa.pdf"}
  ],
  "finance": [
    {"school":"宾夕法尼亚大学沃顿商学院 (Wharton, UPenn)","program":"Finance, BS (本科金融)","year":2024,"tag":"top","note":"核心FNCE1000公司金融+FNCE1010货币银行,再修4门金融选修","url":"https://fnce.wharton.upenn.edu/programs/undergraduate/"},
    {"school":"MIT斯隆管理学院 (MIT Sloan)","program":"15-3 Finance (本科金融)","year":2024,"tag":"top","note":"7门进阶,至少2门金融核心,偏量化、衍生品与创业金融","url":"https://mitsloan.mit.edu/programs/undergraduate/15-3-finance-major-requirements"},
    {"school":"清华大学经济管理学院","program":"经济与金融(本科)","year":2023,"tag":"strong","note":"153学分,经济+金融整合,微宏观+公司金融+投资学","url":"https://www.tsinghua.edu.cn/jxjywj/bkzy2023/zxzy/47.pdf"},
    {"school":"北京大学光华管理学院","program":"金融学(本科)","year":2021,"tag":"strong","note":"143学分,设金融学/金融经济学方向,另有智金班交叉","url":"https://www.gsm.pku.edu.cn/undergraduate/fujian/jinrong.pdf"}
  ],
  "fine-arts": [
    {"school":"中央美术学院","tag":"top","program":"造型学院 油画专业(工作室制)","year":2025,"note":"基础部统训半年后入工作室,2.5年画室主修+毕业创作","url":"https://www.cafa.edu.cn/st/2025/80233119.htm"},
    {"school":"清华大学美术学院","tag":"top","program":"美术学院 本科培养方案","note":"官方培养方案PDF,造型与设计各系课程结构齐全","url":"https://www.tsinghua.edu.cn/jxjywj/bksjywj/62-77meiyuan.pdf"}
  ],
  "fishery": [
    {"school":"University of Washington","tag":"top","program":"Aquatic & Fishery Sciences BS","year":2023,"note":"水生态/资源管理/定量数据三方向选修各5学分","url":"https://fish.uw.edu/students/undergraduate-program/bachelor-of-science/major-requirements/"},
    {"school":"Oregon State University","tag":"strong","program":"Fisheries, Wildlife & Conservation Sciences BS","year":2023,"note":"核心通识+鱼类野生动物核心课+两段实习+专业方向","url":"https://fwcs.oregonstate.edu/fwcs/fisheries-wildlife-and-conservation-sciences-bs-corvallis"},
    {"school":"Penn State University","tag":"solid","program":"Wildlife and Fisheries Science BS (Fisheries option)","year":2023,"note":"渔业方向最低122学分,对接美国渔业学会认证","url":"https://bulletins.psu.edu/undergraduate/colleges/agricultural-sciences/wildlife-fisheries-science-bs/"}
  ],
  "food-eng": [
    {"school":"康奈尔大学","tag":"top","program":"Food Science BS","year":2026,"note":"食品化学/微生物/工程/感官四大核心,85-87学分","url":"https://courses.cornell.edu/programs/food-science-bs/"},
    {"school":"明尼苏达大学","tag":"strong","program":"Bioproducts & Biosystems Engineering — Food Engineering","year":2026,"note":"工程口径食品工程方向,四年培养计划清晰","url":"https://cse.umn.edu/college/four-year-plans/bioproducts-and-biosystems-engineering-food-engineering-four-year-plan"},
    {"school":"伊利诺伊大学厄巴纳-香槟分校","tag":"strong","program":"Food Science BS","year":2026,"note":"2026-2027课程目录,数理化生基础+食品工程加工","url":"https://catalog.illinois.edu/undergraduate/aces/food-science-bs/"}
  ],
  "foreign-lit": [
    {"school":"北京外国语大学英语学院","program":"英语专业(本科)","year":2024,"tag":"strong","note":"低年级听说读写,高年级口笔译+文学/文化/国政经/翻译/新闻五模块选修","url":"https://seis.bfsu.edu.cn/info/1076/5972.htm"},
    {"school":"北京大学外国语学院","program":"英语(语言文学,本科)","year":2023,"tag":"strong","note":"语言与文化并重,通才取向,跨文化+跨学科课程设置","url":"https://www.gotopku.cn/programa/college/321.html"}
  ],
  "forensic-med": [
    {"school":"University of Florida","tag":"strong","program":"MS Medical Sciences — Forensic Medicine","year":2026,"note":"在线法医学硕士,含法医病理/人类学/创伤分析/腐败学","url":"https://forensicmedicine.med.ufl.edu/program/master-of-science/"},
    {"school":"University of Maryland","tag":"strong","program":"MS in Forensic Medicine","year":2026,"note":"18个月全日制,尸检技术/毒理/放射/牙科/人类学全覆盖","url":"https://graduate.umaryland.edu/forensicmedicine/"},
    {"school":"Philadelphia College of Osteopathic Medicine","tag":"solid","program":"MS in Forensic Medicine","year":2025,"note":"一年面授(每月一周末)+一年在线+毕业设计","url":"https://www.pcom.edu/academics/programs-and-degrees/forensic-medicine/ms-forensic-medicine.html"}
  ],
  "forestry": [
    {"school":"Oregon State University","tag":"top","program":"Forestry BS/HBS","year":2023,"note":"SAF认证,180学分含6个月林业实习与方向课","url":"https://catalog.oregonstate.edu/college-departments/forestry/forest-engineering-resources-management/forestry-bs-hbs/"},
    {"school":"Iowa State University","tag":"strong","program":"Forestry BS","year":2023,"note":"森林生态管理/城市林业等多方向,1935年起SAF连续认证","url":"https://catalog.iastate.edu/collegeofagricultureandlifesciences/forestry/"},
    {"school":"University of Maine","tag":"solid","program":"Forestry (School of Forest Resources)","year":2022,"note":"120学分四年制,测量制图清查保护育林经济政策核心","url":"https://forest.umaine.edu/undergraduate-programs/forestry/"}
  ],
  "forestry-eng": [
    {"school":"俄勒冈州立大学","tag":"top","program":"Forest Engineering BS/HBS","year":2026,"note":"全美唯一同获ABET与SAF双认证,含道路设计、采运与水土","url":"https://catalog.oregonstate.edu/college-departments/forestry/forest-engineering-resources-management/forest-engineering-bs-hbs/"},
    {"school":"奥本大学","tag":"strong","program":"Biosystems Engineering — Forest Engineering Option","year":2026,"note":"生物系统工程下林业工程方向,工程基础+林业作业","url":"https://bulletin.auburn.edu/undergraduate/samuelginncollegeofengineering/departmentofbiosystemsengineering/forestengineering_major/"},
    {"school":"华盛顿大学","tag":"solid","program":"Forest Engineering","year":2024,"note":"工程科学与森林科学结合,侧重运输与测量","url":"http://depts.washington.edu/feweb/brochure.html"}
  ],
  "gender-studies": [
    {"school":"加州大学洛杉矶分校","tag":"top","program":"Gender Studies Major","year":2024,"note":"三门核心(权力/知识/身体)12学分+七门选修28学分","url":"https://gender.ucla.edu/undergraduate/major/"},
    {"school":"罗格斯大学","tag":"strong","program":"Women's, Gender, and Sexuality Studies Major","year":2024,"note":"12门三学分课共36学分,女性/性别/性向综合","url":"https://womens-studies.rutgers.edu/academics/undergraduate/major"},
    {"school":"西北大学","tag":"solid","program":"Gender & Sexuality Studies Major","year":2024,"note":"性别与性向研究主修,学位要求页清晰","url":"https://gendersexuality.northwestern.edu/undergraduate/degree-requirements/major.html"}
  ],
  "geo-resources": [
    {"school":"Missouri University of Science & Technology","tag":"top","program":"Geological Engineering BS","year":2025,"note":"125学分，6方向含地质勘查/岩土/物探/地下水/采矿/能源资源","url":"https://catalog.mst.edu/undergraduate/degreeprogramsandcourses/geologicalengineering/"},
    {"school":"University of Wisconsin–Madison","tag":"strong","program":"Geological Engineering BS","year":2026,"note":"126学分，土力学/岩石力学/应用物探/水文地质，5技术方向","url":"https://guide.wisc.edu/undergraduate/engineering/civil-environmental-engineering/geological-engineering-bs/"}
  ],
  "geography-sci": [
    {"school":"UC Berkeley","tag":"top","program":"Geography Major (B.A.)","year":2024,"note":"自然/人文地理并重,设方法与区域选修","url":"https://geography.berkeley.edu/academics/undergraduate-studies/major-and-minor-programs"},
    {"school":"Penn State University","tag":"strong","program":"Geography, B.S.","year":2024,"note":"BS/BA双轨,GIS与数据科学/人文/环境方向","url":"https://bulletins.psu.edu/undergraduate/colleges/earth-mineral-sciences/geography-bs/"},
    {"school":"University of Colorado Boulder","tag":"solid","program":"General Geography Major","year":2024,"note":"37-45学分,含上层课与GIS/遥感技术训练","url":"https://www.colorado.edu/geography/undergrad-program/undergraduate-curriculum/general-geography-major"}
  ],
  "geology": [
    {"school":"University of Texas at Austin","tag":"top","program":"BS Geological Sciences","year":2025,"note":"含野外训练,可选地质/地球物理等方向","url":"https://catalog.utexas.edu/undergraduate/geosciences/degrees-and-programs/bs-geological-sciences/"},
    {"school":"University of Illinois Urbana-Champaign","tag":"strong","program":"Geology, BS","year":2026,"note":"含地球物理/水文等分支,野外+实验技能","url":"https://catalog.illinois.edu/undergraduate/las/geology-bs/"},
    {"school":"University of Colorado Boulder","tag":"solid","program":"Geology, BA","year":2025,"note":"含野外课程要求,强调观测采样与解释技能","url":"https://catalog.colorado.edu/undergraduate/colleges-schools/arts-sciences/programs-study/geological-sciences/geology-bachelor-arts-ba/"}
  ],
  "geophysics": [
    {"school":"Colorado School of Mines","tag":"top","program":"BS Geophysics","year":2025,"note":"应用地球物理强校,数理+地质+传感工程并重","url":"https://catalog.mines.edu/undergraduate/programs/geophysics/"},
    {"school":"University of Texas at Austin (Jackson School)","tag":"top","program":"BS Geophysics","year":2025,"note":"前两年同地质,后两年数理迁移到理论与应用地球物理","url":"https://www.jsg.utexas.edu/academics/undergraduate/degrees-offered/bs-in-geophysics/"},
    {"school":"Texas A&M University","tag":"strong","program":"BS Geophysics","year":2025,"note":"地质地球物理系,技术课需GPA2.0门槛","url":"https://catalog.tamu.edu/undergraduate/arts-and-sciences/geology-geophysics/geophysics-bs/"}
  ],
  "grassland": [
    {"school":"University of Wyoming","tag":"top","program":"Rangeland Ecology & Watershed Management BS","year":2023,"note":"全美最大SRM认证草地项目,草地生态与流域管理并重","url":"https://www.uwyo.edu/uw/degree-programs/rangeland-ecology-bachelors.html"},
    {"school":"University of Nebraska–Lincoln","tag":"strong","program":"Grassland Systems","year":2023,"note":"草地研究中心设草地生态管理/放牧家畜系统两方向","url":"https://catalog.unl.edu/undergraduate/agricultural-sciences-natural-resources/grassland-systems/"},
    {"school":"South Dakota State University","tag":"solid","program":"Ecology & Environmental Science BS – Rangeland Ecology & Management","year":2023,"note":"SRM认证,聚焦草地可持续管理(全美仅14个认证项目之一)","url":"https://www.sdstate.edu/programs/undergraduate/ecology-environmental-science-bs-rangeland-ecology-management-specialization"}
  ],
  "hist-sci-tech": [
    {"school":"Harvard University","tag":"top","program":"History of Science PhD","year":2025,"note":"三领域口试,跨系培养历史研究与教学","url":"https://histsci.fas.harvard.edu/academics/graduate-program/phd-req"},
    {"school":"Johns Hopkins University","tag":"top","program":"History of Science and Technology PhD","year":2025,"note":"五年制,文艺复兴至20世纪通史+两门外语","url":"https://host.jhu.edu/graduate/requirements/"},
    {"school":"University of Pennsylvania","tag":"strong","program":"History and Sociology of Science PhD","year":2025,"note":"方法论研讨+18学分,三子领域口试","url":"https://hss.sas.upenn.edu/graduate/degree-programs/phd"}
  ],
  "history": [
    {"school":"牛津大学 (University of Oxford)","program":"History 历史学 BA","year":2024,"tag":"top","note":"一年级英国史+欧洲与世界史+史学方法+专题,三年级独立论文","url":"https://www.ox.ac.uk/admissions/undergraduate/courses/course-listing/history"}
  ],
  "horticulture": [
    {"school":"康奈尔大学","tag":"top","program":"园艺学(SIPS)学位与项目","year":2024,"note":"三大核心:园艺生物/生产管理/方法,本研贯通","url":"https://cals.cornell.edu/school-integrative-plant-science/school-sections/horticulture-section/degrees-and-programs-horticulture"},
    {"school":"瓦赫宁根大学","tag":"strong","program":"MSc Plant Sciences 植物科学","year":2024,"note":"120ECTS,作物育种/IPM等多方向+研究论文","url":"https://www.wur.nl/en/education-programmes/master/msc-programmes/msc-plant-sciences/programme-of-plant-sciences.htm"},
    {"school":"中国农业大学","tag":"solid","program":"园艺专业本科人才培养方案","year":2017,"note":"栽培+育种+设施+采后,全产业链复合培养","url":"https://yyxy.cau.edu.cn/art/2017/10/25/art_3245_557497.html"}
  ],
  "human-geography": [
    {"school":"英属哥伦比亚大学","tag":"top","program":"BA Major in Human Geography","year":2024,"note":"三主题:文化与地方/城市与全球化/自然与社会+研究方法6学分","url":"https://geog.ubc.ca/undergraduate/ba-human-geography/major/"},
    {"school":"伦敦大学学院 (UCL)","tag":"top","program":"Geography BA (人文地理)","year":2026,"note":"聚焦迁移/性别/城市/后殖民,三年含方法训练与毕业论文+田野","url":"https://www.ucl.ac.uk/prospective-students/undergraduate/degrees/geography-ba-2026"}
  ],
  "human-kinetics": [
    {"school":"密歇根大学","tag":"top","program":"School of Kinesiology — Movement Science / Applied Exercise Science","year":2025,"note":"生物力学+运动生理为核心,含实验研究与实习","url":"https://www.kines.umich.edu/academics/movement-science/undergraduate"},
    {"school":"英属哥伦比亚大学","tag":"strong","program":"Bachelor of Kinesiology (BKIN)","year":2024,"note":"三方向(神经力学/社会行为/多学科),39低+36高阶学分","url":"https://vancouver.calendar.ubc.ca/faculties-colleges-and-schools/school-kinesiology/bachelor-kinesiology/degree-requirements"}
  ],
  "hydraulic": [
    {"school":"Texas A&M University","tag":"top","program":"Civil Engineering BS — Water Resources Engineering Track","year":2026,"note":"35学时技术课分5类，含明渠水力学、地下水水文、泥沙输运","url":"https://catalog.tamu.edu/undergraduate/engineering/civil-environmental/bs-water-resources-engineering-track/"},
    {"school":"McGill University","tag":"strong","program":"Civil Engineering — Hydraulic & Water Resources 方向","year":2026,"note":"明渠流/地下水/计算水力学/水工结构/河流工程成体系选课","url":"https://www.mcgill.ca/civil/undergrad/areas/water"}
  ],
  "ic": [
    {"school":"清华大学","program":"微电子科学与工程(集成电路学院)","year":2023,"tag":"top","note":"170 学分,CMOS 工艺+数字/模拟 IC 设计+器件实验","url":"https://www.sic.tsinghua.edu.cn/rcpy/bkspy/kcsz.htm"},
    {"school":"复旦大学","program":"集成电路设计与集成系统(集成电路与微纳电子创新学院)","year":2023,"tag":"strong","note":"微电子强校,器件物理+数字/模拟/射频 IC 设计+EDA","url":"https://icmne.fudan.edu.cn/"},
    {"school":"电子科技大学","program":"集成电路设计与集成系统(国家示范性微电子学院)","year":2023,"tag":"strong","note":"半导体器件+模拟/数字 IC+版图设计,产教融合","url":"https://zs.uestc.edu.cn/view/934.html"}
  ],
  "ict": [
    {"school":"北京邮电大学","program":"通信工程(信息与通信工程学院)","year":2023,"tag":"strong","note":"大通信观,通信原理+信号处理+网络,融合智能计算与数据科学","url":"https://sice.bupt.edu.cn/info/1039/1463.htm"},
    {"school":"电子科技大学","program":"通信工程(信息与通信工程学院)","year":2023,"tag":"strong","note":"国家一流专业,信号与系统+通信原理+信息传输/交换/组网","url":"https://zs.uestc.edu.cn/view/131.html"}
  ],
  "industrial-engineering": [
    {"school":"佐治亚理工 Georgia Tech","program":"工业工程理学学士 (BSIE)","year":2025,"tag":"top","note":"全球工业工程第一,运筹/数据科学/供应链多方向concentration","url":"https://catalog.gatech.edu/programs/industrial-engineering-bs/"},
    {"school":"清华大学","program":"工业工程 (本科)","year":2024,"tag":"strong","note":"160学分,系统思维+运筹+人因,工程与管理复合型","url":"https://www.tsinghua.edu.cn/jxjywj/bksjywj/17-gongyegongcheng.pdf"}
  ],
  "info-resource-mgmt": [
    {"school":"浙江大学","tag":"top","program":"信息资源管理本科专业","year":2016,"note":"必修信息组织/检索/大数据分析/数字治理/电子政务","url":"https://zdzsc.zju.edu.cn/2016/1025/c3467a210701/page.htm"},
    {"school":"华东师范大学","tag":"strong","program":"信息资源管理一级学科硕士培养方案(2025级)","year":2025,"note":"数据智能特色,融合图情档与深度学习/大模型","url":"https://sem.ecnu.edu.cn/c9/3d/c43579a706877/page.htm"},
    {"school":"中山大学","tag":"strong","program":"信息管理学院 交叉学科信息资源管理人才培养","year":2023,"note":"管理学+数据科学+AI交叉,iSchool路线","url":"https://ischool.sysu.edu.cn/zh-hans/article/536"}
  ],
  "information-theory": [
    {"school":"MIT","tag":"top","program":"6.441 Information Theory (EECS 研究生)","year":2016,"note":"熵/无损压缩/假设检验/率失真/多用户,Cover&Thomas 教材","url":"https://ocw.mit.edu/courses/6-441-information-theory-spring-2016/pages/syllabus/"},
    {"school":"Stanford University","tag":"top","program":"EE376A/EE276 Information Theory","year":2019,"note":"前三分之二讲核心,后段接统计与机器学习应用","url":"https://web.stanford.edu/class/ee376a/outline.html"}
  ],
  "instrument": [
    {"school":"清华大学","tag":"top","program":"精密仪器系 测控技术与仪器专业本科培养方案","year":2022,"note":"光机电测控交叉,含国家级一流课程","url":"https://www.tsinghua.edu.cn/jxjywj/bksjywj/14-cekong.pdf"},
    {"school":"天津大学","tag":"top","program":"精仪学院 测控技术与仪器专业","year":2023,"note":"学科评估A+,传感+精密检测+工程光学主线","url":"https://jyxy.tju.edu.cn/cn/bksjx/20100906/23.shtml"}
  ],
  "integrated-med": [
    {"school":"北京中医药大学","tag":"top","program":"中西医结合类本科人才培养","note":"中西医学双轨,领军计划设中西医结合方向模块","url":"https://zyyjy.bucm.edu.cn/zcwj/56479.htm"},
    {"school":"南京中医药大学","tag":"strong","program":"中西医临床医学(五年制)","note":"中西医并重,西医临床+中医经典(伤寒/金匮/温病)全覆盖","url":"https://zs.njucm.edu.cn/4157/list.htm"}
  ],
  "intelligent-sci": [
    {"school":"CMU 卡内基梅隆","program":"B.S. in Artificial Intelligence (BSAI)","year":2024,"tag":"top","note":"全美首个 AI 本科,数学统计+ML+符号计算+三门 AI 核心+伦理","url":"https://www.cs.cmu.edu/bs-in-artificial-intelligence/curriculum"},
    {"school":"清华大学","program":"计算机科学与技术(人工智能班/智班)","year":2022,"tag":"top","note":"姚期智领衔,数学+机器学习+理论,科研导向 AI 拔尖","url":"https://www.tsinghua.edu.cn/jxjywj/bkzy2022/zxzy/29-3.pdf"},
    {"school":"南京大学","program":"人工智能(人工智能学院)","year":2019,"tag":"strong","note":"国内首个完整 AI 本科体系,机器学习导论+知识表示+模式识别+NLP","url":"https://ai.nju.edu.cn/"}
  ],
  "international-relations": [
    {"school":"普林斯顿大学公共与国际事务学院 (SPIA)","program":"公共与国际事务本科主修","year":2024,"tag":"top","note":"公共政策导论+伦理+权力与认同+统计,大三研究设计+大四政策论文","url":"https://spia.princeton.edu/undergraduate-program/curriculum-requirements"},
    {"school":"复旦大学国际关系与公共事务学院","program":"国际政治(本科)","year":2022,"tag":"strong","note":"政治学原理·国际关系史·西方国关理论·国际政治经济学·美国外交","url":"https://sirpa.fudan.edu.cn/35080/list.htm"}
  ],
  "joint-ops": [
    {"school":"U.S. Naval War College","tag":"top","program":"Joint Military Operations (College of Naval Command & Staff core curriculum)","note":"战区/战役层级联合作战与作战计划核心课，含Capstone综合演练","url":"https://usnwc.edu/college-of-naval-command-and-staff/Core-Curriculum/Joint-Military-Operations"},
    {"school":"Joint Forces Staff College (NDU)","tag":"strong","program":"Joint and Combined Warfighting School (JCWS), JPME-II","note":"10周联合/联军作战指挥认证课，年约800人毕业","url":"https://jfsc.ndu.edu/Academics/Joint-and-Combined-Warfighting-School-JCWS/Program-Description/"},
    {"school":"U.S. Army Command & General Staff College","tag":"solid","program":"CGSOC 联合作战聚焦方向 (Focused Program: Joint Operations)","note":"44周课程含联合/太空/特种作战聚焦方向","url":"https://usacac.army.mil/organizations/cace/cgsc/courses"}
  ],
  "journalism": [
    {"school":"中国人民大学新闻学院","program":"新闻传播学类(本科)","year":2023,"tag":"strong","note":"5专业打通,主干课中外新闻传播史·新闻理论·新闻采访与写作·评论","url":"http://jcr.ruc.edu.cn/zw/jxpy/bks1/pyfa/index.htm"},
    {"school":"复旦大学新闻学院","program":"新闻传播学类\"2+X\"(本科)","year":2022,"tag":"strong","note":"2年大类+X专业方向,卓越新闻传播,新闻学/广电/广告/传播学4专业","url":"https://xwxy.fudan.edu.cn/fe/7c/c41181a523900/page.htm"}
  ],
  "journalism-media": [
    {"school":"哥伦比亚大学新闻学院","tag":"top","program":"Master of Science (M.S.) in Journalism","year":2025,"note":"报道模块+写作+调查技巧+春季研讨与硕士项目,核心+选修","url":"https://journalism.columbia.edu/ms-degree"},
    {"school":"哥伦比亚大学新闻学院","tag":"strong","program":"M.S. Data Journalism","year":2025,"note":"数据与计算新闻方向,公共记录/数据驱动报道训练","url":"https://journalism.columbia.edu/ms-data-journalism"}
  ],
  "languages-and-literature": [
    {"school":"Princeton University","tag":"top","program":"Comparative Literature Major","year":2022,"note":"9门:含初级研讨+4门非英语语言文学系阅读课","url":"https://complit.princeton.edu/undergraduate-program/current-majors/requirements"},
    {"school":"Yale University","tag":"top","program":"Comparative Literature (Literature Major)","year":2022,"note":"强调多语种文学传统与比较方法论","url":"https://catalog.yale.edu/ycps/subjects-of-instruction/literature/"},
    {"school":"University of Chicago","tag":"strong","program":"Comparative Literature BA","year":2022,"note":"外语第二年水平+毕业论文工作坊CMLT 29801","url":"http://collegecatalog.uchicago.edu/thecollege/comparativeliterature/"}
  ],
  "law": [
    {"school":"哈佛大学法学院 (Harvard Law School)","program":"J.D. 法律博士项目","year":2024,"tag":"top","note":"1L必修宪法·合同·侵权·民诉·刑法·财产·立法与规制+1月实训学期","url":"https://hls.harvard.edu/academics/curriculum/"},
    {"school":"耶鲁大学法学院 (Yale Law School)","program":"J.D. 法律博士项目","year":2024,"tag":"top","note":"首学期4门宪法/合同/程序/侵权与规制+法律分析写作,小组credit/fail","url":"https://bulletin.yale.edu/bulletins/law/academic-requirements-and-options"},
    {"school":"北京大学法学院","program":"法学(本科)","year":2023,"tag":"strong","note":"厚基础宽口径,本科不分专业方向,研究生阶段再定专业领域","url":"https://www.law.pku.edu.cn/"}
  ],
  "library-information-science": [
    {"school":"伊利诺伊大学厄巴纳-香槟 iSchool","tag":"top","program":"MS in Library and Information Science","year":2026,"note":"40学分,核心IS505信息组织+IS510图书馆与社会,其余按职业路径定制","url":"https://ischool.illinois.edu/academics/graduate/ms-library-and-information-science"},
    {"school":"华盛顿大学 iSchool","tag":"top","program":"Master of Library and Information Science (MLIS)","year":2025,"note":"63季度学分=核心课+选修+毕业作品集(LIS599)","url":"https://ischool.uw.edu/programs/mlis/curriculum"}
  ],
  "light-industry": [
    {"school":"NC State University","tag":"top","program":"Paper Science and Engineering, BS","year":2024,"note":"制浆造纸全流程,就业率近100%","url":"https://catalog.ncsu.edu/undergraduate/natural-resources/forest-biomaterials/paper-science-engineering-bs/"},
    {"school":"Western Michigan University","tag":"strong","program":"Paper Engineering, BS","year":2024,"note":"可叠加印刷与造纸科学硕士本硕连读","url":"https://wmich.edu/chemical-paper/paper-engineering"}
  ],
  "linguistics": [
    {"school":"麻省理工学院 (MIT)","program":"Linguistics 语言学本科主修","year":2024,"tag":"top","note":"核心24.900语言学导论,语言学/哲学双轨,句法语音语义+三门限选","url":"https://linguistics.mit.edu/undergraduate/"}
  ],
  "logic": [
    {"school":"卡内基梅隆大学 CMU","tag":"top","program":"Logic and Computation 本科主修(哲学系)","year":2025,"note":"7核心课+4进阶选修,形式系统/可计算性,大四毕业论文","url":"https://www.cmu.edu/dietrich/philosophy/undergraduate/logic-and-computation/index.html"},
    {"school":"卡内基梅隆大学 CMU","tag":"strong","program":"Department of Philosophy 课程目录","year":2025,"note":"逻辑/计算/方法论完整课号与样例课表","url":"http://coursecatalog.web.cmu.edu/schools-colleges/dietrichcollegeofhumanitiesandsocialsciences/departmentofphilosophy/"}
  ],
  "management": [
    {"school":"斯坦福商学院 (Stanford GSB)","program":"MBA (通用管理)","year":2024,"tag":"top","note":"分析/领导/管理三大基石,通用管理+决策能力","url":"https://www.gsb.stanford.edu/programs/mba/academic-experience/curriculum"},
    {"school":"中国人民大学商学院","program":"工商管理(本科)","year":2024,"tag":"strong","note":"管理学+经济学基础,战略/营销/财务/组织行为核心","url":"https://www.rmbs.ruc.edu.cn/jxxm/bk/bkzyjs/gsglzy/index.htm"}
  ],
  "marketing": [
    {"school":"西北大学凯洛格商学院 (Northwestern Kellogg)","program":"Marketing Major (MBA营销)","year":2024,"tag":"top","note":"营销分析+消费者行为+营销战略,4学分,全球营销标杆","url":"https://www.kellogg.northwestern.edu/programs/full-time-mba/academics/majors-pathways/marketing-major/"},
    {"school":"宾夕法尼亚大学沃顿商学院 (Wharton, UPenn)","program":"Marketing Concentration (本科营销)","year":2024,"tag":"strong","note":"MKTG1010起,消费者行为2110+营销选修,含半学期mini课","url":"https://marketing.wharton.upenn.edu/programs/undergraduate/marketing-concentration/"},
    {"school":"北京大学光华管理学院","program":"市场营销(本科)","year":2021,"tag":"strong","note":"143学分管理学学士,设市场营销、数据科学方向","url":"https://www.gsm.pku.edu.cn/undergraduate/fujian/shichangyingxiao.pdf"}
  ],
  "marxism": [
    {"school":"清华大学","tag":"top","program":"马克思主义理论专业本科培养方案(日新书院)","year":2023,"note":"国内少有的马理论本科方案,经典原著+学科基础+实践环节","url":"https://www.tsinghua.edu.cn/jxjywj/bkzy2023/zxzy/64.pdf"},
    {"school":"中国科学技术大学","tag":"strong","program":"马克思主义理论一级学科硕士学位授权点培养方案","note":"总学分≥35,公共必修7+学科基础8+专业基础8,环节完整","url":"http://gradschool.ustc.edu.cn/static/upload/article/ueditor/8efed0b357b74ea3bd65c480040acbb5.pdf"},
    {"school":"华东师范大学","tag":"solid","program":"马克思主义理论一级学科博士研究生培养方案","note":"博士层级课程与培养环节齐备,可看高阶专业课设置","url":"https://mks.ecnu.edu.cn/68/07/c33971a419847/page.htm"}
  ],
  "materials": [
    {"school":"哈尔滨工业大学","program":"材料科学与工程 (本科)","year":2023,"tag":"strong","note":"材料科学基础+热力学+力学/物理性能+现代测试方法","url":"http://mse.hit.edu.cn/2023/0506/c16854a305620/page.htm"},
    {"school":"麻省理工 MIT","program":"材料科学与工程 (Course 3)","year":2025,"tag":"top","note":"加工-组织-性能主线+陶瓷/电子/金属/高分子限选+capstone","url":"https://catalog.mit.edu/degree-charts/materials-science-engineering-course-3/"}
  ],
  "materials-engineering": [
    {"school":"哈尔滨工业大学","program":"材料科学与工程 (本科)","year":2023,"tag":"strong","note":"材料科学基础+热力学+力学/物理性能+现代测试方法","url":"http://mse.hit.edu.cn/2023/0506/c16854a305620/page.htm"},
    {"school":"麻省理工 MIT","program":"材料科学与工程 (Course 3)","year":2025,"tag":"top","note":"加工-组织-性能主线+陶瓷/电子/金属/高分子限选+capstone","url":"https://catalog.mit.edu/degree-charts/materials-science-engineering-course-3/"}
  ],
  "materials-science": [
    {"school":"麻省理工学院 MIT","tag":"top","program":"Materials Science & Engineering (Course 3) 学位图","year":2025,"note":"加工-微结构-性能-表现主线+3.042顶点实验室","url":"https://catalog.mit.edu/degree-charts/materials-science-engineering-course-3/"},
    {"school":"麻省理工学院 MIT DMSE","tag":"top","program":"本科培养方案(含3-A自选/3-C考古方向)","year":2025,"note":"核心课+限选(生物/陶瓷/电子/金属/高分子)五大材料类","url":"https://dmse.mit.edu/education/undergraduate-program/"}
  ],
  "math": [
    {"school":"MIT(麻省理工)","program":"数学 Mathematics (Course 18)","year":2026,"tag":"top","note":"纯/通用/应用/数学+CS四方向,实分析与代数为核,含CI-M写作要求","url":"https://catalog.mit.edu/degree-charts/mathematics-course-18/"},
    {"school":"剑桥大学 Cambridge","program":"数学荣誉学位 Mathematical Tripos","year":2025,"tag":"top","note":"IA/IB/II/III四年制,一年级代数分析概率必修,后期自由选课+CATAM计算项目","url":"https://www.maths.cam.ac.uk/undergrad/course"},
    {"school":"清华大学","program":"数学与应用数学(本科)","year":2023,"tag":"strong","note":"数学分析三学期+高等线性代数+复分析/常微分/抽象代数/测度积分,五方向择一","url":"https://www.tsinghua.edu.cn/jxjywj/bkzy2023/zxzy/36-1.pdf"},
    {"school":"北京大学","program":"数学与应用数学(本科)","year":2024,"tag":"strong","note":"四高(数分/高代/几何/抽代)打底,设基础/应用/概率统计/计算/信息5方向","url":"https://www.math.pku.edu.cn/docs/2024-09/20240911094227791049.pdf"}
  ],
  "mechanical": [
    {"school":"清华大学","program":"机械工程 (本科)","year":2023,"tag":"strong","note":"智能制造与装备大类核心,力学+机械设计+制造,厚基础宽口径","url":"https://www.tsinghua.edu.cn/jxjywj/bkzy2023/zxzy/13-1.pdf"},
    {"school":"麻省理工 MIT","program":"机械工程 (Course 2)","year":2025,"tag":"top","note":"2.001-2.008 力学/动力学/热流体两两成套,2.007设计制造竞赛","url":"https://catalog.mit.edu/degree-charts/mechanical-engineering-course-2/"},
    {"school":"苏黎世联邦理工 ETH Zurich","program":"机械工程学士 (D-MAVT)","year":2025,"tag":"top","note":"数理基础+考试块A/B,Focus Project两学期组队造产品","url":"https://mavt.ethz.ch/studies/bachelor.html"}
  ],
  "mechanical-engineering": [
    {"school":"清华大学","program":"机械工程 (本科)","year":2023,"tag":"strong","note":"智能制造与装备大类核心,力学+机械设计+制造,厚基础宽口径","url":"https://www.tsinghua.edu.cn/jxjywj/bkzy2023/zxzy/13-1.pdf"},
    {"school":"麻省理工 MIT","program":"机械工程 (Course 2)","year":2025,"tag":"top","note":"2.001-2.008 力学/动力学/热流体两两成套,2.007设计制造竞赛","url":"https://catalog.mit.edu/degree-charts/mechanical-engineering-course-2/"},
    {"school":"苏黎世联邦理工 ETH Zurich","program":"机械工程学士 (D-MAVT)","year":2025,"tag":"top","note":"数理基础+考试块A/B,Focus Project两学期组队造产品","url":"https://mavt.ethz.ch/studies/bachelor.html"}
  ],
  "mechanics": [
    {"school":"University of Illinois Urbana-Champaign","tag":"top","program":"Theoretical and Applied Mechanics PhD","year":2026,"note":"经典TAM项目,32学分固体/流体/应用数学核心","url":"https://catalog.illinois.edu/graduate/engineering/theoretical-applied-mechanics-phd/"},
    {"school":"California Institute of Technology","tag":"top","program":"Graduate Degree in Applied Mechanics","year":2025,"note":"MCE系应用力学,固体/流体/计算力学并重","url":"https://mce.caltech.edu/academics/grad/graduate-degree-in-applied-mechanics"},
    {"school":"Northwestern University","tag":"strong","program":"Theoretical and Applied Mechanics MS/PhD","year":2025,"note":"跨工程力学项目,力学+应用数学宽口径","url":"https://www.mccormick.northwestern.edu/theoretical-applied-mechanics/masters-phd-degree/"}
  ],
  "medicine": [
    {"school":"哈佛医学院 Harvard Medical School","program":"Pathways MD 项目","year":2024,"tag":"top","note":"术前基础+器官系统模块,早临床纵向,PCE临床年+末段学术项目三段式","url":"https://hms.harvard.edu/education-admissions/md-program/curriculum/pathways"},
    {"school":"约翰霍普金斯医学院 Johns Hopkins SOM","program":"Genes to Society MD","year":2024,"tag":"top","note":"基因到社会框架,15个月器官系统整合主课+横向贯穿临床/社会主题","url":"https://www.hopkinsmedicine.org/som/curriculum/genes-to-society/curriculum"},
    {"school":"北京协和医学院","program":"临床医学(八年制)","year":2023,"tag":"top","note":"八年一贯本硕博融通,前2.5年清华预科,后续基础+临床+科研训练","url":"https://www.cams.cn/yxbd/cd0366454af74e2d9cca0c9d11fde479.htm"},
    {"school":"北京大学医学部","program":"临床医学(八年制)","year":2023,"tag":"strong","note":"八年一贯融通培养,器官系统整合,基础与临床融合的新课程体系","url":"https://jiaoyuchu.bjmu.edu.cn/zsjy/zsgz/zyjs/183004.htm"},
    {"school":"牛津大学 University of Oxford","program":"Medicine (BM BCh, A100)","year":2024,"tag":"top","note":"3年临床前(医学科学BA+科研项目)+3年临床,生理药理/生化遗传/群体健康","url":"https://www.medsci.ox.ac.uk/study/medicine/pre-clinical/structure"}
  ],
  "metallurgy": [
    {"school":"北京科技大学","tag":"top","program":"冶金工程(低碳智慧冶金和战略金属提取)","year":2023,"note":"软科世界第一/A+,绿色制造+智能制造方向","url":"https://zhaosheng.ustb.edu.cn/xkzy/zyjs/yjgc_zyjs/a6a387076cb342d48d253e83cdce4ab6.htm"},
    {"school":"中南大学","tag":"strong","program":"冶金工程[2023]培养方案","year":2023,"note":"有色金属冶金特色,卓越人才培养","url":"https://smse.csu.edu.cn/info/1059/5180.htm"}
  ],
  "mgmt-sci": [
    {"school":"斯坦福大学 (Stanford)","program":"Management Science & Engineering (本科)","year":2024,"tag":"top","note":"运筹+优化+概率统计+组织科学,毕业做capstone项目","url":"https://msande.stanford.edu/academics-admissions/undergraduate/undergraduate-major"},
    {"school":"清华大学工业工程系","program":"工业工程(本科)","year":2023,"tag":"strong","note":"160学分,系统思维+运筹学,工程与管理复合培养","url":"https://www.tsinghua.edu.cn/jxjywj/bkzy2023/zxzy/17.pdf"}
  ],
  "mil-equipment": [
    {"school":"Naval Postgraduate School (NPS)","tag":"top","program":"MS in Defense Program Management (Curriculum 816)","year":2024,"note":"覆盖装备全寿命:需求-研发-采购-系统工程-试验-综合保障","url":"https://nps.edu/web/dafm/curriculum-816"},
    {"school":"Air Force Institute of Technology (AFIT)","tag":"strong","program":"MS in Acquisition and Program Management (GAQ)","year":2024,"note":"采办管理核心+研究方法+方向课+学位论文,聚焦装备项目管理","url":"https://www.afit.edu/EN/programs.cfm?a=view&D=70"},
    {"school":"Naval Postgraduate School (NPS)","tag":"solid","program":"MS in Defense Contract Management (Curriculum 815)","year":2024,"note":"装备合同/采购管理,面向系统采购与合同管理岗位","url":"https://nps.edu/web/dafm/curriculum-815"}
  ],
  "mil-logistics": [
    {"school":"Air Force Institute of Technology (AFIT)","tag":"strong","program":"Graduate School of Engineering & Management — Logistics & Supply Chain Management programs","year":2024,"note":"美空军后勤教育主阵地,军事供应链与综合后勤保障课程体系","url":"https://www.afit.edu/EN/"},
    {"school":"U.S. Army War College","tag":"strong","program":"Master of Strategic Studies(含战略后勤模块)","year":2024,"note":"高级军官战略层课程,后勤与资源保障贯穿战略研究","url":"https://www.armywarcollege.edu/"},
    {"school":"Liberty University","tag":"solid","program":"M.A. in Military Operations — Supply Chain Logistics & Geography","year":2024,"note":"把军事条令与商科物流地理结合,面向后勤与国防承包","url":"https://www.liberty.edu/online/arts-and-sciences/masters/military-operations/supply-chain-logistics-and-geography/"}
  ],
  "mil-mgmt": [
    {"school":"Naval Postgraduate School (NPS)","tag":"top","program":"Graduate School of Defense Management — Defense Management 学位群","year":2024,"note":"美军国防管理教育主体,项目/财务/人力/合同多方向可定制","url":"https://nps.edu/web/gsdm/defense-management"},
    {"school":"Naval Postgraduate School (NPS)","tag":"strong","program":"MS in Defense Financial Management (Curriculum 837)","year":2024,"note":"预算/成本分析/内控/审计与PPBES战略资源管理","url":"https://nps.edu/web/ddm/curriculum-837"},
    {"school":"Naval Postgraduate School (NPS)","tag":"solid","program":"MS in Manpower Systems Analysis (Curriculum 847)","year":2024,"note":"军队人力/人员/薪酬/留用建模与训练教育政策管理","url":"https://nps.edu/web/ddm/curriculum-847"}
  ],
  "mil-training": [
    {"school":"Uniformed Services University (USU)","tag":"strong","program":"Military Readiness Training Program(军事专属课程700+学时)","year":2024,"note":"四类战备训练:临床/作战/体能/心理,军事专属训练课程","url":"https://www.usuhs.edu/military-readiness/military-specific-curriculum/operational-courses"},
    {"school":"Naval Postgraduate School (NPS)","tag":"solid","program":"Manpower Systems Analysis (Curriculum 847) — 训练与教育政策模块","year":2024,"note":"训练效果度量/人力训练模型/教育政策制定的量化分析","url":"https://nps.edu/web/ddm/curriculum-847"},
    {"school":"University of Scranton (Army ROTC)","tag":"solid","program":"Military Science 训练与课程体系","year":2024,"note":"本科军事训练课程:领导力实验、体能训练与野外训练","url":"https://www.scranton.edu/academics/cas/military-science/military-science-courses.shtml"}
  ],
  "military-thought": [
    {"school":"U.S. Army War College","tag":"top","program":"Master of Strategic Studies (MEL 1)","year":2025,"note":"核心课含战争理论/战略领导/战区战略,理论+历史驱动","url":"https://www.armywarcollege.edu/programs/mel_1.cfm"},
    {"school":"U.S. Naval War College","tag":"strong","program":"Strategy & Policy core curriculum","year":2025,"note":"战略思想家著作+重大战史案例,搭建政策/战略/作战分析框架","url":"https://usnwc.edu/college-of-naval-warfare/Core-Curriculum/strategy-and-policy"}
  ],
  "mining": [
    {"school":"Colorado School of Mines","tag":"top","program":"Mining Engineering BS (MNGN)","year":2025,"note":"露天/地下采矿设计、岩石力学、选矿、通风、矿业经济成套","url":"https://catalog.mines.edu/coursesaz/miningeng/"},
    {"school":"Pennsylvania State University","tag":"strong","program":"Mining Engineering BS","year":2026,"note":"131学分ABET认证，University Park 采矿工程标准培养方案","url":"https://bulletins.psu.edu/undergraduate/colleges/earth-mineral-sciences/mining-engineering-bs/"}
  ],
  "music": [
    {"school":"茱莉亚学院 (The Juilliard School)","tag":"top","program":"Music, Bachelor of Music (作曲方向)","year":2025,"note":"四年制专业表演/作曲+乐理乐史+通识,顶尖应用型训练","url":"https://catalog.juilliard.edu/preview_program.php?catoid=43&poid=4095"},
    {"school":"中央音乐学院","tag":"top","program":"作曲与作曲技术理论(国家级一流专业)","year":2024,"note":"和声/曲式/复调/配器/电子音乐,中外兼学一体化培养","url":"https://www.ccom.edu.cn/jgk/jxdw/zqx.htm"},
    {"school":"上海音乐学院","tag":"strong","program":"音乐学系 本科(五年制)","year":2025,"note":"中西音乐史+传统音乐理论为主干,含民族音乐学等","url":"https://www.shcmusic.edu.cn/2025/0619/c1607a58303/page.htm"}
  ],
  "nano": [
    {"school":"UC San Diego","tag":"top","program":"MS NanoEngineering(Chemical & Nano Eng.)","year":2025,"note":"三方向:生物医学/分子纳米材料/能源环境,论文或考试两轨","url":"https://cne.ucsd.edu/graduate-programs/degree/nanoengineering/masters"},
    {"school":"University of Pennsylvania","tag":"strong","program":"MSE in Nanotechnology","year":2025,"note":"10门课分A/B/C三类,洁净室实操+跨工程学科,Singh中心","url":"https://masters.nano.upenn.edu/curriculum/"},
    {"school":"NC State University","tag":"solid","program":"Master of Nanoengineering","year":2025,"note":"30学分,无论文/口试/驻校,可在线完成","url":"https://online-distance.ncsu.edu/program/master-of-nanoengineering/"}
  ],
  "national-security": [
    {"school":"中国人民大学","tag":"strong","program":"国家安全学(国际关系学院)","year":2023,"note":"政治学为基础,跨公共管理/法学/经济学,文理交叉培养","url":"http://sis.ruc.edu.cn/ch/xygkzw/xkfzzw/gjaqxzw/index.htm"},
    {"school":"复旦大学","tag":"solid","program":"国家安全学一级学科(国家安全技术方向)","year":2021,"note":"首批13家试点之一,计算机学院设国家安全技术博士方向","url":"https://cs.fudan.edu.cn/7b/eb/c24781a490475/page.htm"},
    {"school":"中国人民公安大学","tag":"solid","program":"国家安全学硕士/博士研究生","year":2022,"note":"公安政法系统国家安全人才培养,实务导向","url":"https://www.ppsuc.edu.cn/xkzy/yjs/gjaqx.htm"}
  ],
  "naval": [
    {"school":"MIT","tag":"top","program":"Mechanical and Ocean Engineering (Course 2-OE)","year":2024,"note":"机械工程为基底加海洋方向,顶点课设计AUV与智能传感器","url":"https://catalog.mit.edu/degree-charts/mechanical-ocean-engineering-course-2-oe/"},
    {"school":"University of Michigan","tag":"top","program":"Naval Architecture & Marine Engineering (BSE)","year":2024,"note":"结构/水动力/船舶动力/动力系统四大模块,可选帆船高速艇等方向","url":"https://name.engin.umich.edu/home/academics/undergraduate-studies/degree-requirements/"},
    {"school":"哈尔滨工程大学","tag":"strong","program":"船舶与海洋工程(船舶工程学院本科)","year":2024,"note":"国家级一流专业,数理力学+船舶设计建造+海洋资源开发","url":"https://sec.hrbeu.edu.cn/437/list.htm"}
  ],
  "neuroscience": [
    {"school":"麻省理工学院 MIT","program":"Brain and Cognitive Sciences (Course 9)","year":2025,"tag":"top","note":"三层课程:Python计算+神经计算9.40+统计,延伸细胞分子与计算认知方向","url":"https://catalog.mit.edu/degree-charts/brain-cognitive-sciences-course-9/"},
    {"school":"斯坦福大学 Stanford","program":"Neurosciences PhD Program","year":2024,"tag":"top","note":"两周沉浸式神经科学营+三轮实验室轮转,遗传/解剖/统计核心课,五年制博士","url":"https://med.stanford.edu/neurogradprogram/about/degree-requirements.html"},
    {"school":"哈佛大学 Harvard","program":"Program in Neuroscience (PiN), PhD","year":2024,"tag":"top","note":"旗舰课《神经科学学科》贯穿全年,必修计算神经科学与神经解剖,实验室轮转","url":"https://pinphd.hms.harvard.edu/training/curriculum"},
    {"school":"伦敦大学学院 UCL","program":"Neuroscience BSc / MSci","year":2026,"tag":"top","note":"分子-细胞-系统三层进阶,神经解剖/生理/药理实验,可转四年制MSci","url":"https://www.ucl.ac.uk/prospective-students/undergraduate/degrees/neuroscience-bsc-2026"},
    {"school":"约翰斯·霍普金斯大学 JHU","program":"Neuroscience, Bachelor of Science","year":2024,"tag":"strong","note":"四方向选修:细胞分子/认知/计算/系统,依托Mind-Brain研究所与医学院","url":"https://e-catalogue.jhu.edu/arts-sciences/full-time-residential-programs/degree-programs/neuroscience/neuroscience-bachelor-science/"},
    {"school":"哥廷根大学/马克斯·普朗克 Göttingen/MPG","program":"International MSc/PhD/MD-PhD Neuroscience Program (IMPRS)","year":2024,"tag":"strong","note":"全英文授课,首年90 ECTS课程+轮转,联合多所马普所与灵长类中心","url":"https://www.gpneuro.uni-goettingen.de/"},
    {"school":"中科院脑科学与智能技术卓越创新中心(神经科学研究所)","program":"神经生物学 硕士/博士研究生","year":2026,"tag":"top","note":"国内顶尖神经科学机构,暑期学校选拔推免,学硕+专硕,脑智融合方向","url":"https://www.ion.ac.cn/"},
    {"school":"清华大学-IDG/麦戈文脑科学研究院","program":"脑科学与神经工程 研究生培养","year":2024,"tag":"strong","note":"工程驱动脑科学,神经工程与神经影像见长,设Brain+X跨学科交叉资助","url":"https://mcgovern.life.tsinghua.edu.cn/"},
    {"school":"浙江大学脑科学与脑医学学院","program":"脑科学本科专业(神经科学/神经精神医学方向)","year":2020,"tag":"solid","note":"国内首个脑科学本科专业,设神经科学与神经精神医学两培养方向","url":"http://www.neuroscience.zju.edu.cn/"}
  ],
  "nuclear": [
    {"school":"MIT","tag":"top","program":"Nuclear Science and Engineering (Course 22, BS)","year":2024,"note":"ABET认证,辐射产生测量控制+热流体+核材料,15学分设计课","url":"https://catalog.mit.edu/subjects/22/"},
    {"school":"University of Michigan","tag":"top","program":"Nuclear Engineering & Radiological Sciences (BSE)","year":2024,"note":"USNews排名第一,原子核物理与辐射物质相互作用,含SUGS五年本硕","url":"https://ners.engin.umich.edu/academics/undergraduate/degree-requirements/"}
  ],
  "nuclear-engineering": [
    {"school":"MIT","tag":"top","program":"Nuclear Science and Engineering (Course 22) 学位图","year":2025,"note":"核心课+能源系统专门课+毕业设计,72学分聚焦方向(裂变/聚变/材料)","url":"https://catalog.mit.edu/degree-charts/nuclear-science-engineering-course-22/"},
    {"school":"密歇根大学","tag":"strong","program":"Nuclear Engineering & Radiological Sciences BSE 学位要求","year":2025,"note":"ABET 认证,核+辐射科学并重,8学期可毕业","url":"https://ners.engin.umich.edu/academics/undergraduate/degree-requirements/"},
    {"school":"得克萨斯农工大学","tag":"strong","program":"Nuclear Engineering BS 课程目录","year":2025,"note":"物理/数学/机械为基,大量选修拓宽,与多工科共享大一","url":"https://catalog.tamu.edu/undergraduate/engineering/nuclear/bs/"}
  ],
  "nursing": [
    {"school":"约翰霍普金斯护理学院 JHU SON","program":"MSN (Entry into Nursing)","year":2024,"tag":"top","note":"五学期硕士入门,整合公卫/遗传/组织科学,行星健康框架+大量仿真训练","url":"https://nursing.jhu.edu/programs/masters-entry/"},
    {"school":"北京大学护理学院","program":"护理学(四年制)","year":2023,"tag":"strong","note":"渐进式课程,公共/医学基础/护理专业+人文+临床实习,PBL教学导向","url":"https://nursing.bjmu.edu.cn/jyjx/bksjy/zyjs/d5f361561a2e46539a93f96df617d606.htm"},
    {"school":"北京协和医学院护理学院","program":"护理学(卓越护理贯通培养班)","year":2023,"tag":"strong","note":"卓越护理人才贯通培养班,本硕一体化课程设置","url":"https://nursing.pumc.edu.cn/jyjx/zyhlrcgtpyzyb/kcsz/beb3666f25d84595a6a308841ee7866f.htm"}
  ],
  "ocean-sci": [
    {"school":"Texas A&M University","tag":"top","program":"BS Oceanography","year":2025,"note":"四方向:海洋生态/化学地化/观测技术/海洋气候","url":"https://catalog.tamu.edu/undergraduate/arts-and-sciences/oceanography/bs/"},
    {"school":"Oregon State University","tag":"strong","program":"BS/HBS Oceanography","year":2025,"note":"地球海洋大气一体化学院,含科考航次实践","url":"https://catalog.oregonstate.edu/college-departments/earth-ocean-atmospheric-sciences/oceanography-bs-hbs/"},
    {"school":"Rutgers University","tag":"solid","program":"Physical Oceanography track","year":2025,"note":"物理海洋专向,数理与大数据分析并重","url":"https://marine.rutgers.edu/students/undergraduate/physical-oceanography-requirements/"}
  ],
  "operations-research": [
    {"school":"MIT","tag":"top","program":"Operations Research Center 运筹学硕士","year":2024,"note":"66学分含7门研究生课:优化/应用概率/统计+独立研究论文","url":"https://orc.mit.edu/academics/masters-operations-research/"},
    {"school":"Stanford University","tag":"top","program":"Management Science & Engineering (MS&E)","year":2024,"note":"融合运筹/经济/组织科学,优化+概率统计为核心","url":"https://msande.stanford.edu/academics-admissions/undergraduate/undergraduate-major"}
  ],
  "optical-eng": [
    {"school":"浙江大学","program":"光电信息科学与工程(光电科学与工程学院)","year":2023,"tag":"top","note":"光学工程顶尖,光电+微纳光电集成/智能光电感知 创新模块","url":"http://opt.zju.edu.cn/"},
    {"school":"华中科技大学","program":"光电信息科学与工程(光学与电子信息学院)","year":2023,"tag":"strong","note":"150 学分,光电子学+光信息学+电子通信计算机基础","url":"https://oei.hust.edu.cn/"}
  ],
  "ordnance": [
    {"school":"北京理工大学","tag":"top","program":"武器发射工程(宇航学院)","year":2024,"note":"国家级一流专业,陆海空天多基点发射原理与测控","url":"https://sae.bit.edu.cn/rcpy20/bksjx/zyjs/b182759.htm"},
    {"school":"南京理工大学","tag":"top","program":"武器系统与工程(机械工程学院)","year":2024,"note":"兵器A+学科,武器系统构造原理设计仿真制造全链条","url":"https://sme.njust.edu.cn/88/5e/c12198a297054/page.htm"},
    {"school":"北京理工大学","tag":"strong","program":"武器系统与工程专业培养方案(PDF)","year":2023,"note":"完整培养方案文档,含课程学分结构","url":"https://jwb.bit.edu.cn/docs/2023-05/732441129499430cbfd7daad025834b9.pdf"}
  ],
  "pe": [
    {"school":"Penn State University","tag":"strong","program":"Kinesiology, B.S.","year":2024,"note":"运动科学/生物力学/运动生理多方向,含实习实践","url":"https://bulletins.psu.edu/undergraduate/colleges/health-human-development/kinesiology-bs/"},
    {"school":"Michigan State University","tag":"strong","program":"Kinesiology, B.S.","year":2024,"note":"物理/生物/社会科学交叉,实验+顶点研究必修","url":"https://education.msu.edu/kin/kinesiology-bs/requirements"},
    {"school":"University of Miami","tag":"solid","program":"Kinesiology & Sport Sciences","year":2024,"note":"运动训练/锻炼科学方向,均设实践或研究顶点","url":"https://bulletin.miami.edu/undergraduate-academic-programs/education-human-development/kinesiology-sport-sciences/"}
  ],
  "performing-arts": [
    {"school":"茱莉亚学院","tag":"top","program":"Drama BFA(表演)","year":2024,"note":"四年渐进:前两年声台形技,后两年全剧目演出,亚历山大/铃木法","url":"https://catalog.juilliard.edu/preview_program.php?catoid=33&poid=3178"},
    {"school":"纽约大学Tisch艺术学院","tag":"top","program":"Dance BFA(舞蹈)","year":2024,"note":"82学分专业课,编舞+解剖运动学+舞蹈史,Second Avenue舞团实演","url":"https://bulletins.nyu.edu/undergraduate/arts/programs/dance-bfa/"},
    {"school":"纽约大学Tisch艺术学院","tag":"strong","program":"Drama BFA(戏剧表演)","year":2024,"note":"同一studio四学期连读(4-in-1)+戏剧理论28学分,共128学分","url":"https://tisch.nyu.edu/drama/about/degree-requirements.html"}
  ],
  "petroleum": [
    {"school":"Texas A&M University","tag":"top","program":"Petroleum Engineering, BS","year":2024,"note":"钻井/油藏/采油全链条+强制实习,ABET认证","url":"https://catalog.tamu.edu/undergraduate/engineering/petroleum/bs/"},
    {"school":"Colorado School of Mines","tag":"strong","program":"Petroleum Engineering, BS","year":2024,"note":"两段暑期野外实习+油藏开发毕业设计","url":"https://catalog.mines.edu/undergraduate/programs/petroleumengineering/"}
  ],
  "pharmacy": [
    {"school":"加州大学旧金山分校 UCSF 药学院","program":"Doctor of Pharmacy (PharmD)","year":2024,"tag":"top","note":"3年12学季整合,器官系统疾病导向,逾1/3实践IPPE/APPE,P/NP评分","url":"https://pharmd.ucsf.edu/curriculum"},
    {"school":"北京大学药学院","program":"药学(六年制本硕融通)","year":2023,"tag":"strong","note":"六年本硕融通研究型,大药学一级学科招生,拔尖2.0基地药学创新班","url":"https://jiaoyuchu.bjmu.edu.cn/zsjy/zsgz/zyjs/183010.htm"}
  ],
  "philosophy": [
    {"school":"普林斯顿大学 (Princeton University)","program":"Philosophy 哲学本科主修","year":2024,"tag":"top","note":"8门课按形上·价值·逻辑科哲·哲学史四域分布+大三大四独立论文","url":"https://philosophy.princeton.edu/undergraduate/major-requirements"},
    {"school":"复旦大学哲学学院","program":"哲学(本科)","year":2023,"tag":"strong","note":"强基础重经典,全员导师制(6-7人1师),含国学/科哲/艺术哲学方向","url":"https://philosophy.fudan.edu.cn/2b/2a/c20826a666410/page.htm"}
  ],
  "physics": [
    {"school":"MIT(麻省理工)","program":"物理 Physics (Course 8)","year":2026,"tag":"top","note":"GIR 8.01力学/8.02电磁,Flexible与Focused双轨,8.03波动+量子+统计物理为核","url":"https://physics.mit.edu/academic-programs/undergrads/requirements/"},
    {"school":"Caltech(加州理工)","program":"物理 Physics Option (Ph)","year":2025,"tag":"top","note":"Ph1力学→Ph2/12波动量子统计,前两年完成核心,强调ACM95高等数学方法","url":"https://catalog.caltech.edu/current/information-for-undergraduate-students/graduation-requirements-all-options/physics-option-ph/"},
    {"school":"北京大学","program":"物理学(本科)","year":2024,"tag":"strong","note":"模块化课程,纯物理/应用物理/宽基础三方向自选,多层次实验课","url":"https://www.phy.pku.edu.cn/jyjx/bk1/pyjh.htm"},
    {"school":"中国科学技术大学 USTC","program":"物理学(本科)","year":2023,"tag":"strong","note":"理论+四大力学,物理/现代物理/应用物理方向,国家级物理实验教学中心","url":"https://catalog.ustc.edu.cn/program/203"}
  ],
  "plant-protection": [
    {"school":"瓦赫宁根大学","tag":"top","program":"MSc Plant Sciences 植物病理与昆虫学方向","year":2024,"note":"病虫草害种群生态+流行病学,导向IPM","url":"https://www.wur.nl/en/education-programmes/master/msc-programmes/msc-plant-sciences/specialisations-of-plant-sciences.htm"},
    {"school":"中国农业大学","tag":"solid","program":"植物保护本科专业(国家级一流)","year":2024,"note":"植物病理系+昆虫系,普通昆虫学国家精品课","url":"https://cpp.cau.edu.cn/"}
  ],
  "political-science": [
    {"school":"北京大学政府管理学院","program":"政治学与行政学(本科)","year":2023,"tag":"strong","note":"政治学原理·中西政治思想史·比较政治学,设数字治理方向","url":"https://www.sg.pku.edu.cn/docs/20230626103040906444.pdf"},
    {"school":"哈佛大学 (Harvard University)","program":"Government 政府学本科主修","year":2024,"tag":"top","note":"必修统计方法Gov50:Data+四子领域分布+研讨课,可选肯尼迪学院课","url":"https://www.gov.harvard.edu/undergraduate/academics/concentration-requirements/"},
    {"school":"牛津大学 (University of Oxford)","program":"PPE 哲学·政治·经济学 BA","year":2024,"tag":"top","note":"一年级三科齐修,二年级起二选或三修,小班导师制tutorial","url":"https://www.ppe.ox.ac.uk/course-structure"}
  ],
  "political-work": [
    {"school":"Naval Postgraduate School","tag":"solid","program":"MS in Leadership Education and Development","note":"近似领域：军官领导力/育人，培养连队军官(海军学院)","url":"https://online.nps.edu/-/855-ms-in-leadership-education-and-development"},
    {"school":"UCCS College of Education","tag":"solid","program":"Military Leader Development Program","note":"近似领域：空军/太空军少校学员队领导培养，颁硕士","url":"https://coe.uccs.edu/military-leader-development"},
    {"school":"U.S. Air War College (Air University)","tag":"solid","program":"Leadership & Warfighting 系 (领导力与伦理核心课)","year":2020,"note":"近似领域：军队领导力与职业伦理核心模块","url":"https://www.airuniversity.af.edu/AWC/Curriculum/"}
  ],
  "politics-sci": [
    {"school":"北京大学政府管理学院","program":"政治学与行政学(本科)","year":2023,"tag":"strong","note":"政治学原理·中西政治思想史·比较政治学,设数字治理方向","url":"https://www.sg.pku.edu.cn/docs/20230626103040906444.pdf"},
    {"school":"哈佛大学 (Harvard University)","program":"Government 政府学本科主修","year":2024,"tag":"top","note":"必修统计方法Gov50:Data+四子领域分布+研讨课,可选肯尼迪学院课","url":"https://www.gov.harvard.edu/undergraduate/academics/concentration-requirements/"},
    {"school":"牛津大学 (University of Oxford)","program":"PPE 哲学·政治·经济学 BA","year":2024,"tag":"top","note":"一年级三科齐修,二年级起二选或三修,小班导师制tutorial","url":"https://www.ppe.ox.ac.uk/course-structure"}
  ],
  "power-eng": [
    {"school":"清华大学","tag":"top","program":"能源与动力工程专业本科培养方案","year":2023,"note":"机航动力大类,工程热物理强校","url":"https://www.tsinghua.edu.cn/jxjywj/bkzy2023/zxzy/19-1.pdf"},
    {"school":"西安交通大学","tag":"top","program":"能动学院 学术型研究生培养方案","year":2023,"note":"动力工程及工程热物理一级博士点,行业牵头单位","url":"https://epe.xjtu.edu.cn/info/1619/4317.htm"},
    {"school":"哈尔滨工业大学","tag":"strong","program":"能源与动力工程专业本科培养方案","year":2023,"note":"面向国防航天能源动力需求","url":"https://power.hit.edu.cn/_upload/article/files/4b/70/e1ad7dd34b4d9e24c033d265108e/51a1646c-1c9b-4152-b143-bbb0565151c1.pdf"}
  ],
  "psychology": [
    {"school":"斯坦福大学 Stanford University","program":"Psychology BA","year":2024,"tag":"top","note":"70单元,A区(知觉/认知神经)B区(发展/社会/临床)核心课各选≥2门","url":"https://psychology.stanford.edu/academics/undergraduate-program/major"},
    {"school":"哈佛大学 Harvard College","program":"Psychology Concentration","year":2024,"tag":"top","note":"导论+二年级导修+行为研究方法,通用/认知神经进化/认知科学三轨","url":"https://undergrad.psychology.fas.harvard.edu/requirements"},
    {"school":"北京大学心理与认知科学学院","program":"心理学(基础/应用)","year":2020,"tag":"strong","note":"大陆首个ESI前1%,实验/变态/临床国家精品课,基础与应用双方向","url":"https://www.psy.pku.edu.cn/docs/20201013150710573494.pdf"},
    {"school":"剑桥大学","program":"Psychological and Behavioural Sciences (PBS) BA","year":2025,"tag":"top","note":"认知/社会/发展/生物心理学并重，融统计与数据科学，BPS认证三年制","url":"https://www.pbs.tripos.cam.ac.uk/structure"},
    {"school":"牛津大学","program":"Experimental Psychology (BA/MSci)","year":2026,"tag":"top","note":"实验科学取向，核心认知神经/知觉/记忆/语言，含科研项目，可续读MSci","url":"https://www.ox.ac.uk/admissions/undergraduate/courses/course-listing/psychology-experimental"},
    {"school":"伦敦大学学院（UCL）","program":"Psychology BSc","year":2025,"tag":"top","note":"以研究设计与数据分析为骨干，认知/社会/发展/临床全覆盖，欧洲顶尖系","url":"https://www.ucl.ac.uk/prospective-students/undergraduate/degrees/psychology-bsc"},
    {"school":"耶鲁大学","program":"Psychology BA/BS","year":2024,"tag":"top","note":"兼修社会科学与自然科学双视角，必修统计、研究方法与毕业论文","url":"https://catalog.yale.edu/ycps/subjects-of-instruction/psychology/"},
    {"school":"密歇根大学","program":"Psychology BS","year":2024,"tag":"strong","note":"导论+跨领域gateway课+统计，另设生物心理与认知神经(BCN)方向","url":"https://lsa.umich.edu/lsa/academics/majors-minors/psychology-general-social-science-major.html"},
    {"school":"北京师范大学","program":"心理学（心理学部）","year":2023,"tag":"top","note":"国内顶尖，设认知神经/基础/应用拔尖班，本硕博一体化与全员科研导师制","url":"https://psych.bnu.edu.cn/rcpy/bkspy/pyfaa/72aa8c711e5d4f1499195e861e6fd4d9.htm"},
    {"school":"华东师范大学","program":"心理学/应用心理学（心理与认知科学学院）","year":2023,"tag":"strong","note":"国家级一流专业+拔尖2.0基地，实验/发展/教育心理学多门国家精品课","url":"https://psy.ecnu.edu.cn/17458/list.htm"},
    {"school":"中国科学院心理研究所","program":"心理学硕士/博士研究生","year":2025,"tag":"top","note":"我国唯一国家级心理学机构，硕博含发展/脑认知/人格社会/临床健康/工程网络","url":"http://www.psych.ac.cn/edu/"},
    {"school":"浙江大学","program":"心理学（心理与行为科学系）","year":2023,"tag":"solid","note":"大类培养，依托认知与发展、应用心理两所，覆盖认知/发展/应用方向","url":"https://bksy.zju.edu.cn/2024/0925/c83929a2967038/page.htm"}
  ],
  "public-admin": [
    {"school":"普林斯顿大学公共与国际事务学院 (Princeton SPIA)","program":"Master in Public Affairs (MPA)","year":2024,"tag":"top","note":"7门核心:政治分析+计量经济+经济行为,二年级工作坊","url":"https://spia.princeton.edu/graduate-programs/master-public-affairs/curriculum-requirements"},
    {"school":"中国人民大学公共管理学院","program":"行政管理(本科)","year":2024,"tag":"strong","note":"行政管理学+市政学+公共政策分析+组织行为学","url":"http://spap.ruc.edu.cn/rcpy/bkjy/pyfa/index.htm"}
  ],
  "public-administration": [
    {"school":"普林斯顿大学公共与国际事务学院 (Princeton SPIA)","program":"Master in Public Affairs (MPA)","year":2024,"tag":"top","note":"7门核心:政治分析+计量经济+经济行为,二年级工作坊","url":"https://spia.princeton.edu/graduate-programs/master-public-affairs/curriculum-requirements"},
    {"school":"中国人民大学公共管理学院","program":"行政管理(本科)","year":2024,"tag":"strong","note":"行政管理学+市政学+公共政策分析+组织行为学","url":"http://spap.ruc.edu.cn/rcpy/bkjy/pyfa/index.htm"}
  ],
  "public-health": [
    {"school":"约翰霍普金斯 Bloomberg 公卫学院","program":"Master of Public Health (MPH)","year":2024,"tag":"top","note":"80学分,核心45-50学分+13个方向,100小时实践practicum+capstone","url":"https://publichealth.jhu.edu/academics/mph/curriculum"},
    {"school":"哈佛陈曾熙公卫学院 Harvard T.H. Chan","program":"Master of Public Health (MPH)","year":2024,"tag":"top","note":"生统+流行病学核心+5门核心领域课,叠加实践经历与整合学习体验","url":"https://hsph.harvard.edu/office-of-educational-programs/master-of-public-health/mph-program-competencies/mph-curriculum-guides"},
    {"school":"北京大学公共卫生学院","program":"预防医学(长学制)","year":2023,"tag":"strong","note":"长学制,流病卫统/环境/营养/毒理等七个二级学科,逾半课程含实验","url":"https://jiaoyuchu.bjmu.edu.cn/zsjy/zsgz/zyjs/183009.htm"}
  ],
  "public-policy": [
    {"school":"哈佛肯尼迪政府学院 (Harvard Kennedy School)","program":"Master in Public Policy (MPP)","year":2024,"tag":"top","note":"一年级核心:经济学+定量+政治+财务+伦理领导力","url":"https://www.hks.harvard.edu/educational-programs/masters-programs/master-public-policy"},
    {"school":"清华大学公共管理学院","program":"公共管理硕士 (MPA)","year":2024,"tag":"strong","note":"核心课≥19学分,设发展规划、应急管理等方向","url":"https://www.sppm.tsinghua.edu.cn/jy/MPAxm.htm"}
  ],
  "public-security-st": [
    {"school":"中国人民公安大学","tag":"top","program":"侦查学专业(国家级一流本科专业建设点)","note":"下设刑侦/经侦/禁毒三向,课含现场勘查/案件侦查/侦查讯问","url":"https://zsjy.ppsuc.edu.cn/zyjs/zcxzy.htm"},
    {"school":"中国人民公安大学","tag":"strong","program":"公安管理学专业","note":"政治素养+专业能力+数据思维课系,公安业务课约占69%","url":"https://zsjy.ppsuc.edu.cn/zyjs/gaglxzy.htm"},
    {"school":"中国人民公安大学","tag":"solid","program":"专业设置总览(18本科专业/法学+工学两门类)","note":"公安学龙头校全专业目录,11个国家级一流本科专业","url":"https://www.ppsuc.edu.cn/index/xxgk1/jxzlxx/zysz.htm"}
  ],
  "religious-studies": [
    {"school":"Yale University","tag":"top","program":"Religious Studies Major (BA)","year":2022,"note":"12门课:5核心+初级研讨+两学期毕业论文+4选修","url":"https://religiousstudies.yale.edu/undergraduate-program/requirements-major"},
    {"school":"Princeton University","tag":"top","program":"Department of Religion Major","year":2022,"note":"至少9门,按地区流或主题流集中3门","url":"https://religion.princeton.edu/undergraduate/major-requirements"},
    {"school":"University of Arizona","tag":"solid","program":"Religious Studies (BA)","year":2022,"note":"30学分10门,6门300级以上含1门400级","url":"https://religion.arizona.edu/undergraduate/current-students/degree-requirements"}
  ],
  "remote-sensing": [
    {"school":"Boston University","tag":"strong","program":"MS in Remote Sensing & Geospatial Sciences","year":2025,"note":"32学分,3核心(遥感/GIS/统计)+5选修,理论与应用并重","url":"https://www.bu.edu/earth/graduate/ms-remote-sensing-geospatial-sciences/"},
    {"school":"University of Colorado Boulder","tag":"solid","program":"Remote Sensing, Earth & Space Sciences (Aerospace)","year":2025,"note":"多学科:数值分析/仪器原理/地空物理/航天系统四大块","url":"https://www.colorado.edu/aerospace/academics/graduates/focus-areas/remote-sensing-earth-space-sciences"},
    {"school":"University of Southern California","tag":"solid","program":"Graduate Certificate in Remote Sensing for Earth Observation","year":2025,"note":"16学分,3必修+1选修,聚焦对地观测","url":"https://gis.usc.edu/programs/certificate-remote-sensing-earth-observation-grad/"}
  ],
  "safety-eng": [
    {"school":"Texas A&M University","tag":"top","program":"M.S. in Safety Engineering","year":2025,"note":"化工系开设，覆盖风险评估与过程安全工程","url":"https://engineering.tamu.edu/chemical/academics/degrees/graduate/MSSENG.html"},
    {"school":"Indiana University of Pennsylvania","tag":"strong","program":"Safety, Health & Environmental Applied Sciences (B.S.)","year":2025,"note":"ABET认证，安全/健康/环境一体培养","url":"https://www.iup.edu/safetysciences/undergrad/index.html"},
    {"school":"Oklahoma State University","tag":"solid","program":"Fire Protection & Safety Engineering Technology (B.S.)","year":2025,"note":"ABET认证，消防+工业安全+危险物处置","url":"https://osuonline.okstate.edu/programs/undergraduate/fire-protection-and-safety-engineering-technology.html"}
  ],
  "security-tech": [
    {"school":"Pennsylvania State University","tag":"top","program":"Forensic Science, B.S.","year":2025,"note":"刑事科学核心+化学/生物方向，对接犯罪实验室","url":"https://bulletins.psu.edu/undergraduate/colleges/eberly-science/forensic-science-bs/"},
    {"school":"Syracuse University","tag":"strong","program":"Forensic Science, B.S.","year":2025,"note":"物证、DNA、毒理与法庭作证训练","url":"https://www.syracuse.edu/academics/programs/forensic-science-bs/"},
    {"school":"New Jersey Institute of Technology","tag":"solid","program":"Forensic Science, B.S.","year":2025,"note":"理工背景强，分析化学与仪器分析见长","url":"https://www.njit.edu/academics/degree/bs-forensic-science"}
  ],
  "service-ops": [
    {"school":"U.S. Air War College (Air University)","tag":"top","program":"Master of Strategic Studies","year":2020,"note":"10个月，聚焦空天网域军种作战力量运用","url":"https://www.airuniversity.af.edu/AWC/Curriculum/"},
    {"school":"U.S. Naval War College","tag":"strong","program":"Joint Maritime Operations (核心课)","note":"海上军种作战层级运用，联合海战核心课","url":"https://usnwc.edu/college-of-naval-command-and-staff/Core-Curriculum/Joint-Maritime-Operations"}
  ],
  "social-work": [
    {"school":"哥伦比亚大学","tag":"top","program":"Master of Science in Social Work (MSSW)","year":2024,"note":"60学分,18学分实习(1200小时),4方法+7实践领域专精","url":"https://socialwork.columbia.edu/content/curriculum"},
    {"school":"密歇根大学","tag":"top","program":"Master of Social Work (MSW)","year":2024,"note":"60学分通识+8专业方向各12学分,12选修,含田野实习","url":"https://ssw.umich.edu/academic-programs/msw"}
  ],
  "sociology": [
    {"school":"哈佛大学 (Harvard University)","program":"Sociology 社会学本科主修","year":2024,"tag":"top","note":"12门课兼顾社会理论与研究方法,二年级理论导修+三年级研究导修","url":"https://sociology.fas.harvard.edu/pages/concentration-requirements-and-information"},
    {"school":"北京大学社会学系","program":"社会学(本科)","year":2023,"tag":"strong","note":"双基础(理论+方法)双能力,三年级前导师带做实地调查写论文","url":"http://st.ruc.edu.cn/pyfa/47c9cc1fbc1a42bd98b170e455353215.htm"}
  ],
  "software": [
    {"school":"北京航空航天大学","program":"软件工程(软件学院)","year":2024,"tag":"strong","note":"软件工程 A+,智能工业软件/基础软件/智能软件工程方向+工程实践","url":"https://beijing.buaa.edu.cn/info/1018/2440.htm"},
    {"school":"浙江大学","program":"软件工程(软件学院)","year":2023,"tag":"strong","note":"国家示范性软件学院,工程化+复合型,应用导向国际化","url":"http://www.cst.zju.edu.cn/"}
  ],
  "software-engineering": [
    {"school":"北京航空航天大学","program":"软件工程(软件学院)","year":2024,"tag":"strong","note":"软件工程 A+,智能工业软件/基础软件/智能软件工程方向+工程实践","url":"https://beijing.buaa.edu.cn/info/1018/2440.htm"},
    {"school":"浙江大学","program":"软件工程(软件学院)","year":2023,"tag":"strong","note":"国家示范性软件学院,工程化+复合型,应用导向国际化","url":"http://www.cst.zju.edu.cn/"}
  ],
  "soil-water": [
    {"school":"北京林业大学","tag":"top","program":"水土保持与荒漠化防治(农学学士)","year":2024,"note":"学科开创者,核心课土壤侵蚀原理/风沙物理学/荒漠化防治工程","url":"http://college.gaokao.com/school/tinfo/48/schspe/2458/"},
    {"school":"西北农林科技大学","tag":"strong","program":"水土保持与荒漠化防治","year":2022,"note":"立足西北生态安全,工程+生物双线,含遥感/GIS/水保规划","url":"https://zhshw.nwsuaf.edu.cn/yxzy/zyjs/421067.htm"},
    {"school":"中科院水土保持研究所","tag":"solid","program":"水土保持与荒漠化防治专业介绍","year":2023,"note":"科教融合,侧重监测评价与防沙治沙工程实践","url":"https://iswc.cas.cn/rcpy/bksjy/zyjs/202310/t20231020_6904536.html"}
  ],
  "special-med": [
    {"school":"University of Texas Medical Branch (UTMB)","tag":"strong","program":"Aerospace Medicine Residency / MS","year":2026,"note":"航空航天医学住院医师+MS,含NASA与FAA实习,覆盖飞行/航天环境","url":"https://www.utmb.edu/spph/aerospace-medicine/residency-program"},
    {"school":"Wright State University","tag":"solid","program":"Aerospace Medicine, MS","year":2024,"note":"经典航空航天医学硕士课程(流行病学+飞行环境),项目2018已停招但课表可参考","url":"https://catalog.wright.edu/preview_program.php?catoid=24&poid=20165"}
  ],
  "statistics": [
    {"school":"卡内基梅隆大学 CMU","program":"统计与数据科学 Statistics & Data Science(本科)","year":2025,"tag":"top","note":"统计理论+数据分析+计算三线,5个主修含StatML与数学方向,必修Python","url":"https://www.cmu.edu/dietrich/statistics-datascience/academics/undergraduate/majors-minor/index.html"},
    {"school":"加州大学伯克利分校 UC Berkeley","program":"统计学 Statistics(本科)","year":2024,"tag":"top","note":"上分9门核心Stat133/134/135+15x选修+跨学科应用cluster三门","url":"https://statistics.berkeley.edu/academics/undergrad/major/upper-division-requirements"},
    {"school":"北京大学","program":"统计学(本科)","year":2022,"tag":"strong","note":"概率论/数理统计/随机过程/回归/多元/时间序列,概率/统计/生物统计三方向","url":"https://www.stat.pku.edu.cn/docs/2022-05/a33044eccdaa459c891025955cb90af0.pdf"}
  ],
  "stomatology": [
    {"school":"四川大学华西口腔医学院","tag":"top","program":"口腔医学(五年制/八年制/5+3)","year":2024,"note":"全国口腔标杆,牙体牙髓/牙周/正畸/颌面外科全模块","url":"https://www.hxkq.org/Html/News/Articles/13114.html"},
    {"school":"武汉大学口腔医学院","tag":"strong","program":"口腔医学培养方案(2018)","year":2018,"note":"国家一流专业,牙体牙髓与正畸全英文授课","url":"https://www.whuss.com/attachments/J/Ja/Jazn/JaznCehsBxlbZx7sUZ5rKHExSLOxgd4uCfLeRkZL.pdf"},
    {"school":"上海交通大学医学院","tag":"solid","program":"口腔医学专业五年制培养方案","note":"基础医学+临床+口腔三段,强调执医考与临床操作","url":"https://www.shsmu.edu.cn/__local/6/B0/16/8C567F28D64E086FB6F523B4B33_002A70A1_DBCE0.pdf"}
  ],
  "strategy": [
    {"school":"University of St Andrews","tag":"top","program":"Strategic Studies MLitt","year":2025,"note":"战略思想史+防务政策/军事理论,必修现代战争与战略","url":"https://www.st-andrews.ac.uk/subjects/international-relations/strategic-studies-mlitt/"},
    {"school":"King's College London","tag":"top","program":"War Studies MA","year":2025,"note":"全球少见专注冲突/大战略与战略思想的War Studies系,60年历史","url":"https://www.kcl.ac.uk/study/postgraduate-taught/courses/war-studies-ma"},
    {"school":"RSIS, Nanyang Technological University","tag":"strong","program":"MSc in Strategic Studies","year":2025,"note":"亚洲顶尖战略研究硕士,公开课程体系页","url":"https://rsis.edu.sg/gpo/graduate-programmes/msc-strategic-studies/curriculum/"}
  ],
  "surveying": [
    {"school":"University of Florida","tag":"top","program":"BS Geomatics (Surveying & Mapping)","year":2025,"note":"120学分ABET，测量计算/摄影测量/大地测量/遥感/无人机测绘全链","url":"https://catalog.ufl.edu/UGRD/colleges-schools/UGAGL/GEM_BSGE/GEM_BSGE02/"},
    {"school":"Florida Atlantic University","tag":"solid","program":"Geomatics Engineering BS","year":2025,"note":"120学分，数字摄影测量+GIS+激光扫描+水文测量并重","url":"https://www.fau.edu/engineering/cege/undergraduate/geomatics/"}
  ],
  "systems-sci": [
    {"school":"Portland State University","tag":"top","program":"Systems Science Ph.D.","year":2025,"note":"84学分跨学科系统论,涵盖复杂自适应系统与仿真","url":"https://www.pdx.edu/systems-science/systems-science-phd-program"},
    {"school":"Washington University in St. Louis","tag":"strong","program":"Systems Science & Mathematics PhD (ESE)","year":2025,"note":"72学分,系统数学方向,课程与研究并重","url":"https://bulletin.wustl.edu/grad/engineering/degrees/ese-systems-science-mathematics-phd/"},
    {"school":"Binghamton University","tag":"solid","program":"Systems Science Master's and PhD","year":2025,"note":"SSIE系下系统科学硕博,工程与系统建模","url":"https://www.binghamton.edu/ssie/graduate/systems-science.html"}
  ],
  "systems-science": [
    {"school":"宾夕法尼亚大学 UPenn","tag":"top","program":"Systems Science and Engineering 本科主修(ESE)","year":2025,"note":"优化+概率为核心的系统建模与决策方法","url":"https://www.ese.upenn.edu/undergraduate-2/systems-science-and-engineering-major/"},
    {"school":"圣路易斯华盛顿大学 WashU","tag":"strong","program":"Systems Science & Engineering 本科","year":2025,"note":"ESE系系统科学方向,数学建模+不确定性处理","url":"https://ese.washu.edu/academics/undergraduate-programs/Systems-Science-Engineering.html"},
    {"school":"弗吉尼亚大学 UVA","tag":"solid","program":"Systems Engineering 本科(SIE系)","year":2025,"note":"统计/优化工具+产学合作顶点设计","url":"https://engineering.virginia.edu/department/systems-and-information-engineering/academics/sie-undergraduate-programs"}
  ],
  "tcm": [
    {"school":"北京中医药大学","program":"中医学(5+3一体化/五年制)","year":2023,"tag":"top","note":"中医基础/诊断/方剂中药+经典(内经伤寒)+中医临床各科+西医基础","url":"https://jichu.bucm.edu.cn/bkjy/zyjs/37f8bddbd2434a2c95654dcfac1acc8f.htm"},
    {"school":"上海中医药大学","program":"中医学(五年制)","year":2024,"tag":"strong","note":"经典基础-精读-临床贯通,示范病房+技能中心+科研创新阶梯式培养","url":"https://iec.shutcm.edu.cn/2024/1113/c146a163316/page.htm"}
  ],
  "tcm-pharmacy": [
    {"school":"中国药科大学","tag":"top","program":"中药学(拔尖创新班)","note":"中药现代化导向,中药化学/鉴定/药剂/分析+波谱解析","url":"https://zyxy.cpu.edu.cn/rcpy/list.htm"},
    {"school":"北京中医药大学中药学院","tag":"strong","program":"中药学本科专业设置","note":"中医药双思维,中药炮制/鉴定/药理,部分中英双语授课","url":"https://zhongyao.bucm.edu.cn/rcpy/bksjy/index.htm"}
  ],
  "textile": [
    {"school":"NC State University (Wilson College of Textiles)","tag":"top","program":"Textile Engineering, BS","year":2024,"note":"三方向(信息/化学/产品)+企业资助毕设","url":"https://catalog.ncsu.edu/undergraduate/engineering/textile-program/"},
    {"school":"东华大学 Donghua University","tag":"strong","program":"Textile Engineering","year":2024,"note":"原中国纺织大学,纺织工程国内顶尖","url":"https://english.dhu.edu.cn/Textiles/list.htm"},
    {"school":"Georgia Tech","tag":"solid","program":"Materials Science & Engineering (textiles track)","year":2024,"note":"纤维/纺织并入材料系,智能可穿戴方向","url":"https://catalog.gatech.edu/colleges/coe/materials-science/"}
  ],
  "theology": [
    {"school":"Harvard Divinity School","tag":"top","program":"Degree Programs (MDiv/MTS/ThM)","year":2022,"note":"圣经/历史/系统神学/伦理/实践多轨学位体系","url":"https://www.hds.harvard.edu/academics/degree-programs"},
    {"school":"Emory University, Candler School of Theology","tag":"strong","program":"Master of Divinity (MDiv)","year":2022,"note":"72学分三四年制,涵盖圣经至世界宗教与实践神学","url":"https://candler.emory.edu/academic-programs/master-of-divinity/"},
    {"school":"Vanderbilt University","tag":"strong","program":"Divinity School Academic Programs","year":2022,"note":"MDiv/MTS等,跨宗派人文取向神学训练","url":"https://divinity.vanderbilt.edu/academics/"}
  ],
  "theoretical-cs": [
    {"school":"清华大学","program":"计算机科学实验班(姚班/交叉信息院)","year":2023,"tag":"top","note":"姚期智奠基,理论计算机+算法+密码学,世界级理论训练","url":"https://www.tsinghua.edu.cn/jxjywj/bkzy2023/zxzy/29-2.pdf"},
    {"school":"Stanford 斯坦福","program":"Computer Science — Theory Track (BS)","year":2022,"tag":"strong","note":"CS103/109/110/161 核心 + 算法/复杂性/密码学等理论深度课","url":"https://www.cs.stanford.edu/bs-tracks-program-sheets"}
  ],
  "transport-eng": [
    {"school":"MIT","tag":"top","program":"Civil & Environmental Engineering, BS (Transportation track)","year":2024,"note":"系统工程视角:交通/物流/自治系统优化","url":"https://cee.mit.edu/education/undergraduate/"},
    {"school":"UC Berkeley","tag":"strong","program":"Transportation Engineering (CEE)","year":2024,"note":"运营/系统/政策跨学科,交通研究全球标杆","url":"https://ce.berkeley.edu/programs/trans"}
  ],
  "transportation": [
    {"school":"加州大学伯克利分校","tag":"top","program":"Transportation Engineering 研究生培养要求","year":2025,"note":"MS 20学分(8学分交通核心 CE251/252)+工程/系统两方向","url":"https://ce.berkeley.edu/programs/trans/graduate-requirements"},
    {"school":"MIT","tag":"top","program":"Master of Science in Transportation (MST) 跨系学位","year":2025,"note":"技术+运营+规划+政策交叉,66学分(34学分 CEE)","url":"https://cee.mit.edu/education/graduate/graduate-degrees/"},
    {"school":"佐治亚理工学院","tag":"strong","program":"Civil Engineering MS — 交通系统工程方向","year":2025,"note":"交通核心+城规/交管/网络建模/统计跨学科补充","url":"https://catalog.gatech.edu/programs/civil-engineering-ms/"}
  ],
  "urban-planning": [
    {"school":"康奈尔大学","tag":"top","program":"BS in Urban and Regional Studies (AAP)","year":2026,"note":"城市与区域规划学院本科,跨学科理论+studio","url":"https://aap.cornell.edu/planning/crp-academic-programs/bachelor-of-science-in-urban-and-regional-studies/"},
    {"school":"德州农工大学","tag":"strong","program":"Urban and Regional Planning BS","year":2026,"note":"讲座+studio+专业实践,120学分多学科","url":"https://catalog.tamu.edu/undergraduate/architecture/landscape-architecture-urban-planning/urban-regional-planning-bs/"},
    {"school":"俄亥俄州立大学","tag":"strong","program":"BS in City and Regional Planning (Knowlton)","year":2026,"note":"含社区发展、规划法、GIS与遥感技术","url":"https://knowlton.osu.edu/planning/bachelor-science-city-and-regional-planning"}
  ],
  "veterinary-medicine": [
    {"school":"康奈尔大学","tag":"top","program":"Doctor of Veterinary Medicine (DVM)","year":2025,"note":"四年制,约70%核心+30%选修,问题导向小组教学,二年级后选6条临床路径","url":"https://www.vet.cornell.edu/education/doctor-veterinary-medicine/current-students/student-handbook/dvm-curriculum"},
    {"school":"加州大学戴维斯分校","tag":"top","program":"DVM Curriculum","year":2025,"note":"104周理论+54周临床,前两年按身体系统组织,学习者中心","url":"https://www.vetmed.ucdavis.edu/dvm/dvm-curriculum"},
    {"school":"英国皇家兽医学院(RVC)","tag":"strong","program":"Bachelor of Veterinary Medicine (BVetMed)","year":2025,"note":"五年制螺旋课程,临床年在Hawkshead+20周院外实习","url":"https://www.rvc.ac.uk/study/undergraduate/bachelor-of-veterinary-medicine"}
  ],
  "visual-arts": [
    {"school":"罗德岛设计学院(RISD)","tag":"top","program":"Fine Arts BFA(绘画等)","year":2024,"note":"一年级实验基础studio,二年级起进专业,配套文理与批评理论","url":"https://www.risd.edu/academics/painting/bachelors-program"},
    {"school":"哥伦比亚大学","tag":"strong","program":"Visual Arts BA","year":2024,"note":"35-36学分,7门studio+毕业项目+当代艺术研讨,MFA导师带","url":"https://bulletin.columbia.edu/columbia-college/departments-instruction/visual-arts/"},
    {"school":"布朗大学","tag":"solid","program":"Visual Art Concentration","year":2024,"note":"11门课=3基础+5进阶studio+3艺术史,大四需办个人展","url":"https://visualart.brown.edu/undergraduate-program/concentration-requirements"}
  ],
  "world-history": [
    {"school":"复旦大学历史学系","program":"世界史(本科)","year":2024,"tag":"strong","note":"中外历史并重,世界通史·西方史学史·古希腊文明等国家级一流课","url":"https://history.fudan.edu.cn/"}
  ]
};
