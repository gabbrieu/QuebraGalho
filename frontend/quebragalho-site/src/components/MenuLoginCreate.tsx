/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @next/next/no-img-element */
import styles from '../styles/components/MenuLoginCreate.module.scss'
export function MenuLoginCreate() {
    return (
        <div className={styles.menuContainerFluid}>
            <div className={styles.menuContainer}>
                <div className={styles.logoMenu}>
                    <a href='/'>
                        <img src="img/layout/logo.svg" />
                        <span>Quebra Galho</span>
                    </a>
                </div>
            </div>
        </div>
    );

}