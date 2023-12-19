<template lang="html">
  <GridLayout 
    orientation="horizontal" 
    paddingLeft="16"
    marginBottom="24"
    columns="auto,auto,*"
    rows="auto,auto"
    :opacity="item.disabled ? '.2':'1'"
    
  >
    <image 
      :src="`${item.icon}`"
      col="0"
      row="0"
      verticalAlignment="center"
      width="25"
      height="auto"
    />
    
    <Label 
      col="1"
      row="0"
      :text="item.name"
      fontSize="16"
      marginLeft="8"
      verticalAlignment="center"
      @tap="onTapMenu"
    />
    
    <image 
      src="~/assets/arrow_right.png"
      col="2"
      row="0"
      horizontalAlignment="left"
      verticalAlignment="center"
      width="7"
      marginRight="8"
      marginLeft="10"
      height="auto"
      
      :rotate="!statusChildrens ? 90 : 0"
      v-if="item.childrens != undefined"
    />
    <StackLayout :height="statusChildrens ? '' : 0" :marginTop="statusChildrens ? 16: 0" v-if="item.childrens != undefined" row="1" col="0" colSpan="2"> 
      <GridLayout 
        v-for="(i,k) in item.childrens"
        :key="`hijo-${k}`"
        orientation="horizontal" 
        paddingLeft="16"
        :marginBottom="item.childrens.length > 0 ? 10 : 0"
        columns="auto,*"
        rows="auto,auto"
        :opacity="i.disabled ? '.2':'1'"
        @tap="onTapMenuChildren(i.redirect)"
      >
        <image 
          :src="`${i.icon}`"
          col="0"
          row="0"
          verticalAlignment="center"
          width="20"
          height="auto"
        />
        
        <Label 
          col="1"
          row="0"
          :text="i.name"
          fontSize="14"
          marginLeft="8"
          verticalAlignment="center"
        />
      </GridLayout>
    </StackLayout>
  </GridLayout>
</template>

<script>
  import { mapMutations } from 'vuex'
  import cache from '@/plugins/cache'
export default {
  props: {
    item:{
      type: Object,
      required: true
    },
   
  },
  components: {},
  filters: {
    
  },
  data() {
    return {
      options: {
          transition: {
            name: 'slideLeft',
            duration: 300,
            curve: 'easeIn'
          }
        },
        statusChildrens: false
    };
  },
  methods:{
    ...mapMutations(['changeDrawer']),
    onTapMenu(){
      
      if(this.item.childrens!=undefined){
        this.statusChildrens = !this.statusChildrens
        return
      }

      this.changeDrawer('')
      if(this.item.name == 'Salir'){
        cache.delete('client')
        cache.delete('token')
        cache.clear()
        this.options.clearHistory = true
        this.$navigator.navigate('/login',this.options)
        return
      }
      
      if(!this.item.disabled){
        if(typeof this.item.redirect == 'object'){
          if(Object.keys(this.item.redirect).length > 0){
            this.options.props = this.item.redirect.params

            if(this.$navigator.path == '/home' && this.item.redirect.route == '/home'){
              return
            }
          }
        }
        
        if(this.item.redirect == undefined){
          this.options.props = {page: this.item}
          // alert(JSON.stringify(this.options))
          this.$navigator.navigate('/cms',this.options)

          return
        }

        // console.log(this.item.redirect.route,this.options)

        this.$navigator.navigate(this.item.redirect.route,this.options)
      }
    },
    onTapMenuChildren(redirect){
      // console.log('s',redirect)
      this.changeDrawer('')
      this.options.props = { params: redirect.params }
      this.$navigator.navigate(redirect.route,this.options)
    }
  }
};
</script>

<style lang="scss" scoped>
// Start custom common variables
@import "@nativescript/theme/scss/variables/blue";
// End custom common variables

// Custom styles
</style>
