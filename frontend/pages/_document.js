import Document, { Head, Main, NextScript } from 'next/document'

export default class SiteDocument extends Document {
    render () {
        return (
            <html>
            <Head>
                <meta charSet='utf-8' />
                <meta name='viewport' content='initial-scale=1.0, width=device-width' />
                <link rel='stylesheet' type='text/css' href='/css/bootstrap.min.css' />
                <link rel='stylesheet' type='text/css' href='/css/bootstrap-responsive.min.css' />
                <script src="/js/bootstrap.min.js"/>
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
