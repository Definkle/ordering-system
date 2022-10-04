export interface Order {
  id?: number;
  item: string;
  status?: 'accepted' | 'rejected' | 'pending';
}
