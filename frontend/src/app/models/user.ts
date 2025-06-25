

export interface User {
  id: number;
  login: string;
  nom: string;
  prenom: string;
  role: string;
  service: string;
  dateDernierConnexion: string;   // ISO date string → convert with new Date() if needed
}
