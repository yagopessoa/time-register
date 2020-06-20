import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  table {
    border-spacing: 0px;
  }
  td, th {
    padding: 4px 8px;
  }
  tbody tr:nth-child(odd) {
    background: #eaeaea;
  }
`;

export const Flex = styled.div`
  display: flex;
  width: 100%;
`;

export const InputText = styled.input.attrs(() => ({ type: 'text' }))`
  text-align: center;
  width: 56px;
`;
