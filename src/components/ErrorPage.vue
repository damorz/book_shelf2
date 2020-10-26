<template>
<v-container fluid fill-height style="background-color:#373737;">
    <v-container  class=" error-404" fill-height>
        <v-row>
            <v-col cols="6" style="margin-top:10%; color:white;">
                <h1>Oops !</h1>
                 <h4>We couldn't find this page :(</h4>
                 <br>
                 <hr>
                 <v-btn @click="goHome" color="primary">
                    Go To Home
                 </v-btn>
            </v-col>
            <v-col cols="6">
               <img src="../assets/errorPic.png" >
            </v-col>
        </v-row>
        
    </v-container>
    </v-container>
</template>

<script>
export default {
    methods: {
        goHome() {
            this.$router.push({name: "home"});
        }
    }
}
</script>