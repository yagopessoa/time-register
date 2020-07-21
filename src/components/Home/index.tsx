import React, { useState, useCallback } from 'react';
import moment from 'moment';
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
import { getTodayBalance } from '../../utils';

export interface IValue {
  [x: string]: string;
}

const Home: React.FC = () => {
  const [currentDay] = useState(moment());
  const [formattedDay, setFormattedDay] = useState(moment().format('LL'));

  const [values, setValues] = useState<IValue>({});
  const [showInputs, setShowInputs] = useState(true);

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = event?.currentTarget || {};
    setValues({
      ...values,
      [name]: value,
    });
  };

  const renderTodayBalance = useCallback(
    () => getTodayBalance(currentDay.format('DD/MM/YYYY'), values),
    [values]
  );

  const handleChangeDay = (direction: string) => () => {
    setShowInputs(false);
    if (direction === 'forward') {
      currentDay.add(1, 'day');
    } else {
      currentDay.subtract(1, 'day');
    }
    setFormattedDay(currentDay.format('LL'));
    setTimeout(() => {
      setShowInputs(true);
      renderTodayBalance();
    }, 50);
  };

  return (
    <Container>
      <LateralButton left onClick={handleChangeDay('backward')}>
        <ArrowheadLeft />
      </LateralButton>
      <CenterContainer>
        <Column>
          <Row end>
            <DateText>{formattedDay}</DateText>
          </Row>
          <Row end>
            <TodayBalanceText>
              Saldo hoje: {renderTodayBalance()}
            </TodayBalanceText>
          </Row>
        </Column>
        <Column>
          <Row center>
            <Label>Início</Label>
            <Label>Almoço</Label>
            <Label>Volta</Label>
            <Label>Saída</Label>
          </Row>
          {showInputs && (
            <Row center>
              <TextInput
                id="text-input-a"
                name={`${currentDay.format('DD/MM/YYYY')}-start`}
                onChange={handleChange}
                value={values[`${currentDay.format('DD/MM/YYYY')}-start`]}
              />
              <TextInput
                id="text-input-b"
                name={`${currentDay.format('DD/MM/YYYY')}-lunch`}
                onChange={handleChange}
                value={values[`${currentDay.format('DD/MM/YYYY')}-lunch`]}
              />
              <TextInput
                id="text-input-c"
                name={`${currentDay.format('DD/MM/YYYY')}-back`}
                onChange={handleChange}
                value={values[`${currentDay.format('DD/MM/YYYY')}-back`]}
              />
              <TextInput
                id="text-input-d"
                name={`${currentDay.format('DD/MM/YYYY')}-end`}
                onChange={handleChange}
                value={values[`${currentDay.format('DD/MM/YYYY')}-end`]}
              />
            </Row>
          )}
          {!showInputs && (
            <Row center>
              <TextInput />
              <TextInput />
              <TextInput />
              <TextInput />
            </Row>
          )}
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
              00:00
            </Total>
            <ClockLabel>Saldo total</ClockLabel>
          </BalanceContainer>
        </Row>
      </CenterContainer>
      <LateralButton right onClick={handleChangeDay('forward')}>
        <ArrowheadRight />
      </LateralButton>
    </Container>
  );
};

export default Home;
