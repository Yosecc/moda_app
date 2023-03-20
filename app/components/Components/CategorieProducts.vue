<template lang="html">
    
    <StackLayout paddingTop="8" v-if="productsCategorie.length">
      <!-- <ListView height="350" :items="productsCategorie">
        <v-template>
          <ProductBox
              :product="item"
          ></ProductBox>
  </v-template>
      </ListView> -->
      <WrapLayout >
        <StackLayout
        v-for="(item,key) in productsCategorie"
        :key="`product-home-${key}`"
        width="50%">
          <ProductBox
              :product="item"
          ></ProductBox>
        </StackLayout>
      </WrapLayout>
    </StackLayout>

    <StackLayout paddingTop="8" v-else >
      <WrapLayout >
          <StackLayout
          v-for="i in 10"
          :key="`ultimosSekeddleton-${i}`"
          width="50%"
          padding="8"
          >
          <StackLayout class="label_skeleton" height="200">
              
          </StackLayout>
          </StackLayout>
      </WrapLayout>
    </StackLayout>

          

</template>
  
<script  >
  
    import ProductBox from '~/components/Components/Boxes/ProductBox.vue'
    import { mapMutations, mapState, mapActions } from 'vuex'
    export default {
      props:{
        productsCategorie:{
            type: Object|Array,
            default:[]
        }
      },
      components:{
        ProductBox
      },
      data() {
        return {

        };
      },
      watch:{
        
      },
      computed:{
        
  
      },
      methods:{
       
      }
    }
</script>
  
  