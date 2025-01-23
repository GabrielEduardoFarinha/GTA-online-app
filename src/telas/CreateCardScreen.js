import React, { useState } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { launchImageLibrary } from 'react-native-image-picker';
import { Picker } from '@react-native-picker/picker';  // Importação corrigida

const CreateCardScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const [team, setTeam] = useState('');
  const [records, setRecords] = useState([]);

  const handleImageUpload = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('Upload cancelado.');
      } else if (response.errorMessage) {
        console.log('Erro ao carregar a imagem:', response.errorMessage);
      } else {
        const uri = response.assets[0]?.uri;
        setImageUri(uri);
      }
    });
  };

  const handleCreateCard = () => {
    const newRecord = { name, role, imageUri, team };
    setRecords((prevRecords) => [...prevRecords, newRecord]);

    // Navegar para a tela de registros e passar os dados
    navigation.navigate('RecordsScreen', { records: [...records, newRecord] });

    // Limpar os campos
    setName('');
    setRole('');
    setImageUri(null);
    setTeam('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Preencha os campos para adicionar o carro a uma garagem</Text>

      <TextInput
        label="Nome do carro"
        value={name}
        onChangeText={setName}
        style={styles.input}
        mode="outlined"
        theme={{ colors: { primary: '#4A90E2' } }}
      />
      
      <TextInput
        label="Categoria"
        value={role}
        onChangeText={setRole}
        style={styles.input}
        mode="outlined"
        theme={{ colors: { primary: '#4A90E2' } }}
      />

      <View style={styles.imageUploadContainer}>
        <Text style={styles.pickerLabel}>Imagem</Text>
        <TouchableOpacity style={styles.imageUploadButton} onPress={handleImageUpload}>
          <Text style={styles.imageUploadText}>Selecionar Imagem</Text>
        </TouchableOpacity>
        {imageUri && <Image source={{ uri: imageUri }} style={styles.imagePreview} />}
      </View>

      <View style={styles.pickerContainer}>
        <Text style={styles.pickerLabel}>Garagens</Text>
        <Picker
          selectedValue={team}
          onValueChange={(itemValue) => setTeam(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Selecione uma garagem para estocar" value="" />
          <Picker.Item label="Garagem A" value="garagem_a" />
          <Picker.Item label="Garagem B" value="garagem_b" />
          <Picker.Item label="Garagem C" value="garagem_c" />
        </Picker>
      </View>

      <Button mode="contained" onPress={handleCreateCard} style={styles.button}>
        Criar card
      </Button>

      {/* Botão para navegar diretamente para a tela de registros */}
      <Button
        mode="outlined"
        onPress={() => navigation.navigate('RecordsScreen', { records })}
        style={[styles.viewRecordsButton, { backgroundColor: '#4A90E2' }]}
        labelStyle={{ color: '#fff' }}
      >
        Ver Registros
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    marginBottom: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  imageUploadContainer: {
    marginVertical: 20,
    alignItems: 'center',
  },
  imageUploadButton: {
    backgroundColor: '#4A90E2',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  imageUploadText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  imagePreview: {
    width: 180,
    height: 180,
    marginTop: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  pickerContainer: {
    marginVertical: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  pickerLabel: {
    fontSize: 16,
    marginBottom: 5,
    marginLeft: 10,
    color: '#4A90E2',
  },
  picker: {
    height: 50,
    width: '100%',
    borderRadius: 10,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#4A90E2',
    borderRadius: 10,
    paddingVertical: 12,
  },
  viewRecordsButton: {
    marginTop: 15,
    borderColor: '#4A90E2',
    borderWidth: 2,
    borderRadius: 10,
    paddingVertical: 12,
  },
});

export default CreateCardScreen;
