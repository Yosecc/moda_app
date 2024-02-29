<template lang="html">

    <RadListView 
        :ref="`color${product_id}`"
        :id="`color${product_id}`"
        v-if="colorsComputed.length" 
        :items="colorsComputed"
        height="20"
        orientation="horizontal"
    >
        <v-template>
            <label 
                :backgroundColor="item.code"
                class="circle"
                :class="calculoClases($index, item.code)" 
                :text="cantidadRestante > 0 && ($index+1) == colorsComputed.length ? `+${cantidadRestante}`:''"
            />
        </v-template>
    </RadListView>
<!-- <FlexboxLayout v-if="colorsComputed.length" height="20" backgroundColor="" >
    <label 
        v-for="(color, key) in colorsComputed" 
        :key="`color-${product_id}-${key}`" 
        :backgroundColor="color.code"
        class="circle"
        :class="calculoClases(key, color.code)" 
        :text="cantidadRestante > 0 && (key+1) == colorsComputed.length ? `+${cantidadRestante}`:''"
    />
</FlexboxLayout > -->

</template>

<script>
  export default {
   
    props:{
        colors:{
            type: Array,
            default: []
        },
        product_id:{
            type: String,
            default: 0
        }
    },
    filters: {
    
    },
    data() {
      return {
          
      };
    },
    mounted(){
       
    },
    computed:{
        colorsComputed(){
            let d = []
            if(this.colors.length){

                this.colors.forEach((e,i)=>{
                    if(i < 4){
                        d.push(e)
                    }
                })
            }
            return d
        },
        cantidadRestante(){
            if(this.colors.length){
                return this.colors.length - this.colorsComputed.length
            }
            return 0
        }
    },
    methods:{
        calculoClases(key, code){
            let clases = ''
            if(key > 0){
                clases += 'negativo'
            }
            let list = ['#FFFFFF','#ffffff','white'];
            if(list.includes(code)){
                clases += ' negro'
            }
            return clases
        },
        
    }
  }
</script>

<style lang="scss" scoped>
    // Start custom common variables
    @import "@nativescript/theme/scss/variables/blue";
    // End custom common variables

    // Custom styles
.modelo_item_prc{
  background: blue;
}
</style>
