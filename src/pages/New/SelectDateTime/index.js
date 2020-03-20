import React, { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';

import { Container, HourList, Hour, Time } from './styles';
import Background from '~/components/Background';
import DateInput from '~/components/DateInput';

export default function SelectDateTime({ navigation }) {
  const [date, setDate] = useState(new Date());
  const [hours, setHours] = useState([]);

  const provider = navigation.getParam('provider');

  useEffect(() => {
    async function loadAvailables() {
      const response = await api.get(`providers/${provider.id}/availables`, {
        params: {
          date: date.getTime(),
        },
      });

      setHours(response.data);
    }

    loadAvailables();
  }, [date, provider.id]);

  async function handleSelectHour(time) {
    navigation.navigate('Confirm', {
      provider,
      time,
    });
  }

  return (
    <Background>
      <Container>
        <DateInput date={date} onChange={setDate} />
      </Container>

      <HourList
        data={hours}
        keyExtractor={item => item.time}
        renderItem={({ item }) => (
          <Hour
            onPress={() => handleSelectHour(item.value)}
            enabled={item.available}
          >
            <Time>{item.time}</Time>
          </Hour>
        )}
      />
    </Background>
  );
}

SelectDateTime.navigationOptions = ({ navigation }) => ({
  title: 'Selecione o horário',
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.goBack();
      }}
    >
      <Icon name="chevron-left" size={20} color="#fff" />
    </TouchableOpacity>
  ),
});
