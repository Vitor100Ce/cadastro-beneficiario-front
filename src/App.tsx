import { Box, Button, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { IBeneficiario } from './interfaces/beneficiario.interface'
import { IDependente } from './interfaces/dependente.interface'
import { IPaginet } from './interfaces/response.interface'
import { cliente } from './server/axios.client'



export function App(){

  const [beneficiarios, setBeneficiarios] = useState<IBeneficiarioTable[]>([])



  useEffect(()=>{
    setBeneficiarios([])
    // cliente.get('titular', {params:{
    //     pageSize: 1000,
    //     pageIndex: 0

    // }}).then(({data}: IPaginet<ITitular>)=>{
    //   const titulares: IBeneficiarioTable[] = data.itens.map(titular => ({
    //     ...titular, 
    //     data: new Date(titular.data).toLocaleDateString('pt-Br', {day:'2-digit', month:'2-digit', year:'numeric'}),
    //     cancelamento: titular.cancelamento ? new Date(titular.cancelamento).toLocaleDateString('pt-Br', {day:'2-digit', month:'2-digit', year:'numeric'}) : null,
    //     tipoBeneficiario: 'Titular'
    //   })) 
    //   setBeneficiarios([...beneficiarios, ...titulares])})
      

    cliente.get('dependente', {params:{
      pageSize: 1000,
      pageIndex: 0

    }}).then(({data}: IPaginet<IDependente>)=>{

      const beneficiariosFormated: IBeneficiarioTable[] = data.itens.map(beneficiario => ({
        ...beneficiario, 
        data: new Date(beneficiario.data).toLocaleDateString('pt-Br', {day:'2-digit', month:'2-digit', year:'numeric'}),
        cancelamento: beneficiario.cancelamento ? new Date(beneficiario.cancelamento).toLocaleDateString('pt-Br', {day:'2-digit', month:'2-digit', year:'numeric'}) : null,
        tipoBeneficiario: 'Dependente'
      })) 
      setBeneficiarios([...beneficiarios, ...beneficiariosFormated])
  
      console.log(beneficiarios)
    })

    

}, [])



   return(
    <Box 
    bg={'#1D59F4'} 
    height={'100vh'} 
    display={'flex'} 
    alignItems={'center'} 
    justifyContent={'center'}
    flexDirection={'column'}
    gap={8}
    > 
    
      {/* <Box>
        <Image src='./assets/brb-logo-3.png'/>
      </Box> */}
      <Box display={'flex'} flexDirection={'column'} gap={'5'}>


        <Box display={'flex'} gap={'5'}> 
          <Button colorScheme={'blue'} width={'100%'}><Link to={'/cadastro-titular'}>Cadastrar titular</Link></Button>
          <Button colorScheme={'blue'} width={'100%'}><Link to={'cadastro-dependente'}>Cadastrar dependente</Link></Button>
        </Box>
        
      </Box>

      <TableContainer bg={'whiteAlpha.800'} borderRadius={4}>

        <Table> 
          <Thead>
            <Tr>
              <Th>Data Cadastro</Th>
              <Th>Nome</Th>
              <Th>Tipo Beneficiário</Th>
              <Th>Situação</Th>
              <Th>Modalidade</Th>
              <Th>Data Adesão</Th>
              <Th>Data Cancelamento</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
           {
            beneficiarios.map(beneficiario => (
              <Tr>
              <Td>{beneficiario.data}</Td>
              <Td>{beneficiario.nome}</Td>
              <Td>{beneficiario.tipoBeneficiario}</Td>
              <Td>{beneficiario.situacao}</Td>
              <Td>{beneficiario.modalidade}</Td>
              <Td>{beneficiario.data}</Td>
              <Td>{beneficiario.cancelamento}</Td>
              <Td>{beneficiario.tipoBeneficiario === 'Titular' ? (<Button><Link to={'/edicao-titular'} state={{id:beneficiario.id}}>Editar</Link></Button>) : (<Button><Link to={'/edicao-dependente'} state={{id:beneficiario.id}}>Editar</Link></Button>)}</Td>
            </Tr>
            ))
           }
          </Tbody>
        </Table>

      </TableContainer>



    </Box>
   )

}

interface IBeneficiarioTable extends Omit<IBeneficiario, 'cancelamento' | 'data'> {

    cancelamento: string | null,
    data: string,
    tipoBeneficiario: string

}