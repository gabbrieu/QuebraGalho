/* eslint-disable @next/next/no-img-element */
import styles from '../styles/components/MenuHomePage.module.scss'
export function MenuHomePage() {
    return (
        <div className={styles.menuContainerFluid}>
            <div className={styles.menuContainer}>
                <div className={styles.logoMenu}>
                    <a href="localhost:3000/index.tsx">
                        <img src="img/layout/logo.svg" />
                        <span>Quebra Galho</span>
                    </a>
                </div>
                <div className={styles.buscaSection}>
                    <input placeholder="Buscar serviço"/>
                    <div className={styles.botaoBusca}>
                        <img src="icons/botaoBusca.svg" />
                    </div>
                </div>
                <div className={styles.linksMenu}>
                    <ul>
                        <li><a href="#">Como Funciona</a></li>
                        <li><a href="#">Entrar</a></li>
                        <a href="#"><button>criar conta</button></a>
                    </ul>
                </div>
            </div>
        </div>
    );

}