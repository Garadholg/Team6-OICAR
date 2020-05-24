import React,{useState} from 'react';
import {
  View,
  Text,
  Picker,
  StyleSheet
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { useSelector, useDispatch } from 'react-redux';

import BackButton from '../../components/BackButton';
import ExitButton from '../../components/ExitButton';
import Input from '../../components/Input';
import NextScreenButton from '../../components/NextScreenButton';
import { theme } from '../../utils/theme';

const _renderPriceDropdownItem = (item) => {
  return (
    <Picker.Item 
      key={item.id}
      label={item.name} 
      value={item.id} 
    />
  );
}

const AddPriceScreen = props => {

  const pricePeriods = useSelector(state => state.vehicleData.pricePeriods);
  const newListing = useSelector(state => state.newListing);

  const [selectedPricePeriod, setSelectedPricePeriod] = useState(newListing.pricePeriodID === null ? 1 : newListing.pricePeriodID);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollview}>
        <BackButton style={styles.backandexit} goBack={() => props.navigation.goBack()} />
        <ExitButton style={styles.backandexit} goBack={() => props.navigation.navigate('Add')} />

        <View style={styles.contentstyle}>     
          <Text style={styles.headerstyle}>Cijena vozila</Text>
          <View style={styles.inputpickerbox}>
            <Input 
              keyboardType = 'numeric'
              style={styles.input}
            />

            <Text style={styles.currencylabel}>kn  /</Text>

            <Picker
              selectedValue={selectedPricePeriod}
              mode="dropdown"
              style={styles.picker}
              onValueChange={(itemValue, itemIndex) => setSelectedPricePeriod(itemValue)}>

              {pricePeriods.map(item => _renderPriceDropdownItem(item))}

            </Picker>
          </View>
        </View>

      </ScrollView>

      <NextScreenButton navigate={() => props.navigation.navigate('AddDate')} />

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
      flex:1
  },
  contentstyle:{
    width:"80%",
    marginTop:130,
    alignSelf:"center"
  },
  headerstyle: {
    fontSize: 32,
    paddingBottom:50,
    textAlign:"center",
    fontWeight: '700',
  },
  input:{
      alignSelf:"center",
      width:"40%",
      height:50
  },
  backandexit:{
    marginTop:-getStatusBarHeight()
  },
  currencylabel:{
    color:theme.colors.primary,
    fontSize:16,
    marginLeft:10,
    marginTop:3
  },
  inputpickerbox:{
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center"
  },
  picker:{ 
    height: 20, 
    width: 110, 
    alignSelf:"center", 
    color:theme.colors.primary
  }
  
});

export default AddPriceScreen;