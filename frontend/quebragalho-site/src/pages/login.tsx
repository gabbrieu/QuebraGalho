/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import React, { useContext, useState } from 'react';
import { MenuLoginCreate } from '../components/MenuLoginCreate';
import styles from '../styles/pages/Login.module.scss';
import { AuthContext } from '../context/AuthContext';

export default function Login() {
  /////////Autenticação/////////
  const { signIn } = useContext(AuthContext);
  //Dados de autenticação
  const [data, setData] = useState({
    email: '',
    password: '',
  });

  function handle(e) {
    const newdata = { ...data };
    newdata[e.target.id] = e.target.value;
    setData(newdata);
  }

  function handleSignIn( { email, password }) {
    signIn({ email, password });
  }

  function onSubmit() {
    handleSignIn( data );
  }

  return (
    <div className={styles.conteudoPageLogin}>
      <div className={styles.loginSection}>
        <MenuLoginCreate />
        <div className={styles.loginBox}>
          <h1>Login</h1>
          <span>
            Entre em sua conta para contratar um profissional ou oferecer seus
            serviços.
          </span>
          <form onSubmit={onSubmit}>
            <label> E-mail </label>
            <input
              onChange={(e) => handle(e)}
              id='email'
              value={data.email}
              placeholder='Digite seu e-mail'
              required
              type='email'
            />
            <label> Senha </label>
            <input
              onChange={(e) => handle(e)}
              id='password'
              value={data.password}
              placeholder='Digite sua senha'
              required
              type='password'
            />
            <button type='submit'>Login</button>
            <span>
              Não é registrado?{' '}
              <Link href='/criar-usuario'>
                <a>Crie uma conta</a>
              </Link>
            </span>
          </form>
        </div>
      </div>
      <div className={styles.imagemSection}>
        {/* eslint-disable-next-line jsx-a11y/alt-text */}
        <img src='img/layout/imglogin.svg' />
      </div>
    </div>
  );
}
