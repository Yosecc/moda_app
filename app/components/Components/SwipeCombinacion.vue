<template lang="html">
  <StackLayout>
      <FlexboxLayout justifyContent="center" alignItems="center" width="100%" height="40" @swipe="onSwipe" >
        <StackLayout
          width="100"
          height="6"
          borderRadius="10"
          background="#7B7B7B"
          row="0"
        />
      </FlexboxLayout>
      <ScrollView>
        <GridLayout padding="16"  rows="*, auto">

          <StackLayout  row="0" marginTop="8" >

            <FlexboxLayout height="100%"  flexDirection="column" justifyContent="center" alignItems="space-between">
            
              <StackLayout borderBottomWidth=".5" borderColor="#8e8e8e" padding="0 0 8 0" margin="0 8 16 8" width="100%" v-if="combinacion.sizes.length">
                <label text="Elegí un talle" textWrap margin="0 16 24 0"  textAlignment="left" fontSize="16" fontWeight="200" />
                <Talles
                  :talles="combinacion.sizes"
                  v-model="combinacion.talleActive"
                  ref="talles"
                />
              </StackLayout>

              <StackLayout ref="contentColores"  minHeight="120" borderBottomWidth=".5" borderColor="#8e8e8e" padding="8 0 0 0" margin="0 8 16 8" width="100%"  v-if="combinacion.colors.length">
                <label :text="`Elegí un color`" textWrap margin="8 16 24 0" textAlignment="left" fontSize="16" fontWeight="200" />
                <Colores
                  row="2"
                  :colores="colores"
                  v-model="combinacion.colorActive"
                  @change="changeColor"
                  v-if="reloadColor"
                />
              </StackLayout>
            
              <StackLayout padding="0" margin="8 8 24  8" width="100%" v-if="combinacion.sizes.length">
                <label text="Elegí una cantidad" textWrap margin="8 16 24 0" textAlignment="left" fontSize="16" fontWeight="200" />
                <Count v-if="reset" v-model="combinacion.cantidad" />
              </StackLayout>
            </FlexboxLayout>


          </StackLayout>

          <GridLayout columns="auto, *, auto" paddingLeft="8" row="1">

            <price
              col="0"
              :price="product.price"
              :prev_price="product.prev_price"
              :priceOffert="product.is_desc ? product.is_desc:false"
              :isProduct="false"
              :isPriceTachado="false"
              :priceForce="calculaPrecio"
              marginRight="0"
            /> 

            
            
            <StackLayout padding="0" margin="0" col="1">
              
              <button v-if="!edit"  @tap="onAddCombinacion" text="Agregar" class="btn btn-primary btn-sm outline" />
              <button v-else @tap="onEditCombinacion" text="Editar" class="btn btn-primary btn-sm outline" />
            </StackLayout>

            <FlexboxLayout
              justifyContent="center"
              alignItems="center"
              width="40"
              height="40"
              col="2"
              v-if="edit"
              @tap="deleteCombinacion"
            >
              <image src="~/assets/icons/trash.png" stretch="aspectFit" width="30" margin="0" />
            </FlexboxLayout>

          </GridLayout>

          <!-- <StackLayout row="2" v-if="!combinacion.sizes.length" class="label_skeleton"  width="100%" height="40" marginBottom="8" /> -->

          </GridLayout>
      </ScrollView>
    </StackLayout>
</template>
<script>

  import Talles from '~/components/Pages/Product/Talles'
  import Colores from '~/components/Pages/Product/Colores'
  import Count from '~/components/Components/modules/count'
  import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'
  import { screen } from "@nativescript/core/platform"
  import helpersMixin from '~/mixins/helpersMixin.js'
  import { GestureTypes, SwipeGestureEventData, Label } from '@nativescript/core'
  
  import price from '~/components/Components/modules/price'
  
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
      },
      product: {
        type: Object, 
        default: {
          image: '',
          code: '',
          name: '',
          category: '',
          price: '',
          prev_price: '',
          is_desc: '',
        }
      },
      
    },
    components:{
      Talles,
      Colores,
      Count,
      price
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
      colores(){
        if(this.combinacion.colors.length){
          setTimeout(()=>{
            console.log('cambiaron los colores', this.$refs.contentColores.nativeView)
          },500)
        }
      }
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
        console.log('koi',this.product,this.talleSelect)
        // if(this.talleSelect && this.talleSelect.properties != undefined){
        //   // console.log('tyu',this.talleSelect.properties[0])
        //   if(this.talleSelect.properties[0].price == undefined){
        //     this.changeToast({
        //           title: 'Combinación no disponible',
        //           status: true,
        //           type: 'danger',
        //           message: ''
        //       })
        //       this.combinacion.colorActive = ''
        //       return
        //   }
          // let price = 0;
          
          let price = this.talleSelect ? this.talleSelect.price : 0
        //   console.log('koia',price)
        //   if([0,null,undefined,'',false,'0'].includes(price)){
        //     price = this.talleSelect.price
        //   }

          if(this.combinacion.cantidad > 1){
            price = price * this.combinacion.cantidad
          }
          return price
        // }
        // return ''
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
      onSwipe(args){
        console.log('ddd',args.direction)
        if(args.direction == 8){
          // this.$emit('closeDrawer')
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
