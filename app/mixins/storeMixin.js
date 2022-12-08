import { mapMutations, mapActions,mapState } from 'vuex'

export default {
  data() {
    return {
     options: {
        transition: {
          name: 'slideLeft',
          duration: 300,
          curve: 'easeIn'
        },
      },
    };
  },
  filters: {
    moneda: function (value) {
      value += '';
      var x = value.split('.');
      var x1 = x[0];
      var x2 = x.length > 1 ? '.' + x[1] : '';
      var rgx = /(\d+)(\d{3})/;
      while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + '.' + '$2');
      }
      return '$'+ x1 + x2;
    }
  },
  computed:{
    ...mapState('categories',['categorieActive']),
    // ...mapState('car',['carro']),
      precioCar(){
        if(!this.carro){
          return ''
        }
        let precio = this.carro.total
        return precio
      },
      isOrderMinStatus(){
        if(!this.carro){
          return ''
        }
        return ( this.precioCar >= this.carro.limit_price ) ? true : false
      },
      calculoRestanteOrderMin(){
        if(!this.carro){
          return ''
        }
        return this.carro.limit_price - this.precioCar 
      },
      textCarMonto(){
        if(!this.carro){
          return ''
        }
        return '$'+this.precioCar.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&.');
      },
      textMinOrden(){
        if(!this.carro){
          return ''
        }
        return `Restan $${this.calculoRestanteOrderMin} para completar el mínimo de compra`
      },
      textPrendasLabel(){
        if(!this.carro){
          return ''
        }
        if(this.carro.products_count > 0){
          let numero = this.carro.products_count
          var txt = numero + ' prenda' 
          if(numero > 1){
             txt += 's'
          }
           txt +=' en el carro'
           return txt
        }else{
          return 'Seleccione los carros que desea agregar a su multienvío'
        }
      },
  },
  methods: {
    ...mapMutations('stores',['setStoreActive', 'setStore','setStores']),
    // ...mapMutations('car',['setStoreActiveCar']),
    ...mapActions('stores',['getStores']),
    // ...mapActions('products',['getProducts']),
    onViewStore(store){
      this.options.props = {
        store: store,
      }
      this.$navigator.navigate('/store',this.options)
      
    },
    async defineStores(){
      const response = await this.getStores()
      this.setStores(response.data.stores)
    },
    onRedirectCart(id = null){
      // console.log('2', this.carro.id, id)
      if(this.carro){
        this.$navigator.navigate('/detail_car', { 
          props: { 
            car_id: this.carro.id,
            store:{
              logo:     this.carro.logo,
              name:     this.carro.name,
              local_cd: this.carro.id,
              min:      this.carro.limit_price
            }
          },
          transition: {
            name: 'slideTop',
            duration: 300,
            curve: 'easeIn'
          }, 
        })
      }
    }
  }
};