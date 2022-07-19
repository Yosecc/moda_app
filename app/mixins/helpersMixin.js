import { mapMutations, mapActions } from 'vuex'

export default {
  data() {
    return {
     errors:[]
    };
  },
  filters: {
    moneda: function (value) {
      value += '';
      var x = value.split('.');
      var x1 = x[0];
      var x2 = x.length > 1 ? '.' + x[1] : '';
      var rgx = /(\d+)(\d{3})/;
      while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + '.' + '$2');
      }
      return '$'+ x1 + x2;
    }
  },
  computed:{

   
  },
  methods: {
   prepareData(inputs){
     let data = {}
     inputs.forEach((input)=>{
       this.validate(input, true)
       data[input.name] = input.model
     })
     return data
   },
   validate(input, isAlert){

     if(input.required){
       if([undefined, '' , null].includes(input.model)){
        this.errors.push({name: input.name, mensaje: `${input.hint} es requerido`})
        if(isAlert){
          alert(`${input.hint} es requerido`)
        }
       }else{
        if(this.errors.findIndex((e)=>e.name == input.name) != -1){
         this.errors.splice(this.errors.findIndex((e)=>e.name == input.name), 1)
        }
       }
     }
   }
  }
};