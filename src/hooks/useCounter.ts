import { useDisclosure } from '@chakra-ui/react'
import { useCallback, useState } from 'react'
import { supabase } from 'src/utils/supabaseClient'

export const useCounter = () => {
  const [count, setCount] = useState<number>(0)
  const [isDisabled, setIsDisabled] = useState<boolean>(false)
  const [comment, setComment] = useState<string | undefined>(undefined)
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const onCloseModal = () => {
    setComment(undefined)
    setImageUrl(undefined)
    onClose()
  }

  const incrementCount = useCallback(async () => {
    setIsDisabled(true)
    const newCount = count + 1

    const { data: cautions, error } = await supabase
      .from('caution')
      .select('*')
      .eq('count', newCount)
      .limit(1)

    if (cautions && cautions.length > 0) {
      const caution = cautions.pop()
      setComment(caution.comment)
      const newImageUrl = await downloadImage(caution.image_url)
      setImageUrl(newImageUrl)
      onOpen()
    }

    setCount(newCount)
    setIsDisabled(false)
  }, [count, onOpen])

  const decrementCount = useCallback(() => {
    setIsDisabled(true)
    if (count <= 0) return

    setCount(count - 1)
    setIsDisabled(false)
  }, [count])

  const downloadImage = async (path: string | null) => {
    if (!path) return

    try {
      const { data, error } = await supabase.storage
        .from('cautions')
        .download(path)
      if (error) {
        throw error
      }
      if (!data) {
        throw new Error('dataがありません')
      }

      return URL.createObjectURL(data)
    } catch (error) {
      if (error instanceof Error) {
        console.log('Error downloading image: ', error.message)
      }
    }
  }

  return {
    count,
    comment,
    imageUrl,
    isOpen,
    onCloseModal,
    isDisabled,
    incrementCount,
    decrementCount,
  }
}
