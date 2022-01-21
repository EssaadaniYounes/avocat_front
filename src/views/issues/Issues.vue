<template>
<div>
<v-app>
   <v-card >
      <header class="row content-header">
        <div class="col-6 content-title">
          <i class="fas fa-balance-scale"></i>   <span>انواع القضايا</span>
        </div>
        <div class="col-6 content-actions clients">
          <button class="btn btn-success btn-sm" data-bs-toggle="modal" data-bs-target="#issueModal">
            <i class="fas fa-plus"></i>   <span>إضافة قضية</span>
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
      :items="issues"
      :search="search"
    >
     <template v-slot:item="row">
          <tr>
            <td> {{row.item.type}}</td>
            <td>
                <button class="btn btn-warning btn-sm" data-bs-toggle="modal" data-bs-target="#issueModalEdit" @click="showData(row.item.id-1)"><i class="fas fa-edit"></i></button>
                <button class="btn btn-danger btn-sm" @click="deleteIssue(row.item.id)">
                    <i class="fas fa-times"></i>
                </button>
            </td>
          </tr>
      </template>
    </v-data-table>
    
</v-card>

<div class="modal fade" id="issueModal" tabindex="-1" aria-labelledby="issueMdlLbl" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="issueMdlLbl">إضافة نوع قضية</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" ref="closeModalIssue"></button>
      </div>
      <div class="modal-body">
        <div class="mb-3">
          <label>نوع القضية :</label>
          <input type="text" ref="type" class="form-control">
        </div>
        
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" @click="addIssue">إضافة</button>
      </div>
    </div>
  </div>
</div>
<!-- issue Modal -->
<div class="modal fade" id="issueModalEdit" tabindex="-1" aria-labelledby="issueMdlLbl" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="issueMdlLbl">إضافة نوع قضية</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" ref="closeEditModalIssue"></button>
      </div>
      <div class="modal-body">
        <div class="mb-3">
          <label> نوع القضية :</label>
          <input type="text" ref="type_edited" class="form-control">
        </div>
     
      </div>
      <input type="text" ref="issue_id" hidden>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" @click="updateIssue">حفظ التعديل</button>
      </div>
    </div>
  </div>
</div>
</v-app>
</div>

</template>

<script>
const issues_server='http://localhost:8000/api/issues';
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
      issues:[],
      headers:[
        {text:"نوع القضية",value:'type'},
        {text:"",value:''}
      ]
    }
  },
  methods:{
    async getIssuesList(){
      const res = await axios({
          method:'get',
          url:issues_server,
          headers:request_header
      });

      this.issues=res.data;
    },
    async addIssue(){
      await axios({
          method:'post',
          url:issues_server,
          data:{type: this.$refs.type.value},
          headers:request_header
      }).then((response)=>{
          this.handleResponse(response,"تمت الإضافة بنجاح!")
        });

      this.getIssuesList();
      this.$refs.closeModalIssue.click();
    },
    async deleteIssue(id){
        if(confirm("تأكيد الحذف؟"))
        {
          await axios({
            method:'delete',
            url:issues_server+"/"+id,
            headers:request_header
          }).then((response)=>{
          this.handleResponse(response,"تم الحذف بنجاح !")
        });

          this.getIssuesList();
        }
    },
    showData(index){
        const issue=this.issues[index];
        // console.log(issue);
        this.$refs.type_edited.value=issue.type;
        this.$refs.issue_id.value=issue.id;
    },
    async updateIssue(){
      const id=this.$refs.issue_id.value;
      await axios({
          method:'put',
          url:issues_server+"/"+id,
          data:{type: this.$refs.type_edited.value},
          headers:request_header
        }).then(response=>{
        this.handleResponse(response,"تم التعديل بنجاح !")
      });
      this.getIssuesList();
      this.$refs.closeEditModalIssue.click();
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
    this.getIssuesList();
  }
}
</script>

<style>

</style>