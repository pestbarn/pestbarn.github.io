import Logo from './logo'
import styles from './header.module.css'

export default function Header({}) {
    return (
        <header className={styles.header}>
            <Logo></Logo>
            <div className={styles.box}></div>
        </header>
    )
}
