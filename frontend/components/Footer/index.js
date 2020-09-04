import Link from "next/link";

const Footer = () => (
    <div>
        <Link href='/'><a>Home</a></Link> |
        <Link href='/about' prefetch><a>About</a></Link> |
        <Link href='/contact' prefetch><a>Contact</a></Link>
    </div>
)


export default Footer
