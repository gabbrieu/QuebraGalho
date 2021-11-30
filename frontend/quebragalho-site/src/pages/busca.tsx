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

const baseUrl = 'http://localhost:3001/services';

export default function Busca( props ){
  const { userAuth, isAuthenticated } = useContext(AuthContext);

  const [data, setData] = useState(null);
  const url = baseUrl + '?name=' + Router.query.string;

  useEffect(()=>{
    axios.get(url)
      .then((response) => setData(response.data))
      .catch((err) => {
        console.error("Vish! " + err);
      })
  });

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
                  <span> Serviços </span>
                </div>
              </div>
              <div onClick={()=> setFiltroSelecionado(1)} className = {filtroSelecionado === 1 ? `${styles.boxFiltro} ${styles.filtroActive}` : styles.boxFiltro} > 
                <div className  = {styles.filtro}>
                  <img src='icons/iconProfissionais.svg'/>
                  <span> Profissionais </span>
                </div>
              </div>
              <div onClick={()=> setFiltroSelecionado(2)} className = {filtroSelecionado === 2 ? `${styles.boxFiltro} ${styles.filtroActive}` : styles.boxFiltro} > 
                <div className  = {styles.filtro}>
                  <img src='icons/iconServiço.svg'/>
                  <span> Serviço </span>
                </div>
              </div>
              <div onClick={()=> setFiltroSelecionado(3)} className = {filtroSelecionado === 3 ? `${styles.boxFiltro} ${styles.filtroActive}` : styles.boxFiltro} > 
                <div className  = {styles.filtro}>
                  <img src='icons/iconEndereço.svg'/>
                  <span> Endereço </span>
                </div>
              </div>
              <div onClick={()=> setFiltroSelecionado(4)} className = {filtroSelecionado === 4 ? `${styles.boxFiltro} ${styles.filtroActive}` : styles.boxFiltro} > 
                <div className  = {styles.filtro}>
                  <img src='icons/iconDisponibilidade.svg'/>
                  <span> Disponibilidade </span>
                </div>
              </div>
              <div onClick={()=> setFiltroSelecionado(5)} className = {filtroSelecionado === 5 ? `${styles.boxFiltro} ${styles.filtroActive}` : styles.boxFiltro} > 
                <div className  = {styles.filtro}>
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
                    <img src='img/content/fotoPerfil.png' />
                    <div className={styles.usuarioCampos}>
                      <h3>{service.name}</h3>
                      <h4>Profissão principal: </h4>
                      <div className = {styles.campoUsuario}>
                        <span>Cidade: </span>
                        <span>Itabira-MG</span>
                      </div>
                      <div className = {styles.campoUsuario}>
                        <span>Nota: </span>
                        <img src='img/content/staricon.svg' />
                      </div>
                    </div>
                  </div>
                <button onClick={() => {Router.push({pathname: '/servico', query: service})}}>
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