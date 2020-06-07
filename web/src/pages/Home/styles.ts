import styled from 'styled-components';

import backgroundImg from '../../assets/home-background.svg';

import {darken} from 'polished';

export const Container = styled.div`
  height: 100vh;

  background: url(${backgroundImg}) no-repeat 700px bottom;

`;

export const Content = styled.div`
  width: 100%;
  height: 100%;
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 30px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media(max-width: 900px) {
    align-items: center;
    text-align: center;
  }
`;

export const Header = styled.header`
  margin: 48px 0 0;

  @media(max-width: 900px) {
    margin: 48px auto 0;
  }
`;

export const Main = styled.main`
  flex: 1;
  max-width: 560px;

  display: flex;
  flex-direction: column;
  justify-content: center;

  h1 {
    font-size: 54px;
  }

  p {
    font-size: 24px;
    margin-top: 24px;
    line-height: 38px;
  }

  a {
    width: 100%;
    max-width: 360px;
    height: 72px;
    background: ${props => props.theme.colors.primary};
    border-radius: 8px;
    text-decoration: none;

    font-size: 18px;

    display: flex;
    align-items: center;
    overflow: hidden;

    margin-top: 40px;

    span {
      display: block;
      background: rgba(0, 0, 0, 0.08);
      width: 72px;
      height: 72px;

      display: flex;
      align-items: center;
      justify-content: center;
      transition: background-color 0.2s;

      svg {
        color: ${props => props.theme.colors.background};
      }
    }

    strong {
      flex: 1;
      text-align: center;
      color: ${props => props.theme.colors.background};
    }

    &:hover {
      background: ${props => darken(0.05, props.theme.colors.primary)};;
    }
  }

  @media(max-width: 900px) {
    align-items: center;

    h1 {
      font-size: 42px;
    }

    p {
      font-size: 24px;
    }
  }

`;

