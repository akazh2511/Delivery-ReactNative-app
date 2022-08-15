import { View, Text, SafeAreaView } from 'react-native'
import React,{useEffect} from 'react'
import * as Animatable from "react-native-animatable"
import * as Progress from "react-native-progress"
import { useNavigation } from '@react-navigation/native'
const PreparingOrderScreen = () => {
    const navigation=useNavigation();

    useEffect(() => {
      setTimeout(()=>{
        navigation.navigate('Delivery');
      },4000)
    }, [])
    
  return (
    <SafeAreaView className="bg-white flex-1 justify-center items-center">
       <Animatable.Image
       source={require("../assets/animate.gif")}
       animation="slideInUp"
       iterationCount={1}
       className="h-96 w-96 "/>
       <Animatable.Text animation="slideInUp"
       iterationCount={1}
       className="text-base my-10 font-bold text-[#2CE0CD]">
            Waiting for Restaurant to accept your Order!
       </Animatable.Text>
       <Progress.Circle size={60} indeterminate={true} color="#2CE0CD"/>
    </SafeAreaView>
  )
}

export default PreparingOrderScreen