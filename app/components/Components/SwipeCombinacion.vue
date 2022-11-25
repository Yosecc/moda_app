<template lang="html">
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
        <StackLayout  col="0" v-if="!combinacion.sizes.length"  class="label_skeleton"  width="100%" height="20" />

        <FlexboxLayout 
          v-if="combinacion.combinacion_key != null && !isProduct" 
          @tap="deleteCombinacion" 
          col="1" 
          alignItems="center" 
          justifyContent="center" 
          width="40" 
          height="40" 
          margin="0" 
          class="btn btn-icon"
          borderWidth=".5"
          borderColor="#4D4D4D"
        >
          <Image 
            src="~/assets/icons/trash.png" 
            width="25" 
            height="25" 
          />
        </FlexboxLayout>
      </GridLayout>
      
      <StackLayout padding="0" margin="0" v-if="combinacion.sizes.length">
        <label text="Elegí un talle" margin="8 0 8 0" fontSize="12" fontWeight="900" />
        <Talles
          :talles="combinacion.sizes"
          v-model="combinacion.talleActive"
          ref="talles"
        />
      </StackLayout>

        <StackLayout v-if="!combinacion.sizes.length" width="100%" marginTop="0">
          <StackLayout class="label_skeleton"  width="40%" height="20" marginBottom="8" horizontalAlignment="left" />
          <StackLayout orientation="horizontal">
            <StackLayout
              v-for="i in 4"
              :key="`c${i}`"
              class="label_skeleton" 
              
              height="40"
              width="40"
              marginRight="16"
              borderRadius="5"
            />
          </StackLayout>
        </StackLayout>

      <StackLayout padding="0" margin="0" v-if="combinacion.colors.length">
        <label text="Elegí un color" margin="8 0 8 0" fontSize="12" fontWeight="900" />
        <Colores
          row="2"
          :colores="colores"
          v-model="combinacion.colorActive"
        />
      </StackLayout>

        <StackLayout v-if="!combinacion.colors.length" width="100%"  marginTop="24">
          <StackLayout class="label_skeleton"  width="40%" height="20" marginBottom="8" horizontalAlignment="left" />
          <StackLayout orientation="horizontal">
            <StackLayout
              v-for="i in 5"
              :key="`c${i}`"
              class="label_skeleton" 
              
              height="40"
              width="40"
              marginRight="16"
              borderRadius="100%"
            />
          </StackLayout>
        </StackLayout>

      <StackLayout padding="0" margin="0" v-if="combinacion.sizes.length">
        <label text="Elegí una cantidad" margin="16 0 8 0" fontSize="12" fontWeight="900" />
        <Count v-if="reset" v-model="combinacion.cantidad" />
      </StackLayout>

        <StackLayout v-if="!combinacion.sizes.length" width="100%" marginTop="24">
          <StackLayout class="label_skeleton"  width="30%" height="20" marginBottom="8" horizontalAlignment="left" />
          <StackLayout class="label_skeleton"  width="40%" height="40" horizontalAlignment="left" />
        </StackLayout>

    </StackLayout>

    <StackLayout  row="2">
      <button v-if="isNew == null"  @tap="onAddCombinacion" text="Agregar" class="btn btn-primary btn-sm outline" />
      <button v-else @tap="onEditCombinacion" text="Editar" class="btn btn-primary btn-sm outline" />
    </StackLayout>
    <StackLayout row="2" v-if="!combinacion.sizes.length" class="label_skeleton"  width="100%" height="40" marginBottom="8" />

  </GridLayout>
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
      },
      isNew:{
        type: Number,
        default: null
      },
      models:{
        type: Array,
        default: []
      }
    },
    components:{
      Talles,
      Colores,
      Count
    },
    watch:{
      models(to){
        //console.log('cambio models')
      },
      combinacion(to){
        //console.log('cambio combinacion')
      },
      show(to){
        //console.log('cambio show')
        this.$forceUpdate()
        if(to){
          this.openDropBottom()
        }else{
           this.clearCombinacion()
        }
      }
    },
    data() {
      return {
        openDrop: false,
        reset: true
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
      colores(){
        
        if(this.models && this.combinacion.talleActive!=''){

          let models = this.models.find((e)=>e.size == this.combinacion.talleActive)
          
          let colors = []
          models.properties.forEach((x)=>{
            colors.push(this.combinacion.colors.find((e)=> e.id == x.color_id))
          })

          let colorIndex = colors.findIndex((e)=>e.code == this.combinacion.colorActive)

          if(colorIndex == -1 && this.isProduct){
            this.combinacion.colorActive = ''
            this.$forceUpdate()
          }

          return colors
        }

        return this.combinacion.colors
      },
      // boton(){
      //   if(this.isProduct){

      //   }
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
        this.reset = false
        setTimeout(()=>{
          this.reset = true
          this.$forceUpdate()
        },100)
      },
      closeDropBottom(){
        this.openDrop = false
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
      onEditCombinacion(){
        this.$emit('editCombinacion',this.combinacion)
        this.closeDropBottom()
      },
      onAddCombinacion(){
        if(this.combinacion.talleActive != '' && 
           this.combinacion.colorActive != ''){
          // console.log('this.combinacion', this.combinacion)
          this.$emit('addCombinacion',this.combinacion)
          this.closeDropBottom()
        }else{
          alert('Talle y color son requeridos')
        }
      },
      async deleteCombinacion(){
        // console.log('delete',this.combinacion)
        // await this.deleteModelo(this.combinacion.cart_id)
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
