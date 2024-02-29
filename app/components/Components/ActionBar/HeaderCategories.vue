<template lang="html">

    <ActionBar>
      
      <GridLayout
        columns="auto,auto,*" 
        rows="*" 
        marginTop="10"
        marginBottom="5"
        paddingLeft="0"
        :marginLeft="-16"
        minHeight="60"
      >
        <BtnMenu
          v-show="!back" 
          col="0"
          horizontalAlignment="left" 
          :marginLeft="-8"
        ></BtnMenu>
        
        <BtnBack
          v-show="back"
          col="0"
          horizontalAlignment="left" 
          :marginLeft="-8"
        ></BtnBack>


          <StackLayout col="1" orientation="horizontal">
            <Label  horizontalAlignment="left" margin="0" padding="0" text="Tiendas: " textTransform="uppercase" fontWeight="900" fontSize="16" />
            <Label  horizontalAlignment="left" margin="0" padding="0" :text="categorie.name" textTransform="uppercase" fontWeight="900" fontSize="16" />
          </StackLayout>

        
        <StackLayout
          orientation="horizontal"
          col="2" 
        >
      
        <BtnCar
          row="0"
          col="2"
          horizontalAlignment="right"
        ></BtnCar>


          
          <!-- <Image 
            src="~/assets/icons/bell.png" 
            padding="0"
            width="32"
            height="32"
            opacity=".05"
          /> -->
        </StackLayout>
      </GridLayout>
     
    </ActionBar>
 
</template>

<script>

// import { Utils, Device } from '@nativescript/core'
import BtnBack from './BtnBack.vue'
import BtnMenu from './BtnMenu.vue'
import BtnCar from './BtnCar.vue'
import StoreBox from '~/components/Components/Boxes/StoreBox.vue'
import { mapMutations, mapState, mapGetters } from 'vuex'

  export default {
    props:{
      back:{
        type: Boolean,
        default: false
      },
      categorie:{
        type: Object,
        default: {}
      }
    },
    components:{
      BtnMenu,
      BtnBack,
      BtnCar,
      StoreBox
    },
    filters: {
      moneda: function (value) {
        value += '';
        var x = value.split('.');
        var x1 = x[0];
        var x2 = x.length > 1 ? '.' + x[1] : '';
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1)) {
          x1 = x1.replace(rgx, '$1' + '.' + '$2');
        }
        return '$'+ x1 + x2;
      }
    },
    data() {
      return {
        message: "<!-- Browse page content goes here -->",
        searchQuery: ''
      };
    },
    computed:{
      ...mapState(['page']),
      ...mapGetters('authentication',['token'])
    },
    mounted(){
      // console.log('categorie',this.categorie)
      if (global.isIOS) {
        // frame.topmost().nativeView.endEditing(true); 
      } 
      if (global.isAndroid) {
        // console.log('llega')
      } 
    },
    methods:{
      ...mapMutations(['changePage']),
      onSearch(){
        // console.log('click')
        // this.changePage(1)
      },
      loadedSB: function(args){
        // setTimeout(() => {
        //   Utils.ad.dismissSoftInput(); 
        // }, 200)
      }
    }
   
  }
</script>

<style lang="scss" scoped>
    // Start custom common variables
    @import "@nativescript/theme/scss/variables/blue";
    // End custom common variables
    .input{
        background: white;
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
