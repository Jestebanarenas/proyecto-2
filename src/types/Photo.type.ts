export interface Photo {
  id: number;
  url: string;
  description?: string;
  issue_id: number; // Relaciona la foto con una incidencia (Issue)
  uploaded_at: string; // ISO date string
}