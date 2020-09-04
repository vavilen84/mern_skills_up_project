import Link from 'next/link'

const Nav = () => (
<div className="navbar navbar-fixed-top">
    <div className="navbar-inner">
        <div className="container">
            <a className="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
            </a>
            <a className="brand" href="/">Blog</a>
            <div className="nav-collapse">
                <ul className={'nav'}>
                    <li>
                        <Link href='/'><a>Home</a></Link>
                    </li>
                    <li>
                        <Link href='/about' prefetch><a>About</a></Link>
                    </li>
                    <li>
                        <Link href='/contact' prefetch><a>Contact</a></Link>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</div>
)

export default Nav
