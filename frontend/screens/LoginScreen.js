import React, { memo, useEffect, useState } from "react";
import { TouchableOpacity, StyleSheet, Text, View } from "react-native";
import Background from "../components/Background";
import Header from "../components/Header";
import Button from "../components/Button";
import Logo from "../components/Logo";
import TextInput from "../components/TextInput";
import { theme } from "../utility/theme";
import { usernameValidator, passwordValidator } from "../utility/utils";
import { useAuthentication } from "../hooks/useAuthentication";
import * as Font from "expo-font";
import { AppLoading } from "expo";

const LoginScreen = ({ navigation }) => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [username, setUsername] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const { isLoading, doLogin, user, error } = useAuthentication();

  const fetchFonts = () => {
    return Font.loadAsync({
      "lato-bold": require("../fonts/Lato-Bold.ttf"),
      "lato-regular": require("../fonts/Lato-Regular.ttf"),
    });
  };

  useEffect(() => {
    if (user == null) return;

    navigation.navigate("HomeScreen", {
      user: user,
    });
  }, [user]);

  const _onLoginPressed = () => {
    const usernameError = usernameValidator(username.value);
    const passwordError = passwordValidator(password.value);

    if (usernameError || passwordError) {
      setUsername({ ...username, error: usernameError });
      setPassword({ ...password, error: passwordError });
      return;
    }

    doLogin(username, password);
  };

  return (
    <>
      {!fontsLoaded ? (
        <AppLoading
          startAsync={fetchFonts}
          onFinish={() => setFontsLoaded(true)}
        />
      ) : (
        <Background>
          <Logo />

          <Header>Welcome.</Header>

          <TextInput
            label="Username"
            returnKeyType="next"
            value={username.value}
            onChangeText={(text) => setUsername({ value: text, error: "" })}
            error={!!username.error}
            errorText={username.error}
            autoCapitalize="none"
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

          <Button
            mode="contained"
            onPress={_onLoginPressed}
            loading={isLoading}
          >
            Login
          </Button>

          <View style={styles.row}>
            <TouchableOpacity
              onPress={() => navigation.navigate("RegisterScreen")}
              style={{ flexDirection: "row" }}
            >
              <Text>
              <Text style={styles.label}>Don’t have an account? </Text>
              <Text style={styles.link}> Sign up</Text>
              </Text>
            </TouchableOpacity>
          </View>

          {error ? <Text style={styles.error}>{error}</Text> : null}
        </Background>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    marginTop: 4,
  },
  label: {
    fontSize: 15,
    fontFamily: "lato-regular",
    color: theme.colors.secondary,
  },
  link: {
    fontFamily: "lato-bold",
    fontWeight: "bold",
    color: theme.colors.primary,
  },
  error: {
    margin: 20,
    color: theme.colors.error,
    fontWeight: "bold",
  },
});

export default memo(LoginScreen);
