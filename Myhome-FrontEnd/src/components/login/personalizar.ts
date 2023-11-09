import styled from 'styled-components';

export const Container = styled.div`
  .areaDeLogin {
    display: flex;
    border-radius: 16px;
    background-color: #D9D9D9;
    text-align: center;
    line-height: center;
    width: 944px;
    height: 657px;
  }

  .areaDeLogin__esquerda {
    background-color: #2F8FAD;
    width: 100%; 
    max-width: 304px; 
    height: 656px;
    flex-shrink: 0;
    border-radius: 16px 0 0 16px;
    text-align: left;
  }

  .areaDeLogin__esquerda img {
    margin-top: 100px;
    padding-left: 30px;
  }

  .areaDeLogin__esquerda h1 {
    color: #000;
    font-family: 'Poppins', sans-serif;
    font-size: 32px;
    font-style: normal;
    font-weight: 900;
    line-height: normal;
    padding-left: 30px;
  }

  .areaDeLogin__esquerda h2 {
    color: #000;
    font-family: 'Poppins', sans-serif;
    font-size: 24px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    padding-left: 30px;
  }

  .areaDeLogin__direita {
    display: flex;
    width: 100%;
    max-width: 640px; 
    height: 656px;
    border-radius: 0 16px 16px 0;
    background-color: #D9D9D9;
  }

  @media (max-width: 768px) {
    .areaDeLogin {
      flex-direction: column; 
    }
    .areaDeLogin {
      width: 100%;
      max-width: none; 
      border-radius: 16px;
    }
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 80%;
  max-width: 600px; 
  margin: auto;
  align-items: center;

  h1 {
    color: #2F8FAD;
  }
  h2 {
    color: #2F8FAD;
  }

  .input {
    width: 80%; 
    background-color: #D9D9D9;
    margin-bottom: 2rem;
  }

  .password {
    width: 80%;
    background-color: #D9D9D9;
    margin-bottom: 1rem; 

  }

  .bottom {
    width: 80%; 
    display: flex;
    align-items: flex-end; 
    margin-top: 1rem;
  }

  .esqueceuSenha {
    width: 100%; 
    margin-top: 3rem;
  }

  @media (max-width: 768px) {
    .input,
    .password,
    .bottom,
    .esqueceuSenha {
      width: 100%; 
    }
  }
`;
