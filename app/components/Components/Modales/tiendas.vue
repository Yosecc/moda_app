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
      :items="stores"
      layout="grid"
      itemWidth="50%"
      :pullToRefresh="true"
    >
      <v-template if="item.logo != null">
        <StackLayout 
          padding="8" @tap="onTapViewStore(item)">
          <StackLayout 
            padding="8"
            class="card"
            alignItems="center"
          >

            <ImageCache 
                  stretch="aspectFill" 
                  width="80" 
                  height="80"
                  placeholderStretch="aspectFill"
                  placeholder="res://eskeleton"
                  :src="item.logo"
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
                  <span :text="item.min |moneda " style="color: #E9418A"></span>
                </FormattedString>
              </label>
            </StackLayout>
          </StackLayout >
        </StackLayout>
      </v-template>

      <v-template if="item.logo == null" >
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
        // type: Array|Object,
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
