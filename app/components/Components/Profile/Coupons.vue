<template lang="html">
  <ScrollView>
    <GridLayout rows="auto,*">
      <StackLayout row="0" padding="8 16 8 16">
        <StackLayout class="card">
          <label text="Canjeá cupones acá" textAlignment="center" marginBottom="8" fontWeight="900" />
          <TextField 
            textTransform="uppercase" 
            autocapitalizationType="none"
            textAlignment="center" 
            v-model="code" 
            class="inputForm" 
            hint="Ingrese el código del cupón" 
          />
          <button  v-if="!isLoadingCanje" @tap="onCanjearCupon" text="Enviar" marginTop="8" class="btn btn-primary btn-sm" />
          <ActivityIndicator v-else busy="true" color="#E9418A" marginTop="8" />
        </StackLayout>

        <Label text="Tus cupones" fontWeight="900" fontSize="18" margin="16 0 8 0" />
      </StackLayout>
      <RadListView ref="list" row="1" :items="coupons" @itemTap="onItemTap">
        <v-template >
          <CuponBox :item="item" />
        </v-template>
      </RadListView>
      <StackLayout 
        top="0"
        left="0"
        width="100%"  
        v-if="!coupons.length && cargado" 
        padding="24"
        row="1"
      >
        <Label text="No tenés cupones" textAlignment="center" fontWeight="100" fontSize="24" flexWrap />
      </StackLayout>
    </GridLayout>
  </ScrollView> 
  
</template>

<script>
  import profileMixin from '~/mixins/profileMixin.js'
  import CuponBox from '~/components/Components/Boxes/CuponBox.vue'
  import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'
  
  export default {
    mixins: [profileMixin],
    props: {

    },
    components: {
      CuponBox
    },
    filters: {

    },
    data() {
      return {
        code: '',
        isLoadingCanje: false,
        cargado: false
      };
    },
    watch:{

    },
    computed:{
      ...mapState('profile',['coupons']),
    },
    mounted(){
      
      this.getCoupons().then((respoinse)=>{
        this.cargado = true
      }).catch((error)=>{
        this.cargado = true
      })
    },
    methods:{
      ...mapActions('profile',['getCoupons']),
      ...mapActions(['canjearCupon']),
      ...mapMutations(['changeToast']),
      onCanjearCupon(){
        if(this.code == ''){
          this.changeToast({
            title: 'Código requerido',
            status: true,
            type: 'danger',
            message: ''
          })
          return
        }
        this.isLoadingCanje = true
        this.$refs.list.refresh()
        this.canjearCupon(this.code).then((response)=>{
          // console.log(response)
          this.isLoadingCanje = false
          this.getCoupons()
          this.changeToast({
            title: response,
            status: true,
            type: 'success',
            message: ''
          })
          this.$refs.list.refresh()
          
        }).catch((error)=>{
          // console.log(error) 
          this.isLoadingCanje = false
          this.changeToast({
            title: error,
            status: true,
            type: 'danger',
            message: ''
          })
          this.$refs.list.refresh()
        })

      },
      onItemTap({item}){
        // this.setCoupon(item.id)
        this.coupons.forEach((e)=>{
          if(e.id == item.id){
            e.active = true
          }else{
            e.active = false
          }
        })
        // console.log(this.coupons)
      }
    }
    
  };
</script>

<style lang="scss" scoped>
// Start custom common variables
@import "@nativescript/theme/scss/variables/blue";
// End custom common variables

// Custom styles
</style>
