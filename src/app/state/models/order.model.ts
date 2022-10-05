export interface Order {
  id: number;
  item: string;
  status: 'approved' | 'rejected' | 'pending';
}
