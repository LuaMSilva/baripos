import React, { useEffect, useState, useContext } from 'react';
import { Alert, FlatList } from 'react-native';
import { format } from 'date-fns';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../../contexts/auth';
import {
  Container,
  Titulo,
  Input,
  Button,
  ButtonText,
  ListItem,
  SintomaText,
  DateText,
  ActionButtons,
  EditButton,
  DeleteButton,
  FilterInput
} from '../../components/stylesTelasFunc';

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  updateDoc,
  where
} from 'firebase/firestore';
import { db } from '../../firebaseConnection';

export default function DiarioSintomas() {
  const { user } = useContext(AuthContext);

  const [sintoma, setSintoma] = useState('');
  const [sintomas, setSintomas] = useState([]);
  const [editandoId, setEditandoId] = useState(null);
  const [filtroData, setFiltroData] = useState('');

  // Carrega os sintomas do usuário autenticado
  useEffect(() => {
    const sintomasRef = collection(db, 'sintomas');
    const q = query(sintomasRef, where('uid', '==', user.uid));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const lista = [];
      snapshot.forEach((doc) => {
        lista.push({ id: doc.id, ...doc.data() });
      });
      // Ordena pela data mais recente primeiro
      lista.sort((a, b) => b.createdAt - a.createdAt);
      setSintomas(lista);
    });

    return () => unsubscribe();
  }, []);

  // Salvar novo sintoma ou atualizar existente
  async function handleSalvar() {
    if (sintoma.trim() === '') return;

    if (editandoId) {
      const docRef = doc(db, 'sintomas', editandoId);
      await updateDoc(docRef, {
        sintoma,
        updatedAt: new Date()
      });
      setEditandoId(null);
    } else {
      await addDoc(collection(db, 'sintomas'), {
        sintoma,
        uid: user.uid,
        createdAt: new Date()
      });
    }

    setSintoma('');
  }

  // Deleta um sintoma com confirmação
  function handleDelete(id) {
    Alert.alert("Excluir", "Deseja realmente excluir?", [
      {
        text: "Cancelar",
        style: "cancel"
      },
      {
        text: "Confirmar",
        onPress: async () => {
          await deleteDoc(doc(db, 'sintomas', id));
        }
      }
    ]);
  }

  // Prepara o estado para edição de um sintoma
  function handleEditar(item) {
    setSintoma(item.sintoma);
    setEditandoId(item.id);
  }

  // Filtra sintomas pela data formatada
  const sintomasFiltrados = sintomas.filter((item) => {
    if (filtroData.trim() === '') return true;

    const data = format(item.createdAt.toDate(), 'dd/MM/yyyy');
    return data.includes(filtroData.trim());
  });

  return (
    <Container>
      <Titulo>Registrar Sintoma</Titulo>

      <Input
        placeholder="Descreva seu sintoma..."
        value={sintoma}
        onChangeText={setSintoma}
      />

      <Button onPress={handleSalvar}>
        <ButtonText>{editandoId ? "Atualizar" : "Salvar"}</ButtonText>
      </Button>

      <FilterInput
        placeholder="Filtrar por data (dd/mm/aaaa)"
        value={filtroData}
        onChangeText={setFiltroData}
      />

      <FlatList
        data={sintomasFiltrados}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ListItem>
            <SintomaText>{item.sintoma}</SintomaText>
            <DateText>{format(item.createdAt.toDate(), 'dd/MM/yyyy HH:mm')}</DateText>

            <ActionButtons>
              <EditButton onPress={() => handleEditar(item)}>
                <Ionicons name="create-outline" size={20} color="#3B82F6" />
              </EditButton>
              <DeleteButton onPress={() => handleDelete(item.id)}>
                <Ionicons name="trash-outline" size={20} color="#EF4444" />
              </DeleteButton>
            </ActionButtons>
          </ListItem>
        )}
      />
    </Container>
  );
}
