export interface ICard {
  id: string;
  title: string;
  description?: string;
  members: string[];
  labels: string[];
  checklist: string[];
}
