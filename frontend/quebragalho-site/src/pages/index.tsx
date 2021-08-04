/* eslint-disable @next/next/no-img-element */
import Head from 'next/head'
import Image from 'next/image'
import { MenuHomePage } from '../components/MenuHomePage'
import styles from '../styles/pages/Home.module.scss'

export default function Home() {
  return (
    <>
      <Head>
        <title>Quebra Galho | Inicio</title>
        <meta name="description" content="Projeto Quebra Galho" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MenuHomePage />

      <main>
        <section className={styles.contrateProfissionalBg}>
          <div className={`${styles.container} ${styles.conteudoContrateProfissional}`}>
            <div className={styles.textoContrate}>
              <h1>Contrate Profissionais de qualidade! </h1>
              <span>Encontre os melhores profissionais e que estejam mais próximos de você.</span>
              <a href=""><button>criar conta</button></a>
            </div>
            <div className={styles.imgProfissional}>
              <img src="img/layout/imgprofissional.svg" />
            </div>
          </div>

        </section>
      </main>


    </>
  )
}
