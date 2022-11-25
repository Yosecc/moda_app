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
   prepareData(inputs, isAlert = true){
     let data = {}
     inputs.forEach((input)=>{
       this.validate(input, isAlert)
       data[input.name] = input.model
     })
     return data
   },
    validate(input, isAlert){
     this.errors = []
     if(input.required){
       if([undefined, '' , null].includes(input.model)){
        this.errors.push({name: input.name, mensaje: `${input.hint} es requerido`})
        if(isAlert){
          alert(`${input.hint} es requerido`)
        }
       
       }else{

        let errores = this.errors.filter((e)=> e.name == input.name)
        if(this.errors.findIndex((e)=>e.name == input.name) != -1){
         this.errors.splice(this.errors.findIndex((e)=>e.name == input.name), 1)
        }
        
       }
     }
    
     if(this.errors.length){
       return false
     }

     return true
   },
    validadores(inputs){
      let validator = []
      inputs.forEach((input)=>{
        if(input.required){
          if(input.model == '' || input.model == null || input.model == undefined){
            validator.push(false)
          }else{
            validator.push(true)
          }
        }else{
          validator.push(true)
        }
      })
      return !validator.includes(false)
    },
    setModelsInputs(inputs, data)
    {
      if(typeof data == 'object'){
        for(var i in data){
          if(inputs.find((e)=> e.name == i) != undefined){
            inputs.find((e)=> e.name == i).model = data[i]

            if(inputs.find((e)=> e.name == i).typeInput == 'select'){
              // console.log('de',inputs.find((e)=> e.name == i))
              let model = inputs.find((e)=> e.name == i).model
              let values = inputs.find((e)=> e.name == i).values
              console.log(values)
              if(values != undefined && values.length){
                inputs.find((e)=> e.name == i).title = values.find((e)=> e.id == model).name
              }

            }

          }
        }
      }
    }
  }
};