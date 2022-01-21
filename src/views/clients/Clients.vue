<template>
<div>
<v-app>
  <v-card >
      <header class="content-header">
        <div class="row">
          <div class="col-6 content-title">
            <i class="fas fa-users"></i> <span>الموكلين</span>
          </div>
          <div class="col-6 content-actions clients">
            <button class="btn btn-success btn-sm"
              data-bs-toggle="modal"
              data-bs-target="#modalAdd"
            >
              <i class="fas fa-user-plus"></i> <span>إضافة موكل</span>
            </button>
          </div>
        </div>
       
      </header>
    <v-card-title>
          <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="بحث"
        single-line
        hide-details 
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="clients"
      :search="search"
    >
     <template v-slot:item="row">
          <tr>
            <td>{{row.item.number}}</td>
            <td>{{row.item.name}}</td>
            <td>{{row.item.phone}}</td>
            <td>{{row.item.address}}</td>
            <td>{{row.item.email}}</td>
            <td>
                <button class=" btn btn-danger btn-sm"   @click="deleteClient(row.item.id)">
                    <i class="fas fa-times"></i>
                </button>
                <button data-bs-toggle="modal" class="btn btn-warning btn-sm"
                data-bs-target="#modal_Edit"
                @click="showData(row.item.id-1)"
                ><i class="fas fa-edit"></i></button>
            </td>
          </tr>
      </template>
    </v-data-table>
    
  </v-card>
  
  <!-- Button trigger modal -->
  <!-- Modal Add -->
  <div
    class="modal fade"
    id="modalAdd"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="staticBackdropLabelAdd"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            ref="closeModal"
            aria-label="Close"
          ></button>
          <h5 class="modal-title" id="staticBackdropLabelAdd">إضافة موكل</h5>

        </div>
        <div class="modal-body text-start">
          <div class="mb-3">
            <label>رقم الموكل :</label>
            <input type="text" id="number" ref="number" class="form-control" />
          </div>
          <div class="mb-3">
            <label>الاسم الكامل :</label>
            <input type="text" id="name" ref="name" class="form-control" />
          </div>
          <div class="mb-3">
            <label>الهاتف :</label>
            <input type="text" id="phone" ref="phone" class="form-control" />
          </div>
          <div class="mb-3">
            <label>العنوان :</label>
            <input
              type="text"
              id="address"
              ref="address"
              class="form-control"
            />
          </div>
          <div class="mb-3">
            <label>البريد الالكتروني :</label>
            <input type="email" id="email" ref="email" class="form-control" />
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" @click="addClient">
            <i class="fas fa-save"></i> حفظ
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- Modal Edit -->
<div>
  <div
    class="modal fade"
    id="modal_Edit"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="staticBackdropLabelEdit"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="staticBackdropLabelEdit">تعديل موكل</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            ref="closeEditModal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <input
              type="text"
              id="idClient"
              ref="ref_client"
              class="form-control"
              hidden
            />
          </div>
          <div class="mb-3">
            <label>رقم الموكل :</label>
            <input type="text" id="number" ref="numberEdit" class="form-control"/>
          </div>
          <div class="mb-3">
            <label>الاسم الكامل :</label>
            <input type="text" id="name" ref="nameEdit" class="form-control" />
          </div>
          <div class="mb-3">
            <label>الهاتف :</label>
            <input
              type="text"
              id="phone"
              ref="phoneEdit"
              class="form-control"
            />
          </div>
          <div class="mb-3">
            <label>العنوان :</label>
            <input
              type="text"
              id="address"
              ref="addressEdit"
              class="form-control"
            />
          </div>
          <div class="mb-3">
            <label>البريد الالكتروني :</label>
            <input
              type="email"
              id="email"
              ref="emailEdit"
              class="form-control"
            />
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" @click="editClient">
            <i class="fas fa-save"></i> حفظ
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
</v-app>
</div>
</template>

<script>
import axios from "axios";
const serverName = "clients";

const request_header=
{
  'Accept':'application/json',
  'Authorization':'Bearer '+localStorage.getItem('user_token')
}
import api from '../../mixin';
export default {
  mixins:[api],
  data() {
    return {
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false,
      clients: [],
      key_pp: 1,
      api_endpoint: new URL(serverName),

      client: {
        number: "",
        phone: "",
        name: "",
        address: "",
        email: "",
        id: "",
      },
      
        search: '',
        headers: [
          { text: 'رقم الموكل', value: 'number' },
          { text: 'اسم الموكل', value: 'name' },
          { text: 'الهاتف', value: 'phone' },
          { text: 'العنوان', value: 'address' },
          { text: 'الايميل', value: 'email' },
          { text: '', value: '' },
        ]
   };
  },
  components: {},

  methods: {
    async getClients() {
      const res = await this.callApi('get',serverName);
      this.clients = res.data;
    },
    async addClient() {
      const client={
        number: this.$refs.number.value,
        name: this.$refs.name.value,
        address: this.$refs.address.value,
        email: this.$refs.email.value,
        phone: this.$refs.phone.value,
      }
      await this.callApi('post',serverName,client).then((res) => 
      {
          this.getClients();
          this.$refs.closeModal.click();
      })
      .then(response=>{
          this.handleResponse(response,"تمت الإضافة بنجاح!")
      });
      
    },
    async deleteClient(id) {
      console.log(id);
      if (confirm("تأكيد الحذف؟")) {
        await axios({
          method:'delete',
          url:serverName + "/" + id,
          headers:request_header
        }).then((response)=>{
          this.handleResponse(response,"تم الحذف بنجاح !")
        });
        this.getClients();
      }
    },
    showData(index) {
      const client = this.clients[index];
      this.$refs.ref_client.value = client.id;
      this.$refs.numberEdit.value = client.number;
      this.$refs.nameEdit.value = client.name;
      this.$refs.addressEdit.value = client.address;
      this.$refs.emailEdit.value = client.email;
      this.$refs.phoneEdit.value = client.phone;
    },
    async editClient() {
      const data={
        number: this.$refs.numberEdit.value,
        name: this.$refs.nameEdit.value,
        address: this.$refs.addressEdit.value,
        email: this.$refs.emailEdit.value,
        phone: this.$refs.phoneEdit.value,
      }

      const id = this.$refs.ref_client.value;
      await axios({
        method:'put',
        url:serverName+"/"+id,
        data:data,
        headers:request_header
      }).then(response=>{
        this.handleResponse(response,"تم التعديل بنجاح !")
      });

      this.$refs.closeEditModal.click();
      this.getClients();
    },
    handleResponse(response,message){
        if(response.status==200){
            this.$notify.success(message);
        }
        if(response.status==401){
            this.$notify.info("غير مصرح لك الدخول")
            this.$router.push({name:'Login'});
        }
        if(response.status==404){
            this.$notify.warning("هذه الصفحة غير موجودة")
        }
    }
  },
  mounted() {
    this.getClients();
  }
};
</script>

<style>
</style>