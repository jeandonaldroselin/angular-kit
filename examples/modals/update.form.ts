import { Validators } from "@angular/forms"
import { MatDialogRef } from "@angular/material/dialog";
import { FormModalOutput } from "../../components/form-modal/interfaces/form-modal.model";
import { FormModalComponent } from "../../components/form-modal/form-modal.component";
import { BasePaginatedResponse } from "../../models/request.model";
import { Customer } from "../interfaces/customer.model";
import { StatusEnumMapping, StatusEnum, Contract, RenewalTypeEnumMapping, RenewalTypeEnum } from "../interfaces/contract.model"

export const updateForm = (data: Contract,
                           customerDataSourceFn: Function,
                           isVisible: (item: Contract, actionName: string) => boolean,
                           deleteItem: (item: Contract) => void
    ): FormModalOutput<Contract> => ({
  data: data,
  formConfig: {
    titleType: 'simple',
    titleContent: `Contrat #${data.number}`,
    enctype: 'multipart/form-data',
    options: [
      { label : 'Supprimer',
        icon: 'mat:delete',
        click: (dialogRef: MatDialogRef<FormModalComponent<Contract>>) => {
          dialogRef.close();
          deleteItem(data);
        },
        isVisible: () => isVisible(data, 'Supprimer')
      },
    ],
    rows: [
      { fields: [
        { name: 'id', value: data?.id, type: 'hidden' },
      ] },
      { fields: [
        { name: 'number', label: 'Numéro', icon: 'mat:subject', value: data?.number, type: 'text', colSize: 1,
          validators: {
            'required' : { validator: Validators.required, isAsync: false, errorMessage: 'Veuillez renseigner un numéro' },
          }
        },
      ] },
      { fields: [
        { name: 'customer', label: 'Client', icon: 'mat:person', value: data?.customer?.id, type: 'asyncSelect', colSize: 1,
          validators: {
            'required' : { validator: Validators.required, isAsync: false, errorMessage: 'Veuillez renseigner un client' }
          },
          config: { asyncSelect: {
            dataSourceMappingFn: (data: BasePaginatedResponse<Customer>) => data.data.content.map((item) => ({ id: item.id, label: item.name })),
            dataSourceFn: customerDataSourceFn 
          } } },
      ] },
      { fields: [
        { name: 'amount', label: 'Montant', icon: 'mat:euro_symbol', value: data?.amount, type: 'number', colSize: 1,
          validators: {
            'required' : { validator: Validators.required, isAsync: false, errorMessage: 'Veuillez renseigner un montant' }
          }
        },
      ] },
      { fields: [
        { name: 'status', label: 'Statut', icon: 'mat:check', value: data?.status, type: 'select', colSize: 4, disabled: true,
          config: { select: {
            options : [
              { label: StatusEnumMapping[StatusEnum.new], value: StatusEnum.new },
              { label: StatusEnumMapping[StatusEnum.to_bill], value: StatusEnum.to_bill },
              { label: StatusEnumMapping[StatusEnum.closed], value: StatusEnum.closed },
            ] 
          } } },
        { name: 'renewalType', label: 'Renouvellement', icon: 'mat:refresh', value: data?.renewalType, type: 'select', disabled: true, colSize: 4,
            config: { select: {
              options : [
                { label: RenewalTypeEnumMapping[RenewalTypeEnum.on_demand], value: RenewalTypeEnum.on_demand },
                { label: RenewalTypeEnumMapping[RenewalTypeEnum.automatic], value: RenewalTypeEnum.automatic },
              ] 
            } } },
      ] },
      { fields: [
        { name: 'note', label: 'Notes', value: data.note, type: 'textarea', colSize: 1 },
      ] },
      { fields: [
        { name: 'attachment', label: 'Pièces jointes', icon: 'mat:cloud_upload', value: data?.attachment, type: 'file', config: { file: { multiple: true } }, colSize: 1 },
      ] },
    ],
    cancelButtonText: 'Annuler',
    confirmButtonText: 'Mettre à jour'
  },
  formGroup: null
});