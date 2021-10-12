/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import React from 'react';
import { MenuLoginCreate } from '../components/MenuLoginCreate';
import styles from '../styles/pages/Login.module.scss';

export default function Login() {
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
          <form action=''>
            <label> E-mail </label>
            <input placeholder='Digite seu e-mail' required type='email' />
            <label> Senha </label>
            <input placeholder='Digite sua senha' required type='password' />
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
        <img src='img/layout/imglogin.svg' />
      </div>
    </div>
  );
}
