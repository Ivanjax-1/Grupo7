import { useRouter } from 'expo-router';
import { View, Text, Button } from 'react-native';
import styles from './styles/index.styles';

export default function IndexScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pantalla principal</Text>
      <Text style={styles.subtitle}>EventRadar</Text>
      <View style={styles.button}>
        <Button
          title="Ir a mapa"
          onPress={() => router.push('/screem2')}
          color="#007AFF"
        />
      </View>
    </View>
  );
}