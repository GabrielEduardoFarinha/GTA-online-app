// src/telas/RecordsScreen.js
import React from 'react';
import { View, StyleSheet, Text, FlatList, Image } from 'react-native';

const RecordsScreen = ({ route }) => {
  const { records } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registros Criados</Text>

      <FlatList
        data={records}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.recordCard}>
            {item.imageUri && <Image source={{ uri: item.imageUri }} style={styles.recordImage} />}
            <Text style={styles.recordText}>Nome: {item.name}</Text>
            <Text style={styles.recordText}>Categoria: {item.role}</Text>
            <Text style={styles.recordText}>Garagem: {item.team}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  recordCard: {
    marginBottom: 15,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  recordText: {
    fontSize: 16,
    marginBottom: 5,
  },
  recordImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
});

export default RecordsScreen;
