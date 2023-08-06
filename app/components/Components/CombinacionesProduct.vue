
<template lang="html">
  <StackLayout  >
    <Label text="Combinaciones" marginLeft="4" fontWeight="300" fontSize="12" />
    <!-- <WrapLayout 
      paddingBottom="0" 
      marginBottom="0"
      borderBottomWidth="0"
      class="combinaciones"
    >
        <label 
          text="Talle"  
          marginLeft="0" 
          paddingLeft="4" 
          fontSize="12" 
          fontWeight="900"
          width="37.5%"
        />
        <label 
          text="Color"  
          marginLeft="0"
          paddingLeft="4" 
          fontSize="12" 
          fontWeight="900" 
          width="37.5%"
        />
        <label 
          text="Cant."  
          marginLeft="0"
          paddingLeft="4" 
          fontSize="12" 
          fontWeight="900" 
          width="25%"
        />
    
    </WrapLayout> -->
    
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
    <StackLayout v-show="isEnabled" padding="4 4 4 4" width="37.5%">
      <GridLayout 
        padding="8"
        borderRadius="8" 
        height="55"
        class="card secondary"
        columns="*,auto"
        rows="*,*"
      >
        <label 
          text="Talle"  
          margin="0"
          padding="0" 
          fontSize="12" 
          fontWeight="900"
          v-if="combinacion.talleActive != ''" 
          col="0"
          rowSpan="2"
        />
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
          v-if="combinacion.talleActive != ''" 
          col="1"
          rowSpan="2"

        >
          <Label :text="combinacion.talleActive" horizontalAlignment="center" fontSize="12" fontWeight="600" padding="0" margin="0" />
        </FlexboxLayout>
          <label 
            text="Talle"  
            margin="0"
            padding="0" 
            fontSize="12" 
            fontWeight="900"
            v-if="combinacion.talleActive == ''"
            col="0"
            row="0"
          />
          <label 
            v-if="combinacion.talleActive == ''"
            :text="'Elegí una opción'"  
            marginLeft="8" 
            fontSize="12" 
            fontWeight="300"
            col="0"
            row="1"
          />
      </GridLayout>
    </StackLayout>

    <StackLayout v-show="isEnabled" padding="4 4 4 4" width="37.5%">
      <GridLayout 
        padding="8"
        borderRadius="8" 
        height="55"
        class="card secondary"
        columns="*,auto"
        rows="*,*"
      >
        <label 
          text="Color"  
          margin="0"
          padding="0" 
          fontSize="12" 
          fontWeight="900"
          v-if="combinacion.colorActive != ''"
          col="0"
          rowSpan="2"
        />
        <FlexboxLayout 
          justifyContent="center" 
          alignItems="center"  
          col="1" 
          height="100%" 
          v-if="combinacion.colorActive != ''" 
          padding="0" 
          rowSpan="2"
        >
          <AbsoluteLayout >
            <label
              left="0"
              top="0"
              width="30"
              height="30"
              :backgroundColor="combinacion.colorActive"
              opacity=".5"
              borderRadius="100%"
              borderColor="#808B96"
              borderWidth=".8"
              v-if="!combinacion.colorActive.includes('/')"
            />
            <label
              left="5"
              top="5"
              width="20"
              height="20"
              :backgroundColor="combinacion.colorActive"
              borderRadius="100%"
              v-if="!combinacion.colorActive.includes('/')"
            />
            <label
              left="5"
              top="5"
              borderWidth="1"
              borderColor="#DFDFDF"
              backgroundColor="#DFDFDF"
              padding="4"
              fontSize="12"
              :text="combinacion.colors.find((e)=> e.code == combinacion.colorActive).name"
              borderRadius="4"
              v-if="combinacion.colorActive.includes('/')"
            />
            <Image
              left="10"
              top="5"
              src="~/assets/icons/check_white.png" 
              width="10" 
              height="auto" 
              v-if="!combinacion.colorActive.includes('/')"
            />
          </AbsoluteLayout>
        </FlexboxLayout>
          <label 
            text="Color"  
            margin="0"
            padding="0" 
            fontSize="12" 
            fontWeight="900"
            v-if="combinacion.colorActive == ''"
            col="0"
            row="0"
          />
          <label 
            v-if="combinacion.colorActive == ''"
            :text="'Elegí una opción'"   
            marginLeft="8" 
            fontSize="12" 
            fontWeight="300"
            col="0"
            row="1"
          />
      </GridLayout>
    </StackLayout>

    <StackLayout v-show="isEnabled" padding="4 4 4 4" width="25%">
      <GridLayout 
        padding="8"
        borderRadius="8" 
        height="55"
        class="card secondary"
        columns="*,auto"
        rows="*,*"
      >
        <label 
          text="Cant." 
          margin="0"
          padding="0" 
          fontSize="12" 
          fontWeight="900"
          v-if="combinacion.talleActive != ''" 
          col="0"
          rowSpan="2"

        />
        <label 
          :text="combinacion.cantidad" 
          v-if="combinacion.talleActive != ''" 
          margin="0"
          padding="0"
          fontSize="16" 
          fontWeight="900" 
          col="1"
          rowSpan="2"

        />
        <label 
          text="Cant." 
          margin="0"
          padding="0" 
          fontSize="12" 
          fontWeight="900"
          v-if="combinacion.talleActive == ''"
          col="0"
          row="0"
        />
          <label 
            v-if="combinacion.talleActive == ''"
            :text="`1`" 
            marginLeft="8" 
            fontSize="12" 
            fontWeight="300"
            col="0"
            row="1"
          />
      </GridLayout>
    </StackLayout>
      
      <StackLayout v-show="!isEnabled" padding="4" width="37.5%" >
        <StackLayout class="label_skeleton" height="55" width="100%"></StackLayout>
      </StackLayout>

      <StackLayout v-show="!isEnabled" padding="4" width="37.5%" >
        <StackLayout class="label_skeleton" height="55" width="100%"></StackLayout>
      </StackLayout>

      <StackLayout v-show="!isEnabled" padding="4" width="25%" >
        <StackLayout class="label_skeleton" height="55" width="100%"></StackLayout>
      </StackLayout>

    </WrapLayout>

    <GridLayout columns="*,auto">
      <StackLayout col="0">
        <Button 
          text="Agregá más prendas"
          class="btn btn-info btn-sm outline "
          marginLeft="0"
          horizontalAlignment="left"
          fontSize="12"
          v-if="isButtom && combinaciones.length && combinaciones[0].talleActive != ''"
          v-show="isEnabled"
          :isEnabled="combinaciones[0].talleActive != ''"
          @tap="openDropBottom(null)"
        />
        <ActivityIndicator v-if="!isEnabled" busy="true" color="E9418A"/>
      </StackLayout>
      <StackLayout col="1">
        <slot></slot>
      </StackLayout>
    </GridLayout >
    
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
      product(to){
        // alert('cambio')
      },
      combinaciones(to){
        this.combination = to
      }
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
        // console.log('soy el keyy', keyy)
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
