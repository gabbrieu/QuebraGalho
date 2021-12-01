/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @next/next/no-img-element */
import Head from 'next/head';

import styles from '../styles/pages/Perfilusuario.module.scss';

import { useEffect, useState } from 'react';

import { MenuLogged } from '../components/MenuLogged';
import Router from 'next/router';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';

export default function PerfilUsuario() {
  const [hiddenModal, setHiddenModal] = useState(true);
  
  const baseUrl = 'http://localhost:3001/';
  const urlWorker = baseUrl + 'worker/' + Router.query.id;

  /////////Worker/////////
  const [worker, setWorker] = useState(null);

  useEffect(()=>{
    axios.get(urlWorker)
      .then((response) => setWorker(response.data))
      .catch((err) => {
        console.error("Erro! " + err);
      })
  }, [urlWorker]);

    //Mostrar cards service
  function cardService (service) {
    if( service.status === true ) {
      return <div className={styles.cardServico}>
        <img src='img/content/servico.png' />
        <h3> {service.name} </h3>
        <div className={styles.descricaoServico}>
          <span> {service.description} </span>
        </div>
        <div className={styles.buttonsCard}>
        <button onClick={() => {Router.push({pathname: '/servico', query: service})}}>
            <span>EXIBIR DETALHES</span>
            <img src='icons/iconPlus.svg' />
          </button>
          <button onClick={() => {Router.push({pathname: '/servico', query: service})}}>
            <span>COMBINAR SERVIÇO</span>
            <img src='icons/iconCombinarButton.svg' />
          </button>
        </div>
      </div>
    }
  }

  return (
    <>
      <Head>
        <title>Quebra Galho | Perfil</title>
        <meta name='description' content='Projeto Quebra Galho' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <MenuLogged />

      <main>
        <div className={styles.background}>
          <div className={styles.container}>
            <div className={styles.leftSide}>
              <section className={styles.boxInfoUsuario}>
                <div className={styles.informacoesPrincipais}>
                  <div className={styles.fotoeCapa}>
                    <div className={styles.capaPerfil}>
                      <img src='img/content/capaPerfil.png' />
                    </div>
                    <div className={styles.fotoPerfil}>
                     <img src={worker?.photoUrl} />
                    </div>
                  </div>
                  <h1>{worker?.fullName}</h1>
                  <span>{worker?.mainProfession} </span>
                  <p>
                    {worker?.description}
                  </p>
                </div>
                <div className={styles.informacoesAdicionais}>
                  <h3>Informações Adicionais</h3>
                  <div className={styles.informacaoAdicional}>
                    <span>Telefone: </span>
                    <span>{worker?.cellPhone}</span>
                  </div>
                  <div className={styles.informacaoAdicional}>
                    <span>E-mail: </span>
                    <span>{worker?.accounts.email}</span>
                  </div>
                  <div className={styles.informacaoAdicional}>
                    <span>Endereço: </span>
                    <span>{worker?.address}</span>
                  </div>
                  <div className={styles.informacaoAdicional}>
                    <span>Profissão Principal: </span>
                    <span>{worker?.mainProfession}</span>
                  </div>
                  <div className={styles.informacaoAdicional}>
                    <span>Linkedin: </span>
                    <span>{worker?.linkedIn}</span>
                  </div>
                </div>
              </section>
            </div>
            <div className={styles.rightSide}>
              <section className={styles.servicosUsuario}>
                <h2>Contrate meus serviços</h2>
                <div>
                  <ul className={styles.cardsServicos}>
                    {worker?.services.map((service) =>
                      <li key={service.id}>
                        {cardService(service)}
                      </li>
                    )}
                  </ul>
                </div>
              </section>
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