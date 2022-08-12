import { useNavigation } from "@react-navigation/native";
import React, { useContext, useState } from "react";
import { Keyboard, TouchableWithoutFeedback, View } from "react-native";
import { stylesContainer } from "../../styles/container";
import { AuthFieldset } from "../components/AuthFieldset";
import { ButtonCustom } from "../components/ButtonCustom";
import { AuthContext } from "../Context";
import { THEME } from "../theme";

export const SignIn = () => {
  const navigation = useNavigation();
  const [token, setToken] = useContext(AuthContext);

  const onSubmitHandler = () => {
    const payload = {
      username: login,
      password: password,
    };

    console.log(payload);
    fetch(`${THEME.API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((json) => {
        setToken(json.token);
        console.log(token);
      });
  };

  const [login, setLogin] = useState("johnd");
  const [password, setPassword] = useState("m38rmF$");

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={[{ flex: 1 }]}>
      <View style={[stylesContainer.container, { flex: 1, paddingBottom: 0 }]}>
        <AuthFieldset setLogin={setLogin} setPassword={setPassword} />
        <View style={{ marginTop: "auto", justifyContent: "flex-end" }}>
          <ButtonCustom onClick={onSubmitHandler} text='Вход' style={{ marginBottom: 300 }} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
