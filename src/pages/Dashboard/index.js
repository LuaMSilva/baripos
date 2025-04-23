// Dashboard.js
import React, { useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../contexts/auth'
import { Ionicons } from '@expo/vector-icons';

import {
  Container,
  Header,
  Content,
  Titulo,
  Subtitulo,
  Grid,
  CardContainer,
  CardStyled,
  IconContainer,
  CardTitle,
  CardDescription,
  IconButton
} from './styles';


const FeatureCard = ({ title, description, icon, color, onPress }) => {
  return (
    <CardContainer onPress={onPress}>
      <CardStyled>
        <IconContainer style={{ backgroundColor: color + '20' }}>
          <Ionicons name={icon} size={28} color={color} />
        </IconContainer>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardStyled>
    </CardContainer>
  );
};

export default function Dashboard() {

  const navigation = useNavigation();
  const { handleSignOut, user } = useContext(AuthContext);

  function handleLogout() {
    handleSignOut();
  }

  return (
    <Container>

      <Header>
        <IconButton onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={24} color="black" />
        </IconButton>
      </Header>

      <Content>
        <Titulo>Bem-vindo(a) {user?.nome}</Titulo>
        <Subtitulo>O que você gostaria de fazer hoje?</Subtitulo>

        <Grid>
          <FeatureCard
            title="Diário Alimentar"
            description="Registre suas refeições e acompanhe suas calorias"
            icon="nutrition"
            color="#34D399"
            onPress={() => navigation.navigate('DiarioAlimentar')}
          />
          <FeatureCard
            title="Acompanhar Peso"
            description="Registre e acompanhe sua evolução de peso"
            icon="barbell"
            color="#3B82F6"
            onPress={() => navigation.navigate('AcompanharPeso')}
          />
          <FeatureCard
            title="Lembrete de Remédios"
            description="Configure lembretes para seus medicamentos"
            icon="medkit"
            color="#8B5CF6"
            onPress={() => navigation.navigate('LembreteRemedios')}
          />
          <FeatureCard
            title="Diário de Sintomas"
            description="Registre seus sintomas para consulta médica"
            icon="document-text"
            color="#F59E0B"
            onPress={() => navigation.navigate('DiarioSintomas')}
          />
        </Grid>
      </Content>
    </Container>
  );
}

