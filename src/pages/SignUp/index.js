import React, { useContext, useState } from 'react';
import { View, Text } from 'react-native';

import {         
    Container,
    AreaInput,
    Input,
    Label,
    Button,
    ButtonText 
} from '../SignIn/styles';

import { AuthContext } from '../../contexts/auth'
import { set } from 'date-fns';
import { enableExperimentalWebImplementation } from 'react-native-gesture-handler';

export default function SignUp(){
    
    const { signUp } = useContext(AuthContext)
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleSignUp(){
        if(nome === '' || email === '' || password === '') return; // Validar se todos os campos estão preenchidos para o cadastro 
        signUp(nome, email, password);
    }

    return(
       <Container>

            <Label>Nome</Label>
            <AreaInput>
                <Input
                placeholder="Digite seu nome"
                value={nome}
                onChangeText={(text) => setNome(text)}
                />
            </AreaInput>

            <Label>E-mail</Label>
            <AreaInput>
                <Input
                placeholder="Digite seu e-mail"
                value={email}
                onChangeText={(text) => setEmail(text)}
                />
            </AreaInput>

            <Label>Senha</Label>
            <AreaInput>
                <Input
                placeholder="Digite sua senha"
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry={true}
                />
            </AreaInput>

            <Button activeOpacity={0.5}
                    onPress={handleSignUp}>
                <ButtonText>Cadastrar</ButtonText>
            </Button>            

        </Container>
    )
};