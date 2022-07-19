<template>
  <StackLayout
    paddingLeft="16"
    paddingRight="16"
  >

      <GridLayout class="card pedidoBox" padding="0" columns="auto,*" rows="*,*,*">
        <FlexboxLayout  
          justifyContent="space-between"
          class="header"
          col="0" 
          colSpan="2" 
         
          row="0">

          <Label :text="item.fecha" fontSize="12" class="title" />
          <Label horizontalAlignment="right" text="Ver detalle" fontSize="12" class="label_enlace" @tap="onViewTap" />

        </FlexboxLayout >
        <StackLayout col="0" row="1">
          <image 
            width="60"  
            borderRadius="8" 
            :src="item.store.logo"  />
        </StackLayout>
        <StackLayout col="1" row="1">
     
              <Label 
                :text="item.status" 
                textTransform="uppercase" 
                class="title primary" 
                fontSize="14"
                />
              <Label fontSize="14" :text="item.monto | moneda" class="title" />
              <Label fontSize="12" :text="`Pedido: #${item.id}`" class="" />
             <!-- <Label :text="item.fecha" class="" /> -->

        </StackLayout>
        <!-- <StackLayout col="1" background="" row="0">
          
        </StackLayout> -->
        <StackLayout col="0" padding="0 0 8 0" colSpan="2" row="2">
          <FlexboxLayout
            justifyContent="center"

            padding="0"
          >
            <Button 
              class="btn btn-sm btn-info btn-shadow-none" 
              text="Cargar Comprobante"
              v-if="item.actions.includes('comprobante')"
            />

              <Button 
              class="btn btn-sm btn-primary btn-shadow-none" 
              text="Pagar"
              v-if="item.actions.includes('pagar')"
            />

          </FlexboxLayout>
        </StackLayout>
      </GridLayout>

  </StackLayout>

</template>

<script>

	import { mapState, mapMutations } from 'vuex'

	export default {
		props:{
			item:{
				type: Object,
				required: true
			}
		},
		watch:{

		},
		filters: {
      moneda: function (value) {
        value += '';
        var x = value.split('.');
        var x1 = x[0];
        var x2 = x.length > 1 ? '.' + x[1] : '';
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1)) {
          x1 = x1.replace(rgx, '$1' + '.' + '$2');
        }
        return '$'+ x1 + x2;
      }
    },
		mounted(){

		},
    components:{

    },
		computed:{
		},
    data() {
      return {
      };
    },
		methods:{
		  onViewTap(){
        item.id
        this.$navigator.navigate('/pedido',this.options)
      }
		}
	}
</script>

<style lang="scss" scoped>
    // // Start custom common variables
    // @import "@nativescript/theme/scss/variables/blue";
    // // End custom common variables
		

</style>
