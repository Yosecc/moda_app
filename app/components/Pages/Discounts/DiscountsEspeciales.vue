<template lang="html">
  <Page actionBarHidden="true">
    <GridLayout
      rows="auto,*" 
    >
      <HeaderCustom row="0" :back="false" />

      

        <ScrollView row="1">
          <StackLayout
            v-for="(descuento, key) in descuentos"
            :key="`descuento-${key}`"
           >

            <Label :text="descuento.name" fontSize="16" fontWeight="800" />

            <StackLayout
              v-for="(item, k) in descuento.data"
              :key="`descuento-Item${k}-${key}`"
            >

            <ImageCache 
              placeholderStretch="aspectFill"
              placeholder="res://eskeleton"
              :src="item.store.logo"
              width="100"
              height="100"
              stretch="aspectFill"
              marginRight="16"
              marginBottom="8"
              marginTop="8"
              class="storeBox"
            /> 
              
            </StackLayout>

          </StackLayout>
        </ScrollView>

      
    </GridLayout>
    
  </Page> 
</template>

<script>
  
  import HeaderCustom from '~/components/Components/ActionBar/HeaderCustom.vue'
  import { ObservableArray } from '@nativescript/core/data/observable-array';
  import { mapActions, mapState, mapMutations, mapGetters } from 'vuex'
  
  export default {
    mixins:[  ],
    components:{
      HeaderCustom
    },
    data() {
      return {     
        descuentos: []
      };
    },
    watch:{  

    },
    computed:{
      ...mapState([]),
    },
    mounted(){
      this.descuentosExclusivos().then((response)=>{
        console.log(response)
        this.descuentos = response
      })
    },
    methods:{
      ...mapActions(['descuentosExclusivos']),
      ...mapMutations([]),
      onPullToRefreshInitiated(){

      }
    }
  }
</script>

<style lang="scss" scoped>
    // Start custom common variables
    @import "@nativescript/theme/scss/variables/blue";
    // End custom common variables

    // Custom styles

</style>
