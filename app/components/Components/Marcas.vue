<template lang="html">
<StackLayout padding="0" margin="0" >
    <Label 
        :text="`Tiendas Populares`" 
        marginBottom="0" 
        marginLeft="10"
        fontWeight="600"
        fontSize="13"
    />
    
    <ScrollView  scrollBarIndicatorVisible="false" orientation="horizontal">
        <StackLayout 
            orientation="horizontal"
            v-if="data.length"
            padding="0 0 0 16"
        >
          <StoreBox
              v-for="(store, key) in data"
              :key="key"
              :store="store"  
          />
        </StackLayout>
        <StackLayout 
            orientation="horizontal"
            v-if="!data.length"
            paddingLeft="16"
        >
        <StackLayout 
            v-for="i in 5"
            class="label_skeleton"
            :key="`skeleto-marca-${i}}`" 
            width="100"
            height="100"
            stretch="aspectFill"
            marginRight="16"
            marginBottom="8"
            marginTop="8" 
            />
        </StackLayout>
    </ScrollView>

    <FlexboxLayout
      borderBottomWidth=".2"
      borderColor="#DFDFDF"
      justifyContent="space-between"
      margin="16 16 0 16"
      padding="0 4"
      @tap="onViewMas"
    >
      <Label text="Ver más" fontSize="12"  fontWeight="200" />
      <image src="res://arrow_right" height="12" opacity=".5" stretch="aspectFit" />
    </FlexboxLayout>

    <!-- <Label text="Ver más" fontSize="12"  fontWeight="200" textAlignment="right" /> -->

</StackLayout>
    
  
</template>
  
  <script>
    import StoreBox from './Boxes/StoreBox.vue'
    import { mapGetters, mapState } from 'vuex'
    export default {
        props:{
        data:{
          type: Array|Object,
          default:[]
        },
      },
      components:{
        StoreBox
      },
      computed:{
        
      },
      data() {
        return {
          
        };
      },
      mounted(){
        
      },
      methods:{
        onViewMas(){
          this.$navigator.navigate('/all_stores',{
            transition: {
              name: 'slideLeft',
              duration: 300,
              curve: 'easeIn'
            }
          })
        }
      }
    }
  </script>
  
  <style lang="scss" scoped>

  </style>
  