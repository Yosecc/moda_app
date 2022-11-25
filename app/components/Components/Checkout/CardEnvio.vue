<template lang="html">
  <StackLayout  padding="8">

    <StackLayout 
      marginBottom="8" 
      :backgroundColor="envio.active ? envio.color:''"
      class="card"

    >
      <!-- <AbsoluteLayout height="100%" width="100%" > -->

        <!-- -->

          <StackLayout
            top="8"
            left="8">
            <StackLayout orientation="horizontal">
              
              <image 
                top="16"
                left="64"
                width="35"
                :src="envio.active ? `${envio.icon}_white`:envio.icon" 
                stretch="aspectFill" 
              /> 

              <Label 
                class="title"
                fontSize="20"
                fontWeight="900"
                margin="0 0 0 6"
                padding="0"
                :color="envio.active ? 'white':''"
                :text="envio.title" 
              />

            </StackLayout>
            <Label 
              class="title"
              fontSize="14"
              fontWeight="600"
              textWrap="true"
              :marginBottom="envio.precios.length ? 16:''"
              :color="envio.active ? 'white':''"
              :text="envio.description" 
            />

            <Label 
              v-for="(precio, key) in envio.precios"
              :key="`precio-${envio.id}-${key}`"
              v-if="envio.precios.length"
              fontSize="14"
              fontWeight="600"
              textWrap="true"
              margin="0 0 8 16"
              padding="0"
              :color="envio.active ? 'white':''"
              :text="precio" 
            />

            <Label 
              fontSize="14"
              fontWeight="300"
              textWrap="true"
              marginTop="8"
              :color="envio.active ? 'white':''"
              :text="envio.description2" 
            />

          </StackLayout>
      <!-- </AbsoluteLayout> -->
        
        <!-- <StackLayout 
          margin="0" 
          marginLeft="8"
          padding="0"
          v-for="(e, ke) in envio.precios" 
          :key="`${envio.id}-precios-${ke}`">
          <Label  :color="envio.active ? 'white':''" margin="0" padding="0" :text="e" />
        </StackLayout> -->
        
        <!-- <Label  :color="envio.active ? 'white':''"  textWrap :text="envio.description" /> -->
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
