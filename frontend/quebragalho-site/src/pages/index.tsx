/* eslint-disable @next/next/no-img-element */
import Head from 'next/head'
import { MenuHomePage } from '../components/MenuHomePage'
import { Rodape } from '../components/Rodape'
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
          <div className={`${styles.container} ${styles.conteudoContrate}`}>
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
        <section className={styles.oferecaTrabalhoBg}>
          <div className={`${styles.container} ${styles.conteudoContrate}`}>
            <div className={styles.imgProfissional}>
              <img src="img/layout/imgtrabalha.svg" />
            </div>
            <div className={styles.textoTrabalha}>
              <h1>Você trabalha por conta própria?</h1>
              <span>Crie uma conta na nossa plataforma e divulgue seu trabalho para que outras pessoas possam contratá-lo!</span>
              <a href=""><button>criar conta</button></a>
            </div>

          </div>
        </section>
        <section className={styles.sobreQuebraGalhoBG}>
          <div className={`${styles.container} ${styles.conteudoSobreQG}`}>
            <div className={styles.cabecalhoSobre}>
              <h2>Sobre a Quebra Galho</h2>
              <span> Plataforma que conecta profissionais autônomos com pessoas de confiaça que buscam um serviço de qualidade </span>
            </div>
            <div className={styles.boxSobre}>
              <div className={styles.boxMenor}>
                <img src="icons/iconBusca.svg" />
                <h3>Encontre um profissional</h3>
                <span>Busque por profissionais competentes e bem avaliados. </span>
              </div>
              <div className={styles.boxMaior}>
                <img src="icons/iconCombinar.svg" />
                <h3>Combine o serviço</h3>
                <span>Acerte com o profissional a data e valor do serviço. </span>
              </div>
              <div className={styles.boxMenor}>
                <img src="icons/iconAguarde.svg" />
                <h3>E aguarde...</h3>
                <span>Espere pela data combinada e pronto, serviço realizado com sucesso! </span>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer>
        <Rodape/>
      </footer>

      
    </>
  )
}
