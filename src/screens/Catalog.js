// import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
// import { ButtonCustom } from "../components/ButtonCustom";
// import { NavbarBottom } from "../components/NavbarBottom";
import { ProductCard } from "../components/ProductCard";
import { FlatList } from "react-native-gesture-handler";
// import { stylesContainer } from "../../styles/containerContentful";
import { THEME } from "../theme";
import { AppLoader } from "../components/AppLoader";
import { ButtonCustom } from "../components/ButtonCustom";

export const Catalog = ({ token, setToken }) => {
  const [value, setValue] = useState(0);
  function useForceUpdate() {
    return () => setValue((value) => value + 1);
  }

  const forceUpdate = useForceUpdate();
  const navigation = useNavigation();
  const signOut = () => {
    setIsSignedIn(false);
    console.log(isSignedIn);
    navigation.navigate("Вход в систему");
  };

  const [data, setData] = useState(null);

  useEffect(() => {
    // const payload = {
    //   login: user,
    // };
    fetch(`${THEME.API_URL}/products`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
      // body: JSON.stringify(payload),
    })
      .then(async (res) => {
        try {
          const jsonRes = await res.json();
          if (res.status === 200) {
            setData(jsonRes);
          }
        } catch (err) {
          console.log(err);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(data);
  }, [value]);

  return data ? (
    <View style={{ marginBottom: 100 }}>
      <FlatList
        contentContainerStyle={{ alignItems: "flex-start" }}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        numColumns={3}
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ProductCard
            style={{ flexBasis: "30%" }}
            id={item.id}
            image={item.image}
            title={item.title}
            category={item.category}
            price={item.price}
            description={item.description}
          />
        )}
      />
      <View style={{ flexDirection: "row", width: "100%", justifyContent: "space-between" }}>
        <ButtonCustom
          text='Создать новый'
          style={{ paddingVertical: 0, width: 200 }}
          onClick={() =>
            navigation.navigate("Изменение товара", {
              title: null,
              id: null,
              image: null,
              category: null,
              price: null,
              description: null,
            })
          }
        />
        <ButtonCustom
          text='Выход'
          style={{ paddingVertical: 0, width: 200 }}
          onClick={() => {
            setToken(null);
            // console.log(token);
          }}
        />
      </View>
      {/* <ButtonCustom
        text='Создать новый'
        style={{ paddingVertical: 0 }}
        onClick={() =>
          navigation.navigate("Изменение товара", {
            title: null,
            id: null,
            image: null,
            category: null,
            price: null,
            description: null,
          })
        }
      />
      <ButtonCustom text='Выход' style={{ paddingVertical: 0 }} /> */}
    </View>
  ) : (
    <AppLoader />
  );
};

const styles = StyleSheet.create({});
