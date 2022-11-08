<template lang="html">
  <Page 
    actionBarHidden="true" 
    background="transparent" 
    id="tiendasModal" 
    borderRadius="10"
  >
  <StackLayout padding="16">
    <image src="~/assets/icons/times.png" @tap="$modal.close()" stretch="aspectFill" width="30" height="30" horizontalAlignment="right" />
    <Label text="Podés canjearlo en..." fontSize="30" fontWeight="100" textAlignment="center" marginBottom="16" />

    <RadListView 
      ref="listStores"
      id="listStores"
      for="store in stores"
      layout="grid"
      itemWidth="50%"
      :pullToRefresh="true"
    >
      <v-template if="store.logo != null">
        <StackLayout 
          padding="8" @tap="onTapViewStore(store)">
          <StackLayout 
            padding="8"
            class="card"
            alignItems="center"
          >
            <!-- <Image
              :src="store.logo"
              width="80"
              height="80"
              borderRadius="8"
              verticalAlignment="top"
              marginRight="8"
            /> -->

            <ImageCache 
                  stretch="aspectFill" 
                  width="80" 
                  height="80"
                  placeholderStretch="aspectFill"
                  placeholder="res://eskeleton"
                  :src="store.logo"
                  marginRight="8"
                  verticalAlignment="top"
                />
      
            <StackLayout verticalAlignment="top">
              
              <label 
                textWrap="true" 
                fontWeight="300"
                fontSize="12">
                <FormattedString>
                  <span text="Precio mínimo de compra: "></span>
                  <span :text="store.limit_price |moneda " style="color: #DA0080"></span>
                </FormattedString>
              </label>
            </StackLayout>
          </StackLayout >
        </StackLayout>
      </v-template>

      <v-template if="store.logo == null" >
        <StackLayout 
          width="100%"
          height="100%" 
          padding="8">
          <StackLayout 
            padding="8"
            class="animation-pulse card"
            alignItems="center"
            width="100%"
            height="120"
            background="blue"
            backgroundImage="res://eskeleton"
            opacity=".1"
          ></StackLayout>
        </StackLayout>
      </v-template>

    </RadListView>
  </StackLayout>
    
  </Page>
</template>

<script>
  import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
  import storeMixin from '~/mixins/storeMixin.js'

  export default {
    mixins: [storeMixin],
    props: {
      stores:{
        type: Array,
        default: []
      }
    },
    components: {
      
    },
    filters: {
      
    },
    data() {
      return {
        
      };
    },
    watch:{
   
    },
    computed:{
     
      
    },
    mounted(){
      
    },
    methods:{
      onTapViewStore(store){
        this.$modal.close()
        this.onViewStore(store)
      },
    }
  };
</script>

<style lang="scss" scoped>
// Start custom common variables
@import "@nativescript/theme/scss/variables/blue";
// End custom common variables

// Custom styles
</style>
