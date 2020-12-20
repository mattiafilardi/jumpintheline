import React, { memo, useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Image,
  Text,
  Dimensions,
  View,
} from "react-native";
import * as Font from "expo-font";
import Button from "../components/Button";
import { AppLoading } from "expo";
import { usePrenotation } from "../hooks/usePrenotation";
import { theme } from "../utility/theme";

const PrenotationScreen = (props) => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const { prenotationID } = props.navigation.state.params;
  const { user } = props.navigation.state.params;
  const { navigation } = props;

  const {
    isLoadingPrenotation,
    prenotation,
    getPrenotationStatus,
    error,
    terminatePrenotation,
  } = usePrenotation(prenotationID);

  let deviceWidth = Dimensions.get("window").width;
  let deviceHeight = Dimensions.get("window").height;

  const fetchFonts = () => {
    return Font.loadAsync({
      "lato-bold": require("../fonts/Lato-Bold.ttf"),
      "lato-regular": require("../fonts/Lato-Regular.ttf"),
      "lato-bold-italic": require("../fonts/Lato-BoldItalic.ttf"),
    });
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 10,
      }}
    >
      {!fontsLoaded || isLoadingPrenotation || !prenotation ? (
        <AppLoading
          startAsync={fetchFonts}
          onFinish={() => setFontsLoaded(true)}
        />
      ) : (
        <>
          <Text style={styles.text}>Prenotation Summary</Text>
          <View style={{ alignItems: "center" }}>
            {prenotation.idStato == 2 ? (
              <>
                <Image
                  style={[
                    styles.tinyLogo,
                    {
                      width: (deviceWidth * 65) / 100,
                      height: (deviceHeight * 35) / 100,
                      marginVertical: 35,
                    },
                  ]}
                  source={require("../assets/success.png")}
                  resizeMode={"cover"}
                />

                <Text style={styles.description}>Ciao {user.nome},</Text>
                <Text style={styles.description}>
                  puoi entrare per fare la spesa!
                </Text>
              </>
            ) : null}

            {prenotation.idStato == 1 ? (
              <>
                <Image
                  style={[
                    styles.tinyLogo,
                    {
                      width: (deviceWidth * 65) / 100,
                      height: (deviceHeight * 35) / 100,
                      marginVertical: 35,
                    },
                  ]}
                  source={require("../assets/time-left.png")}
                  resizeMode={"cover"}
                />

                <Text style={styles.description}>Ciao {user.nome},</Text>
                <Text style={styles.description}>
                  sei in coda, aspetta il tuo turno!
                </Text>
              </>
            ) : null}

            {prenotation.idStato == 3 ? (
              <>
                <Image
                  style={[
                    styles.tinyLogo,
                    {
                      width: (deviceWidth * 65) / 100,
                      height: (deviceHeight * 35) / 100,
                      marginVertical: 35,
                    },
                  ]}
                  source={require("../assets/goodbye.png")}
                  resizeMode={"cover"}
                />

                <Text style={styles.description}>Ciao {user.nome},</Text>
                <Text style={styles.description}>prenotazione terminata!</Text>
              </>
            ) : null}
          </View>

          {prenotation.idStato == 3 ? (
            <Button
              mode="contained"
              onPress={() => {
                navigation.navigate("HomeScreen");
              }}
              loading={isLoadingPrenotation}
              style={{ padding: 5, marginTop: 70 }}
            >
              Torna alla home
            </Button>
          ) : (
            <Button
              mode="contained"
              onPress={() => {
                terminatePrenotation(prenotation.id, prenotation.idSupermarket);
              }}
              loading={isLoadingPrenotation}
              style={{ padding: 5, marginTop: 70 }}
            >
              Termina prenotazione
            </Button>
          )}
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 26,
    color: theme.colors.primary,
    fontFamily: "lato-bold-italic",
    marginVertical: 15,
  },
  description: {
    fontSize: 28,
    color: theme.colors.primary,
    fontFamily: "lato-light",
  },
});

export default memo(PrenotationScreen);
