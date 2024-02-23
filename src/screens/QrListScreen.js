import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { QrListContext } from "../Context/QrListContext";
import QrDetailsCard from "../components/QrDetailsCard";
import AsyncStorage from "@react-native-async-storage/async-storage";

const QrListScreen = () => {
  const { qrList, setQrList, deleteUser } = useContext(QrListContext);
  console.log(qrList);
  const deleteItem = (id) => {
    const newList = qrList.filter((item) => item.id !== id);
    deleteUser(newList);
  };
  return (
    <FlatList
      data={qrList}
      renderItem={({ item }) => (
        <QrDetailsCard item={item} deleteItem={deleteItem} />
      )}
      keyExtractor={(item) => item.id}
    />
  );
};

export default QrListScreen;

const styles = StyleSheet.create({});
