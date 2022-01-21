<template>
<div>
<v-app>
   <v-card >
      <header class="row content-header">
        <div class="col-6 content-title">
          <i class="fas fa-balance-scale"></i>   <span>المحاكم</span>
        </div>
        <div class="col-6 content-actions clients">
          <button class="btn btn-success btn-sm" data-bs-toggle="modal" data-bs-target="#courtModalAdd">
            <i class="fas fa-plus"></i>   <span>إضافة محكمة</span>
          </button>
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
      :items="courts_list"
      :search="search"
    >
     <template v-slot:item="row">
          <tr>
            <td> {{row.item.name}}</td>
            <td v-if="row.item.level=='1'">إبتدائية</td>
            <td v-if="row.item.level=='2'">إستئناف</td>
            <td v-if="row.item.level=='3'">نقض</td>
            <td>
                <button class="btn btn-warning btn-sm" data-bs-toggle="modal" data-bs-target="#courtModalEdit" @click="showData(row.item.id)"><i class="fas fa-edit"></i></button>
                <button class="btn btn-danger btn-sm" @click="deleteCourt(row.item.id)">
                    <i class="fas fa-times"></i>
                </button>
            </td>
          </tr>
      </template>
    </v-data-table>
    
</v-card>
  <!-- <div class="table-responsive">
    <table class="table">
      <thead>
        <tr>
          <th>إسم المحكمة</th>
          <th>الدرجة</th>
          <th>المرجع</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="court,index in courts_list" :key="court.id">
          <td>{{ court.name }}</td>
          <td>{{ court.level }}</td>
          <td>
            {{index}}
          </td>
        </tr>
      </tbody>
    </table>
  </div> -->
<!-- court Modal -->
<div class="modal fade" id="courtModalAdd" tabindex="-1" aria-labelledby="courtAddMdlLbl" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="courtAddMdlLbl">إضافة محكمة</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" ref="closeModalCourt"></button>
      </div>
      <div class="modal-body">
        <div class="mb-3">
          <label>اسم المحكمة :</label>
          <input type="text" ref="court_name" class="form-control">
        </div>
        <div class="mb-3">
          <label>الدرجة  :</label>
          <select ref="court_level" class="form-control">
            <option value="1">ابتدائية</option>
            <option value="2">استئناف</option>
            <option value="3">محكمة النقض</option>
          </select>
        </div>
     
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" @click="addCourt">إضافة</button>
      </div>
    </div>
  </div>
</div>
<!-- court Modal -->
<div class="modal fade" id="courtModalEdit" tabindex="-1" aria-labelledby="courtMdlLbl" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="courtMdlLbl">تعديل محكمة</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" ref="closeEditModalCourt"></button>
      </div>
      <div class="modal-body">
        <div class="mb-3">
          <label>اسم المحكمة :</label>
          <input type="text" ref="court_name_edited" class="form-control">
        </div>
        <div class="mb-3">
          <label>الدرجة  :</label>
          <select ref="court_level_edited" class="form-control">
            <option value="1">ابتدائية</option>
            <option value="2">استئناف</option>
            <option value="3">محكمة النقض</option>
          </select>
        </div>
      </div>
      <input type="text" ref="court_id" hidden>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" @click="updateCourt">حفظ التعديل</button>
      </div>
    </div>
  </div>
</div>
</v-app>
</div>

</template>

<script>
const courts='http://localhost:8000/api/courts';
import axios from 'axios';
const request_header=
{
  'Accept':'application/json',
  'Authorization':'Bearer '+localStorage.getItem('user_token')
}
export default {
  data(){
    return{
      search:'',
      courts_list:[],
      headers:[
        {text:"إسم المحكمة",value:'name'},
        {text:"درجة المحكمة",value:'level'},
        {text:"حذف و تعديل",value:''}
      ]
    }
  },
  methods:{
    async getCourtsList(){
      const res = await axios(
      {method:'get',
      url:courts,
      headers:request_header
      });
      this.courts_list=res.data;
    },
    async addCourt(){
      const Obj={
          name: this.$refs.court_name.value,
          level:this.$refs.court_level.value
        }
        await axios({
          method:'post',
          url:courts,
          data:Obj,
          headers:request_header
        }).then((response)=>{
          this.handleResponse(response,"تمت الإضافة بنجاح!")
        });
        this.getCourtsList();
        this.$refs.closeModalCourt.click();
    },
    async deleteCourt(id){
        if(confirm("تأكيد الحذف؟"))
        {
          await axios({
            method:'delete',
            url:courts+"/"+id,
            headers:request_header
          }).then((response)=>{
          this.handleResponse(response,"تم الحذف بنجاح !")
        });
          this.getCourtsList();
        }
    },
    showData(id){
        const court=this.courts_list.filter((_court)=>_court.id==id);
        // console.log(court);
        this.$refs.court_id.value=court[0].id;
        this.$refs.court_name_edited.value=court[0].name;
        this.$refs.court_level_edited.selectedIndex=court[0].level-1;
    },
    async updateCourt(){
      const Obj={
          name: this.$refs.court_name_edited.value,
          level:this.$refs.court_level_edited.value,
        }
      const id=this.$refs.court_id.value;
        await axios({
          method:'put',
          url:courts+"/"+id,
          data:Obj,
          headers:request_header
        }).then(response=>{
        this.handleResponse(response,"تم التعديل بنجاح !")
        });
        this.getCourtsList();
        this.$refs.closeEditModalCourt.click();
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
  mounted(){
    this.getCourtsList();
  }
}
</script>

<style>

</style>