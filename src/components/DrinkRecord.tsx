import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { supabase } from 'src/utils/supabaseClient'

type DrinkRecordProps = {
  drinkPartyId: String | null
}

type Drink = {
  count: number
  created_at: string
}

export const DrinkRecord = ({ drinkPartyId }: DrinkRecordProps) => {
  const [drinks, setDrinks] = useState<Drink[]>()

  useEffect(() => {
    getDrinks()
  }, [])

  const getDrinks = async () => {
    let { data: drinks, error } = await supabase
      .from('drinks')
      .select(`count, created_at`)
      .eq('drinking_party_id', drinkPartyId)
    console.log({ drinks })
    if (drinks && drinks.length > 0) {
      setDrinks(drinks)
      const d = drinks[0]
      console.log(d.created_at)
      console.log(new Date(d.created_at))
    }
  }

  if (!drinks) return <></>

  return (
    <TableContainer
      border={'1px'}
      borderColor="gray.200"
      rounded={'md'}
      w="full"
    >
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>杯数</Th>
            <Th>時間</Th>
          </Tr>
        </Thead>
        <Tbody>
          {drinks.map((drink, idx) => (
            <Tr key={idx}>
              <Td>{drink.count}杯目</Td>
              <Td>{drink.created_at}</Td>
            </Tr>
          ))}
          <Tr>
            <Td>1杯目</Td>
            <Td>2022/9/4 19:00</Td>
          </Tr>
          <Tr>
            <Td>2杯目</Td>
            <Td>2022/9/4 19:15</Td>
          </Tr>
          <Tr>
            <Td>3杯目</Td>
            <Td>2022/9/4 19:30</Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  )
}
