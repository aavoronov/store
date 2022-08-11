import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Text, Image, TouchableOpacity, View, StyleSheet, Alert } from "react-native";
import { ButtonCustom } from "../components/ButtonCustom";
import { THEME } from "../theme";
// import { DisplayReg } from "../components/ui/DisplayReg";

export const ProductInner = (props) => {
  const navigation = useNavigation();

  const invokeRemovePrompt = () =>
    Alert.alert("Удалить товар?", "", [
      {
        text: "Отмена",
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          console.log("Удалено");
          deleteDatabaseEntry();
        },
      },
    ]);

  const deleteDatabaseEntry = () => {
    fetch(`${THEME.API_URL}/products/${props.id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((json) => console.log(json));
  };

  return (
    <View
      style={{
        ...styles.container,
        justifyContent: "flex-start",
        alignItems: "flex-start",
        marginBottom: 10,
        marginHorizontal: 6,
        paddingHorizontal: 20,
        ...props.style,
      }}>
      <Image source={{ uri: props.image }} style={{ height: 350, width: 350, resizeMode: "contain", marginBottom: 10 }} />
      <Text style={{ fontSize: 24, lineHeight: 27, marginBottom: 10 }}>{props.title}</Text>
      <Text style={{ ...styles.textGrey, fontSize: 14, marginBottom: 10 }}>{props.category}</Text>
      <Text style={{ marginBottom: 10 }}>{props.description}</Text>
      <Text style={{ fontSize: 18, marginBottom: 10 }}>{props.price}</Text>

      <View style={{ flexDirection: "row", width: "100%", justifyContent: "space-between" }}>
        <ButtonCustom
          text='Изменить'
          style={{ width: 150 }}
          onClick={() => {
            navigation.navigate("Изменение товара", {
              title: props.title,
              id: props.id,
              image: props.image,
              category: props.category,
              price: props.price,
              description: props.description,
            });
          }}
        />
        <ButtonCustom text='Удалить' style={{ width: 150, backgroundColor: "#a77" }} onClick={invokeRemovePrompt} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    //width: "32%",
  },
  textGreen: {
    color: THEME.MAIN_GREEN,
  },
  textGrey: {
    color: "#6F707A",
  },
  textPurple: {
    color: THEME.PURPLE,
  },
  propertyContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
});
