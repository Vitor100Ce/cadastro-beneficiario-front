import { Button, Flex, Grid, GridItem, Input, Select, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { IDependente, IDependenteEdicaoDto } from '../interfaces/dependente.interface'
import { ModalidadeEnum } from '../interfaces/modalidade.interface'
import { IGenericResponse, IPaginet } from '../interfaces/response.interface'
import { SituacaoEnum } from '../interfaces/situacao.interface'
import { ITitular } from '../interfaces/titular.interface'
import { cliente } from '../server/axios.client'

export function EdicaoDependente(){
    const {state} = useLocation()

    useEffect(()=> {
        cliente.get(`dependente/${state.id}`).then(({data}:IGenericResponse<IDependente>)=>{
                setNomeDependenteEdit(data.nome)
                setEnumSituacao(data.situacao)
                setEnumModalidade(data.modalidade)
                setTitularId(data.titularId)
        })

        cliente.get('titular', {params:{pageSize: 1000, pageIndex: 0}}).then(({data}: IPaginet<ITitular>) => {
            setTitulares(data.itens)
        } )
            
    }, [])

    const [titulares, setTitulares] = useState<ITitular[]>([])
 

    /**
     * TODO
     * 
     * Pesquisar titular vinculado ao dependente
     * Pesquisar todos os titulares
     * 
     */

    const [nomeDependenteEdit, setNomeDependenteEdit] = useState('')

    const [titularId, setTitularId] = useState('')

    function setEnumSituacao(situacao: string){
        
        setSituacao(situacao as SituacaoEnum)
        
    }


    function setEnumModalidade(modalidade: string){

        setModalidade(modalidade as ModalidadeEnum)

    }

    const [situacao, setSituacao] = useState(SituacaoEnum.ATIVO)

    const [modalidade, setModalidade] = useState(ModalidadeEnum.COPARTICIPACAO)



    function onSubmitDependenteEdit(){
        const DependenteEdit: IDependenteEdicaoDto = {
            nome: nomeDependenteEdit,
            situacao,
            modalidade,
            titularId

        }
        cliente.put(`dependente/${state.id}`, DependenteEdit)
    }



  
    return(
        <Flex 
        bg={'#1D59F4'}
        height={'100vh'}
        direction={'column'}
        paddingLeft={'25%'}
        paddingRight={'25%'}
        justifyContent={'center'}
        gap={'10'}
        >

            {/* header */}
            <Flex justifyContent={'flex-end'}>
                <Button><Link to={'/'}>Home</Link></Button>
            </Flex>

            <Text bg={'whiteAlpha.900'} textAlign={'center'} padding={2} fontWeight={'bold'} borderRadius={4}>Editar dados dependente</Text>

            {/* Form */}
            <Grid gridTemplateColumns={'0.2fr 1fr'} rowGap={2}>
                <GridItem>
                    <Flex height={'100%'} alignItems={'center'}>
                        <Text fontWeight={'bold'}>Nome</Text>
                    </Flex>
                </GridItem>

                <GridItem>
                        <Input bg={'whiteAlpha.800'} value={nomeDependenteEdit} onChange={(event)=>{setNomeDependenteEdit(event.target.value)}}/>
                </GridItem>

                <GridItem>
                    <Flex height={'100%'} alignItems={'center'}>
                        <Text fontWeight={'bold'}>Situação</Text>
                    </Flex>
                </GridItem>

                <GridItem> 
                    <Select bg={'whiteAlpha.800'} value={situacao} onChange={(event)=>{setEnumSituacao(event.target.value)}}>
                        <option selected value={SituacaoEnum.ATIVO}>Ativo</option>
                        <option value={SituacaoEnum.INATIVO}>Inativo</option> 

                    </Select>
                </GridItem>
                   
            
                <GridItem>
                    <Flex height={'100%'} alignItems={'center'}>
                        <Text fontWeight={'bold'}>Modalidade</Text>
                    </Flex>
                </GridItem>

                <GridItem> 
                    <Select bg={'whiteAlpha.800'} value={modalidade} onChange={(event)=>{setEnumModalidade(event.target.value)}}>
                        <option selected value={ModalidadeEnum.COPARTICIPACAO}>Coparticipação</option>
                        <option value={ModalidadeEnum.MENSALIDADE}>Mensalidade</option>

                    </Select>
                </GridItem>

                <GridItem>
                    <Flex height={'100%'} alignItems={'center'}>
                        <Text fontWeight={'bold'}>Titular</Text>
                    </Flex>
                </GridItem>

                <GridItem> 
                    <Select value={titularId} bg={'whiteAlpha.800'}  onChange={(event)=>{setTitularId(event.target.value)}}>
                        {titulares.map(titular=>(
                            <option value={titular.id}>{titular.nome}</option>
                        ))}
                    </Select>
                    
                </GridItem>
                   
        
            </Grid>

            <Flex justifyContent={'flex-end'}>
                <Flex gap={'3'}>
                    <Button colorScheme={'green'} onClick={()=>{onSubmitDependenteEdit()}}>Salvar</Button>
                </Flex>
            </Flex>

            
        </Flex>
        
        
        
    )
}