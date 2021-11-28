/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @next/next/no-img-element */
import axios from 'axios';
import Head from 'next/head';
import Router from 'next/router';

import styles from '../styles/pages/Perfilusuario.module.scss';

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
    const [modalEditService, setmodalEditService] = useState(true);
    const [modalEditPhotos, setModalEditPhotos] = useState(true);
    const [modalDeleteService, setmodalDeleteService] = useState(true);
    const [modalCreateService, setmodalCreateService] = useState(true);

    /////////Worker/////////
    const [worker, setWorker] = useState(null);
    var editDocument;
    //Recuperando informações do worker - get
    const urlWorker = baseUrl + 'worker/' + userAuth?.workerId;
  
    useEffect(()=>{
        axios.get(urlWorker)
          .then((response) => setWorker(response.data))
          .catch((err) => {
            console.error("Vish! " + err);
          })
    });
  
    const [document, setDocument] = useState('');
    const [cep, setCEP] = useState('');
    const [phone, setPhone] = useState('');

    //Atualizar worker
    const [updateWorker, setUpdateWorker] = useState({
      fullName: '',
      address: '',
      mainProfession: '',
      linkedin: '',
      description: '',
    });

    useEffect(() => {
      setUpdateWorker({
        fullName: worker?.fullName,
        address: worker?.address,
        mainProfession: worker?.mainProfession,
        linkedin: worker?.linkedIn,
        description: worker?.description,
      });
      setCEP(worker?.cep);
      setDocument(worker?.document);
      setPhone(worker?.cellPhone);
    }, [
        worker?.cep, worker?.document, worker?.cellPhone, 
        worker?.fullName, worker?.address, worker?.mainProfession, 
        worker?.linkedIn, worker?.description, 
    ]);

    function handleEditProfile(e) {
      const newUpdateWorker = { ...updateWorker };
      newUpdateWorker[e.target.id] = e.target.value;
      setUpdateWorker(newUpdateWorker);
      console.log(newUpdateWorker);
    }

    async function submitEditProfile() {
      event.preventDefault();
      try {
        await axios.patch(
          urlWorker,
          {
            cellPhone: phone,
            fullName: updateWorker.fullName,
            cep: cep,
            address: updateWorker.address,
            description: updateWorker.description,
            linkedIn: updateWorker.linkedin,
            mainProfession: updateWorker.mainProfession
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

    if(worker?.document.length === 11) {
      editDocument = <div className={styles.campoModalColumn}>
          <span>CPF*: </span>
          <MaskedInput
              mask='999.999.999-99'
              value={document}
              placeholder={worker?.document}
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
              placeholder={worker?.document}
              minLength='19'
              disabled={true}
              onChange={(event) => setDocument(event.target.value)}
          />
      </div>                    
    }

    /////////Services/////////
    const urlServices = baseUrl + 'services';

    const [manageService, setManageService] = useState(null);
    const [createService, setCreateService] = useState({
      name: '',
      description: '',
      price: '',
      workerId: userAuth?.workerId,
    });
    //Criação de um serviço - post
    function createServiceHandle(e) {
      const newCreateService = { ...createService };
      newCreateService[e.target.id] = e.target.value;
      setCreateService(newCreateService);
      console.log(newCreateService);
    }

    async function submitCreateService() {
      event.preventDefault();
      try {
        await axios.post(
          urlServices,
          {
            name: createService.name,
            description: createService.description,
            price: parseFloat(createService.price),
            workerId: createService.workerId,
          },
          {
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': 'POST ',
              'Content-Type': 'application/json',
            },
          }
        )

        alert('Serviço criado com sucesso');
      } catch (e) {
        if (e.response.status === 400) {
          alert(
            'Erro! Trabalhador inativo.'
          );
        }
      }
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
                      defaultValue={worker?.fullName}
                      value={updateWorker.fullName}
                      required
                    ></input>
                </div>
                <div className={styles.modalColumn}>
                  <div className={styles.campoModalColumn}>
                      <span>E-mail*: </span>
                      <input type="email" defaultValue={worker?.accounts.email} disabled required></input>
                  </div>
                  <div className={styles.campoModalColumn}>
                      <span>Data de nascimento*: </span>
                      <input type="date" defaultValue={worker?.birthDate} disabled required></input>
                  </div>
                </div>
                <div className={styles.modalColumn}>
                  <div className={styles.campoModalColumn}>
                      <span>Telefone*: </span>
                      <MaskedInput
                        mask='(99)99999-9999'
                        value={phone}
                        placeholder={worker?.cellPhone}
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
                        defaultValue={worker?.address}
                        value={updateWorker.address} 
                        required
                      ></input>
                  </div>
                  <div className={styles.campoModalColumn}>
                      <span>CEP*: </span>
                      <MaskedInput
                        mask='99.9999-99'
                        value={cep}
                        onChange={(event) => setCEP(event.target.value)}
                        placeholder={worker?.cep}
                        disabled={false}
                        minLength='10'
                      />
                  </div>
                </div>
                <div className={styles.modalColumn}>
                  <div className={styles.campoModalColumn}>
                      <span>Profissão principal*: </span>
                      <input
                        onChange={(e) => handleEditProfile(e)}
                        id='mainProfession'  
                        type="text" 
                        defaultValue={worker?.mainProfession}
                        value={updateWorker.mainProfession} 
                        required></input>
                  </div>
                  <div className={styles.campoModalColumn}>
                      <span>Linkedin: </span>
                      <input 
                        onChange={(e) => handleEditProfile(e)}
                        id='linkedin' 
                        type="text" 
                        defaultValue={worker?.linkedIn}
                        value={updateWorker.linkedin}
                      ></input>
                  </div>
                </div>
                <div className={styles.campoModalColumn}>
                    <span>Status de Atendimento*: </span>
                    <select id="status">
                        <option value="Disponível para trabalho" selected>Disponível para trabalho</option>
                        <option value="Ocupado no momento">Ocupado no momento</option>
                        <option value="Indisponível para trabalho">Indisponível para trabalho</option>
                    </select>
                </div>
                <div className={styles.campoModalColumn}>
                    <span>Descrição*:  </span>
                    <textarea 
                      onChange={(e) => handleEditProfile(e)}
                      id='description'  
                      defaultValue={worker?.description}
                      value={updateWorker.description} 
                      required
                    ></textarea>
                    <span className={styles.camposObrigatorios}>* Campos obrigatorios</span>
                </div>
                <div className={styles.botoesModal}>
                  <button type='button' onClick={()=>setModalEditProfile(true)}>Cancelar</button>
                  <button type='submit' onClick={()=>setModalEditProfile(true)}>Salvar</button>
                </div>
              </form>
              </div>
            </div>
          </div>

          <div hidden={modalEditService} className={!modalEditService ? styles.modalBackground : ''}>
            <div className={!modalEditService ? styles.modalContent : ''}>
              <h2>Alterar serviço</h2>
              <div className={styles.camposModal}>
                <div className={styles.campoModalColumn}>
                    <span>Nome do Serviço*: </span>
                    <input type="text" value={manageService?.name} required></input>
                </div>
                <div className={styles.campoModalColumn}>
                    <span>Preço médio*: </span>
                    <input type="number" value={manageService?.price} required></input>
                </div>
                <div className={styles.campoModalColumn}>
                    <span>Tempo para a conclusão do serviço*: </span>
                    <input type="text" placeholder="Não tem no banco" required></input>
                </div>
                <div className={styles.campoModalColumn}>
                    <span>Descrição*:  </span>
                    <textarea  value={manageService?.description} required></textarea>
                    <span className={styles.camposObrigatorios}>* Campos obrigatorios</span>
                </div>
                <div className={styles.botoesModal}>
                  <button onClick={()=>setmodalEditService(true)}>Cancelar</button>
                  <button onClick={()=>setmodalEditService(true)}>Salvar</button>
                </div>
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

          <div hidden={modalDeleteService} className={!modalDeleteService ? styles.modalBackground : ''}>
            <div className={!modalDeleteService ? styles.modalContent : ''}>
                <h2>Deletar serviço</h2>
                <div className={styles.camposModal}>
                  <span>Tem certeza que deseja deletar este serviço?</span>
                  <div className={styles.campoModalColumn}> 
                    <div className={styles.botoesModal}>
                      <button onClick={()=>setmodalDeleteService(true)}>Não</button>
                      <button className={styles.botaoDeletar} onClick={()=>setmodalDeleteService(true)}>Sim</button>
                    </div>
                  </div>
                </div>
            </div>
          </div>

          <div hidden={modalCreateService} className={!modalCreateService ? styles.modalBackground : ''}>
            <div className={!modalCreateService ? styles.modalContent : ''}>
              <h2>Anunciar um serviço</h2>
              <div className={styles.camposModal}>
              <form onSubmit={submitCreateService}>
                <div className={styles.campoModalColumn}>
                    <span>Nome do Serviço*: </span>
                    <input 
                      onChange={(e) => createServiceHandle(e)}
                      id='name' 
                      type="text" 
                      placeholder="Informe o título do seu serviço"
                      value={createService.name}
                      required
                    >
                    </input>
                </div>
                <div className={styles.campoModalColumn}>
                    <span>Preço médio*: </span>
                    <input 
                      onChange={(e) => createServiceHandle(e)}
                      id='price'  
                      type="number" 
                      placeholder="Informe o preço médio do serviço"
                      value={createService.price}
                      required
                    >
                    </input>
                </div>
                <div className={styles.campoModalColumn}>
                    <span>Tempo para a conclusão do serviço*: </span>
                    <input 
                      type="text" 
                      placeholder="Não tem no banco" 
                      //required
                    >
                    </input>
                </div>
                <div className={styles.campoModalColumn}>
                    <span>Descrição*:  </span>
                    <textarea
                      onChange={(e) => createServiceHandle(e)} 
                      id='description'  
                      placeholder="Descreva o mais detalhado possível sobre o serviço." 
                      value={createService.description}
                      required
                      >
                      </textarea>
                    <span className={styles.camposObrigatorios}>* Campos obrigatorios</span>
                </div>
                <div className={styles.botoesModal}>
                  <button onClick={()=>setmodalCreateService(true)}>Cancelar</button>
                  <button type="submit">Criar</button>
                </div>
                </form>
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
                    <h1>{worker?.fullName}</h1>
                    <span>{worker?.mainProfession}</span>
                    <img src='img/content/staricon.svg' />
                    <div className={styles.buttonEdit}>
                      <button onClick={()=> setModalEditProfile(false)}>
                          <span>EDITAR PERFIL</span>
                          <img src='icons/iconEditar.svg' />
                      </button>
                    </div>
                    <p>{worker?.description}</p>
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
                    <div className={styles.informacaoAdicional}>
                      <span>Status: </span>
                      <span className={styles.verdeStatus}>
                        Disponível para trabalho
                      </span>
                    </div>
                  </div>
                </section>
                <section className={styles.numerosPlataforma}>
                  <h3> Números na plataforma </h3>
                  <div className={styles.numeroPlataforma}>
                    <span>Serviços realizados: </span>
                    <span>20</span>
                  </div>
                  <div className={styles.numeroPlataforma}>
                    <span>Nota média dos serviços prestados: </span>
                    <span>4.0/5</span>
                  </div>
                </section>
              </div>
              <div className={styles.rightSide}>
                <section className={styles.servicosUsuario}>
                  <h2>Meus serviços</h2>
                  <div>
                    <ul className={styles.cardsServicos}>
                      {worker?.services.map((service) =>
                        <li key={service.id}>
                          <div className={styles.cardServico}>
                            <img src='img/content/servico.png' />
                            <h3> {service.name} </h3>
                            <div className={styles.descricaoServico}>
                              <span> {service.description} </span>
                            </div>
                            <div className={styles.buttonsCard}>
                              <button onClick= {() => { Router.push({pathname: '/servico', query: service}, '/servico') }}>
                                <span>EXIBIR DETALHES</span>
                                <img src='icons/iconPlus.svg' />
                              </button>
                              <button onClick={()=> (setmodalEditService(false), setManageService(service))}>
                                <span>ALTERAR SERVIÇO</span>
                                <img src='icons/iconEditar.svg' />
                              </button>
                              <button className={styles.botaoDeletar} onClick={()=> setmodalDeleteService(false)}>
                                <span>EXCLUIR SERVIÇO</span>
                                <img src='icons/iconDelete.svg' />
                              </button>
                            </div>
                          </div>
                        </li>
                      )}
                      <li>
                        <div className={styles.cardAdicionar} onClick={()=> setmodalCreateService(false)}>
                          <img src='icons/iconPlus.svg' />
                          <span>ADICIONAR SERVIÇO</span>
                        </div>
                      </li>
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