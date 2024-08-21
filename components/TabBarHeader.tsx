import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { useDispatch } from 'react-redux';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons'
import { AppDispatch } from '@/components/redux/store';
import { signOut } from '@/components/redux/authSlice';

const TabBarHeader = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();


  const handleSignOut = async () => {
    await dispatch(signOut());
    router.push('/login'); 
  };

  return (
    <View style={{ 
      flexDirection: "row", 
      justifyContent: "space-between", 
      paddingVertical: 20, 
      paddingHorizontal: 15, 

      marginTop: 35, 
      borderBottomColor: "#ddd", 
      borderBottomWidth: 1
    }}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TouchableOpacity onPress={() => router.push('/')}>
          <Ionicons name="chevron-back-outline" size={24} color="black" />
        </TouchableOpacity>
        <Text style={{ fontSize: 20, marginLeft: 10 }}>Mutual Funds</Text>
      </View>
      <TouchableOpacity onPress={handleSignOut}>
      <SimpleLineIcons name="logout" size={24} color="black" onPress={handleSignOut} />
        
      </TouchableOpacity>
    </View>
  );
}

export default TabBarHeader;
