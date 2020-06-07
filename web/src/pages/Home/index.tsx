import React from 'react';

import logo from '../../assets/logo.svg';

import {Link} from 'react-router-dom';

import { FiLogIn } from 'react-icons/fi';

import {Container, Content, Header, Main} from './styles';

const Home: React.FC = () => {

  return(
    <Container>
      <Content>
        <Header>
          <img src={logo} alt="Ecoleta"/>
        </Header>

        <Main>
          <h1>Seu marketplace de coleta de resíduos.</h1>
          <p>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente</p>
          <Link to="/cadastro">
            <span>
              <FiLogIn size={32}/>
            </span>
            <strong>Cadastre um ponto de coleta</strong>
          </Link>

        </Main>
      </Content>

    </Container>
  );
}

export default Home;
