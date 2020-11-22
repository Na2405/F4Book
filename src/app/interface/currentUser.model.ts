export interface CurrentUser {
  user: User;
}

interface User {
  id: number;
  email: string;
  createdAt: string;
  updatedAt: string;
  username: string;
  bio?: any;
  image?: any;
  token: string;
}

export interface SettingFormValue {
  image?: any;
  username: string;
  bio?: any;
  email: string;
  password: string;
}
