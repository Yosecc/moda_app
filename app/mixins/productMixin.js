import { mapMutations, mapActions } from 'vuex'

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

    talles(){
      if(Object.keys(this.product.sizes).length > 0){
        let talles = []

        for (let clave in this.product.sizes){
            // console.log(perro[clave]);
            talles.push(clave)
        }
        return talles
      }
      return []
    },
    colores(){
      if(Object.keys(this.product.detail).length > 0){
        let colores = []
        let codes = []
        for (let clave in this.product.detail){

            let colors = this.product.detail[clave].colors

            if(colors.length > 0){
              
              colors.forEach((element)=>{
                if(!codes.includes(element.code)){
                  codes.push(element.code)
                  colores.push(element)
                }
              })
            }
        }
        return colores
      }
        return []
    }
  },
  methods: {
    ...mapMutations('products',['setProduct']),
    ...mapMutations('stores',['setStoreActive','setStore']),
    ...mapMutations('car',['setStoreActiveCar']),
    ...mapActions('products',['productVisits']),
    ...mapMutations(['changeDrawerCar','changeDrawer']),
    onViewProduct(product, navigate = true){

      product.talleActive = ''
      product.colorActive = ''
      product.count = 1

      this.options.props = {
        product: product,
      }
      this.$forceUpdate()

      console.log('hasta aqui todo bien')
      this.$navigator.navigate('/product',this.options)
     
    },
  }
};