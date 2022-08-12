import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

export const AuthFieldset = ({ setLogin, setPassword }) => {
  const navigation = useNavigation();

  return (
    <View>
      <TextInput
        maxLength={30}
        style={styles.field}
        placeholder='Логин'
        placeholderTextColor='#888'
        defaultValue='johnd'
        autoCorrect={false}
        autoCapitalize='none'
        returnKeyType='go'
        onChangeText={setLogin}
      />

      <TextInput
        style={[styles.field, styles.lastField]}
        placeholder='Пароль'
        placeholderTextColor='#888'
        defaultValue='m38rmF$'
        autoCorrect={false}
        autoCapitalize='none'
        returnKeyType='done'
        onChangeText={setPassword}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  field: {
    height: 50,
    backgroundColor: "#F1F4F7",
    borderColor: "#F1F4F7",
    paddingLeft: 20,
    color: "#000",
    fontSize: 17,
    marginBottom: 20,
  },
  lastField: {
    marginBottom: 0,
  },
});
