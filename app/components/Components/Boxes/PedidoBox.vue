<template>
    <StackLayout
        backgroundColor="#EEEEEE"
        padding="16"
        marginBottom="16"
        borderRadius="8"
    >
        <GridLayout columns="*,auto">
            <Label fontSize="12" textWrap="true" row="0" marginBottom="0">
                <FormattedString>
                <Span text="Compra " />
                <Span :text="`#${item.id}`" fontWeight="bold" />
                </FormattedString>
            </Label>
            <Label :text="statusName" margin="0" fontSize="12" textTransform="uppercase" class="" :color="statusColor" borderWidth="0.5" :borderColor="statusColor" col="1" fontWeight="900" />
        </GridLayout>

        
        <GridLayout columns="*,auto" rows="auto, *" borderWidth="0.5" borderColor="#BDBDBD" padding="8"  marginTop="8">
            <FlexboxLayout row="0" col="0" alignItems="center" >
                <ImageCache 
                    placeholderStretch="aspectFill"
                    placeholder="res://eskeleton"
                    :src="item.store_brand"
                    width="40"
                    height="40"
                    stretch="aspectFill"
                    marginRight="8"
                    class="storeBox"
                /> 
                <Label horizontalAlignment="left" margin="0 8 0 0" textWrap padding="0" :text="`${item.store_name}`" textTransform="capitalize" fontWeight="900" fontSize="18" />
            </FlexboxLayout >
            <Label :text="item.total_purchase | moneda" row="0" col="1" fontWeight="900" />

            <StackLayout col="0" colSpan="2" row="1">

                <Label horizontalAlignment="left" textWrap :text="`Productos`" fontWeight="800" fontSize="12" />

                <StackLayout v-for="(i, ke) in item.details" :key="`pro_${item.id}_${ke}`">
                    <FlexboxLayout row="0" col="0" alignItems="center" >
                    
                        <ImageCache 
                            placeholderStretch="aspectFill"
                            placeholder="res://eskeleton"
                            :src="i.image"
                            width="40"
                            height="40"
                            stretch="aspectFill"
                            marginRight="8"
                            class="storeBox"
                        /> 
                        <Label horizontalAlignment="left" margin="0 8 0 0" textWrap padding="0"  fontWeight="400" fontSize="12">
                            <FormattedString>
                            <Span :text="`${i.name} `" />
                            <Span :text="` (x${i.amount}) `" />
                            </FormattedString>
                        </Label>
                        
                    </FlexboxLayout >
                </StackLayout>

            </StackLayout>

        </GridLayout>

        <label @tap="onViewTap" textAlignment="center" :text="'Ver compra'" class="label_enlace" col="1" fontWeight="900" />

    </StackLayout>
</template>
  
<script>
    import pedidosMixin from '~/mixins/pedidosMixin';
    export default {
        mixins:[pedidosMixin],
        props:{
            item:{
                type: Object,
                required: true
            },
            billing:{
                type: Object
            }
        },
        
        watch:{
        },
        
        mounted(){
  
        },
        components:{
  
        },
        computed:{
            
        },
        methods:{
            onViewTap(){

                this.$navigator.navigate('/pedido', { 
                        fullscreen: true, 
                        id: 'pedido', 
                        props:{
                            item: this.item,
                            billing:this.billing
                        } 
                    })

            }, 
            
        }
    }
  </script>

  