export interface NPC {
  id: number;
  name: string;
  gender: 'مرد' | 'زن';
  age: number;
  relationship: number; // 0-100, how much they like the player
  type: 'Classmate' | 'Family' | 'Friend';
  subType?: string; // e.g. "Best Friend", "Rival"
}

export type EducationLevel = 'هیچکدام' | 'دبیرستان' | 'لیسانس';

export interface EducationStatus {
    stage: 'پیش‌دبستانی' | 'دبستان' | 'راهنمایی' | 'دبیرستان' | 'دانشگاه' | 'ترک تحصیل' | 'فارغ‌التحصیل دبیرستان' | 'فارغ‌التحصیل لیسانس' | 'بیکار';
    schoolName: string;
    performance: number; // 0-100
    graduatedHighSchool: boolean;
    graduatedUniversity: boolean;
    major: string | null;
    yearsInUniversity: number;
}

export interface JobDefinition {
    id: string;
    title: string;
    type: 'تمام وقت' | 'پاره وقت' | 'ارتش';
    baseSalary: number;
    requirements: {
        minAge: number;
        education: EducationLevel;
        criminalRecordAllowed: boolean;
        skillRequirement?: {
            skill: string;
            level: number;
        };
        health?: number;
        intelligence?: number;
    };
    careerPath: { title: string; salary: number; }[];
}


export interface PlayerJob {
    id: string; // Corresponds to JobDefinition id
    title: string;
    type: 'تمام وقت' | 'پاره وقت' | 'ارتش';
    salary: number;
    performance: number; // 0-100
    yearsInRole: number;
    careerPathLevel: number;
}

export interface Player {
  name: string;
  gender: 'مرد' | 'زن';
  age: number;
  country: string;
  countryFlag: string;
  city: string;
  money: number;
  health: number;
  happiness: number;
  intelligence: number;
  looks: number;
  job: PlayerJob | null;
  educationStatus: EducationStatus;
  alive: boolean;
  retirementAge: number;
  isMarried: boolean;
  stress: number; // 0-100
  criminalRecord: boolean;
  childrenCount: number;
  talent: 'هنر' | 'موسیقی' | 'ورزش' | 'نویسندگی' | null;
  assetsValue: number;
  relationships: NPC[];
  royalStatus: string | null;
  skills: { [key: string]: number }; // e.g. { programming: 50, writing: 20 }
}

export type CharacterConfig = Partial<Pick<Player, 'name' | 'gender' | 'country' | 'city' | 'royalStatus'>>;


export interface GameEvent {
  id: string;
  description: (player: Player) => string;
  condition: (player: Player) => boolean;
  apply: (player: Player) => Player;
}

export type GameStage = 'start' | 'playing' | 'game_over';

export interface GameState {
  player: Player | null;
  stage: GameStage;
}

export interface AnnualReport {
  newPlayerState: Player;
  log: string[];
}