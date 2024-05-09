export interface IUserInfo {
  mbrNo: number | null ;
  email: string;
  nickname: string;
  age: string;
  gender: 'M' | 'F' | '';
  pregnancy: boolean;
  pregMonth: string;
  cupDay?: string;
  symptoms?: string[];
  allergies?: string[];
}