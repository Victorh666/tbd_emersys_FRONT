<template>
    <div class="FindVoluntarie">
        <h1> Ubicación de voluntarios </h1>
        <div> ubicación: {{point}}</div>
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
            mymap:null
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
                console.log(axios.get('http://localhost:8080/voluntarios/all').data)
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
    align-items: center;
}
#mapid {
    height: 500px;
    width: 1400px;
}
</style>