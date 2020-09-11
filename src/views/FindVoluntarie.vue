<template>
    <div class="FindVoluntarie">
        <h1 align="center"> Ubicación de voluntarios </h1>
        <h3 align="center"> Ubicación: {{point}}</h3>
        <b-row > 
            <b-button type="button" v-on:click="filtro(regionActual)" >Filtrar</b-button>
            <b-col  cols="9">                    
                <b-form-select  v-model="regionActual" >
                <option v-for="region in regions" :key="region.id" :value="region">{{region.nombre}}</option>
                </b-form-select>
            </b-col>
        </b-row>
        
        <div> {{message}} </div>
        <div id="mapid"></div>
    </div>
</template>

<script>
import 'leaflet/dist/leaflet';
import 'leaflet/dist/leaflet.css';
var icon = require('leaflet/dist/images/marker-icon.png');
var LeafIcon= L.Icon.extend({
    options: { iconSize:[25,34], iconAnchor:[12,41], popupAnchor:[-3,-41]}
});
var myIcon= new LeafIcon({iconUrl: icon});

import axios from 'axios';
export default {
    name: 'Test',
    data:function(){
        return{
            latitude: null,
            longitude: null,
            name: '',
            points:[],
            message:'',
            mymap:null,
            regionActual:null,
            regions:[
                {id:0,nombre:"Todos los voluntarios"},
                {id: 15, nombre:"Arica y Parinacota",latitud:-18.425,longitud:-69.673},
                {id:1, nombre: "Tarapacá",latitud:-20.287,longitud:-69.405},
                {id:2, nombre:"Antofagasta",latitud: -23.552,longitud: -68.926},
                {id:3, nombre: "Atacama",latitud:-27.458, longitud:-69.994},
                {id:4, nombre: "Coquimbo",latitud:-30.749,longitud: -71.057},
                {id:5, nombre: "Valparaíso",latitud:-32.967,longitud:-70.351},
                {id:13, nombre: "Metropolitana",latitud:-33.446,longitud:-70.654},
                {id:6, nombre:"O'Higgins",latitud:-34.514,longitud:-71.136},
                {id:7,nombre:"Maule",latitud:-35.661,longitud: -71.508},
                {id:8,nombre: "Biobío",latitud:-37.491,longitud:-72.324},
                {id:9, nombre:"Araucanía",latitud:-38.701,longitud:-72.266},
                {id:14, nombre:"Los Ríos",latitud:-40.038,longitud:-72.708},
                {id:10, nombre:"Los Lagos",latitud:-42.268,longitud:-73.101},
                {id:11, nombre:"Aysén",latitud:-46.517,longitud:-73.670},
                {id:12, nombre:"Magallanes",latitud:-52.584,longitud:-71.974}
            ]
        }
    },
    computed:{
        point(){
            if(this.latitude && this.longitude){
                let lat=this.latitude.toFixed(3);
                let lon = this.longitude.toFixed(3);
                return `(${lat}, ${lon})`;
            }
            else{
                return '';
            }
        }
    },
    methods:{
        clearMarkers:function(){
            this.points.forEach(p=>{
                this.mymap.removeLayer(p);
            })
            this.points = [];
        },
        filtro(region){
            console.log("este es region:",region)
            if(region != null)
            {
                if(region.id!=0)
                {
                    axios.get('http://localhost:8080/voluntarios/getAllWithin/'+region.id).then(resp =>
                    {
                        this.clearMarkers()
                        this.mymap.setView([region.latitud, region.longitud],7);
                        resp.data.forEach(point => {
                            let p=[point.latitud,point.longitud]
                            let marker = L.marker(p, {icon:myIcon})
                            .bindPopup(point.nombre)
                            this.points.push(marker);
                        }),
                        this.points.forEach(p=>{
                            p.addTo(this.mymap)
                        })
                    })
                    .catch(error => {
                        console.log('error', error);
                        this.message = 'Ocurrio un error'
                        });
                }
                else{
                    this.clearMarkers()
                    this.getPoints(this.mymap)
                    this.mymap.setView([-33.446, -70.654],7);
                }
            }
        },
        async getPoints(map){
            try{
               let response = await axios.get('http://localhost:8080/voluntarios/all');
               let dataPoints= response.data;
               
               dataPoints= 
               dataPoints.forEach(point => {
                   let p=[point.latitud,point.longitud]
                   let marker = L.marker(p, {icon:myIcon})
                   .bindPopup(point.nombre)
                   this.points.push(marker);
               });
               this.points.forEach(p=>{
                   p.addTo(map)
               })
               
               console.log(dataPoints)
            }
            catch(error){
                console.log('error', error);
                this.message = 'Ocurrio un error'
            }
        }
    },
    mounted:function(){
        let _this = this;
        this.mymap = L.map('mapid').setView([-33.446, -70.654],7);
         L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    	attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    	maxZoom: 10
        }).addTo(this.mymap);
        this.mymap.on('click',function(e){
            _this.latitude = e.latlng.lat;
            _this.longitude= e.latlng.lng;
        });
        //marcador de prueba
        //L.marker([-33.446, -70.654], {icon:myIcon}).addTo(this.mymap);
        this.getPoints(this.mymap);


    }
}
</script>
<style>
.FindVoluntarie{
    display:flex;
    flex-direction: column;
}
#mapid {
    height: 400px;
    width: 1200px;
}
</style>