export interface ConfirmModalData {
    titleContent: string;
    bodyContent: string;
    cancelButtonText?: string;
    confirmButtonText: string;
}

export enum ConfirmModalChoiceEnum {
    confirm = 'confirm',
    cancel = 'cancel',
}