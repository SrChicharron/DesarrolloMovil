import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Modal,
  Image,
  ScrollView,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import Button from "../components/atoms/Button";
import { Picker } from "@react-native-picker/picker";
import { format } from "date-fns";
import Toast from "react-native-toast-message";
import * as ImagePicker from "expo-image-picker";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { registrarUsuario } from "../api/RegisterAPI";

const options = [
  { label: "Cliente", value: "ROLE_CLIENTE" },
  { label: "Trabajador", value: "ROLE_EMPLEADO" },
];

export default function RegisterForm() {
  const navigation = useNavigation();
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [userName, setUserName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [passwordRepeat, setPasswordRepeat] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [birthDate, setBirthDate] = useState(new Date());
  const [userRole, setUserRole] = useState(null);
  const [ine, setIne] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    //console.log(result);

    if (!result.canceled) {
      setIne(result.assets[0].uri);
      //handleChange("imagen", result.assets[0].uri);
      // handleImagenes(result.assets[0].uri);
    }
  };

  const showToastSuccess = (message) => {
    Toast.show({
      type: "success",
      text1: "Registro exitoso",
      text2: `${message}  🥳`,
    });
  };

  const showToastError = (message) => {
    Toast.show({
      type: "error",
      text1: "Error",
      text2: `${message}  😥`,
    });
  };

  const handleDateChange = (event, selectedDate) => {
    if (event.type === "set") {
      setBirthDate(selectedDate);
    }
    setShowDatePicker(false);
  };

  const formattedBirthDate = format(birthDate, "yyyy-MM-dd");
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleRegister = () => {
    //const urlRegister ="http://clenhometm.trafficmanager.net:2813/ch/auth/register";
    const urlRegister ="http://192.168.0.109:2813/ch/auth";

    const userData = {
      username: userName,
      email: email,
      password: password,
      cellphone: phoneNumber,
      name: firstName,
      lastName: lastName,
      birthday: formattedBirthDate,
      enabled: 0,
      authorities: [{ authority: userRole, username: userName }],
    };

    registrarUsuario(userData, ine)
    .then(registerResponse => {
      console.log(registerResponse.status);
      if(registerResponse.status===400){
        showToastError(
          "El nombre de usuario o el correo electrónico ya han sido utilizados"
        );
      }else if(registerResponse.status===200){
        showToastSuccess("Usuario registrado con éxito");
        // Esperar 2 segundos
        setTimeout(() => {
          setRegistrationSuccess(true);
          navigation.navigate("Login");
        }, 5000);
      }
    })
    .catch(error => {
      console.error('Error en el registro:', error);
      showToastError(
        "Error al registrar el usuario"
      );
    });

  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Usuario"
          value={userName}
          onChangeText={setUserName}
        />
        <TextInput
          style={styles.input}
          placeholder="Nombre"
          value={firstName}
          onChangeText={setFirstName}
        />
        <TextInput
          style={styles.input}
          placeholder="Apellidos"
          value={lastName}
          onChangeText={setLastName}
        />
        <TouchableOpacity
          style={styles.input}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={styles.inputLabel}>Fecha de nacimiento</Text>
          <Text style={styles.dateText}>
            {birthDate ? birthDate.toISOString() : "Selecciona una fecha"}
          </Text>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={birthDate}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={handleDateChange}
          />
        )}

        <TextInput
          style={styles.input}
          placeholder="Celular"
          maxLength={10}
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
        <TextInput
          style={styles.input}
          placeholder="Correo electrónico"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="Repetir contraseña"
          secureTextEntry
          value={passwordRepeat}
          onChangeText={setPasswordRepeat}
        />
        <Picker
          style={styles.picker}
          selectedValue={userRole}
          onValueChange={(itemValue) => setUserRole(itemValue)}
        >
          <Picker.Item label="Selecciona un rol" style={styles.pickerItem} />
          {options.map((option) => (
            <Picker.Item
              style={styles.pickerItemModal}
              key={option.value}
              label={option.label}
              value={option.value}
            />
          ))}
        </Picker>
        <Text style={styles.label}>INE</Text>
        <TouchableOpacity
          style={styles.imageContainerComprobante}
          onPress={() => pickImage()}
        >
          <Image source={{ uri: ine }} style={styles.imageComprobante} />
          {/* Poner icono de camara de fontawesome */}
          <FontAwesomeIcon
            style={styles.iconCameraComrobante}
            icon={faCamera}
            size={24}
            color="#373737"
          />
        </TouchableOpacity>
      </View>

      <Button
        txtBtn="Crear cuenta"
        onPress={() => {
          if (
            !userName ||
            !email ||
            !password ||
            !firstName ||
            !lastName ||
            !phoneNumber ||
            !birthDate ||
            !userRole
          ) {
            showToastError("Todos los campos son obligatorios.");
            return;
          }

          if (!phoneNumber.trim()) {
            showToastError("El número de teléfono no debe estar vacío.");
            return;
          }

          if (!birthDate) {
            showToastError("La fecha de nacimiento no debe estar vacía.");
            return;
          }

          //Validación de contraseñas para que sean iguales
          if (password !== passwordRepeat) {
            showToastError("Las contraseñas no coinciden.");
            return;
          }
          handleRegister();
        }}
      />

      <TouchableOpacity
        style={styles.registerLink}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.registerLinkText}>
          ¿Ya tienes cuenta?{" "}
          <Text style={{ color: "#075493" }}>Inicia sesión</Text>
        </Text>
      </TouchableOpacity>
      <Toast topOffset={120} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 50,
  },
  formContainer: {
    width: "100%",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: "100%",
  },
  registerLink: {
    marginTop: 20,
  },
  registerLinkText: {
    color: "#6E6E6E",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  label: {
    color: "#6E6E6E",
    marginTop: 10,
    marginLeft: 3,
    textAlign: "justify",
  },
  selectField: {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    borderRadius: 10,
    padding: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  modalContainer1: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    marginBottom: 10,
  },
  optionItem: {
    backgroundColor: "#fff",
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  dateText: {
    color: "#6E6E6E",
  },
  selectedOption: {
    color: "#6E6E6E",
  },
  selectedOptionItem: {
    backgroundColor: "#f0f0f0",
  },
  inputLabel: {
    color: "#6E6E6E",
  },
  successMessage: {
    color: "green",
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
  },
  picker: {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    borderRadius: 10,
  },
  pickerItem: {
    color: "#6E6E6E",
    borderRadius: 5,
    fontSize: 15,
  },
  pickerItemModal: {
    color: "#6E6E6E",
    borderRadius: 5,
    fontSize: 15,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
  imageContainerComprobante: {
    alignItems: "center",
    width: "100%",
    height: 50,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    marginTop: 10,
    borderRadius: 5,
  },
  iconCameraComrobante: {
    position: "absolute",
    //Posicionar al centro
    top: 10,
    left: "50%",
  },
  imageComprobante: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
});
