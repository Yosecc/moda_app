<template lang="html">

    <FlexboxLayout v-if="tallesComputed.length" height="20" backgroundColor="">
        <label 
            v-for="(talle, key) in tallesComputed" 
            :key="`talle-${product_id}-${key}`" 
            class="circle talle"
            :class="calculoClases(key, talle)" 
            :text="talle"
        />
        <label 
            :key="`talleextra-${product_id}`" 
            class="circle talle negativo"
            :text="`+${cantidadRestante}`"
            v-if="cantidadRestante>0"
        />
    </FlexboxLayout >
    
    </template>
    
    <script>
      export default {
       
        props:{
            talles:{
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
            tallesComputed(){
                let d = []
                if(this.talles.length){
                    this.talles.forEach((e,i)=>{
                        if(i < 4){
                            d.push(e)
                        }
                    })
                }
                return d
            },
            cantidadRestante(){
                if(this.talles.length){
                    return this.talles.length - this.tallesComputed.length
                }
                return  0
            }
        },
        methods:{
            calculoClases(key, talle){
                let clases = ''
                if(key > 0){
                    clases += 'negativo'
                }
                // let list = ['#FFFFFF','#ffffff','white'];
                if(talle.length > 3){
                    clases += ' cuadrado'
                }
                return clases
            },
            calculoText(key, talle){
                if(this.cantidadRestante > 0 && (key+1) == this.tallesComputed.length){
                    return `+${this.cantidadRestante}`
                }
                return talle
            }
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
    