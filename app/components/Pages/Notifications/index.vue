<template lang="html">
  <Page>
    <HeaderDefault :back="true" :logoCenter="false">
      <Label col="1"  fontWeight="900" fontSize="16" padding="0" margin="0" textTransform="uppercase" textAlignment="left" text="Notificaciones" />
    </HeaderDefault>
    <StackLayout padding="16">
      <RadListView 
        class="listNotifications"
        ref="listNotifications"
        for="item in notifications"
      >
        <v-template  >
          <GridLayout 
            columns="auto,*,auto" 
            rows="*, auto" 
            marginBottom="8" 
            borderBottomWidth=".5"
            :borderRadius="item.new ? 16:0"
            padding="8"
            :background="item.new ? '#ECF0F1':''"
          >

          <FlexboxLayout  
            rowSpan="2"
            col="0"
            row="0"
            justifyContent="center"
            alignItems="center"
            height="100%"

          >
             <image 
              v-if="item.image != '' && item.image != null"
              :src="item.image" 
              stretch="aspectFill" 
              width="60"
            />

            <image 
              v-else
              src="~/assets/icons/notification.png" 
              stretch="aspectFill" 
              width="60"

            />

           
          </FlexboxLayout >
           
            <label 
              :text="item.title" 
              row="0" 
              col="1"
              fontWeight="900"
              fontSize="16"
              textWrap
              marginLeft="8"
              marginBottom="0"
              padding="0"
              marginTop="0"
            />
            <label 
              :text="setFecha(item.created_at)" 
              row="0" 
              col="2"
              fontWeight="100"
              fontSize="10"
              marginBottom="0"
              padding="0"
              marginTop="0"
            />
            <label 
              :text="item.body" 
              row="1" 
              col="1"
              fontWeight="200"
              textWrap
              colSpan="2"
              fontSize="14"
              marginLeft="8"
              marginBottom="0"
              marginTop="0"
              padding="0"
            />

          </GridLayout>
        </v-template>
      </RadListView>
    </StackLayout>
  </Page> 
</template>

<script>

  import { mapActions, mapState, mapMutations, mapGetters } from 'vuex'
  import moment from 'moment'
  import HeaderDefault from '~/components/Components/ActionBar/HeaderDefault.vue'
  import { firebase } from '@nativescript/firebase';
  export default {
    mixins:[  ],
    props:{
      count:{
        type: Number,
        default: -1
      }
    },
    components:{
      HeaderDefault
    },
    data() {
      return {     

      };
    },
    watch:{  

    },
    computed:{
      ...mapState(['notifications'])

    },
    mounted(){
      firebase.analytics.setScreenName({
        screenName: `Notificaciones`
      });
      this.getNotifications().then((response)=>{
        // console.log(response)
        let data = response.map((x,z)=>{
          x.new = false
          for (let i = 0; i < this.count; i++) {
            if(i == z){
              x.new = true
            }
          }
          return x
        })
        // console.log('data',data)
        this.setNotifications(data)
        this.$ref.listNotifications.refresh()
        // console.log(this.notifications)
      })

    },
    methods:{
      ...mapActions(['getNotifications']),
      ...mapMutations(['setNotifications']),
      setFecha(fecha){
        return moment(fecha).format('DD/MM')
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
