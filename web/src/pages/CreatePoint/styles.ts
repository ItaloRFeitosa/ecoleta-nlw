import styled, { keyframes } from 'styled-components';

import {darken} from 'polished';

import {Map} from  'react-leaflet'

export const Container = styled.div`
  width: 100%;
  max-width: 1100px;

  margin: 0 auto;
`;

export const Header = styled.header`
  margin-top: 48px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  a {
    color: ${props => props.theme.colors.title};
    font-weight: bold;
    text-decoration: none;
    display: flex;
    align-items: center;
    transition: 0.4s;

    &:hover{
      letter-spacing: 1px;
    }

    svg {
      margin-right: 16px;
      color: ${props => props.theme.colors.primary};
      transition: 0.4s;
    }
  }
`;

export const Form = styled.form`
  margin: 80px auto;
  padding: 64px;
  max-width: 730px;
  background: #FFF;
  border-radius: 8px;

  display: flex;
  flex-direction: column;

  h1 {
    font-size: 36px;
  }
`;

export const Fieldset = styled.fieldset`
  margin-top: 64px;
  min-inline-size: auto;
  border: none;
`;

export const Legend = styled.legend`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;

  h2 {
    font-size: 24px;
  }

  span {
    font-size: 14px;
    font-weight: normal;
    color: ${props => props.theme.colors.text};
  }
`;

export const Field = styled.div`
  flex: 1;

  display: flex;
  flex-direction: column;
  margin-bottom: 24px;



  input[type=text],
  input[type=email],
  input[type=number] {
    flex: 1;
    background: ${props => props.theme.colors.background};
    border-radius: 8px;
    border: 2px solid transparent;
    padding: 16px 24px;
    font-size: 16px;
    color: #6C6C80;

    &::placeholder{
      color: #A0A0B2;
    }

    &:focus {
      border: 2px solid ${props => props.theme.colors.title};

    }

  }

  select {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;

    flex: 1;
    background: ${props => props.theme.colors.background};
    border-radius: 8px;
    border: 2px solid transparent;
    padding: 16px 24px;
    font-size: 16px;
    color: #6C6C80;

    &:focus {
      border: 2px solid ${props => props.theme.colors.title};
    }
  }

  label {
    font-size: 14px;
    margin-bottom: 8px;
    color: ${props => props.theme.colors.title};
  }

  :disabled {
    cursor: not-allowed;
  }

`;

export const FieldGroup = styled.div`
    flex: 1;
    display: flex;

    ${Field} + ${Field} {
      margin-left: 24px;
    }

    input + input {
      margin-left: 24px;
    }
`;

export const FieldCheck = styled.div`
  flex-direction: row;
  align-items: center;

  input[type=checkbox]{
    background: ${props => props.theme.colors.background};
  }

  label {
    margin: 0 0 0 8px;
  }
`;

export const Leaflet = styled(Map)`

  width: 100%;
  height: 350px;
  border-radius: 8px;
  margin-bottom: 24px;
`;

export const Button = styled.button`
  width: 260px;
  height: 56px;
  background: ${props => props.theme.colors.primary};
  border-radius: 8px;
  color: ${props => props.theme.colors.background};
  font-weight: bold;
  font-size: 16px;
  border: 0;
  align-self: flex-end;
  margin-top: 40px;
  transition: background-color 0.2s;
  cursor: pointer;

  &:hover{
    background: ${props => darken(0.05, props.theme.colors.primary)};
  }
`;

export const ItemsGrid = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  list-style: none;

`;

export const Item = styled.li<{selected: boolean}>`
  background: #f5f5f5;
  background: ${props => props.selected ? '#E1FAEC':'#f5f5f5'};
  border: 2px solid ${props => props.selected ? '#34CB79':'#f5f5f5'};
  height: 180px;
  border-radius: 8px;
  padding: 32px 24px 16px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  text-align: center;

  cursor: pointer;

  span {
    flex: 1;
    margin-top: 12px;

    display: flex;
    align-items: center;
    color: ${props => props.theme.colors.title};
  }
`;

const fadeIn= keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const Modal = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  left: 0px;
  top: 0px;
  background: #0E0A14;
  opacity: 0.95;
  display: flex;
  flex-direction: column;
  align-items:center;
  justify-content: center;
  animation: ${fadeIn} 0.2s normal;


  svg {
    color: ${props => props.theme.colors.primary};
  }
  h1{
    font-family: Roboto;
    font-style: normal;
    font-weight: bold;
    font-size: 36px;
    line-height: 42px;
    letter-spacing: 1px;
    /* Background */
    color: #F0F0F5;
    margin: 16px 0;
  }

  a {
    color: ${props => props.theme.colors.title};
    font-weight: bold;
    text-decoration: none;
    transition: 0.4s;
    color: #F0F0F5;
    letter-spacing: 1px;
    display: flex;
    flex-direction: row;
    align-items: center;
    vertical-align: middle;
    animation: ${fadeIn} 3.5s cubic-bezier(1,0,.56,.99);

    &:hover{
      letter-spacing: 2px;
    }

    svg {
      margin-right: 8px;
      transition: 0.4s;
    }
  }
`;
