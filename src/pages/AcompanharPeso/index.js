import React, { useState, useEffect, useContext } from 'react';
import { FlatList } from 'react-native';
import { AuthContext } from '../../contexts/auth';
import { db } from '../../firebaseConnection';
import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
  query,
  orderBy
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
  Evolucao
} from '../../components/stylesTelasFunc';

export default function AcompanharPeso() {
  const { user } = useContext(AuthContext);

  // Estados para entrada, listagem e evolução
  const [peso, setPeso] = useState('');
  const [pesos, setPesos] = useState([]);
  const [evolucao, setEvolucao] = useState(0);
  const [evolucaoRecente, setEvolucaoRecente] = useState(0);

  // Função para registrar um novo peso
  const handleSubmit = async () => {
    if (peso.trim() === '') return;

    try {
      await addDoc(collection(db, 'pesos'), {
        peso: parseFloat(peso),
        data: serverTimestamp(),
        userId: user.uid,
      });

      setPeso('');
      alert('Peso registrado com sucesso!');
      fetchPesos(); // Recarrega a lista após salvar
    } catch (error) {
      console.error('Erro ao registrar peso:', error);
      alert('Erro ao registrar peso!');
    }
  };

  // Função para buscar os pesos salvos do usuário
  const fetchPesos = async () => {
    try {
      const q = query(collection(db, 'pesos'), orderBy('data', 'asc'));
      const querySnapshot = await getDocs(q);

      // Filtra apenas os dados do usuário logado
      const pesosData = querySnapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter(item => item.userId === user.uid);

      setPesos(pesosData);

      // Calcula evolução total e recente, se houver dados suficientes
      if (pesosData.length > 1) {
        const ultimo = pesosData[pesosData.length - 1].peso;
        const primeiro = pesosData[0].peso;
        const penultimo = pesosData[pesosData.length - 2].peso;

        setEvolucao(ultimo - primeiro);         // do primeiro ao último
        setEvolucaoRecente(ultimo - penultimo); // do penúltimo ao último
      }
    } catch (error) {
      console.error('Erro ao buscar pesos:', error);
    }
  };

  // Executa ao iniciar a tela
  useEffect(() => {
    fetchPesos();
  }, [user]);

  return (
    <Container>
      <Titulo>Acompanhar Peso</Titulo>

      {/* Formulário de entrada */}
      <Label>Digite seu peso atual</Label>
      <Input
        keyboardType="numeric"
        value={peso}
        onChangeText={setPeso}
        placeholder="Peso em kg"
      />
      <Button onPress={handleSubmit}>
        <ButtonText>Registrar Peso</ButtonText>
      </Button>

      {/* Evolução de peso total (do primeiro ao último registro) */}
      {pesos.length > 1 && evolucao !== 0 && (
        <Evolucao>
          <ButtonText>{`Evolução total: ${evolucao > 0 ? '+' : ''}${evolucao.toFixed(1)} kg`}</ButtonText>
        </Evolucao>
      )}

      {/* Evolução recente (do penúltimo ao último peso) */}
      {pesos.length > 1 && (
        <Evolucao>
          <ButtonText>{`Desde a última medição: ${evolucaoRecente > 0 ? '+' : ''}${evolucaoRecente.toFixed(1)} kg`}</ButtonText>
        </Evolucao>
      )}

      <Titulo>Histórico de Pesos</Titulo>

      {/* Lista de pesos com FlatList */}
      <FlatList
        data={pesos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ListItem>
            <Texto>
              {item.data?.seconds
                ? new Date(item.data.seconds * 1000).toLocaleDateString()
                : 'Sem data'}
            </Texto>
            <Texto>{`Peso: ${item.peso} kg`}</Texto>
          </ListItem>
        )}
        ListEmptyComponent={<Texto>Nenhum peso registrado ainda.</Texto>}
      />
    </Container>
  );
}
