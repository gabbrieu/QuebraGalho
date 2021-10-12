import axios from 'axios';
import React, { useState } from 'react';
import { MenuLoginCreate } from '../components/MenuLoginCreate';
import styles from '../styles/pages/Criarusuario.module.scss';

type Client = {
  name: string; // juntar com sobrenome
  password: string;
  confirmPassword: string;
  email: string;
  birthDate: string;
  phone: string;
  cpf?: string;
  cnpj?: string;
  cep: string;
  address: string;
  imageProfile: string;

  //status mandar sempre true
};

type Professional = {
  name: string; // juntar com sobrenome
  password: string;
  confirmPassword: string;
  email: string;
  birthDate: string;
  phone: string;
  cpf?: string;
  cnpj?: string;
  cep: string;
  address: string;
  imageProfile: string;
  linkedin?: string;
  mainProfession: string;
  aboutMe: string;
};

export default function Criarusuario() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [abaSelecionada, setAbaSelecionada] = useState(0);
  const [abaPessoa, setAbaPessoa] = useState(0);

  const [data, setData] = useState({
    name: '',
    password: '',
    confirmPassword: '',
    email: '',
    birthDate: '',
    phone: '',
    cpf: '',
    cnpj: '',
    cep: '',
    address: '',
    imageProfile: '',
    linkedin: '',
    mainProfession: '',
    aboutMe: '',
  });

  function handle(e) {
    const newdata = { ...data };
    newdata[e.target.id] = e.target.value;
    setData(newdata);
    console.log(newdata);
  }

  function onSubmit() {
    event.preventDefault();
    if (abaSelecionada === 0) {
      //conta cliente
    } else {
    }

    const sendUser = axios.post('');
  }

  function selecionarAba(id: number) {
    setAbaSelecionada(id);
  }

  function selecionarAbaPessoa(id: number) {
    setAbaPessoa(id);
  }

  return (
    <div className={styles.bgCriarconta}>
      <MenuLoginCreate />
      <div className={styles.conteudoCriarconta}>
        <div className={styles.boxTitulo}>
          <h1>Crie sua conta</h1>
          <span>
            Escolha entre criar uma conta de profissional ou de cliente para ter
            acesso completo à plataforma!
          </span>
        </div>
        <div className={styles.boxCriarconta}>
          <div className={styles.cabecalhoAbas}>
            <div
              onClick={() => selecionarAba(0)}
              className={
                abaSelecionada === 0
                  ? `${styles.abaItem} ${styles.abaActive}`
                  : styles.abaItem
              }
            >
              <span>Criar conta de Cliente</span>
            </div>
            <div
              onClick={() => selecionarAba(1)}
              className={
                abaSelecionada === 1
                  ? `${styles.abaItem} ${styles.abaActive}`
                  : styles.abaItem
              }
            >
              <span>Criar conta de profissional</span>
            </div>
          </div>

          <div className={styles.textoFormulario}>
            {abaSelecionada === 0 ? (
              <span>
                Crie uma conta do tipo cliente para visualizar os profissionais
                que atuam em nossa plataforma. Se você for quiser vender seus
                serviços, selecione a aba ao lado.
              </span>
            ) : (
              <span>
                Crie uma conta do tipo profissional para divulgar seus serviços
                em nossa plataforma. Se você for quiser contratar profissionais
                para realizar serviços, selecione a aba ao lado.
              </span>
            )}
          </div>
          <div className={styles.AbaPessoaFJ}>
            <div
              onClick={() => selecionarAbaPessoa(0)}
              className={
                abaPessoa === 0
                  ? `${styles.abaPessoa} ${styles.abaPActive}`
                  : styles.abaPessoa
              }
            >
              <span>Pessoa física</span>
            </div>
            <div
              onClick={() => selecionarAbaPessoa(1)}
              className={
                abaPessoa === 1
                  ? `${styles.abaPessoa} ${styles.abaPActive}`
                  : styles.abaPessoa
              }
            >
              <span>Pessoa jurídica</span>
            </div>
          </div>
          <div className={styles.camposFormulario}>
            <form onSubmit={onSubmit}>
              <div className={styles.campos}>
                <div className={styles.inputLabel}>
                  <label> Nome Completo*: </label>
                  <input
                    onChange={(e) => handle(e)}
                    id='name'
                    value={data.name}
                    placeholder='Digite seu nome'
                    required
                    type='text'
                  />
                </div>

                <div className={styles.inputLabel}>
                  <label> Senha*: </label>
                  <input
                    onChange={(e) => handle(e)}
                    id='password'
                    value={data.password}
                    placeholder='Digite sua senha'
                    required
                    type='password'
                  />
                </div>
                <div className={styles.inputLabel}>
                  <label> Confirmar senha*: </label>
                  <input
                    onChange={(e) => handle(e)}
                    id='confirmPassword'
                    value={data.confirmPassword}
                    placeholder='Digite sua senha'
                    required
                    type='password'
                  />
                </div>
                <div className={styles.inputLabel}>
                  <label> E-mail*: </label>
                  <input
                    onChange={(e) => handle(e)}
                    id='email'
                    value={data.email}
                    placeholder='Digite seu e-mail'
                    required
                    type='email'
                  />
                </div>
                <div className={styles.inputLabel}>
                  <label> Sexo*: </label>
                  <select className={styles.selectDefault} name='sexo'>
                    <option onChange={(e) => handle(e)} value='masculino'>
                      Masculino
                    </option>
                    <option onChange={(e) => handle(e)} value='feminino'>
                      Feminino
                    </option>
                    <option onChange={(e) => handle(e)} value='não informado'>
                      Não informado
                    </option>
                  </select>
                </div>
                <div className={styles.inputLabel}>
                  <label> Data de nascimento*: </label>
                  <input
                    onChange={(e) => handle(e)}
                    id='birthDate'
                    value={data.birthDate}
                    placeholder='Digite sua senha'
                    required
                    type='date'
                  />
                </div>
                <div className={styles.inputLabel}>
                  <label> Telefone*: </label>
                  <input
                    onChange={(e) => handle(e)}
                    id='phone'
                    value={data.phone}
                    placeholder='Digite seu telefone'
                    required
                    type='text'
                  />
                </div>
                <div className={styles.inputLabel}>
                  {abaPessoa === 0 ? (
                    <>
                      <label> CPF*: </label>
                      <input
                        onChange={(e) => handle(e)}
                        id='cpf'
                        value={data.cpf}
                        placeholder='Digite seu CPF'
                        required
                        type='text'
                      />
                    </>
                  ) : (
                    <>
                      <label> CNPJ*: </label>
                      <input
                        onChange={(e) => handle(e)}
                        id='cnpj'
                        value={data.cnpj}
                        placeholder='Digite seu CNPJ'
                        required
                        type='text'
                      />
                    </>
                  )}
                </div>
                <div className={styles.inputLabel}>
                  <label> CEP*: </label>
                  <input placeholder='Digite seu cpf' required type='text' />
                </div>
                <div className={styles.inputLabel}>
                  <label> Endereço*: </label>
                  <input
                    onChange={(e) => handle(e)}
                    id='address'
                    value={data.address}
                    placeholder='Digite seu endereço'
                    required
                    type='text'
                  />
                </div>
                <div className={styles.inputLabel}>
                  <label>Foto de Perfil*: </label>
                  <input
                    onChange={(e) => handle(e)}
                    id='imageProfile'
                    value={data.imageProfile}
                    placeholder='digite o link da foto de perfil'
                    required
                    type='text'
                  />
                </div>
                {/*  <div className={styles.inputLabel}>
                  <label> Foto de perfil*: </label>
                  <div className={styles.inputFile}>
                    <input placeholder='Escolha uma foto de perfil' disabled />
                    <label
                      htmlFor='file-upload'
                      className={styles.customFileUpload}
                    >
                      Escolher foto
                    </label>
                    <input id='file-upload' type='file' />
                  </div>
                </div>
                */}
                {abaSelecionada === 1 ? (
                  <>
                    <div className={styles.inputLabel}>
                      <label> Linkedin: </label>
                      <input placeholder='Digite seu Linkedin' type='text' />
                    </div>
                    <div className={styles.inputLabel}>
                      <label> Profissão principal*: </label>
                      <input
                        onChange={(e) => handle(e)}
                        id='linkedin'
                        value={data.linkedin}
                        placeholder='Digite seu Linkedin'
                        required
                        type='text'
                      />
                    </div>
                    <div className={styles.inputLabel}>
                      <label> Escreva um pouco sobre você*: </label>
                      <textarea
                        onChange={(e) => handle(e)}
                        id='aboutMe'
                        value={data.aboutMe}
                        placeholder='Descreva suas principais características e pontos positivos. Fale um pouco sobre o motivo pelo qual alguém deveria contratar seus serviços '
                        required
                      ></textarea>
                    </div>
                  </>
                ) : (
                  ''
                )}
              </div>
              <div className={styles.camposBotao}>
                <span>*Campos obrigatórios</span>
                <button>Cadastrar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
