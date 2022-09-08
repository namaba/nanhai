import { useDisclosure } from '@chakra-ui/react'
import { Dispatch, SetStateAction, useCallback, useState } from 'react'
import { supabase } from 'src/utils/supabaseClient'

export const useCounter = (
  drinkPartyId: String | null,
  setDrinkPartyId: Dispatch<SetStateAction<String | null>>
) => {
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

  // drinking_partyレコード作成
  const saveDrinkingParty = useCallback(async () => {
    const { data, error } = await supabase
      .from('drinking_parties')
      .insert([{}])
      .single()

    // TODO: errorの処理を追加する
    setDrinkPartyId(data.id)
    return data.id
  }, [setDrinkPartyId])

  const saveDrink = useCallback(
    async (newCount: number) => {
      if (newCount > 1) {
        await supabase
          .from('drinks')
          .insert([{ count: newCount, drinking_party_id: drinkPartyId }])
      } else {
        const newDrinkPartyId = await saveDrinkingParty()
        await supabase
          .from('drinks')
          .insert([{ count: newCount, drinking_party_id: newDrinkPartyId }])
      }
    },
    [drinkPartyId, saveDrinkingParty]
  )

  const incrementCount = useCallback(async () => {
    setIsDisabled(true)
    const newCount = count + 1

    // モーダル表示用データ取得
    const { data: cautions, error } = await supabase
      .from('caution')
      .select('*')
      .eq('count', newCount)
      .limit(1)

    // データがあればモーダル表示
    if (cautions && cautions.length > 0) {
      const caution = cautions.pop()
      setComment(caution.comment)
      const newImageUrl = await downloadImage(caution.image_url)
      setImageUrl(newImageUrl)
      onOpen()
    }

    // 杯数を保存
    await saveDrink(newCount)
    setCount(newCount)
    setIsDisabled(false)
  }, [count, onOpen, saveDrink])

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
