/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import Head from 'next/head';

import styles from '../styles/pages/Busca.module.scss';

import { useContext, useEffect, useState } from 'react';

import { MenuHomePage } from '../components/MenuHomePage';
import { MenuLogged } from '../components/MenuLogged';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import  Router from 'next/router';
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';

const baseUrl = 'http://localhost:3001/services';

export default function Busca( props ){
  const { userAuth } = useContext(AuthContext);

  const [data, setData] = useState(null);
  const url = baseUrl + '?name=' + Router.query.string;

  useEffect(()=>{
    axios.get(url)
      .then((response) => setData(response.data))
      .catch((err) => {
        console.error("Erro: " + err);
      })
  }, [url]);

  var navMenu;

  if( !userAuth ){
    navMenu = <MenuHomePage />
  } else {
    navMenu = <MenuLogged />
  }

  const [filtroSelecionado, setFiltroSelecionado] = useState(0);

  return(
    <>
      <Head>
        <title>Quebra Galho | Busca</title>
        <meta name='description' content='Projeto Quebra Galho' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      {navMenu}

      <div className={styles.background}>
        <div className={styles.container}>
          <aside> 
              <h2>Filtrar por:</h2>
              <div onClick={()=> setFiltroSelecionado(0)} className = {filtroSelecionado === 0 ? `${styles.boxFiltro} ${styles.filtroActive}` : styles.boxFiltro} > 
                <div className  = {styles.filtro}>
                  <img src='icons/iconTudo.svg'/>
                  <span> Tudo </span>
                </div>
              </div>
              <div className = {filtroSelecionado === 1 ? `${styles.boxFiltro} ${styles.filtroActive}` : styles.boxFiltro} > 
                <div className  = {styles.filtroDisabled}>
                  <img src='icons/iconProfissionais.svg'/>
                  <span> Profissionais </span>
                </div>
              </div>
              <div className = {filtroSelecionado === 2 ? `${styles.boxFiltro} ${styles.filtroActive}` : styles.boxFiltro} > 
                <div onClick={()=> setFiltroSelecionado(2)} className  = {styles.filtro}>
                  <img src='icons/iconServiço.svg'/>
                  <span> Serviços </span>
                </div>
              </div>
              <div className = {filtroSelecionado === 3 ? `${styles.boxFiltro} ${styles.filtroActive}` : styles.boxFiltro} > 
                <div className  = {styles.filtroDisabled}>
                  <img src='icons/iconEndereço.svg'/>
                  <span> Endereço </span>
                </div>
              </div>
              <div className = {filtroSelecionado === 4 ? `${styles.boxFiltro} ${styles.filtroActive}` : styles.boxFiltro} > 
                <div className  = {styles.filtroDisabled}>
                  <img src='icons/iconDisponibilidade.svg'/>
                  <span> Disponibilidade </span>
                </div>
              </div>
              <div className = {filtroSelecionado === 5 ? `${styles.boxFiltro} ${styles.filtroActive}` : styles.boxFiltro} > 
                <div className  = {styles.filtroDisabled}>
                  <img src='icons/iconNota.svg'/>
                  <span> Nota </span>
                </div>
              </div>
          </aside>
          <main>
            <h2>Resultados da busca:</h2>
            <ul>
            {data?.data.map((service) => 
              <li key={service.id}>
                <div className={styles.boxUsuario}>
                  <div className={styles.usuarioeFoto}>
                    <img src={service.worker.photoUrl} />
                    <div className={styles.usuarioCampos}>
                      <h3>{service.name}</h3>
                      <h4>Profissão principal: {service.worker.mainProfession}</h4>
                      <div className = {styles.campoUsuario} onClick={() => {Router.push({pathname: 'perfil-trabalhador', query: service.worker})}}>
                        <span className= {styles.botaoCampo}>Nome do trabalhador: </span>
                        <span className= {styles.botaoCampo}>{service.worker.fullName}</span>
                      </div>
                      <div className = {styles.campoUsuario}>
                        <span>CEP: </span>
                        <span>{service.worker.cep}</span>
                      </div>
                    </div>
                  </div>
                <button className= {styles.botaoCampo} onClick={() => {Router.push({pathname: '/servico', query: service})}}>
                  <span>EXIBIR INFORMAÇÕES</span>
                    <img src='icons/iconPlus.svg' />
                  </button>
                </div>
              </li>
            )}
            </ul>
          </main>
        </div>
      </div>
      
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