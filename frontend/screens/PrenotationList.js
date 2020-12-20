import React, { memo, useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  FlatList,
  View,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import * as Font from "expo-font";
import { AppLoading } from "expo";
import { usePrenotation } from "../hooks/usePrenotation";
import { theme } from "../utility/theme";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";

const PrenotationList = (props) => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const { user } = props.navigation.state.params;
  const { navigation } = props;
  const { getPrenotations, prenotationList } = usePrenotation();

  const fetchFonts = () => {
    return Font.loadAsync({
      "lato-bold": require("../fonts/Lato-Bold.ttf"),
      "lato-regular": require("../fonts/Lato-Regular.ttf"),
    });
  };

  useEffect(() => {
    if (!user.id) return;

    getPrenotations(user.id);
  }, [user.id]);

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center", marginTop: 20 }}>
      {!fontsLoaded ? (
        <AppLoading
          startAsync={fetchFonts}
          onFinish={() => setFontsLoaded(true)}
        />
      ) : (
        <View style={{ flex: 1 }}>
          <FlatList
            data={prenotationList}
            renderItem={({ item }) => (
              <>
                <View style={styles.itemContainer}>
                  <TouchableOpacity
                    onPress={() => {
                      console.warn(item);
                      navigation.navigate("PrenotationScreen", {
                        prenotationID: item.id,
                        user: user,
                      });
                    }}
                    style={{ alignItems: "center" }}
                  >
                    <Text style={styles.title}>
                      Id prenotazione : {item.id}
                    </Text>
                    <Text style={styles.title}>
                      {new Date(item.orarioPrenotazione).toLocaleString()}
                    </Text>
                    {item.idStato == 3 ? (
                      <View style={{ flexDirection: "row" }}>
                        <Feather name="check-circle" size={24} color="black" />
                        <Text style={styles.status}>Prenotazione terminata</Text>
                      </View>
                    ) : null}
                    {item.idStato == 2 ? (
                      <View style={{ flexDirection: "row" }}>
                        <Feather name="check-circle" size={24} color="green" />
                        <Text style={[styles.status, { color: "green" }]}>
                          Prenotazione Attiva
                        </Text>
                      </View>
                    ) : null}
                    {item.idStato == 1 ? (
                      <View style={{ flexDirection: "row" }}>
                        <Feather name="check-circle" size={24} color="yellow" />
                        <Text style={[styles.status, { color: "yellow" }]}>
                          Prenotazione In Coda
                        </Text>
                      </View>
                    ) : null}
                  </TouchableOpacity>
                </View>
              </>
            )}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    color: theme.colors.secondary,
    fontFamily: "lato-regular",
    marginVertical: 5,
    marginLeft: 3,
    color: theme.colors.primary 
  },
  status: {
    fontSize: 18,
    color: theme.colors.secondary,
    fontFamily: "lato-bold",
    marginVertical: 5,
    marginLeft: 3,
  },
  itemContainer: {
    alignItems: "center",
    marginVertical: 15,
    borderRadius: 20,
    marginHorizontal: 15,
    backgroundColor: "white",
    padding: 10,
    borderWidth: 2,
    borderColor: theme.colors.primary,
  },
});

export default memo(PrenotationList);
