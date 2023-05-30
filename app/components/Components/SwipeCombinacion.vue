<template lang="html">
  <GridLayout   padding="0 16 8 16"  rows="auto,*, auto">
    <!-- <label text="sjs" height="400" width="500" background="blue" @swipe="onSwipe" ref="hu" /> -->
    <!-- <StackLayout
      row="0"
      marginTop="16"
      backgroundColor="#8e8e8e" 
      width="60" 
      height="4" 
      borderRadius="40" 
      marginBottom="8"
    /> -->

    <StackLayout row="0">
          <Image 
            src="~/assets/icons/plus.png"
            width="40"
            height="40"
            horizontalAlignment="left"
            rotate="45"
            @tap="closeDropBottom()"
          />
    </StackLayout>

    <StackLayout  row="1" marginTop="8" >
      <GridLayout columns="*,auto" height="50" backgroundColor="" >

        <StackLayout orientation="horizontal"  col="0" v-if="combinacion">
          <label :text="combinacion.descripcion" textWrap margin="10 0 0 0" paddingRight="24" fontSize="14" fontWeight="900" />
        </StackLayout>

        <StackLayout  col="0" v-if="!combinacion.sizes.length"  class="label_skeleton"  width="100%" height="20" />
        
        <FlexboxLayout 
          v-if="combinacion.combinacion_key != null && edit" 
          @tap="deleteCombinacion" 
          col="1" 
          
          alignItems="center" 
          justifyContent="center" 
          width="40" 
          height="40" 
          margin="0" 
          class="btn btn-icon"
        >
          <Image 
            src="~/assets/icons/trash.png" 
            width="25" 
            height="25" 
          />
        </FlexboxLayout>

        <!--  -->
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

      <StackLayout padding="0" margin="0" height="80" v-if="combinacion.colors.length">
        <label :text="`Elegí un color`" textWrap margin="8 0 8 0" fontSize="12" fontWeight="900" />
        <Colores
          row="2"
          :colores="colores"
          v-model="combinacion.colorActive"
          @change="changeColor"
          v-if="reloadColor"
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
      
        <FlexboxLayout justifyContent="space-between" alignItems="flex-end">
          <StackLayout padding="0" margin="0" v-if="combinacion.sizes.length">
            <label text="Elegí una cantidad" margin="16 0 8 0" fontSize="12" fontWeight="900" />
            <Count v-if="reset" v-model="combinacion.cantidad" />
          </StackLayout>
          <label row="1" col="0" :text="`${$options.filters.moneda(calculaPrecio)} c/u`" v-if="calculaPrecio != ''"  margin="0 0 10 0" paddingRight="24" fontSize="14" fontWeight="900" color="#DA0080"/>
        </FlexboxLayout>

        <StackLayout v-if="!combinacion.sizes.length" width="100%" marginTop="24">
          <StackLayout class="label_skeleton"  width="30%" height="20" marginBottom="8" horizontalAlignment="left" />
          <StackLayout class="label_skeleton"  width="40%" height="40" horizontalAlignment="left" />
        </StackLayout>

    </StackLayout>

    <StackLayout  row="2">
      <button v-if="!edit"  @tap="onAddCombinacion" text="Agregar" class="btn btn-primary btn-sm outline" />
      <button v-else @tap="onEditCombinacion" text="Editar" class="btn btn-primary btn-sm outline" />
    </StackLayout>
    <StackLayout row="3" v-if="!combinacion.sizes.length" class="label_skeleton"  width="100%" height="40" marginBottom="8" />

  </GridLayout>
</template>
<script>

  import Talles from '~/components/Pages/Product/Talles'
  import Colores from '~/components/Pages/Product/Colores'
  import Count from '~/components/Components/modules/count'
  import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'
  import { screen } from "@nativescript/core/platform"
  import helpersMixin from '~/mixins/helpersMixin.js'
  import { GestureTypes, SwipeGestureEventData, Label } from '@nativescript/core'
  
  
  export default {
    mixins:[helpersMixin],
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
      openDrop(to){
        if(this.combinacion.cantidad == 0) {
          this.combinacion.cantidad = 1
        }
      },
      models(to){
        // console.log('cambio models',to)
      },
      combinacion(to){
        //console.log('cambio combinacion')
      },
      show(to){
        // console.log('cambio show', to)
        this.$forceUpdate()
        if(to){
          // console.log('d',this.combinacion.talleActive != '' && this.combinacion.colorActive != '')
          if(this.combinacion.talleActive != '' && this.combinacion.colorActive != ''){
            this.edit = true
          }else{
            this.edit = false

          }
          this.openDropBottom()
        }else{
          
          this.clearCombinacion()
        }
      },
      
    },
    data() {
      return {
        openDrop: false,
        reset: true,
        edit: false,
        reloadColor: true
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

        let data = this.combinacion.colors

        data.forEach((e)=>{
          e.disabled = false
        })

        // console.log('primerdata', this.combinacion, this.models)

        if(this.models && this.combinacion.talleActive!='' && data.length){

          let models = this.models.find((e)=>e.size == this.combinacion.talleActive)

          let colors = []
          if(models.properties == undefined){
            alert('se quedo sin properties')
            return data
          }

          data.forEach((e)=>{
            let x = models.properties.findIndex((i)=> e.id == i.color_id)
            
            if(x == -1){
              e.disabled = true
            }

          })

          // this.combinacion.colorActive = ''
    
          this.reloadColor = false
          setTimeout(() => {
            this.reloadColor = true
          }, 1);
          

          // console.log('ujum',data)

          // return colors
        }
        
        return data
      },
      talleSelect(){
        // console.log(this.models)
        if(this.models){
          let index = this.models.findIndex((e)=> e.size == this.combinacion.talleActive)
          // console.log(this.models[index])
          if(index != -1){
            return this.models[index]
          }
        }
        return null
      },
      calculaPrecio(){
        
        if(this.talleSelect && this.talleSelect.properties != undefined){
          // console.log('tyu',this.talleSelect.properties[0])
          if(this.talleSelect.properties[0].price == undefined){
            this.changeToast({
                  title: 'Combinación no disponible',
                  status: true,
                  type: 'danger',
                  message: ''
              })
              this.combinacion.colorActive = ''
              return
          }

          let price = this.talleSelect.properties[0].price
          if([0,null,undefined,'',false,'0'].includes(price)){
            price = this.talleSelect.price
          }
          return price
        }
        return ''
      },
      t(){
        return this.combinacion.talleActive
      }
    },
    mounted(){
     
      
    },
    methods:{
      ...mapMutations('car',['clearCombinacion','addCombinacion']),
      ...mapMutations(['changeToast']),
      onSwipe(args) {
        console.log("Swipe Direction: ");
      },
      openDropBottom(){
        this.openDrop = true
        let height = this.heightDrop
        this.reset = false
        // console.log('models',this.models, this.combinacion)
        setTimeout(()=>{
          this.reset = true
          this.$forceUpdate()
        },100)
      },
      changeColor(to){
        // console.log('ki', to)
        this.combinacion.colorActive = to
        // console.log('this.combinacion hy', this.combinacion)
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
          this.combinacion.price = this.calculaPrecio
         
          this.$emit('addCombinacion',this.combinacion)
          this.closeDropBottom()
        }else{
          // alert('Talle y color son requeridos')
          this.changeToast({
                  title: 'Talle y color son requeridos',
                  status: true,
                  type: 'danger',
                  message: ''
              })
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
