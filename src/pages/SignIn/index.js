import React, { useState, useContext } from 'react';
import { Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../contexts/auth'

import { 
        Container,
        Titulo,
        Subtitulo,
        AreaInput,
        Input,
        Label,
        Button,
        ButtonText,
        Link,
        LinkText
} from './styles'

export default function SignIn(){

    const navigation = useNavigation();
    const { signIn } = useContext(AuthContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleLogin(){
        signIn(email, password);
    }

    return(
       
       <Container>

            <Subtitulo>Seu apoio pós-báriatrica</Subtitulo>

            <Titulo>Bem vindo(a)!</Titulo>
            <Subtitulo>Entre com seus dados para acessar sua conta</Subtitulo>

            <Label>E-mail</Label>
            <AreaInput>
                <Input
                placeholder="Digite seu email"
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

            <Button activeOpacity={0.5} onPress={handleLogin}>
                <ButtonText>Entrar</ButtonText>
            </Button>

            <Subtitulo>Não tem conta?</Subtitulo>

            <Link onPress={ () => navigation.navigate('SignUp')}>
                <LinkText>Cadastre-se</LinkText>
            </Link>

        </Container>
    )
};