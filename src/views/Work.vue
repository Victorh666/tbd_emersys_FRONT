<template>
   <div class="Work">
      <b-table :items="items" :fields="fields" responsive="sm" headVariant="light">
         <template v-slot:cell(show_details)="row">
            <b-button size="sm" @click="row.toggleDetails" class="mr-2">
               {{ row.detailsShowing ? 'Ocultar' : 'Ver'}} Detalles
            </b-button>    
         </template>

         <template v-slot:row-details="row">
            <b-card>
               <b-row class="mb-2">
                  <b-col sm="2" class="text-sm"> <b>Estado:</b></b-col>
                  <b-col sm="5" class="text-sm left">   {{ row.item.id_estado }}</b-col>
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
                     <b-button variant="info" size="sm" class="mr-2"> Inscribir Voluntario</b-button>    
                  </b-col>
               </b-row>
            </b-card>
         </template>
      </b-table>
   </div>
</template>


<script>
export default {
   name: 'Work',
   data() {
      return {
         fields: [{key: 'nombre', label: 'Tarea', sortable: true}, {key: 'id_emergencia', label: 'Emergencia', sortable: true},
         {key: 'vol_req_ins', label: 'Voluntarios Ins/Req'}, {key: 'show_details', label: 'Detalles'}],
         items: [
            {nombre: 'Ordenar mi pieza', descrip: 'descripcion bla bla bla', vol_req_ins: '7/10',
               finicio: '10-10-2020', ffin: '15-10-2020', id_emergencia: 'Casa', id_estado: 'En curso'},
            
            {nombre: 'Pasar el semestre', descrip: 'descripcion bla bla bla', vol_req_ins: '2/10',
               finicio: '10-10-2020', ffin: '15-10-2020', id_emergencia: 'Universidad', id_estado: 'En curso'},
            
            {nombre: 'Tener amigos', descrip: 'descripcion bla bla bla', vol_req_ins: '1/10',
               finicio: '10-10-2020', ffin: '15-10-2020', id_emergencia: 'Social', id_estado: 'Suspendida'}

        ]
      }
   }

}
</script>