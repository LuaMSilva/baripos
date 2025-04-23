import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';

export const Container = styled.View`
  flex: 1;
  background-color: #f3f4f6;
  align-items: center;
  justify-content: center;
  padding: 0 16px;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 16px;
  border-bottom-width: 1px;
  border-color: #e5e7eb;
`;

export const WelcomeLabel = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #374151;
  text-align: center;
`;

export const IconButton = styled.TouchableOpacity`
  padding: 8px;
`;

export const Content = styled.View`
  width: 100%;
  align-items: center;
  margin-top: 20px;
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

export const Grid = styled.View`
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  gap: 16px;
`;

export const CardContainer = styled(TouchableOpacity)`
  width: 45%;
  align-items: center;
`;

export const CardContent = styled.View`
  padding: 16px;
  align-items: center;
  background-color: white;
  elevation: 2;
  border-radius: 8px;
`;

export const CardStyled = styled.View`
  padding: 16px;
  align-items: center;
  background-color: white;
  elevation: 2;
  border-radius: 8px;
`;

export const IconContainer = styled.View`
  width: 56px;
  height: 56px;
  border-radius: 28px;
  justify-content: center;
  align-items: center;
  margin-bottom: 8px;
`;

export const CardTitle = styled.Text`
  font-size: 16px;
  font-weight: bold;
  text-align: center;
`;

export const CardDescription = styled.Text`
  font-size: 12px;
  text-align: center;
  color: #6b7280;
`;
