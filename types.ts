
export interface UserProfile {
  name: string;
  age: number;
  sex: 'M' | 'F';
  phone: string;
  address: string;
  email: string;
}

export interface BodyMetrics {
  weightKnown: boolean;
  weight?: number; // kg
  heightKnown: boolean;
  height?: number; // cm
  waistKnown: boolean;
  waist?: number; // cm
}

export interface MedicalHistory {
  onBPMeds: boolean;
  bpMeasured?: boolean;
  bpSystolic?: number;
  bpDiastolic?: number;
  
  hasDiabetes: boolean;
  diabetesMeasured?: boolean;
  glucosePreMeal?: number;
  glucosePostMeal?: number;
  
  hasCholesterolIssues: boolean;
  cholesterolMeasured?: boolean;
  hdl?: number;
  triglycerides?: number;
}

export interface ClinicalLabs {
  hasLabs: boolean;
  platelet?: number;
  ast?: number;
  alt?: number;
}

export interface AssessmentState {
  profile: UserProfile;
  metrics: BodyMetrics;
  history: MedicalHistory;
  labs: ClinicalLabs;
}
