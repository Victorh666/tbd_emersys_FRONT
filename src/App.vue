<template>
  <div id="app">
    <div class="p-3">
      <b-navbar toggleable="lg" type="dark" variant="info">
        

        <b-navbar-brand :to="{name: 'Dashboard'}">Sistema de Emergencia</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        
        <b-collapse id="nav-collapse" is-nav>
          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <!--
            <b-nav-item :to="{name: 'About'}">About</b-nav-item>
            -->
            <b-nav-item :to="{name: 'Dashboard'}">Home</b-nav-item>
            
            <b-nav-item :to="{name: 'Emergencies'}">Emergencia</b-nav-item>
            <!--
            <b-nav-item-dropdown text="Emergencia" right>
              <b-dropdown-item :to="{name: 'Emergencies'}">Ver emergencias</b-dropdown-item>
              <b-dropdown-item :to="{name: 'CreateEmergency'}">Crear emergencia</b-dropdown-item>
            </b-nav-item-dropdown>
            -->
            <b-nav-item :to="{name: 'Users'}">Usuarios</b-nav-item>

            <b-nav-item :to="{name: 'Work'}">Tareas</b-nav-item>

            <b-nav-item to="">Iniciar Sesion</b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>

    <b-container>
      <router-view/>
    </b-container>
  </div>
</template>

