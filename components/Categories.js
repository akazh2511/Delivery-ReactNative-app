import { View, Text, ScrollView } from 'react-native'
import React ,{useEffect, useState}from 'react'
import CategoriesCard from './CategoriesCard'
import sanityClient, { urlFor } from '../sanity';

const Categories = () => {
  const [category, setcategory] = useState([]);
  useEffect(() => {
    
  sanityClient.fetch(`*[_type == "category"]`).then((data)=>{
    setcategory(data);
  });
   
  }, []);
  
  return (
    <View>
        <ScrollView horizontal contentContainerStyle={{
            paddingHorizontal:15,
            paddingTop:10,
        }}
        showsHorizontalScrollIndicator={false}>

            {/*categories card  */}

            {category?.map((catgry)=>(
                <CategoriesCard key={catgry._id} imgUrl={urlFor(catgry.image).width(200).url()} title={catgry.name}/>
            ))}

            
            
        </ScrollView>
      
    </View>
  )
}

export default Categories