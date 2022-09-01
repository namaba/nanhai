import { ChakraProvider, Container } from '@chakra-ui/react'
import { AppProps } from 'next/app'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Container maxW="md">
        <Component {...pageProps} />
      </Container>
    </ChakraProvider>
  )
}
