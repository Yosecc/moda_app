<template lang="html">
  <StackLayout  padding="8">
    <GridLayout 
      columns="*,auto"
      rows="auto,*"
      marginBottom="8" 
      :borderWidth="envio.active ? 2:0"
      :borderColor="envio.active ? '#E9418A':''"
      class="card"
    >
      <StackLayout row="0" col="0" orientation="horizontal">
        
        <image 
          top="16"
          left="64"
          width="35"
          :src="envio.icon" 
          stretch="aspectFill" 
        /> 

        <Label 
          class="title"
          fontSize="20"
          fontWeight="900"
          margin="0 0 0 6"
          padding="0"
          
          :text="envio.title" 
        />

      </StackLayout>

      <StackLayout row="0" col="1">
        <AbsoluteLayout marginTop="8">
            <label
                  left="0"
                  top="0"
                  width="20"
                  height="20"
                  backgroundColor="white"
                  borderWidth="2"
                  borderColor="#E9418A"
                  borderRadius="100%"
                  :opacity="envio.active ? 1:.2"
              />

              <label
              v-if="envio.active"
                  left="3"
                  top="3"
                  width="13.5"
                  height="13.5"
                  borderWidth="0"
                  backgroundColor="#E9418A"
                  borderRadius="100%"
              />
              
        </AbsoluteLayout>
      </StackLayout>

      <StackLayout  
          row="1"
          col="0"
          colSpan="2">
        <StackLayout
          v-for="(item, key) in envio.body"
          :key="`envio${key}`"
        >
          <label 
            v-if="item.type == 'text' && item.children==undefined" 
            :text="item.text" 
            :fontWeight="item.fontWeight!=undefined ? item.fontWeight : ''"
            :fontSize="item.fontSize!=undefined ? item.fontSize : ''"
            :backgroundColor="item.backgroundColor!=undefined ? item.backgroundColor : ''"
            :color="item.color!=undefined ? item.color : ''"
            :padding="item.padding!=undefined ? item.padding : ''"
            :borderRadius="item.borderRadius!=undefined ? item.borderRadius : ''"
            :textDecoration="item.textDecoration!=undefined ? item.textDecoration : ''"
            textWrap 
          />

          <StackLayout v-if="item.type == 'text' && item.children!=undefined"   padding="0 4" margin="0" orientation="horizontal">
            <StackLayout v-for="(i, k) in item.children" :key="`envio-childe${key}${k}`" padding="0" margin="0"> 
              <label 
                 v-if="i.type == 'text'"
                :text="`${i.text}`" 
                :fontWeight="i.fontWeight!=undefined ? i.fontWeight : ''"
                :fontSize="i.fontSize!=undefined ? i.fontSize : ''"
                :backgroundColor="i.backgroundColor!=undefined ? i.backgroundColor : ''"
                :color="i.color!=undefined ? i.color : ''"
                :borderRadius="i.borderRadius!=undefined ? i.borderRadius : ''"
                :padding="i.padding!=undefined ? i.padding : ''"
                :textDecoration="i.textDecoration!=undefined ? i.textDecoration : ''" 
                textWrap 
              />
              <Image 
                v-if="i.type == 'image'"
                :src="i.src!=undefined ? i.src : '' " 
                :height="i.height!=undefined ? i.height : '' "
                :width="i.width!=undefined ? i.width : '' "
                stretch="aspectFit"
                marginRight="8"
              />
            </StackLayout>
          </StackLayout>

          
          <!-- <WebView v-if="item.type == 'text' && item.children==undefined  && item.html != undefined" margin="0" padding="0" canGoBack="false" canGoForward="false" :src="item.html" disableZoom="true" /> -->
          

          

        </StackLayout>
      </StackLayout>
    </GridLayout> 
  </StackLayout>
</template>

<script>
  import CheckBox from '~/components/Components/modules/checkbox/checkbox.vue'

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
      CheckBox
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
