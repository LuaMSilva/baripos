
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #f9fafb;
  padding: 20px;
`;

export const Titulo = styled.Text`
  font-size: 22px;
  font-weight: bold;
  color: #111827;
  margin-bottom: 10px;
`;

export const Label = styled.Text`
  align-self: flex-start;
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 5px;
`;

export const Input = styled.TextInput`
  background-color: #fff;
  padding: 12px;
  border-radius: 8px;
  border-width: 1px;
  border-color: #d1d5db;
  margin-bottom: 10px;
`;

export const FilterInput = styled(Input)`
  margin-top: 10px;
  margin-bottom: 20px;
`;

export const Button = styled.TouchableOpacity`
  background-color: #3b82f6;
  padding: 12px;
  border-radius: 8px;
  align-items: center;
`;

export const ButtonText = styled.Text`
  color: #fff;
  font-weight: bold;
`;

export const ListItem = styled.View`
  background-color: #fff;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 10px;
  elevation: 2;
`;

export const SintomaText = styled.Text`
  font-size: 16px;
  color: #111827;
`;

export const DateText = styled.Text`
  font-size: 12px;
  color: #6b7280;
  margin-top: 4px;
`;

export const ActionButtons = styled.View`
  flex-direction: row;
  margin-top: 10px;
`;

export const EditButton = styled.TouchableOpacity`
  margin-right: 16px;
`;

export const DeleteButton = styled.TouchableOpacity``;

export const Texto = styled.Text`
  font-size: 14px;
  color: #111827;
`;

export const Evolucao = styled.View`
  margin-top: 20px;
  padding: 10px;
  background-color: #E5E7EB;
  border-radius: 5px;
  align-items: center;
  width: 100%;
`;