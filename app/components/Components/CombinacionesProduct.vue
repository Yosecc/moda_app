
<template lang="html">
  <StackLayout  >
    <Label text="Combinaciones" marginLeft="4" fontWeight="300" fontSize="12" />
    <!-- <Label :text="JSON.stringify(agregados)" marginLeft="4" fontWeight="300" fontSize="12" /> -->

    <WrapLayout width="100%"  v-show="!agregados.length" @tap="openDropBottom(null)" >
      <StackLayout width="37.5%" padding="4">
        <label 
          text="Talle"  
          margin="0"
          padding="0" 
          fontSize="12" 
          fontWeight="900"
          col="0"
          rowSpan="2"
        />
        <GridLayout 
          padding="8"
          borderRadius="8" 
          height="55"
          class="card secondary"
          columns="*,auto"
        >
            <label 
              :text="'Elegí una opción'"  
              marginLeft="8" 
              fontSize="12" 
              fontWeight="300"
              col="0"
              
            />
        </GridLayout>
      </StackLayout>
      <StackLayout width="37.5%" padding="4">
        <label 
          text="Color"  
          margin="0"
          padding="0" 
          fontSize="12" 
          fontWeight="900"
          col="0"
          rowSpan="2"
        />
        <GridLayout 
          padding="8"
          borderRadius="8" 
          height="55"
          class="card secondary"
          columns="*,auto"

        >
            <label 
              :text="'Elegí una opción'"  
              marginLeft="8" 
              fontSize="12" 
              fontWeight="300"
              col="0"
              
            />
        </GridLayout>
      </StackLayout>
      <StackLayout width="25%" padding="4">
        <label 
          text="Cant." 
          margin="0"
          padding="0" 
          fontSize="12" 
          fontWeight="900"
          col="0"
          rowSpan="2"
        />
        <GridLayout 
          padding="8"
          borderRadius="8" 
          height="55"
          class="card secondary"
          columns="*,auto"

        >
            <label 
              :text="'Elegí una opción'"  
              marginLeft="8" 
              fontSize="12" 
              fontWeight="300"
              col="0"
              
            />
        </GridLayout>
      </StackLayout>
    </WrapLayout>

    <WrapLayout v-show="agregados.length" v-for="(item,key) in agregados" :key="`modelo${key}`" @tap="openDropBottom(key)">
      <StackLayout width="37.5%" padding="4">
        <GridLayout 
          padding="8"
          borderRadius="8" 
          height="55"
          class="card secondary"
          columns="*,auto"
        >
        <FlexboxLayout 
            justifyContent="center" 
            alignItems="flex-start"
            flexDirection="column" 
            col="0" 
            margin="0" 
            padding="0" 
          >
            <label 
              :text="'Talle'"  
              margin="0"
              padding="0" 
              fontSize="12" 
              fontWeight="900"
              row="0"
            />
            <label 
              :text="item.price | moneda"  
              margin="0"
              padding="0" 
              fontSize="9" 
              fontWeight="100"
              row="1"
            />
          </FlexboxLayout>
       
            <FlexboxLayout 
              padding="8" 
              justifyContent="center" 
              alignItems="center" 
              height="100%" 
              minWidth="30"
              borderRadius="4"
              borderWidth="1" 
              borderColor="#8e8e8e" 
              class="taslleSelect" 
              col="1"
            >
              <Label :text="item.size" horizontalAlignment="center" fontSize="12" fontWeight="600" padding="0" margin="0" />
            </FlexboxLayout>
        </GridLayout>
      </StackLayout>
      <StackLayout width="37.5%" padding="4">
        <GridLayout 
          padding="8"
          borderRadius="8" 
          height="55"
          class="card secondary"
          columns="*,auto"
        >
          <FlexboxLayout 
            justifyContent="center" 
            alignItems="flex-start"
            flexDirection="column" 
            col="0" 
            margin="0" 
            padding="0" 
          >
            <label 
              :text="'Color'"  
              margin="0"
              padding="0" 
              fontSize="12" 
              fontWeight="900"
              row="0"
            />
            <label 
              :text="item.color_name"  
              margin="0"
              padding="0" 
              fontSize="9" 
              fontWeight="100"
              row="1"
            />
          </FlexboxLayout>
          <FlexboxLayout 
            justifyContent="center" 
            alignItems="center"  
            col="1" 
            height="100%" 
            padding="0" 
          >
            <AbsoluteLayout >
              <label
                left="0"
                top="0"
                width="30"
                height="30"
                :backgroundColor="item.color"
                opacity=".5"
                borderRadius="100%"
                borderColor="#808B96"
                borderWidth=".8"
              
              />
              <label
                left="5"
                top="5"
                width="20"
                height="20"
                :backgroundColor="item.color"
                borderRadius="100%"
              />
              <!-- <label
                left="5"
                top="5"
                borderWidth="1"
                borderColor="#DFDFDF"
                backgroundColor="#DFDFDF"
                padding="4"
                fontSize="12"
                :text="'kjhg'"
                borderRadius="4"
        
              /> -->
              <Image
                left="10"
                top="5"
                src="~/assets/icons/check_white.png" 
                width="10" 
                height="auto" 
      
              />
            </AbsoluteLayout>
          </FlexboxLayout>
          
        </GridLayout>
      </StackLayout>
      <StackLayout width="25%" padding="4">
        <GridLayout 
          padding="8"
          borderRadius="8" 
          height="55"
          class="card secondary"
          columns="*,auto"
        >
          <label 
            text="Cant." 
            margin="0"
            padding="0" 
            fontSize="12" 
            fontWeight="900"
            col="0"
          />
          <label 
            :text="item.cantidad" 
            margin="0"
            padding="0"
            fontSize="16" 
            fontWeight="900" 
            col="1"
          />
        
        </GridLayout>
      </StackLayout>
    </WrapLayout>

    <GridLayout columns="*,auto" marginTop="8">
      <StackLayout v-if="isButtom" col="0">
        <Button 
          :text="`Agregá ${agregados.length ? 'más':''} prendas`"
          class="btn btn-info btn-sm outline "
          marginLeft="0"
          horizontalAlignment="left"
          fontSize="12"
          @tap="openDropBottom(null)"
        />
        <!-- <ActivityIndicator v-if="!isEnabled" busy="true" color="E9418A"/> -->
      </StackLayout>
      <StackLayout  col="1">
        <slot></slot>
      </StackLayout>
    </GridLayout > 

   
    
  </StackLayout>
</template>
<script>
  import { mapState,mapMutations, mapActions } from 'vuex'

  export default {
    model: {
      prop: 'models',
      event: 'change'
    },
    props:{
      models:{
        type: Array,
        default(){
          return []
        }
      },
      // agregados:{}
      // product:{
      //   type: Object,
      //   default:{}
      // },
      isButtom:{
        type: Boolean,
        default: true
      },
      // isProduct:{
      //   type: Boolean,
      //   default: true
      // },
      // isEnabled:{
      //   type: Boolean,
      //   default: true
      // },
      // buttonDisabled:{
      //   type: Boolean,
      //   default: false
      // }
    },
    components:{
      
    },
    computed:{
      agregados(){
        try {
          if(!this.modelos.length){
            return []
          }
          let modelos = this.modelos
          
          if(modelos.length){
            modelos =  modelos.map(element => {
              console.log('element',element)
              if(!element.added.length){
                return []
              }
              return element.added.map(item=>{
                return {
                  size: element.size,
                  size_id: element.size_id,
                  color_id: item.color_id,
                  color: element.properties.find(e=>e.color_id == item.color_id )?.color_code,
                  cantidad: item.amount,
                  detail_id: item.detail_id,
                  price: element.price,
                  color_name: element.properties.find(e=>e.color_id == item.color_id )?.color_name
                }
              })
            })
            modelos = [].concat(...modelos)
            console.log('modelos agregados', modelos)
            return modelos
          }
          return []
        } catch (error) {
          console.log('ERROR',error)
          return []
        }
      }
    },
    watch:{
      // product(to){
      //   // alert('cambio')
      // },
      // combinaciones(to){
      //   this.combination = to
      // }
      models(to){
        this.modelos = to
      }
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
    data() {
      return {
        modelos: this.models
        // agregadosData: this.agregados
        // showDrop: false,
        // combination: this.combinaciones
      };
    },
    mounted(){
      // console.log('combination', this.modelos)
    },
    destroyed(){
      this.modelos = null
      // console.log('destroyed combinacion')
    },
    methods:{
      // ...mapMutations('car',['setCombinacion']),
      openDropBottom(key){
        
        // // console.log('CombinacionesProduct.vue product',keyy, this.combination)
        // let data = {
        //   sizes: this.product.sizes,
        //   colors: this.product.colors,
        //   product_id: this.product.id,
        //   descripcion: this.product.name ? this.product.name : this.product.descripcion,
        //  // models: this.product.models,
        //   combinacion_key:keyy,
        //   cantidad: 1,
        //   colorActive: '',
        //   talleActive: '',
        // }
        
        // if(keyy != undefined){
        //   this.combination.forEach( (e,key)=> {
        //     if(keyy == key){
        //       data.colorActive = e.colorActive
        //       data.talleActive = e.talleActive
        //       data.cantidad = e.cantidad
        //       data.cart_id = e.cart_id
        //       data.modelo = e.modelo
        //     }
        //   })
        // }
        console.log('soy el keyy', key)

        let obj = null

        if(key!=null){
          
          obj = {
            size: this.agregados[key].size,
            color: this.agregados[key].color,
            cantidad: this.agregados[key].cantidad,
            detail_id: this.agregados[key].detail_id
          }
        }

        this.$emit('openDropBottom', obj)
      },
    }
  }
</script>

<style lang="scss" scoped>
    // Start custom common variables
    @import "@nativescript/theme/scss/variables/blue";
    // End custom common variables
</style>
