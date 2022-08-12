import React from "react";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity, StyleSheet, Text, View, Platform } from "react-native";

export const ButtonCustom = ({ onClick, ...props }) => {
  const navigation = useNavigation();
  return (
    <View style={{ alignItems: "center" }}>
      <TouchableOpacity
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        onPress={onClick}
        style={[styles.button, { ...props.style }]}>
        <Text style={styles.buttonText}>{props.text}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    width: "40%",
    backgroundColor: "#aaa",
  },
  buttonText: {
    lineHeight: 22,
    fontSize: 17,
    fontWeight: "bold",
    padding: 14,
  },
});
