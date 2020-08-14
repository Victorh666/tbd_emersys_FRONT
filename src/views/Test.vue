<template>
    <div>
        {{valor}}
    </div>
</template>

<script>
    import axios from "axios";
    export default {
        data(){
            return{
                valor:null
            }
        },
        methods:{
            async prueba(){
                 let datos = await axios.get('http://localhost:8080/emergencias/count')
                 console.log(datos.data);
                 this.valor=await datos.data
            }
        },
        created(){
            this.prueba()
        }

}
</script>