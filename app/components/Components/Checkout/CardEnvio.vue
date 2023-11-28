<template lang="html">
  <StackLayout  padding="8">

    <StackLayout 
      marginBottom="8" 
      :borderWidth="envio.active ? 2:0"
      :borderColor="envio.active ? '#E9418A':''"
      class="card"

    >
      <StackLayout
        top="8"
        left="8">
        <StackLayout orientation="horizontal">
          
          <image 
            top="16"
            left="64"
            width="35"
            :src="envio.icon" 
            stretch="aspectFill" 
          /> 

          <Label 
            class="title"
            fontSize="20"
            fontWeight="900"
            margin="0 0 0 6"
            padding="0"
            
            :text="envio.title" 
          />

        </StackLayout>
        <Label 
          class="title"
          fontSize="14"
          fontWeight="600"
          textWrap="true"
          :marginBottom="envio.precios.length ? 16:''"
          :text="envio.description" 
        />

        <Label 
          v-for="(precio, key) in envio.precios"
          :key="`precio-${envio.id}-${key}`"
          v-if="envio.precios.length && !envio.isFree"
          fontSize="14"
          fontWeight="600"
          textWrap="true"
          margin="0 0 8 16"
          padding="0"
 
          :text="precio" 
        />

        <label fontSize="20" textAlignment="center" textTransform="uppercase" fontWeight="900" text="Envío gratis" v-if="envio.isFree" />

        <Label 
          fontSize="14"
          fontWeight="300"
          textWrap="true"
          marginTop="8"
   
          :text="envio.description2" 
        />

      </StackLayout>
       
    </StackLayout> 
  </StackLayout>
</template>

<script>
  export default {
    mixins: [],
    props: {
      envio:{
        type: Object,
        default: {}
      },
      altura:{
        type: Number,
        default: 150
      }
    },
    components: {
    },
    filters: {
    },
    data() {
      return {
      };
    },
    watch:{
    },
    computed:{ 
    },
    mounted(){
    },
    methods:{
    }
  };
</script>

<style lang="scss" scoped>
</style>
