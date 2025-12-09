export interface IAdmin {
  _id: string;
  email: string;
  password: string;
  name: string;
  role: 'admin' | 'superadmin';
  isActive: boolean;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(enteredPassword: string): Promise<boolean>;
}

export interface AdminResponse {
  id: string;
  email: string;
  name: string;
  role: string;
}
