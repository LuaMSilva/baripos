// 📁 src/pages/DiarioAlimentar.js
import React, { useState, useContext, useEffect } from 'react';
import { FlatList, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { AuthContext } from '../../contexts/auth';
import { db } from '../../firebaseConnection';
import {
  collection,
  addDoc,
  getDocs,
  orderBy,
  query,
  where,
  serverTimestamp
} from 'firebase/firestore';

import {
  Container,
  Titulo,
  Label,
  Input,
  Button,
  ButtonText,
  ListItem,
  Texto
} from '../../components/stylesTelasFunc';

// Lista de tipos de refeição
const tiposRefeicao = ['Café da manhã', 'Lanche', 'Almoço', 'Jantar', 'Ceia'];

// Emojis de sensação
const opcoesHumor = ['😄', '🙂', '😐', '😔', '😡'];

export default function DiarioAlimentar() {
  const { user } = useContext(AuthContext);

  const [tipo, setTipo] = useState('Almoço');
  const [alimento, setAlimento] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [humorAntes, setHumorAntes] = useState('🙂');
  const [humorDepois, setHumorDepois] = useState('😐');
  const [observacoes, setObservacoes] = useState('');

  const [registros, setRegistros] = useState([]);

  // Buscar registros do usuário ao iniciar
  useEffect(() => {
    buscarRegistros();
  }, [user]);

  const salvarRegistro = async () => {
    if (!alimento || !quantidade) {
      Alert.alert('Preencha todos os campos obrigatórios!');
      return;
    }

    try {
      await addDoc(collection(db, 'diarioAlimentar'), {
        userId: user.uid,
        tipo,
        alimento,
        quantidade,
        humorAntes,
        humorDepois,
        observacoes,
        data: serverTimestamp(),
      });

      Alert.alert('Registro salvo com sucesso!');
      setAlimento('');
      setQuantidade('');
      setObservacoes('');
      setTipo('Almoço');
      setHumorAntes('🙂');
      setHumorDepois('😐');
      buscarRegistros();
    } catch (error) {
      console.error('Erro ao salvar registro:', error);
    }
  };

  const buscarRegistros = async () => {
    try {
      const q = query(
        collection(db, 'diarioAlimentar'),
        where('userId', '==', user.uid),
        orderBy('data', 'desc')
      );
      const snapshot = await getDocs(q);
      const lista = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setRegistros(lista);
    } catch (error) {
      console.error('Erro ao buscar registros:', error);
    }
  };

  return (
    <Container>
      <Titulo>Diário Alimentar</Titulo>

      <Label>🍽 Tipo</Label>
      <Picker selectedValue={tipo} onValueChange={value => setTipo(value)}>
        {tiposRefeicao.map(refeicao => (
          <Picker.Item key={refeicao} label={refeicao} value={refeicao} />
        ))}
      </Picker>

      <Label>📝 O que comeu?</Label>
      <Input value={alimento} onChangeText={setAlimento} placeholder="Ex: Arroz, feijão, frango" />

      <Label>📏 Quantidade</Label>
      <Input value={quantidade} onChangeText={setQuantidade} placeholder="Ex: 2 porções" />

      <Label>🧠 Humor antes</Label>
      <Picker selectedValue={humorAntes} onValueChange={setHumorAntes}>
        {opcoesHumor.map(emo => (
          <Picker.Item key={emo} label={emo} value={emo} />
        ))}
      </Picker>

      <Label>🧠 Humor depois</Label>
      <Picker selectedValue={humorDepois} onValueChange={setHumorDepois}>
        {opcoesHumor.map(emo => (
          <Picker.Item key={emo} label={emo} value={emo} />
        ))}
      </Picker>

      <Label>🗒 Observações</Label>
      <Input value={observacoes} onChangeText={setObservacoes} placeholder="Ex: Estava com pouca fome..." />

      <Button onPress={salvarRegistro}>
        <ButtonText>Salvar</ButtonText>
      </Button>

      <Titulo style={{ marginTop: 20 }}>Histórico</Titulo>

      <FlatList
        data={registros}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ListItem>
            <Texto>📆 {new Date(item.data?.seconds * 1000).toLocaleString()}</Texto>
            <Texto>🍽 {item.tipo}</Texto>
            <Texto>📝 {item.alimento}</Texto>
            <Texto>📏 {item.quantidade}</Texto>
            <Texto>🧠 Humor: {item.humorAntes} → {item.humorDepois}</Texto>
            {item.observacoes ? <Texto>🗒 {item.observacoes}</Texto> : null}
          </ListItem>
        )}
      />
    </Container>
  );
}
