import React, { useState } from "react";
import { BlurView } from "expo-blur";
import { SafeAreaView } from "react-native-safe-area-context";
import Logo from "../../assets/logo/isotipo.svg";
import ImgLogin from "../../assets/images/login.jpg";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import RegisterForm from "../../components/RegisterForm";
import { StyleSheet, Image, View } from "react-native";

export default function Register(props) {
  const {
    email,
    setEmail,
    password,
    setPassword,
    userName,
    setUserName,
    firstName,
    setFirstName,
    phoneNumber,
    setPhoneNumber,
    birthDate,
    setBirthDate,
    lastName,
    setLastName,
    userRole,
    setUserRole,
    handleRegister,
  } = props;
  return (
    <SafeAreaView>
      <Image source={ImgLogin} style={styles.imgBack} />
      <View style={styles.container}>
        <KeyboardAwareScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
          keyboardShouldPersistTaps="handled"
        >
          <BlurView intensity={100} tint="light" style={styles.blurContainer}>
            <RegisterForm
              userName={userName}
              setUserName={setUserName}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              firstName={firstName}
              setFirstName={setFirstName}
              lastName={lastName}
              setLastName={setLastName}
              phoneNumber={phoneNumber}
              setPhoneNumber={setPhoneNumber}
              birthDate={birthDate}
              setBirthDate={setBirthDate}
              handleRegister={handleRegister}
              userRole={userRole}
              setUserRole={setUserRole}
            />
          </BlurView>
        </KeyboardAwareScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  blurContainer: {
    flex: 1,
    paddingHorizontal: 16,
    width: "100%",
    paddingTop: 120,
  },
  imgBack: {
    width: "100%",
    height: "115%",
    resizeMode: "cover",
    marginTop: -50,
  },
  logo: {
    width: 100,
    height: 100,
    marginTop: -30,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    letterSpacing: 4,
  },
  introText: {
    fontSize: 16,
    marginBottom: 30,
    textAlign: "center",
    letterSpacing: 1,
  },
});
