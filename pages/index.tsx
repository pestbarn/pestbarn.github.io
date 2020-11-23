import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import Header from '../components/header'
import Content from '../components/content'

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className="wrapper">
        <Header />
        <main className="main">
          <Content id="profile"></Content>
          <Content id="experience"></Content>
          <Content id="social"></Content>
          <Content id="contact"></Content>
        </main>
      </section>
    </Layout>
  )
}
