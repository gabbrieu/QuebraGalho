/* eslint-disable @next/next/no-img-element */
import Head from 'next/head';
import Router from 'next/router';

import styles from '../styles/pages/Servico.module.scss';
import stylesModal from '../styles/pages/Perfilusuario.module.scss';

import { MenuHomePage } from '../components/MenuHomePage';
import { MenuLogged } from '../components/MenuLogged';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';

export default function Servico(){
  const { userAuth } = useContext(AuthContext);

  const [user, setUser] = useState(null);
  var urlUser;
  var contractButton = null;

  if(userAuth?.type === 'WORKER'){
    urlUser = 'http://localhost:3001/worker/' + userAuth?.workerId;
    contractButton = null;
  } else {
    urlUser = 'http://localhost:3001/customer/' + userAuth?.customerId;
    contractButton = <button onClick={()=> setHiddenModal(false)}><span>Combinar Serviço</span><img src="icons/iconCombinarButton.svg" /></button>;
  }

  useEffect(()=>{
    axios.get(urlUser)
      .then((response) => setUser(response.data))
      .catch((err) => {
        console.error("Erro: " + err);
      })
    axios.get(baseUrl + '/' + Router.query.id)
      .then((response) => setService(response.data))
      .catch((err) => {
        console.error("Erro: " + err);
    })
  }, [urlUser]);
  
  const [hiddenModal, setHiddenModal] = useState(true);
  const [service, setService] = useState(null);

  const baseUrl = 'http://localhost:3001/services';

  var navMenu;

  if( !userAuth ){
    navMenu = <MenuHomePage />
  } else {
    navMenu = <MenuLogged />
  }

  //Realizar um contrato
  const urlContract = 'http://localhost:3001/contract';
  
  const [contract, setContract] = useState({
    price: '',
    startDate: '',
    endDate: '',
    descriptionService: '',
    serviceId: '',
    customerId: '',
  });

  useEffect(() => {
    setContract({
      price: '',
      startDate: '',
      endDate: '',
      descriptionService: '',
      serviceId: service?.id,
      customerId: user?.id,
    })
  }, [service?.id, user?.id])

  //Criação de um contrato - post
  function contractHandle(e) {
    const newContract = { ...contract };
    newContract[e.target.id] = e.target.value;
    setContract(newContract);
    console.log(newContract);
  }

  async function submitContract() {
    event.preventDefault();
    try {
      await axios.post(
        urlContract,
        {
          price: parseFloat(contract.price),
          startDate: contract.startDate,
          endDate: contract.endDate,
          descriptionService: contract.descriptionService,
          serviceId: contract.serviceId,
          customerId: contract.customerId,
        },
        {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST ',
            'Content-Type': 'application/json',
          },
        }
      )

      alert('Contrato solicitado! Aguarde contato do trabalhador.');
    } catch (e) {
      alert(
        'Erro! Não foi possível solicitar o contrato de serviço.'
      );
    }
  }

return(
  <>
    <Head>
        <title>Quebra Galho | Serviço</title>
        <meta name='description' content='Projeto Quebra Galho' />
        <link rel='icon' href='/favicon.ico' />
    </Head>
    <MenuLogged />
    
    <main>
      <div hidden={hiddenModal} className={!hiddenModal ? stylesModal.modalBackground : ''}>
        <div className={!hiddenModal ? stylesModal.modalContent : ''}>
          <h2>Solicitar Serviço</h2>
          <div className={stylesModal.camposModal}>
          <form onSubmit={submitContract}>
            <div className={stylesModal.campoModalRow}>
                <span>Serviço Solicitado: </span>
                <span>{service?.name} </span>
            </div>
            <div className={stylesModal.campoModalRow}>
                <span>Nome do Profissional: </span>
                <span>{service?.worker.fullName}</span>
            </div>
            <div className={stylesModal.campoModalColumn}>
                <span>Preço desejado*: </span>
                <input
                  onChange={(e) => contractHandle(e)}
                  value={contract.price} 
                  id="price"
                  type="number" 
                  placeholder="Digite o valor no qual pretende pagar pelo serviço" 
                  required
                ></input>
            </div>
            <div className={stylesModal.campoModalColumn}>
                <span>Data de início*: </span>
                <input
                  onChange={(e) => contractHandle(e)}
                  value={contract.startDate} 
                  id="startDate"
                  type="date" 
                  placeholder="Digite suas preferencias de data para realização do serviço" 
                  required
                ></input>
            </div>
            <div className={stylesModal.campoModalColumn}>
                <span>Data de fim*: </span>
                <input 
                  onChange={(e) => contractHandle(e)} 
                  value={contract.endDate}
                  id="endDate"
                  type="date" 
                  placeholder="Digite suas preferencias de data para realização do serviço" 
                  required
                ></input>
            </div>
            <div className={stylesModal.campoModalColumn}>
                <span>Descrição do pedido de serviço*:  </span>
                <textarea 
                  onChange={(e) => contractHandle(e)}
                  value={contract.descriptionService} 
                  id="descriptionService" 
                  placeholder="Descreva o mais detalhado possível sobre o serviço que deseja solicitar. Ex: Gostaria de contratar um pintor para pintar meu quarto de 20 metros quadrados. As tintas para a pintura já foram compradas." 
                  required
                ></textarea>
                <span className={stylesModal.camposObrigatorios}>* Campos obrigatorios</span>
            </div>
            <div className={stylesModal.botoesModal}>
              <button type="button" onClick={()=>setHiddenModal(true)}>Cancelar</button>
              <button type="submit" onClick={()=>setHiddenModal(true)}>Solicitar</button>
            </div>
          </form>
          </div>
        </div>
      </div>

      <div className={styles.background}>
        <div className={styles.container}>
          <div className={styles.leftSide}>
            <div className = {styles.imgPrincipal}>
              <img src = "img/content/servicoQuadrado.png" alt= 'Serviço imagem quadrada' />
            </div>
            <div className = {styles.imgMenores}>
              <img src = "img/content/servicoQuadrado.png" alt= 'Serviço imagem quadrada' />
              <img src = "img/content/servicoQuadrado.png" alt= 'Serviço imagem quadrada' />
              <img src = "img/content/servicoQuadrado.png" alt= 'Serviço imagem quadrada' />
            </div>
          </div>
          <div className={styles.rightSide}>
              <div className = {styles.boxServico}>
                <h1> { service?.name } </h1>
                <p> { service?.description } </p>
                <div className={styles.camposServico}>
                  <div className= {styles.campoServico}>
                    <span>Preço médio: </span>
                    <span> { service?.price } </span>
                  </div>
                  <div className= {styles.campoServico}>
                    <span>Tempo para conclusão do serviço: </span>
                    <span>Relativo ao tamanho do imóvel</span>
                  </div>
                  {contractButton}
                </div>
              </div>
              <h2>Depoimentos dos clientes</h2>
              <div className={styles.boxDepoimentos}>
                <div className={styles.cabecalhoDepoimentos}>
                  <span> Júlia Alves </span>
                  <img src ="icons/iconCombinarButton.svg"/>
                  <span> José Luiz </span>
                </div>
                <div className={styles.conteudoDepoimento}>
                  <div className={styles.fotoPerfilDep}>
                    <img src = "img/content/fotoPerfilJ.png"/>
                  </div>
                 <div className={styles.camposDepoimento}>
                    <h2>Júlia Alves</h2>
                    <p> Trabalho muito bem feito, recomendo para todas as pessoas que precisam de serviço de pedreiro! </p>
                 </div>
                </div>
              </div>
              <div className={styles.boxDepoimentos}>
                <div className={styles.cabecalhoDepoimentos}>
                  <span> Rita Carvalho </span>
                  <img src ="icons/iconCombinarButton.svg"/>
                  <span> José Luiz </span>
                </div>
                <div className={styles.conteudoDepoimento}>
                  <div className={styles.fotoPerfilDep}>
                    <img src = "img/content/fotoPerfilR.png"/>
                  </div>
                 <div className={styles.camposDepoimento}>
                    <h2>Rita Carvalho</h2>
                    <p> Trabalho muito bacana. Construiu minha casa bem rápido e por um preço bem acessível. </p>
                 </div>
                </div>
              </div>
              <div className={styles.boxDepoimentos}>
                <div className={styles.cabecalhoDepoimentos}>
                  <span> Thiago Carvalho </span>
                  <img src ="icons/iconCombinarButton.svg"/>
                  <span> José Luiz </span>
                </div>
                <div className={styles.conteudoDepoimento}>
                  <div className={styles.fotoPerfilDep}>
                    <img src = "img/content/fotoPerfilT.png"/>
                  </div>
                 <div className={styles.camposDepoimento}>
                    <h2>Thiago Carvalho</h2>
                    <p> Ótimo profissional, trabalho maravilhoso. </p>
                 </div>
                </div>
              </div>
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