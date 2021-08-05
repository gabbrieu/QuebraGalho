/* eslint-disable @next/next/no-img-element */
import styles from '../styles/components/MenuLoginCreate.module.scss'
export function MenuLoginCreate() {
    return (
        <div className={styles.menuContainerFluid}>
            <div className={styles.menuContainer}>
                <div className={styles.logoMenu}>
                    <a href="localhost:3000/index.tsx">
                        <img src="img/layout/logo.svg" />
                        <span>Quebra Galho</span>
                    </a>
                </div>
            </div>
        </div>
    );

}