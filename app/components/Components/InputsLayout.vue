<template lang="html">
 <!-- <MultiDrawer ref="drawerInput"  v-model="drawerInput"> -->
  <StackLayout>
      <ScrollView >
        <StackLayout padding="16" >
           
          <slot name="top"></slot>

          <StackLayout
            class="card"
            padding="16"
          >
            <StackLayout
              v-for="(e,i) in inputs"
              :key="`inputs-${i}`"
              class="input-group"
              :class="e.typeInput == 'select' ? 'input-group-select':''"
            >
              <Label v-if="e.isLabel == false ? e.isLabel:true" :text="e.label" class="label" />
              <StackLayout
                v-show="[undefined, 'number','email','phone'].includes(e.typeInput)"
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
                class="input-control"
                @tap="openDrawer(e)"
              >
                <FlexboxLayout
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Label class="label" :class="e.model != '' ? 'active':''" :text="e.label" />
                  <button 
                    class="btn btn-text btn-sm" 
                    text="Seleccionar" margin="0"  />
                </FlexboxLayout>
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
      ...mapState(['drawerSelect']),
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
      ...mapMutations(['changeDrawerSelect', 'setItemsSelect']),
      openDrawer(e) {
       
        this.inputSelect = e
        this.changeDrawerSelect(!this.drawerSelect)
        this.setItemsSelect(e.values)
        // let values = JSON.parse(JSON.stringify(e.values))
        // values.forEach((item)=>{
        //   item.active = false
        //   if(this.inputSelect.model != ''){
        //     if(item.id == this.inputSelect.model){
        //       item.active = true
        //     }
        //   }
          
        // })
        
        // this.selectOptions = new ObservableArray(values)


        // this.$refs.drawerInput.open('bottom')
      },
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
    // .input-control{
    //   padding:0;
    //   margin: 0;
    //   margin-top: 8;
    //   padding: 0 6 6 6;
    //   color: #4D4D4D;
    //   placeholder-color: rgba(#4D4D4D, .4);
    //   border-bottom-width: 1;
    //   border-bottom-color: rgba(#4D4D4D, .1);
    //   font-size: 14;
    //   &:focus{
    //    border-bottom-color: #DA0080;
    //   }
    //   &.input-control-select{
    //     .label{
    //       color: rgba(#4D4D4D, .4);
    //       font-size: 14;
    //       &.active{
    //       color: rgba(#4D4D4D, 1);

    //       }
    //     }
    //   }
    // }
    .input-control-error{
        border: 1px solid red;
    }
    .label{
      font-size: 12;
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
