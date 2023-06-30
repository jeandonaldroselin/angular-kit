import { Attachment, Author, PaymentDeadline } from "../../models/common-domain.model"
import { Customer } from "./customer.model";

export enum BillingFrequencyEnum {
  'empty' = '',
  'one_shot' = 'one_shot',
  'semi_annual' = 'semi_annual',
  'four_monthly' = 'four_monthly',
  'quarterly' = 'quarterly',
  'monthly' = 'monthly'
}

export const BillingFrequencyMapping = {
  'one_shot' : 'Comptant',
  'semi_annual' : 'Semestriel',
  'four_monthly' : 'Quadrimestriel',
  'quarterly' : 'Trimestriel',
  'monthly' : 'Mensuel'
}

export enum RenewalTypeEnum {
  'empty' = '',
  'on_demand' = 'on_demand',
  'automatic' = 'automatic'
}

export const RenewalTypeEnumMapping = {
  'weak' : 'Faible',
  'on_demand' : 'A la demande',
  'automatic' : 'Tacite'
}

export enum StatusEnum {
  'empty' = '',
  'new' = 'new',
  'to_bill' = 'to_bill',
  'closed' = 'closed',
}

export const StatusEnumMapping = {
  'empty' : '',
  'new' : 'En cours',
  'to_bill' : 'A facturer',
  'closed' : 'Résilié',
}

export enum AnnualInterventionNumberEnum {
  'empty' = '',
  'one' = 1,
  'two' = 2,
  'three' = 3,
}

export class Contract {
  id: number;
  contract: Partial<Contract>;
  formerContract: Partial<Contract>;
  customer: Customer;
  number: string;
  amount: string;
  vatTax: string;
  soldInterventionHours: string;
  consummedInterventionHours: number;
  interventionDelay: string;
  renewalType: RenewalTypeEnum;
  status: StatusEnum;
  startDate: string;
  endDate: string;
  maintenanceTypeCorrective: boolean;
  maintenanceTypePreventive: boolean;
  billingFrequency: string;
  note: string;
  attachment: Attachment[];
  postedBy: Author;
  created: string;

  constructor(entity) {
    this.id = entity.id;
    this.contract = entity.contract;
    this.formerContract = entity.formerContract;
    this.number = entity.number;
    this.amount = entity.amount;
    this.vatTax = entity.vatTax;
    this.soldInterventionHours = entity.soldInterventionHours;
    this.consummedInterventionHours = entity.consummedInterventionHours;
    this.interventionDelay = entity.interventionDelay;
    this.renewalType = entity.renewalType;
    this.status = entity.status;
    this.startDate = entity.startDate;
    this.endDate = entity.endDate;
    this.maintenanceTypeCorrective = entity.maintenanceTypeCorrective;
    this.maintenanceTypePreventive = entity.maintenanceTypePreventive;
    this.billingFrequency = entity.billingFrequency;
    this.note = entity.note;
    this.attachment = entity.attachment;
    this.postedBy = entity.postedBy;
    this.created = entity.created;
  }

}

export class MaintenanceContractPaymentDeadline extends PaymentDeadline {
  maintenanceContract: Partial<Contract>;
  constructor(entity) {
    super(entity);
    this.maintenanceContract = entity.maintenanceContract;
  }
}

