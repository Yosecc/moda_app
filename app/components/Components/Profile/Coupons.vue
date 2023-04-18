<template lang="html">

  <GridLayout rows="*">
    
    <RadListView row="1" :items="coupons" @itemTap="onItemTap">
      <v-template name="header">
        <StackLayout row="0" padding="8 16 8 16">
          <!--  -->
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
            <ActivityIndicator v-else busy="true" color="#DA0080" marginTop="8" />
          </StackLayout>

          <Label text="Tus cupones" fontWeight="900" fontSize="18" margin="16 0 8 0" />
        </StackLayout>
      </v-template>
      <v-template >
        <CuponBox :item="item" />
      </v-template>
    </RadListView>
  </GridLayout>
       
  
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

      };
    },
    watch:{

    },
    computed:{
      ...mapState('profile',['coupons']),
    },
    mounted(){
      this.getCoupons()
    },
    methods:{
      ...mapActions('profile',['getCoupons']),
      ...mapActions(['canjearCupon']),
      onCanjearCupon(){
        if(this.code == ''){
          alert('Código requerido')
          return
        }
        this.isLoadingCanje = true
        this.canjearCupon(this.code).then((response)=>{
          // console.log(response)
          this.isLoadingCanje = false
          this.getCoupons()
          alert(response)
          
        }).catch((error)=>{
          // console.log(error)
          this.isLoadingCanje = false
          alert(error)

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
