<template lang="html">
  <Page >
    <HeaderDefault :back="true" :logoCenter="false">
        <Label col="1"  fontWeight="900" fontSize="16" padding="0" margin="0" textTransform="uppercase" textAlignment="left" text="Descuentos especiales" />
      </HeaderDefault>
    <GridLayout
      rows="auto,*" 
    >
      
        <ScrollView row="1">

          <StackLayout
            v-for="(descuento, key) in descuentos"
            :key="`descuento-${key}`"
           >

            <Label  :text="descuento.name" fontSize="16" fontWeight="600" margin="16" />

            <WrapLayout >
              
              <FlexboxLayout
                v-for="(item, k) in descuento.data"
                :key="`descuento-Item${k}-${key}`"
                width="50%"
                padding="16"
                borderWidth=".5"
                borderColor="#ECF0F1"
                alignItems="center"
                justifyContent="center"
                flexDirection="column"
              >

                <AbsoluteLayout 
                  width="140"
                  height="140" 
                >
                  <ImageCache 
                    placeholderStretch="aspectFill"
                    placeholder="res://eskeleton"
                    :src="item.store.logo"
                    width="140"
                    height="140"
                    stretch="aspectFill"
                    class="storeBox"
                    horizaontalAlignment="center"
                    top="0"
                    left="0"
                  /> 
                  <FlexboxLayout 
                    background="rgba(0,0,0,.7)"
                    top="0"
                    left="0"
                    width="140"
                    height="140"
                    justifyContent="center"
                    alignItems="center"
                    v-if="item.isAdd"
                  >
                  <!-- <label text="Agregado" color="#DA0080" fontWeight="900" textTransform="uppercase" /> -->
                  </FlexboxLayout >
                </AbsoluteLayout>
                <button 
                  @tap="onCanjearCupon(item.code)" 
                  v-if="isLoadingCanje != item.code"
                  :text="!item.isAdd ? 'OBTENER':'AGREGADO'" 
                  fontWeight="900"
                  fontSize="14" 
                  marginTop="16" 
                  padding="0 32" 
                  height="40" 
                  class="btn btn-primary outline "
                  :class="item.isAdd ? 'disabled':''"
                />
                <ActivityIndicator v-else busy="true" marginTop="18" height="40"  color="#DA0080" />
                
              </FlexboxLayout>
            </WrapLayout>
          </StackLayout>
        </ScrollView>

      
    </GridLayout>
    
  </Page> 
</template>

<script>
  
  import HeaderDefault from '~/components/Components/ActionBar/HeaderDefault.vue'
  import { ObservableArray } from '@nativescript/core/data/observable-array';
  import { mapActions, mapState, mapMutations } from 'vuex'
  import { firebase } from '@nativescript/firebase';
  export default {
    mixins:[  ],
    components:{
      HeaderDefault
    },
    data() {
      return {     
        descuentos: [],
        isLoadingCanje: null
      };
    },
    watch:{  

    },
    computed:{
      ...mapState([]),
    },
    mounted(){
      firebase.analytics.setScreenName({
        screenName: `Descuentos Especiales`
      });
      this.onMounted()
    },
    methods:{
      ...mapActions(['descuentosExclusivos', 'canjearCupon']),
      ...mapMutations(['changeToast']),
      onMounted(){
        this.descuentosExclusivos().then((response)=>{
          console.log(response)
          this.descuentos = response
        })
      },
      onCanjearCupon(code){
        if(code==''){
          alert('Código requerido')
          return
        }
        this.isLoadingCanje = code
        this.canjearCupon(code).then((response)=>{
          console.log(response)
          this.isLoadingCanje = null
          this.onMounted()
          this.changeToast({
                  title: response,
                  status: true,
                  type: 'success',
                  message: ''
              })
          // alert(response)
          
        }).catch((error)=>{
          console.log(error)
          this.isLoadingCanje = null
          // alert(error)
          this.changeToast({
                  title: error,
                  status: true,
                  type: 'danger',
                  message: ''
              })
        })

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
