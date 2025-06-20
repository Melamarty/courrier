export interface Courrier {
  num?: number;
  objet: string;
  date: Date;
  emmeteur: string;
  destinataire: string;
  destination: string;
  annotation: string;
  fichier: string;
  userId?: number;
}
