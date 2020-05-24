import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';

import BackButton from '../../components/BackButton';
import ExitButton from '../../components/ExitButton';
import NextScreenButton from '../../components/NextScreenButton';
import Input from '../../components/InputDescription';
import * as vehicleDataActions from '../../store/actions/vehicleData';
import * as newListingActions from '../../store/actions/newListing';
import { theme } from '../../utils/theme';

const AddDescriptionScreen = props => {

  const [descriptionText, setDescriptionText] = useState('');

  const dispatch = useDispatch();

  const _onNextPressed = async () => {
    dispatch(newListingActions.setDescription(descriptionText));
    await dispatch(vehicleDataActions.loadPricePeriods());
    props.navigation.navigate('AddPrice');
  };

  return (
    <View style={styles.container}>

      <ScrollView style={styles.scrollview}>
        <BackButton style={styles.backandexit} goBack={() => props.navigation.goBack()} />
        <ExitButton style={styles.backandexit} goBack={() => props.navigation.navigate('Add')} />
        <View style={styles.contentstyle}>     
          <Text style={styles.headerstyle}>Detaljan opis vozila</Text>
          <Text style={styles.paragraphstyle}>Detaljno opišite svoje vozilo</Text>
          <Input 
            label = "Opis vozila"
            multiline={true}
            numberOfLines={10}
            onChangeText={(text) => setDescriptionText(text)}
            style={styles.inputstyle}
          />
        </View>
      </ScrollView>

      <NextScreenButton navigate={_onNextPressed} />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:getStatusBarHeight(),
    backgroundColor: theme.colors.white
  },
  scrollview:{
    flex:1,
    marginBottom:80
  },
  contentstyle:{
    marginTop:100,
    marginBottom:80,
    width:"80%",
    alignSelf:"center",
  },
  headerstyle: {
    alignSelf:"flex-start",
    fontSize: 32,
    paddingBottom:10,
    textAlign:"center",
    fontWeight: '700',
  },
  paragraphstyle: {
    fontSize: 16,
    paddingBottom:40,
    alignSelf:"flex-start",
    fontWeight: "300"
  },
  backandexit:{
    marginTop:-getStatusBarHeight()
  },
});

export default AddDescriptionScreen;