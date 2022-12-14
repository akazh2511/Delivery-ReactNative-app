import { View, Text, TouchableOpacity,Image, ScrollView } from 'react-native'
import React ,{useEffect,useState}from 'react'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux';
import { selectRestaurant } from '../features/restaurantSlice';
import { removefrombasket, selectBasketItems, selectBasketTotal } from '../features/basketSlice';
import { SafeAreaView } from 'react-native-safe-area-context';
import { XCircleIcon } from 'react-native-heroicons/outline';
import { urlFor } from '../sanity';
import Currency from 'react-currency-formatter'
const BasketScreen = () => {
  const navigation=useNavigation();
  const restaurant= useSelector(selectRestaurant);
  const items=useSelector(selectBasketItems);
  const dispatch=useDispatch();
  const basketTotal=useSelector(selectBasketTotal);
  const [groupedItemInBasket, setgroupedItemInBasket] = useState([]);

  useEffect(() => {
    const groupedItem=items.reduce((results, item)=>{(
      results[item.id]=results[item.id]||[]
    ).push(item);
    return results;
  },{});
  setgroupedItemInBasket(groupedItem);


  }, [items])


  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 bg-gray-100">
        <View className="p-5 border-b border-[#00CCBB] bg-white shadow-xs">
          <View>
            <Text className="text-lg font-bold text-center">Basket</Text>
            <Text className="text-center text-gray-400">{restaurant.title}</Text>
          </View>
          <TouchableOpacity onPress={navigation.goBack} className="absolute top-3 right-5 bg-gray-100 rounded-full"> 
          <XCircleIcon height={50} width={50} color="#00CCBB"/>
        </TouchableOpacity>
        </View>
        <View className="flex-row items-center space-x-4 px-4 py-3 bg-white my-5">
          <Image source={{
            uri:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTN5Ce7OnPGdXmJU3S21GL6LWjIB6cEQcW1Fg&usqp=CAU"
          }}
          className="h-7 w-7 bg-gray-300 p-4 rounded-full"/>
          <Text className="flex-1">
            Deliver in 50-75 min
          </Text>
          <TouchableOpacity>
            <Text className="text-[#00CCBB]">Change</Text>
          </TouchableOpacity>
        </View>
        <ScrollView className="divide-y divide-gray-200">
          {Object.entries(groupedItemInBasket).map(([key, items])=>(
            <View key={key} className="flex-row items-center space-x-3 bg-white py-2 px-5">
              <Text>{items.length}x</Text>
              <Image source={{uri:urlFor(items[0]?.image).url()}} className="h-12 w-12 rounded-full"/>
              <Text className="flex-1">
                {items[0]?.name}
              </Text>
              <Text className="text-gray-600">
            <Currency quantity={items[0]?.price} currency="GBP" />
        </Text>
        <TouchableOpacity>
          <Text className="text-xs text-[#00CCBB]" onPress={()=>dispatch(removefrombasket({id:key}))}>
            Remove
          </Text>
        </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      
      <View className="p-5 bg-white mt-5 space-y-4">
        <View className="flex-row justify-between">
          <Text className="text-gray-400">
            SubTotal
          </Text>
          <Text className="text-gray-400"><Currency quantity={basketTotal} currency="GBP" /></Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="text-gray-400">
           Delivery Charges
          </Text>
          <Text className="text-gray-400"><Currency quantity={5.99} currency="GBP" /></Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="font-bold">
            Order Total
          </Text>
          <Text className="font-extrabold"><Currency quantity={basketTotal+5.99} currency="GBP" /></Text>
        </View>
        <TouchableOpacity onPress={()=>navigation.navigate('PreparingOrderScreen')} className="rounded-lg bg-[#00CCBB] p-4">
          <Text className="text-center text-white text-lg font-bold">
            Place Order
          </Text>
        </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default BasketScreen