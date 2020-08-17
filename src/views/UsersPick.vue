<template>
    <div class="UsersPick">
        <!--
        <h5>Seleccionar voluntarios para tarea: <b>{{work.nombre}}</b></h5>
        <b-form-select v-model="optionSelected" :options="searchOptions" class="mb-3"></b-form-select>
        <b-form-input v-if="optionSelected === 1"
        class="mb-3" v-model="text" placeholder="Ingrese el nombre"></b-form-input>
        <b-card v-if="optionSelected === 1" class="mb-3"> 
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
                    <b-button block variant="outline-info" size="sm" @click="usersFilter(valueR1,valueR2)">Buscar</b-button>
                </b-col>
            </b-row>
        </b-card>
        <b-form-input v-if="optionSelected === 3"
        class="mb-3" v-model="text" placeholder="Ingrese la habilidad"></b-form-input>
        <b-form-input v-if="optionSelected === 4"
        class="mb-3" v-model="text" placeholder="Ingrese la emergencia"></b-form-input>
        -->

        <b-row>
            <b-col v-for="vol in voluntariesList" :key="vol.id"
                class="mb-3" cols="12" md="6" lg="4">
                <b-card no-body style="max-width: 20rem;" img-src="https://placekitten.com/380/200" img-alt="Image" img-top>
                    <b-card-body>
                        <b-card-title>{{vol.nombre}}</b-card-title>
                        <b-card-sub-title class="mb-2">Ocupacion</b-card-sub-title>
                        <b-card-text>Descripcion... Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis at quos veritatis rerum eum? Quasi eos repudiandae iste numquam laborum, cum, saepe voluptatibus obcaecati nobis eum doloremque quo aspernatur temporibus!</b-card-text>
                    </b-card-body>

                    <b-list-group flush>
                        <b-list-group-item class="d-flex justify-content-between align-items-center">
                            Ranking: {{vol.ranking}}
                            <b-form-rating id="rating-disabled" color="#ff8800" inline :value="vol.ranking" no-border readonly></b-form-rating>                            
                        <!--
                        </b-list-group-item>
                        <b-list-group-item class="d-flex justify-content-between align-items-center">
                            Tareas completadas
                            <b-avatar icon="calendar3" :size="40" badge="666" badge-top variant="ligth" badge-variant="dark"></b-avatar>
                        </b-list-group-item>
                        <b-list-group-item class="d-flex justify-content-between align-items-center">
                            Habilidades
                            <b-avatar icon="award" :size="40" badge="666" badge-top variant="ligth" badge-variant="dark"></b-avatar>
                            -->
                        </b-list-group-item>
                    </b-list-group>

                    <b-card-body>
                        <b-button block variant="outline-info" @click="addVoluntarie(vol.id)">Inscribir</b-button>
                    </b-card-body>
                </b-card>
            </b-col>     
        </b-row>
    
    </div>
</template>


<script>
import Showusers from '../components/Showusers.vue';
import {mapState} from 'vuex';
import axios from "axios";

export default {
    name: 'UsersPickc',
    components: {
        Showusers
    },

    data() {
      return {
        selected: null,
        optionSelected: null,
        work: null,
        voluntaries: null,
        filteredVoluntaries: null,
        rankings: null,
        voluntariesList: [],
        text: '',
        valueR1: 0,
        valueR2: 5,
        searchOptions: [
          { value: null, text: '-- Buscar --', disabled: true },
          { value: 1, text: 'Buscar por ranking' }
        ],
        newUserList: [],
        filter: 0
      }
    },

    computed: {
        ...mapState(['users'])
    },

    methods:{
        async getWorkAndVoluntaries(){
            let datos = await axios.get('http://localhost:8080/tareas/' + this.$route.params.id);
            this.work = await datos.data;
            let datoss = await axios.get('http://localhost:8080/tareas/getUnsummoned/'+ this.$route.params.id);
            this.voluntaries = await datoss.data;
            let datosss = await axios.get("http://localhost:8080/ranking/all");
            this.rankings = await datosss.data;

            let voluntariesLen = this.voluntaries.length;
            let rankLen = this.rankings.length;
            let i = 0;

            while(i < voluntariesLen){
                this.voluntariesList.push({
                    nombre: this.voluntaries[i].nombre,
                    fnacimiento: this.voluntaries[i].fnacimiento,
                    id: this.voluntaries[i].id,
                    ranking: this.getVoluntaryRanking(this.voluntaries[i].id, rankLen)
                });
                i = i + 1;
            }
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
        },

        async usersFilter(value1, value2){
            const stringV1 = value1.toString();
            const stringV2 = value2.toString();
            const queryString = "http://localhost:8080/voluntarios/getVolWithRankingIn/" + stringV1 + "/and/" + stringV2;
            //this.filter = 1;
            let filterData = await axios.get(queryString)
            this.filteredVoluntaries = await filterData.data;
            console.log(this.filteredVoluntaries);

            this.voluntariesList = [];
            let voluntariesLen = this.filteredVoluntaries.length;
            let rankLen = this.rankings.length;
            let i = 0;
            console.log("volLen: ", voluntariesLen);
            while(i < voluntariesLen){
                console.log("i = ", i);
                this.voluntariesList.push({
                    nombre: this.filteredVoluntaries[i].nombre,
                    fnacimiento: this.filteredVoluntaries[i].fnacimiento,
                    id: this.filteredVoluntaries[i].id,
                    ranking: this.getVoluntaryRanking(this.filteredVoluntaries[i].id, rankLen)
                });
                i = i + 1;
            }
            this.filter = 1;
            console.log("Assigned filtered voluntaries", this.voluntariesList);
        },

        addVoluntarie(id_vol) {
            axios.post('http://localhost:8080/ranking/add', {
            puntaje: 0,
            flg_invitado: 0,
            flg_participa: 0,
            id_voluntario: id_vol,
            id_tarea: this.work.id
            }).then(location.reload());
        }
    },

    created (){
        this.getWorkAndVoluntaries();
    }
}
</script>