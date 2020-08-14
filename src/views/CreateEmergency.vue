<template>
    <div class="CreateEmergency">
        <b-container class="border border rounded mb-4" >
            <h2 class="p-3" align="center">Nueva Emergencia</h2>
            <b-alert v-model="incompleteAlert" variant="danger" dismissible class="mt-3">
                Datos incompletos!
            </b-alert>
            <b-form-group class="mt-2">
                <h6> <strong>Nombre</strong></h6>
                <b-form-input
                    v-model="emergencyName"
                    required
                    placeholder="Ingrese el nombre de la emergencia"
                ></b-form-input>
            </b-form-group>

            <!--
            <b-form-group>
                <h6><strong>Institución</strong></h6>
                <b-row>
                    <b-col cols="3">
                        Nombre de la institución:
                    </b-col>
                    <b-col cols="9">
                        <b-form-select v-model="nameInstitution" :options="institutionOptions"></b-form-select>
                    </b-col>
                </b-row>

            </b-form-group>
            -->
            <b-form-group>
                <h6><strong>Institución</strong></h6>
                <b-row>
                    <b-col cols="3">
                        Nombre de la institución:
                    </b-col>
                    <b-col  cols="9">                    
                        <b-form-select  v-model="nameInstitution" >
                        <option v-for="institution in institutions" :key="institution.id" :value="institution.id">{{institution.nombre}}</option>
                        </b-form-select>
                    </b-col>
                </b-row>
            </b-form-group>
            <!--
            <b-form-group>
                <h6><strong>Tareas</strong></h6>
                <b-row class="mb-3">
                    <b-col cols="10">
                        <b-form-input
                            v-model="newWork"
                            required
                            placeholder="Ingrese una tarea par la emergencia"
                        ></b-form-input>
                    </b-col>
                    <b-col cols="2" align="center">
                        <b-button variant="outline-info" size="sm" @click="addWork">Agregar</b-button>
                    </b-col>
                </b-row>

                <b-table v-if="flag===1"
                :fields="fields" :items="workList" responsive="sm">
                    <template v-slot:cell(numero)="data">
                        {{ data.index + 1 }}
                    </template>

                    <template v-slot:cell(action)>
                        <b-button variant="outline-danger" size="sm" @click="deleteWork()">Borrar</b-button>
                    </template>
                </b-table>

            </b-form-group>

            <b-form-group >
                <h6><strong>Habilidades</strong></h6>
                <b-form-checkbox
                    v-for="option in options"
                    v-model="skillList"
                    :key="option.value"
                    :value="option.value"
                    name="flavour-4a"
                    inline>
                    {{ option.text }}
                </b-form-checkbox>
                
            </b-form-group>
            -->

            <b-form-group >
                <h6><strong>Descripción</strong></h6>
                <b-form-textarea
                    v-model="newDescription"
                    placeholder="Ingrese una descripción para la emergencia"
                ></b-form-textarea>
                
            </b-form-group>

            <b-form-group >
                <h6><strong>Fecha</strong></h6>
                <b-row>
                    <b-col>
                        <b-row>
                            <b-col cols="2">
                                Desde:
                            </b-col>
                            <b-col cols="10">
                                <b-form-datepicker v-model="dateI" :min="min" locale="es"
                                placeholder="Ingrese una fecha de inicio" :start-weekday="1"></b-form-datepicker>
                            </b-col>
                        </b-row>
                    </b-col>
                    <b-col>
                        <b-row>
                            <b-col cols="2">
                                Hasta:
                            </b-col>
                            <b-col cols="10">
                                <b-form-datepicker v-model="dateF" :min="min" locale="es"
                                placeholder="Ingrese una fecha final" :start-weekday="1"></b-form-datepicker>
                            </b-col>
                        </b-row>
                    </b-col>

                </b-row>   
            </b-form-group>

            <b-row class="p-4">
                <b-col>
                    <b-button block variant="outline-info" @click="verifyData" >Crear</b-button>
                </b-col>
                <b-col>
                    <b-button block variant="outline-dark" :to="{name: 'Dashboard'}" >Cancelar</b-button>
                </b-col>
            </b-row>

            <b-modal ref="validationCompleted" title="Emergencia creada" ok-only v-on:click="redirigir()">
                <p class="my-4">La emergencia fue creada excitosamente!</p>
                <h6>{{newEmergency}}</h6>
            </b-modal>
            
        </b-container>
    </div>
</template>



<script>
import axios from 'axios';
export default {
    name: 'CreateEmergency',
    data() {
        const now = new Date()
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
        // 15th two months prior
        const minDate = new Date(today)

        return {
            emergencyName: '',
            newDescription: '',
            newWork: '',
            nameInstitution: null,
            institutionOptions: [
                {value: null, text: '-- Nombre institucion --', disable: true},
                {value: 1, text: 'Institución 1'},
                {value: 2, text: 'Institución 2'},
                {value: 3, text: 'Institución 3'},
                {value: 4, text: 'Institución 4'}
            ],
            fields: ['numero', 'tarea', {key: 'action', label: ' '}],
            flag: 0,
            workList: [],
            workListAux: [],
            skillList: [],
            options: [
            { text: 'Habilidad 1', value: 'habilidad1' },
            { text: 'Habilidad 2', value: 'habilidad2' },
            { text: 'Habilidad 3', value: 'habilidad3' },
            { text: 'Habilidad 4', value: 'habilidad4' },
            { text: 'Habilidad 5', value: 'habilidad5' },
            { text: 'Habilidad 6', value: 'habilidad6' },
            { text: 'Habilidad 7', value: 'habilidad7' },
            { text: 'Habilidad 8', value: 'habilidad8' }
            ],
            dateI: '',
            dateF: '',
            min: minDate,
            dataValidation: 0,
            incompleteAlert: false,
            newEmergency: [],
            institutions: null
      }
    },
    created(){
        this.getInstituciones()
    },
    methods: {
        async getInstituciones(){
            let datos = await axios.get('http://localhost:8080/instituciones/all')
            this.institutions=await datos.data
        },
        postEmergencie(){
            console.log("precione un boton")
        },
        redirigir(){
             window.location.href = '/emergencies'
        },
        addWork(){
            if(this.newWork == ''){
                return
            }
            this.workList.push({tarea: this.newWork});
            this.newWork = '';
            this.flag = 1;
        },
        deleteWork(){
        },
        verifyData(){
            if(
                this.emergencyName != '' &&
                this.workList != [] &&
                this.skillList != [] &&
                this.newDescription != '' &&
                this.dateI != '' &&
                this.dateF != ''
            ){
                this.dataValidation = 1;

                this.workList.forEach(element => {
                    this.workListAux.push(element.tarea);
                });
                axios.post('http://localhost:8080/emergencias/add',{
                    nombre: this.emergencyName,
                    descrip: this.newDescription,
                    finicio: this.dateI,
                    ffin: this.dateF,
                    id_institucion: this.nameInstitution
                })
                this.newEmergency = {
                    name: this.emergencyName,
                    idInstitution: this.nameInstitution, 
                    work: this.workListAux,                    
                    skills: this.skillList,
                    decription: this.newDescription,
                    iDate: this.dateI,
                    fDate: this.dateF
                }

                this.$refs['validationCompleted'].show();
                this.emergencyName = '';
                this.workList = [];
                this.workListAux = [];
                this.skillList = [];
                this.newDescription = '';
                this.dateI = '';
                this.dateF = '';
            }
            else {
                this.incompleteAlert = true;
            }
        }   
    }
}
</script>