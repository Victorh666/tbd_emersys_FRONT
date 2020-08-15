<template>
    <div>
        <b-button type="button" v-on:click="Redirigir()" style="float:right" >Crear Tarea</b-button>
        <b-row>
            <!--      {id: 1, nombre: 'tarea 1', descrip: 'wena choro soy la tarea 1', cant_vol_requeridos: 3, cant_vol_inscritos: 2, finicio: 'el dia que me quiera matar', ffinal: 'el dia que me mate', id_emergencia:1, id_estado: 1}-->
            <b-col v-for="task in tasks" :key="task.id"
                class="mb-3" cols="12" md="6" lg="4">
                <b-card no-body style="max-width: 20rem;" img-src="https://www.telesurtv.net/__export/1539448568164/sites/telesur/img/multimedia/2018/10/13/conozca_los_desastres_naturales_mxs_mortxferos_de_2018-reuters-edit_mini.jpg_1718483347.jpg" img-alt="Image" img-top>
                    <b-card-body>
                        <b-card-title>{{task.nombre}}</b-card-title>
                        <b-card-sub-title class="mb-2">Descripcion</b-card-sub-title>
                        <b-card-text>{{task.descrip}}</b-card-text>
                    </b-card-body>

                    <b-list-group flush>
                        <b-list-group-item class="d-flex justify-content-between align-items-center">
                            Cantidad voluntarios inscritos
                            <b-avatar icon="person" :size="40" :badge="task.cant_vol_inscritos"  badge-top variant="ligth" badge-variant="dark"></b-avatar>
                        </b-list-group-item>
                        <b-list-group-item class="d-flex justify-content-between align-items-center">
                            Cantidad voluntarios requeridos
                            <b-avatar v-if="task.cant_vol_requeridos == task.cant_vol_inscritos" icon="person-check" :size="40" :badge="task.cant_vol_requeridos"  badge-top variant="ligth" badge-variant="dark"></b-avatar>
                            <b-avatar v-else icon="person" :size="40" :badge="task.cant_vol_requeridos"  badge-top variant="ligth" badge-variant="dark"></b-avatar>
                        </b-list-group-item>
                        <b-list-group-item class="d-flex justify-content-between align-items-center">
                            Fecha de inicio: {{task.finicio}}
                        </b-list-group-item>
                        <b-list-group-item class="d-flex justify-content-between align-items-center">
                            Fecha de termino: {{task.ffin}}
                        </b-list-group-item>
                        <b-list-group-item class="d-flex justify-content-between align-items-center">
                            Estado: {{Estado(task.id_estado)}}
                             <b-iconstack font-scale="2">
                                <b-icon v-if="task.id_estado==1" stacked icon="circle-fill" variant="danger"></b-icon>
                                <b-icon v-else stacked icon="circle-fill" variant="primary"></b-icon>
                                <b-icon v-if="task.id_estado==1" stacked icon="lock-fill" scale="0.5" variant="white"></b-icon>
                                <b-icon v-else stacked icon="unlock-fill" scale="0.5" variant="white"></b-icon>
                                <b-icon stacked icon="circle" variant="dark"></b-icon>
                            </b-iconstack>
                        </b-list-group-item>
                        <b-card-body>
                            <a :href="`/emergencies/task/abilities/${task.id}`" class="card-link" > Editar habilidades</a>

                        </b-card-body>
                    </b-list-group>
                </b-card>
            </b-col>     
        </b-row>
    </div>
</template>


<script>
import axios from 'axios';

export default {
    name: 'Tasks',
    data(){
        return{
            tasks:null
        }
    },
    created(){
        this.getEmergencieTasks()
    },
    methods:{
        async getEmergencieTasks(){
                let datos = await axios.get('http://localhost:8080/emergencias/getTareas/' + this.$route.params.id)
                this.tasks=await datos.data
        },
        Estado(value1){
            if (value1==2){
                return "Activo"
            }
            else
            {
                return "Inactivo"
            }
        },
        Redirigir(){
            window.location.href='/emergencies/Task/create/' + this.$route.params.id
        }
    }
}
</script>