<template lang="html">

   <!--  <ActionBar  
      :marginBottom="0"

    > -->
      
     <GridLayout 
        columns="*,auto"
        
      >
        <StackLayout
          col="0"
          marginRight="8"
        >
          <Label
            :text="store.name"
            horizontalAlignment="right"
            textAlignment="right"
            fontSize="20"
            fontWeight="900"
          />
          <StackLayout
            orientation="horizontal"
            horizontalAlignment="right"
          >
            <Label 
              text="87" 
              class="badge" 
            />
            <Label 
              text="100" 
              class="badge" 
            />
          </StackLayout>
          <Label 
            :text="`Mínimo de compra. $${minCompra}`" 
            horizontalAlignment="right"
            textAlignment="right"
            color="#DA0080"
            fontWeight="300"
            fontSize="14"
          />
        </StackLayout>

        <StackLayout col="1" verticalAlignment="center">
          <Image 
            :src="store.logo"
            width="60"
            borderRadius="8"
            borderWidth="1"
            borderColor="#D9D9D9"
          />
        </StackLayout>
        
      </GridLayout >
   
    <!-- </ActionBar> -->
 
</template>

<script>

import { mapMutations } from 'vuex'

  export default {
    props:{
      store:{
        type: Object
      }
    },
    components:{

    },
    data() {
      return {

      };
    },
    computed:{
      minCompra(){

        return parseInt(this.store.limit_price).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&.')
      }
    },
    mounted(){
     
    },
    methods:{
     
     
    }
   
  }
</script>

<style lang="scss" scoped>
    // Start custom common variables
    @import "@nativescript/theme/scss/variables/blue";
    // End custom common variables
    .input{
        // background: white;
        border-radius: 8;
        box-shadow: none !important;
        outline: none;
        margin-left: 0px;
        margin-right: 8;
        width: 100%;
        // padding-left: 8;
    }
    // Custom styles

</style>
