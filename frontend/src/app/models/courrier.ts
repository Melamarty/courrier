export interface Courrier {
  id: number;                 // "id": 1
  objet: string;              // "objet": "Demande congé"
  annotation: string;         // "annotation": "À traiter urgemment"
  date: string;               // "date": "2024-06-01"
  destinataire: string;       // "destinataire": "DRH"
  destinateurSource: string;  // "destinateurSource": "Employé"
  type: string;               // "type": "Interne"
  status: string;             // "status": "En attente"
  emmeteur: string;           // "emmeteur": "Maroua"
  fichier: string;            // "fichier": "conge.pdf"
  modifiedAt: string;         // "modifiedAt": "2025-06-23T18:37:15"
  createdAt: string;          // "createdAt": "2025-06-23T18:37:15"
  modiedBy: number;           // "modiedBy": 1
}

export interface CourrierAnalysis {
  success: boolean;
  extracted_text: string;
  metadata: {
    sender_name?: string;
    sender_email?: string;
    recipient_name?: string;
    recipient_email?: string;
    date?: string;
    subject?: string;
    content?: string;
  };
  email_type: 'administratif' | 'médical' | 'urgence' | 'normal';
  confidence_scores: {
    administratif?: number;
    médical?: number;
    urgence?: number;
    normal?: number;
  };
  file_info: {
    filename?: string;
    content_type?: string;
    size?: number;
  };
  processing_time?: string;
}
