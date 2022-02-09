<template>
  <div>
    <v-app>

      <!-- Branchs List -->
        <div>
          <v-card >
              <header class="row content-header">
                <div class="col-6 content-title">
                <i class="fas fa-list"></i>   <span>{{$t('branchs.title')}}</span>
                </div>
                <div class="col-6 content-actions clients">
                </div>
              </header> 
              <v-card-title>
                    <v-text-field
                  v-model="search"
                  append-icon="mdi-magnify"
                  label="Search"
                  single-line
                  hide-details 
                ></v-text-field>
              </v-card-title>
              <v-data-table
                :headers="branch_headers"
                :items="branchs"
                :search="search"
              >
              <template v-slot:item="row">
                    <tr>
                      <td> {{row.item.brand}}</td>
                      <td> {{row.item.address}}</td>
                      <td> {{row.item.postal_code}}</td>
                      <td> {{row.item.city}}</td>
                      <td> {{row.item.country}}</td>
                      <td> {{row.item.tel}}</td>
                      <td> {{row.item.fax}}</td>
                      <td>
                          <button class="btn btn-warning btn-sm" data-bs-toggle="modal" data-bs-target="#CategoryEdit"><i class="fas fa-edit"></i></button>
                          <button class="btn btn-danger btn-sm">
                              <i class="fas fa-eye"></i>
                          </button>
                      </td>
                    </tr>
                </template>
              </v-data-table>
              
          </v-card>
        </div>
      <!--------------------------------->

      <!-- Modals -->
      </v-app>
  </div>
</template>


<script>
export default {
  data(){
    return{
      search:'',
      branch_headers:[
        {text:"Brand",value:'brand'},
        {text:"Address",value:'address'},
        {text:"Code Postal",value:'postal_code'},
        {text:"City",value:'city'},
        {text:"Country",value:'country'},
        {text:"Telephone",value:'tel'},
        {text:"Fax",value:'fax'},
      ],
      branchs:[]
    }
  }
}
</script>

<style>

</style>