export interface ITokenUser {
  email?: string;
  email_verified?: boolean;
  family_name?: string;
  given_name?: string;
  groups?: string[];
  name?: string;
  preferred_username?: string;
  realm_access?: { roles: string[] };
  resource_access?: { 'dart-league-frontend': { roles: string[] }; 'dart-league-backend': { roles: string[] } };
  sub?: string;
  token?: string;
}
