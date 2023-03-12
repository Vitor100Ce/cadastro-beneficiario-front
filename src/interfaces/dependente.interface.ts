import { IBeneficiario } from "./beneficiario.interface"
import { ModalidadeEnum } from "./modalidade.interface"
import { SituacaoEnum } from "./situacao.interface"


export interface IDependenteDto {
    nome: string,
    situacao: SituacaoEnum,
    modalidade: ModalidadeEnum,
    adesao: Date,
    data: Date,
    titularId: string
  }


  export interface IDependente extends IBeneficiario {
      
    titularId: string
  }


  export interface IDependenteEdicaoDto {

    nome?: string,
    situacao?: SituacaoEnum
    modalidade?: ModalidadeEnum
    titularId?: string


}