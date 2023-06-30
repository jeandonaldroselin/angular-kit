export interface Attachment {
    id: number;
    description: string;
    name: string;
    extension: string;
    mimeType: string;
    previewUrl: string;
    downloadUrl: string;
}

export interface Author {
    fullName: string;
    id: number;
    isYou: boolean;
}

export class PaymentDeadline {
    id: number
    label: 0;
    description: string;
    quantity: string;
    price: string;
    totalPrice: string;
    paymentDate: string;
    isBilled: true;
  
    constructor(entity) {
      this.id = entity.id;
      this.label = entity.label;
      this.description = entity.description;
      this.quantity = entity.quantity;
      this.price = entity.price;
      this.totalPrice = entity.totalPrice;
      this.paymentDate = entity.paymentDate;
      this.isBilled = entity.isBilled;
    }
}

export enum TypeEnum {
  'empty' = '',
  'after_sales' = 'after_sales',
  'contractual' = 'contractual',
  'work' = 'work',
}

export const TypeEnumMapping = {
  'after_sales': 'S. A. V.',
  'contractual': 'Contrat',
  'work': 'Travaux',
}