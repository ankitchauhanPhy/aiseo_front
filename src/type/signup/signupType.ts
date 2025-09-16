export interface SignUpProps {
  setShowSignup: React.Dispatch<React.SetStateAction<boolean>>;
  setShowLoginup : React.Dispatch<React.SetStateAction<boolean>>
}

export interface SignUpForm {
  firstName: string;
  familyName: string;
  companyName: string;
  jobRole: string;
  workEmail: string;
  password: string;
  confirmPassword: string;
  agreeTC: boolean;
  subscribe: boolean;
  create:boolean;
}