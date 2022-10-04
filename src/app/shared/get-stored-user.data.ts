import { User } from '../state/models/user.model';
import { GeneralTexts } from './general-texts.enum';

export const getStoredUser = (): User | undefined => {
  const storedUserRef = localStorage.getItem('user');
  return storedUserRef !== GeneralTexts.UNDEFINED ? JSON.parse(storedUserRef as string) : undefined;
};
