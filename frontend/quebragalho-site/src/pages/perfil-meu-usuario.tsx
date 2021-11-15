/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @next/next/no-img-element */
import Head from 'next/head';
import { useState } from 'react';
import { MenuLogged } from '../components/MenuLogged';
import {ModalService } from '../components/ModalService';
import styles from '../styles/pages/Perfilusuario.module.scss';

export default function PerfilUsuario() {
  const [hiddenModal, setHiddenModal] = useState(true); 

  return (
    <>
      <Head>
        <title>Quebra Galho | Inicio</title>
        <meta name='description' content='Projeto Quebra Galho' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <MenuLogged imgLink="img/content/fotoPerfil.png" />

      <main>
        <div hidden={hiddenModal} className={!hiddenModal ? styles.modalBackground : ''}>
          <div className={!hiddenModal ? styles.modalContent : ''}>
            <h2>Editar Serviço</h2>
            <div className={styles.camposModal}>
            <div className={styles.campoModalColumn}>
                  <span>Nome*: </span>
                  <input type="text" placeholder="José" required></input>
              </div>
              <div className={styles.campoModalRow}>
                  <span>Serviço Solicitado: </span>
                  <span>Serviço de Pintor </span>
              </div>
              <div className={styles.campoModalRow}>
                  <span>Nome do Cliente: </span>
                  <span>Luiz Ricardo </span>
              </div>
              <div className={styles.campoModalRow}>
                  <span>Nome do Profissional: </span>
                  <span>José Luis</span>
              </div>
              <div className={styles.campoModalColumn}>
                  <span>Datas e horas disponíveis para realização do serviço*: </span>
                  <input type="text" placeholder="Digite suas preferencias de data para realização do serviço" required></input>
              </div>
              <div className={styles.campoModalColumn}>
                  <span>Endereço em que o serviço deve ser realizado*: </span>
                  <input type="text" placeholder="Digite o endereço em que o serviço deve ser realizado" required></input>
              </div>
              <div className={styles.campoModalColumn}>
                  <span>Descrição do pedido de serviço*:  </span>
                  <textarea  placeholder="Descreva o mais detalhado possível sobre o serviço que deseja solicitar. Ex: Gostaria de contratar um pintor para pintar meu quarto de 20 metros quadrados. As tintas para a pintura já foram compradas." required></textarea>
                  <span className={styles.camposObrigatorios}>* Campos obrigatorios</span>
              </div>
              <div className={styles.botoesModal}>
                <button onClick={()=>setHiddenModal(true)}>Cancelar</button>
                <button onClick={()=>setHiddenModal(true)}>Solicitar</button>
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
                  </div>
                  <h1>José Luis</h1>
                  <span>Pedreiro | Carpinteiro | Pintor </span>
                  <img src='img/content/staricon.svg' />
                  <div className={styles.buttonEdit}>
                    <button onClick={()=> setHiddenModal(false)}>
                        <span>EDITAR PERFIL</span>
                        <img src='icons/iconEditar.svg' />
                    </button>
                  </div>
                  <p>
                    Trabalho como pedreiro há mais de 20 anos, sou bem
                    caprichoso e tenho preços muito acessíveis. Sou uma pessoa
                    bem tranquila e responsável. Aceito Pix e dinheiro nos meus
                    serviços.
                  </p>
                </div>
                <div className={styles.informacoesAdicionais}>
                  <h3>Informações Adicionais</h3>
                  <div className={styles.informacaoAdicional}>
                    <span>Telefone: </span>
                    <span>(99)99999-9999</span>
                  </div>
                  <div className={styles.informacaoAdicional}>
                    <span>E-mail: </span>
                    <span>joseluizpedreiro@gmail.com</span>
                  </div>
                  <div className={styles.informacaoAdicional}>
                    <span>Cidade: </span>
                    <span>Itabira - MG</span>
                  </div>
                  <div className={styles.informacaoAdicional}>
                    <span>Profissão Principal: </span>
                    <span>Pedreiro</span>
                  </div>
                  <div className={styles.informacaoAdicional}>
                    <span>Faço também trabalhos de: </span>
                    <span>Carpinteiro, Pintor</span>
                  </div>
                  <div className={styles.informacaoAdicional}>
                    <span>Linkedin: </span>
                    <span>https://www.linkedin.com/joseluispedreiro</span>
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
                <div className={styles.cardsServicos}>
                  <div className={styles.cardServico}>
                    <img src='img/content/servico.png' />
                    <h3> Serviço de Pedreiro</h3>
                    <span>
                      Presto serviços de pedreiro para casas e apartamentos.
                      Valores a combinar.
                    </span>
                    <div className={styles.buttonsCard}>
                      <button>
                        <span>EXIBIR DETALHES</span>
                        <img src='icons/iconPlus.svg' />
                      </button>
                      <button>
                        <span>ALTERAR SERVIÇO</span>
                        <img src='icons/iconEditar.svg' />
                      </button>
                    </div>
                  </div>
                  <div className={styles.cardServico}>
                    <img src='img/content/servico.png' />
                    <h3> Serviço de Pedreiro</h3>
                    <span>
                      Presto serviços de pedreiro para casas e apartamentos.
                      Valores a combinar.
                    </span>
                    <div className={styles.buttonsCard}>
                      <button>
                        <span>EXIBIR DETALHES</span>
                        <img src='icons/iconPlus.svg' />
                      </button>
                      <button>
                        <span>ALTERAR SERVIÇO</span>
                        <img src='icons/iconEditar.svg' />
                      </button>
                    </div>
                  </div>
                  <div className={styles.cardServico}>
                    <img src='img/content/servico.png' />
                    <h3> Serviço de Pedreiro</h3>
                    <span>
                      Presto serviços de pedreiro para casas e apartamentos.
                      Valores a combinar.
                    </span>
                    <div className={styles.buttonsCard}>
                      <button>
                        <span>EXIBIR DETALHES</span>
                        <img src='icons/iconPlus.svg' />
                      </button>
                      <button>
                        <span>ALTERAR SERVIÇO</span>
                        <img src='icons/iconEditar.svg' />
                      </button>
                    </div>
                  </div>
                  <div className={styles.cardAdicionar}>
                    <img src='icons/iconPlus.svg' />
                    <span>ADICIONAR SERVIÇO</span>
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