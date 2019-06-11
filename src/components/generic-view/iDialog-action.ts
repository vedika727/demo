export interface IDialogButton <T>{
    name:string;
    click(data?:T);
    
}