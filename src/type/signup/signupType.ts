export interface SignUpProps {
  setShowSignup: React.Dispatch<React.SetStateAction<boolean>>;
  setShowLoginup : React.Dispatch<React.SetStateAction<boolean>>
}

export interface SignUpForm {
  first_name: string;
  last_name: string;
  username: string;
  company_name: string;
  job_role: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeTC: boolean;
  subscribe: boolean;
  create:boolean;
}