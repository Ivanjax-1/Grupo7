import { useRouter } from 'expo-router';
import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Button, ActivityIndicator, Alert } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import styles from './styles/screem2.styles';

const MOCK_EVENTS = [
  { id: '1', title: 'Feria Cultural', lat: -33.4489, lng: -70.6693, desc: 'Plaza de Armas' },
  { id: '2', title: 'Concierto', lat: -33.456,   lng: -70.65,   desc: 'Parque Quinta Normal' },
];

export default function Screen2() {
  const router = useRouter();
  const mapRef = useRef<MapView | null>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [coords, setCoords] = useState<{ latitude: number; longitude: number } | null>(null);

  // Pide permisos y toma ubicación actual
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      const granted = status === 'granted';
      setHasPermission(granted);

      if (!granted) {
        Alert.alert('Permiso requerido', 'Habilita la ubicación para ver eventos cercanos.');
        return;
      }
      const loc = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
      setCoords({ latitude: loc.coords.latitude, longitude: loc.coords.longitude });
    })();
  }, []);

  const initialRegion = {
    latitude: coords?.latitude ?? -33.4489,
    longitude: coords?.longitude ?? -70.6693,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  };

  if (hasPermission === null) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator />
        <Text>Cargando permisos…</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mapa de eventos</Text>

      <MapView
        ref={mapRef}
        style={styles.map}                 // Asegura un alto visible (ej. 300) o flex: 1
        initialRegion={initialRegion}
        provider={PROVIDER_GOOGLE}        // iOS usa Apple Maps aunque declares GOOGLE, no necesitas API key
        showsUserLocation
        showsMyLocationButton
        onMapReady={() => {
          // Opcional: ajustar cámara para mostrar todos los marcadores
          if (mapRef.current && MOCK_EVENTS.length > 0) {
            const markers = MOCK_EVENTS.map(e => ({ latitude: e.lat, longitude: e.lng }));
            mapRef.current.fitToCoordinates(markers, {
              edgePadding: { top: 60, right: 60, bottom: 60, left: 60 },
              animated: true,
            });
          }
        }}
      >
        {MOCK_EVENTS.map(ev => (
          <Marker
            key={ev.id}
            coordinate={{ latitude: ev.lat, longitude: ev.lng }}
            title={ev.title}
            description={ev.desc}
          />
        ))}
      </MapView>

      <View style={{ marginTop: 12 }}>
        <Button title="Volver al inicio" onPress={() => router.push('/')} />
      </View>
    </View>
  );
}
