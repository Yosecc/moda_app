<template>
	<StackLayout
            paddingLeft="8"
            paddingRight="8"
          >
	<StackLayout 

    orientation="horizontal" 
    class="card">

    <StackLayout 
      borderRadius="8"
      padding="2 4" 
      :backgroundColor="item.color"
      class="bg"
      backgroundImage="~/assets/cupon_bg.png" >
      <Label 
        color="white"
        fontSize="11"
        :text="item.span" />
      <Label 
        class="title"
        fontSize="25"
        color="#f5f5f5"
        :text="item.monto | moneda" />
      <Label 
        color="white"
        fontSize="10"
        :text="item.vencimiento" />
    </StackLayout>
    <StackLayout
      padding="0"
    >
      <Label 
        textWrap
        color="#4D4D4D"
        fontSize="14"
        :text="item.description" />
      <Label 
        class="label_enlace"
        fontSize="12"
        text="Marcas sin este beneficio" />
    </StackLayout>
  </StackLayout>
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
		
		}
	}
</script>

<style lang="scss" scoped>
    // Start custom common variables
    @import "@nativescript/theme/scss/variables/blue";
    // End custom common variables
		

</style>
