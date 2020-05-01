import React, { memo } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity, ScrollView } from "react-native";
import StarRating from "react-native-star-rating";
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { useSelector } from 'react-redux';
import { Ionicons,MaterialIcons } from '@expo/vector-icons';

import EditProfileButton from '../../components/EditeProfileButton';
import { theme } from '../../utils/theme';

const ProfileScreen = props => {

    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
    const loggedUser = useSelector(state => state.auth.user);

    if (!isLoggedIn) {
        return (
            <Text>Korisnik nije prijavljen!</Text>
        );
    }

    return (
    <View style={styles.container}>   
        <ScrollView>

            <EditProfileButton></EditProfileButton>

            <View style={styles.background}>

                <View style={{ alignSelf: "center" }}>

                    <View style={styles.profileImage}>
                        <Image source={{ uri: loggedUser.imageUri }} style={styles.image} resizeMode="cover"></Image>
                    </View>

                    <View style={styles.add}>
                        <TouchableOpacity>
                        <Ionicons name="ios-add" size={40} color="#ffffff"></Ionicons>
                        </TouchableOpacity>
                    </View>

                </View>

                <Text style={styles.namestyle}>{loggedUser.firstName} {loggedUser.lastName}</Text>
                <StarRating
                    disabled={true}
                    maxStars={5}
                    rating={loggedUser.rating}
                    starSize={20}
                    emptyStarColor={theme.colors.quaternary}
                    fullStarColor={theme.colors.gold}
                    />

                <View style={styles.infoContainer}>

                    <View style={styles.infoBox}>
                        <Text style={styles.label}>{'Email:'.toUpperCase()} </Text>
                        <Text style={styles.infoText}>{loggedUser.email}</Text>
                    </View>

                    <View style={styles.infoBox}>
                        <Text style={styles.label}>{'Datum registracije:'.toUpperCase()} </Text>
                        <Text style={styles.infoText}>{loggedUser.displayRegistrationDate}</Text>
                    </View>

                      <View style={{ borderBottomColor: theme.colors.quaternary, borderBottomWidth: 2, marginTop: 20 }}>
                    </View>

                    <View style={styles.infoBox2}>
                        <Text style={styles.label1}>{'Dokument osobne iskaznice:'.toUpperCase()} </Text>
                        <View style={styles.containerphoto}>
                            <TouchableOpacity>
                                <MaterialIcons name="photo-camera" size={36} color={theme.colors.white} style={styles.photoicon}></MaterialIcons>
                                <Text style={styles.label2}>Dodaj</Text>
                             </TouchableOpacity>
                         </View>
                    </View>

                    <View style={styles.infoBox2}>
                        <Text style={styles.label1}>{'Dokument vozačke dozvole:'.toUpperCase()} </Text>
                        <View style={styles.containerphoto}>
                            <TouchableOpacity>
                                <MaterialIcons name="photo-camera" size={36} color={theme.colors.white} style={styles.photoicon}></MaterialIcons>
                                <Text style={styles.label2}>Dodaj</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    </View>
   
    );
};
const styles = StyleSheet.create({
    container:{
        flex:1,
        marginTop:getStatusBarHeight()
    },

    image: {
        flex: 1,
        height: undefined,
        width: undefined
    },
    profileImage: {
        width: 150,
        height: 150,
        borderRadius: 1000,
        overflow: "hidden"
    },
    add: {
        backgroundColor: theme.colors.primary,
        position: "absolute",
        bottom: 0,
        right: 0,
        width: 42,
        height: 42,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center"
    },
    infoContainer: {
        alignSelf: "center",
        marginTop: 10,
        fontSize: 46,
        color: "#ffffff"
    },
    infoBox: {
        flexDirection: "column",
        alignItems: "flex-start",
        marginTop: 25,
        fontSize: 46,
    },
    infoBox2: {
        flexDirection: "column",
        alignItems: "center",
        marginTop: 25,
        fontSize: 46,
    },
    infoText: {
        fontSize: 17,
        fontWeight: "100",
        color: "gray",
    },
    label: {
        fontSize: 14,
        paddingBottom:5,
        fontWeight:"bold",
        color: theme.colors.secondary,
        marginBottom: 3,
        letterSpacing: 1
    },
    label1: {
        fontSize: 12,
        paddingBottom:10,
        fontWeight:"900",
        color: theme.colors.secondary,
        marginBottom: 3,
        letterSpacing: 1
    },
    label2: {
        fontSize:16,
        alignSelf:"center",
        color:"#ffffff"
    },
    background: {
        flex: 1,
        width: '100%',
        paddingTop: 35,
        paddingBottom:45,
        alignItems: 'center',
        justifyContent: 'center',

    },
    containerphoto:{
        width:75,
        height:75,
        padding:0,
        margin:0,
        backgroundColor:theme.colors.primary,
        borderRadius:10,
        shadowColor: "#000",
        //iPhone 
        shadowOffset: {
        width: 0,
        height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        //Android
        elevation: 5,
    },
    namestyle:{
        fontSize: 28,
        color:theme.colors.secondary,
        paddingVertical:10
    },
    photoicon:{
        alignSelf:"center",
        paddingTop:8
    }
});

export default ProfileScreen;