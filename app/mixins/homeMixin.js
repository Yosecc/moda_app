import { mapMutations, mapActions, mapState } from 'vuex'
import Api from '~/services'
  import cache from '@/plugins/cache'
  import { Http, ImageSource } from '@nativescript/core'
export default {
  computed:{
    ...mapState('authentication',['token']),
    ...mapState(['sliders'])
  },
  methods: {
    ...mapMutations(['changeisLoadPage','setSlider','setOfertas']),
    ...mapMutations('categories',['setCategories']),
    ...mapMutations('stores',['setStoresPopular']),
    ...mapMutations('products',['setProducts','setRecentlySeen']),
    ...mapMutations('car',['setCarsProducts','addCarStore']),
    ...mapActions(['getHome','getSliders']),
    ...mapActions('categories',['getCategories']),
    ...mapActions('stores',['getStores','getStoreRosa']),
    ...mapActions('products',['getProductVisits']),
    ...mapActions('car',['getCar']),
    async defineHome(params){
      Api.defaults.headers.common['x-api-key'] = this.token

      this.getSliders(params).then((response)=>{
        this.setSlider(response)
      })
      
      this.getCategories().then((response)=>{

        this.setCategories(response)
      })

      // this.getProductVisits()

      this.getStoreRosa().then((response)=>{
        let arr = []
        response.forEach((e,i)=>{
          if(i<10){
            arr.push(e)
          }
        })
        this.setStoresPopular(arr)
      })

      let imageens = [
            { 
              img:'https://netivooregon.s3.amazonaws.com/modatexrosa2/img/logo/papa22-promos.jpg',
              categories: [1,3,4,5,6,2,7],
              link: 'https://www.modatex.com.ar/sale'
            },
            { 
              img:'https://netivooregon.s3.amazonaws.com/modatexrosa2/img/logo/martescupones-cms.jpg?22',
              categories: [1],
              link: 'https://www.modatex.com.ar/descuentosexclusivos'
            },
            { 
              img:'https://netivooregon.s3.amazonaws.com/modatexrosa2/img/logo/sale22cms.jpg?n',
              categories: [1,3],
              link: 'https://www.modatex.com.ar/pinkdays'
            },
            { 
              img:'https://netivooregon.s3.amazonaws.com/modatexrosa2/img/logo/lunesmayor-promos.gif',
              categories: [1,4,5,6,2,7],
              link: 'https://www.modatex.com.ar/index.php?page=220'
            },
            { 
              img:'https://netivooregon.s3.amazonaws.com/modatexrosa2/img/logo/cupones-promos.jpg',
              categories: [1,3,4,5,6,2,7],
              link: 'https://www.modatex.com.ar/montosminimos'
            },
      ]
      
      this.setOfertas(imageens)
     
      this.changeisLoadPage(true)
      
      return await true
    },
    async defineCar(){
      // let response = await this.getCar(cache.get('car'))
      // let products = response.data.products
      // products.map((e)=>{
      //   this.addCarStore(e.store)
      //   e.count = 1
      // })
      // this.setCarsProducts(products)
    },
    async getImage(img){
      return await Http.getImage(img).then(
        (response) => {
          // console.log('response')
          // getImage method returns ImageSource object
        },
        e => {
          // console.log('eimage error', e)
        }
      )
    }
  }
};