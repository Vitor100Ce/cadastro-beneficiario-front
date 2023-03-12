import { IBeneficiario } from "./beneficiario.interface"
import { ModalidadeEnum } from "./modalidade.interface"
import { SituacaoEnum } from "./situacao.interface"

export interface ITitularDto   {
    nome: string,
    situacao: SituacaoEnum
    modalidade: ModalidadeEnum
    adesao: Date
    data: Date
  }

export interface ITitular extends IBeneficiario{

    adesao: Date
   
}

export interface ITitularEdicaoDto {

    nome?: string,
    situacao?: SituacaoEnum
    modalidade?: ModalidadeEnum


}