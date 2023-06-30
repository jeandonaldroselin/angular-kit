import { Validators } from "@angular/forms"
import { FormModalOutput } from "../../components/form-modal/interfaces/form-modal.model";
import { BasePaginatedResponse } from "../../models/request.model";
import { Customer } from "../interfaces/customer.model";
import { Contract, RenewalTypeEnum, RenewalTypeEnumMapping } from "../interfaces/contract.model"

export const createForm = (customerDataSourceFn: Function): FormModalOutput<Contract> => ({
  data: null,
  formConfig: {
    titleType: 'simple',
    titleContent: 'Nouveau contrat',
    enctype: 'multipart/form-data',
    cancelButtonText: 'Annuler',
    confirmButtonText: 'Créer',
    rows: [
      { fields: [
        { name: 'number', label: 'Numéro', icon: 'mat:subject', value: null, type: 'text', colSize: 1,
          validators: {
            'required' : { validator: Validators.required, isAsync: false, errorMessage: 'Veuillez renseigner un numéro' },             
          }
        },
      ] },
      { fields: [
        { name: 'customer', label: 'Client', icon: 'mat:person', value: null, type: 'asyncSelect', colSize: 1,
          validators: {
            'required' : { validator: Validators.required, isAsync: false, errorMessage: 'Veuillez renseigner un client' }
          },
          config: { asyncSelect: {
            dataSourceMappingFn: (data: BasePaginatedResponse<Customer>) => data.data.content.map((item) => ({ id: item.id, label: item.name })),
            dataSourceFn: customerDataSourceFn,
            loadingMethod: 'ondisplay',
          } } },
      ] },
      {
        fields: [
          { name: 'renewalType', label: 'Renouvellement', icon: 'mat:refresh', value: null, type: 'select', disabled: true, colSize: 1,
            config: { select: {
              options : [
                { label: RenewalTypeEnumMapping[RenewalTypeEnum.on_demand], value: RenewalTypeEnum.on_demand },
                { label: RenewalTypeEnumMapping[RenewalTypeEnum.automatic], value: RenewalTypeEnum.automatic },
              ] 
            } } }
        ]
      },
      { fields: [
        { name: 'amount', label: 'Montant', icon: 'mat:euro_symbol', value: null, type: 'number', colSize: 1,
          validators: {
            'required' : { validator: Validators.required, isAsync: false, errorMessage: 'Veuillez renseigner un montant' }
          }
        },
      ] },
      { fields: [
        { name: 'note', label: 'Note', value: null, type: 'textarea', colSize: 1 },
      ] },
      { fields: [
        { name: 'attachment', label: 'Pièces jointes', icon: 'mat:cloud_upload', value: [], type: 'file', colSize: 1, config: { file: { multiple: true } },
          validators: {
            'required' : { validator: Validators.required, isAsync: false, errorMessage: 'Veuillez renseigner une pièce jointe' }
          }
        },
      ] },
    ]
  },
  formGroup: null
});