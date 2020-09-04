import Document, { Head, Main, NextScript } from 'next/document'

export default class SiteDocument extends Document {
    render () {
        return (
            <html>
            <Head>
                <meta charSet='utf-8' />
                <meta name='viewport' content='initial-scale=1.0, width=device-width' />
                <link rel='stylesheet' type='text/css' href='https://cdnjs.cloudflare.com/ajax/libs/sanitize.css/2.0.0/sanitize.min.css' />
                <link rel='stylesheet' type='text/css' href='https://cdnjs.cloudflare.com/ajax/libs/tachyons/4.7.4/tachyons.min.css' />
            </Head>
            <body>
            <div className='root'>
                <Main />
            </div>
            <NextScript />
            </body>
            </html>
        )
    }
}
