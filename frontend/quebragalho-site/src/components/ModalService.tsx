import { useState } from 'react';

export function ModalService(props) {
  //const [modalAberto, setModalAberto] = useState(false);

  function alteraPropsHidden(props)
  {
    props.hidden = true;
    console.log(props.hidden)
  }

  return(
    <div hidden={props.hidden}>
      <h1>TESTE</h1>
      <button onClick={alteraPropsHidden}> Teste </button>
    </div>
  );
}