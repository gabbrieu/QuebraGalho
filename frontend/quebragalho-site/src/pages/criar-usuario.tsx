import axios from 'axios';
import React, { useState } from 'react';
import { MenuLoginCreate } from '../components/MenuLoginCreate';
import styles from '../styles/pages/Criarusuario.module.scss';
import MaskedInput from '../utils/MaskedInput';
import Router from 'next/router';

const urlCustomer = 'http://localhost:3001/customer';
const urlWorker = 'http://localhost:3001/worker';

export default function Criarusuario() {
  const [abaSelecionada, setAbaSelecionada] = useState(0);
  const [abaPessoa, setAbaPessoa] = useState(0);
  const [cpf, setCPF] = useState('');
  const [cnpj, setCNPJ] = useState('');
  const [cep, setCEP] = useState('');
  const [phone, setPhone] = useState('');

  const [data, setData] = useState({
    name: '',
    password: '',
    confirmPassword: '',
    gender: '',
    email: '',
    birthDate: '',
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

  async function onSubmit() {
    event.preventDefault();
    if (data.password !== data.confirmPassword) {
      alert('Campo de senha diferente do campo de confirmar senha!');
    } else {
      if (abaSelecionada === 0) {
        try {
          await axios.post(
            urlCustomer,
            {
              fullName: data.name,
              password: data.password,
              gender: data.gender.toLowerCase(),
              document: abaPessoa === 0 ? cpf : cnpj,
              cellPhone: phone,
              birthDate: data.birthDate,
              email: data.email,
              cep: cep,
              address: data.address,
              status: true,
            },
            {
              headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST ',
                'Content-Type': 'application/json',
              },
            }
          );

          alert('Usuário criado com sucesso');
          Router.push('/');
        } catch (e) {
          if (e.response.status === 409) {
            alert(
              'CPF ou e-mail já cadastrados. Não foi possivel cadastrar sua conta, tente novamente'
            );
          } else {
            alert('Algo deu errado, o usuário não foi criado');
          }
        }
      } else {
        try {
          await axios.post(
            urlWorker,
            {
              fullName: data.name,
              password: data.password,
              gender: data.gender,
              mainProfession: data.mainProfession,
              document: abaPessoa === 0 ? cpf : cnpj,
              cellPhone: phone,
              birthDate: data.birthDate,
              email: data.email,
              description: data.aboutMe,
              linkedIn: data.linkedin,
              photoUrl: data.imageProfile,
              cep: cep,
              address: data.address,
              status: true,
            },
            {
              headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST ',
                'Content-Type': 'application/json',
              },
            }
          );
          alert('Usuário criado com sucesso');
          Router.push('/');
        } catch (e) {
          if (e.response.status === 409) {
            alert(
              'CPF ou e-mail já cadastrados. Não foi possivel cadastrar sua conta, tente novamente'
            );
          } else {
            alert('Algo deu errado, o usuário não foi criado');
          }
        }
      }
    }
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
                  <select
                    onChange={(e) => handle(e)}
                    value={data.gender}
                    className={styles.selectDefault}
                    name='gender'
                    id='gender'
                  >
                    <option value='Informar sexo'> Informe seu sexo </option>
                    <option value='masculino'>Masculino</option>
                    <option value='feminino'>Feminino</option>
                    <option value='não informado'>Não informar</option>
                  </select>
                </div>
                <div className={styles.inputLabel}>
                  <label> Data de nascimento*: </label>
                  <input
                    onChange={(e) => handle(e)}
                    id='birthDate'
                    value={data.birthDate}
                    placeholder='Digite sua data de nascimento'
                    required
                    type='date'
                  />
                </div>
                <div className={styles.inputLabel}>
                  <label> Telefone*: </label>
                  <MaskedInput
                    mask='(99)99999-9999'
                    value={phone}
                    placeholder='Digite seu telefone de contato'
                    minLength='14'
                    disabled={false}
                    onChange={(event) => setPhone(event.target.value)}
                  />
                </div>
                <div className={styles.inputLabel}>
                  {console.log(cpf)}
                  {abaPessoa === 0 ? (
                    <>
                      <label> CPF*: </label>
                      <MaskedInput
                        mask='999.999.999-99'
                        value={cpf}
                        placeholder='Digite seu CPF'
                        minLength='14'
                        disabled={false}
                        onChange={(event) => setCPF(event.target.value)}
                      />
                    </>
                  ) : (
                    <>
                      <label> CNPJ*: </label>
                      <MaskedInput
                        mask='99.999.999/9999-99'
                        value={cnpj}
                        placeholder='Digite seu CNPJ'
                        minLength='19'
                        disabled={false}
                        onChange={(event) => setCNPJ(event.target.value)}
                      />
                    </>
                  )}
                </div>
                <div className={styles.inputLabel}>
                  <label> CEP*: </label>
                  <MaskedInput
                    mask='99.999-999'
                    value={cep}
                    placeholder='Digite seu CEP'
                    minLength='10'
                    disabled={false}
                    onChange={(event) => setCEP(event.target.value)}
                  />
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
                    placeholder='Digite o link da foto de perfil'
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
                      <input
                        onChange={(e) => handle(e)}
                        id='linkedin'
                        value={data.linkedin}
                        placeholder='Digite seu Linkedin'
                        type='text'
                      />
                    </div>
                    <div className={styles.inputLabel}>
                      <label> Profissão principal*: </label>
                      <input
                        onChange={(e) => handle(e)}
                        id='mainProfession'
                        value={data.mainProfession}
                        placeholder='Digite sua profissão principal'
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
                        placeholder='Descreva suas principais características e pontos positivos. Fale um pouco sobre o motivo pelo qual alguém deveria contratar seus serviços. Deixe claro seus horarios disponíveis para trabalho e os outros serviços que presta se houver, além de sua profissão principal'
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
                <button type='submit'>Cadastrar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
