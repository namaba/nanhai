import { Box, chakra, VStack } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabaseClient'
import { Auth } from '../components/Auth'
import Account from '../components/Account'
import { Session } from '@supabase/supabase-js'
import { Counter } from 'src/components/counter'
import { DrinkRecord } from 'src/components/DrinkRecord'

export default function Home() {
  const [session, setSession] = useState<Session | null>(null)
  const [drinkPartyId, setDrinkPartyId] = useState<String | null>(null)

  useEffect(() => {
    setSession(supabase.auth.session())

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (
    <div className="container" style={{ padding: '50px 0 100px 0' }}>
      {!session ? (
        <Auth />
      ) : (
        <VStack spacing={8}>
          <Counter
            drinkPartyId={drinkPartyId}
            setDrinkPartyId={setDrinkPartyId}
          />
          {drinkPartyId && <DrinkRecord drinkPartyId={drinkPartyId} />}
        </VStack>
        // <Account key={session.user!.id} session={session} />
      )}
    </div>
  )
}
