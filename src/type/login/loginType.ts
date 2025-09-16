export interface LoginProps {
  setShowLoginup : React.Dispatch<React.SetStateAction<boolean>>
}

export interface LoginForm {
  email: string;
  password: string;
  create: boolean;
}