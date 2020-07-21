import React from 'react';
import moment from 'moment';
// import {
//   ArrowheadLeftOutline,
//   ArrowheadRightOutline,
// } from '@styled-icons/evaicons-outline';
import { FileExcel2 as ExcelIcon } from '@styled-icons/remix-fill';
import {
  Clock as ClockIcon,
  ArrowheadLeft,
  ArrowheadRight,
} from '@styled-icons/evaicons-solid';

import {
  Container,
  LateralButton,
  CenterContainer,
  Row,
  DateText,
  TodayBalanceText,
  TextInput,
  ButtonContainer,
  Button,
  BalanceContainer,
  Total,
  ClockLabel,
  Column,
  Label,
} from './styles';
import Checkbox from '../Checkbox';

const Home: React.FC = () => {
  return (
    <Container>
      <LateralButton left>
        <ArrowheadLeft />
      </LateralButton>
      <CenterContainer>
        <Column>
          <Row end>
            <DateText>{moment().format('LL')}</DateText>
          </Row>
          <Row end>
            <TodayBalanceText>Saldo hoje: 04:02</TodayBalanceText>
          </Row>
        </Column>
        <Column>
          <Row center>
            <Label>Início</Label>
            <Label>Almoço</Label>
            <Label>Volta</Label>
            <Label>Saída</Label>
          </Row>
          <Row center>
            <TextInput name="start" />
            <TextInput name="lunch" />
            <TextInput name="back" />
            <TextInput name="end" />
          </Row>
        </Column>
        <Row between bottom>
          <ButtonContainer>
            <Checkbox>Apenas deste mês</Checkbox>
            <Button>
              <ExcelIcon />
              Relatório
            </Button>
          </ButtonContainer>
          <BalanceContainer>
            <Total>
              <ClockIcon />
              {/* {moment().format('HH:MM')} */}
              22:08
            </Total>
            <ClockLabel>Saldo total</ClockLabel>
          </BalanceContainer>
        </Row>
      </CenterContainer>
      <LateralButton right>
        <ArrowheadRight />
      </LateralButton>
    </Container>
  );
};

export default Home;
