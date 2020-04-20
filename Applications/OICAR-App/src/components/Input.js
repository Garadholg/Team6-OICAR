import React, { useEffect, useReducer, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TextInput } from 'react-native-paper';

import { 
  isEmptyValidator,
  minLengthValidator,
  maxLengthValidator, 
  emailValidator,
  usernameValidator,
  passwordValidator
} from '../utils/validation';
import { theme } from '../utils/theme';

const INPUT_CHANGE = 'INPUT_CHANGE';

const inputReducer = (state, action) => {
    switch (action.type) {
      case INPUT_CHANGE:
        return {
          ...state,
          value: action.value,
          isValid: action.isValid,
          error: action.error
        };
    }

    return state;
};

const Input = props => {

  const [updateState, setUpdateState] = useState(false);

  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue ? props.initialValue : '',
    isValid: props.initialValue ? true : false,
    error: props.label + " must not be empty!"
  });

  const { onInputChange, id } = props;

  useEffect(() => {

    if (props.updateState) {
      setUpdateState(true);
    }
  }, [props.updateState]);

  useEffect(() => {

    if (updateState && props.registration) {
      onInputChange(id, inputState.value, inputState.isValid, inputState.error);
    }

    if(updateState && props.login) { 
      onInputChange(id, inputState.value, inputState.isValid);
    }

    setUpdateState(false);
  }, [updateState]);

  const _onChangeText = text => {
    
    let isValid = true;
    let errorMsg = '';

    if (props.registration) {
      if (props.email && !emailValidator(text)) {
        isValid = false;
        errorMsg = 'Ooops! We need a valid email address.'
      }
  
      if (props.username && !usernameValidator(text)) {
        isValid = false;
        errorMsg = 'Username is not in a valid format!';
      }
  
      if (props.password && !passwordValidator(text)) {
        isValid = false;
        errorMsg = 'Password must contain at least one lowercase and uppercase letter and a number!';
      }
  
      if (props.minLength && !minLengthValidator(text, props.minLength)) {
        isValid = false;
        errorMsg = `${props.label} must contain minimum ${props.minLength} characters!`;
      }
  
      if (props.maxLength && !maxLengthValidator(text, props.maxLength)) {
        isValid = false;
        errorMsg = `${props.label} must contain maximum ${props.maxLength} characters!`;
      }
  
      if (props.required && !isEmptyValidator(text)) {
        isValid = false;
        errorMsg = `${props.label}  must not be empty!`;
      }
    }

    dispatch({
      type: INPUT_CHANGE,
      value: text,
      isValid: isValid,
      error: errorMsg
    });

  };

  return (
    <View style={styles.container}>
      <TextInput
        {...props}
        style={styles.input}
        selectionColor={theme.colors.primary}
        underlineColor="transparent"
        mode="outlined"
        onChangeText={_onChangeText}
      />
      {props.errorText && props.displayError ? <Text style={styles.error}>{props.errorText}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '80%',
    marginVertical: 5
  },
  
  input: {
    backgroundColor: theme.colors.surface,
    height: 42
  },

  error: {
    fontSize: 13,
    color: theme.colors.error,
    paddingHorizontal: 4
  }
});

export default Input;