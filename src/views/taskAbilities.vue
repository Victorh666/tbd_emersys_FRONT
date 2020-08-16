<template>
    <div class="TaskAbilities">
        <b-container class="border border rounded mb-4" >
            <h2 class="p-3" align="center">Editar Habilidades </h2>
            <b-card>
                <b-card-title >Nombre de la tarea:</b-card-title>
                <b-card-text align="center">{{task.nombre}}</b-card-text>
            </b-card>
             <b-card>
                <b-card-title >Descripción de la tarea:</b-card-title>
                <b-card-text align="center">{{task.descrip}}</b-card-text>
            </b-card>
            <b-card>
                <b-card-title >Fecha de inicio:</b-card-title>
                <b-card-text align="center">{{task.finicio}}</b-card-text>
            </b-card>
            <b-card>
                <b-card-title >Fecha de término:</b-card-title>
                <b-card-text align="center">{{task.ffin}}</b-card-text>
            </b-card>
            <b-card>
                <b-card-title>Habilidades de la tarea</b-card-title>
                <ul id="task abililities">
                <li v-for="ability in taskSkillList">
                    {{ ability.descrip }}
                </li>
                </ul>
            </b-card>            
            <b-card>
                <b-card-title>Habilidades Para asignar</b-card-title>
                <div class="d-block text-center">
                    <b-form-group >                     
                    <b-form-checkbox
                        v-for="ability in abilities"
                        v-model="skillList"
                        :key="ability.id"
                        :value="ability.id"
                        name="flavour-4a"
                        inline>
                        {{ ability.descrip }}
                    </b-form-checkbox>                
                    </b-form-group>
                </div>
            </b-card>
            <b-row class="p-4">
                <b-col>
                    <b-button block type="button" v-on:click="asignarHabilidades()"  >Editar Habilidades</b-button>
                </b-col>
                <b-col>
                    <b-button block variant="outline-dark" v-on:click="redirigir()" >Cancelar</b-button>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>



<script>
import axios from 'axios'
export default {
    name: 'TaskAbilities',
    data(){

        return {
            task: null,
            abilities:null,
            taskSkillList:null,
            skillList:[],
            muestras:null
      }
    },
    created(){
        this.getTask()
        this.getAbilities()
        this.getTaskAbilities()
    },

    methods: {        
        async getTask(){
            let datos = await axios.get('http://localhost:8080/tareas/'+this.$route.params.id)
            this.task=await datos.data
        },  
        async getAbilities(){
            let datos = await axios.get('http://localhost:8080/tareas/getMissingHabilidades/'+this.$route.params.id)
            this.abilities=await datos.data
        },        
        async getTaskAbilities(){
            let datos = await axios.get('http://localhost:8080/tareas/getHabilidades/'+this.$route.params.id)
            this.taskSkillList=await datos.data
        },
        redirigir(){
            window.history.back()
        },     
        asignarHabilidades(){    
            
            if(this.skillList.length !=0)
            {
                for(var i = 0; i < this.skillList.length; i++)    
                {    axios.post('http://localhost:8080/tarea_habilidades/add',{
                        id_tarea: this.$route.params.id  ,
                        id_emehab: this.skillList[i]
                    })
                }
                    window.history.back()
            }
            
        }
    }
}
</script>