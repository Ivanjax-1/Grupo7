import { useRouter } from 'expo-router';
import { View, Text, Button } from 'react-native';
import styles from './styles/screem2.styles';

export default function Screen2() {
    const router = useRouter();
    return(
        <View style={styles.container}>
            <Text style={styles.title}>Mapa de eventos</Text>
            <View style={styles.mapPlaceholder}>
                <Text style={styles.mapText}>[Aquí irá Inicio]</Text>
            </View>
            <Button title='Ir a pantalla Mapa' onPress={()=>router.push("/screem2")}></Button>
        </View>
    );
}