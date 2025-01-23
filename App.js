import React, { useState } from 'react';
import { View, StyleSheet, Text, Picker, Image, TouchableOpacity } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { launchImageLibrary } from 'react-native-image-picker';

const App = () => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [imageUri, setImageUri] = useState(null); // Armazena a URI da imagem
  const [team, setTeam] = useState('');

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
        // Obtém a URI da imagem selecionada
        const uri = response.assets[0]?.uri;
        setImageUri(uri);
      }
    });
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
      />
      
      <TextInput
        label="Categoria"
        value={role}
        onChangeText={setRole}
        style={styles.input}
        mode="outlined"
      />

      <View style={styles.imageUploadContainer}>
        <Text style={styles.pickerLabel}>Envie uma foto do seu carro</Text>
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

      <Button
        mode="contained"
        onPress={() => console.log({ name, role, imageUri, team })}
        style={styles.button}
      >
        Criar card
      </Button>
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
  input: {
    marginBottom: 15,
  },
  imageUploadContainer: {
    marginVertical: 15,
    alignItems: 'center',
  },
  imageUploadButton: {
    backgroundColor: '#4A90E2',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  imageUploadText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  imagePreview: {
    width: 200,
    height: 200,
    marginTop: 10,
    borderRadius: 10,
  },
  pickerContainer: {
    marginVertical: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  pickerLabel: {
    fontSize: 16,
    marginBottom: 5,
    marginLeft: 10,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#4A90E2',
  },
});

export default App;
