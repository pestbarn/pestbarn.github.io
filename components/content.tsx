import Profile from './content/profile'
import Experience from './content/experience'
import Social from './content/social'
import Contact from './content/contact'

export default function Content(props) {
    const part = props.id

    if (part === 'profile') return <Profile />
    if (part === 'experience') return <Experience />
    if (part === 'social') return <Social />
    if (part === 'contact') return <Contact />
}
