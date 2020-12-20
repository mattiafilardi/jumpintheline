import React, { memo, useState } from "react";
import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import Supermarket from "../components/Supermarket";
import { theme } from "../utility/theme";
import { useSupermarket } from "../hooks/useSupermarket";
import { FlatList } from "react-native-gesture-handler";
import { Searchbar } from "react-native-paper";
import * as Font from "expo-font";
import { AppLoading } from "expo";
import { Entypo } from "@expo/vector-icons";

const HomeScreen = (props) => {
  const { isLoading, supermarkets } = useSupermarket();
  const [searchQuery, setSearchQuery] = useState("");
  const [supermarketsFiltered, setSupermarketsFiltered] = useState();
  const [noData, setNoData] = useState(false);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const { navigation } = props;
  const { user } = props.navigation.state.params;

  let deviceWidth = Dimensions.get("window").width;
  let deviceHeight = Dimensions.get("window").height;

  const onChangeSearch = (query) => {
    setSearchQuery(query);
    setNoData(false);

    let filteredSupermarket = supermarkets.filter((item) => {
      return item.nome.includes(query);
    });

    if (!query || query === "") {
      setSupermarketsFiltered(supermarkets);
    } else if (!filteredSupermarket.length) {
      setNoData(true);
    } else if (Array.isArray(filteredSupermarket)) {
      setSupermarketsFiltered(filteredSupermarket);
    }
  };

  const fetchFonts = () => {
    return Font.loadAsync({
      "lato-bold": require("../fonts/Lato-Bold.ttf"),
      "lato-regular": require("../fonts/Lato-Regular.ttf"),
      "lato-light": require("../fonts/Lato-Light.ttf"),
      "lato-light-italic": require("../fonts/Lato-LightItalic.ttf"),
    });
  };

  return (
    <>
      {!fontsLoaded || isLoading ? (
        <AppLoading
          startAsync={fetchFonts}
          onFinish={() => setFontsLoaded(true)}
        />
      ) : (
        <View style={styles.container}>
          <View style={styles.row}>
            <Entypo
              name="list"
              size={32}
              color={theme.colors.primary}
              onPress={() =>
                navigation.navigate("PrenotationList", {
                  user: user,
                })
              }
            />
          </View>

          <Text style={styles.title}>Good morning,</Text>
          <Text style={styles.subtitle}>Where are you going today?</Text>

          <View style={styles.searchbar}>
            <Searchbar
              placeholder="Cerca..."
              onChangeText={onChangeSearch}
              value={searchQuery}
            />
          </View>

          <View style={{ alignItems: "center", marginVertical: 15 }}>
            <Image
              style={[styles.tinyLogo, {width : deviceWidth * 90 / 100, height: deviceHeight * 28 / 100}]}
              source={require("../assets/illustration.png")}
              resizeMode={"cover"}
            />
          </View>

          {noData ? (
            <Text style={styles.noResult}>Nessun risultato</Text>
          ) : (
            <>
              <Text style={styles.text}>Supermarkets near you :</Text>
              <FlatList
                data={
                  supermarketsFiltered && supermarketsFiltered.length > 0
                    ? supermarketsFiltered
                    : supermarkets
                }
                horizontal={true}
                renderItem={({ item }) => (
                  <Supermarket
                    supermarket={item}
                    navigation={navigation}
                    user={user}
                  ></Supermarket>
                )}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id.toString()}
              />
            </>
          )}
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10
  },
  title: {
    fontSize: 30,
    color: theme.colors.primary,
    fontFamily: "lato-bold",
  },
  subtitle: {
    fontSize: 26,
    color: theme.colors.primary,
    fontFamily: "lato-regular",
    marginBottom: 5,
  },
  text: {
    fontSize: 26,
    color: theme.colors.primary,
    fontFamily: "lato-light",
  },
  searchbar: {
    marginTop: 10,
    marginVertical: 10,
  },
  tinyLogo: {
    borderRadius: 10,
    width: "100%",
    height: 200,
  },
  noResult: {
    fontSize: 40,
    color: theme.colors.primary,
    fontFamily: "lato-light-italic",
    marginLeft: 10,
    textAlign: "center",
    marginTop: 100,
  },
});

export default memo(HomeScreen);
