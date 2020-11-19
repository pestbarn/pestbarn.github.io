import '../styles/normalize.css'
import '../styles/h5bp.css'
import '../styles/globals.css'
import '../styles/typography.css'
import { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
