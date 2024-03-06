import { Document } from 'mongoose';
export interface CompanyInterface extends Document {
  name: string;
  url: string;
}
