<template>
<div>
  <v-app>
    <header class="content-header">
        <div class="row">
          <div class="col-6 content-title">
          <i class="fas fa-folder-plus"></i> <span>معلومات الملف</span>
        </div>
        <div class="col-6 content-actions">
          
        
          <button @click="updateData" v-if="id" class="btn btn-warning btn-sm"> <i class="fas fa-save"></i>  حفظ الملف</button>
          <button @click="postData" v-else class="btn btn-primary btn-sm"> <i class="fas fa-save"></i> حفظ الملف</button>
          &nbsp;
          <router-link :to="{name:'Fee'}" class="btn btn-success btn-sm"> <i class="fas fa-search-dollar"></i> الأتعاب</router-link>
          &nbsp;
          <router-link to="/folders" class="btn btn-secondary btn-sm" >
            <i class="fas fa-reply"></i> <span>رجوع</span>
          </router-link>
        </div>
        </div>
    </header>
  <!--Content-->
    <div class="row content">
        <div class="col-sm-12 col-md-5">
          <div class="card text-dark mb-3 text-start" >
            <div class="card-header">الملف</div>
            <div class="card-body">
                <div class="mb-3">
                  <label>المرجع الخاص :</label>
                  <input type="text" v-model="private_id" ref="private_id" class="form-control">
                </div>
                <div class="mb-3">
                  <label>تاريخ فتح الملف :</label>
                  <input type="date" v-model="date_open_file" class="form-control">
                </div>
                <div class="mb-3">
                  <label>إسم الموكل :</label>
                  <div class="input-group flex-nowrap add-cnt" >
                  <button class="input-group-text" data-bs-toggle="modal" data-bs-target="#modalClient" ><i class="fas fa-search"></i></button>
                    <select class="form-control" ref="client_id" v-model="client_id">
                      <option v-for="client,index in clientsList" :key="index" :value="client.id" >{{client.name}}</option>
                    </select>
                  </div>
                </div>
                <div class="mb-3">
                  <label>مرجع الموكل :</label>
                  <input type="text" id="clientReference" v-model="client_ref" class="form-control">
                </div>
                <div class="mb-3">
                  <label>إسم الخصم :</label>
                  <input type="text" id="opponent_name" v-model="opponent_name" class="form-control">
                </div>
                <div class="mb-3">
                    <label>نوع القضية :</label>
                    <div class="input-group flex-nowrap add-cnt" >
                      <button class="input-group-text" data-bs-toggle="modal" data-bs-target="#modalIssues"><i class="fas fa-search"></i></button>
                      <select class="form-control" v-model="issue_type_id" ref="issue_id">
                          <option v-for="issue,index in issuesList" :key="index" :value="issue.id" >{{issue.type}}</option>
                      </select>
                  </div>
                </div>

            </div>
          </div>
          <div class="card text-dark mb-3 ">
              <div class="card-header">
                <span>الملفات الفرعية</span> 
                  <button type="button" data-bs-toggle="modal" data-bs-target="#modalAddFile"
                    class="btn btn-success btn-sm justify-content-end"><i class="fas fa-plus"></i> إضافة ملف فرعي</button>
              </div>
              <div class="card-body">
                  <div class="table-responsive sub-folders-table">
                    <table class="table table-striped ">
                    <thead >
                        <tr>
                          <th >
                              الرقم
                          </th>
                          <th>
                              التاريخ
                          </th>
                          <th>
                              الموكل
                          </th>
                          
                          <th>
                              الدرجة
                          </th>
                          <th>
                              المقرر
                          </th>
                          <th>
                              النوع
                          </th>
                          <th style="min-width:100px">
                          </th>
                        </tr>
                    </thead>
                    <tbody>
                      
                        <tr v-for="(file,index) in subFiles " :key="index">
                            <td >{{ file.file_id }}</td>
                            <td >{{ file.judgment_date }}</td>
                            <td >{{ file.client }}</td>
                            <td >{{ file.degree }}</td>
                            <td >{{ file.decider }}</td>
                            <td >{{ file.issue_type_id }}</td>
                            <td>
                              <button class="btn btn-warning btn-sm" data-bs-toggle="modal" data-bs-target="#modalUpdateFile" @click="showFileDetails(index)"><i class="fas fa-edit"></i></button>
                              <button class="btn btn-danger btn-sm" @click="deleteFile(index)"><i class="fas fa-times"></i></button>
                            </td>
                        </tr>
                    </tbody>
                  </table>
                  </div>
                
              </div>
          </div>
        </div>
        <div class="col-sm-12 col-md-3">
          <div class="card text-dark  mb-3 text-start" >
            <div class="card-header">البوليصة</div>
            <div class="card-body">
            <div class="mb-3">
              <label>البوليصة :</label>
              <input type="text" id="assuranceCode" v-model="assurance_number" class="form-control">
            </div>
            <div class="mb-3">
              <label>رقم المحضر :</label>
              <input type="text" id="recordDate" v-model="pv_number" class="form-control">
            </div>
            <div class="mb-3">
              <label> تاريخ الحادثة :</label>
              <input type="date" id="accident_date" v-model="accident_date" class="form-control">
            </div>
            <div class="mb-3">
              <label>المؤمن له :</label>
              <input type="text" id="inssureName" v-model="insured_name" class="form-control">
            </div>
            <div class="mb-3">
              <label>الخبير :</label>
              <input type="text" id="expert_name" v-model="expert_name" class="form-control">
            </div>
            </div>
          </div>
          <div class="card text-dark mb-3 text-start">
            <div class="card-header">
            المحكمة
            </div>
            <div class="card-body">
              <div class="mb-3">
                <label>المحكمة :</label>
                <div class="input-group flex-nowrap add-cnt" >
                  <button class="input-group-text" data-bs-toggle="modal" data-bs-target="#courtModalList"><i class="fas fa-search"></i></button>
                  <select class="form-control" v-model="court_id" ref="court_id">
                    <option v-for="court,index in courtsList" :key="index" :value="court.id" >{{court.name}}</option>
                  </select>
                </div>
              </div>
              <div class="mb-3">
                <label>مرجع المحكمة :</label>
                <input type="text"  v-model="court_ref" id="courtReference" class="form-control">
              </div>
              <div class="mb-3">
                <label>تاريخ الجلسة :</label>
                <input type="date" id="session_date" v-model="session_date" class="form-control">
              </div>
              <div class="mb-3">
                <label>القاعة :</label>
                <input type="text" id="room_number" v-model="room_number" class="form-control">
              </div>
              <div class="mb-3">
                <label>تاريخ انتهاء الملف :</label>
                <input type="date" id="close_date" v-model="close_date" class="form-control">
              </div>
              <div class="mb-3">
                <label>حالة الملف :</label>
                <select id="deliberation" class="form-control" v-model="status">
                  <option value="0">مداولات</option>
                  <option value="1">حكم منطوق</option>
                </select>
              </div>
            </div>
        </div>
        </div>
        <div class="col-sm-12 col-md-4">
          <div class="card text-dark  mb-3 text-start" >
            <div class="card-header">الملفات</div>
            <div class="card-body">
                <v-card class="">
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
                    :items="side_folders"
                    :search="search"
                  >
                  <template v-slot:item="row">
                    <tr>
                        <td @click="getFolderById(row.item.id)">
                            <router-link :to="{name:'AddFolder',params:{id:row.item.id}}" class="btn btn-success btn-sm"><i class="fas fa-arrow-right"></i></router-link>
                        </td>
                        <td> {{row.item.private_id}}</td>
                        <td> {{row.item.client_name}}</td>
                    </tr>
                  </template>
          </v-data-table>
          
              </v-card>
            </div>
          </div>

          <div class="mb-3">
                <label>ملاحظات:</label>
                <textarea  v-model="notes" class="form-control" style="min-height:150px"></textarea>
              </div>
        </div>
   
    <!-- save -->
        <div class="col-lg-12 text-center">
          <hr>
          <button @click="updateData" v-if="id" class="btn btn-warning btn-lg"><i class="fas fa-save"></i> حفظ الملف</button>
            <button @click="postData" v-else class="btn btn-primary btn-lg"> <i class="fas fa-save"></i> حفظ الملف</button>
        </div>
    
    </div>
<!-- Modals -->
  <!--File Modal Add -->
    <div class="modal fade" id="modalAddFile" tabindex="-1" aria-labelledby="modalAddFileLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header" >
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" ref="closeModal"></button>
          <h5 class="modal-title" id="modalAddFileLabel">إضافة ملف فرعي</h5>
        </div>
        <div class="modal-body text-start">
                      <div class="mb-3">
                        <label>رقم الملف :</label>
                        <input type="text" id="file_id" ref="file_id" class="form-control">
                      </div>
                    <div class="mb-3">
                      <label>إسم الموكل :</label>
                      <select class="form-control" ref="client_id">
                        <option value="" disabled>اختر</option>
                        <option v-for="(client,index) in clientsList" :key="index" :value="client.id" >{{client.name}}</option>
                      </select>
                    </div>
                      <div class="mb-3">
                        <label>تاريخ الحكم :</label>
                        <input type="date" id="judgment_date" class="form-control" ref="judgment_date">
                      </div>
                      <div class="mb-3">
                        <label>الدرجة :</label>

                        <select id="degree" class="form-control" ref="degree">
                          <option value="1">إبتدائية</option>
                          <option value="2">إستئناف</option>
                          <option value="3">نقض</option>
                        </select>
                      </div>
                      <div class="mb-3">
                        <label>المقرر :</label>
                        <input type="decieded" id="decider" class="form-control" ref="decider">
                      </div>
                      <div class="mb-3">
                        <label>نوع القضية :</label>
                          <select class="form-control" ref="issue_type_id">
                          <option value="" disabled>اختر </option>
                          <option v-for="issue,index in issuesList" :key="index" :value="issue.id" >{{issue.type}}</option>
                        </select>
                      </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" id="saveFile"  @click="addDataToFiles">حفظ الملف</button>
        </div>
      </div>
    </div>
    </div>
      <!--File Modal Update -->
    <div class="modal fade" id="modalUpdateFile" tabindex="-1" aria-labelledby="modalAddFileLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header" >
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" ref="closeModalFileEdit"></button>
          <h5 class="modal-title" id="modalAddFileLabel"> تعديل ملف</h5>
        </div>
        <div class="modal-body text-start">
            <input type="hidden" ref="file_index">
            <div class="mb-3">
              <label>رقم الملف :</label>
              <input type="text" id="file_id" ref="file_id_edited" class="form-control">
            </div>
            <div class="mb-3">
              <label>إسم الموكل :</label>
              <select class="form-control" ref="client_id_edited">
                <option value="" disabled>اختر</option>
                <option v-for="(client,index) in clientsList" :key="index" :value="client.id" >{{client.name}}</option>
              </select>
            </div>
            <div class="mb-3">
              <label>تاريخ الحكم :</label>
              <input type="date" id="judgment_date" class="form-control" ref="judgment_date_edited">
            </div>
            <div class="mb-3">
              <label>الدرجة :</label>

              <select id="degree" class="form-control" ref="degree_edited">
                <option value="1">إبتدائية</option>
                <option value="2">إستئناف</option>
                <option value="3">نقض</option>
              </select>
            </div>
            <div class="mb-3">
              <label>المقرر :</label>
              <input type="decieded" id="decider" class="form-control" ref="decider_edited">
            </div>
            <div class="mb-3">
              <label>نوع القضية :</label>
                <select class="form-control" ref="issue_type_id_edited">
                <option value="" disabled>اختر </option>
                <option v-for="issue,index in issuesList" :key="index" :value="issue.id" >{{issue.type}}</option>
              </select>
            </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" id="saveFile"  @click="updateFile">حفظ التعديل</button>
        </div>
      </div>
    </div>
    </div>
<!-- Clients list Modal -->
    <div class="modal fade" id="modalClient"  data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabelAdd" aria-hidden="true">
      <div class="modal-dialog modal-content modal-lg">
        <div class="modal-header">
          <h5 class="modal-title" id="staticBackdropLabelAdd">لائحة الموكلين</h5>
           <button class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#modalAdd" > <i class="fas fa-user-plus"></i> إضافة موكل</button>
          <button type="button" class="btn-close" data-bs-dismiss="modal" ref="closeModalClients" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <v-card >
            <v-card-title>
                  <v-text-field
                v-model="search_client"
                append-icon="mdi-magnify"
                label="بحث"
                single-line
                hide-details 
              ></v-text-field>
            </v-card-title>
            <v-data-table
              :headers="client_headers"
              :items="clientsList"
              :search="search_client"
            >
              <template v-slot:item="row">
                      <tr>
                        <td>
                            <button class="btn btn-success btn-sm" @click="setClient(row.item.id)"><i class="fas fa-check"></i></button>
                        </td>
                        <td>{{row.item.number}}</td>
                        <td>{{row.item.name}}</td>
                        <td>{{row.item.phone}}</td>
                      </tr>
                </template>
            </v-data-table>
    
          </v-card>
        </div>
      </div>
    </div>
<!-- add client Modal -->
    <div class="modal fade" id="modalAdd"  data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabelAdd" aria-hidden="true">
        <div class="modal-dialog modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabelAdd">إضافة موكل</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" ref="closeModalClient" aria-label="Close"></button>
          </div>
          <div class="modal-body text-start">
                <div class="mb-3">
                    <label>رقم الموكل :</label>
                    <input type="text" id="clientNumber" ref="number" class="form-control">
                </div>
                <div class="mb-3">
                    <label>الاسم الكامل :</label>
                    <input type="text" id="name" ref="name" class="form-control">
                </div>
                <div class="mb-3">
                    <label>الهاتف :</label>
                    <input type="text" id="phone" ref="phone" class="form-control">
                </div>
                <div class="mb-3">
                    <label>العنوان :</label>
                    <input type="text" id="address" ref="address" class="form-control">
                </div>
                <div class="mb-3">
                    <label>البريد الالكتروني :</label>
                    <input type="email" id="email" ref="email" class="form-control">
                </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click="addClient"><i class="fas fa-save"></i>  حفظ</button>
          </div>
        </div>
    </div>
<!-- issues list Modal -->
    <div class="modal fade" id="modalIssues"  data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabelAdd" aria-hidden="true">
        <div class="modal-dialog modal-content modal-lg">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabelAdd">لائحة القضايا</h5>
            <button class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#issueModal" > <i class="fas fa-plus"></i> إضافة قضية</button>
            <button type="button" class="btn-close" data-bs-dismiss="modal" ref="closeModalIssues" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <v-card >
              <v-card-title>
                    <v-text-field
                  v-model="search_issue"
                  append-icon="mdi-magnify"
                  label="بحث"
                  single-line
                  hide-details 
                ></v-text-field>
              </v-card-title>
              <v-data-table
              :headers="issue_headers"
              :items="issuesList"
              :search="search_issue"
            >
              <template v-slot:item="row">
                      <tr>
                        <td>
                            <button class="btn btn-success btn-sm" @click="setIssue(row.item.id)"><i class="fas fa-check"></i></button>
                        </td>
                        <td>{{row.item.type}}</td>
                      </tr>
                </template>
            </v-data-table>
    
            </v-card>
          </div>
        </div>
    </div>
<!-- Issue Modal -->
    <div class="modal fade" id="issueModal" tabindex="-1" aria-labelledby="issueMdlLbl" aria-hidden="true">

      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="issueMdlLbl">إضافة قضية</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" ref="closeModalIssue"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label>نوع القضية :</label>
              <input type="text" ref="issue_type" class="form-control">
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click="addIssue">إضافة</button>
          </div>
        </div>
      </div>
    </div>
<!-- courts list modal -->
    <div class="modal fade" id="courtModalList"  data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabelAdd" aria-hidden="true">
        <div class="modal-dialog modal-content modal-lg">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabelAdd">لائحة المحاكم</h5>
            <button class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#courtModal" > <i class="fas fa-plus"></i> إضافة محكمة</button>
            <button type="button" class="btn-close" data-bs-dismiss="modal" ref="closeModalIssuesList" aria-label="Close"></button>
          </div>
          <div class="modal-body">
              <v-card >
                <v-card-title>
                  <v-text-field
                    v-model="search_court"
                    append-icon="mdi-magnify"
                    label="بحث"
                    single-line
                    hide-details 
                  ></v-text-field>
                </v-card-title>
                <v-data-table
                :headers="court_headers"
                :items="courtsList"
                :search="search_court"
              >
                <template v-slot:item="row">
                        <tr>
                          <td>
                              <button class="btn btn-success btn-sm" @click="setIssue(row.item.id)"><i class="fas fa-check"></i></button>
                          </td>
                          <td>{{row.item.name}}</td>
                          <td v-if="row.item.level=='1'">إبتدائية</td>
                          <td v-if="row.item.level=='2'">إستئناف</td>
                          <td v-if="row.item.level=='3'">نقض</td>
                        </tr>
                  </template>
                </v-data-table>
              </v-card>
          </div>
        </div>
    </div>
  <!-- court Modal -->
    <div class="modal fade" id="courtModal" tabindex="-1" aria-labelledby="courtMdlLbl" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="courtMdlLbl">إضافة محكمة</h5>
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
  </v-app>
</div>
</template>

<script>

// require('vue-flash-message/dist/vue-flash-message.min.css'); 
import axios from 'axios'
const domainName ="http://localhost:8000/api/";
//const users_server="http://localhost:3000/users";

const request_header=
{
  'Accept':'application/json',
  'Authorization':'Bearer '+localStorage.getItem('user_token')
}
export default {
  props: ['id'],
  data() {
    return {
      //items id
      client_id:'',
      client_headers: [
          { text: '', value: '' },
          { text: 'رقم الموكل', value: 'number' },
          { text: 'اسم الموكل', value: 'name' },
          { text: 'الهاتف', value: 'phone' },
      ],
      search_client:'',
      issue_type_id:'',
      court_id:'',
      //searchs querys
      search_issue:'',
      issue_headers:[
        {text:'',value:''},
        {text:'نوع القضية',value:'type'}
      ],
      search_court:'',
      court_headers:[
        {text:'',value:''},
        {text:'المحكمة',value:'name'},
        {text:'الدرجة',value:'level'}
      ],
      notes: '',
      credits: [{}],
      issuesList: [],
      courtsList: [],
      side_folders: [],
      clientsList: [],
      //Colonnes Data
      folders:[],
      private_id: '',
      date_open_file: '',
      //client_id: '',
      client_ref: '',
      opponent_name: '',
      sub_files:[],
      file_id: '',
      client: '',
      judgment_date: '',
      degree: '',
      decider: '',
      issue_type_id: '',
      assurance_number: '',
      pv_number: '',
      accident_date: '',
      insured_name: '',
      expert_name: '',
      court_ref: '',
      session_date: '',
      room_number: '',
      close_date: '',
      status: '',
      search:'',
      headers:[
        { text: '', value: ''},
        { text: 'المرجع الخاص', value: 'private_id'},
        { text: 'اسم الموكل', value: 'client_name'},
      ],

    };
  },
  methods: {
    ask(url){
      return domainName + url
    },
    async getSideFolders() {
      const res = await axios(
        {method:'get',
        url:this.ask('folders'),
        headers:request_header
        });
      this.side_folders = res.data;
    },
    addCredit() {
      this.credits = [...this.credits, {}];
    },
    async postData() {

      try {
        
        let Obj={
              private_id: this.private_id,
              date_open_file: this.date_open_file,
              client_id: this.client_id,
              client_ref: this.client_ref,
              opponent_name: this.opponent_name,
              issue_type_id:this.issue_type_id,
              sub_files: JSON.stringify(this.sub_files),
              assurance_number: this.assurance_number,
              pv_number: this.pv_number,
              accident_date: this.accident_date,
              insured_name: this.insured_name,
              expert_name: this.expert_name,
              court_id: this.court_id,
              court_ref: this.court_ref,
              session_date: this.session_date,
              room_number: this.room_number,
              close_date: this.close_date,
              status: this.status,
              notes: this.notes
            }

        await axios({
          method:'post',
          url:this.ask('folders'),
          data:Obj,
          headers:request_header
        }).then((response)=>{
          this.handleResponse(response,"تمت إضافة الملف بنجاح!");
          this.$router.push({name:'Folders'});
        });
        
      } catch (err) {
        this.handleResponse(err.response,"تمت إضافة الملف بنجاح!");
      }
    },
    addDataToFiles() {
      const file = {
        file_id: this.$refs.file_id.value,
        client_id: this.$refs.client_id.value,
        judgment_date: this.$refs.judgment_date.value,
        degree: this.$refs.degree.value=="1"?"إبتدائية":this.$refs.degree.value=="2"?"إستئناف":"نقض",
        decider: this.$refs.decider.value,
        issue_type_id: this.$refs.issue_type_id.value,
      };
      this.sub_files = [...this.sub_files, file];
      this.$refs.closeModal.click()

    },
    updateFile() {
      const index=this.$refs.file_index.value;
      const file = {
        file_id: this.$refs.file_id_edited.value,
        client_id: this.$refs.client_id_edited.value,
        judgment_date: this.$refs.judgment_date_edited.value,
        degree: this.$refs.degree_edited.value=="1"?"إبتدائية":this.$refs.degree_edited.value=="2"?"إستئناف":"نقض",
        decider: this.$refs.decider_edited.value,
        issue_type_id: this.$refs.issue_type_id_edited.value,
      };
      
      this.sub_files[index]=file;
      this.$refs.closeModalFileEdit.click()

    },
    async getFolderById(folder_id){
      const res =  await axios({
        method:'get',
        url:this.ask("folders/"+ folder_id),
        headers:request_header
      });
      this.folders = res.data;
      this.sub_files = JSON.parse(this.folders.sub_files);
      console.log(this.sub_files);
      this.putDataInForm(this.folders);
    },
    putDataInForm(data){
      this.private_id = data.private_id;
      this.date_open_file = data.date_open_file;
      this.client_id = +data.client_id;
      this.client_ref = data.client_ref;
      this.opponent_name = data.opponent_name;
      this.issue_type_id = +data.issue_type_id;
      this.assurance_number = data.assurance_number;
      this.pv_number = data.pv_number;
      this.accident_date = data.accident_date;
      this.insured_name = data.insured_name;
      this.expert_name = data.expert_name;
      this.court_id = +data.court_id;
      this.court_ref = data.court_ref;
      this.session_date = data.session_date;
      this.room_number = data.room_number;
      this.close_date = data.close_date;
      this.status = data.status;
      this.notes=data.notes
    },
    async updateData() {
      let Obj={
              private_id: this.private_id,
              date_open_file: this.date_open_file,
              client_id: this.client_id,
              client_ref: this.client_ref,
              opponent_name: this.opponent_name,
              issue_type_id:this.issue_type_id,
              sub_files: JSON.stringify(this.sub_files),
              assurance_number: this.assurance_number,
              pv_number: this.pv_number,
              accident_date: this.accident_date,
              insured_name: this.insured_name,
              expert_name: this.expert_name,
              court_id: this.court_id,
              court_ref: this.court_ref,
              session_date: this.session_date,
              room_number: this.room_number,
              close_date: this.close_date,
              status: this.status,
              notes: this.notes
            }
      try {
        await axios({
          method:'put',
          url:this.ask("folders/"+ this.id),
          data:Obj,
          headers:request_header
        })
        .then((res) => {
          this.handleResponse(res,"تم التعديل بنجاح!")
          this.$router.push({name: 'Folders'});
        })
      } catch (err) {
        console.log(err.message);
      }
    },
    showFileDetails(index) {
      const file = this.sub_files[index];
      
      this.$refs.file_index.value = index;
      this.$refs.file_id_edited.value = file.file_id;
      this.$refs.client_id_edited.value = file.client_id;
      this.$refs.judgment_date_edited.value = file.judgment_date;
      this.$refs.degree_edited.value = file.degree;
      this.$refs.decider_edited.value = file.decider;
      this.$refs.issue_type_id_edited.value = file.issue_type_id;
    },
    deleteFile(index) {
      if(confirm("تأكيد الحذف!"))
      {
        this.sub_files =this.sub_files.filter((file,sub_file_index)=>{
          return sub_file_index!=index
        });
        this.$notify.info("تم الحذف مؤقتا");
      }
    },
    //clients
    async getClientsList() {
      const res = await axios({method:'get'
      ,url:this.ask('clients')
      ,headers:request_header});
      this.clientsList = res.data;
    },
    async addClient() {
      const Obj={
            number: this.$refs.number.value,
            name: this.$refs.name.value,
            address: this.$refs.address.value,
            email: this.$refs.email.value,
            phone: this.$refs.phone.value
          }
      await axios({
        method:'post',
        url:this.ask('clients'),
        headers:request_header,
        data:Obj
      }).then((res)=>{
          this.handleResponse(res,"تمت إضافة موكل")
          this.getClientsList();
          this.client_id=res.data.id;
          this.$refs.closeModalClient.click();
      });
      
    },
    setClient(id){
      this.$refs.closeModalClients.click();
      this.client_id=id;
    },
    //Issues
    async getIssues() {
      const res = await axios({method:'get'
      ,url:this.ask('issues')
      ,headers:request_header});;
      this.issuesList = res.data;
    },
    async addIssue() {
      await axios({
        method:'post',
        url:this.ask('issues'),
        data:{type: this.$refs.issue_type.value},
        headers:request_header
      }).then((res)=>{
          this.handleResponse(res,"تمت إضافة القضية")
          this.getIssues();
          this.issue_type_id=res.data.id;
          this.$refs.closeModalIssue.click();
      });
      
    },
    setIssue(id){
      this.issue_type_id=id;
      this.$refs.closeModalIssues.click();
    },
    //courts
    async getCourts() {
      const res = await axios({method:'get'
      ,url:this.ask('courts')
      ,headers:request_header});
      this.courtsList = res.data;
    },
    async addCourt() {
      const Obj={
        name: this.$refs.court_name.value,
        level: this.$refs.court_level.value,
      }
      await axios({
        method:'post',
        url:this.ask('courts'),
        data:Obj,
        headers:request_header
      }).then((res)=>{
          this.handleResponse(res,"تمت إضافة المحكمة")
          this.getCourts();
          this.court_id=res.data.id;
          this.$refs.closeModalCourt.click();
      });
    },
    setCourt(index){
      this.$refs.closeModalIssuesList.click();
      this.court_id=index+1;
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
   
    this.getClientsList()
    this.getIssues()
    this.getCourts()
    this.getSideFolders();
    if(this.id){
      this.getFolderById(this.id);
    }
  },
  computed:{
    filterClients(){
      return this.clientsList.filter( 
        (client)=>
            client.name.includes(this.search_client)||
            client.email.includes(this.search_client)||
            client.phone.includes(this.search_client)||
            client.address.includes(this.search_client)
      );
    },
    filterIssues(){
      return this.issuesList.filter( issue => issue.type.includes(this.search_issue));
    },
    filterCourts(){
      return this.courtsList.filter( 
        (court)=>
            court.name.includes(this.search_court)||
            court.level==(+this.search_court)
      );
    },
    subFiles(){
      return this.sub_files;
    }
  }
};
</script>

<style>

</style>