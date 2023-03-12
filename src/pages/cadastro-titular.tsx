import { Button, Flex, Grid, GridItem, Input, Select, Text } from '@chakra-ui/react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ModalidadeEnum } from '../interfaces/modalidade.interface'
import { SituacaoEnum } from '../interfaces/situacao.interface'
import { ITitularDto } from '../interfaces/titular.interface'
import { cliente } from '../server/axios.client'

export function CadastroTitular(){

    const [nome, setNome] = useState('')

    function onSubmit(){
        const titular: ITitularDto = {
            nome,
            situacao,
            modalidade,
            data: new Date(),
            adesao: new Date()
        }
        cliente.post('titular', titular)
    }

    function setEnumSituacao(situacao: string){
        
        setSituacao(situacao as SituacaoEnum)
        
    }


    function setEnumModalidade(modalidade: string){

        setModalidade(modalidade as ModalidadeEnum)

    }

    const [situacao, setSituacao] = useState(SituacaoEnum.ATIVO)

    const [modalidade, setModalidade] = useState(ModalidadeEnum.COPARTICIPACAO)


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

            <Text bg={'whiteAlpha.900'} textAlign={'center'} padding={2} fontWeight={'bold'} borderRadius={4}>Formulário de cadastro de titular</Text>

            {/* Form */}
            <Grid gridTemplateColumns={'0.2fr 1fr'} rowGap={2}>
                <GridItem>
                    <Flex height={'100%'} alignItems={'center'}>
                        <Text fontWeight={'bold'}>Nome</Text>
                    </Flex>
                </GridItem>

                <GridItem>
                        <Input bg={'whiteAlpha.800'} value={nome} onChange={(event)=>{setNome(event.target.value)}}/>
                        
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
                    <Select bg={'whiteAlpha.800'}  value={modalidade} onChange={(event)=>{setEnumModalidade(event.target.value)}}>
                        <option value={ModalidadeEnum.COPARTICIPACAO} selected>Coparticipação</option>
                        <option value={ModalidadeEnum.MENSALIDADE}>Mensalidade</option>
                    </Select>

                </GridItem>
                   
            
                
            </Grid>

            <Flex justifyContent={'flex-end'}>
                <Flex gap={'3'}>
                    <Button><Link to={'/cadastro-dependente'}>Cadastrar Dependente</Link></Button>
                    <Button colorScheme={'green'} onClick={()=>{onSubmit()}}>Cadastrar</Button>
                </Flex>
            </Flex>

            
        </Flex>
        
        
        
    )
}