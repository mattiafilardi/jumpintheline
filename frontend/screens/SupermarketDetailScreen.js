import React, { memo, useState, useEffect } from "react";
import { StyleSheet, Text, View, Dimensions, Image, Alert } from "react-native";
import * as Font from "expo-font";
import { AppLoading } from "expo";
import { useSupermarketDetail } from "../hooks/useSupermarketDetail";
import { SafeAreaView } from "react-native-safe-area-context";
import { theme } from "../utility/theme";
import BackButton from "../components/BackButton";
import { Divider } from "react-native-paper";
import Button from "../components/Button";
import { usePrenotation } from "../hooks/usePrenotation";

const SupermarketDetailScreen = (props) => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const { navigation } = props;
  const { supermarket } = props.navigation.state.params;
  const { user } = props.navigation.state.params;

  const { isLoading, supermarketDetail } = useSupermarketDetail(supermarket.id);
  const {
    isLoadingPrenotation,
    doPrenotation,
    prenotation,
    error,
  } = usePrenotation();

  let deviceWidth = Dimensions.get("window").width;
  let deviceHeight = Dimensions.get("window").height;

  useEffect(() => {
    if (prenotation == null) return;

    navigation.navigate("PrenotationScreen", {
      prenotationID: prenotation.id,
      user: user,
    });
  }, [prenotation]);

  const fetchFonts = () => {
    return Font.loadAsync({
      "lato-bold": require("../fonts/Lato-Bold.ttf"),
      "lato-regular": require("../fonts/Lato-Regular.ttf"),
    });
  };

  const createTwoButtonAlert = () =>
    Alert.alert(
      "Prenotazione",
      "Il supermercato ha dei posti liberi, prenota soltanto se ti trovi nei pressi del supermarcato!",
      [
        {
          text: "Annulla",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "Prenota",
          onPress: () => doPrenotation(supermarket.id, user.id),
        },
      ],
      { cancelable: false }
    );

  const getSupermarketPhoto = (supermarketName) => {
    switch (supermarketName) {
      case "Conad":
        return require("../assets/supermercati/conad.jpg");
      case "Eurospin":
        return require("../assets/supermercati/eurospin.jpeg");
      case "Lidl":
        return require("../assets/supermercati/lidl.jpg");
      case "Carrefour":
        return require("../assets/supermercati/carrefour.jpg");
      case "Pam":
        return require("../assets/supermercati/pam.jpg");
      case "Esselunga":
        return require("../assets/supermercati/esselunga.png");
      default:
        return "";
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {!fontsLoaded || isLoading ? (
        <AppLoading
          startAsync={fetchFonts}
          onFinish={() => setFontsLoaded(true)}
        />
      ) : (
        <View>
          <Image
            style={[
              styles.image,
              {
                width: (deviceWidth * 95) / 100,
                height: (deviceHeight * 35) / 100,
              },
            ]}
            source={getSupermarketPhoto(supermarketDetail.supermarket.nome)}
          />

          <BackButton goBack={() => navigation.navigate("HomeScreen")} />

          <View style={{ margin: 20 }}>
            <Text style={styles.title}>
              {supermarketDetail.supermarket.nome}
            </Text>
            <Text style={styles.subtitle}>
              {supermarketDetail.supermarket.indirizzo}
            </Text>
            <View
              style={[
                styles.chip,
                {
                  backgroundColor:
                    supermarket.stato == "OPEN"
                      ? theme.colors.success
                      : theme.colors.error,
                },
              ]}
            >
              <Text style={styles.status}>
                {supermarketDetail.supermarket.stato}
              </Text>
            </View>

            <Divider style={{ marginTop: 15 }} />

            <View
              style={{
                flexDirection: "row",
                marginTop: 20,
                justifyContent: "space-between",
              }}
            >
              <View style={{ flexDirection: "column" }}>
                <Text style={styles.info}>
                  {supermarketDetail.clientInQueue}
                </Text>
                <Text style={styles.description}>People in queue</Text>
              </View>

              <View style={{ flexDirection: "column" }}>
                <Text>
                  <Text style={styles.info}>
                    {supermarketDetail.waitingTime}
                  </Text>
                  <Text style={styles.text}> Minutes</Text>
                </Text>
                <Text style={styles.description}>Estimated Waiting Time</Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                marginTop: 15,
                justifyContent: "space-between",
              }}
            >
              <View style={{ flexDirection: "column" }}>
                <Text style={styles.info}>
                  {supermarketDetail.supermarket.capienza}
                </Text>
                <Text style={styles.description}>Capacity</Text>
              </View>

              <View style={{ flexDirection: "column" }}>
                <Text style={styles.info}>
                  {supermarketDetail.clientInSupermarket}
                </Text>
                <Text style={styles.description}>People In Supermarket </Text>
              </View>
            </View>

            <Divider style={{ marginTop: 15 }} />

            <View
              style={{
                flexDirection: "row",
                marginTop: 20,
                justifyContent: "space-between",
              }}
            >
              <View style={{ flexDirection: "column" }}>
                {supermarketDetail.daysClosed.map((day) => (
                  <Text style={styles.infoSmall}>{day}</Text>
                ))}

                <Text style={styles.description}>Closing Days</Text>
              </View>
              <View style={{ flexDirection: "column" }}>
                <Text style={styles.infoSmall}>
                  {supermarketDetail.supermarket.orarioApertura.substring(0, 5)}{" "}
                  -{" "}
                  {supermarketDetail.supermarket.orarioChiusura.substring(0, 5)}
                </Text>

                <Text style={styles.description}>Opening/Closing Hours</Text>
              </View>
            </View>

            <View style={{ justifyContent: "flex-end" }}>
              <Button
                mode="contained"
                onPress={() => {
                  if (
                    supermarketDetail.supermarket.capienza >
                    supermarketDetail.clientInSupermarket
                  ) {
                    createTwoButtonAlert();
                  } else {
                    doPrenotation(supermarket.id, user.id);
                  }
                }}
                disabled={
                  supermarketDetail.supermarket.stato == "CLOSED" ? true : false
                }
                loading={isLoadingPrenotation}
              >
                Prenota
              </Button>
            </View>

            {error ? <Text style={styles.error}>{error}</Text> : null}
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  image: {},
  title: {
    fontSize: 32,
    color: theme.colors.secondary,
    fontFamily: "lato-regular",
  },
  subtitle: {
    fontSize: 24,
    color: theme.colors.secondary,
    fontFamily: "lato-light",
    marginTop: 3,
  },
  info: {
    fontSize: 32,
    color: theme.colors.primary,
    fontFamily: "lato-bold",
  },
  infoSmall: {
    fontSize: 18,
    color: theme.colors.primary,
    fontFamily: "lato-bold",
  },
  description: {
    fontSize: 16,
    color: theme.colors.secondary,
    fontFamily: "lato-light",
  },
  text: {
    fontSize: 18,
    color: theme.colors.secondary,
    fontFamily: "lato-light",
  },
  chip: {
    borderRadius: 20,
    padding: 5,
    width: "30%",
    marginTop: 5,
  },
  status: {
    color: "white",
    textAlign: "center",
    fontFamily: "lato-regular",
  },
  error: {
    textAlign: "center",
    color: theme.colors.error,
    fontWeight: "bold",
  },
});

export default memo(SupermarketDetailScreen);
