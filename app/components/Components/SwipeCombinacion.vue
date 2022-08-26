<template lang="html">

  <StackLayout 
    ref="dropBottom" 
    @swipe="onSwipe" 
    class="drop" 
    height="0" 
    width="100%" 
    row="2" 
  >
    <GridLayout padding="0 16 8 16" rows="auto,*, auto">
      <StackLayout
        row="0"
        marginTop="16"
        backgroundColor="#8e8e8e" 
        width="60" 
        height="4" 
        borderRadius="40" 
        marginBottom="8"
      />

      <StackLayout  row="1" marginTop="8" >
        <GridLayout columns="*,auto" height="50" backgroundColor="" >
          <label col="0" backgroundColor="" v-if="combinacion" :text="combinacion.descripcion" margin="10 0 0 0" paddingRight="24" fontSize="14" fontWeight="900" />

          <FlexboxLayout v-if="combinacion.combinacion_key != null && combinacion.combinacion_key > 0" @tap="deleteCombinacion" backgroundColor="" col="1" alignItems="center" justifyContent="center" width="40" height="40" margin="0 0 0 0" class="btn btn-icon">
            <Image 
              src="~/assets/icons/trash_red.png" 
              width="15" 
              height="10" 
              
            />
          </FlexboxLayout>
        </GridLayout>
        

        <label text="Elegí un talle" margin="8 0 8 0" fontSize="12" fontWeight="900" />
        <Talles
          row="1"
          v-if="combinacion.sizes.length"
          :talles="combinacion.sizes"
          v-model="combinacion.talleActive"
        />
        <label text="Elegí un color" margin="8 0 8 0" fontSize="12" fontWeight="900" />
        <Colores
          row="2"
          v-if="combinacion.colors.length"
          :colores="combinacion.colors"
          v-model="combinacion.colorActive"
        />
        <label text="Elegí una cantidad" margin="16 0 8 0" fontSize="12" fontWeight="900" />
        <Count v-if="reset" v-model="combinacion.cantidad" />

      </StackLayout>

      <StackLayout row="2">
        <button v-if="combinacion.combinacion_key == null" @tap="onAddCombinacion" text="Agregar" class="btn btn-primary btn-sm outline" />
        <button v-if="combinacion.combinacion_key != null" @tap="onAddCombinacion" text="Editar" class="btn btn-primary btn-sm outline" />
      </StackLayout>
    </GridLayout>
    

  </StackLayout>

</template>
<script>

  import Talles from '~/components/Pages/Product/Talles'
  import Colores from '~/components/Pages/Product/Colores'
  import Count from '~/components/Components/modules/count'
  import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'
  import { screen } from "@nativescript/core/platform"
  export default {
    props:{
      show:{
        type: Boolean,
        default: false
      },
      heightDrop:{
        type: Number,
        default: 460
      },
      isProduct:{
        type: Boolean,
        default: false
      }
    },
    components:{
      Talles,
      Colores,
      Count
    },
    watch:{
      show(to){
        if(to){
          this.openDropBottom()
        }
      }
    },
    data() {
      return {
        openDrop: false,
        reset: false
      };
    },
    computed:{
      ...mapState('car',['combinacion']),
      statusDrop: {
        get: function () {
          return this.show;
        },
        set: function (v) {
          // this.toggleSwitchMenu(v);
        },
      },
      // heightDrop(){
      //   return ( screen.mainScreen.heightDIPs - 120 )
      // }
    },
    mounted(){
      // alert(screen.mainScreen.heightDIPs)
    },
    methods:{
      ...mapMutations('car',['clearCombinacion','addCombinacion']),
      openDropBottom(){
        this.openDrop = true
        let height = this.heightDrop
        this.$refs.dropBottom.nativeView.animate({
          height: height,
          duration: 250
        })
        this.reset = false
        setTimeout(()=>{
          this.reset = true
          this.$forceUpdate()
        },100)
      },
      closeDropBottom(){
        this.openDrop = false
        this.$refs.dropBottom.nativeView.animate({
          height: 0,
          duration: 250
        })
        this.$emit('close', false)
        this.clearCombinacion()
      }, 
      onSwipe({view, object, type, direction}){
        if(direction == 4){
          this.openDropBottom()
        }
        if(direction == 8){
          this.closeDropBottom()
        }
      },
      onAddCombinacion(){
        if(this.combinacion.talleActive != '' && 
           this.combinacion.colorActive != ''){

          this.$emit('addCombinacion',this.combinacion)
          this.closeDropBottom()
        }else{
          alert('Talle y color son requeridos')
        }
      },
      deleteCombinacion(){
        this.$emit('deleteCombinacion',this.combinacion)
        this.closeDropBottom()
      },
    }
  }
</script>

<style lang="scss" scoped>
    // Start custom common variables
    @import "@nativescript/theme/scss/variables/blue";
    // End custom common variables
</style>
