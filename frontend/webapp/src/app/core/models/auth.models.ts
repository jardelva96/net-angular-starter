export type AuthResponse = {
  accessToken: string;
  tokenType: string;
  expiresAt: string;
};
export type LoginRequest = { email: string; password: string; };
export type RegisterRequest = { email: string; password: string; };
