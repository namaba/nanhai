import { useState } from 'react'
import { supabase } from '../utils/supabaseClient'

export const Auth = () => {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState<string>('')

  const signInWithGoogle = async () => {
    console.log('signInWithGoogle')
    const { user, session, error } = await supabase.auth.signIn({
      provider: 'google',
    })
    console.log({ user })
    console.log({ session })
    console.log({ error })
    return { user, session, error }
  }

  const handleLogin = async (email: string) => {
    try {
      setLoading(true)
      // const { error } = await supabase.auth.signIn({ email })
      console.log('きた')
      const { user, session, error } = await signInWithGoogle()
      if (error) throw error
      alert('Check your email for the login link!')
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message)
      }
      //   alert(error.error_description || error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="row flex flex-center">
      <div className="col-6 form-widget">
        <h1 className="header">Supabase + Next.js</h1>
        <p className="description">
          Sign in via magic link with your email below
        </p>
        <div>
          <input
            className="inputField"
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <button
            onClick={(e) => {
              e.preventDefault()
              handleLogin(email)
            }}
            className="button block"
            disabled={loading}
          >
            <span>{loading ? 'Loading' : 'Send magic link'}</span>
          </button>
        </div>
      </div>
    </div>
  )
}
