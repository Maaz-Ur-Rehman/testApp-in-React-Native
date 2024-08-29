import React, { FC } from 'react'
import { Button, Image, Text, View, StyleSheet, TouchableOpacity } from 'react-native'

interface BoxProps{
    title:string;
}

const BoxComponent:FC<BoxProps> = ({title}) => {
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Image 
          source={require('../assets/images/image1.png')} 
          style={styles.image}
        />
        <Text style={styles.title}>{title}</Text>
        <View >
          <Text style={styles.returnLabel}>Annual Return</Text>
          <View style={styles.returnValueContainer}>
            <Text style={styles.returnValue}>+20.20%</Text>
          </View>
        </View>
      </View>
      {/* <TouchableOpacity style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>View Details</Text>
        </TouchableOpacity>
      </TouchableOpacity> */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 15,
    marginVertical: 10,
    backgroundColor: '#fff',
  },
  contentContainer: {
    marginBottom: 10,
    flexDirection:"row",
    justifyContent: 'space-between',
    alignItems: 'center',
    width:"100%"
  },
  image: {
    width: '10%',
    height: 28,
    resizeMode: 'cover',
    alignSelf: 'flex-start',
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft:5, 
    flex:1,
    alignSelf:"flex-start"
  },

  returnLabel: {
    fontSize: 9,
    color: '#555',
  },
  returnValueContainer: {
    backgroundColor: '#e6f7e9',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
  returnValue: {
    fontSize: 10,
    color: '#28a745',
    fontWeight: 'bold',
  },
  buttonContainer: {
    // alignItems: 'flex-end',
    borderWidth: 1,
    borderColor:"#D0D5DD",
    borderRadius:5,
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
  },
  button: {
    paddingVertical: 7,
  },
  buttonText: {
    color: '#667085',
    fontSize: 16,
    // fontWeight: 'bold',
  },
});

export default BoxComponent;
