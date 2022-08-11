import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, Text, View } from "react-native";
import { SignIn } from "./src/screens/SignIn";
import { Catalog } from "./src/screens/Catalog";
import { ProductInner } from "./src/screens/ProductInner";
import { ProductEdit } from "./src/screens/ProductEdit";

const Stack = createStackNavigator();

const AuthContext = React.createContext();

export default function App() {
  const [token, setToken] = useState(null);
  const [context, setContext] = useState(null);

  function HomeScreen({ navigation }) {
    // return <SignIn token={token} setToken={setToken} user={user} setUser={setUser} />;
    return <SignIn token={token} setToken={setToken} />;
  }

  function _Catalog({ navigation }) {
    return <Catalog token={token} setToken={setToken} />;
  }

  function Product({ route, navigation }) {
    const { title, id, image, category, price, description } = route.params;
    return <ProductInner title={title} id={id} image={image} category={category} price={price} description={description} />;
  }

  function _ProductEdit({ route, navigation }) {
    const { title, id, image, category, price, description } = route.params;
    return <ProductEdit title={title} id={id} image={image} category={category} price={price} description={description} />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Вход в систему'
        screenOptions={{
          headerTitleAlign: "center",
          headerBackTitle: "",
          cardStyle: { backgroundColor: "#fff" },
          headerTintColor: "#000",
          headerTitleStyle: { fontSize: 16 },
        }}>
        {token ? (
          <>
            <Stack.Screen name='Каталог' component={_Catalog} />
            <Stack.Screen
              name='Продукт'
              component={Product}
              options={({ route }) => ({
                title: route.params.title,
                id: route.params.id,
                image: route.params.image,
                category: route.params.category,
                price: route.params.price,
                description: route.params.description,
              })}
            />
            <Stack.Screen
              name='Изменение товара'
              component={_ProductEdit}
              options={({ route }) => ({
                title: route.params.title ? `Изменение товара: ${route.params.title}` : "Создание товара",
                id: route.params.id,
                image: route.params.image,
                category: route.params.category,
                price: route.params.price,
                description: route.params.description,
              })}
            />
          </>
        ) : (
          <>
            <Stack.Screen name='Вход в систему' component={HomeScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
