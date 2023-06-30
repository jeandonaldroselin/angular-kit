import { FilterFormModalOutput } from "../../components/filter-form-modal/interfaces/filter-form-modal.model";
import { BasePaginatedResponse } from "../../models/request.model";
import { Customer } from "../interfaces/customer.model";
import { Contract, RenewalTypeEnum, RenewalTypeEnumMapping, StatusEnum, StatusEnumMapping } from "../interfaces/contract.model"

export const filterForm = (dataSourceFn: Function): FilterFormModalOutput<Contract> => ({
  data: null,
  formConfig: {
    titleContent: 'Filtrer les contrats',
    cancelButtonText: 'Annuler',
    confirmButtonText: 'Appliquer',
    rows: [
      {
        fields: [
          { name: 'content', label: 'Recherche globale (client, description, objet)', icon: 'mat:search', value: null, type: 'text', colSize: 12 },
        ]
      },
      { fields: [
          { name: 'number', label: 'Numéro', icon: 'mat:tag', value: null, type: 'text', colSize: 12 },
      ] },
      {
        fields: [
          { name: 'customer[0]', label: 'Client', icon: 'mat:person', value: null, type: 'asyncSelect', colSize: 12, hintText: null,
          config: { asyncSelect: {
            dataSourceMappingFn: (data: BasePaginatedResponse<Customer>) => data.data.content.map((item) => ({ id: item.id, label: item.name })),
            dataSourceFn,
            loadingMethod: 'ondisplay',
            hasEmptyValue: true
          } } }
        ]
      },
      { fields: [
          { name: 'note', label: 'Notes', icon: 'mat:subject', value: null, type: 'text', colSize: 12 },
      ] },
      { fields: [
          { name: 'status', label: 'Statut', icon: 'mat:check', value: null, type: 'select', colSize: 4,
              config: { select: {
                options : [
                  { label: StatusEnumMapping[StatusEnum.new], value: StatusEnum.new },
                  { label: StatusEnumMapping[StatusEnum.closed], value: StatusEnum.closed },
                ],
                hasEmptyValue: true
              } }
          },
          { name: 'renewalType', label: 'Renouvellement', icon: 'mat:refresh', value: null, type: 'select', colSize: 4,
              config: { select: {
                options : [
                  { label: RenewalTypeEnumMapping[RenewalTypeEnum.on_demand], value: RenewalTypeEnum.on_demand },
                  { label: RenewalTypeEnumMapping[RenewalTypeEnum.automatic], value: RenewalTypeEnum.automatic },
                ],
                hasEmptyValue: true
              } }
          },
      ] },
      { fields: [
          { name: 'startDate[left_date]', label: `Date de début (min)`, icon: 'mat:calendar_today', value: null, type: 'date', colSize: 4 },
          { name: 'startDate[right_date]', label: `Date de début (max)`, icon: 'mat:calendar_today', value: null, type: 'date', colSize: 4 },
      ] },
      { fields: [
          { name: 'endDate[left_date]', label: `Date de fin (min)`, icon: 'mat:calendar_today', value: null, type: 'date', colSize: 4 },
          { name: 'endDate[right_date]', label: `Date de fin (max)`, icon: 'mat:calendar_today', value: null, type: 'date', colSize: 4 },
      ] },
      { fields: [
          { name: 'created[left_date]', label: `Date de création (min)`, icon: 'mat:calendar_today', value: null, type: 'date', colSize: 4 },
          { name: 'created[right_date]', label: `Date de création (max)`, icon: 'mat:calendar_today', value: null, type: 'date', colSize: 4 },
      ] },
    ]
  },
  formGroup: null
});