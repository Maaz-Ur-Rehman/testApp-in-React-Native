import React, { useEffect } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAgentLogin } from '@/apis/client/user';
import { getToken } from '@/utilities/auth';

const schema = Yup.object().shape({
  email: Yup.string()
    .required('Email is required')
    .email('Invalid email format'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters long'),
});

type FormData = {
  email: string;
  password: string;
};

export default function LoginScreen() {
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { agentLogin, isPending } = useAgentLogin();

  const onSubmit = (data: FormData) => {
    agentLogin(data);
  };



  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <View style={styles.inputView}>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              placeholderTextColor="#7F909F"
              value={value}
             
              onChangeText={onChange}
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          )}
        />
        {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              secureTextEntry
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
            />
          )}
        />
        {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}
      </View>
      <View style={{alignSelf:"flex-start"}}>
        <Text>Forgot pin? <Text  style={{color:"#7081FF"}}>reset</Text></Text>
      </View>

      <View style={styles.buttonView}>
        <Pressable style={styles.button} onPress={handleSubmit(onSubmit)}>
          <Text style={styles.buttonText}>
            {isPending ? <ActivityIndicator size="small" color="#fff" /> : 'Login'}
          </Text>
        </Pressable>
      </View>
      <Text style={{ marginTop: 10, color: 'black'}}>Don't have an account? <Text style={{color:"#7081FF"}}>sign up</Text></Text>
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    paddingTop: 100,
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 15,
  },

  formContainer: {
    paddingHorizontal: 15,
    width: '100%',
    paddingBottom: 20,
  },
  title:{
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 2,
    color: '#333',
    alignSelf: 'flex-start',
  },
  inputView: {
    gap: 15,
    width: '100%',
    marginTop: 10,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#F9FAFB',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    // marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
  },
  buttonView: {
    marginTop: 10,
    width: '100%',
  },
  button: {
    backgroundColor: '#7081FF',
    height: 45,
    borderColor: '#7081FF',
    borderWidth: 1,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
