<template lang="html">

    <StackLayout 
      :borderBottomWidth="!envio.active ? 8:''"
      :borderBottomColor="!envio.active ? envio.color:''"
      :withBorderBottomColor="!envio.active ? envio.color:''"
      :borderBottomLeftRadius="!envio.active ? 0:''"
      :borderBottomRigthRadius="!envio.active ? 0:''"
      marginBottom="8" 
      padding="16"
      :backgroundColor="envio.active ? envio.color:''"
      class="card">

        <Label 
          class="title"
          :color="envio.active ? 'white':''"
          :text="envio.title" />
        <StackLayout 
          margin="0" 
          marginLeft="8"
          padding="0"
          v-for="(e, ke) in envio.precios" 
          :key="`${envio.id}-precios-${ke}`">
          <Label  :color="envio.active ? 'white':''" margin="0" padding="0" :text="e" />
        </StackLayout>
        
        <Label  :color="envio.active ? 'white':''"  textWrap :text="envio.description" />
    </StackLayout> 

</template>

<script>
  export default {
    mixins: [],
    props: {
      envio:{
        type: Object,
        default: {}
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
