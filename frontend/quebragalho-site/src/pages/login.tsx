/* eslint-disable @next/next/no-img-element */
import axios from 'axios';
import Link from 'next/link';
import React, { useState } from 'react';
import { MenuLoginCreate } from '../components/MenuLoginCreate';
import Router from 'next/router';
import styles from '../styles/pages/Login.module.scss';

const urlLogin = 'http://localhost:3001/auth/login';

export default function Login() {
  const [data, setData] = useState({
    email: '',
    password: '',
  });

  function handle(e) {
    const newdata = { ...data };
    newdata[e.target.id] = e.target.value;
    setData(newdata);
    console.log(newdata);
  }

  async function onSubmit() {
    event.preventDefault();
    try {
      const req = await axios.post(
        urlLogin,
        {
          email: data.email,
          password: data.password,
        },
        {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST ',
            'Content-Type': 'application/json',
          },
        }
      );
      alert('Login efetuado com sucesso!');
      Router.push('/');
    } catch (e) {
      alert(e.response.data.message);
    }
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
