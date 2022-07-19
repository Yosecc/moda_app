<template lang="html">
    <StackLayout  
      class="footer_bottom btn-car"
      :class="cartsSelected.length > 0 ? 'active':''"
    >
			<GridLayout 
        columns="*,auto" 
        rows="auto" 
      >
				<StackLayout 
          row="0" 
          col="0" 
        >	
					<Label 
						:text="textHeaderButton"
            class="btn_header"
						fontSize="11"
						v-if="true"        
					/>
					<Label 
						:text="textMontoCarros"
						class="btn_body"
						fontSize="16"
						fontWeight="Bold"
						v-if="true"
						lineHeight="0"
						margin="0"
						padding="0"
					/>
					<Label 
						text="Precios sin IVA"
            class="btn_footer"
						fontSize="10"
						lineHeight="0"
						margin="0"
						padding="0"
						fontWeight="line"
						v-if="true"
					/>
				</StackLayout>
				<Label
					row="0"
					col="1"
					text="COMPRAR"
					fontWeight="900"
					class="btn_action"
					textTransform="uppercase"
					verticalAlignment="center"
					fontSize="16"
					v-if="true"
				/>
			</GridLayout>
			
		</StackLayout>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'
  export default {
    props:{
        cars:{
          type: Array,
          required: true
        }
    },
    components:{
      
    },
    computed:{
      ...mapState('shoping_center',['cartsSelected']),
      textHeaderButton(){
          if(this.cartsSelected.length > 0){
               var txt = this.cartsSelected.length + ' Carro' 
               
               if(this.cartsSelected.length > 1){
                   txt += 's'
               }
               txt +=' seleccionado'
               if(this.cartsSelected.length > 1){
                   txt += 's'
               }
               return txt
           }else{
               return 'Seleccione los carros que desea agregar a su multienvío'
           }
      },
      montoCarros(){
          let suma = 0
          this.cars.forEach((element) => {
            if(this.cartsSelected.includes(element.id)){
              suma += element.monto
            }
          })
          return suma
      },
      textMontoCarros(){
          return 'Total: $' 
          +this.montoCarros.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&.');
      }
    },
    data() {
      return {
        detail: {
            props: ["id"],
            template: `
                <Page width="700">
                    <ActionBar title="Detail"/>
                    <StackLayout>
                        <Label :text="id" />
                        <Button @tap="$modal.close" text="Close" />
                    </StackLayout>
                </Page>
            `,
        }
        
      };
    },
    mounted(){
      
    },
    methods:{
        onButtonTap(){
            // console.log(this.$showModal(this.detail,{ fullscreen: false, props: { id: 1 } }))
        },
        // addCommas(nStr){
        //     nStr += '';
        //     var x = nStr.split('.');
        //     var x1 = x[0];
        //     var x2 = x.length > 1 ? ',' + x[1] : '';
        //     var rgx = /(\d+)(\d{3})/;
        //     while (rgx.test(x1)) {
        //         x1 = x1.replace(rgx, '$1' + '.' + '$2');
        //     }
        //     return x1 + x2;
        // }
    }
  }
</script>

<style lang="scss" scoped>
    // Start custom common variables
    @import "@nativescript/theme/scss/variables/blue";
    // End custom common variables
    
    // Custom styles

</style>
