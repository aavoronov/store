import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { View, StyleSheet, TextInput, Alert } from "react-native";
import { ButtonCustom } from "../components/ButtonCustom";
import { THEME } from "../theme";

export const ProductEdit = (props) => {
  const navigation = useNavigation();

  const [title, setTitle] = useState(props.title);
  const [category, setCategory] = useState(props.category);
  const [description, setDescription] = useState(props.description);
  const [image, setImage] = useState(props.image);
  const [price, setPrice] = useState(props.price);

  const payload = {
    title,
    category,
    description,
    image,
    price,
  };

  const updateDatabaseEntry = () => {
    payload.price = parseFloat(payload.price);
    fetch(`${THEME.API_URL}/products/${props.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((json) => console.log(json));
  };

  const createDatabaseEntry = () => {
    payload.price = parseFloat(payload.price);
    fetch(`${THEME.API_URL}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.text())
      .then((json) => console.log(json));
  };

  const invokeAcceptPrompt = () =>
    Alert.alert("Сохранить изменения?", "", [
      {
        text: "Отмена",
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          console.log("Сохранено");
          updateDatabaseEntry();
          // console.log(payload);
        },
      },
    ]);

  const invokeCreatePrompt = () =>
    Alert.alert("Сохранить изменения?", "", [
      {
        text: "Отмена",
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          console.log("Создано");
          createDatabaseEntry();
        },
      },
    ]);

  const invokeCancelPrompt = () =>
    Alert.alert("Отменить изменения?", "", [
      {
        text: "Отмена",
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          console.log("Отменено");
          navigation.goBack();
        },
      },
    ]);

  return (
    <View
      style={{
        ...styles.container,
        justifyContent: "flex-start",
        marginBottom: 10,
        marginHorizontal: 6,
        paddingHorizontal: 20,
        ...props.style,
      }}>
      {props.id ? (
        <TextInput
          style={[styles.field, { color: "#aaa" }]}
          placeholder='id'
          defaultValue={`${props.id}`}
          editable={false}
          placeholderTextColor='#888'
          autoCorrect={false}
          autoCapitalize='none'
          returnKeyType='go'
        />
      ) : null}
      <TextInput
        style={styles.field}
        placeholder='Наименование товара'
        defaultValue={title}
        placeholderTextColor='#888'
        textAlign='left'
        autoCorrect={false}
        autoCapitalize='none'
        returnKeyType='go'
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.field}
        placeholder='Категория товара'
        defaultValue={category}
        placeholderTextColor='#888'
        textAlign='left'
        autoCorrect={false}
        autoCapitalize='none'
        returnKeyType='go'
        onChangeText={setCategory}
      />
      <View style={styles.descInput}>
        <TextInput
          style={[styles.field, { textAlignVertical: "top", height: 250 }]}
          placeholder='Описание товара'
          defaultValue={description}
          multiline={true}
          placeholderTextColor='#888'
          textAlign='left'
          autoCorrect={false}
          autoCapitalize='none'
          returnKeyType='go'
          onChangeText={setDescription}
        />
      </View>
      <TextInput
        style={styles.field}
        placeholder='Изображение товара'
        defaultValue={image}
        placeholderTextColor='#888'
        textAlign='left'
        autoCorrect={false}
        autoCapitalize='none'
        returnKeyType='go'
        onChangeText={setImage}
      />
      <TextInput
        style={styles.field}
        placeholder='Цена'
        defaultValue={price ? `${price}` : null}
        placeholderTextColor='#888'
        autoCorrect={false}
        autoCapitalize='none'
        returnKeyType='go'
        onChangeText={setPrice}
      />
      <View style={{ flexDirection: "row", width: "100%", justifyContent: "space-between" }}>
        <ButtonCustom text='Принять' style={{ width: 150 }} onClick={props.id ? invokeAcceptPrompt : invokeCreatePrompt} />
        <ButtonCustom text='Отмена' style={{ width: 150, backgroundColor: "#a77" }} onClick={invokeCancelPrompt} />
      </View>
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
  descInput: {
    paddingTop: 10,
    height: 250,
    backgroundColor: "#F1F4F7",
    marginBottom: 20,
  },
});
