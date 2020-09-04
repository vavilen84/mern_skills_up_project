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
                <link rel='stylesheet' type='text/css' href='/css/style.css' />
                <script src="https://code.jquery.com/jquery-3.0.0.js"></script>
                <script src="https://code.jquery.com/jquery-migrate-3.3.1.js"></script>
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
