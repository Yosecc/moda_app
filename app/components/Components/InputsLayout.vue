<template lang="html">
 
    <ScrollView >
      <StackLayout padding="8 16 16 16" >
          
        <slot name="top"></slot>

        <StackLayout
          class="card"
          :class="clases"
          padding="16"
        >
          <WrapLayout>
            <StackLayout
              v-for="(e,i) in inputsData"
              :key="`inputs-${i}`"
              class="input-group"
              :width="e.width ? e.width :'100%'"
              :paddingRight="e.paddingRight ? e.paddingRight :''"
              :class="e.typeInput == 'select' ? 'input-group-select':''"
            >
            <StackLayout margin="0" padding="0" v-if="e.isLabel == false ? e.isLabel:true" orientation="horizontal">
              
              <Label  :text="e.label" class="label" margin="0" padding="0" />
              <Label  v-if="e.required" text="*" :color="e.label != '' ? 'red':'transparent'" margin="0 0 0 2" padding="0" />

            </StackLayout>

              <StackLayout
                v-show="[undefined, 'number','email','phone'].includes(e.typeInput)"
              >
                <TextField 
                  :text="e.model" 
                  v-model="e.model"
                  class="inputForm"
                  :secure="e.secure ? e.secure : false"
                  :class="e.error ? 'input-control-error':''"
                  :hint="e.hint"
                  :keyboardType="e.typeInput"
                  :maxLength="e.maxLength"
                  :borderWidth="e.error != undefined ? (e.error == true ? 1 : 0) : 0"
                  :borderColor="e.error != undefined ? (e.error == true ? 'red' : '') : ''"
                />
          

                <Label textWrap v-if="e.footerLabel" :text="e.footerLabel" fontSize="10" fontWeight="300" />

              </StackLayout>

              <StackLayout  v-if="e.typeInput == 'select'" margin="0" padding="0">
                <StackLayout
                  class="selectForm"
                  @tap="openModalSelect(e)"
                >
                  <GridLayout columns="*, auto">
                      <Label col="0" class="selectInput" :class="e.model != '' ? 'active':''" margin="0" padding="0" verticalAlignment="center" textWrap :text="titleSelect(e)" />
                      <button 
                        col="1"
                        class="btn btn-text btn-sm"
                        background="#C7C7C7"
                        text="Seleccionar" 
                        margin="0" 
                        color="#E9418A"
                      />
                  </GridLayout>
                  
                </StackLayout>
                <Label textWrap v-if="e.footerLabel" :text="e.footerLabel" fontSize="13" fontWeight="300" />
              </StackLayout>

              <FlexboxLayout 
                v-if="e.typeInput == 'switch'"
                class="switchFrom"
                justifyContent="space-between"
                alignItems="center"
              >
                <Label :text="e.hint" class="label" />
                <Switch class="switch"  :checked="e.model == 2000 ? true:false" @checkedChange="e.change" />
              </FlexboxLayout >

              <StackLayout  v-if="e.typeInput == 'textarea'">
                <TextView 
                  v-model="e.model" 
                  class="inputForm" 
                  :class="e.error ? 'input-control-error':''" 
                  :hint="e.hint" 
                />
              </StackLayout>
                

            </StackLayout>
          </WrapLayout>
        </StackLayout>

        <slot name="bottom"></slot>

      </StackLayout>
    </ScrollView>

</template>

<script>
import { SideDrawerLocation } from 'nativescript-ui-sidedrawer';
  import { mapState, mapActions, mapMutations } from 'vuex'
  import { ObservableArray } from '@nativescript/core/data/observable-array';
  export default {
    mixins:[  ],
    model: {
      prop: 'inputs',
      event: 'change'
    },
    props:{
      clases:{
        type: String,
        default: ''
      },
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
    computed:{},
    data() {
      return {
        inputsData: this.inputs
      };
    },
    mounted(){

    },
    methods:{
      async openModalSelect(e){
        // console.log('e.values',e)
        if(e.beforeOpen!=undefined){
          const beforeStatus = e.beforeOpen(e)
          if(!beforeStatus){
            return false
          }
        }
        const modal = await this.$navigator.modal('/selectListPicker',{
          fullscreen: true, 
          id: 'seledyd',
          props:{
            options: e.values,
            selected: e.model,
            campos: e.campos
          }
        })
        // console.log('modal',modal)
        if(modal!=undefined){
          this.inputsData.find((i)=>i.name == e.name).model = modal.selected
        }
        this.$emit('changeSelect', e)
        this.$emit('change', this.inputsData)
      },
      titleSelect(e){
        if(e.model && e.values){
          const element = e.values.find((i)=> i[e.campos.id] == e.model)
          if(element){
            return element[e.campos.name]
          }
        }
        return e.title
      },
      checkedChange({value}){
        // console.log(value)
      }
    }
  }
</script>

<style lang="scss" scoped>

    // Start custom common variables
    @import "@nativescript/theme/scss/variables/blue";

  .input-group{
    // padding-bottom: 16;
    margin-bottom: 16;
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
    //    border-bottom-color: #E9418A;
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
