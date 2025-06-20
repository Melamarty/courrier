import { Courrier } from './courrier';

export interface User {
  id?: number;
  nom: string;
  prenom: string;
  email: string;
  modeDePass: string;
  role: string;
  service: string;
  va: string;
  dateDernierConexion: Date;
  courriers?: Courrier[];  // One-to-many relationship
}
