import { IDialogButton } from "../../components/generic-view/iDialog-action";

export interface ITooltipView<T> {
    toolTipData:ToolTipInfo[];
    actionCTA?:IDialogButton<any>;
    toolTipKey:string;
}

export class ToolTipInfo{
    image:string;
    title?:string;
    subtitle?:string;
    imageDesc:string;
}