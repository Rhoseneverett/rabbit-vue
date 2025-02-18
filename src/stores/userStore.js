import { defineStore } from 'pinia'
import { ref } from 'vue'
import { loginAPI } from '@/apis/user'
import { useCartStore } from '@/stores/cartStore'
import { mergeCartAPI } from '@/apis/cart'


export const useUserStore = defineStore('user', () => {
  // 管理用户数据的state
  const userInfo = ref({})
  const cartStore = useCartStore()

  // 获取接口数据的action函数
  const getUserInfo = async ({ account, password }) => {
    const res = await loginAPI({ account, password })
    userInfo.value = res.result
    await mergeCartAPI(cartStore.cartList.map((item) => {
      return{
        skuId:item.skuId,
        selected:item.selected,
        count:item.count
      }
    }))
    cartStore.updateNewList()
  }

  const deleteUserinfo = async () => {
    userInfo.value = {}
    cartStore.clearCart()
  }
  
  return {
    userInfo,
    getUserInfo,
    deleteUserinfo
  }
},{
    persist:true
})