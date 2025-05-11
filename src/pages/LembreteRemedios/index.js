// 📁 src/pages/LembreteRemedios.js
import React, { useState, useEffect, useContext } from 'react';
import { FlatList, Alert, Modal, View, Pressable } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../../contexts/auth';
import { db } from '../../firebaseConnection';
import * as Device from 'expo-device';
import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
  query,
  where,
  orderBy,
  deleteDoc,
  doc
} from 'firebase/firestore';
import {
  Container,
  Titulo,
  Label,
  Input,
  Button,
  ButtonText,
  ListItem,
  Texto,
  ActionButtons,
  DeleteButton
} from '../../components/stylesTelasFunc';

const tipos = [
  { icon: '💊', nome: 'Pílula' },
  { icon: '💉', nome: 'Injeção' },
  { icon: '🩹', nome: 'Adesivo' },
];

export default function LembreteRemedios() {
  const { user } = useContext(AuthContext);

  const [medName, setMedName] = useState('');
  const [horarios, setHorarios] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [tipoSelecionado, setTipoSelecionado] = useState(tipos[0]);
  const [medicamentos, setMedicamentos] = useState([]);
  const [historico, setHistorico] = useState([]);

  const [horaSelecionada, setHoraSelecionada] = useState('08');
  const [minutoSelecionado, setMinutoSelecionado] = useState('00');

  useEffect(() => {
    buscarMedicamentos();
    buscarHistorico();
  }, [user]);

  const registrarMedicamento = async () => {
    if (!medName || horarios.length === 0) {
      Alert.alert('Preencha o nome e ao menos um horário!');
      return;
    }

    try {
      const docRef = await addDoc(collection(db, 'medicamentos'), {
        userId: user.uid,
        nome: medName,
        horarios,
        tipo: tipoSelecionado,
        data: serverTimestamp(),
      });
      setMedName('');
      setHorarios([]);
      Alert.alert('Medicamento registrado!');
      buscarMedicamentos();
    } catch (error) {
      console.error('Erro ao registrar:', error);
    }
  };

  const buscarMedicamentos = async () => {
    try {
      const q = query(collection(db, 'medicamentos'), where('userId', '==', user.uid), orderBy('data', 'desc'));
      const snapshot = await getDocs(q);
      const lista = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMedicamentos(lista);
    } catch (error) {
      console.error('Erro ao buscar:', error);
    }
  };

  const buscarHistorico = async () => {
    try {
      const q = query(collection(db, 'historico'), where('userId', '==', user.uid), orderBy('data', 'desc'));
      const snapshot = await getDocs(q);
      const lista = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setHistorico(lista);
    } catch (error) {
      console.error('Erro ao buscar histórico:', error);
    }
  };

  const excluirMedicamento = async (id) => {
    await deleteDoc(doc(db, 'medicamentos', id));
    buscarMedicamentos();
  };

  const registrarHistorico = async (medId, automatico = false) => {
    const med = medicamentos.find(m => m.id === medId);
    if (!med) return;
    await addDoc(collection(db, 'historico'), {
      userId: user.uid,
      nome: med.nome,
      tipo: med.tipo,
      data: new Date(),
      pontual: automatico,
    });
    buscarHistorico();
  };

  return (
    <Container>
      <Titulo>Registrar Medicamentos</Titulo>
      <Label>Nome</Label>
      <Input value={medName} onChangeText={setMedName} placeholder="Ex: Tylenol" />

      <Button onPress={() => setModalVisible(true)}>
        <ButtonText>Adicionar horário</ButtonText>
      </Button>
      <FlatList
        data={horarios}
        keyExtractor={(item, idx) => idx.toString()}
        renderItem={({ item }) => <Texto>⏰ {item}</Texto>}
      />

      <Button onPress={registrarMedicamento}>
        <ButtonText>Salvar Medicamento</ButtonText>
      </Button>

      <Titulo>Medicamentos Registrados</Titulo>
      <FlatList
        data={medicamentos}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ListItem>
            <Texto>{item.tipo.icon} {item.nome}</Texto>
            <Texto>{item.horarios?.join(', ')}</Texto>
            <ActionButtons>
              <DeleteButton onPress={() => registrarHistorico(item.id)}>
                <Ionicons name="checkbox" size={20} color="#008000" />
              </DeleteButton>
              <DeleteButton onPress={() => excluirMedicamento(item.id)}>
                <Ionicons name="trash-outline" size={20} color="#EF4444" />
              </DeleteButton>
            </ActionButtons>
          </ListItem>
        )}
        ListEmptyComponent={<Texto>Nenhum medicamento registrado.</Texto>}
      />

      <Titulo>Histórico</Titulo>
      <FlatList
        data={historico}
        keyExtractor={(item, idx) => idx.toString()}
        renderItem={({ item }) => (
          <Texto>{item.tipo.icon} {item.nome} - {new Date(item.data.seconds * 1000).toLocaleString()} ({item.pontual ? '✔️ Pontual' : '⏱️ Tomado'})</Texto>
        )}
      />

      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000000aa' }}>
          <View style={{ backgroundColor: '#fff', padding: 20, borderRadius: 10, width: '80%' }}>
            <Texto style={{ marginBottom: 10 }}>Escolha o horário:</Texto>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Picker
                selectedValue={horaSelecionada}
                style={{ width: 100 }}
                onValueChange={value => setHoraSelecionada(value)}
              >
                {Array.from({ length: 24 }, (_, i) => {
                  const val = String(i).padStart(2, '0');
                  return <Picker.Item key={val} label={val} value={val} />;
                })}
              </Picker>

              <Picker
                selectedValue={minutoSelecionado}
                style={{ width: 100 }}
                onValueChange={value => setMinutoSelecionado(value)}
              >
                {Array.from({ length: 60 }, (_, i) => {
                  const val = String(i).padStart(2, '0');
                  return <Picker.Item key={val} label={val} value={val} />;
                })}
              </Picker>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
              <Pressable onPress={() => setModalVisible(false)}>
                <Texto>❌ Cancelar</Texto>
              </Pressable>
              <Pressable onPress={() => {
                const hora = `${horaSelecionada}:${minutoSelecionado}`;
                if (!horarios.includes(hora)) {
                  setHorarios([...horarios, hora]);
                }
                setModalVisible(false);
              }}>
                <Texto>✅ Confirmar</Texto>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </Container>
  );
}
