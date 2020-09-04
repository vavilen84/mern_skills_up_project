import Link from 'next/link'

const Nav = () => (
  <div>
    <Link href='/'><a>Home</a></Link> |
    <Link href='/about' prefetch><a>About</a></Link> |
    <Link href='/contact' prefetch><a>Contact</a></Link>
  </div>
)

export default Nav
