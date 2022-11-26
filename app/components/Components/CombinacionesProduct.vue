
<template lang="html">
  <StackLayout >
    <Label text="Combinaciones" marginLeft="4" fontWeight="300" fontSize="12" />
    <WrapLayout 
      v-for="(combinacion, key) in combination" 
      v-if="combinaciones.length"
      :key="key" 
      @tap="openDropBottom(key)" 
      borderBottomWidth="1" 
      class="combinaciones"
      paddingBottom="8" 
      marginBottom="8" 
    >
      <StackLayout v-show="isEnabled" background="" padding="4 4 4 4" width="37.5%">
        <StackLayout padding="8" borderRadius="8" height="100%" class="card secondary" :class="buttonDisabled ? 'shadow-none border-light':''"  width="100%">
          <FlexboxLayout width="100%" alignItems="center" justifyContent="space-between">
            <label 
              text="Talle"  
              marginLeft="0" 
              paddingLeft="0" 
              fontSize="14" 
              fontWeight="900" 
            />
            <StackLayout v-if="combinacion.talleActive != ''" padding="0" marginRight="0">
              <FlexboxLayout padding="8" justifyContent="center" alignItems="center" height="30" minWidth="30"  borderRadius="4" borderWidth="1" borderColor="#8e8e8e" class="talleSelect" >
                <Label :text="combinacion.talleActive" horizontalAlignment="center" fontSize="12" fontWeight="600" padding="0" margin="0" />
              </FlexboxLayout>
            </StackLayout>
          </FlexboxLayout>
          <label 
            v-if="combinacion.talleActive == ''"
            :text="'Elegí una opción'"  
            marginLeft="8" 
            fontSize="12" 
            fontWeight="300" 
          />
        </StackLayout>
      </StackLayout>
      <StackLayout v-show="isEnabled" background="" padding="4 4 4 4" width="37.5%">
        <StackLayout padding="8" borderRadius="8" height="100%" class="card secondary"  :class="buttonDisabled ? 'shadow-none border-light':''" width="100%">
          <FlexboxLayout width="100%" backgroundColor="" alignItems="center" justifyContent="space-between">
            <label 
              text="Color"  
              marginLeft="0"
              paddingLeft="0" 
              fontSize="14" 
              fontWeight="900" 
            />
            
            <StackLayout v-if="combinacion.colorActive != ''" padding="0" horizontalAlignment="right">
              <AbsoluteLayout>
                <label
                  left="0"
                  top="0"
                  width="30"
                  height="30"
                  :backgroundColor="combinacion.colorActive"
                  opacity=".5"
                  borderRadius="100%"
                />

                <label
                  left="5"
                  top="5"
                  width="20"
                  height="20"
                  :backgroundColor="combinacion.colorActive"
                  borderRadius="100%"
                />
                <Image
                  left="11"
                  top="5"
                  src="~/assets/icons/check_white.png" 
                  width="8" 
                  height="auto" 
                />
              </AbsoluteLayout>
            </StackLayout>
            
          </FlexboxLayout>
          <label
            v-if="combinacion.colorActive == ''"
            :text="'Elegí una opción'"  
            marginLeft="8" 
            fontSize="12" 
            fontWeight="300" 
          />
        </StackLayout>
      </StackLayout>
      <StackLayout v-show="isEnabled" background="" padding="4 4 4 4" width="25%">
        <StackLayout padding="8" borderRadius="8" :height="combinacion.talleActive == '' ? '100%':'46'" class="card secondary" :class="buttonDisabled ? 'shadow-none border-light':''" width="100%">
          <FlexboxLayout justifyContent="space-between"  alignItems="center" >
            <label 
              text="Cant."  
              marginLeft="0"
              paddingLeft="0" 
              fontSize="14" 
              fontWeight="900" 
            />
            <label 
              v-if="combinacion.talleActive != ''"
              :text="combinacion.cantidad"  
              marginLeft="8"
              fontSize="16" 
              fontWeight="900" 
            />
          </FlexboxLayout>
          <label 
            v-if="combinacion.talleActive == ''"
            :text="combinacion.cantidad"  
            marginLeft="8"
            fontSize="12" 
            fontWeight="500" 
          />
        </StackLayout>
      </StackLayout>

      <StackLayout v-show="!isEnabled" padding="4" width="37.5%" >
        <StackLayout background="#DDDDDD" class="label_skeleton" height="45" width="100%"></StackLayout>
      </StackLayout>

      <StackLayout v-show="!isEnabled" padding="4" width="37.5%" >
        <StackLayout background="#DDDDDD" class="label_skeleton" height="45" width="100%"></StackLayout>
      </StackLayout>

      <StackLayout v-show="!isEnabled" padding="4" width="25%" >
        <StackLayout background="#DDDDDD" class="label_skeleton" height="45" width="100%"></StackLayout>
      </StackLayout>

    </WrapLayout>

    <StackLayout orientation="horizontal">
      <Button 
        text="Agregá más prendas"
        class="btn btn-primary btn-sm outline "
        marginLeft="0"
        horizontalAlignment="left"
        fontSize="12"
        v-if="isButtom && combinaciones.length && combinaciones[0].talleActive != ''"
        v-show="isEnabled"
        :isEnabled="combinaciones[0].talleActive != ''"
        @tap="openDropBottom(null)"
      />
      <ActivityIndicator v-if="!isEnabled" busy="true" color="DA0080"/>
    </StackLayout>
  </StackLayout>
</template>
<script>
  import { mapState,mapMutations, mapActions } from 'vuex'

  export default {
    model: {
      prop: 'combinaciones',
      event: 'change'
    },
    props:{
      combinaciones:{
        type: Array,
        default: []
      },
      product:{
        type: Object,
        default:{}
      },
      isButtom:{
        type: Boolean,
        default: true
      },
      isProduct:{
        type: Boolean,
        default: true
      },
      isEnabled:{
        type: Boolean,
        default: true
      },
      buttonDisabled:{
        type: Boolean,
        default: false
      }
    },
    components:{
      
    },
    computed:{

    },
    watch:{
    },
    data() {
      return {
        showDrop: false,
        combination: this.combinaciones
      };
    },
    mounted(){
      // console.log('combination', this.combination, this.combinaciones.length)
    },
    methods:{
      ...mapMutations('car',['setCombinacion']),
      openDropBottom(keyy){

        // console.log('CombinacionesProduct.vue product',keyy, this.combination)
        let data = {
          sizes: this.product.sizes,
          colors: this.product.colors,
          product_id: this.product.id,
          descripcion: this.product.name ? this.product.name : this.product.descripcion,
         // models: this.product.models,
          combinacion_key:keyy,
          cantidad: 1,
          colorActive: '',
          talleActive: '',
        }
        
        if(keyy != undefined){
          this.combination.forEach( (e,key)=> {
            if(keyy == key){
              data.colorActive = e.colorActive
              data.talleActive = e.talleActive
              data.cantidad = e.cantidad
              data.cart_id = e.cart_id
              data.modelo = e.modelo
            }
          })
        }
        // console.log('paso 1', data)
        this.$emit('openDropBottom', {data:data, models:this.product.models, isNew: keyy})
      },
    }
  }
</script>

<style lang="scss" scoped>
    // Start custom common variables
    @import "@nativescript/theme/scss/variables/blue";
    // End custom common variables
</style>
