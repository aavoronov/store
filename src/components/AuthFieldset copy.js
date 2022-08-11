import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View, Image, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

export const AuthFieldset = (props) => {
  const [secure, setSecure] = useState(true);
  const navigation = useNavigation();

  return (
    <View>
      <TextInput
        maxLength={30}
        style={styles.field}
        placeholder='Логин'
        placeholderTextColor='#6F707A'
        autoCorrect={false}
        autoCapitalize='none'
        returnKeyType='go'
        onChangeText={props.setLogin}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#F1F4F7",
          borderRadius: 10,
          paddingRight: 20,
        }}>
        <TextInput
          style={[styles.field, styles.lastField]}
          placeholder='Пароль'
          placeholderTextColor='#6F707A'
          secureTextEntry={secure}
          autoCorrect={false}
          autoCapitalize='none'
          returnKeyType={props.isSignUp ? "go" : "done"}
          onChangeText={props.setPassword}
        />

        <TouchableOpacity
          title=''
          onPress={() => {
            setSecure(!secure);
          }}>
          {secure ? (
            <Image
              style={styles.textinputIcon}
              source={require("../../assets/img/crossed-eye-icon.png")}
              fadeDuration={0}
              style={{ width: 30, height: 30 }}
            />
          ) : (
            <Image
              style={styles.textinputIcon}
              source={require("../../assets/img/open-eye-icon.png")}
              fadeDuration={0}
              style={{ width: 30, height: 20 }}
            />
          )}
        </TouchableOpacity>
      </View>
      {props.isSignUp ? (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "#F1F4F7",
            borderRadius: 10,
            paddingRight: 20,
            marginTop: 20,
          }}>
          <TextInput
            style={[styles.field, styles.lastField]}
            placeholder='Повторите пароль'
            placeholderTextColor='#6F707A'
            secureTextEntry={secure}
            autoCorrect={false}
            autoCapitalize='none'
            onChangeText={props.setPasswordRepeat}
          />
        </View>
      ) : null}
      {props.isSignUp ? (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Восстановление пароля1");
            //Alert.alert("Забыл пароль? Соболезную");
          }}>
          {!props.isSignUp ? <Text style={styles.forgotPassword}>Забыли пароль?</Text> : null}
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  field: {
    height: 50,
    backgroundColor: "#F1F4F7",
    borderColor: "#F1F4F7",
    borderRadius: 10,
    paddingLeft: 20,
    color: "#000",
    fontSize: 17,
    marginBottom: 20,
  },
  lastField: {
    marginBottom: 0,
    width: "90%",
  },
  forgotPassword: {
    color: "#681785",
    paddingLeft: 20,
    paddingTop: 20,
    fontSize: 15,
    lineHeight: 13,
  },
  textinputIcon: {
    right: 10,
    backgroundColor: "#f00",
    marginRight: 100,
  },
});
