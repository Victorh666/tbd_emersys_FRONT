<template>
    <div>
        <b-row>
            <b-col v-for="user in userList" :key="user.id"
                class="mb-3" cols="12" md="6" lg="4">
                <b-card no-body style="max-width: 20rem;" img-src="https://placekitten.com/380/200" img-alt="Image" img-top>
                    <b-card-body>
                        <b-card-title>{{user.name}}</b-card-title>
                        <b-card-sub-title class="mb-2">Ocupacion</b-card-sub-title>
                        <b-card-text>Descripcion... Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis at quos veritatis rerum eum? Quasi eos repudiandae iste numquam laborum, cum, saepe voluptatibus obcaecati nobis eum doloremque quo aspernatur temporibus!</b-card-text>
                    </b-card-body>

                    <b-list-group flush>
                        <b-list-group-item class="d-flex justify-content-between align-items-center">
                            Ranking {{user.ranking}}
                            <b-form-rating id="rating-disabled" color="#ff8800" inline :value="user.ranking" no-border readonly></b-form-rating>                            
                        
                        </b-list-group-item>
                        <b-list-group-item class="d-flex justify-content-between align-items-center">
                            Tareas completadas
                            <b-avatar icon="calendar3" :size="40" badge="666" badge-top variant="ligth" badge-variant="dark"></b-avatar>
                        </b-list-group-item>
                        <b-list-group-item class="d-flex justify-content-between align-items-center">
                            Habilidades
                            <b-avatar icon="award" :size="40" badge="666" badge-top variant="ligth" badge-variant="dark"></b-avatar>
                        </b-list-group-item>
                    </b-list-group>

                    <b-card-body>
                        <a href="#" class="card-link">Card link</a>
                        <a href="#" class="card-link">Detalles</a>
                    </b-card-body>
                </b-card>
            </b-col>     
        </b-row>
    </div>
</template>


<script>
export default {
  name: 'Showusers',
  props: {
    userList: Array
  }
}
</script>