/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @next/next/no-img-element */
import { useContext, useEffect, useState } from 'react';

import styles from '../styles/components/MenuLogged.module.scss';

import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import Router from 'next/router';

const baseUrl = 'http://localhost:3001/';

export function MenuLogged() {
  const { userAuth, signOut } = useContext(AuthContext);

  const [user, setUser] = useState(null);
  var userType;
  var urlUser;


  if(userAuth?.type === 'WORKER'){
    urlUser = baseUrl + 'worker/' + userAuth?.workerId;
  } else {
    urlUser = baseUrl + 'customer/' + userAuth?.customerId;
  }

  useEffect(()=>{
    axios.get(urlUser)
      .then((response) => setUser(response.data))
      .catch((err) => {
        console.error("Erro: " + err);
      })
  }, [urlUser]);

  if(userAuth?.type === 'WORKER'){
    userType = <a href='/meu-perfil-trabalhador'>
    <img src= {user?.photoUrl} />
    <div className={styles.euLink}>
      <span> Eu </span>
    </div>
  </a>
  }
  else {
    userType = <a href='/meu-perfil-cliente'>
      <img src= {user?.photoUrl} />
      <div className={styles.euLink}>
        <span> Eu </span>
        {/* <img src='img/layout/dropdown.svg' /> */}
      </div>
    </a>
  }

  function handleSignOut() {
    signOut();
  }

  const [stringBusca, setStringBusca] = useState({
    string: '',
  });

  function handleBusca(e) {
      const newString = { ...stringBusca };
      newString[e.target.id] = e.target.value;
      setStringBusca(newString);
  }

  return (
    <div className={styles.menuContainerFluid}>
      <div className={styles.menuContainer}>
        <div className={styles.logoMenu}>
          <a href='/'>
            <img src='img/layout/logo.svg' />
            <span>Quebra Galho</span>
          </a>
        </div>
        <div className={styles.buscaSection}>
          <input 
            onChange={(e) => handleBusca(e)}
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
            <img src='icons/botaoBusca.svg' />
          </div>
        </div>
        <div className={styles.iconsMenuLogged}>
          <div className={styles.boxIcon}>
            <a href='/'>
              <img src='icons/iconInicio.svg' />
              <span> Inicio </span>
            </a>
          </div>
          <div className={styles.boxIcon}>
            <a href='/notificacoes'>
              <img src='icons/iconNotificacao.svg' />
              <span> Notificações </span>
            </a>
          </div>
          <div className={styles.boxIconEu}>
            {userType}
          </div>
          <div className={styles.sairBox}>
            <a href='/login' onClick={() =>handleSignOut()}>
              <img src='icons/iconExit2.svg' />
              <span> Sair </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
