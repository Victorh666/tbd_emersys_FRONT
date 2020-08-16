<template>
    <div class="users">
        <b-form-select v-model="optionSelected" :options="searchOptions" class="mb-3"></b-form-select>
        <b-form-input v-if="optionSelected === 1"
        class="mb-3" v-model="text" placeholder="Ingrese el nombre"></b-form-input>
        <b-card v-if="optionSelected === 2" class="mb-3"> 
            <b-row>
                <b-col>
                    <h5>Ranking entre:</h5>
                </b-col>
                <b-col> 
                    <b-form-spinbutton v-model="valueR1" type="range" min="0" max="5" step="0.5" inline></b-form-spinbutton>        
                </b-col> 
                <b-col>
                    <h5> y </h5>        
                </b-col>
                <b-col>
                    <b-form-spinbutton v-model="valueR2" type="range" min="0" max="5" step="0.5" inline></b-form-spinbutton>
                </b-col>
                <b-col>
                    <b-button block variant="outline-info" size="sm" @click="usersFilter(valueR1, valueR2)">Buscar</b-button>
                </b-col>
            </b-row>
        </b-card>
        <b-form-input v-if="optionSelected === 3"
        class="mb-3" v-model="text" placeholder="Ingrese la habilidad"></b-form-input>
        <b-form-input v-if="optionSelected === 4"
        class="mb-3" v-model="text" placeholder="Ingrese la emergencia"></b-form-input>

        <Showusers v-if="filter === 0" :filteredVoluntariesRender="voluntaries"/>
        <Showusers v-else :filteredVoluntariesRender="filteredVoluntaries"/>
       
    </div>
</template>


<script>
import Showusers from '../components/Showusers.vue'
import axios from "axios";

export default {
    name: 'Users',
    components: {
        Showusers
    },

    data() {
      return {
        selected: null,
        optionSelected: null,
        text: '',
        valueR1: 0,
        valueR2: 5,
        searchOptions: [
          { value: null, text: '-- Buscar --', disabled: true },
          { value: 1, text: 'Buscar por nombre' },
          { value: 2, text: 'Buscar por ranking' },
          { value: 3, text: 'Buscar por habilidades' },
          { value: 4, text: 'Buscar por emergencia'}
        ],
        voluntariesList: [],
        voluntaries: null,
        filteredVoluntaries: null,
        fields: [{key: 'nombre', label: 'Nombre', sortable: true}, {key: 'fnacimiento', label: 'Fnacimiento'}], 
        filter: 0
      }
    },
    created(){
        this.getVoluntaries();
    },
    methods:{
        async usersFilter(value1, value2){
            const stringV1 = value1.toString();
            const stringV2 = value2.toString();
            const queryString = "http://localhost:8080/voluntarios/getVolWithRankingIn/" + stringV1 + "/and/" + stringV2;
            this.filter = 1;
            let filterData = await axios.get(queryString).catch(error=>console.log(error))
            this.filteredVoluntaries = await filterData.data;
            console.log(this.filteredVoluntaries.data);

            this.voluntariesList = [];
            let voluntariesLen = this.filteredVoluntaries.lenght;
            let i = 0;
            while(i < voluntariesLen){
                this.voluntariesList.push({
                    nombre: this.filteredVoluntaries[i].nombre,
                    fnacimiento: this.filteredVoluntaries[i].fnacimiento,
                    id: this.filteredVoluntaries[i].id
                });
            }
            console.log("Assigned filtered voluntaries");
        },
        async getVoluntaries(){            
            let voluntariesData = await axios.get("http://localhost:8080/voluntarios/all")
            this.voluntaries = await voluntariesData.data;
            console.log(this.voluntaries.data);
            this.filter = 0;
            this.voluntariesList = [];
            let voluntariesLen = this.voluntaries.length;
            let i = 0;
            console.log("i = ", i, ", lenght of voluntaries array = ", voluntariesLen);
            while(i < voluntariesLen){
                this.voluntariesList.push({
                    nombre: this.voluntaries[i].nombre,
                    fnacimiento: this.voluntaries[i].fnacimiento,
                    id: this.voluntaries[i].id
                });
                i = i + 1;
            }
            console.log("Assigned to array");
        }
    }
};
</script>