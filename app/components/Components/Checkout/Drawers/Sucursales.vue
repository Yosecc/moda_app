<template lang="html">
  
  <GridLayout rows="auto, *" padding="0 16">
    <TextField 
      row="0"
      height="40"
      v-model="code_postal" 
      class="inputForm" 
      hint="Ingresá tu código postal acá" 
      keyboardType="number"
      @returnPress="onSearchSucursales"
    />

    <RadListView 
      row="1"
      ref="listSucursales"
      class="listSucursales"
      for="item in listSucursales"
      @itemTap="onItemSelected"
      v-if="listSucursales.length && !loading"
    >   
      <v-template>
        <StackLayout 
          borderBottomWidth=".5"
          borderColor="#4D4D4D" 
          orientation="horizontal"
        >
          <ImageCache 
            stretch="aspectFill" 
            width="60"
            height="60"
            placeholderStretch="aspectFill"
            placeholder="res://eskeleton"
            :src="(item.provider == 'oca' || item.provider == 'OCA') ? '~/assets/icons/oca_logo.png':'~/assets/icons/ca_logo.png'"
            rounded="true"
            borderWidth=".5"
            borderColor="#4D4D4D"
          />
          <StackLayout>
            <Label fontSize="16" textWrap :text="item.label" margin="0" padding="0" />
            <Label :text="item.price | moneda" fontWeight="800" fontSize="18" color="#DA0080"/>
          </StackLayout>
        </StackLayout>
      </v-template>
    </RadListView>
    <StackLayout row="1" v-else>
      <ActivityIndicator marginTop="30" busy="true" color="#DA0080" v-if="loading"/>
      <Label 
        v-if="message"
        :text="message"
        fontWeight="100"
        fontSize="30"
        marginTop="30"
        textWrap
        textAlignment="center"
      />
    </StackLayout>

  </GridLayout columns="auto, *">
     
</template>

<script>
  import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
  import { ObservableArray } from '@nativescript/core/data/observable-array';
  import helpersMixin from '~/mixins/helpersMixin.js'

  export default {
    mixins: [helpersMixin],
    model: {
      prop: 'sucursal',
      event: 'change'
    },
    props: {

    },
    components: {
      
    },
    filters: {
      
    },
    data() {
      return {
        listSucursales: [],
        code_postal:"",
        message: '',
        loading: false
      };
    },
    watch:{
    },
    computed:{
      ...mapState('checkout',['group_id']),

    },
    mounted(){
    },
    methods:{
      ...mapActions('checkout',['searchSucursales']),
      onSearchSucursales(){
        this.listSucursales = []
        this.loading = true
        this.searchSucursales({
          group_id: this.group_id,
          zipcode: this.code_postal
        }).then((e)=>{
          this.loading = false
          console.log('sera que pasa por aqui')
          this.listSucursales = new ObservableArray(e)
          this.$refs.listSucursales.refresh()
        }).catch((error)=>{
          this.loading = false
          error = JSON.parse(error)
          console.log('por aqui si debe pasar', error)
          this.message = error.message
        })
      },
      onItemSelected({ item }) {
        item.zipcode = this.code_postal 
        this.$emit('change', item)
        this.listSucursales = []
        this.code_postal = ''
        this.$emit('closeDrawer')
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
