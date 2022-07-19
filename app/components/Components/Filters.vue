<template lang="html">

    
<GridLayout 
  columns="1*, 1*" 
  rows="1*" 
  marginTop="6"
>

  <StackLayout
    orientation="horizontal"
    row="0" 
    col="0"
    class="" 
  >

      <Image 
        src="~/assets/icons/IconFilter.png"
        padding="0"
        horizontalAlignment="left"
        width="18"
        marginRight="3"
        marginLeft="2"
      />
      <label 
        text="Filtrar"
        color="#0080DA"
        marginRight="5"
      />
      <!-- <Image 
        src="~/assets/icons/arrow_simple_bottom.png"
        padding="0"
        horizontalAlignment="left"
        width="12"   
      /> -->
    </StackLayout>
    <!-- <StackLayout
      orientation="horizontal"
      horizontalAlignment="right" 
      row="0" 
      col="1"
      class="" 
    >
    
      <GridLayout 
        verticalAlignment="center"
        horizontalAlignment="right" 
        height="18" 
        width="18"
        borderWidth="2"
        borderColor="red"
        backgroundColor="#540171"
        borderRadius="45">
      </GridLayout>
    </StackLayout> -->
  
</GridLayout>
  

</v-template>
</template>

<script>
export default {
  props: {},

  components: {},
  filters: {
    moneda: function (value) {
      value += "";
      var x = value.split(".");
      var x1 = x[0];
      var x2 = x.length > 1 ? "." + x[1] : "";
      var rgx = /(\d+)(\d{3})/;
      while (rgx.test(x1)) {
        x1 = x1.replace(rgx, "$1" + "." + "$2");
      }
      return "$" + x1 + x2;
    },
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
// Start custom common variables
@import "@nativescript/theme/scss/variables/blue";
// End custom common variables
.circle{
  background-color: red;
  border-radius: 100%;
  width:"20";
  height:"20";
}
// Custom styles
</style>
