import { createSlice } from '@reduxjs/toolkit'

const initialState = { items: [], }

const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addtobasket:(state,action)=> {
      state.items=[...state.items,action.payload]
    },
    removefrombasket:(state,action)=> {
      const index= state.items.findIndex((item)=>item.id===action.payload.id)
      let newBasket=[...state.items];
      if(index>=0){
        newBasket.splice(index,1);
      }else{
        console.warn(`cant remove product (id:${action.payload.id} as it is not in bucket)`)
      }
      state.items=newBasket;
    },
    incrementByAmount(state, action) {
      state.value += action.payload
    },
  },
})

export const { addtobasket, removefrombasket, incrementByAmount } = basketSlice.actions
export const selectBasketItems= (state)=>state.basket.items;
export const selectBasketItemswithId= (state,id)=>state.basket.items.filter(item=>item.id===id);
export const selectBasketTotal=(state)=>state.basket.items.reduce((total,item)=>total+=item.price,0)
export default basketSlice.reducer