import type { Player, GameEvent, AnnualReport, NPC, CharacterConfig, EducationStatus, JobDefinition, PlayerJob, EducationLevel } from './types';

// --- UTILITIES ---
const getRandom = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
const clamp = (num: number, min: number, max: number) => Math.min(Math.max(num, min), max);

const SCHOOL_ADJECTIVES = ["طلوع", "فجر", "دانش", "فرهنگ", "مهر", "شهید بهشتی", "علامه طباطبایی", "فرزانگان"];
const SCHOOL_NOUNS = ["ایران", "آینده", "البرز", "امید", "پسرانه", "دخترانه"];
const generateSchoolName = () => `${SCHOOL_ADJECTIVES[getRandom(0, SCHOOL_ADJECTIVES.length - 1)]} ${SCHOOL_NOUNS[getRandom(0, SCHOOL_NOUNS.length - 1)]}`;


const EDUCATION_STAGES = [
    { stage: 'دبستان', startAge: 6, endAge: 11, compulsory: true },
    { stage: 'راهنمایی', startAge: 12, endAge: 14, compulsory: true },
    { stage: 'دبیرستان', startAge: 15, endAge: 18, compulsory: true },
] as const;


// --- DATA ---
export const COUNTRIES = [
    { name: "ایران", flag: "🇮🇷", isRoyal: false },
    { name: "آمریکا", flag: "🇺🇸", isRoyal: false },
    { name: "بریتانیا", flag: "🇬🇧", isRoyal: true },
    { name: "دانمارک", flag: "🇩🇰", isRoyal: true },
    { name: "آلمان", flag: "🇩🇪", isRoyal: false },
    { name: "اسپانیا", flag: "🇪🇸", isRoyal: true },
    { name: "ژاپن", flag: "🇯🇵", isRoyal: true },
];

export const CITIES: { [key: string]: string[] } = {
    "ایران": ["تهران", "اصفهان", "شیراز", "مشهد"],
    "آمریکا": ["نیویورک", "لس آنجلس", "شیکاگو", "میامی"],
    "بریتانیا": ["لندن", "منچستر", "بیرمنگام", "لیورپول"],
    "دانمارک": ["کپنهاگ", "آرهوس", "ادنسه"],
    "آلمان": ["برلین", "هامبورگ", "مونیخ"],
    "اسپانیا": ["مادرید", "بارسلونا", "والنسیا"],
    "ژاپن": ["توکیو", "اوزاکا", "کیوتو"],
};

export const ROYAL_TITLES = {
    "مرد": ["شاهزاده", "دوک", "کنت"],
    "زن": ["شاهدخت", "دوشس", "کنتس"]
};

export const SKILLS_DATA = [
    { id: 'programming', name: 'برنامه‌نویسی', cost: 1000, description: 'یادگیری زبان‌های کامپیوتری برای ساخت نرم‌افزار.' },
    { id: 'graphic_design', name: 'طراحی گرافیک', cost: 750, description: 'خلق تصاویر و طرح‌های بصری جذاب.' },
    { id: 'writing', name: 'نویسندگی', cost: 500, description: 'بهبود مهارت نوشتن متون خلاقانه و تجاری.' },
];

export const FREELANCE_GIGS = [
    { id: 'logo_design', name: 'طراحی لوگو', requiredSkill: 'graphic_design', minLevel: 10, rewardRange: [100, 300], skillGain: 3 },
    { id: 'blog_post', name: 'نوشتن پست وبلاگ', requiredSkill: 'writing', minLevel: 10, rewardRange: [50, 200], skillGain: 2 },
    { id: 'simple_website', name: 'ساخت وبسایت ساده', requiredSkill: 'programming', minLevel: 20, rewardRange: [500, 1500], skillGain: 5 },
];


export const JOBS: JobDefinition[] = [
    // --- Part-time Jobs ---
    { id: 'newspaper_delivery', title: 'روزنامه پخش‌کن', type: 'پاره وقت', baseSalary: 100, requirements: { minAge: 12, education: 'هیچکدام', criminalRecordAllowed: true }, careerPath: [] },
    { id: 'babysitter', title: 'پرستار بچه', type: 'پاره وقت', baseSalary: 150, requirements: { minAge: 14, education: 'هیچکدام', criminalRecordAllowed: true }, careerPath: [] },
    { id: 'fast_food', title: 'کارگر فست فود', type: 'پاره وقت', baseSalary: 200, requirements: { minAge: 15, education: 'هیچکدام', criminalRecordAllowed: true }, careerPath: [] },
    { id: 'barista', title: 'باریستا', type: 'پاره وقت', baseSalary: 250, requirements: { minAge: 16, education: 'هیچکدام', criminalRecordAllowed: true }, careerPath: [] },

    // --- Full-time Jobs (No Degree) ---
    { id: 'janitor', title: 'سرایدار', type: 'تمام وقت', baseSalary: 2000, requirements: { minAge: 18, education: 'هیچکدام', criminalRecordAllowed: false }, careerPath: [{title: 'سرایدار ارشد', salary: 2500}] },
    { id: 'construction', title: 'کارگر ساختمانی', type: 'تمام وقت', baseSalary: 2500, requirements: { minAge: 18, education: 'هیچکدام', criminalRecordAllowed: true }, careerPath: [{title: 'سرکارگر', salary: 3500}] },
    { id: 'taxi_driver', title: 'راننده تاکسی', type: 'تمام وقت', baseSalary: 2800, requirements: { minAge: 20, education: 'هیچکدام', criminalRecordAllowed: false }, careerPath: [{title: 'راننده ویژه', salary: 3800}]},
    { id: 'factory_worker', title: 'کارگر کارخانه', type: 'تمام وقت', baseSalary: 2200, requirements: { minAge: 18, education: 'هیچکدام', criminalRecordAllowed: true }, careerPath: [{title: 'مدیر شیفت', salary: 3200}]},

    // --- Full-time Jobs (High School) ---
    { id: 'receptionist', title: 'منشی', type: 'تمام وقت', baseSalary: 3000, requirements: { minAge: 18, education: 'دبیرستان', criminalRecordAllowed: false }, careerPath: [{title: 'مدیر دفتر', salary: 4500}] },
    { id: 'truck_driver', title: 'راننده کامیون', type: 'تمام وقت', baseSalary: 4000, requirements: { minAge: 21, education: 'دبیرستان', criminalRecordAllowed: false }, careerPath: [{title: 'مدیر حمل و نقل', salary: 5500}] },
    { id: 'firefighter', title: 'آتش‌نشان', type: 'تمام وقت', baseSalary: 4500, requirements: { minAge: 18, education: 'دبیرستان', criminalRecordAllowed: false, health: 80 }, careerPath: [{title: 'فرمانده', salary: 6500}] },

    // --- Full-time Jobs (University) ---
    { id: 'teacher', title: 'معلم', type: 'تمام وقت', baseSalary: 6000, requirements: { minAge: 22, education: 'لیسانس', criminalRecordAllowed: false }, careerPath: [{title: 'معاون مدرسه', salary: 8000}, {title: 'مدیر مدرسه', salary: 11000}] },
    { id: 'programmer', title: 'برنامه‌نویس', type: 'تمام وقت', baseSalary: 8000, requirements: { minAge: 22, education: 'لیسانس', criminalRecordAllowed: false, skillRequirement: { skill: 'programming', level: 30 } }, careerPath: [{title: 'برنامه‌نویس ارشد', salary: 12000}, {title: 'مدیر فنی', salary: 20000}] },
    { id: 'accountant', title: 'حسابدار', type: 'تمام وقت', baseSalary: 7000, requirements: { minAge: 22, education: 'لیسانس', criminalRecordAllowed: false }, careerPath: [{title: 'حسابدار ارشد', salary: 10000}] },
    { id: 'lawyer', title: 'وکیل', type: 'تمام وقت', baseSalary: 12000, requirements: { minAge: 24, education: 'لیسانس', criminalRecordAllowed: false }, careerPath: [{title: 'قاضی', salary: 22000}] },
    { id: 'doctor', title: 'پزشک', type: 'تمام وقت', baseSalary: 15000, requirements: { minAge: 26, education: 'لیسانس', criminalRecordAllowed: false }, careerPath: [{title: 'متخصص', salary: 25000}, {title: 'رئیس بیمارستان', salary: 40000}] },
    
    // --- Military ---
    {
        id: 'military', title: 'سرباز', type: 'ارتش', baseSalary: 2000,
        requirements: { minAge: 18, education: 'دبیرستان', criminalRecordAllowed: false, health: 60, intelligence: 40 },
        careerPath: [
            { title: 'سرجوخه', salary: 2500 },
            { title: 'گروهبان', salary: 3500 },
            { title: 'ستوان', salary: 5000 },
            { title: 'سروان', salary: 7000 },
            { title: 'سرهنگ', salary: 10000 },
            { title: 'ژنرال', salary: 15000 },
        ]
    },
];


// --- NPC Generation ---
const FIRST_NAMES_MALE = ["امیر", "پرهام", "آرش", "کیان", "مانی", "بهراد", "سامان", "علی", "رضا"];
const FIRST_NAMES_FEMALE = ["سارا", "مریم", "آوا", "رها", "نیکا", "ترانه", "یلدا", "فاطمه", "زهرا"];
const LAST_NAMES = ["رضایی", "محمدی", "احمدی", "حسینی", "صادقی", "هاشمی", "کریمی", "موسوی", "جعفری"];

function generateNpc(id: number, age: number, gender: 'مرد' | 'زن'): NPC {
    const firstName = gender === 'مرد' ? FIRST_NAMES_MALE[getRandom(0, FIRST_NAMES_MALE.length - 1)] : FIRST_NAMES_FEMALE[getRandom(0, FIRST_NAMES_FEMALE.length - 1)];
    const lastName = LAST_NAMES[getRandom(0, LAST_NAMES.length - 1)];
    return {
        id,
        name: `${firstName} ${lastName}`,
        gender,
        age,
        relationship: getRandom(20, 50),
        type: 'Classmate',
    };
}


// --- EVENTS ---
const allEvents: GameEvent[] = [
    // --- Childhood Events (Ages 3-12) ---
    {
        id: 'discover_talent',
        condition: (p) => p.age >= 5 && p.age <= 10 && p.talent !== null && Math.random() < 0.2,
        description: (p) => `استعداد شگفت‌انگیزی در زمینه ${p.talent} از خود نشان دادی!`,
        apply: (p) => ({ ...p, happiness: clamp(p.happiness + 15, 0, 100), intelligence: clamp(p.intelligence + 5, 0, 100) }),
    },
    // --- Relationship Events ---
    {
        id: 'get_married',
        condition: (p) => p.age > 22 && p.age < 40 && !p.isMarried && p.happiness > 50 && Math.random() < 0.2,
        description: () => "با عشق زندگی‌ات ازدواج کردی. فصل جدیدی در زندگی‌ات آغاز شد.",
        apply: (p) => ({ ...p, isMarried: true, happiness: clamp(p.happiness + 30, 0, 100) }),
    },
    {
        id: 'have_child',
        condition: (p) => p.isMarried && p.age > 25 && p.age < 45 && Math.random() < 0.25,
        description: () => "صاحب یک فرزند شدی! مسئولیت جدیدی به زندگی‌ات اضافه شد.",
        apply: (p) => ({ ...p, childrenCount: p.childrenCount + 1, happiness: clamp(p.happiness + 25, 0, 100), stress: clamp(p.stress + 15, 0, 100) }),
    },
    // --- Health & Misc Events ---
    {
        id: 'common_cold',
        condition: () => Math.random() < 0.15,
        description: () => "یک سرماخوردگی ساده گرفتی.",
        apply: (p) => ({ ...p, health: clamp(p.health - 5, 0, 100), happiness: clamp(p.happiness - 3, 0, 100) }),
    },
];


// --- CORE ENGINE ---
export function createNewPlayer(config: CharacterConfig = {}): Player {
  const talents: ('هنر' | 'موسیقی' | 'ورزش' | 'نویسندگی' | null)[] = ['هنر', 'موسیقی', 'ورزش', 'نویسندگی', null, null, null];
  const randomTalent = talents[getRandom(0, talents.length - 1)];
  
  const gender = config.gender || (Math.random() > 0.5 ? 'مرد' : 'زن');
  const firstName = gender === 'مرد' ? FIRST_NAMES_MALE[getRandom(0, FIRST_NAMES_MALE.length - 1)] : FIRST_NAMES_FEMALE[getRandom(0, FIRST_NAMES_FEMALE.length - 1)];
  const lastName = LAST_NAMES[getRandom(0, LAST_NAMES.length - 1)];
  const name = config.name || `${firstName} ${lastName}`;

  const randomCountryData = COUNTRIES[getRandom(0, COUNTRIES.length - 1)];
  const country = config.country || randomCountryData.name;
  const countryData = COUNTRIES.find(c => c.name === country) || randomCountryData;
  const cities = CITIES[countryData.name] || [];
  const city = config.city || cities[getRandom(0, cities.length - 1)];
  
  const money = config.royalStatus ? getRandom(50000, 200000) : getRandom(0, 50);

  return {
    name,
    gender,
    age: 0,
    country: countryData.name,
    countryFlag: countryData.flag,
    city,
    money,
    health: 100,
    happiness: 80,
    intelligence: getRandom(50, 100),
    looks: getRandom(30, 100),
    job: null,
    educationStatus: {
        stage: 'بیکار',
        schoolName: '',
        performance: 50,
        graduatedHighSchool: false,
        graduatedUniversity: false,
        major: null,
        yearsInUniversity: 0,
    },
    alive: true,
    retirementAge: 65,
    isMarried: false,
    stress: getRandom(5, 20),
    criminalRecord: false,
    childrenCount: 0,
    talent: randomTalent,
    assetsValue: 0,
    relationships: [],
    royalStatus: config.royalStatus || null,
    skills: {},
  };
}

export function advanceYear(player: Player): AnnualReport {
  let newPlayerState = { ...player, age: player.age + 1 };
  const log: string[] = [];

  // Age up NPCs
  newPlayerState.relationships = newPlayerState.relationships.map(r => ({ ...r, age: r.age + 1 }));

  // --- Education Progression ---
  if(newPlayerState.educationStatus.stage === 'دانشگاه') {
    const tuition = 5000;
    if(newPlayerState.money >= tuition) {
        newPlayerState.money -= tuition;
        newPlayerState.educationStatus.yearsInUniversity++;
        newPlayerState.educationStatus.performance = clamp(newPlayerState.educationStatus.performance - getRandom(5, 10), 0, 100);
        log.push(`شهریه دانشگاه به مبلغ ${tuition.toLocaleString()} تومان پرداخت شد.`)
        if(newPlayerState.educationStatus.yearsInUniversity >= 4) {
            if(newPlayerState.educationStatus.performance >= 50) {
                newPlayerState.educationStatus.stage = 'فارغ‌التحصیل لیسانس';
                newPlayerState.educationStatus.graduatedUniversity = true;
                newPlayerState.happiness = clamp(newPlayerState.happiness + 30, 0, 100);
                log.push(`تبریک! با موفقیت از دانشگاه با مدرک لیسانس فارغ‌التحصیل شدی.`);
            } else {
                 newPlayerState.educationStatus.stage = 'ترک تحصیل';
                 log.push(`به دلیل عملکرد ضعیف، از دانشگاه اخراج شدی.`);
            }
        }
    } else {
        newPlayerState.educationStatus.stage = 'ترک تحصیل';
        log.push(`نتوانستی شهریه دانشگاه را پرداخت کنی و مجبور به ترک تحصیل شدی.`);
    }
  } else {
    const currentStageInfo = EDUCATION_STAGES.find(s => s.stage === newPlayerState.educationStatus.stage);
    if (currentStageInfo && newPlayerState.age > currentStageInfo.endAge) {
        newPlayerState.educationStatus = { ...newPlayerState.educationStatus, stage: 'فارغ‌التحصیل دبیرستان', schoolName: '', graduatedHighSchool: true, performance: 0 };
        log.push("شما با موفقیت از دبیرستان فارغ‌التحصیل شدید! آینده منتظر شماست.");
    }
    if (newPlayerState.age === EDUCATION_STAGES[0].startAge && newPlayerState.educationStatus.stage === 'بیکار') {
        const firstStage = EDUCATION_STAGES[0];
        newPlayerState.educationStatus = { ...newPlayerState.educationStatus, stage: firstStage.stage, schoolName: generateSchoolName(), };
        log.push(`زمان رفتن به ${firstStage.stage} در مدرسه ${newPlayerState.educationStatus.schoolName} است!`);
        // Add classmates
        const classmates: NPC[] = [];
        for (let i = 0; i < 5; i++) {
            const gender = Math.random() > 0.5 ? 'مرد' : 'زن';
            classmates.push(generateNpc(i + 1, 6, gender));
        }
        newPlayerState.relationships = [...newPlayerState.relationships, ...classmates];
        log.push("شما با چند همکلاسی جدید آشنا شدید.");
    } else if(currentStageInfo) {
        const nextStageIndex = EDUCATION_STAGES.findIndex(s => s.stage === currentStageInfo.stage) + 1;
        if(nextStageIndex < EDUCATION_STAGES.length) {
            const nextStage = EDUCATION_STAGES[nextStageIndex];
            if(newPlayerState.age === nextStage.startAge) {
                newPlayerState.educationStatus = { ...newPlayerState.educationStatus, stage: nextStage.stage, schoolName: generateSchoolName(), performance: clamp(newPlayerState.educationStatus.performance, 30, 80), };
                log.push(`شما به مقطع ${nextStage.stage} در مدرسه ${newPlayerState.educationStatus.schoolName} وارد شدید.`);
            }
        }
    }
  }


  // --- Stat & Job Progression ---
  if (newPlayerState.age > 50) newPlayerState.health = clamp(newPlayerState.health - getRandom(1, 3), 0, 100);
  if (newPlayerState.age > 70) newPlayerState.health = clamp(newPlayerState.health - getRandom(2, 5), 0, 100);
  
  if (newPlayerState.stress > 70) {
      newPlayerState.health = clamp(newPlayerState.health - getRandom(1, 4), 0, 100);
      newPlayerState.happiness = clamp(newPlayerState.happiness - getRandom(2, 5), 0, 100);
  } else {
      newPlayerState.stress = clamp(newPlayerState.stress - getRandom(1, 5), 0, 100);
  }
  
  if (newPlayerState.job) {
      newPlayerState.money += newPlayerState.job.salary;
      newPlayerState.job.yearsInRole++;
      newPlayerState.job.performance = clamp(newPlayerState.job.performance - getRandom(2, 6), 0, 100);
      log.push(`از شغلت به عنوان ${newPlayerState.job.title} مبلغ ${newPlayerState.job.salary.toLocaleString()} تومان درآمد داشتی.`);
  }

  // --- Process Events ---
  for (const event of allEvents) {
    if (event.condition(newPlayerState)) {
      newPlayerState = event.apply(newPlayerState);
      log.push(event.description(newPlayerState));
    }
  }

  // --- Check for death ---
  let deathReason = "";
  if (newPlayerState.health <= 0) { newPlayerState.alive = false; deathReason = "متاسفانه به دلیل وضعیت بد سلامتی، عمرت به پایان رسید."; } 
  else if (newPlayerState.age > 100) { newPlayerState.alive = false; deathReason = "بعد از رسیدن به سن ۱۰۰ سالگی، کتاب زندگی‌ات بسته شد."; }
  if(!newPlayerState.alive && deathReason) log.push(deathReason);
  
  return { newPlayerState, log };
}

// --- Player Actions ---
export function interactWithNpc(player: Player, npcId: number, interactionType: 'compliment' | 'spend_time'): { player: Player; message: string } {
    const npcIndex = player.relationships.findIndex(n => n.id === npcId);
    if (npcIndex === -1) return { player, message: "شخص مورد نظر پیدا نشد." };
    let newPlayer = { ...player, relationships: [...player.relationships] };
    let npc = { ...newPlayer.relationships[npcIndex] };
    let message = '';
    switch(interactionType) {
        case 'compliment': npc.relationship = clamp(npc.relationship + getRandom(3, 7), 0, 100); newPlayer.happiness = clamp(newPlayer.happiness + 2, 0, 100); message = `از ${npc.name} تعریف کردی و او خوشحال شد.`; break;
        case 'spend_time': npc.relationship = clamp(npc.relationship + getRandom(5, 12), 0, 100); newPlayer.happiness = clamp(newPlayer.happiness + 5, 0, 100); message = `با ${npc.name} وقت گذراندی. رابطه شما بهتر شد.`; break;
    }
    newPlayer.relationships[npcIndex] = npc;
    return { player: newPlayer, message };
}

export function studyHarder(player: Player): { player: Player, message: string } {
    const isInSchool = ['دبستان', 'راهنمایی', 'دبیرستان', 'دانشگاه'].includes(player.educationStatus.stage);
    if (!isInSchool) return { player, message: "تو در حال حاضر مدرسه یا دانشگاه نمی‌روی!" };
    const performanceGain = getRandom(5, 12);
    const happinessCost = getRandom(3, 6);
    const stressGain = getRandom(5,10);
    const newPlayer: Player = { ...player, educationStatus: { ...player.educationStatus, performance: clamp(player.educationStatus.performance + performanceGain, 0, 100), }, happiness: clamp(player.happiness - happinessCost, 0, 100), stress: clamp(player.stress + stressGain, 0, 100) };
    return { player: newPlayer, message: `به سختی درس خواندی. عملکرد تحصیلی‌ات ${performanceGain} واحد بهتر شد.` };
}

export function dropOut(player: Player): { player: Player, message: string } {
    if (player.educationStatus.stage === 'دانشگاه') {
        const newPlayer: Player = { ...player, educationStatus: { ...player.educationStatus, stage: 'ترک تحصیل', schoolName: '' }, happiness: clamp(player.happiness - 20, 0, 100), };
        return { player: newPlayer, message: "از دانشگاه انصراف دادی."};
    }
    const isInSchool = ['دبستان', 'راهنمایی', 'دبیرستان'].includes(player.educationStatus.stage);
    if (!isInSchool) return { player, message: "تو در حال حاضر در مدرسه نیستی که بخواهی ترک تحصیل کنی." };
    if (player.age < 16) return { player, message: "برای ترک تحصیل خیلی جوانی. فعلاً مدرسه اجباری است." };
    const newPlayer: Player = { ...player, educationStatus: { ...player.educationStatus, stage: 'ترک تحصیل', schoolName: '' }, happiness: clamp(player.happiness - 30, 0, 100), stress: clamp(player.stress + 15, 0, 100), };
    return { player: newPlayer, message: "از مدرسه ترک تحصیل کردی. این تصمیم آینده شغلی تو را به شدت تحت تاثیر قرار خواهد داد."};
}

export function learnSkill(player: Player, skillId: string): { player: Player, message: string } {
    const skillData = SKILLS_DATA.find(s => s.id === skillId);
    if (!skillData) return { player, message: "مهارت مورد نظر یافت نشد."};
    if (player.money < skillData.cost) return { player, message: `برای شرکت در این دوره به ${skillData.cost} تومان پول نیاز داری.`};

    const currentSkillLevel = player.skills[skillId] || 0;
    if (currentSkillLevel >= 100) return {player, message: `شما در مهارت ${skillData.name} به استادی رسیده‌اید.`};

    const skillGain = getRandom(10, 20);
    const newSkills = { ...player.skills, [skillId]: clamp(currentSkillLevel + skillGain, 0, 100) };
    const newPlayer: Player = { ...player, money: player.money - skillData.cost, skills: newSkills };
    return { player: newPlayer, message: `در دوره ${skillData.name} شرکت کردی و مهارتت ${skillGain} واحد افزایش یافت.`};
}

export function doFreelanceGig(player: Player, gigId: string): { player: Player, message: string } {
    const gigData = FREELANCE_GIGS.find(g => g.id === gigId);
    if (!gigData) return { player, message: "پروژه مورد نظر یافت نشد."};
    
    const playerSkillLevel = player.skills[gigData.requiredSkill] || 0;
    if (playerSkillLevel < gigData.minLevel) return { player, message: `برای انجام این پروژه به سطح ${gigData.minLevel} در مهارت مربوطه نیاز داری.`};

    const successChance = (playerSkillLevel / 100) * 0.9 + 0.1; // 10% base, up to 100%
    if (Math.random() < successChance) {
        const reward = getRandom(gigData.rewardRange[0], gigData.rewardRange[1]);
        const newSkillLevel = clamp(playerSkillLevel + gigData.skillGain, 0, 100);
        const newSkills = { ...player.skills, [gigData.requiredSkill]: newSkillLevel };
        const newPlayer: Player = { ...player, money: player.money + reward, skills: newSkills };
        return { player: newPlayer, message: `پروژه ${gigData.name} را با موفقیت انجام دادی، ${reward} تومان درآمد کسب کردی و مهارتت بهتر شد.`};
    } else {
        const newPlayer: Player = { ...player, happiness: clamp(player.happiness - 10, 0, 100) };
        return { player: newPlayer, message: `متاسفانه در انجام پروژه ${gigData.name} شکست خوردی و مشتری ناراضی بود.`};
    }
}

export function joinMilitary(player: Player): { player: Player, message: string } {
    const militaryJob = JOBS.find(j => j.id === 'military');
    if (!militaryJob) return {player, message: "خطای داخلی: شغل ارتش یافت نشد."};

    if (player.age < militaryJob.requirements.minAge) return {player, message: "برای پیوستن به ارتش خیلی جوان هستی."};
    if (player.health < (militaryJob.requirements.health || 0)) return {player, message: "وضعیت سلامتی شما برای خدمت در ارتش مناسب نیست."};
    if (player.intelligence < (militaryJob.requirements.intelligence || 0)) return {player, message: "شما تست هوش ورودی ارتش را قبول نشدید."};

    return applyForJob(player, 'military');
}


export function getAvailableJobs(player: Player, type: 'تمام وقت' | 'پاره وقت'): JobDefinition[] {
    const playerEducationLevel: EducationLevel = player.educationStatus.graduatedUniversity ? 'لیسانس' : player.educationStatus.graduatedHighSchool ? 'دبیرستان' : 'هیچکدام';
    
    const educationHierarchy: Record<EducationLevel, number> = { 'هیچکدام': 0, 'دبیرستان': 1, 'لیسانس': 2 };

    return JOBS.filter(job => {
        const meetsAge = player.age >= job.requirements.minAge;
        const meetsEducation = educationHierarchy[playerEducationLevel] >= educationHierarchy[job.requirements.education];
        const meetsCriminalRecord = job.requirements.criminalRecordAllowed || !player.criminalRecord;
        const skillReq = job.requirements.skillRequirement;
        const meetsSkill = !skillReq || (player.skills[skillReq.skill] || 0) >= skillReq.level;
        return job.type === type && meetsAge && meetsEducation && meetsCriminalRecord && meetsSkill;
    });
}

export function applyForJob(player: Player, jobId: string): { player: Player, message: string } {
    if (player.job) return { player, message: `شما در حال حاضر به عنوان ${player.job.title} شاغل هستید.` };
    const jobDef = JOBS.find(j => j.id === jobId);
    if (!jobDef) return { player, message: "شغل مورد نظر یافت نشد." };

    // Final check
    if (jobDef.type !== 'ارتش' && !getAvailableJobs(player, jobDef.type).some(j => j.id === jobId)) {
         return { player, message: `شما شرایط لازم برای شغل ${jobDef.title} را ندارید.` };
    }

    const newJob: PlayerJob = {
        id: jobDef.id,
        title: jobDef.title,
        type: jobDef.type,
        salary: jobDef.baseSalary,
        performance: 50,
        yearsInRole: 0,
        careerPathLevel: 0,
    };

    const newPlayer: Player = { ...player, job: newJob, happiness: clamp(player.happiness + 15, 0, 100) };
    return { player: newPlayer, message: `تبریک! شما به عنوان ${newJob.title} استخدام شدید.` };
}

export function workHarder(player: Player): { player: Player; message: string; } {
    if (!player.job) return { player, message: "شما شاغل نیستید." };
    const performanceGain = getRandom(5, 12);
    const stressGain = getRandom(4, 8);
    const newPlayer: Player = { ...player, job: { ...player.job, performance: clamp(player.job.performance + performanceGain, 0, 100)}, stress: clamp(player.stress + stressGain, 0, 100) };
    return { player: newPlayer, message: `سخت کار کردی و عملکردت ${performanceGain} واحد بهتر شد.` };
}

export function askForPromotion(player: Player): { player: Player; message: string; } {
    if (!player.job) return { player, message: "شما شاغل نیستید." };
    const jobDef = JOBS.find(j => j.id === player.job!.id);
    if (!jobDef || jobDef.careerPath.length <= player.job.careerPathLevel) {
        return { player, message: "متاسفانه مسیر شغلی دیگری برای شما در این شرکت وجود ندارد." };
    }
    
    if (player.job.performance < 70) return { player, message: "عملکرد شما برای ترفیع گرفتن کافی نیست." };
    if (player.job.yearsInRole < 2) return { player, message: "برای درخواست ترفیع باید حداقل ۲ سال در سمت فعلی خود کار کرده باشید." };
    
    const nextLevel = jobDef.careerPath[player.job.careerPathLevel];
    const newJob: PlayerJob = {
        ...player.job,
        title: nextLevel.title,
        salary: nextLevel.salary,
        performance: 50, // Reset performance
        yearsInRole: 0, // Reset years
        careerPathLevel: player.job.careerPathLevel + 1
    };
    const newPlayer: Player = { ...player, job: newJob, happiness: clamp(player.happiness + 20, 0, 100) };
    return { player: newPlayer, message: `تبریک! شما به سمت ${newJob.title} ترفیع پیدا کردید.` };
}


export function quitJob(player: Player): { player: Player; message: string; } {
    if (!player.job) return { player, message: "شما شاغل نیستید." };
    const oldJobTitle = player.job.title;
    const newPlayer: Player = { ...player, job: null, happiness: clamp(player.happiness - 10, 0, 100) };
    return { player: newPlayer, message: `شما از شغل خود به عنوان ${oldJobTitle} استعفا دادید.` };
}

export function enrollInUniversity(player: Player): { player: Player; message: string; } {
    if (!player.educationStatus.graduatedHighSchool) return { player, message: "برای ورود به دانشگاه باید اول دیپلم بگیری." };
    if (player.educationStatus.stage === 'دانشگاه') return { player, message: "شما در حال حاضر دانشجو هستید." };
    if (player.educationStatus.graduatedUniversity) return { player, message: "شما قبلا از دانشگاه فارغ‌التحصیل شده‌اید." };
    if (player.money < 5000) return { player, message: "برای پرداخت اولین شهریه دانشگاه پول کافی نداری." };

    const newPlayer: Player = { ...player, educationStatus: { ...player.educationStatus, stage: 'دانشگاه', major: "علوم کامپیوتر", schoolName: "دانشگاه تهران", yearsInUniversity: 0 } };
    return { player: newPlayer, message: "شما با موفقیت در دانشگاه ثبت نام کردید!" };
}

// Other actions remain unchanged
export function goToDoctor(player: Player): { player: Player, message: string } {
    if (player.money < 100) return { player, message: "پول کافی برای ویزیت دکتر نداری." };
    const healthGain = getRandom(5, 15);
    const newPlayer = { ...player, money: player.money - 100, health: clamp(player.health + healthGain, 0, 100) };
    return { player: newPlayer, message: `به دکتر مراجعه کردی و حالت بهتر شد. سلامتی‌ات ${healthGain} واحد افزایش یافت.` };
}

export function meditate(player: Player): { player: Player, message: string } {
    const stressRelief = getRandom(5, 15);
    const happinessGain = getRandom(2, 8);
    const newPlayer = { ...player, stress: clamp(player.stress - stressRelief, 0, 100), happiness: clamp(player.happiness + happinessGain, 0, 100) };
    return { player: newPlayer, message: `مدیتیشن کردی. استرست ${stressRelief} و شادی‌ات ${happinessGain} واحد بهبود یافت.` };
}

export function commitCrime(player: Player): { player: Player, message: string } {
    const success = Math.random() > 0.4;
    if (success) {
        const moneyGain = getRandom(100, 1000);
        const newPlayer = { ...player, money: player.money + moneyGain, stress: clamp(player.stress + 20, 0, 100), happiness: clamp(player.happiness - 10, 0, 100), };
        return { player: newPlayer, message: `یک دزدی کوچک انجام دادی و ${moneyGain.toLocaleString()} تومان به دست آوردی. اما استرست زیاد شد.` };
    } else {
        const newPlayer = { ...player, criminalRecord: true, happiness: clamp(player.happiness - 40, 0, 100), stress: clamp(player.stress + 50, 0, 100), };
        return { player: newPlayer, message: `هنگام دزدی دستگیر شدی! حالا سوء‌پیشینه داری و آینده شغلی‌ات در خطر است.` };
    }
}

export function buyHouse(player: Player): { player: Player, message: string } {
    const housePrice = 50000;
    if(player.assetsValue > 0) return { player, message: "تو در حال حاضر یک خانه داری."};
    if (player.money < housePrice) return { player, message: `برای خرید خانه به ${housePrice.toLocaleString()} تومان پول نیاز داری.` };
    const newPlayer = { ...player, money: player.money - housePrice, assetsValue: player.assetsValue + housePrice, happiness: clamp(player.happiness + 20, 0, 100) };
    return { player: newPlayer, message: `یک خانه خریدی! داشتن سرپناه احساس خوبی به تو می‌دهد.` };
}

// --- LOCAL STORAGE ---
const SAVE_KEY = 'lifeSimGameSave';
export function saveGame(player: Player) { try { localStorage.setItem(SAVE_KEY, JSON.stringify(player)); } catch (error) { console.error("Failed to save game:", error); } }
export function loadGame(): Player | null {
  try {
    const savedData = localStorage.getItem(SAVE_KEY);
    if (!savedData) return null;
    let player = JSON.parse(savedData);
    if (player && typeof player.age === 'number') {
        const defaults = createNewPlayer();
        const fullPlayer = {
            ...defaults,
            ...player,
            educationStatus: {
                ...defaults.educationStatus,
                ...(player.educationStatus || {})
            },
            skills: {
                ...defaults.skills,
                ...(player.skills || {})
            }
        };
        return fullPlayer;
    }
    return null;
  } catch (error) {
    console.error("Failed to load game:", error);
    return null;
  }
}
export function hasSavedGame(): boolean { return localStorage.getItem(SAVE_KEY) !== null; }
export function deleteSave() { localStorage.removeItem(SAVE_KEY); }