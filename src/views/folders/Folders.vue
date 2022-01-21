<template>
<div>
   <v-app>
        <header class="row content-header ">
        <div class="col-3 content-title">
            <i class="fas fa-folder"></i>
            <span>الملفات</span>
        </div>
        <div class="col-6 header_search">
            <label>بحث عن ملف :</label>
            <select class="form-control" style="width:150px" v-model="search_item">
                <option value="private_id" >المرجع الخاص</option>
                <option value="client_name">اسم الموكل</option>
                <option value="pv_number">الجلسة</option>
                <option value="accident_date">تاريخ الحادثة</option>
                <option value="assurance_number">البوليصة</option>
                <option value="insured_name">المؤمن له</option>
                <option value="opponent_name">الخصم</option>
            </select>
            <input type="text" v-model="deep_search" placeholder="" class="form-control" style="width:150px;margin-left: -4px;
                border-top-left-radius: 0;
                border-bottom-left-radius: 0;">&nbsp;
            <button class="btn btn-primary btn-sm" style="border-top-right-radius: 0;
                border-bottom-right-radius: 0;" @click="deepSearch(search_item)"><i class="fas fa-search"></i></button>

        </div>
      <div class="col-3 content-actions">
          <router-link to="/add-folder" class="btn btn-success btn-sm">
          <span> <i class="fas fa-folder-plus "></i>  إضافة ملف</span>
        </router-link>
      </div>
  </header>

    <div class="content files">
 <v-card >
      
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
      :items="folders"
      :search="search"
    >
     <template v-slot:item="row">
          <tr>
            <td> {{row.item.private_id}}</td>
            <td> {{row.item.client_name}}</td>
            <td>{{ row.item.opponent_name }}</td>
            <td>{{ row.item.issue_type }}</td>
            <td>{{ row.item.court_name }}</td>
            <td>{{ row.item.assurance_number }}</td>
            <td style="max-width: 170px">
                <router-link :to="{name:'Fee',params:{id:row.item.id}}"     class="btn btn-primary btn-sm" >
                    <i class="fas fa-search-dollar"></i> الاتعاب
                </router-link>
                <router-link :to="{name:'AddFolder',params:{id:row.item.id}}" class="btn btn-success btn-sm">عرض</router-link>
                <button class="btn btn-danger btn-sm" @click="deleteFolder(row.item.id)">
                    <i class="fas fa-times"></i>
                </button>
            </td>
          </tr>
      </template>
    </v-data-table>
    
</v-card>
    </div>
   </v-app>
</div> 

</template>

<script>
import axios from 'axios'
const serverName="http://127.0.0.1:8000/api/folders";//php
const deepSearchUrl="http://127.0.0.1:8000/api/folders/search";//php

const request_header=
{
  'Accept':'application/json',
  'Authorization':'Bearer '+localStorage.getItem('user_token')
}
import api from '../../mixin';

export default {
    mixins:[api],
    data(){
        return {
            search_item:'private_id',
            deep_search:'',
            search:"",
            folders:[],
            headers: [
            { text: 'المرجع الخاص', value: 'private_id'},
            { text: 'اسم الموكل', value: 'client_name'},
            { text: 'الخصم', value: 'opponent_name'},
            { text: 'نوع القضية', value: 'issue_type'},
            { text: 'المحكمة', value: 'court_name'},
            { text: 'البوليصة', value: 'assurance_number'},
            { text: '', value: '' },
            ],
            user:{}
        }
    },
    methods:{
        async getFolders(){
            const res= await this.api('folders');
            this.folders=res.data;
        },
        async deleteFolder(id){
            console.log(id);
            
            if(confirm("تأكيد الحذف؟")){
            await this.api('folders/' + id, 'delete')
            .then(response=>{
                this.handleResponse(response,"تم الحذف بنجاح!!")
                this.getFolders();
            });
            }
        },
        handleResponse(response,message){
            if(response.status==200){
                if(response.data==0){
                    this.$notify.warning(message);
                    return;
                }
                this.$notify.success(message);
            }
            if(response.status==401){
                this.$notify.info("غير مصرح لك الدخول")
                this.$router.push({name:'Login'});
            }
            if(response.status==404){
                this.$notify.warning("هذه الصفحة غير موجودة")
            }
        },
        async deepSearch(item)
        {
            const data={
                item:item,
                value:this.deep_search
            }

            await this.callApi('post',deepSearchUrl,data)
            .then((response)=>{
                if(response.data==0){
                    this.handleResponse(response,"لا نتائج للبحث : "+this.deep_search);
                }
                else{
                    this.$router.push({name:'AddFolder',params:{id:response.data.id}})
                }
            })
        }
    },
    mounted(){
        this.getFolders();
    }

}
</script>
<style scoped>
input{
    margin-right:20px ;
}
select::-ms-expand{
    display:block !important;
}
</style>