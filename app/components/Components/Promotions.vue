<template lang="html">

  <ScrollView orientation="horizontal" scrollBarIndicatorVisible="false">
    <StackLayout
      paddingLeft="16" 
      orientation="horizontal" 
      ref="ofertasCont"
      >
      <ImageCache 
        v-for="(item, key) in ofertasComputed"
        :key="`ofert-${key}`"
        stretch="aspectFill"
        placeholderStretch="aspectFill"
        borderRadius="10"
        placeholder="res://eskeleton"
        :src="item.img"
        width="170"
        height="80"
        marginRight="8"
      /> 
      <!-- <Image
        v-for="(item, key) in ofertasComputed"
        :key="`ofert-${key}`"
        :src="item.img"
        borderRadius="10"
        marginRight="8"
        stretch="aspectFill"
        height="80"
        @tap="webview(item)"
      /> -->
    </StackLayout>
  </ScrollView>

</template>

<script  >


import { mapMutations, mapState, mapActions } from 'vuex'
  export default {
    props:{
      
    },
    data() {
      return {
     listOfItems: [{text:'nmabe'},{text:'nmabe'},{text:'nmabe'}]
      };
    },
    watch:{
      async ofertas(to){
        // console.log('cambio ofertas')
        await this.$nextTick()
        // this.$refs.ofertasCont.nativeView.refresh(); 
      }
    },
    computed:{
      ...mapState(['isLoadPage','ofertas']),
      ...mapState('products',['count']),
      ...mapState('categories',['categorieActive']),
      ofertasComputed(){

        return this.ofertas.filter((e)=> e.categories.includes(this.categorieActive))
        // return this.ofertas
      }

    },
    methods:{
      webview(item){
        // console.log(item)
        this.$navigator.navigate('/web_view',{
          transition: {
            name: 'slideLeft',
            duration: 300,
            curve: 'easeIn'
          },
          props: {
            link: item.link
          }
        })
      },
    }
  }
</script>

<style lang="scss" scoped>
    // Start custom common variables
    @import "@nativescript/theme/scss/variables/blue";
    // End custom common variables


</style>
