import { ChakraProvider, Container } from '@chakra-ui/react'
import { AppProps } from 'next/app'
import { Layout } from 'src/components/layout'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Container maxW="md">
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Container>
    </ChakraProvider>
  )
}
