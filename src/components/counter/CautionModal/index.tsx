import {
  Button,
  chakra,
  ChakraProvider,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
} from '@chakra-ui/react'
import Image from 'next/image'

export const CautionModal = ({
  count,
  comment,
  url,
  isOpen,
  onClose,
}: {
  count: number
  comment: string
  url?: string
  isOpen: boolean
  onClose: () => void
}) => {
  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose} size="xs">
      <ModalOverlay />
      <ModalContent alignItems={'center'}>
        <ModalHeader fontSize="4xl">{count}杯目</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack>
            {url && (
              <chakra.div pos="relative" boxSize={'250px'}>
                <Image src={url} alt="" layout="fill" objectFit="contain" />
              </chakra.div>
            )}
            <Text>{comment}</Text>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="teal"
            variant={'outline'}
            mr={3}
            onClick={onClose}
          >
            Close
          </Button>
          {/* <Button variant="ghost">Secondary Action</Button> */}
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
