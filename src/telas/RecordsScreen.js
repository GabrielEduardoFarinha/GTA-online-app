import React, { useState } from 'react';
import { View, StyleSheet, Text, FlatList, Image, TouchableOpacity, Modal, Alert, Button } from 'react-native';

const RecordsScreen = ({ route, navigation }) => {
  const { records: initialRecords } = route.params;
  const [records, setRecords] = useState(initialRecords);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRecords, setSelectedRecords] = useState([]);

  // Função para alternar a seleção de um item
  const toggleSelectRecord = (index) => {
    if (selectedRecords.includes(index)) {
      setSelectedRecords(selectedRecords.filter(i => i !== index));
    } else {
      setSelectedRecords([...selectedRecords, index]);
    }
  };

  // Função para excluir os registros selecionados
  const handleDeleteSelected = () => {
    if (selectedRecords.length > 0) {
      const updatedRecords = records.filter((_, index) => !selectedRecords.includes(index));
      setRecords(updatedRecords);
      setSelectedRecords([]); // Limpa a seleção
      setModalVisible(false); // Fecha o modal
    } else {
      Alert.alert('Nenhum registro selecionado', 'Por favor, selecione ao menos um registro para excluir.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registros Criados</Text>

      <FlatList
        data={records}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.recordCard}>
            {item.imageUri && <Image source={{ uri: item.imageUri }} style={styles.recordImage} />}
            <Text style={styles.recordText}>Nome: {item.name}</Text>
            <Text style={styles.recordText}>Categoria: {item.role}</Text>
            <Text style={styles.recordText}>Garagem: {item.team}</Text>

            {/* Checkbox-like button for selecting/deselecting */}
            <TouchableOpacity
              style={styles.selectButton}
              onPress={() => toggleSelectRecord(index)}
            >
              <Text style={styles.selectButtonText}>
                {selectedRecords.includes(index) ? 'Selecionado' : 'Selecionar'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Botão de Exclusão Global no final */}
      <TouchableOpacity
        style={styles.deleteAllButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.deleteAllButtonText}>Excluir</Text>
      </TouchableOpacity>

      {/* Modal para seleção e exclusão */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Selecione os registros a excluir</Text>

            {/* Exibição dos registros selecionados */}
            <FlatList
              data={records}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => (
                <View style={styles.modalRecord}>
                  <Text style={styles.recordText}>{item.name}</Text>
                  <TouchableOpacity
                    style={styles.selectButton}
                    onPress={() => toggleSelectRecord(index)}
                  >
                    <Text style={styles.selectButtonText}>
                      {selectedRecords.includes(index) ? 'Desmarcar' : 'Marcar'}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            />

            <Button
              title="Excluir Selecionados"
              onPress={handleDeleteSelected}
              color="#FF4D4D"
            />
            <Button
              title="Cancelar"
              onPress={() => setModalVisible(false)}
            />
          </View>
        </View>
      </Modal>
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
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  recordCard: {
    marginBottom: 20,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  recordText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  recordImage: {
    width: '100%',
    height: 180,
    borderRadius: 12,
    marginBottom: 15,
    resizeMode: 'cover',
  },
  selectButton: {
    marginTop: 10,
    backgroundColor: '#4A90E2',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  selectButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  deleteAllButton: {
    backgroundColor: '#FF4D4D',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 30,
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',  // Centraliza o botão
    alignItems: 'center',
  },
  deleteAllButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  modalRecord: {
    marginBottom: 15,
    alignItems: 'center',
  },
});

export default RecordsScreen;
