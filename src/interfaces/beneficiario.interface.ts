import { ModalidadeEnum } from "./modalidade.interface";
import { SituacaoEnum } from "./situacao.interface";


export interface IBeneficiario {

    id: string,
    nome: string,
    situacao: SituacaoEnum,
    modalidade: ModalidadeEnum,
    cancelamento: Date | null,
    data: Date

} 