import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  alignItems: center;
  padding: 20px;
`;

export const Logo = styled.Image`
    margin-bottom: 25px;
`;

export const Titulo = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #374151;
  text-align: center;
`;

export const Subtitulo = styled.Text`
  margin-top: 20px;
  font-size: 14px;
  color: #6B7280;
  text-align: center;
  margin-bottom: 20px;
`;

export const Label = styled.Text`
  align-self: flex-start;
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 5px;
`;

export const AreaInput = styled.View`
    flex-direction: row;
`;

export const Input = styled.TextInput`
  width: 100%;
  padding: 10px;
  border-width: 1px;
  border-color: #D1D5DB;
  border-radius: 5px;
  margin-bottom: 10px;    
`;

export const Button = styled.TouchableOpacity`
  background-color: #3B82F6;
  padding: 10px;
  border-radius: 5px;
  align-items: center;
  width: 100%;
`;

export const ButtonText = styled.Text`
  color: #FFF;
  font-weight: bold;
`;

export const Link = styled.TouchableOpacity`
  margin-bottom: 10px;
  align-items: center;
`;

export const LinkText = styled.Text`
  color: #3B82F6;
`;

