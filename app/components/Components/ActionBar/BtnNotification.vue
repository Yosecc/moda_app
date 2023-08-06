<template lang="html">
    
  <AbsoluteLayout
    @tap="onTap()"
    marginRight="8"
    class=""
    height="40"
    width="40"
    padding="0"
    
  >
    <AbsoluteLayout 
      top="3"
      left="3"
      class="btn-icon"
    >

      <Image 
        top="0"
        left=""
        verticalAlignment="center"
        horizontalAlignment="center"
        src="~/assets/icons/notification.png" 
        width="32" 
        height="32" />

    </AbsoluteLayout>
    <FlexboxLayout
        top="0"
        left="24"
        width="15"
        height="15"
        backgroundColor="#E9418A"
        borderRadius="100%"
        v-show="notificationCount > 0"
        justifyContent="center"
        alignItems="center"
      >

        <Label 
          :text="notificationCount"
          fontSize="9"
          color="white"
          padding="0"
          margin="0"
          lineHeight="0"
          letterSpacing="0"
          verticalAlignment="center"
          horizontalAlignment="center"
         />   

      </FlexboxLayout>

  </AbsoluteLayout>

</template>

<script>
  import { mapMutations, mapGetters,mapActions,mapState } from 'vuex'
  export default {
    data() {
      return {
        message: "<!-- Browse page content goes here -->",
        searchQuery: ''
      };
    }, 
    computed:{
      // ...mapGetters('car',['countProductsCarActive']),
      ...mapState(['notificationCount']),
      count(){
        let num = 0
        
        return num
      },

    },
    watch:{

    },
    methods:{
      ...mapMutations(['resetNotificationCount']),
      // ...mapActions('car',['openCar']),
      onTap(){
        const count = this.notificationCount
        this.resetNotificationCount()
        this.$navigator.navigate('/notifications',{props:{count: count}})
      }
    }
  }
</script>

<style lang="scss" scoped>
    // Start custom common variables
    @import "@nativescript/theme/scss/variables/blue";
    // End custom common variables
    // Custom styles

</style>
