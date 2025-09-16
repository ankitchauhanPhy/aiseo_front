export interface SignUpProps {
  setShowSignup: React.Dispatch<React.SetStateAction<boolean>>;
  setShowLoginup : React.Dispatch<React.SetStateAction<boolean>>
}

export interface SignUpForm {
  firstName: string;
  familyName: string;
  username: string;
  company_name: string;
  jobRole: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeTC: boolean;
  subscribe: boolean;
  create:boolean;
}