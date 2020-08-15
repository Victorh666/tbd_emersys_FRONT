<template>
    <div class="Abilities">
        <b-container class="border border rounded mb-4" >
            <h2 class="p-3" align="center">Editar Habilidades </h2>
            <b-card>
                <b-card-title >Nombre de la emergencia:</b-card-title>
                <b-card-text align="center">{{emergencie.nombre}}</b-card-text>
            </b-card>
             <b-card>
                <b-card-title >Descripción de la emergencia:</b-card-title>
                <b-card-text align="center">{{emergencie.descrip}}</b-card-text>
            </b-card>
            <b-card>
                <b-card-title >Fecha de inicio:</b-card-title>
                <b-card-text align="center">{{emergencie.finicio}}</b-card-text>
            </b-card>
            <b-card>
                <b-card-title >Fecha de término:</b-card-title>
                <b-card-text align="center">{{emergencie.ffin}}</b-card-text>
            </b-card>
            <b-card>
                <b-card-title >Institucion:</b-card-title>
                <b-card-text align="center">{{institution.nombre}}</b-card-text>
            </b-card>
            <b-card>
                <b-card-title>Habilidades de la emergencia</b-card-title>
                <ul id="emergencie abililities">
                <li v-for="ability in emergencieSkillList">
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
import axios from 'axios';
export default {
    name: 'Abilities',
    data(){

        return {
            emergencie: null,
            institution: null,
            abilities:null,
            emergencieSkillList:null,
            skillList:[]
      }
    },
    created(){
        this.getEmergencie()
        this.getInstitution()
        this.getAbilities()
        this.getEmergencieAbilities()
    },

    methods: {         
        async getEmergencie(){
            let datos = await axios.get('http://localhost:8080/emergencias/'+this.$route.params.id)
            this.emergencie=await datos.data

        },
        async getInstitution(){
            let datos = await axios.get('http://localhost:8080/instituciones/'+this.$route.params.instId)
            this.institution=await datos.data
        },        
        async getAbilities(){
            let datos = await axios.get('http://localhost:8080/emergencias/getMissingHabilidades/' + this.$route.params.id)
            this.abilities=await datos.data
        },        
        async getEmergencieAbilities(){
            let datos = await axios.get('http://localhost:8080/emergencias/getHabilidades/'+this.$route.params.id)
            this.emergencieSkillList=await datos.data
        },
        redirigir(){
            window.location.href = '/emergencies'
        },
        asignarHabilidades(){   
            
            if(this.skillList.length !=0)
            { 
                for(var i = 0; i < this.skillList.length; i++)
                {    
                    axios.post('http://localhost:8080/eme_habilidades/add',{
                        id_emergencia: this.$route.params.id  ,
                        id_habilidad: this.skillList[i]
                    })
                }
                this.redirigir()
            }
            
        }
    }
}
</script>