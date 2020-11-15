import Head from 'next/head'
import styles from './layout.module.css'
import Link from 'next/link'

export const siteTitle = 'Mattias Hagberg ∞ Frontend Developer'

function ageFromDateOfBirth(dateOfBirth: string): number {
    const today = new Date()
    const birthDate = new Date(dateOfBirth)
    const month = today.getMonth() - birthDate.getMonth()
    let age = today.getFullYear() - birthDate.getFullYear()

    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) age--

    return age;
}

export default function Layout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <div className={styles.container}>
            <Head>
                <meta name="og:title" content={siteTitle} />
                <meta property="og:image" content={`https://og-image.now.sh/${encodeURI(siteTitle)}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.zeit.co%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`} />
                <link rel="icon" href="/favicon.ico" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta charSet="utf-8" />
                <meta content="ie=edge" httpEquiv="x-ua-compatible" />
                <meta content={`Resume of ${ageFromDateOfBirth('1989-01-25')} year old frontend developer from Sweden`} name="description" />
                <meta content="width=device-width, initial-scale=1" name="viewport" />
                <link href="/apple-touch-icon.png" rel="apple-touch-icon" sizes="180x180" />
                <link href="/favicon-32x32.png" rel="icon" sizes="32x32" type="image/png" />
                <link href="/favicon-16x16.png" rel="icon" sizes="16x16" type="image/png" />
                <link href="/manifest.json" rel="manifest" />
                <link color="#5bbad5" href="/safari-pinned-tab.svg" rel="mask-icon" />
                <meta content="mattias.pw" name="apple-mobile-web-app-title" />
                <meta content="mattias.pw" name="application-name" />
                <meta content="#333745" name="theme-color" />
            </Head>

            <main>{children}</main>
        </div>
    )
}
