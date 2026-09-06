export type User = {
  id: number;
  email: string;
  name: string;
  imageUrl: string;
};

export type ApiUser = {
  id: number;
  username: string;
  email?: string;
  image_url: string;
};

export type TokenResponse = {
  access_token: string;
  token_type: string;
};

export type SignUpParams = {
  name: string;
  email: string;
  password: string;
  checkout?: boolean;
  dialogId: string;
};

export type SignInParams = Omit<SignUpParams, 'name'>;

export function mapApiUser(user: ApiUser): User {
  return {
    id: user.id,
    email: user.email ?? '',
    name: user.username,
    imageUrl: user.image_url,
  };
}
