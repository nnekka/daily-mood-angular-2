declare var M

export class MaterializeService {

  static toast(message: string){
    M.toast({ html: message })
  }
}
