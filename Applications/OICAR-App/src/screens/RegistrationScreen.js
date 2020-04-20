import React, { memo, useReducer, useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import Background from '../components/Background';
import Header from '../components/Header';
import Button from '../components/Button';
import Input from '../components/Input';
import BackButton from '../components/BackButton';
import Loader from '../components/Loader';
import * as authActions from '../store/actions/auth';
import { theme } from '../utils/theme';

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value
    };

    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid
    };

    let passwordMatchingError = action.input === 'repassword' ? action.error : '';
    let updatedPasswordsAreMatching = false;
    if (updatedValidities["password"] && updatedValidities["repassword"]) {
      updatedPasswordsAreMatching = updatedValues["password"] === updatedValues["repassword"];

      if (!updatedPasswordsAreMatching) {
        passwordMatchingError = 'Passwords are not matching';
      }
    }

    const updatedErrors = {
      ...state.inputErrors,
      [action.input]: action.input === 'repassword' ? passwordMatchingError : action.error
    };

    let updatedFormIsValid = updatedPasswordsAreMatching;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }

    return {
      inputValues: updatedValues,
      inputValidities: updatedValidities,
      inputErrors: updatedErrors,
      passwordsAreMatching: updatedPasswordsAreMatching,
      formIsValid: updatedFormIsValid
    };
  }

  return state;
};

const RegisterScreen = props => {

  const [showErrors, setShowErrors] = useState(false);
  const [loadVisible,setLoadVisible] = useState(false);
  const [updateInputState, setUpdateInputState] = useState(false);

  const dispatch = useDispatch();
  const registrationSuccessful = useSelector(state => state.auth.registrationSuccessful);

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      username: '',
      fullName: '',
      email: '',
      password: '',
      repassword: ''
    },

    inputValidities: {
      username: false,
      fullName: false,
      email: false,
      password: false,
      repassword: false
    },

    inputErrors: {
      username: '',
      fullName: '',
      email: '',
      password: '',
      repassword: ''
    },

    passwordsAreMatching: false,
    formIsValid: false
  });

  const _authHandler = async () => {
    try {

      await dispatch(authActions.registration(
        formState.inputValues.username,
        formState.inputValues.fullName,
        formState.inputValues.email,
        formState.inputValues.password
      ));
    
      setShowErrors(false);
      setLoadVisible(false);
      props.navigation.navigate('Auth');
    } catch (error) {
      setLoadVisible(false);
      console.log(error);
    }
  };

  const _onInputChange = useCallback((inputId, inputValue, inputValidity, inputError) => {

    dispatchFormState({
      type: FORM_INPUT_UPDATE,
      input: inputId,
      value: inputValue,
      isValid: inputValidity,
      error: inputError
    });
  }, [dispatchFormState]);


  const _onSignUpPressed = () => {

    setUpdateInputState(true);
    setLoadVisible(true);

  };

  useEffect(() => {
    setUpdateInputState(false);

    if(formState.formIsValid) {
      console.log('form is valid');
      _authHandler();
    }

  }, [formState]);

  return (
    
    <Background>
      <BackButton goBack={() => props.navigation.goBack()} />
      <Header style={styles.header}>Create Account</Header>

      <Input style={styles.input}
        id="username"
        label="Username"
        returnKeyType="next"
        autoCapitalize="none"
        onInputChange={_onInputChange}
        displayError={!!showErrors}
        updateState={!!updateInputState}
        errorText={formState.inputErrors.username}
        required
        minLength={4}
        maxLength={32}
        username
        registration
      />

      <Input style={styles.input}
        id="fullName"
        label="Name"
        returnKeyType="next"
        onInputChange={_onInputChange}
        displayError={!!showErrors}
        updateState={!!updateInputState}
        errorText={formState.inputErrors.fullName}
        required
        registration
      />

      <Input style={styles.input}
        id="email"
        label="Email"
        returnKeyType="next"
        onInputChange={_onInputChange}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
        displayError={!!showErrors}
        updateState={!!updateInputState}
        errorText={formState.inputErrors.email}
        required
        registration
        email
      />

      <Input style={styles.input}
        id="password"
        label="Password"
        returnKeyType="done"
        onInputChange={_onInputChange}
        displayError={!!showErrors}
        updateState={!!updateInputState}
        errorText={formState.inputErrors.password}
        secureTextEntry
        minLength={8}
        maxLength={64}
        required
        password
        registration
      />

      <Input style={styles.input}
        id="repassword"
        label="Confirm Password"
        returnKeyType="done"
        onInputChange={_onInputChange}
        displayError={!!showErrors}
        updateState={!!updateInputState}
        errorText={formState.inputErrors.repassword}
        secureTextEntry
        required
        registration
      />

      <Button mode="contained" onPress={_onSignUpPressed} style={styles.button}>
        Sign Up
      </Button>

      <View style={styles.row}>
        <Text style={styles.label}>Already have an account? </Text>
        <TouchableOpacity onPress={() => props.navigation.navigate('Login')}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>

      <Loader
          modalVisible={loadVisible}
          animationType="fade"
      />

    </Background>
  );
};

const styles = StyleSheet.create({

  header:{
    paddingBottom:11
  },

  label: {
    color: theme.colors.secondary,
  },

  button: {
    marginTop: 24,
  },

  row: {
    flexDirection: 'row'
  },

  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  }
});

export default memo(RegisterScreen);