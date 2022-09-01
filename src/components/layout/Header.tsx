import { chakra, Heading } from '@chakra-ui/react'
import Link from 'next/link'

export const Header = () => {
  return (
    <Heading
      as="h1"
      color="purple.900"
      py={2}
      textAlign="center"
      borderBottom={1}
      borderStyle={'solid'}
      borderColor={'gray.200'}
    >
      <Link href="/">
        <a>
          何杯目？
          <chakra.span d="block" fontSize={'12px'}>
            お酒カウンター
          </chakra.span>
        </a>
      </Link>
    </Heading>
  )
}
