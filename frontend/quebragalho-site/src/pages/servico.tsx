/* eslint-disable @next/next/no-img-element */
import Head from 'next/head';
import Router from 'next/router';
import { MenuLogged } from '../components/MenuLogged';
import styles from '../styles/pages/Servico.module.scss';

export default function Servico(){
return(
  <>
    <Head>
        <title>Quebra Galho | Serviços</title>
        <meta name='description' content='Projeto Quebra Galho' />
        <link rel='icon' href='/favicon.ico' />
    </Head>
    <MenuLogged imgLink="img/layout/imgMenuPerfil.svg"/>
    <main>
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
                <h1> { Router.query.name } </h1>
                <img src="img/content/staricon.svg"/>
                <p> { Router.query.description } </p>
                <div className={styles.camposServico}>
                  <div className= {styles.campoServico}>
                    <span>Preço médio: </span>
                    <span> { Router.query.price } </span>
                  </div>
                  <div className= {styles.campoServico}>
                    <span>Status: </span>
                    <span className={styles.verdeStatus}>Disponível para trabalho</span>
                  </div>
                  <div className= {styles.campoServico}>
                    <span>Tempo para conclusão do serviço: </span>
                    <span>Relativo ao tamanho do imóvel</span>
                  </div>
                  <button><span>Combinar Serviço</span><img src="icons/iconCombinarButton.svg" /></button>
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
                    <div className={styles.notaDepoimento}>
                      <span> Nota: </span>
                      <img src="img/content/staricon.svg" />
                    </div>
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
                    <div className={styles.notaDepoimento}>
                      <span> Nota: </span>
                      <img src="img/content/staricon.svg" />
                    </div>
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
                    <div className={styles.notaDepoimento}>
                      <span> Nota: </span>
                      <img src="img/content/staricon.svg" />
                    </div>
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