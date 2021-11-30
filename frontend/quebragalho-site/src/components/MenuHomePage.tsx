/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @next/next/no-img-element */
import  Router  from 'next/router';
import { useState } from 'react';
import styles from '../styles/components/MenuHomePage.module.scss'

export function MenuHomePage( props ) {
    const [stringBusca, setStringBusca] = useState({
        string: '',
    });

    function handle(e) {
        const newString = { ...stringBusca };
        newString[e.target.id] = e.target.value;
        setStringBusca(newString);
    }

    return (
        <div className={styles.menuContainerFluid}>
            <div className={styles.menuContainer}>
                <div className={styles.logoMenu}>
                    <a href="/">
                        <img src="img/layout/logo.svg" />
                        <span>Quebra Galho</span>
                    </a>
                </div>
                <div className={styles.buscaSection}>
                    <input
                        onChange={(e) => handle(e)}
                        id="string"
                        value={stringBusca.string} 
                        placeholder="Buscar serviço"
                        type="text"
                    />
                    <div className={styles.botaoBusca} onClick={ () =>
                        Router.push({
                            pathname: '/busca',
                            query: stringBusca
                        })
                    }>
                        <img src="icons/botaoBusca.svg" />
                    </div>
                </div>
                <div className={styles.linksMenu}>
                    <ul>
                        <li><a href="/login">Entrar</a></li>
                        <a href="/criar-usuario"><button>criar conta</button></a>
                    </ul>
                </div>
            </div>
        </div>
    );

}