import React, { memo, useState } from "react";
import { StyleSheet, Text } from "react-native";
import Background from "../components/Background";
import Header from "../components/Header";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import { theme } from "../utility/theme";
import {
  usernameValidator,
  surnameValidator,
  passwordValidator,
  nameValidator,
} from "../utility/utils";
import { useRegistration } from "../hooks/useRegistration";

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState({ value: "", error: "" });
  const [surname, setSurname] = useState({ value: "", error: "" });
  const [username, setUsername] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const { isLoading, doRegistration, error, outcome } = useRegistration();

  const _onSignUpPressed = () => {
    const nameError = nameValidator(name.value);
    const surnameError = surnameValidator(surname.value);
    const usernameError = usernameValidator(username.value);
    const passwordError = passwordValidator(password.value);

    if (usernameError || passwordError || nameError || surnameError) {
      setName({ ...name, error: nameError });
      setSurname({ ...surname, error: surnameError });
      setUsername({ ...username, error: usernameError });
      setPassword({ ...password, error: passwordError });
      return;
    }

    doRegistration(name, surname, username, password);
  };

  return (
    <Background>

      <Header>Create Account</Header>

      <TextInput
        label="Name"
        returnKeyType="next"
        value={name.value}
        onChangeText={(text) => setName({ value: text, error: "" })}
        error={!!name.error}
        errorText={name.error}
      />

      <TextInput
        label="Surname"
        returnKeyType="next"
        value={surname.value}
        onChangeText={(text) => setSurname({ value: text, error: "" })}
        error={!!surname.error}
        errorText={surname.error}
      />

      <TextInput
        label="Username"
        returnKeyType="next"
        value={username.value}
        onChangeText={(text) => setUsername({ value: text, error: "" })}
        error={!!username.error}
        errorText={username.error}
      />

      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: "" })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />

      {outcome ? (
        <Button
          mode="contained"
          onPress={() => navigation.navigate("LoginScreen")}
          style={styles.button}
          loading={isLoading}
        >
          Vai al login
        </Button>
      ) : (
        <Button
          mode="contained"
          onPress={_onSignUpPressed}
          style={styles.button}
        >
          Sign up
        </Button>
      )}

      {outcome ? <Text style={styles.outcome}>{outcome}</Text> : null}
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </Background>
  );
};

const styles = StyleSheet.create({
  label: {
    color: theme.colors.secondary,
  },
  button: {
    marginTop: 24,
  },
  row: {
    flexDirection: "row",
    marginTop: 4,
  },
  error: {
    margin: 20,
    color: theme.colors.error,
    fontWeight: "bold",
  },
  outcome: {
    margin: 20,
    color: theme.colors.success,
    fontWeight: "bold",
  },
});

export default memo(RegisterScreen);
