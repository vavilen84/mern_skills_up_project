import Head from 'next/head'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

export default ({children, title = 'This is the default title'}) => (
    <div>
        <Head>
            <title>{title}</title>
        </Head>
        <Nav/>

        <div className="container content">
            {children}
        </div>

        <Footer>
            Footer
        </Footer>
    </div>
)
