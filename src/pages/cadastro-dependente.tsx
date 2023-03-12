import { Button, Flex, Grid, GridItem, Input, Select, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { IDependenteDto } from '../interfaces/dependente.interface'
import { ModalidadeEnum } from '../interfaces/modalidade.interface'
import { IPaginet } from '../interfaces/response.interface'
import { SituacaoEnum } from '../interfaces/situacao.interface'
import { ITitular } from '../interfaces/titular.interface'
import { cliente } from '../server/axios.client'

export function CadastroDependente(){

    const [nomeDependente, setNomeDependente] = useState('')


    function onSubmitDependente(){
        const dependente: IDependenteDto = {
          nome: nomeDependente,
          modalidade,
          situacao,
          titularId,
          adesao: new Date(),
          data: new Date()
        }
        cliente.post('dependente', dependente)

    }



    function setEnumSituacao(situacao: string){
        
        setSituacao(situacao as SituacaoEnum)
        
    }


    function setEnumModalidade(modalidade: string){

        setModalidade(modalidade as ModalidadeEnum)

    }

    const [situacao, setSituacao] = useState(SituacaoEnum.ATIVO)

    const [modalidade, setModalidade] = useState(ModalidadeEnum.COPARTICIPACAO)

    const [titularId, setTitularId] = useState('')

    const [titulares, setTitulares] = useState<ITitular[]>([])
    
    useEffect(()=>{
        cliente.get('titular', {params:{
            pageSize: 1000,
            pageIndex: 0

        }}).then(({data}: IPaginet<ITitular>)=>{setTitulares(data.itens)})

    }, [])



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

            <Text bg={'whiteAlpha.900'} textAlign={'center'} padding={2} fontWeight={'bold'} borderRadius={4}>Formulário de cadastro de dependente</Text>

            {/* Form */}
            <Grid gridTemplateColumns={'0.2fr 1fr'} rowGap={2}>
                <GridItem>
                    <Flex height={'100%'} alignItems={'center'}>
                        <Text fontWeight={'bold'}>Nome</Text>
                    </Flex>
                </GridItem>

                <GridItem>
                        <Input bg={'whiteAlpha.800'} value={nomeDependente} onChange={(event)=>{setNomeDependente(event.target.value)}}/>
                </GridItem>

                <GridItem>
                    <Flex height={'100%'} alignItems={'center'}>
                        <Text fontWeight={'bold'}>Situação</Text>
                    </Flex>
                </GridItem>

                <GridItem> 
                    <Select bg={'whiteAlpha.800'}  value={situacao} onChange={(event)=>{setEnumSituacao(event.target.value)}}>
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
                    <Select bg={'whiteAlpha.800'}  onChange={(event)=>{setTitularId(event.target.value)}}>
                        <option></option>
                        {titulares.map(titular=>(
                            <option value={titular.id}>{titular.nome}</option>
                        ))}
                    </Select>
                    
                </GridItem>
                   
            
            </Grid>

            <Flex justifyContent={'flex-end'}>
                <Flex gap={'3'}>
                    <Button colorScheme={'green'} onClick={()=>{onSubmitDependente()}}>Cadastrar</Button>
                </Flex>
            </Flex>

            
        </Flex>
        
        
        
    )
}