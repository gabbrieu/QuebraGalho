/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @next/next/no-img-element */
import styles from '../styles/components/MenuLogged.module.scss';
export function MenuLogged(props) {
  return (
    <div className={styles.menuContainerFluid}>
      <div className={styles.menuContainer}>
        <div className={styles.logoMenu}>
          <a href='localhost:3000/index.tsx'>
            <img src='img/layout/logo.svg' />
            <span>Quebra Galho</span>
          </a>
        </div>
        <div className={styles.buscaSection}>
          <input placeholder='Buscar serviço' />
          <div className={styles.botaoBusca}>
            <img src='icons/botaoBusca.svg' />
          </div>
        </div>
        <div className={styles.iconsMenuLogged}>
          <div className={styles.boxIcon}>
            <a href='#'>
              <img src='icons/iconInicio.svg' />
              <span> Inicio </span>
            </a>
          </div>
          <div className={styles.boxIcon}>
            <a href='#'>
              <img src='icons/iconNotificacao.svg' />
              <span> Notificações </span>
            </a>
          </div>
          <div className={styles.boxIconEu}>
            <a href='#'>
              <img src= {props.imgLink} />
              <div className={styles.euLink}>
                <span> Eu </span>
                {/* <img src='img/layout/dropdown.svg' /> */}
              </div>
            </a>
          </div>
          <div className={styles.sairBox}>
            <a href='/'>
              <img src='icons/iconExit2.svg' />
              <span> Sair </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
