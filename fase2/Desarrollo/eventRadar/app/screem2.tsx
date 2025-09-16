import { useRouter } from 'expo-router';
import { View, Text, Button } from 'react-native';
import styles from './styles/screem2.styles';

export default function Screen2() {
    const router = useRouter();
    return(
        <View style={styles.container}>
            <Text style={styles.title}>Mapa de eventos</Text>
            <View style={styles.mapPlaceholder}>
                <Text style={styles.mapText}>[Aquí irá el mapa]</Text>
            </View>
            <Button title='Volver al inicio' onPress={() => router.push("/")} />
        </View>
    );
}