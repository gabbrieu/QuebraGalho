/* eslint-disable @next/next/no-img-element */
import Head from 'next/head';

import styles from '../styles/pages/Notificacoes.module.scss';

import { MenuLogged } from '../components/MenuLogged';
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';

export default function Notificacoes(){
return(
  <>
    <Head>
        <title>Quebra Galho | Notificacoes</title>
        <meta name='description' content='Projeto Quebra Galho' />
        <link rel='icon' href='/favicon.ico' />
    </Head>
    <MenuLogged />
    <main>
      <div className={styles.background}>
        <div className={styles.container}>
          <div className={styles.conteudo}>
            <h2>Notificações</h2>
            <div className={styles.boxNotificacoes}>
              <div className={styles.notificacao}>
                <div className={styles.fotoPerfil}>
                  <img src='img/content/fotoPerfilT.png'/>
                </div>
                <div className={styles.conteudoNotificacao}>
                  <div className={styles.tituloNotificacao}>
                    <span><span className={styles.negrito}>Thiago Carvalho</span> gostaria de contratar seu serviço de <span className={styles.negrito}>pedreiro</span></span>
                  </div>
                  <div className={styles.descricaoNotificacao}>
                    <span>“Gostaria de construir uma casa de dois andares no bairro Amazonas - Itabira...”</span>
                  </div>
                  <div className={styles.tempoNotificacao}>
                    <span>Há 2 horas</span>
                  </div>
                </div>
              </div>
              <div className={styles.notificacao}>
                <div className={styles.fotoPerfil}>
                  <img src='img/content/fotoPerfilR.png'/>
                </div>
                <div className={styles.conteudoNotificacao}>
                  <div className={styles.tituloNotificacao}>
                    <span><span className={styles.negrito}>Rita Carvalho</span> gostaria de contratar seu serviço de <span className={styles.negrito}>pintor</span></span>
                  </div>
                  <div className={styles.descricaoNotificacao}>
                    <span>“Estou precisando pintar um novo cômodo que construí em
                            minha casa, gostaria de saber...”</span>
                  </div>
                  <div className={styles.tempoNotificacao}>
                    <span>Há 1 dia</span>
                  </div>
                </div>
              </div>
              <div className={styles.notificacao}>
                <div className={styles.fotoPerfil}>
                  <img src='img/content/fotoPerfilJ.png'/>
                </div>
                <div className={styles.conteudoNotificacao}>
                  <div className={styles.tituloNotificacao}>
                    <span><span className={styles.negrito}>Julia Alves</span> avaliou seu serviço de <span className={styles.negrito}>pedreiro</span></span>
                  </div>
                  <div className={styles.descricaoNotificacao}>
                    <span>“Trabalho muito bem feito, recomendo para todas as pessoas que precisam de serviço de pedreiro!”</span>
                  </div>
                  <div className={styles.notaNotificacao}>
                    <img src='img/content/staricon.svg'/>
                  </div>
                  <div className={styles.tempoNotificacao}>
                    <span>Há 2 dias</span>
                  </div>
                </div>
              </div>
              <div className={styles.notificacao}>
                <div className={styles.fotoPerfil}>
                  <img src='img/content/fotoPerfilT.png'/>
                </div>
                <div className={styles.conteudoNotificacao}>
                  <div className={styles.tituloNotificacao}>
                    <span><span className={styles.negrito}>Thiago Carvalho</span> gostaria de contratar seu serviço de <span className={styles.negrito}>pedreiro</span></span>
                  </div>
                  <div className={styles.descricaoNotificacao}>
                    <span>“Gostaria de construir uma casa de dois andares no bairro Amazonas - Itabira...”</span>
                  </div>
                  <div className={styles.tempoNotificacao}>
                    <span>Há 2 horas</span>
                  </div>
                </div>
              </div>
              <div className={styles.notificacao}>
                <div className={styles.fotoPerfil}>
                  <img src='img/content/fotoPerfilR.png'/>
                </div>
                <div className={styles.conteudoNotificacao}>
                  <div className={styles.tituloNotificacao}>
                    <span><span className={styles.negrito}>Rita Carvalho</span> gostaria de contratar seu serviço de <span className={styles.negrito}>pintor</span></span>
                  </div>
                  <div className={styles.descricaoNotificacao}>
                    <span>“Estou precisando pintar um novo cômodo que construí em
                            minha casa, gostaria de saber...”</span>
                  </div>
                  <div className={styles.tempoNotificacao}>
                    <span>Há 1 dia</span>
                  </div>
                </div>
              </div>
              <div className={styles.notificacao}>
                <div className={styles.fotoPerfil}>
                  <img src='img/content/fotoPerfilJ.png'/>
                </div>
                <div className={styles.conteudoNotificacao}>
                  <div className={styles.tituloNotificacao}>
                    <span><span className={styles.negrito}>Julia Alves</span> avaliou seu serviço de <span className={styles.negrito}>pedreiro</span></span>
                  </div>
                  <div className={styles.descricaoNotificacao}>
                    <span>“Trabalho muito bem feito, recomendo para todas as pessoas que precisam de serviço de pedreiro!”</span>
                  </div>
                  <div className={styles.notaNotificacao}>
                    <img src='img/content/staricon.svg'/>
                  </div>
                  <div className={styles.tempoNotificacao}>
                    <span>Há 2 dias</span>
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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { ['tokenQuebraGalho']: token } = parseCookies(ctx);

  if(!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    }
  }

  return{
    props: {}
  }
}