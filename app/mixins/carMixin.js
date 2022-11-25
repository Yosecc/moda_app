import { mapMutations, mapActions, mapState } from 'vuex'

export default {
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
    ...mapState('car',['carsProducts'])
  },
  methods: {
    ...mapActions('car',['addCar']),
    async dataCart(product,combinaciones){

      let obj = {
        images      : product.images,
        precio      : product.price ? product.price : product.precio,
        id          : product.id,
        descripcion : product.name,
        store: {
          id   : product.store_data ? product.store_data.id : product.store.id,
          company: product.company ? product.company : product.store.company,
          name : product.store_data ? product.store_data.name : product.store.name,
          limit_price: product.store_data ? product.store_data.min : product.store.min,
          logo: product.store_data ? product.store_data.logo : product.store.logo,
        },
        sizes        : product.sizes,
        colors       : product.colors,
        combinacion: combinaciones,
        models: product.models
      }
      await this.addCar(obj)
    },
    processDataCar(product,combinaciones){
      // console.log(product,combinaciones)
      this.dataCart(product,combinaciones)
      this.$forceUpdate()
    },
    addCombinacionCart(product_id){

      console.log('mixin',product_id)
      let product = this.carsProducts.find((e)=> e.id == product_id)
      console.log('mixin addCombinacionCart', product )
      // this.dataCart(product, product.combinacion)
      // alert('Agregada combinacion')
    }
  }
};