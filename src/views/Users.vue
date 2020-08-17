<template>
    <div class="users">
        <!--<h5>{{voluntaries}}</h5>
        <h5>{{rankings}}</h5>-->
        <b-form-select v-model="optionSelected" :options="searchOptions" class="mb-3"></b-form-select>
       <!-- <b-form-input v-if="optionSelected === 1"
        class="mb-3" v-model="text" placeholder="Ingrese el nombre">
        </b-form-input> -->
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
       <!-- <b-form-input v-if="optionSelected === 3"
        class="mb-3" v-model="text" placeholder="Ingrese la habilidad"></b-form-input>
        <b-form-input v-if="optionSelected === 4"
        class="mb-3" v-model="text" placeholder="Ingrese la emergencia"></b-form-input> -->

        <Showusers v-if="filter === 0" :filteredVoluntariesRender="voluntariesList"/>
        <Showusers v-else :filteredVoluntariesRender="filteredVoluntariesList"/>
       
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
          //{ value: 1, text: 'Buscar por nombre' },
          { value: 2, text: 'Buscar por ranking' },
         // { value: 3, text: 'Buscar por habilidades' },
         // { value: 4, text: 'Buscar por emergencia'}
        ],
        voluntariesList: [],
        filteredVoluntariesList: [],
        voluntaries: null,
        filteredVoluntaries: null,
        rankings: null,
        fields: [{key: 'nombre', label: 'Nombre', sortable: true}, {key: 'fnacimiento', label: 'Fnacimiento'},
                 {key: 'ranking', label: 'Ranking'}], 
        filter: 0
      }
    },
    created(){
        this.getVoluntariesAndRankings();        
    },
    methods:{
        async usersFilter(value1, value2){
            const stringV1 = value1.toString();
            const stringV2 = value2.toString();
            const queryString = "http://localhost:8080/voluntarios/getVolWithRankingIn/" + stringV1 + "/and/" + stringV2;
            //this.filter = 1;
            let filterData = await axios.get(queryString)
            this.filteredVoluntaries = await filterData.data;
            console.log(this.filteredVoluntaries);

            this.filteredVoluntariesList = [];
            let voluntariesLen = this.filteredVoluntaries.length;
            let rankLen = this.rankings.length;
            let i = 0;
            console.log("volLen: ", voluntariesLen);
            while(i < voluntariesLen){
                console.log("i = ", i);
                this.filteredVoluntariesList.push({
                    nombre: this.filteredVoluntaries[i].nombre,
                    fnacimiento: this.filteredVoluntaries[i].fnacimiento,
                    id: this.filteredVoluntaries[i].id,
                    ranking: this.getVoluntaryRanking(this.filteredVoluntaries[i].id, rankLen)
                });
                i = i + 1;
            }
            this.filter = 1;
            console.log("Assigned filtered voluntaries", this.filteredVoluntariesList);
        },

        async getVoluntariesAndRankings(){            
            let voluntariesData = await axios.get("http://localhost:8080/voluntarios/all")
            this.voluntaries = await voluntariesData.data;
            let rankingData = await axios.get("http://localhost:8080/ranking/all")
            this.rankings = await rankingData.data;

            console.log("Rankings: ", this.rankings);
            console.log("first of rankings is:", this.rankings[0]);
            console.log(this.voluntaries);
            //this.filter = 0;
            this.voluntariesList = [];
            let voluntariesLen = this.voluntaries.length;
            let rankLen = this.rankings.length;
            let i = 0;
            console.log("i = ", i, ", length of voluntaries array = ", voluntariesLen);
            while(i < voluntariesLen){
                this.voluntariesList.push({
                    nombre: this.voluntaries[i].nombre,
                    fnacimiento: this.voluntaries[i].fnacimiento,
                    id: this.voluntaries[i].id,
                    ranking: this.getVoluntaryRanking(this.voluntaries[i].id, rankLen)
                });
                i = i + 1;
            }
            this.filter = 0;
            console.log("Assigned to array", this.voluntariesList[0]);
        },

        getVoluntaryRanking(volId, rankLen){
            let j = 0;
            console.log("rankLen = ", rankLen, "and j = ", j);
            while(j < rankLen){
                console.log("VolId = ", volId, " this.rankings[i].id_voluntario = ", this.rankings[j].id_voluntario);
                if(this.rankings[j].id_voluntario == volId){
                    return this.rankings[j].puntaje;
                }
                j = j + 1;
            }
            return "Sin ranking";
        }
    }
};
</script>