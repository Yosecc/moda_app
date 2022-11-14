<template lang="html">
  <GridLayout 
    columns="*,auto" 
    rows="*"
    marginTop="16"
    class="h-100 shadow-none" 
    @tap="onViewProfile()"
    background=""
  >
   <!--  <image 
      src="~/assets/icons/avatar.png"
      col="0"
      row="0"
      verticalAlignment="center"
      width="32"
      height="32"
    /> -->

    <StackLayout
      col="0"
      row="0"
      verticalAlignment="center"
      background=""
    >
    <StackLayout orientation="horizontal" background="">
      <image src="~/assets/avatar.png" stretch="aspectFill" :marginLeft="-6" width="45" height="45" />
        <StackLayout >
          <label 
            fontWeight="900"
            fontSize="16"
            textWrap
            :text="client.first_name ?  client.first_name:'undefined' "
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
    </StackLayout>

    <image 
      src="~/assets/arrow_right.png"
      col="1"
      row="0"
      verticalAlignment="center"
      width="8"
      height="auto"
    />

  </GridLayout>
</template>

<script>
  import { mapState, mapGetters } from 'vuex'
  import profileMixin from '~/mixins/profileMixin.js'
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
      }
    },
    computed:{
      ...mapState('authentication',['user']),
      ...mapGetters('authentication',['client'])
    },
    mounted(){
      // console.log('client', this.client)
    }
  };
</script>

<style lang="scss" scoped>
// Start custom common variables
@import "@nativescript/theme/scss/variables/blue";
// End custom common variables

// Custom styles
</style>
