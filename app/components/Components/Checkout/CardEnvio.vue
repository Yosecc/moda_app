<template lang="html">
  <StackLayout :height="altura" padding="8">

    <StackLayout 
      padding="0"
      marginBottom="8" 
      :backgroundColor="envio.active ? envio.color:''"
      class="card"
      height="100%"
    >
      <AbsoluteLayout height="100%" width="100%" >

        <image 
          top="16"
          left="64"
          width="90%" 
          :src="envio.icon" 
          stretch="aspectFill" />

        <Label 
          top="8"
          left="8"
          textWrap
          class="title"
          fontSize="18"
          :color="envio.active ? 'white':''"
          :text="envio.title" />
      </AbsoluteLayout>
        
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
