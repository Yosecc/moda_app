<template lang="html">

    <StackLayout
          marginBottom="16"
          padding="0"
          class="card"
        >

          <FlexboxLayout 
            justifyContent="space-between"
            alignItems="center"
            :backgroundColor="backgroundCard"
            padding="16"
            borderTopLeftRadius="8"
            borderTopRightRadius="8"
            orientation="horizontal"
          >
            <image horizontalAlignment="left" v-if="metodo.modapago"   width="100" :src="`~/assets/modapago.png`" stretch="aspectFill" />
            <Label horizontalAlignment="right" class="title" color="white" :text="metodo.name" />
          </FlexboxLayout >
          <StackLayout
            backgroundColor="transparent"
          >
            <StackLayout orientation="horizontal">
              <image 
                v-for="(i,k) in metodo.logos" 
                :key="`${metodo.id}-logo-${k}`" 
                marginRight="8" 
                width="40"
                :src="`~/assets/${i}`" 
                stretch="aspectFill" />
            </StackLayout>
            <!-- <Label textWrap :text="metodo.descripcion" /> -->
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
