<template lang="html">
    
    <Label textWrap="true" fontWeight="bold" fontSize="50" textAlignment="center">
        <FormattedString>
            <Span :text="days" />
            <Span text=":" />
            <Span :text="hours" />
            <Span text=":" />
            <Span :text="minutes" />
            <Span text=":" />
            <Span :text="seconds" />
        </FormattedString>
    </Label>
   
  </template>
    
  <script>
    import cmsMixin from '~/mixins/cmsMixin.js'
    import redirectMixin from '~/mixins/redirectMixin.js'
    import { mapMutations, mapActions, mapState, mapGetters } from 'vuex'
  
    export default {
      mixins:[ cmsMixin, redirectMixin ],
      props:{
        block: {},
        categoriesBase: null
      },
      components:{
        
      },
      data() {
        return {     
            days: '00',
            hours: '00',
            minutes: '00',
            seconds: '00',
            intervalo: undefined
        };
      },
      watch:{  
        ruta(to){
            if(to!='/cms'){
                clearInterval(this.intervalo)
            }
        }
      },
      computed:{
        datetime(){
            if(this.block.data.contador!=undefined){
                return this.block.data.contador.datetime
            }
            return []
        },
        ruta(){
        return this.$navigator.path
      },
      },
      mounted(){
        this.countdownTimer(this.datetime)
      },
      methods:{
        countdownTimer(endTime) {
            this.updateCountdown(endTime);
            this.intervalo = setInterval(this.updateCountdown, 1000, endTime);
        },
        updateCountdown(endTime) {
                const currentTime = new Date().getTime();
                const timeRemaining = endTime - currentTime;

                if (timeRemaining <= 0) {
                    // countdownElement.innerHTML = '¡Tiempo terminado!';
                } else {
                    this.days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
                    this.hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                    this.minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
                    this.seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

                    if (this.days < 10) {
                        this.days = '0' + this.days
                    }
                    if (this.hours < 10) {
                        this.hours = '0' + this.hours
                    }
                    if (this.minutes < 10) {
                        this.minutes = '0' + this.minutes
                    }
                    if (this.seconds < 10) {
                        this.seconds = '0' + this.seconds
                    }

                }
            }   
      }
    }
  </script>
    