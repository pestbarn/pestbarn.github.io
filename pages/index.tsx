import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import Header from '../components/header'

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className="wrapper">
        <Header />
      </section>
    </Layout>
  )
}
