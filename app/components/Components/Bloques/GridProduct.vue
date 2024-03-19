<template >
    <StackLayout
        :padding="container.padding"
        :margin="container.margin"
    >
        <WrapLayout v-if="!bloque.products" width="100%">
            <StackLayout width="100%" padding="8">
              <StackLayout 
                class="label_skeleton"
                height="20" 
                width="100%"
                stretch="aspectFill" 
              />
            </StackLayout>
            <StackLayout width="50%" padding="8">
              <StackLayout 
                class="label_skeleton"
                height="300" 
                width="100%"
                stretch="aspectFill" 
              />
            </StackLayout>
            <StackLayout width="50%" padding="8">
              <StackLayout 
                class="label_skeleton"
                height="300" 
                width="100%"
                stretch="aspectFill" 
              />
            </StackLayout>
        </WrapLayout>

        <GridLayout 
            rows="auto,*,auto"
            columns="*,auto"
            padding="0"
            borderRadius="8"
            :class="card.class"
            :background="card.background" 
            
        >
            <Label row="0" col="0" colSpan="2" :text="bloque.name" fontWeight="600" fontSize="13" borderBottomWidth=".2" borderColor="#DFDFDF" padding="8 16" />
            
            <ScrollView  
                row="1"
                col="0" 
                colSpan="2" 
                v-if="!isSlider" 
                orientation="horizontal"
            >
                <StackLayout orientation="horizontal" padding="0">
                    <ProductBox
                        v-for="(item,key) in productos"
                        :key="`producto${key}`"
                        :width="productConfig.width"
                        :paddingLeft="productConfig.paddingLeft"
                        :product="item"
                        :isBorders="false"
                    ></ProductBox>
                </StackLayout>
            </ScrollView>

            <WrapLayout 
                row="1"
                col="0" 
                colSpan="2"
                width="100%"
                v-if="isSlider"
            > 

            <ProductBox
                v-for="(item,key) in productos"
                :key="`elej${key}`"
                width="50%"
                :paddingLeft="productConfig.paddingLeft"
                :product="item"
                :isBorders="false"
            ></ProductBox>

            </WrapLayout>

            <Label @tap="onTapVerMas(bloque)" col="0" row="2" text="Ver más" fontSize="12" fontWeight="200" padding="16" />
            <image @tap="onTapVerMas(bloque)" col="1" row="2" src="res://arrow_right" height="13" opacity=".5" background="" stretch="aspectFit" margin="8 16" />
        
        </GridLayout>
    </StackLayout>
</template>
          
<script>
    //
    import ProductBox from '~/components/Components/Boxes/ProductBox.vue'
    // import { mapGetters, mapState } from 'vuex'
    export default {
        props:{
            bloque:{
                type: Object,
                default(){
                    return {}
                }
            }
        },
        watch:{
        
        },
        components:{
            ProductBox
        },
        computed:{
            productos(){
                if(this.bloque && this.bloque.products && this.bloque.products!=undefined && this.bloque.products!=null){
                    return this.isProducts ? this.bloque.products : []
                }
                return []
            },
            alturaCollectionView(){
                // console.log('this.bloque.products',this.bloque.name, this.bloque.products)
                // if(this.productos!=undefined && this.productos!=null){
                    return (this.productos.length/2) * 330
                // }
                // return 330
            },
            container(){
                return{
                    padding: this.isSlider ? ( this.isCard ? '8':'16' ) :'0',
                    margin: this.isSlider  ? '':'0 0 24 0'
                }
            },
            isCard(){
                return this.bloque.config && !this.bloque.config.is_card || false
            },
            card(){
                return {
                    class: this.isCard ? '':'card outline',
                    background: this.isCard ? '':'white' 
                }
            },
            isSlider(){
                return ( this.bloque.config && !this.bloque.config.slider ) || !this.bloque.config  ? true : false
            },
            isProducts(){
                return Array.isArray(this.bloque.products)
            },
            layout(){
                return {
                    layout: this.isSlider ? 'grid':'linear',
                    orientation: this.isSlider ? 'vertical':'horizontal'
                }
            },
            productConfig(){
                return {
                    width: this.isSlider ? '':'170',
                    paddingLeft: this.isSlider ? '':'16'
                }
            },
        },
        data() {
            return {

            };
        },
        created(){
            console.log('created GRID',this.bloque)
        },
        mounted(){
        
        },
        methods:{
            itemTemplateSelector(item,index,items) {
        return 'product'
      },
            onTapVerMas(bloque){
                
                let rout = '/search'
                
                    let options = {}
                    if(bloque.type == 'filter'){
                        options.search = bloque.value
                        // options.section = []
                    }

                    if(bloque.type =='categorie'){
                        options.search = ''
                        options.section = bloque.value
                    }

                    if(bloque.type == 'search'){
                        if(bloque.redirect!=undefined){
                            rout = bloque.redirect.route
                            options = bloque.redirect.params
                        }
                    }

                    console.log('ss',options)
                    this.$navigator.navigate(rout,{
                        transition: {
                            name: 'slideLeft',
                            duration: 300,
                            curve: 'easeIn'
                        },
                        props:{
                            params: options,
                        }
                    })
                    return
                
            },
        }

    }
</script>
          
          