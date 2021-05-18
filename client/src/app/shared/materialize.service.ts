import {ElementRef} from "@angular/core";

declare var M

export interface MaterialInstance {
  open?(): void;
  close?(): void;
  destroy?(): void;
}

export class MaterializeService {

  static toast(message: string){
    M.toast({ html: message })
  }

  static initTooltip(ref: ElementRef): MaterialInstance{
    return M.Tooltip.init(ref.nativeElement)
  }

}
