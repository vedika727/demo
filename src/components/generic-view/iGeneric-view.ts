import { IDialogButton } from "./iDialog-action";

export interface IGenericView {
    icon?:string;
    title?:string;
    message?:string;
    isCompact?:boolean;
    positiveButton?:IDialogButton<any>;
    negativeButton?:IDialogButton<any>;
    neutralButton?:IDialogButton<any>;
    ionSpinner?:boolean;
}