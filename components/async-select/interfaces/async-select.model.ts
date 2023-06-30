export class SelectOption {
    label: string;
    id: number;
    disabled?: boolean;
}
  
export class OptionsResult {
    options: SelectOption[];
    loadID: number;
    error: string;
}