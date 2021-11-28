/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @next/next/no-img-element */
import axios from 'axios';
import Head from 'next/head';

import styles from '../styles/pages/Perfilusuario.module.scss';
import styleServico from '../styles/pages/Servico.module.scss';

import MaskedInput from '../utils/MaskedInput';

import { parseCookies } from 'nookies'
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { GetServerSideProps } from 'next';

import { MenuLogged } from '../components/MenuLogged';

const baseUrl = 'http://localhost:3001/';

export default function PerfilUsuario() {
    const { userAuth } = useContext(AuthContext);

    /////////Modals/////////
    const [modalEditProfile, setModalEditProfile] = useState(true);
    const [modalEditPhotos, setModalEditPhotos] = useState(true);
    const [modalComment, setModalComment] = useState(true);

    /////////Customer/////////
    const [customer, setCustomer] = useState(null);
    var editDocument;
    //Recuperando informações do customer - get
    const urlCustomer = baseUrl + 'customer/' + userAuth?.customerId;
  
    useEffect(()=>{
        axios.get(urlCustomer)
          .then((response) => setCustomer(response.data))
          .catch((err) => {
            console.error("Vish! " + err);
          })
    });
  
    const [document, setDocument] = useState('');
    const [cep, setCEP] = useState('');
    const [phone, setPhone] = useState('');
    //Atualizar customer
    const [updateCustomer, setUpdateCustomer] = useState({
      fullName: '',
      address: '',
    });

    useEffect(() => {
      setUpdateCustomer({
        fullName: customer?.fullName,
        address: customer?.address,
      });
      setCEP(customer?.cep);
      setDocument(customer?.document);
      setPhone(customer?.cellPhone);
    }, [
        customer?.cep, customer?.document, customer?.cellPhone, 
        customer?.fullName, customer?.address,
    ]);

    function handleEditProfile(e) {
      const newUpdateCustomer = { ...updateCustomer };
      newUpdateCustomer[e.target.id] = e.target.value;
      setUpdateCustomer(newUpdateCustomer);
      console.log(newUpdateCustomer);
    }

    async function submitEditProfile() {
      event.preventDefault();
      try {
        await axios.patch(
          urlCustomer,
          {
            cellPhone: phone,
            fullName: updateCustomer.fullName,
            cep: cep,
            address: updateCustomer.address,
          },
          {
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': 'PATCH ',
              'Content-Type': 'application/json',
            },
          }
        );

        alert('Perfil atualizado!');
      } catch (err) {
        alert('Algo deu errado, o perfil não foi atualizado!');
      }
    }

    if(customer?.document.length === 11) {
      editDocument = <div className={styles.campoModalColumn}>
          <span>CPF*: </span>
          <MaskedInput
              mask='999.999.999-99'
              value={document}
              placeholder={customer?.document}
              minLength='14'
              disabled={true}
              onChange={(event) => setDocument(event.target.value)}
          />
      </div>
    } else {
      editDocument = <div className={styles.campoModalColumn}>
          <span>CNPJ*: </span>
          <MaskedInput
              mask='99.999.999/9999-99'
              value={document}
              placeholder={customer?.document}
              minLength='19'
              disabled={true}
              onChange={(event) => setDocument(event.target.value)}
          />
      </div>                    
    }

    return (
      <>
        <Head>
          <title>Quebra Galho | Meu Perfil</title>
          <meta name='description' content='Projeto Quebra Galho' />
          <link rel='icon' href='/favicon.ico' />
        </Head>
        <MenuLogged imgLink="img/content/fotoPerfil.png" />

        <main>
          <div hidden={modalEditProfile} className={!modalEditProfile ? styles.modalBackground : ''}>
            <div className={!modalEditProfile ? styles.modalContent : ''}>
              <h2>Editar Perfil</h2>
              <div className={styles.camposModal}>
              <form onSubmit={submitEditProfile}>
                <div className={styles.campoModalColumn}>
                    <span>Nome completo*: </span>
                    <input
                      onChange={(e) => handleEditProfile(e)}
                      id='fullName' 
                      type="text" 
                      defaultValue={customer?.fullName}
                      value={updateCustomer.fullName}
                      required
                    ></input>
                </div>
                <div className={styles.modalColumn}>
                  <div className={styles.campoModalColumn}>
                      <span>E-mail*: </span>
                      <input type="email" defaultValue={customer?.accounts.email} disabled required></input>
                  </div>
                  <div className={styles.campoModalColumn}>
                      <span>Data de nascimento*: </span>
                      <input type="date" defaultValue={customer?.birthDate} disabled required></input>
                  </div>
                </div>
                <div className={styles.modalColumn}>
                  <div className={styles.campoModalColumn}>
                      <span>Telefone*: </span>
                      <MaskedInput
                        mask='(99)99999-9999'
                        value={phone}
                        placeholder={customer?.cellPhone}
                        minLength='14'
                        disabled={false}
                        onChange={(event) => setPhone(event.target.value)}
                    />
                </div>
                {editDocument}
                </div>
                <div className={styles.modalColumn}>
                  <div className={styles.campoModalColumn}>
                      <span>Endereço*: </span>
                      <input
                        onChange={(e) => handleEditProfile(e)}
                        id='address'  
                        type="text" 
                        defaultValue={customer?.address}
                        value={updateCustomer.address} 
                        required
                      ></input>
                  </div>
                  <div className={styles.campoModalColumn}>
                      <span>CEP*: </span>
                      <MaskedInput
                        mask='99.9999-99'
                        value={cep}
                        onChange={(event) => setCEP(event.target.value)}
                        placeholder={customer?.cep}
                        disabled={false}
                        minLength='10'
                      />
                  </div>
                </div>
                <div className={styles.botoesModal}>
                  <button type='button' onClick={()=>setModalEditProfile(true)}>Cancelar</button>
                  <button type='submit' onClick={()=>setModalEditProfile(true)}>Salvar</button>
                </div>
              </form>
              </div>
            </div>
          </div>

          <div hidden={modalEditPhotos} className={!modalEditPhotos ? styles.modalBackground : ''}>
            <div className={!modalEditPhotos ? styles.modalContent : ''}>
                <h2>Editar fotos</h2>
                <div className={styles.camposModal}>
                  <div className={styles.botoesModalPhotos}>
                    <button>Escolher nova foto de perfil</button>
                    <button>Escolher nova foto de capa</button>
                  </div>
                  <div className={styles.campoModalColumn}> 
                    <div className={styles.botoesModal}>
                      <button onClick={()=>setModalEditPhotos(true)}>Cancelar</button>
                      <button onClick={()=>setModalEditPhotos(true)}>Salvar</button>
                    </div>
                  </div>
                </div>
            </div>
          </div>

          <div hidden={modalComment} className={!modalComment ? styles.modalBackground : ''}>
            <div className={!modalComment ? styles.modalContent : ''}>
                <h2>Comentário</h2>
                <div className={styles.camposModal}>
                    <div className={styles.campoModalColumn}>
                        <span>Descrição*:  </span>
                        <textarea 
                        required
                        ></textarea>
                    </div>
                    <div className={styles.campoModalColumn}>
                    <span>Nota*: </span>
                    <select id="status">
                        <option value="1 estrela" selected>1 estrela</option>
                        <option value="2 estrelas">2 estrelas</option>
                        <option value="3 estrelas">3 estrelas</option>
                        <option value="4 estrelas">4 estrelas</option>
                        <option value="5 estrelas">5 estrelas</option>
                    </select>
                    <span className={styles.camposObrigatorios}>* Campos obrigatorios</span>
                    </div>
                    <div className={styles.campoModalColumn}> 
                        <div className={styles.botoesModal}>
                        <button onClick={()=>setModalComment(true)}>Cancelar</button>
                        <button onClick={()=>setModalComment(true)}>Postar</button>
                        </div>
                    </div>
                </div>
            </div>
          </div>

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
                          <img src='img/content/fotoPerfil.png' />
                      </div>
                      <div className={styles.editarIcon}>
                          <button onClick={()=> setModalEditPhotos(false)}><img src='icons/iconEditar.svg' /></button>
                      </div>
                    </div>
                    <h1>{customer?.fullName}</h1>
                    <div className={styles.buttonEdit}>
                      <button onClick={()=> setModalEditProfile(false)}>
                          <span>EDITAR PERFIL</span>
                          <img src='icons/iconEditar.svg' />
                      </button>
                    </div>
                    <p></p>
                  </div>
                  <div className={styles.informacoesAdicionais}>
                    <h3>Informações</h3>
                    <div className={styles.informacaoAdicional}>
                      <span>Telefone: </span>
                      <span>{customer?.cellPhone}</span>
                    </div>
                    <div className={styles.informacaoAdicional}>
                      <span>E-mail: </span>
                      <span>{customer?.accounts.email}</span>
                    </div>
                    <div className={styles.informacaoAdicional}>
                      <span>Endereço: </span>
                      <span>{customer?.address}</span>
                    </div>
                  </div>
                </section>
              </div>
              <div className={styleServico.rightSide}>
                <section className={styles.servicosUsuario}>
                    <h2>Histórico de serviços</h2>
                    <div className={styleServico.boxDepoimentos}>
                        <div className={styleServico.cabecalhoDepoimentos}>
                            <span> {customer?.fullName} </span>
                            <img src ="icons/iconCombinarButton.svg"/>
                            <span> Júlia Alves </span>
                        </div>
                        <div className={styleServico.conteudoDepoimento}>
                            <div className={styleServico.fotoPerfilDep}>
                                <img src = "img/content/fotoPerfilJ.png"/>
                            </div>
                            <div className={styleServico.camposDepoimento}>
                                <h2>Serviço de maceteira</h2>
                                <h4>Comentário sobre o serviço prestado:</h4>
                                <p> Trabalho muito bem feito, recomendo para todas as pessoas que precisam de serviço de pedreiro! </p>
                                <div className={styleServico.notaDepoimento}>
                                    <span> Nota: </span>
                                    <img src="img/content/staricon.svg" />
                                </div> 
                                <div className={styleServico.notaDepoimento}>
                                    <button onClick={()=> setModalComment(false)}>EDITAR COMENTÁRIO</button>
                                </div>  
                            </div>
                        </div>
                    </div>
                    <div className={styleServico.boxDepoimentos}>
                        <div className={styleServico.cabecalhoDepoimentos}>
                            <span> {customer?.fullName} </span>
                            <img src ="icons/iconCombinarButton.svg"/>
                            <span> Júlia Alves </span>
                        </div>
                        <div className={styleServico.conteudoDepoimento}>
                            <div className={styleServico.fotoPerfilDep}>
                                <img src = "img/content/fotoPerfilJ.png"/>
                            </div>
                            <div className={styleServico.camposDepoimento}>
                                <h2>Serviço de maceteira</h2>
                                <h4>Comentário sobre o serviço prestado:</h4>
                                <p> Parece que você ainda não deixou um comentário. Por favor, avalie o serviço prestado, com isso
                                    você ajuda tanto o trabalhador quanto os futuros clientes! </p>
                                <div className={styleServico.notaDepoimento}>
                                    <button onClick={()=> setModalComment(false)}>DEIXAR UM COMENTÁRIO</button>
                                </div>
                            </div>
                        </div>
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