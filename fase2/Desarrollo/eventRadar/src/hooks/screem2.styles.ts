import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F7FA',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#222',
  },
  map: {
    width: 320,
    height: 400,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#90caf9',
    overflow: 'hidden',
  },
});

export default styles;
