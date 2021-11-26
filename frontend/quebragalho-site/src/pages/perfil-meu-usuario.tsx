/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @next/next/no-img-element */
import axios from 'axios';
import Head from 'next/head';
import Router from 'next/router';
import { useEffect, useState } from 'react';
import { MenuLogged } from '../components/MenuLogged';
import styles from '../styles/pages/Perfilusuario.module.scss';
import MaskedInput from '../utils/MaskedInput';

const urlWorker = 'http://localhost:3001/worker/d38c4eb4-75b5-4e80-8e5e-129a15a6cd79';
const urlServices = 'http://localhost:3001/services'
const idWorker = "d38c4eb4-75b5-4e80-8e5e-129a15a6cd79";

export default function PerfilUsuario() {
  //Modals
  const [modalEditProfile, setModalEditProfile] = useState(true);
  const [modalEditService, setmodalEditService] = useState(true);
  const [modalEditPhotos, setModalEditPhotos] = useState(true);
  const [modalDeleteService, setmodalDeleteService] = useState(true);
  const [modalCreateService, setmodalCreateService] = useState(true);

  //Worker
  const [worker, setWorker] = useState(null);

  //Services
  const [manageService, setManageService] = useState(null);
  const [createService, setCreateService] = useState({
    name: '',
    description: '',
    price: '',
    workerId: idWorker,
  });

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
      );

      alert('Serviço criado com sucesso');
      Router.reload();
    } catch (e) {
      if (e.response.status === 400) {
        alert(
          'Erro! Trabalhador inativo.'
        );
      }
    }
  }

  useEffect(()=>{
      axios.get(urlWorker)
        .then((response) => setWorker(response.data))
        .catch((err) => {
          console.error("Vish! " + err);
        })
  });

  const [cpf, setCPF] = useState('');
  const [cep, setCEP] = useState('');
  const [phone, setPhone] = useState('');

  return (
    <>
      <Head>
        <title>Quebra Galho | Inicio</title>
        <meta name='description' content='Projeto Quebra Galho' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <MenuLogged imgLink="img/content/fotoPerfil.png" />

      <main>
        <div hidden={modalEditProfile} className={!modalEditProfile ? styles.modalBackground : ''}>
          <div className={!modalEditProfile ? styles.modalContent : ''}>
            <h2>Editar Perfil</h2>
            <div className={styles.camposModal}>
              <div className={styles.campoModalColumn}>
                  <span>Nome completo*: </span>
                  <input type="text" defaultValue={worker?.fullName} required></input>
              </div>
              <div className={styles.modalColumn}>
                <div className={styles.campoModalColumn}>
                    <span>E-mail*: </span>
                    <input type="email" defaultValue={worker?.accounts.email} required></input>
                </div>
                <div className={styles.campoModalColumn}>
                    <span>Data de nascimento*: </span>
                    <input type="date" defaultValue={worker?.birthDate} required></input>
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
                      onChange={(event) => setPhone(event.target.value)}
                  />
                </div>
                <div className={styles.campoModalColumn}>
                    <span>CPF*: </span>
                    <MaskedInput
                        mask='999.999.999-99'
                        value={cpf}
                        placeholder={worker?.document}
                        minLength='14'
                        onChange={(event) => setCPF(event.target.value)}
                    />
                </div>
              </div>
              <div className={styles.modalColumn}>
                <div className={styles.campoModalColumn}>
                    <span>Endereço*: </span>
                    <input type="text" defaultValue={worker?.address} required></input>
                </div>
                <div className={styles.campoModalColumn}>
                    <span>CEP*: </span>
                    <MaskedInput
                      mask='99.9999-99'
                      value={cep}
                      onChange={(event) => setCEP(event.target.value)}
                      placeholder={worker?.cep}
                      minLength='10'
                    />
                </div>
              </div>
              <div className={styles.modalColumn}>
                <div className={styles.campoModalColumn}>
                    <span>Profissão Principal*: </span>
                    <input type="text" defaultValue={worker?.mainProfession} required></input>
                </div>
                <div className={styles.campoModalColumn}>
                    <span>Linkedin: </span>
                    <input type="text" defaultValue={worker?.linkedIn}></input>
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
                  <textarea  defaultValue={worker?.description} required></textarea>
                  <span className={styles.camposObrigatorios}>* Campos obrigatorios</span>
              </div>
              <div className={styles.botoesModal}>
                <button onClick={()=>setModalEditProfile(true)}>Cancelar</button>
                <button onClick={()=>setModalEditProfile(true)}>Salvar</button>
              </div>
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
                    <span>{worker?.linkedIn}o</span>
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
                <h2>Contrate meus serviços</h2>
                <div>
                  <ul className={styles.cardsServicos}>
                    {worker?.services.map((service) =>
                      <li key={service.id}>
                        <div className={styles.cardServico}>
                          <img src='img/content/servico.png' />
                          <h3> {service.name} </h3>
                          <span> {service.description} </span>
                          <div className={styles.buttonsCard}>
                            <button>
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