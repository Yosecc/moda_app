<template lang="html">
      <StackLayout  padding="0" marginTop="0" background="">
        <RadListView 
            ref="listadebloques"
            :items="blocks"
            background=""
        >
          <v-template if="item.type == 'paragraph'" >
           <Paragraph
            :block="item"
           />
          </v-template>
          <v-template if="item.type == 'header'" >
           <Header
            :block="item"
           />
          </v-template>
          <v-template if="item.type == 'Video'" >
           <Video
            :block="item"
           />
          </v-template>
          <v-template if="item.type == 'Acordeon'" >
           <Acordeon
            :block="item"
            :categoriesBase="categoriesBase"
           />
          </v-template>
          <v-template if="item.type == 'Botones'" >
           <Botones
            :block="item"
            :categoriesBase="categoriesBase"
            @acceder="onItemTap"
           />
          </v-template>
          <v-template if="item.type == 'Imagenes'" >
           <Imagenes
            :block="item"
            :categoriesBase="categoriesBase"
           />
          </v-template>
          <v-template if="item.type == 'ImageCustom'" >
           <ImageSimple
            :block="item"
           />
          </v-template>
          <v-template if="item.type == 'list'" >
           <List
            :block="item"
           />
          </v-template>
          <v-template if="item.type == 'Marcas'" >
           <Marcas
            :block="item"
           />
          </v-template>
          <v-template if="item.type == 'Portadas'" >
           <Portadas
            :block="item"
           />
          </v-template>
          <v-template if="item.type == 'Cupones'" >
           <Cupones
            :block="item"
           />
          </v-template>
          <v-template if="item.type == 'Productos'" >
           <Productos
            :block="item"
           />
          </v-template>
          <v-template if="item.type == 'Contador'" >
           <Contador
            :block="item"
           />
          </v-template>
          <v-template if="item.type == 'Espaciado'" >
            <StackLayout padding="0" :height="item.data.height" width="100%"></StackLayout>
          </v-template>
          <v-template if="item.type == 'CanjeCupon'" >
            <formCanjeCupon :placeholder="item.data.form.placeholder" :button="item.data.form.button" />
          </v-template>
          <v-template  >
            <label :text="JSON.stringify(item.type)" />
          </v-template>
        </RadListView>
      </StackLayout>
</template>
  
  <script>
    import Paragraph from '~/components/Components/Cms/Paragraph.vue'
    import Header from '~/components/Components/Cms/Header.vue'
    import Video from '~/components/Components/Cms/Video.vue'
    import Acordeon from '~/components/Components/Cms/Acordeon.vue'
    import Botones from '~/components/Components/Cms/Botones.vue'
    import Imagenes from '~/components/Components/Cms/Imagenes.vue'
    import List from '~/components/Components/Cms/List.vue'
    import ImageSimple from '~/components/Components/Cms/ImageSimple.vue'
    import Cupones from '~/components/Components/Cms/Cupones.vue'
    import Marcas from '~/components/Components/Cms/Marcas.vue'
    import Portadas from '~/components/Components/Cms/Portadas.vue'
    import Productos from '~/components/Components/Cms/Productos.vue'
    import Contador from '~/components/Components/Cms/Contador.vue'

    import formCanjeCupon from '~/components/Components/Profile/formCanjeCupon.vue'

    import { mapActions, mapState, mapMutations, mapGetters } from 'vuex'

    export default {
      mixins:[  ],
      props:{
        blocks: []
      },
      components:{
        Paragraph,
        Header,
        Video,
        Acordeon,
        Botones,
        Imagenes,
        List,
        ImageSimple,
        Cupones,
        Marcas,
        Portadas,
        Productos,
        formCanjeCupon,
        Contador
      },
      data() {
        return {     
        };
      },
      watch:{  
  
      },
      computed:{
        ...mapState('categories',['categoriesBase']),
  
      },
      mounted(){
      },
      methods:{
        onItemTap(id){
          const listView = this.$refs.listadebloques.$el._nativeView;

          // console.log('listView',listView)
          const index = this.findIndexOfDeeplyNestedElement(listView, id);
          // console.log(elementToScrollTo)

          if (index) {
             if (index >= 0) {
              listView.scrollToIndex(index);
            }
          }
        },
        findIndexOfDeeplyNestedElement(parentElement, id) {
          // Esta función busca de manera recursiva el índice del elemento con el ID especificado
          // dentro de la jerarquía de elementos anidados.
          if (!parentElement) {
            return -1;
          }

          // Busca el elemento con el ID deseado dentro del elemento de lista actual
          const elementToFind = parentElement.getViewById(id);

          console.log(elementToFind)

          if (elementToFind) {
            return parentElement.items.findIndex((e)=> e.tunes.anchorTune != undefined ? e.tunes.anchorTune.anchor == 'anclita' : false )
            // return parentElement.items.indexOf(elementToFind);
          }

          // Si el elemento no se encuentra, verifica elementos anidados
          if (parentElement.getChildrenCount() > 0) {
            for (let i = 0; i < parentElement.getChildrenCount(); i++) {
              const child = parentElement.getChildAt(i);
              // Recursivamente busca dentro de elementos anidados
              const index = this.findIndexOfDeeplyNestedElement(child, id);
              if (index !== -1) {
                return index;
              }
            }
          }

          return -1;
        },
        findNestedElementWithId(parentElement, id) {
          if (!parentElement) {
            return null;
          }
          
          // Busca el elemento con el ID deseado dentro del elemento de lista actual
          const elementToScrollTo = parentElement.getViewById(id);

          if (elementToScrollTo) {
            return elementToScrollTo;
          }

          // Si el elemento no se encuentra, verifica elementos anidados
          if (parentElement.getChildrenCount() > 0) {
            for (let i = 0; i < parentElement.getChildrenCount(); i++) {
              const child = parentElement.getChildAt(i);
              // Recursivamente busca dentro de elementos anidados
              const nestedElement = this.findNestedElementWithId(child, id);
              if (nestedElement) {
                return nestedElement;
              }
            }
          }

          return null;
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
  