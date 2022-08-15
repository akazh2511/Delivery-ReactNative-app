import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectBasketItems, selectBasketTotal } from '../features/basketSlice'
import { useNavigation } from '@react-navigation/native'
import Currency from 'react-currency-formatter'
const BasketIcon = () => {
    const items=useSelector(selectBasketItems);
    const navigation=useNavigation();
    const basketTotal=useSelector(selectBasketTotal)
    if(items.length===0) return null;
  return (
    <View className="absolute bottom-11 w-full z-50">
      <TouchableOpacity onPress={()=>navigation.navigate('Basket')} className="mx-5 bg-[#00CCBB] p-4 rounded-lg flex-row items-center space-x-1 opacity-0.5">
        <Text className="text-lg text-white font-extrabold py-1 px-2 bg-[#01A296]">
            {items.length}
        </Text>
        <Text className="text-lg text-white font-extrabold flex-1 text-center">View Basket</Text>
        <Text className="text-lg text-white font-extrabold">
        <Currency quantity={basketTotal} currency="GBP" />
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default BasketIcon