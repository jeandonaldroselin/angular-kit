import { ColumnType } from "@vex/interfaces/table-column.interface";
import { Author } from "../../models/common-domain.model";
import { Customer } from "../interfaces/customer.model";
import { StatusEnum, StatusEnumMapping, RenewalTypeEnum, RenewalTypeEnumMapping, Contract } from "../interfaces/contract.model";

export const aioTableConfig = <T>(
    updateItem: Function,
    onExport: Function,
    deleteItem: Function,
    isVisible: (item: T, actionName: string) => boolean,
  ): ColumnType<Contract> => ({
    pageTitle: 'Contrats',
    pageCrumbs: [{label: 'Tableau de bord', path: '/dashboard'}, {label: 'Contrats', path: '/dashboard/contract'}],
    entityNameSingular: 'Contrat',
    entityNamePlurial: 'Contrats',
    columns: [
      { label: 'Checkbox', property: 'checkbox', type: 'checkbox', visible: true, isRowClickActive: false },
      { label: 'Numéro', property: 'number', type: 'text', visible: true, sortable: true },
      { label: 'Date de début', property: 'startDate', type: 'date', visible: true, sortable: true,
        config: {
          date: {
            format: 'dd/MM/Y'
          }
        }, cssClasses: ['text-secondary', 'font-medium']
      },
      { label: 'Date de fin', property: 'endDate', type: 'date', visible: false, sortable: true,
        config: {
          date: {
            format: 'dd/MM/Y'
          }
        }, cssClasses: ['text-secondary', 'font-medium']
      },
      { label: 'Client', property: 'customer', type: 'object', visible: true, isRowClickActive: false, config: { object: { format: (customer: Customer) => (`${customer.name}`) } } },
      { label: 'Statut', property: 'status', type: 'enum', visible: true, sortable: true,
        config: {
          enum : {
            [StatusEnum.empty] : { key : StatusEnum.empty, text: StatusEnumMapping[StatusEnum.empty], cssClass: ''},
            [StatusEnum.new] : { key : StatusEnum.new, text: StatusEnumMapping[StatusEnum.new], cssClass: 'text-green bg-green-light'},
            [StatusEnum.to_bill] : { key : StatusEnum.to_bill, text: StatusEnumMapping[StatusEnum.to_bill], cssClass: 'text-cyan bg-cyan-light'},
            [StatusEnum.closed] : { key : StatusEnum.closed, text: StatusEnumMapping[StatusEnum.closed], cssClass: 'text-gray bg-gray-light'},
          }
        }
      },
      { label: 'Montant', property: 'amount', type: 'amount', visible: true, sortable: true },
      { label: 'Notes', property: 'note', type: 'text', visible: false },
      { label: 'Consommation', property: 'consummedInterventionHours', type: 'object', visible: true, sortable: false, cssClasses: ['text-center'], config: { object: { format: (consummedInterventionHours: number, contract: Contract) => (`${consummedInterventionHours} / ${contract.soldInterventionHours}h`) } } },
      { label: 'Renouvellement', property: 'renewalType', type: 'enum', visible: true, sortable: true,
        config: {
          enum : {
            [RenewalTypeEnum.empty] : { key : StatusEnum.empty, text: RenewalTypeEnumMapping[RenewalTypeEnum.empty], cssClass: ''},
            [RenewalTypeEnum.on_demand] : { key : StatusEnum.new, text: RenewalTypeEnumMapping[RenewalTypeEnum.on_demand], cssClass: 'text-orange bg-orange-light'},
            [RenewalTypeEnum.automatic] : { key : StatusEnum.closed, text: RenewalTypeEnumMapping[RenewalTypeEnum.automatic], cssClass: 'text-green bg-green-light'},
          }
        }
      },
      { label: 'Pièces jointes', property: 'attachment', type: 'attachment', visible: true, isRowClickActive: false, config: { attachment: { maxLength: 30 }} },
      { label: 'Crée par', property: 'postedBy', type: 'object', visible: true, isRowClickActive: false, config: { object: { format: (customer: Author) => (`${customer.fullName}`) } } },
      { label: 'Crée le', property: 'created', type: 'date', visible: true, sortable: true,
        config: {
          date: {
            format: 'dd/MM/Y HH:mm'
          }
        }, cssClasses: ['text-secondary', 'font-medium']
      },
      { label: 'Actions', property: 'actions', type: 'actions', visible: true,
        config : { actions : { data : [
          { icon: 'mat:edit', label: 'Modifier', click: ($event) => updateItem($event), isVisible: (item: T) => isVisible(item, 'Modifier') },
          { icon: 'mat:delete', label: 'Supprimer', click: ($event) => deleteItem($event), isVisible: (item: T) => isVisible(item, 'Supprimer') },
        ] } }
      },
    ],
    exportOptions: [
      { label: 'Export Excel', format: 'excel', click: () => onExport('excel') },
      { label: 'Export PDF', format: 'pdf', click: () => onExport('pdf') },
    ],
    addToolText: 'Créer un contrat',
});
