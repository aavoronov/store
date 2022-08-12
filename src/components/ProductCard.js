import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, Image, TouchableOpacity, View, StyleSheet } from "react-native";
import { THEME } from "../theme";

export const ProductCard = (props) => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        ...styles.container,
        justifyContent: "flex-start",
        marginBottom: 10,
        marginHorizontal: 6,
        ...props.style,
      }}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Продукт", {
            title: props.title,
            id: props.id,
            image: props.image,
            category: props.category,
            price: props.price,
            description: props.description,
          })
        }>
        <View style={{ justifyContent: "space-between" }}>
          <View style={{ overflow: "hidden" }}>
            <Image source={{ uri: props.image }} style={{ height: 114, width: null, resizeMode: "contain" }} />
          </View>
          <Text style={{ fontSize: 14, lineHeight: 17 }}>{props.title}</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.propertyContainer}>
        <View>
          <Text style={{ ...styles.textGrey, fontSize: 10 }}>{props.category}</Text>
          <Text>{props.price}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  propertyContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
});
