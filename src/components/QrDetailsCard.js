import { Image, Pressable, StyleSheet, Text, View, Button } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
const QrDetailsCard = ({ item, deleteItem }) => {
  return (
    <>
      {item.id === 1 ? null : (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            elevation: 10,
            backgroundColor: "white",
            marginTop: 10,
            padding: 5,
          }}
        >
          <Image
            source={require("../../assets/qr-code.png")}
            style={{ width: 50, height: 50 }}
          />
          <Text
            style={{
              paddingTop: 12,
              overflow: "hidden",
              width: 300,
              height: 50,
              textAlign: "center",
            }}
          >
            {item.scanData}
          </Text>
          <Pressable onPress={() => deleteItem(item.id)}>
            <AntDesign name="delete" color="red" size={35} />
          </Pressable>
        </View>
      )}
    </>
  );
};
export default QrDetailsCard;

const styles = StyleSheet.create({});
