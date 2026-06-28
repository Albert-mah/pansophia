/* =============================================================
 *  学习中心 · 名校培养方案 (PROGRAMS)  —— 挂在学科上的"外部说明"
 * -------------------------------------------------------------
 *  从 disciplines 条目抽出来单独维护：按 discipline id 关联，库浏览
 *  (library.js)按 it.id 查 STUDY_PROGRAMS[id] 渲染。
 *  国内/国际同一学科若 id 不同(如 cs / computer-science),两个 key
 *  各存一份并集,保证两个视图都显示。
 *  每条: { school, program, year, tag: top|strong|solid, note, url? }
 *  ⚠️ 年份优先 2020 以后；tag 是主观质量标，宁缺毋滥。
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
  "anthropology": [
    {"school":"哈佛大学 (Harvard University)","program":"Anthropology(社会人类学)本科主修","year":2024,"tag":"top","note":"三必修导修(民族志方法+二/三年级导修)+考古或社人课+研究研讨","url":"https://anthropology.fas.harvard.edu/concentration-requirements"}
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
  "astronomy": [
    {"school":"Caltech(加州理工)","program":"天体物理 Astrophysics Option (Ay)","year":2025,"tag":"top","note":"Ph物理基础+Ay20/21导论+Ay101/102进阶+Ay142/144科研","url":"https://catalog.caltech.edu/current/information-for-undergraduate-students/graduation-requirements-all-options/astrophysics-option-and-minor-ay/"},
    {"school":"普林斯顿大学 Princeton","program":"天体物理科学 Astrophysical Sciences(本科)","year":2025,"tag":"top","note":"物理力学电磁量子+AST204,高能/宇宙学/恒星形成+两篇JP+毕业论文","url":"https://web.astro.princeton.edu/academic/undergraduate-program/major-requirements"},
    {"school":"中国科学技术大学 USTC","program":"天文学(本科)","year":2023,"tag":"strong","note":"国家理科人才培养基地,物理为基+天体物理/天体测量/星系宇宙学","url":"https://catalog.ustc.edu.cn/program/203004"}
  ],
  "basic-med": [
    {"school":"北京大学医学部","program":"基础医学(八年制)","year":2023,"tag":"strong","note":"八年制本博连读,面向基础医学研究,强化科研训练与创新能力","url":"https://jiaoyuchu.bjmu.edu.cn/zsjy/zsgz/zyjs/183008.htm"},
    {"school":"复旦大学上海医学院","program":"基础医学","year":2024,"tag":"strong","note":"解剖/生化/病原等7个国家重点学科,器官系统整合+实验研究导向","url":"https://basicmed.fudan.edu.cn/ac/a7/c28509a306343/page.htm"}
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
  "clinical-med": [
    {"school":"哈佛医学院 Harvard Medical School","program":"Pathways MD 项目","year":2024,"tag":"top","note":"术前基础+器官系统模块,早临床纵向,PCE临床年+末段学术项目三段式","url":"https://hms.harvard.edu/education-admissions/md-program/curriculum/pathways"},
    {"school":"约翰霍普金斯医学院 Johns Hopkins SOM","program":"Genes to Society MD","year":2024,"tag":"top","note":"基因到社会框架,15个月器官系统整合主课+横向贯穿临床/社会主题","url":"https://www.hopkinsmedicine.org/som/curriculum/genes-to-society/curriculum"},
    {"school":"北京协和医学院","program":"临床医学(八年制)","year":2023,"tag":"top","note":"八年一贯本硕博融通,前2.5年清华预科,后续基础+临床+科研训练","url":"https://www.cams.cn/yxbd/cd0366454af74e2d9cca0c9d11fde479.htm"},
    {"school":"北京大学医学部","program":"临床医学(八年制)","year":2023,"tag":"strong","note":"八年一贯融通培养,器官系统整合,基础与临床融合的新课程体系","url":"https://jiaoyuchu.bjmu.edu.cn/zsjy/zsgz/zyjs/183004.htm"},
    {"school":"牛津大学 University of Oxford","program":"Medicine (BM BCh, A100)","year":2024,"tag":"top","note":"3年临床前(医学科学BA+科研项目)+3年临床,生理药理/生化遗传/群体健康","url":"https://www.medsci.ox.ac.uk/study/medicine/pre-clinical/structure"}
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
  "cs": [
    {"school":"清华大学","program":"计算机科学与技术(本科)","year":2023,"tag":"top","note":"160 学分,大类基础+系统结构/软件理论/应用三方向限选","url":"https://www.cs.tsinghua.edu.cn/info/1043/5969.htm"},
    {"school":"北京大学","program":"计算机科学与技术(图灵班)","year":2024,"tag":"top","note":"理论/系统/应用/机器学习四方向,图灵导师小班科研轮转","url":"https://eecs.pku.edu.cn/info/1083/6426.htm"},
    {"school":"上海交通大学","program":"计算机科学与技术(ACM班/致远)","year":2022,"tag":"top","note":"研究型小班,数理逻辑+编译+操作系统,7:3 讲授讨论","url":"https://zhiyuan.sjtu.edu.cn/html/zhiyuan/service_list.php?bg=jxfw"},
    {"school":"MIT 麻省理工","program":"6-3 Computer Science and Engineering","year":2024,"tag":"top","note":"核心 6.1010 编程→6.1210 算法→6.1800 系统,先编程后理论","url":"https://catalog.mit.edu/degree-charts/computer-science-engineering-course-6-3/"},
    {"school":"Stanford 斯坦福","program":"Computer Science (BS)","year":2024,"tag":"top","note":"96 单元,数学科学打底,分 AI/系统/理论/视觉等 track","url":"https://www.cs.stanford.edu/bachelors/degree-requirements"},
    {"school":"CMU 卡内基梅隆","program":"Computer Science (BS)","year":2024,"tag":"top","note":"核心 15-122 命令式→15-150 函数式→15-213 系统,双范式打底","url":"http://coursecatalog.web.cmu.edu/schools-colleges/schoolofcomputerscience/undergraduatecomputerscience/"},
    {"school":"ETH Zürich 苏黎世联邦理工","program":"Computer Science (Bachelor)","year":2023,"tag":"strong","note":"180 学分3年,一年级系统化编程+数学,三年级三方向二选深化","url":"https://inf.ethz.ch/studies/bachelor.html"}
  ],
  "data-science": [
    {"school":"UC Berkeley 加州伯克利","program":"Data Science (Major, CDSS)","year":2024,"tag":"top","note":"Data C8+C100 双核心,数据科学生命周期+领域 Domain Emphasis 三课","url":"https://cdss.berkeley.edu/dsus/academics/data-science-major"},
    {"school":"MIT 麻省理工","program":"6-14 Computer Science, Economics, and Data Science","year":2024,"tag":"strong","note":"CS+经济+数据科学交叉,概率优化+计量经济+机器学习","url":"https://catalog.mit.edu/degree-charts/computer-science-economics-data-science-course-6-14/"}
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
  "earth-science": [
    {"school":"MIT(麻省理工)","program":"地球大气与行星科学 EAPS (Course 12)","year":2026,"tag":"top","note":"跨学科数据驱动,4方向+数理化支撑(18.03/8.03/5.601),重野外与UROP","url":"https://catalog.mit.edu/degree-charts/earth-atmospheric-planetary-sciences-course-12/"},
    {"school":"Caltech(加州理工)","program":"地质与行星科学 GPS(本科)","year":2025,"tag":"top","note":"Ge11起步,地质/地球生物/地球化学/地球物理/行星科学多track,整合数理化","url":"https://catalog.caltech.edu/current/information-for-undergraduate-students/graduation-requirements-all-options/geological-and-planetary-sciences-gps-geology-geobiology-geochemistry-geophysics-planetary-science/"},
    {"school":"北京大学","program":"地球与空间科学(本科)","year":2024,"tag":"strong","note":"一年级不分专业修数理化,地质学类与地球物理学类两大方向","url":"https://sess.pku.edu.cn/jyjx1/bkspy/pyfa.htm"},
    {"school":"中国科学技术大学 USTC","program":"地球科学(地球物理/地球化学)(本科)","year":2023,"tag":"strong","note":"地球和空间科学学院,地球物理/地球化学/空间科学/大气科学多专业","url":"https://catalog.ustc.edu.cn/program/208001"}
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
  "environ-eng": [
    {"school":"斯坦福大学 Stanford","program":"环境系统工程理学学士 (ENVSE-BS)","year":2025,"tag":"top","note":"96学分,数理科学+可持续设计,四方向(海岸/能源/淡水/城市)","url":"https://bulletin.stanford.edu/programs/ENVSE-BS"},
    {"school":"同济大学","program":"环境工程 (本科)","year":2025,"tag":"strong","note":"国内环境顶尖,环境科学/环境工程/给排水全链条培养","url":"https://sese.tongji.edu.cn/"}
  ],
  "environmental-engineering": [
    {"school":"斯坦福大学 Stanford","program":"环境系统工程理学学士 (ENVSE-BS)","year":2025,"tag":"top","note":"96学分,数理科学+可持续设计,四方向(海岸/能源/淡水/城市)","url":"https://bulletin.stanford.edu/programs/ENVSE-BS"},
    {"school":"同济大学","program":"环境工程 (本科)","year":2025,"tag":"strong","note":"国内环境顶尖,环境科学/环境工程/给排水全链条培养","url":"https://sese.tongji.edu.cn/"}
  ],
  "finance": [
    {"school":"宾夕法尼亚大学沃顿商学院 (Wharton, UPenn)","program":"Finance, BS (本科金融)","year":2024,"tag":"top","note":"核心FNCE1000公司金融+FNCE1010货币银行,再修4门金融选修","url":"https://fnce.wharton.upenn.edu/programs/undergraduate/"},
    {"school":"MIT斯隆管理学院 (MIT Sloan)","program":"15-3 Finance (本科金融)","year":2024,"tag":"top","note":"7门进阶,至少2门金融核心,偏量化、衍生品与创业金融","url":"https://mitsloan.mit.edu/programs/undergraduate/15-3-finance-major-requirements"},
    {"school":"清华大学经济管理学院","program":"经济与金融(本科)","year":2023,"tag":"strong","note":"153学分,经济+金融整合,微宏观+公司金融+投资学","url":"https://www.tsinghua.edu.cn/jxjywj/bkzy2023/zxzy/47.pdf"},
    {"school":"北京大学光华管理学院","program":"金融学(本科)","year":2021,"tag":"strong","note":"143学分,设金融学/金融经济学方向,另有智金班交叉","url":"https://www.gsm.pku.edu.cn/undergraduate/fujian/jinrong.pdf"}
  ],
  "foreign-lit": [
    {"school":"北京外国语大学英语学院","program":"英语专业(本科)","year":2024,"tag":"strong","note":"低年级听说读写,高年级口笔译+文学/文化/国政经/翻译/新闻五模块选修","url":"https://seis.bfsu.edu.cn/info/1076/5972.htm"},
    {"school":"北京大学外国语学院","program":"英语(语言文学,本科)","year":2023,"tag":"strong","note":"语言与文化并重,通才取向,跨文化+跨学科课程设置","url":"https://www.gotopku.cn/programa/college/321.html"}
  ],
  "history": [
    {"school":"牛津大学 (University of Oxford)","program":"History 历史学 BA","year":2024,"tag":"top","note":"一年级英国史+欧洲与世界史+史学方法+专题,三年级独立论文","url":"https://www.ox.ac.uk/admissions/undergraduate/courses/course-listing/history"}
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
  "intelligent-sci": [
    {"school":"CMU 卡内基梅隆","program":"B.S. in Artificial Intelligence (BSAI)","year":2024,"tag":"top","note":"全美首个 AI 本科,数学统计+ML+符号计算+三门 AI 核心+伦理","url":"https://www.cs.cmu.edu/bs-in-artificial-intelligence/curriculum"},
    {"school":"清华大学","program":"计算机科学与技术(人工智能班/智班)","year":2022,"tag":"top","note":"姚期智领衔,数学+机器学习+理论,科研导向 AI 拔尖","url":"https://www.tsinghua.edu.cn/jxjywj/bkzy2022/zxzy/29-3.pdf"},
    {"school":"南京大学","program":"人工智能(人工智能学院)","year":2019,"tag":"strong","note":"国内首个完整 AI 本科体系,机器学习导论+知识表示+模式识别+NLP","url":"https://ai.nju.edu.cn/"}
  ],
  "international-relations": [
    {"school":"普林斯顿大学公共与国际事务学院 (SPIA)","program":"公共与国际事务本科主修","year":2024,"tag":"top","note":"公共政策导论+伦理+权力与认同+统计,大三研究设计+大四政策论文","url":"https://spia.princeton.edu/undergraduate-program/curriculum-requirements"},
    {"school":"复旦大学国际关系与公共事务学院","program":"国际政治(本科)","year":2022,"tag":"strong","note":"政治学原理·国际关系史·西方国关理论·国际政治经济学·美国外交","url":"https://sirpa.fudan.edu.cn/35080/list.htm"}
  ],
  "journalism": [
    {"school":"中国人民大学新闻学院","program":"新闻传播学类(本科)","year":2023,"tag":"strong","note":"5专业打通,主干课中外新闻传播史·新闻理论·新闻采访与写作·评论","url":"http://jcr.ruc.edu.cn/zw/jxpy/bks1/pyfa/index.htm"},
    {"school":"复旦大学新闻学院","program":"新闻传播学类\"2+X\"(本科)","year":2022,"tag":"strong","note":"2年大类+X专业方向,卓越新闻传播,新闻学/广电/广告/传播学4专业","url":"https://xwxy.fudan.edu.cn/fe/7c/c41181a523900/page.htm"}
  ],
  "law": [
    {"school":"哈佛大学法学院 (Harvard Law School)","program":"J.D. 法律博士项目","year":2024,"tag":"top","note":"1L必修宪法·合同·侵权·民诉·刑法·财产·立法与规制+1月实训学期","url":"https://hls.harvard.edu/academics/curriculum/"},
    {"school":"耶鲁大学法学院 (Yale Law School)","program":"J.D. 法律博士项目","year":2024,"tag":"top","note":"首学期4门宪法/合同/程序/侵权与规制+法律分析写作,小组credit/fail","url":"https://bulletin.yale.edu/bulletins/law/academic-requirements-and-options"},
    {"school":"北京大学法学院","program":"法学(本科)","year":2023,"tag":"strong","note":"厚基础宽口径,本科不分专业方向,研究生阶段再定专业领域","url":"https://www.law.pku.edu.cn/"}
  ],
  "linguistics": [
    {"school":"麻省理工学院 (MIT)","program":"Linguistics 语言学本科主修","year":2024,"tag":"top","note":"核心24.900语言学导论,语言学/哲学双轨,句法语音语义+三门限选","url":"https://linguistics.mit.edu/undergraduate/"}
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
  "materials": [
    {"school":"哈尔滨工业大学","program":"材料科学与工程 (本科)","year":2023,"tag":"strong","note":"材料科学基础+热力学+力学/物理性能+现代测试方法","url":"http://mse.hit.edu.cn/2023/0506/c16854a305620/page.htm"},
    {"school":"麻省理工 MIT","program":"材料科学与工程 (Course 3)","year":2025,"tag":"top","note":"加工-组织-性能主线+陶瓷/电子/金属/高分子限选+capstone","url":"https://catalog.mit.edu/degree-charts/materials-science-engineering-course-3/"}
  ],
  "materials-engineering": [
    {"school":"哈尔滨工业大学","program":"材料科学与工程 (本科)","year":2023,"tag":"strong","note":"材料科学基础+热力学+力学/物理性能+现代测试方法","url":"http://mse.hit.edu.cn/2023/0506/c16854a305620/page.htm"},
    {"school":"麻省理工 MIT","program":"材料科学与工程 (Course 3)","year":2025,"tag":"top","note":"加工-组织-性能主线+陶瓷/电子/金属/高分子限选+capstone","url":"https://catalog.mit.edu/degree-charts/materials-science-engineering-course-3/"}
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
  "medicine": [
    {"school":"哈佛医学院 Harvard Medical School","program":"Pathways MD 项目","year":2024,"tag":"top","note":"术前基础+器官系统模块,早临床纵向,PCE临床年+末段学术项目三段式","url":"https://hms.harvard.edu/education-admissions/md-program/curriculum/pathways"},
    {"school":"约翰霍普金斯医学院 Johns Hopkins SOM","program":"Genes to Society MD","year":2024,"tag":"top","note":"基因到社会框架,15个月器官系统整合主课+横向贯穿临床/社会主题","url":"https://www.hopkinsmedicine.org/som/curriculum/genes-to-society/curriculum"},
    {"school":"北京协和医学院","program":"临床医学(八年制)","year":2023,"tag":"top","note":"八年一贯本硕博融通,前2.5年清华预科,后续基础+临床+科研训练","url":"https://www.cams.cn/yxbd/cd0366454af74e2d9cca0c9d11fde479.htm"},
    {"school":"北京大学医学部","program":"临床医学(八年制)","year":2023,"tag":"strong","note":"八年一贯融通培养,器官系统整合,基础与临床融合的新课程体系","url":"https://jiaoyuchu.bjmu.edu.cn/zsjy/zsgz/zyjs/183004.htm"},
    {"school":"牛津大学 University of Oxford","program":"Medicine (BM BCh, A100)","year":2024,"tag":"top","note":"3年临床前(医学科学BA+科研项目)+3年临床,生理药理/生化遗传/群体健康","url":"https://www.medsci.ox.ac.uk/study/medicine/pre-clinical/structure"}
  ],
  "mgmt-sci": [
    {"school":"斯坦福大学 (Stanford)","program":"Management Science & Engineering (本科)","year":2024,"tag":"top","note":"运筹+优化+概率统计+组织科学,毕业做capstone项目","url":"https://msande.stanford.edu/academics-admissions/undergraduate/undergraduate-major"},
    {"school":"清华大学工业工程系","program":"工业工程(本科)","year":2023,"tag":"strong","note":"160学分,系统思维+运筹学,工程与管理复合培养","url":"https://www.tsinghua.edu.cn/jxjywj/bkzy2023/zxzy/17.pdf"}
  ],
  "nursing": [
    {"school":"约翰霍普金斯护理学院 JHU SON","program":"MSN (Entry into Nursing)","year":2024,"tag":"top","note":"五学期硕士入门,整合公卫/遗传/组织科学,行星健康框架+大量仿真训练","url":"https://nursing.jhu.edu/programs/masters-entry/"},
    {"school":"北京大学护理学院","program":"护理学(四年制)","year":2023,"tag":"strong","note":"渐进式课程,公共/医学基础/护理专业+人文+临床实习,PBL教学导向","url":"https://nursing.bjmu.edu.cn/jyjx/bksjy/zyjs/d5f361561a2e46539a93f96df617d606.htm"},
    {"school":"北京协和医学院护理学院","program":"护理学(卓越护理贯通培养班)","year":2023,"tag":"strong","note":"卓越护理人才贯通培养班,本硕一体化课程设置","url":"https://nursing.pumc.edu.cn/jyjx/zyhlrcgtpyzyb/kcsz/beb3666f25d84595a6a308841ee7866f.htm"}
  ],
  "optical-eng": [
    {"school":"浙江大学","program":"光电信息科学与工程(光电科学与工程学院)","year":2023,"tag":"top","note":"光学工程顶尖,光电+微纳光电集成/智能光电感知 创新模块","url":"http://opt.zju.edu.cn/"},
    {"school":"华中科技大学","program":"光电信息科学与工程(光学与电子信息学院)","year":2023,"tag":"strong","note":"150 学分,光电子学+光信息学+电子通信计算机基础","url":"https://oei.hust.edu.cn/"}
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
  "political-science": [
    {"school":"北京大学政府管理学院","program":"政治学与行政学(本科)","year":2023,"tag":"strong","note":"政治学原理·中西政治思想史·比较政治学,设数字治理方向","url":"https://www.sg.pku.edu.cn/docs/20230626103040906444.pdf"},
    {"school":"哈佛大学 (Harvard University)","program":"Government 政府学本科主修","year":2024,"tag":"top","note":"必修统计方法Gov50:Data+四子领域分布+研讨课,可选肯尼迪学院课","url":"https://www.gov.harvard.edu/undergraduate/academics/concentration-requirements/"},
    {"school":"牛津大学 (University of Oxford)","program":"PPE 哲学·政治·经济学 BA","year":2024,"tag":"top","note":"一年级三科齐修,二年级起二选或三修,小班导师制tutorial","url":"https://www.ppe.ox.ac.uk/course-structure"}
  ],
  "politics-sci": [
    {"school":"北京大学政府管理学院","program":"政治学与行政学(本科)","year":2023,"tag":"strong","note":"政治学原理·中西政治思想史·比较政治学,设数字治理方向","url":"https://www.sg.pku.edu.cn/docs/20230626103040906444.pdf"},
    {"school":"哈佛大学 (Harvard University)","program":"Government 政府学本科主修","year":2024,"tag":"top","note":"必修统计方法Gov50:Data+四子领域分布+研讨课,可选肯尼迪学院课","url":"https://www.gov.harvard.edu/undergraduate/academics/concentration-requirements/"},
    {"school":"牛津大学 (University of Oxford)","program":"PPE 哲学·政治·经济学 BA","year":2024,"tag":"top","note":"一年级三科齐修,二年级起二选或三修,小班导师制tutorial","url":"https://www.ppe.ox.ac.uk/course-structure"}
  ],
  "psychology": [
    {"school":"斯坦福大学 Stanford University","program":"Psychology BA","year":2024,"tag":"top","note":"70单元,A区(知觉/认知神经)B区(发展/社会/临床)核心课各选≥2门","url":"https://psychology.stanford.edu/academics/undergraduate-program/major"},
    {"school":"哈佛大学 Harvard College","program":"Psychology Concentration","year":2024,"tag":"top","note":"导论+二年级导修+行为研究方法,通用/认知神经进化/认知科学三轨","url":"https://undergrad.psychology.fas.harvard.edu/requirements"},
    {"school":"北京大学心理与认知科学学院","program":"心理学(基础/应用)","year":2020,"tag":"strong","note":"大陆首个ESI前1%,实验/变态/临床国家精品课,基础与应用双方向","url":"https://www.psy.pku.edu.cn/docs/20201013150710573494.pdf"}
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
  "statistics": [
    {"school":"卡内基梅隆大学 CMU","program":"统计与数据科学 Statistics & Data Science(本科)","year":2025,"tag":"top","note":"统计理论+数据分析+计算三线,5个主修含StatML与数学方向,必修Python","url":"https://www.cmu.edu/dietrich/statistics-datascience/academics/undergraduate/majors-minor/index.html"},
    {"school":"加州大学伯克利分校 UC Berkeley","program":"统计学 Statistics(本科)","year":2024,"tag":"top","note":"上分9门核心Stat133/134/135+15x选修+跨学科应用cluster三门","url":"https://statistics.berkeley.edu/academics/undergrad/major/upper-division-requirements"},
    {"school":"北京大学","program":"统计学(本科)","year":2022,"tag":"strong","note":"概率论/数理统计/随机过程/回归/多元/时间序列,概率/统计/生物统计三方向","url":"https://www.stat.pku.edu.cn/docs/2022-05/a33044eccdaa459c891025955cb90af0.pdf"}
  ],
  "tcm": [
    {"school":"北京中医药大学","program":"中医学(5+3一体化/五年制)","year":2023,"tag":"top","note":"中医基础/诊断/方剂中药+经典(内经伤寒)+中医临床各科+西医基础","url":"https://jichu.bucm.edu.cn/bkjy/zyjs/37f8bddbd2434a2c95654dcfac1acc8f.htm"},
    {"school":"上海中医药大学","program":"中医学(五年制)","year":2024,"tag":"strong","note":"经典基础-精读-临床贯通,示范病房+技能中心+科研创新阶梯式培养","url":"https://iec.shutcm.edu.cn/2024/1113/c146a163316/page.htm"}
  ],
  "theoretical-cs": [
    {"school":"清华大学","program":"计算机科学实验班(姚班/交叉信息院)","year":2023,"tag":"top","note":"姚期智奠基,理论计算机+算法+密码学,世界级理论训练","url":"https://www.tsinghua.edu.cn/jxjywj/bkzy2023/zxzy/29-2.pdf"},
    {"school":"Stanford 斯坦福","program":"Computer Science — Theory Track (BS)","year":2022,"tag":"strong","note":"CS103/109/110/161 核心 + 算法/复杂性/密码学等理论深度课","url":"https://www.cs.stanford.edu/bs-tracks-program-sheets"}
  ],
  "world-history": [
    {"school":"复旦大学历史学系","program":"世界史(本科)","year":2024,"tag":"strong","note":"中外历史并重,世界通史·西方史学史·古希腊文明等国家级一流课","url":"https://history.fudan.edu.cn/"}
  ]
};
