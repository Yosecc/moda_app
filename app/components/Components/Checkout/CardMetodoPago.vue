<template lang="html">
  <StackLayout padding="8 16">
    <StackLayout
      class="card"
      :borderWidth="metodo.active ? 2:0"
      :borderColor="metodo.active ? '#DA0080':''"
    >
      
        <!--  -->
        <Label  class="title" :text="metodo.name" />

      <StackLayout marginTop="16">
        <image horizontalAlignment="left" v-if="metodo.modapago"  marginBottom="8" width="100" :src="`~/assets/modapago.png`" stretch="aspectFill" />
        <StackLayout orientation="horizontal">
          <image 
            v-for="(i,k) in metodo.logos" 
            :key="`${metodo.id}-logo-${k}`" 
            marginRight="8" 
            width="40"
            :src="i" 
            stretch="aspectFill" />
        </StackLayout>
        <Label textWrap :text="metodo.descripcion" />
      </StackLayout>
    </StackLayout>
  </StackLayout>

</template>

<script>
  export default {
    mixins: [],
    props: {
      metodo:{
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
      backgroundCard(){
        if(this.metodo.modapago){
          if(this.metodo.active){
             return '#570140'
          }else{
            return '#0080DA'
          }
        }else{
          if(!this.metodo.active){
             return '#DA0080'
          }else{
            return '#880E4F'
          }
        }
      }
    },
    mounted(){
    },
    methods:{
    }
  };
</script>

<style lang="scss" scoped>
</style>
