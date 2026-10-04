export type SectionId = 'shape' | 'flow' | 'permeability' | 'solubility' | 'applications';

export interface SectionInfo {
  id: SectionId;
  title: string;
  shortTitle: string;
  iconName: string;
  description: string;
}

export interface TeacherScript {
  sectionId: SectionId;
  title: string;
  preparation: string;
  openQuestions: string[];
  keyObservation: string;
  conclusion: string;
  extendedThought: string;
}

export interface WaterApplication {
  id: string;
  title: string;
  category: 'sinh-hoat' | 'nong-nghiep' | 'cong-nghiep' | 'moi-truong';
  description: string;
  classroomQuestion: string;
  icon: string;
  gradient: string;
  illustrationType: 'watering' | 'drinking' | 'cleaning' | 'hydroelectric' | 'boating' | 'washing_hands';
}

export interface SimulationState {
  isPlaying: boolean;
  isPaused: boolean;
  isPoured: boolean;
  isStirred: boolean;
  showAnnotations: boolean;
  showTeacherScript: boolean;
  speed: number;
}
