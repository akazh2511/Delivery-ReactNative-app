import { View, Text, SafeAreaView, StyleSheet, StatusBar, Image, TextInput, ScrollView } from 'react-native'
import React, { useLayoutEffect, useState,useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import {ChevronDownIcon,UserIcon,SearchIcon,AdjustmentsIcon } from "react-native-heroicons/outline";
import Categories from '../components/Categories';
import FeaturedRows from '../components/FeaturedRows';
import SanityClient from '../sanity';
const HomeScreen = () => {
    
    const navigation = useNavigation();
    const [featuredcategories, setfeaturedcategories] = useState([]);
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);

    useEffect(() => {
    
    SanityClient.fetch(`
    *[_type == "featured"]{
        ...,
        restaurants[]->{
          ...,
          dishes[]->
        }
      } 
    `).then((data)=>{
        setfeaturedcategories(data);
    });
     
    }, []);
    
  return (
    <SafeAreaView style={styles.container} className="bg-white">
      
     {/*HEADER*/}
     <View className="flex-row pb-2 items-center mx-2 space-x-2 ">
        <Image
        source={{uri:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTN5Ce7OnPGdXmJU3S21GL6LWjIB6cEQcW1Fg&usqp=CAU"}}
        className="h-7 w-7 bg-gray-300 p-4 rounded-full ml-2"
        />
        
        <View className="flex-1 ">
            <Text className="font-bold text-gray-400 text-xs">
                Deliver Now!
            </Text>
            <Text className="font-bold text-xl">
                Current Location
                <ChevronDownIcon size={20} color="#00CCBB"/>
            </Text>
            
            </View> 
            
            <UserIcon  size={35} color="#00CCBB"/>
        </View>
        {/*SEARCH*/}
        <View className="flex-row items-center space-x-2 pb-2 mx-4" >
            <View className="flex-row flex-1 items-center space-x-2 bg-gray-200 p-3">
                <SearchIcon color="gray" size={20}/>
                <TextInput placeholder='Resturants and Cuisines' keyboardType='default'/>
            </View>
            <AdjustmentsIcon size={20} color="#00CCBB"/>
        </View>
        {/*BODY */}
        <ScrollView>
            {/*categories */}
            <Categories/>
            {/*featured rows */}

            {featuredcategories?.map((category)=>(

           
            <FeaturedRows key={category._id} id={category._id} title={category.name} description={category.short_description} /> ))}
            
        </ScrollView>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
    container: {
      //  backgroundColor:"white",
        flex:1,
        padding:5,
        marginTop:StatusBar.currentHeight,
    }});

export default HomeScreen