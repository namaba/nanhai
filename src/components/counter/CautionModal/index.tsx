import {
  Button,
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
              <Image src={url} alt="Avatar" width={'200px'} height={'200px'} />
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
