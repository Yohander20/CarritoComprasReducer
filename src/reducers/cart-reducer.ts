import {db} from "../data/db"
import {CartItem,Guitar } from "../types/types"


export type CartActions=
    {type:'add-to-cart',payload:{item:Guitar} } |
    {type:'remove-from-cart',payload:{id:Guitar['id']}} |
    {type:'decrease-quantity',payload:{id:Guitar['id']}} |
    {type:'increase-quantity',payload:{id:Guitar['id']}} |
    {type:'clear-cart'}

export type CartState={
    data:Guitar[]
    cart:CartItem[]
}  

const initialCart=():CartItem[]=>{
    const localStorageCart=localStorage.getItem('cart')
    return localStorageCart? JSON.parse(localStorageCart) : []
  }

export const initialState: CartState ={
    data:db,
    cart:initialCart()
}

const max_items=5
const min_item=1

export const cartReducer=(
    state:CartState=initialState,
    action:CartActions
)=> {
    if(action.type==="add-to-cart"){
      
        const itemExist=state.cart.find(guitar=>guitar.id===action.payload.item.id) 
        let updatedCart: CartItem[]=[]
        console.log(itemExist)
        if(itemExist){  //existe en el carrito
            updatedCart=state.cart.map(item=>{
                if(item.id===action.payload.item.id){
                    if(item.quantity < max_items){
                        return{...item,quantity:item.quantity+1}
                        } else {
                            return item
                        }
                    }else{
                        return item
                    }
                
            })
        }else{
         const newItem:CartItem={...action.payload.item,quantity:1}
         updatedCart= [...state.cart,newItem]
        }
        return{
            ...state,
            cart:updatedCart
        }
    }

    if(action.type==="remove-from-cart"){
        const cart=state.cart.filter(item=>item.id!==action.payload.id)
        return {
            ...state,
               cart
        }
    }

    

    if(action.type==='decrease-quantity'){
       
        const cart=state.cart.map(item=>{
          
            if(item.id==action.payload.id && item.quantity > min_item){
              return{
                ...item,
                quantity:item.quantity-1
              }
            
          }
          return item
        })
      

        return {
            ...state,
            cart
        }
    }

    if(action.type==="increase-quantity"){
        const cart=state.cart.map(item=>{
            if(item.id===action.payload.id && item.quantity < max_items){
              return{
                ...item,
                quantity:item.quantity+1
              }
            }
            return item
          })
        
        return {
            ...state,
            cart
        }
    }

    if(action.type==="clear-cart"){
        
        return{
            ...state,
            cart:[]
        }
    }
    
}
