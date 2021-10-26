/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @next/next/no-img-element */
import Head from 'next/head';
import { MenuLogged } from '../components/MenuLogged';
import styles from '../styles/pages/Perfilusuario.module.scss';

export default function PerfilUsuario() {
  return (
    <>
      <Head>
        <title>Quebra Galho | Inicio</title>
        <meta name='description' content='Projeto Quebra Galho' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <MenuLogged />

      <main>
        <div className={styles.background}>
          <div className={styles.container}>
            <div className={styles.leftSide}>
              <section className={styles.numerosPlataforma}>
                <h3> Números na plataforma </h3>
                <div className={styles.numeroPlataforma}>
                  <span>Serviços realizados: </span>
                  <span>20</span>
                </div>
                <div className={styles.numeroPlataforma}>
                  <span>Nota média dos serviços prestados: </span>
                  <span>4.0/5</span>
                </div>
              </section>
            </div>
            <div className={styles.rightSide}>
              <div className={styles.servicosUsuario}>
                <h2>Contrate meus serviços</h2>
                <div className={styles.cardsServicos}>
                  <div className={styles.cardServico}>
                    <img src='img/content/servico.png' />
                    <h3> Serviço de Pedreiro</h3>
                    <span>
                      Presto serviços de pedreiro para casas e apartamentos.
                      Valores a combinar.
                    </span>
                    <div className={styles.buttonsCard}>
                      <button>
                        <span>EXIBIR DETALHES</span>
                        <img src='icons/iconPlus.svg' />
                      </button>
                      <button>
                        <span>COMBINAR SERVIÇO</span>
                        <img src='icons/iconCombinarButton.svg' />
                      </button>
                    </div>
                  </div>
                  <div className={styles.cardServico}>
                    <img src='img/content/servico.png' />
                    <h3> Serviço de Pedreiro</h3>
                    <span>
                      Presto serviços de pedreiro para casas e apartamentos.
                      Valores a combinar.
                    </span>
                    <div className={styles.buttonsCard}>
                      <button>
                        <span>EXIBIR DETALHES</span>
                        <img src='icons/iconPlus.svg' />
                      </button>
                      <button>
                        <span>COMBINAR SERVIÇO</span>
                        <img src='icons/iconCombinarButton.svg' />
                      </button>
                    </div>
                  </div>
                  <div className={styles.cardServico}>
                    <img src='img/content/servico.png' />
                    <h3> Serviço de Pedreiro</h3>
                    <span>
                      Presto serviços de pedreiro para casas e apartamentos.
                      Valores a combinar.
                    </span>
                    <div className={styles.buttonsCard}>
                      <button>
                        <span>EXIBIR DETALHES</span>
                        <img src='icons/iconPlus.svg' />
                      </button>
                      <button>
                        <span>COMBINAR SERVIÇO</span>
                        <img src='icons/iconCombinarButton.svg' />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
