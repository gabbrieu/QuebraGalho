/* eslint-disable @next/next/no-img-element */
import Head from 'next/head';
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
                <h1>Serviço do Pedreiro</h1>
                <img src="img/content/staricon.svg"/>
                <p> Trabalho como pedreiro há mais de 20 anos, sou bem caprichoso e tenho preços muito acessíveis. Sou uma pessoa bem tranquila e responsável. Aceito Pix e dinheiro nos meus serviços. </p>
                <div className={styles.camposServico}>
                  <div className= {styles.campoServico}>
                    <span>Faixa de preço: </span>
                    <span>R$100 a R$120/dia</span>
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
          </div>
        </div>
      </div>
    </main>
  </>
);
}