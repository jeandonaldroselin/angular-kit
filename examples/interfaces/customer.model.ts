import { Author } from "../../models/common-domain.model"

export enum CustomerTypeEnum {
  empty = '',
  company = 'company',
  particular = 'particular',
}

export const CustomerTypeEnumMapping = {
  'empty': '',
  'company': 'Société',
  'particular': 'Particulier',
}

export interface Customer {
  id: number;
  number: number;
  name: string;
  logo: string;
  address: string;
  addressExtra: string;
  billingAddress: string;
  billingAddressExtra: string;
  responsibleName: string;
  responsibleEmail: string[];
  responsiblePhone: string[];
  email: string[];
  phone: string[];
  fax: string[];
  billingEmail: string[];
  billingPhone: string[];
  billingFax: string[];
  customerType: CustomerTypeEnum;
  requireOrderForInvoice: boolean;
  note: string;
  hasActiveContract: boolean;
  postedBy: Author;
  created: string;
}