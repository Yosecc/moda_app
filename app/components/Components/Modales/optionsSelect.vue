<template lang="html">
  <StackLayout v-if="select" padding="8 16 0 16">
    <StackLayout
      width="100"
      height="5"
      borderRadius="100%"
      background="#7B7B7B"
      horizontalAlignment="center"
      margin="8 0"
    />
    <Label :text="select.hint" margin="8 0" textAlignment="center" borderBottomWidth="1" borderColor="#E6E6E6" fontWeight="600" />
    <StackLayout v-if="datos.length == 0">
       <ActivityIndicator busy="true" color="#DA0080" />
    </StackLayout>
    <RadListView v-else class="optionsSelect" ref="optionsSelect" :items="datos" >
      <v-template if="item.active == false" >
        <GridLayout  columns="*,auto" @tap="onItemTap(item)" class="item">
           <Label col="0" textWrap :text="item[select.campos.name]" />
           <StackLayout col="1" class="circle" />
        </GridLayout>
      </v-template>
      <v-template if="item.active == true" >
        <GridLayout columns="*,auto" @tap="onItemTap(item)" class="item">
           <Label col="0" textWrap :text="item[select.campos.name]" />
           <StackLayout col="1" class="circle active" />
        </GridLayout>
        <!-- <FlexboxLayout @tap="onItemTap(item)" justifyContent="space-between" class="item">
          <Label :text="item[selectActual.campos.name]" />
          <StackLayout>
            <StackLayout class="circle active" />
          </StackLayout>
        </FlexboxLayout > -->
      </v-template>
    </RadListView>
  </StackLayout>  
</template>

<script>
  import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
  import { ObservableArray } from '@nativescript/core/data/observable-array';


  export default {
    mixins: [],
    model: {
      prop: 'select',
      event: 'change'
    },
    props: {
      select:{
        type: Object,
        default: null
      }
    },
    components: {
      
    },
    filters: {
      
    },
    data() {
      return {
        selectActual:this.select
      };
    },
    watch:{
    },
    computed:{
      datos(){
        // console.log('this.select', this.select, 'selectActual:::::::', this.selectActual)
        if(this.select){
          let values = this.select.values
          
          values.forEach((value)=>{
            if(this.select.model == value[this.select.campos.id]){
              value.active = true
            }else{
              value.active = false
            }
            
          })
          return values
        }
        return []
      },

    },
    mounted(){
    },
    methods:{
      onItemTap(item){
        this.selectActual = this.select
        this.selectActual.model = item[this.select.campos.id]
        this.selectActual.title = item[this.select.campos.name]
        this.$refs.optionsSelect.nativeView.refresh();
        this.$forceUpdate()
        this.$emit('change',this.selectActual)   
      }
    }
  };
</script>

<style lang="scss" scoped>
// Start custom common variables
@import "@nativescript/theme/scss/variables/blue";
// End custom common variables

// Custom styles

.optionsSelect{
  .item{
    margin: 0 0 0 0;
    padding: 16 0 16 0;
    border-bottom-width: .6;
    border-color: #7B7B7B;
    Label{
      font-size: 18;
    }

    .circle{
      width:20;
      height:20;
      border-radius: 100%;
      border-width: 2;
      border-color: #7B7B7B;
      &.active{ 
        background: #DA0080;
      }
    }
  }
}

</style>
