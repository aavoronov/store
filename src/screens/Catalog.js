import React, { useEffect, useState, useContext } from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ProductCard } from "../components/ProductCard";
import { FlatList } from "react-native-gesture-handler";
import { THEME } from "../theme";
import { AuthContext } from "../Context";
import { AppLoader } from "../components/AppLoader";
import { ButtonCustom } from "../components/ButtonCustom";

export const Catalog = () => {
  const [value, setValue] = useState(0);

  const navigation = useNavigation();

  const [token, setToken] = useContext(AuthContext);

  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`${THEME.API_URL}/products`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
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
          }}
        />
      </View>
    </View>
  ) : (
    <AppLoader />
  );
};
