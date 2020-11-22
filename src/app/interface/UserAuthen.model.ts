// user authencation
export interface UserAuthen {
  user: User;
}

interface User {
  email: string;
  token: string;
  username: string;
  bio: string;
  image?: any;
}
