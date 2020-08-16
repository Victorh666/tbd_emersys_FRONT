<template>
    <div class="UsersPick">
        <h5>Seleccionar voluntarios para tarea x</h5>
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
                    <b-button block variant="outline-info" size="sm" @click="usersFilter(valueR1,valueR2)">Buscar</b-button>
                </b-col>
            </b-row>
        </b-card>

        <b-form-input v-if="optionSelected === 3"
        class="mb-3" v-model="text" placeholder="Ingrese la habilidad"></b-form-input>
        <b-form-input v-if="optionSelected === 4"
        class="mb-3" v-model="text" placeholder="Ingrese la emergencia"></b-form-input>

        <Showusers v-if="filter === 0" :userList="users"/> 
        <Showusers v-else :userList="newUserList"/> 
    </div>
</template>


<script>
import Showusers from '../components/Showusers.vue'
import {mapState} from 'vuex';

export default {
    name: 'UsersPickc',
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
        newUserList: [],
        filter: 0
      }
    },

    computed: {
        ...mapState(['users'])
    },

    methods:{
        usersFilter(value1, value2){
            this.filter = 1;
            this.newUserList = [];
            const auxV = value2;
            if(value1 > value2){
                value2 = value1
                value1 = auxV;
            }

            this.users.forEach(element => {
                if(element.ranking >= value1 && element.ranking <= value2){
                    this.newUserList.push(element);
                }
            });

            return this.newUserList

        }
    }
}
</script>