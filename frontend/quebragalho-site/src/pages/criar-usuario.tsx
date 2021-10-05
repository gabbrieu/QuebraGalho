import { MenuLoginCreate } from '../components/MenuLoginCreate'
import React from 'react';
import { useState } from "react";
import styles from '../styles/pages/Criarusuario.module.scss'


export default function Criarusuario() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [abaSelecionada, setAbaSelecionada] = useState(0);
    const [abaPessoa, setAbaPessoa] = useState(0);

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
                    <span>Escolha entre criar uma conta de profissional ou de cliente para ter acesso completo à plataforma!</span>
                </div>
                <div className={styles.boxCriarconta}>
                    <div className={styles.cabecalhoAbas}>
                        <div onClick={() => selecionarAba(0)} className={abaSelecionada === 0 ? `${styles.abaItem} ${styles.abaActive}` : styles.abaItem}>
                            <span>Criar conta de Cliente</span>
                        </div>
                        <div onClick={() => selecionarAba(1)} className={abaSelecionada === 1 ? `${styles.abaItem} ${styles.abaActive}` : styles.abaItem}>
                            <span>Criar conta de profissional</span>
                        </div>
                    </div>

                    <div className={styles.textoFormulario}>
                        {abaSelecionada === 0
                            ? (
                                <span>Crie uma conta do tipo cliente para visualizar os profissionais que atuam em nossa plataforma. Se você for quiser vender seus serviços, selecione a aba ao lado.</span>
                            ) : (
                                <span>Crie uma conta do tipo profissional para divulgar seus serviços em nossa plataforma. Se você for quiser contratar profissionais para realizar serviços, selecione a aba ao lado.</span>
                            )}

                    </div>
                    <div className={styles.AbaPessoaFJ}>
                        <div onClick={() => selecionarAbaPessoa(0)} className={abaPessoa === 0 ? `${styles.abaPessoa} ${styles.abaPActive}` : styles.abaPessoa}>
                            <span>Pessoa física</span>
                        </div>
                        <div onClick={() => selecionarAbaPessoa(1)} className={abaPessoa === 1 ? `${styles.abaPessoa} ${styles.abaPActive}` : styles.abaPessoa}>
                            <span>Pessoa jurídica</span>
                        </div>
                    </div>
                    <div className={styles.camposFormulario}>
                        <form action="post">
                            <div className={styles.campos}>
                                <div className={styles.inputLabel}>
                                    <label> Nome*: </label>
                                    <input placeholder="Digite seu nome" required type="text" />
                                </div>
                                <div className={styles.inputLabel}>
                                    <label> Sobrenome*: </label>
                                    <input placeholder="Digite sua sobrenome" required type="text" />
                                </div>
                                <div className={styles.inputLabel}>
                                    <label> Senha*: </label>
                                    <input placeholder="Digite sua senha" required type="password" />
                                </div>
                                <div className={styles.inputLabel}>
                                    <label> Confirmar senha*: </label>
                                    <input placeholder="Digite sua senha" required type="password" />
                                </div>
                                <div className={styles.inputLabel}>
                                    <label> E-mail*: </label>
                                    <input placeholder="Digite seu e-mail" required type="email" />
                                </div>
                                <div className={styles.inputLabel}>
                                    <label> Data de nascimento*: </label>
                                    <input placeholder="Digite sua senha" required type="date" />
                                </div>
                                <div className={styles.inputLabel}>
                                    <label> Telefone*: </label>
                                    <input placeholder="Digite seu telefone" required type="text" />
                                </div>
                                <div className={styles.inputLabel}>
                                    {abaPessoa === 0 ? (
                                        <>
                                            <label> CPF*: </label>
                                            <input placeholder="Digite seu CPF" required type="text" />
                                        </>
                                    ) : (
                                        <>
                                            <label> CNPJ*: </label>
                                            <input placeholder="Digite seu CNPJ" required type="text" />
                                        </>
                                    )}

                                </div>
                                <div className={styles.inputLabel}>
                                    <label> CEP*: </label>
                                    <input placeholder="Digite seu cpf" required type="text" />
                                </div>
                                <div className={styles.inputLabel}>
                                    <label> Endereço*: </label>
                                    <input placeholder="Digite seu cpf" required type="text" />
                                </div>
                                <div className={styles.inputLabel}>
                                    <label> Foto de perfil*: </label>
                                    <div className={styles.inputFile}>
                                        <input placeholder="Escolha uma foto de perfil" disabled />
                                        <label htmlFor="file-upload" className={styles.customFileUpload}>
                                            Escolher foto
                                        </label>
                                        <input id="file-upload" type="file" />
                                    </div>
                                </div>
                                {abaSelecionada === 1
                                    ? (
                                        <>
                                            <div className={styles.inputLabel}>
                                                <label> Linkedin: </label>
                                                <input placeholder="Digite seu Linkedin" type="text" />
                                            </div>
                                            <div className={styles.inputLabel}>
                                                <label> Porfissão principal*: </label>
                                                <input placeholder="Digite seu Linkedin" required type="text" />
                                            </div>
                                            <div className={styles.inputLabel}>
                                                <label> Escreva um pouco sobre você*: </label>
                                                <textarea placeholder="Descreva suas principais características e pontos positivos. Fale um pouco sobre o motivo pelo qual alguém deveria contratar seus serviços " required></textarea>
                                            </div>
                                        </>
                                    ) : ('')}

                            </div>
                            <div className={styles.camposBotao}>
                                <span>*Campos obrigatórios</span>
                                <button>Cadastrar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div >

    )
}


