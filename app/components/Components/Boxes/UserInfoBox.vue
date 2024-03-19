<template lang="html">
    <StackLayout
      verticalAlignment="center"
      padding="16 0"
    >
      <StackLayout orientation="horizontal" background="">
        <image src="~/assets/avatar.png" stretch="aspectFill" background="" width="45" height="45" />
        <StackLayout >
          <label 
            fontWeight="900"
            fontSize="16"
            textWrap
            :text="`${client.first_name} ${client.last_name}`"
            margin="0"
            padding="0"
          />

          <label
            fontWeight="300"
            fontSize="12"
            :text="client.email"
            margin="0"
            padding="0"
          />
          
        </StackLayout>
      </StackLayout>
      <StackLayout margin="8 0 0 8" @tap="onViewProfile()" orientation="horizontal">
            <label
              fontWeight="600"
              fontSize="14"
              text="Mi Perfil"
              margin="0 8 0 0"
              padding="0"
            />
                <image 
                  src="~/assets/arrow_right.png"
                  col="1"
                  row="0"
                  verticalAlignment="center"
                  width="6"
                  height="auto"
                />
          </StackLayout>
    </StackLayout>


</template>

<script>
  import { mapState, mapGetters } from 'vuex'
  import profileMixin from '~/mixins/profileMixin.js'
  import cache from '@/plugins/cache'

  export default {
    mixins: [profileMixin],
    props: {},
    components: {},
    filters: {},
    data() {
      return {};
    },
    watch:{
      client(to){
        // console.log('to',to)
      },
      
    },
    computed:{
      ...mapState('authentication',['user']),
      ...mapGetters('authentication',['client']),

    },
    mounted(){
      console.log('client', this.client)
    }
  };
</script>

<style lang="scss" scoped>
// Start custom common variables
@import "@nativescript/theme/scss/variables/blue";
// End custom common variables

// Custom styles
</style>
