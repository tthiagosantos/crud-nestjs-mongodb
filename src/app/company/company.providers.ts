import { Connection } from 'mongoose';
import { CompanySchema } from './schemas/company.schema';

export const companyProviders = [
  {
    provide: 'COMPANY_MODEL',
    useFactory: (connect: Connection) =>
      connect.model('Company', CompanySchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
