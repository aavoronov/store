import React from "react";
import { StyleSheet, Text, View, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";

export const AgreementButton = (props) => {
  return (
    <View style={styles.agreement}>
      <TouchableOpacity onPress={props.onClick}>
        <Text style={styles.agreementText}>Пользовательское соглашение</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  agreement: {
    marginTop: "auto",
    justifyContent: "flex-end",
    alignItems: "center",
    borderTopColor: "#F1F4F7",
    borderTopWidth: 1,
  },
  agreementText: {
    fontSize: 14,
    paddingVertical: 15,
    color: "#6F707A",
  },
});
