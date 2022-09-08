import { AddIcon, MinusIcon } from '@chakra-ui/icons'
import {
  Button,
  chakra,
  Heading,
  HStack,
  IconButton,
  VStack,
} from '@chakra-ui/react'
import { Dispatch, SetStateAction } from 'react'
import { useCounter } from 'src/hooks/useCounter'
import { CautionModal } from './CautionModal'

export type Caution = {
  comment: string
  image_url: string
  count: number
}

type CounterProps = {
  drinkPartyId: String | null
  setDrinkPartyId: Dispatch<SetStateAction<String | null>>
}

export const Counter = ({ drinkPartyId, setDrinkPartyId }: CounterProps) => {
  const {
    count,
    comment,
    imageUrl,
    isOpen,
    onCloseModal,
    isDisabled,
    incrementCount,
    decrementCount,
  } = useCounter(drinkPartyId, setDrinkPartyId)

  return (
    <VStack spacing={8}>
      {comment && (
        <CautionModal
          count={count}
          comment={comment}
          url={imageUrl}
          isOpen={isOpen}
          onClose={onCloseModal}
        />
      )}
      <Heading as="h1" size={'4xl'}>
        {count}
        <chakra.span fontSize="2xl" ml={2}>
          杯目
        </chakra.span>
      </Heading>
      <IconButton
        aria-label="increment count"
        colorScheme="teal"
        fontSize={'100px'}
        boxSize="200px"
        icon={<AddIcon />}
        isRound
        onClick={incrementCount}
        isDisabled={isDisabled}
      />
      <HStack spacing={5}>
        <IconButton
          aria-label="increment count"
          colorScheme="teal"
          fontSize={'32px'}
          boxSize="84px"
          variant={'outline'}
          icon={<MinusIcon />}
          isRound
          onClick={decrementCount}
          isDisabled={count <= 0}
        />
        <Button colorScheme="teal" size="lg">
          保存
        </Button>
      </HStack>
    </VStack>
  )
}
