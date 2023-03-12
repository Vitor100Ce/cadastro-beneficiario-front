export interface IPaginet<ITypeItens>{
    data: {itens: ITypeItens[], totalCount: number}

}

export interface IGenericResponse<IGeneric>{
    data: IGeneric
}