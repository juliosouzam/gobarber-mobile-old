import React, { useState, useMemo } from 'react';
import { DatePickerIOS } from 'react-native';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import Icon from 'react-native-vector-icons';

import { Container, DateButton, DateText, Picker } from './styles';

export default function DateInput({ date, onChange }) {
  const [opened, setOpended] = useState(false);
  const dateFormated = useMemo(
    () => format(date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR }),
    [date],
  );

  return (
    <Container>
      <DateButton onPress={() => setOpended(!opened)}>
        <Icon name="event" color="#fff" size={20} />
        <DateText>{dateFormated}</DateText>
      </DateButton>

      {opened && (
        <Picker>
          <DatePickerIOS
            date={date}
            onDateChange={onChange}
            minimumDate={new Date()}
            minuteInterval={60}
            locale="pt"
            mode="date"
          />
        </Picker>
      )}
    </Container>
  );
}