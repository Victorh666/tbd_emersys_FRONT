<template>
   <div class="Work">
      <b-table :items="workTable" :fields="fields" responsive="sm" headVariant="light">
         <template v-slot:cell(show_details)="row">
            <b-button size="sm" @click="row.toggleDetails" class="mr-2">
               {{ row.detailsShowing ? 'Ocultar' : 'Ver'}} Detalles
            </b-button>    
         </template>

         <template v-slot:row-details="row">
            <b-card>
               <b-row class="mb-2">
                  <b-col sm="2" class="text-sm"> <b>Estado:</b></b-col>
                  <b-col sm="5" class="text-sm left">   {{ row.item.estado }}</b-col>
               </b-row>

               <b-row class="mb-2">
                  <b-col sm="2" class="text-sm"> <b>Descripción:</b></b-col>
                  <b-col sm="5" class="text-sm left">   {{ row.item.descrip }}</b-col>
               </b-row>

               <b-row class="mb-2">
                  <b-col sm="2" class="text-sm"><b>Fecha de inicio:</b></b-col>
                  <b-col sm="5" class="text-sm left"> {{ row.item.finicio }}</b-col>
               </b-row>
               
               <b-row class="mb-2">
                  <b-col sm="2" class="text-sm"><b>Fecha final:</b></b-col>
                  <b-col sm="7" class="text-sm left">  {{ row.item.ffin }}</b-col>
                  <b-col sm="3">
                     <b-button href="/userspick" variant="info" size="sm" class="mr-2"> Inscribir Voluntario</b-button>    
                  </b-col>
               </b-row>
            </b-card>
         </template>
      </b-table>
   </div>
</template>


<script>
   import axios from "axios";
   export default {
      name: 'Work',
      data() {
         return {
            works: null,
            emerAux: null,
            fields: [{key: 'nombre', label: 'Tarea', sortable: true}, {key: 'emergencia', label: 'Emergencia', sortable: true},
            {key: 'voluntarios_rq_ins', label: 'Voluntarios Ins/Req'}, {key: 'show_details', label: 'Detalles'}],
            workTable: []
         }

      },
      methods: {
         async getWorks(){
            let datos = await axios.get('http://localhost:8080/tareas/all');
            this.works = await datos.data;
            datos = await axios.get('http://localhost:8080/emergencias/all');
            this.emerAux = await datos.data;
            
            let len = this.works.length;
            let lenEmerg = this.emerAux.length;
            let i = 0;

            while (i < len){
               this.workTable.push({
                  nombre: this.works[i].nombre,
                  descrip: this.works[i].descrip,
                  finicio: this.works[i].finicio,
                  ffin: this.works[i].ffin,
                  emergencia: this.getEmergencyWork(this.works[i].id_emergencia, lenEmerg),
                  voluntarios_rq_ins: this.getVoluntaries(this.works[i].id, len),
                  estado: this.getStatus(this.works[i].id_estado)
               });
               i = i + 1;
            }
         },

         getEmergencyWork(id_emerg, len_emerg){
            let j = 0;
            while (j < len_emerg){
               if (this.emerAux[j].id == id_emerg){
                  return this.emerAux[j].nombre;
               }
               j = j + 1;
            }
            return 'gg';
         },

         getVoluntaries(id_tarea, len_work){
            let i = 0;
            while (i < len_work){
               if (this.works[i].id == id_tarea){
                  return this.works[i].cant_vol_inscritos + '/' + this.works[i].cant_vol_requeridos; 
               }
               i = i + 1;
            }
            return 'gg';
         },

         getStatus(id_estado){ 
            let estado = '';
            if (id_estado == 0){
               estado = 'algo'
            }
            else if (id_estado == 1){
               estado = 'En proceso'
            }
            return estado;
         }
      },

      created(){
         this.getWorks()
      }

   }
</script>