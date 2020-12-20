import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { Card, Chip } from "react-native-paper";
import { theme } from "../utility/theme";

const Supermarket = (props) => {
  const { supermarket, navigation, user } = props;

  const getSupermarketPhoto = (supermarketName) => {
    switch (supermarketName) {
      case "Conad":
        return (
          require("../assets/loghi/conad.png")
        ); 
      case "Eurospin":
        return (
          require("../assets/loghi/eurospin.png")
        );
      case "Lidl":
        return require("../assets/loghi/lidl.png");
      case "Carrefour":
        return require("../assets/loghi/carrefour.png");
      case "Pam":
        return require("../assets/loghi/pam.png");
      case "Esselunga":
        return require("../assets/loghi/esselunga.png");
      default:
        return "";
    }
  };

  return (
    <TouchableWithoutFeedback
      style={styles.container}
      onPress={() => {
        navigation.navigate("SupermarketDetailScreen", {
          supermarket: supermarket,
          user: user
        });
      }}
    >
      <Card style={styles.card}>
        <Card.Cover source={getSupermarketPhoto(supermarket.nome)} style={styles.cover} resizeMode={"cover"}/>
        <Card.Title
          title={supermarket.nome}
          subtitle={supermarket.indirizzo}
          style={styles.title}
        />
        <Card.Content>
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
            <Text style={styles.text}>{supermarket.stato}</Text>
          </View>
        </Card.Content>
      </Card>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    marginRight: 15, 
  },
  card: {
    padding: 10,
    alignItems: "center",
  },
  cover: {
    height: 100,
    width: 125,
    alignSelf: "center",
  },
  chip: {
    borderRadius: 20,
    padding: 5,
  },
  text: {
    color: "white",
    textAlign: "center",
    fontFamily: "lato-regular",
  },
  title: {
    textAlign: "center",
    fontFamily: "lato-bold",
  },
});

export default Supermarket;
