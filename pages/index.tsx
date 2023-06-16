import React, { FormEvent, ReactElement, useRef } from 'react'
import Layout from '../components/Layouts/indexLayout'
import { useRouter } from 'next/router'

import { NextPageWithLayout } from './_app'

export const Home: NextPageWithLayout = (pageProps) => {

  console.log({pageProps})
  const input = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const handler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if(input.current) {
      router.push(`/game/${input.current.value.trim()}`)
    }
  }

  return (
    <div>
      <form onSubmit={handler} >
        <label htmlFor='session' style={{ color: 'white' }} >
          quiz-sd.vercel.app/game/
          <input ref={input} id="session" name="session" />
        </label>
      </form>
    </div>
  )
}

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}

export default Home