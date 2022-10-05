import { Order } from '../../state/models/order.model';

export const MockOrdersData: Order[] = [
  { id: 0, item: 'food', status: 'approved' },
  { id: 1, item: 'toy', status: 'pending' },
  { id: 2, item: 'clothes', status: 'pending' },
  { id: 3, item: 'books', status: 'rejected' },
];
