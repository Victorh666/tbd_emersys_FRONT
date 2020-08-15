<template>
    <div class="Abilities">
        
        <div class="CreateEmergency">
        <b-container class="border border rounded mb-4" >
            <h2 class="p-3" align="center">Nueva Tarea</h2>
            <b-alert v-model="Alert" :variant="estilo" dismissible class="mt-3">
                {{mensaje}}
            </b-alert>
            <b-form-group class="mt-2">
                <h6> <strong>Nombre</strong></h6>
                <b-form-input
                    v-model="taskName"
                    required
                    placeholder="Ingrese el nombre de la tarea"
                ></b-form-input>
            </b-form-group>

            <b-form-group >
                <h6><strong>Descripción</strong></h6>
                <b-form-textarea
                    v-model="newDescription"
                    placeholder="Ingrese una descripción para la tarea"
                ></b-form-textarea>
                
            </b-form-group>

            <b-form-group >
                <h6><strong>Cantidad de voluntarios requeridos</strong></h6>
                <b-form-textarea
                    v-model="vol"
                    placeholder="Ingrese la cantidad de voluntarios"
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
                    <b-button block variant="outline-info" @click="verifyData"  >Crear</b-button>
                </b-col>
                <b-col>
                    <b-button block variant="outline-dark" v-on:click="redirigir()" >Cancelar</b-button>
                </b-col>
            </b-row>
        </b-container>
    </div>
    </div>
        
</template>



<script>
import axios from 'axios';
export default {
    name: 'Abilities',
    data(){
        const now = new Date()
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
        // 15th two months prior
        const minDate = new Date(today)

        return {
            emergencie: null,
            abilities:null,
            TaskName: '',
            newDescription: '',
            dateI: '',
            dateF: '',
            min: minDate,
            vol:0,
            Alert: false,
            mensaje:'',
            estilo: ''
      }
    },
    created(){
    },

    methods: {
        verifyData(){
            if(
                this.taskName != '' &&
                this.newDescription != '' &&
                this.dateI != '' &&
                this.dateF != '' &&
                this. vol != 0 
            ){
                axios.post('http://localhost:8080/tareas/add',{
                    nombre: this.taskName,
                    descrip: this.newDescription,
                    cant_vol_requeridos: this.vol,
                    cant_vol_inscritos: 0,
                    finicio: this.dateI,
                    ffin: this.dateF,
                    id_emergencia: this.$route.params.id,
                    id_estado: 2
                }).then(this.mensaje="Creado correctamente!", this.Alert=true, this.estilo="success")
                .catch(error => {
                console.log(error)
                this.errored = true
                this.Alert=true
                this.mensaje="DATOS ERRONEOS!"
                this.estilo="danger"
                })
                .finally(this.loading=false)
                this.taskName=''
                this.newDescription=''
                this.dateI=''
                this.dateF=''
                this.vol=0
            }
                
            else {
                this.mensaje="Datos incompletos!"
                this.estilo="danger"
                this.Alert = true;
            }
        },
        redirigir(){
            window.location.href = '/emergencies/Task/' + this.$route.params.id
        }
    }
}
</script>