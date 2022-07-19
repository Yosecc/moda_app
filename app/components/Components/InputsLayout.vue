<template lang="html">
 <!-- <MultiDrawer ref="drawerInput"  v-model="drawerInput"> -->
  <StackLayout>
      <!-- <StackLayout v-if="showDrawer" slot="bottom" >
        <GridLayout rows="auto, *, auto"   ~drawerContent class="sideStackLayout drawerSelect">
    
          <StackLayout  row="0">
            <StackLayout class="barra"></StackLayout>
            <Label class="title" marginBottom="8" textAlignment="center" horizontalAlignment="center"  v-if="inputSelect" :text="titleOptions" />
          </StackLayout>

          <StackLayout row="1">
            <RadListView 
              @itemSelected="onItemSelected"
              @itemSelecting="onItemSelecting"
              @itemDeselecting="onItemDeselecting"
              @itemDeselected="onItemDeselected"  
              v-if="inputSelect"  
              class="selectList" 
              :items="selectOptions"
              selectionBehavior="Press"
              color="red"
              itemSelectedBackgroundColor="red">
      
              <v-template if="item.active == false">
                <FlexboxLayout 
                  justifyContent="space-between"
                  class="item"
                >
                  <Label class="label active" :text="item[inputSelect.campos.name]" />

                </FlexboxLayout>
              </v-template>
              <v-template if="item.active == true" >
                <FlexboxLayout 
                  justifyContent="space-between"
                  class="item active"
                >
                  <Label class="label" color="#4D4D4D"  :text="item[inputSelect.campos.name]" />
                  <image src="~/assets/icons/check_grey.png" height="14" width="14" marginRight="8" stretch="aspectFit" />
                </FlexboxLayout>
              </v-template>
           
            </RadListView>
          </StackLayout>

          <StackLayout row="2" padding="4 0 8 0">
            <Button text="Seleccionar" @tap="selectItem" :class="buttonsClass" />
          </StackLayout>
        </GridLayout>

      </StackLayout> -->

      <ScrollView >
        <StackLayout  padding="8">
           
          <slot name="top"></slot>

          <StackLayout
            class="card"
            paddingTop="16"
            marginBottom="16"
          >

            <StackLayout
              v-for="(e,i) in inputs"
              :key="`inputs-${i}`"
              class="input-group"
              :class="e.typeInput == 'select' ? 'input-group-select':''"
            >

              <StackLayout
                v-if="[undefined, 'number','email','phone'].includes(e.typeInput)"
              >
                <TextField 
                  :text="e.model" 
                  v-model="e.model"
                  class="inputForm"
                  :class="e.error ? 'input-control-error':''"
                  :hint="e.hint"
                 :keyboardType="e.typeInput" />
              </StackLayout>
              <StackLayout
                v-if="e.typeInput == 'select'"
                class="input-control input-control-select"
                @tap="openDrawer(e)"
              >
                <Label class="label" :class="e.model != '' ? 'active':''" :text="e.label" />
              </StackLayout>

            </StackLayout>
          </StackLayout>

           <slot name="bottom"></slot>

        </StackLayout>
      </ScrollView>
</StackLayout>
    <!-- </MultiDrawer> -->


</template>

<script>
import { SideDrawerLocation } from 'nativescript-ui-sidedrawer';
  import { mapState, mapActions, mapMutations } from 'vuex'
  import { ObservableArray } from '@nativescript/core/data/observable-array';
  export default {
    mixins:[  ],
    props:{
      inputs: {
        type: Array,
        required: true
      },
      buttonsClass:{
        type: String,
        default: 'btn btn-primary btn-sm btn-shadow-none'
      },
      showDrawer:{
        type: Boolean,
        default: true
      }
      
    },
    components:{
      
    },
    watch:{
      
    },
    computed:{
      
      titleOptions(){
        return this.inputSelect.title
      }
    },
    data() {
      return {
        drawerInput: false, 
        inputSelect: null,
        selectOptions: null
      };
    },
    mounted(){
      // console.log(this.$refs.drawerInput)
    },
    methods:{
      onItemTapMenu({i}){
        console.log(i)
      },
      onItemSelected({ index, object }) {
        console.log(`Item selected: ${index}`, object);
      },
      onItemSelecting({ index, object }) {
        
        this.selectOptions.forEach((e,i)=>{
          if(i == index){ 
            this.inputSelect.model = e[this.inputSelect.campos.id]
            this.inputSelect.label = e[this.inputSelect.campos.name]
            e.active = true 

          }else{ e.active = false }
        })
        console.log(`Item selecting: ${index}`, object);
      },
      onItemDeselecting({ index, object }) {
        console.log(`Item deselecting: ${index}`, object);
      },
      onItemDeselected({ index, object }) {
        console.log(`Item deselected ${index}`, object);
      },
      onNavigationButtonTap() {
        Frame.topmost().goBack();
      },
      openDrawer(e) {

        this.inputSelect = e

        let values = JSON.parse(JSON.stringify(e.values))
        values.forEach((item)=>{
          item.active = false
          if(this.inputSelect.model != ''){
            if(item.id == this.inputSelect.model){
              item.active = true
            }
          }
          
        })
        
        this.selectOptions = new ObservableArray(values)


        this.$refs.drawerInput.open('bottom')
      },
      selectItem(){
        this.$refs.drawerInput.close('bottom')
      }
    }
  }
</script>

<style lang="scss" scoped>

    // Start custom common variables
    @import "@nativescript/theme/scss/variables/blue";

  .input-group{
    // padding-bottom: 16;
    margin-bottom: 8;
    &.input-group-select{
      // border-bottom-width: 1;
      // border-bottom-color: rgba(#4D4D4D, .1);
    }
    .input-control{
      padding:0;
      margin: 0;
      margin-top: 8;
      padding: 0 6 6 6;
      color: #4D4D4D;
      placeholder-color: rgba(#4D4D4D, .4);
      border-bottom-width: 1;
      border-bottom-color: rgba(#4D4D4D, .1);
      font-size: 14;
      &:focus{
       border-bottom-color: #DA0080;
      }
      &.input-control-select{
        .label{
          color: rgba(#4D4D4D, .4);
          font-size: 14;
          &.active{
          color: rgba(#4D4D4D, 1);

          }
        }
      }
    }
    .input-control-error{
        border: 1px solid red;
    }
  }
  .drawerSelect{
    // background: white;

    border-top-right-radius: 10;
    border-top-left-radius: 10;
  }
  .selectList{
    .item{
      border-bottom-width: 1;
      border-bottom-color: rgba(#4D4D4D, .2);
      margin: 0 8 0 8;
      padding: 8 0 8 0;
      .label{
        color: rgba(#4D4D4D, .7);
        font-size: 13;
      }
      &.active{
        background-color: rgba(#4D4D4D, .2);
        .label{
          color: #4D4D4D;
        }
      }
    }
  }
  .barra{
    width: 50;
    height: 5;
    border-radius: 10;
    background: #B0BEC5;
    margin-top: 8;
    margin-bottom: 8;
  }
  .title{
    font-weight: bold;
    font-size: 14;
  }
</style>
