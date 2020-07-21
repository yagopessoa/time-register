import styled, { css } from 'styled-components';

function hexToRgb(hex: string, opacity: number | string = 1) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `rgba(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(
        result[3],
        16
      )}, ${opacity})`
    : hex;
}

const WHITE = '#E1E1E6';
const BLACK = '#1f1913';
const PRIMARY = '#6633cc';

export const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const CenterContainer = styled.div`
  height: 100%;
  padding: 24px;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

interface IRow {
  start?: boolean;
  center?: boolean;
  end?: boolean;
  between?: boolean;
  bottom?: boolean;
}

export const Row = styled.div<IRow>`
  display: flex;
  width: 100%;
  align-items: center;

  ${({ start }) =>
    start &&
    css`
      justify-content: flex-start;
    `}

  ${({ center }) =>
    center &&
    css`
      justify-content: center;
    `}

  ${({ end }) =>
    end &&
    css`
      justify-content: flex-end;
    `}

  ${({ between }) =>
    between &&
    css`
      justify-content: space-between;
    `}

  ${({ bottom }) =>
    bottom &&
    css`
      align-items: flex-end;
    `}
`;

export const Column = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const DateText = styled.div`
  font-size: 40px;
`;

export const TodayBalanceText = styled.div`
  margin: 12px 2px 0 0;
  font-size: 24px;
`;

export const TextInput = styled.input.attrs(() => ({ type: 'text' }))`
  width: 80px;
  max-width: calc(100% - 32px);
  height: 44px;
  background: ${WHITE};
  border: none;
  box-sizing: border-box;
  border-radius: 4px;
  font-size: 14px;
  line-height: 24px;
  color: ${hexToRgb(BLACK, 0.85)};
  padding: 12px;
  margin: 0 8px;
  text-align: right;

  :hover,
  :focus {
    outline: none;
    box-shadow: 0 0 5px 5px ${hexToRgb(PRIMARY, 0.45)};
  }

  ::placeholder {
    /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: ${hexToRgb(BLACK, 0.45)};
    opacity: 1; /* Firefox */
  }

  :-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: ${hexToRgb(BLACK, 0.45)};
  }

  ::-ms-input-placeholder {
    /* Microsoft Edge */
    color: ${hexToRgb(BLACK, 0.45)};
  }
`;

export const Label = styled.div`
  width: 80px;
  max-width: calc(100% - 32px);
  margin: 8px;
  padding: 0 2px;
`;

export const ButtonContainer = styled.div`
  width: 180px;
  display: flex;
  flex-direction: column;
`;

export const BalanceContainer = styled.div`
  width: 180px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

export const Total = styled.div`
  font-size: 40px;
  display: flex;
  align-items: center;

  svg {
    width: 36px;
    height: 36px;
    margin-right: 8px;
  }
`;

export const ClockLabel = styled.div`
  text-align: right;
  font-size: 18px;
  margin: 8px 2px 0 0;
`;

interface IButton {
  outlined?: boolean;
  right?: boolean;
  left?: boolean;
}

export const Button = styled.button<IButton>`
  background-color: ${PRIMARY};
  border: none;
  font-weight: bold;
  font-size: 16px;
  line-height: 20px;
  text-transform: capitalize;
  width: fit-content;
  padding: 12px 24px;
  border-radius: 4px;
  cursor: pointer;
  color: ${WHITE};

  svg {
    width: 20px;
    height: 20px;
    margin-right: 8px;
    fill: ${WHITE};
  }

  &:hover {
    background-color: ${hexToRgb(PRIMARY, 0.85)};
  }

  &:active {
    background-color: ${hexToRgb(PRIMARY, 0.65)};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 5px 5px ${hexToRgb(PRIMARY, 0.45)};
  }

  ${({ outlined }) =>
    outlined &&
    css`
      background-color: transparent;
      color: ${PRIMARY};
      border: ${PRIMARY} solid 2px;

      svg {
        /* fill: ${PRIMARY}; */
      }

      &:hover {
        background-color: ${hexToRgb(PRIMARY, 0.15)};
      }

      &:active {
        background-color: ${hexToRgb(PRIMARY, 0.25)};
      }

      &:focus {
        outline: none;
        box-shadow: none;
      }
    `}

  ${({ right }) =>
    right &&
    css`
      border: none;
      border-left: ${PRIMARY} solid 2px;
    `}

  ${({ left }) =>
    left &&
    css`
      border: none;
      border-right: ${PRIMARY} solid 2px;
    `}
`;

export const LateralButton = styled(Button).attrs(() => ({ outlined: true }))`
  height: 100%;
  width: 56px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0px;

  svg {
    margin: 0;
  }
`;
