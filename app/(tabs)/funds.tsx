import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, FlatList, ActivityIndicator, Image } from "react-native";
import { useGetFundsAll } from "@/apis/client/funds";
import Octicons from "@expo/vector-icons/Octicons";
import Entypo from "@expo/vector-icons/Entypo";
import TabBarHeader from "@/components/TabBarHeader";
import BoxComponent from "@/components/BoxComponent";
type Fund = Record<string, any>; 


// FundScreen component
export default function FundScreen() {
  const { data:funds, isSuccess, isLoading, isError } = useGetFundsAll();
  const [search, setSearch] = useState('');

  // console.log(funds)

  
  const filteredFunds = funds?.filter((fund:Fund) => 
    fund?.name?.toLowerCase().includes(search.toLowerCase())
  );

  if (isLoading) {
    return (
      <View style={{ marginTop: 200, alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={{ marginTop: 30, fontSize: 18, color: '#000' }}>Loading...</Text>
      </View>
    );
  }

  if (isError) {
    return <View style={{ marginTop: 200, alignItems: 'center' }}>

      <Text>Error loading funds.</Text>;
    </View>
  }

  return (
    <View>
      <TabBarHeader />
      <View style={{ alignItems: "center", paddingVertical: 20 }}>
        <View style={styles.searchContainer}>
          <View style={styles.input}>
            <Octicons name="search" size={24} color="#667085" />
            <TextInput
              placeholder="Search Funds"
              placeholderTextColor="#7F909F"
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType="default"
              style={styles.textInput}
              value={search}
              onChangeText={(text) => setSearch(text)} 
            />
          </View>
          <View style={styles.filterContainer}>
           
            <Image 
                  source={require('../../assets/images/setting.png')} 
                  style={{
                    width: 24,
                    height: 15
                  }}
                />
            <Entypo name="chevron-down" size={16} color="black" />
          </View>
        </View>
        <View style={{ width: "90%" }}>
          <Text style={styles.totalFundsText}>{`Total Funds ${filteredFunds.length}`}</Text>
          {isSuccess && (
            <FlatList
              data={filteredFunds}
              renderItem={({ item }) => (
                <BoxComponent title={item.name} />
              )}
              keyExtractor={(item) => item.id.toString()}
            />
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    width: "90%",
    justifyContent: "space-between",
    gap: 10,
  },
  input: {
    flexDirection: "row",
    width: "78%",
    backgroundColor: "#F9FAFB",
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ddd",
    paddingVertical: 10,
    alignItems: "center",
  },
  textInput: {
    flex: 1,
    marginLeft: 10,
  },
  filterContainer: {
    borderWidth: 1,
    borderColor: "#ddd",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "18%",
    padding: 10,
    borderRadius: 10,
  },
  totalFundsText: {
    alignSelf: "flex-start",
    marginTop: 20,
    marginBottom: 10,
    color:"#667085",
    fontWeight: "bold",
    fontSize: 16,
    
  },
});
