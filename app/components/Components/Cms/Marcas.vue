<template lang="html">
    <FlexboxLayout 
        flexWrap="wrap"
        :id="block.tunes.anchorTune!=undefined ? block.tunes.anchorTune.anchor: ''"
        :justifyContent="block.data.centrar != undefined ? block.data.centrar :'' " 
        :background="block.tunes.configTune.backgroundColor != undefined ? block.tunes.configTune.backgroundColor : ''"
        :padding="configTuneExapandir(block.tunes) ? '0' : '0'"
    >
    
    <CollectionView
               
                :items="marcas"
                colWidth="33.33%"
                rowHeight=""
               
                row="1"
                col="0" 
                colSpan="2"
              
            >
                <v-template  >
                  <FlexboxLayout backgroundRepeat="no-repeat" backgroundSize="cover"  justifyContent="center" alignItems="center" padding="0">
                    <ActivityIndicator v-if="item.load" horizontalAlignment="center" verticalAlignment="center" busy="true" color="#E9418A" />
                    <Image  v-else @tap="onRedirect(item)" :src="item.logo" stretch="aspectFit" width="100%"  />
                  </FlexboxLayout>
                </v-template>
            </CollectionView>
        <!-- <StackLayout
            v-for="(item, key) in marcas"
            :key="`marca-${key}`"
            :class="`col-4 offset-${item.offset}`"
            @tap="onRedirect(item,key)"
        >
        <Image  :src="item.logo" stretch="aspectFit" width="100%"  />
        <ActivityIndicator v-show="item.load" horizontalAlignment="center" verticalAlignment="center" busy="true" color="#E9418A" />
            
        </StackLayout> -->
    </FlexboxLayout>
   
  </template>
    
  <script>
    import cmsMixin from '~/mixins/cmsMixin.js'
    import redirectMixin from '~/mixins/redirectMixin.js'
    import { mapMutations, mapActions, mapState, mapGetters } from 'vuex'
  
    export default {
      mixins:[ cmsMixin, redirectMixin ],
      props:{
        block: {},
        categoriesBase: null
      },
      components:{
        
      },
      data() {
        return {     
          bloque: this.block
        };
      },
      watch:{  
        ruta(to){
          this.bloque.data.marcas = this.bloque.data.marcas.map( element => {
                  element.load = false
                  return element
                })
        }
      },
      computed:{
        ruta(){
        return this.$navigator.path
      },
        marcas(){
            if(this.bloque.data.marcas!=undefined){
                return this.bloque.data.marcas.map( element => {
                  element.load = false
                  return element
                })
            }
            return []
        },
        // configImageSlider(){
        //   if(this.block.data.config != undefined){
        //     if(this.block.data.config.isSlider != undefined){
        //       return this.block.data.config.isSlider
        //     }
        //   }
        //   return false
        // }
      },
      mounted(){
        console.log('cupones', this.bloque.marcas )
      },
      methods:{
        onRedirect(item){
          // console.log('this.bloque.marcas[key]',this.bloque)
          // this.bloque.data.marcas[key].load = true
          const index = this.bloque.data.marcas.findIndex( element => element.id == item.id)
          this.bloque.data.marcas[index].load = true
          
          console.log(item)
          this.redirect({
            route: 'store',
            params: item
          })
          // console.log('on', this.menuPage)
        }
       
        
      }
    }
  </script>
    