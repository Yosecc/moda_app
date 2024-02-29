<template>
    <Page actionBarHidden="true" >
        <GridLayout rows="auto,*">
            <HeaderNoActionBar 
                :marginBtnBack="'8 0 0 8'" 
                :logoCenter="false" 
                row="0" 
                :back="true" 
                @onBack="onBack" 
                :isEvent="true" 
                :isCar="false" 
                :isBtnPromotions="false" 
                :isNotification="false" 
                background="white"
            >
                <Label col="1" text="Seleccione una opción" margin="16" fontWeight="bold" />
            </HeaderNoActionBar>
            <RadListView row="1" :items="itemsComputed">
                <v-template if="item.active == false" >
                    <GridLayout padding="16" columns="*" borderBottomWidth="1" borderColor="silver" @tap="onItemTap(item[campos.id])">
                        <Label :text="item[campos.name]" col="0" textWrap="true" marginLeft="8" />
                    </GridLayout>
                </v-template>
                <v-template  if="item.active == true">
                    <GridLayout padding="16" columns="*,auto" borderBottomWidth="1" borderColor="silver" @tap="onItemTap(item[campos.id])">
                        <Label :text="item[campos.name]" col="0" textWrap="true" marginLeft="8" />
                        <ContentView col="1" width="20" height="20" borderRadius="20" backgroundColor="#E9418A" />
                    </GridLayout>
                </v-template>
            </RadListView>
        </GridLayout>

    </Page>
</template>
<script>
//   import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
//   import storeMixin from '~/mixins/storeMixin.js'
import HeaderNoActionBar from '~/components/Components/ActionBar/HeaderNoActionBar.vue'

  export default {
    // mixins: [storeMixin],
    model: {
      prop: 'selected',
      event: 'change'
    },
    props: {
      options:{
        // type: Array|Object,
        // default: []
      },
      selected:{
        type: String|Number,
        default: ''
      },
      campos:{
        type: Object,
        default(){
            return {
                id: 'id',
                name: 'name'
            }
        }
      }
    },
    components: {
        HeaderNoActionBar
    },
    filters: {
      
    },
    data() {
      return {
        items : this.options,
        selectedDataId: this.selected
      };
    },
    watch:{
   
    },
    computed:{
        itemsComputed(){
            return this.items.map((e)=>{
                e.active = false
                if(e[this.campos.id] == this.selectedDataId){
                    e.active = true
                }
                return e
            })
        }
      
    },
    mounted(){
      
    },
    methods:{
        onBack(){
            this.$modal.close()
        },
        onItemTap(id){
            this.selectedDataId = id
            // this.$emit('change', this.selectedDataId)
            this.$modal.close({selected:  this.selectedDataId})
        }
    }
  };
</script>

