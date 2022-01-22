<template>
  <div>
    <v-app>
      <div>
      <header class="row content-header">
          <div class="col-3 content-title">
          <i class="fas fa-users"></i>
          <span>المستخدمين</span>
          </div>
          <div class="col-9 content-actions" style="padding: 3px;">
              <button data-bs-toggle="modal" data-bs-target="#modal" class="btn btn-secondary btn-sm" >
              <span> <i class="fas fa-search"></i> الصلاحيات</span>
              </button>
              &nbsp;
              <button data-bs-toggle="modal"
                  data-bs-target="#modalAdd" class="btn btn-success btn-sm" >
              <span> <i class="fas fa-user-plus "></i> إضافة مستخدم</span>
              </button>
          </div>
      </header>
        <table class="table table-hover">
          <thead>
            <tr>
              <th>اسم المستخدم</th>
              <th>البريد الالكتروني</th>
              <th>رقم الهاتف</th>
              <th>الوظيفة</th>
            </tr>
          </thead>
          <tbody>
              <tr v-for="user,index in users" :key="user.id">
                <td>{{ user.name }}</td>
                <td>{{ user.email }}</td>
                <td>{{ user.phone }}</td>
                <td v-if="user.role_id=='1'">محامي</td>
                <td v-if="user.role_id=='2'">كاتب</td>
                <td>
                    <button class=" btn btn-danger btn-sm" @click="deleteUser(user.id)">
                      <i class="fas fa-times"></i>
                    </button>
                    <button class="btn btn-warning btn-sm"
                            data-bs-target="#modal_Edit"
                            data-bs-toggle="modal"
                            @click="showClient(index)">
                        <i class="fas fa-edit"></i>
                    </button>
                </td>
              </tr>
          </tbody>
        </table>
      </div>
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
            <h5 class="modal-title" id="staticBackdropLabelAdd">إضافة مستخدم</h5>

          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label>اسم المستخدم :</label>
              <input type="text" id="user_name" ref="name" class="form-control" />
            </div>
            <div class="mb-3">
              <label>البريد الالكتروني :</label>
              <input type="text" id="user_email" ref="email" class="form-control" />
            </div>
            <div class="mb-3">
              <label>الهاتف :</label>
              <input type="text" id="phone" ref="phone" class="form-control" />
            </div>
            <div class="mb-3">
              <label>الوظيفة :</label>
              <select ref="role_id" class="form-control">
                <option value="1">محامي</option>
                <option value="2">كاتب</option>
              </select>
            </div>
            <div class="mb-3">
              <label>كلمة السر :</label>
              <input type="text" id="password" ref="password" class="form-control" />
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click="addUser">
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
            <h5 class="modal-title" id="staticBackdropLabelEdit">تعديل مستخدم</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              ref="closeEditModal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
              <input type="text" id="user_id" v-model="user_id" hidden/>
            <div class="mb-3">
              <label>اسم المستخدم :</label>
              <input type="text" id="user_name" v-model="name" class="form-control" />
            </div>
            <div class="mb-3">
              <label>البريد الالكتروني :</label>
              <input type="text" id="user_email" v-model="email" class="form-control" />
            </div>
            <div class="mb-3">
              <label>الهاتف :</label>
              <input type="text" id="phone" v-model="phone" class="form-control" />
            </div>
            <div class="mb-3">
              <label>الوظيفة :</label>
              <select v-model="role_id" class="form-control">
                <option value="1">محامي</option>
                <option value="2">كاتب</option>
              </select>
            </div>
            <div class="mb-3">
              <label>كلمة السر :</label>
              <input type="text" id="password" v-model="password" class="form-control" />
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click="editUser()">
              <i class="fas fa-save"></i> حفظ
            </button>
          </div>
        </div>
      </div>
      </div>
      </div>
      <!-- Modal  -->
      <div class="modal fade" id="modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
      <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">الصلاحيات</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="card">
          <div class="card-header">ادمن</div>
          <div class="card-body">
            <span class="bold">الملفات  :</span> <span class="text-success">حذف،  بحث، تعديل، إضافة، عرض</span>
            <hr>
            <span class="bold">الموكلين :</span> <span class="text-success">حذف،  بحث، تعديل، إضافة، عرض</span>
            <hr>
            <span class="bold ">الاتعاب :</span> <span class="text-success">حذف،  بحث، تعديل، إضافة، عرض</span>
            <hr>
            <!-- <span class="bold">التقارير :</span> <span class="text-success">طباعة</span>
            <hr> -->
            <span class="bold">المستخدمين :</span> <span class="text-success">حذف،  بحث، تعديل، إضافة، عرض</span>
            <hr>
            <span class="bold">المحاكم :</span> <span class="text-success">حذف،  بحث، تعديل، إضافة، عرض</span>
            <hr>
            <span class="bold">المحاكم :</span> <span class="text-success">حذف،  بحث، تعديل، إضافة، عرض</span>
          </div>
        </div>
        &nbsp;
        <div class="card">
          <div class="card-header">موظف</div>
          <div class="card-body">
              <div class="card-body">
            <span class="bold">الملفات  :</span> <span class="text-success"><span class="text-danger">حذف</span>،  بحث، تعديل، إضافة، عرض</span>
            <hr>
            <span class="bold">الموكلين :</span> <span class="text-success"><span class="text-danger">حذف</span>،  بحث، تعديل، إضافة، عرض</span>
            <hr>
            <span class="bold ">الاتعاب :</span> <span class="text-danger">حذف،  بحث، تعديل، إضافة، عرض</span>
            <hr>
            <!-- <span class="bold">التقارير :</span> <span class="text-success">طباعة</span>
            <hr> -->
            <span class="bold">المستخدمين :</span> <span class="text-danger">حذف،  بحث، تعديل، إضافة، عرض</span>
            <hr>
            <span class="bold">المحاكم :</span> <span class="text-success">حذف،  بحث، تعديل، إضافة، عرض</span>
            <hr>
            <span class="bold">المحاكم :</span> <span class="text-success">حذف،  بحث، تعديل، إضافة، عرض</span>
          </div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">حسنا</button>
      </div>
      </div>
      </div>
      </div>
    </v-app>
    </div>
</template>

<script>

import api from '../../mixin';
export default {
  mixins:[api],
  data(){
    return{
      dialog: false,
      users:[],
      name:'',
      email:'',
      password:'',
      role_id:'',
      phone:'',
      user_id:''
    }
  },
  methods:{
    async getClientsList(){
      await this.api('users')
      .then((res)=>{
        this.users=res.data;
      })
    },
    async addUser(){
      const user={
        name:this.$refs.name.value,
        email:this.$refs.email.value,
        password:this.$refs.password.value,
        role_id:this.$refs.role_id.value,
        phone:this.$refs.phone.value,
      };
      await this.api('register','post',user)
      .then(()=>{
        this.getClientsList();
        this.$refs.closeModal.click();
      })
    },
    showClient(index){
      this.user_id=this.users[index].id;
      this.name=this.users[index].name;
      this.email=this.users[index].email;
      this.password=this.users[index].password;
      this.role_id=this.users[index].role_id;
      this.phone=this.users[index].phone;
    },
    //Not Yet
    async editUser(){
      const user={
        name:this.name,
        email:this.email,
        password:this.password,
        role_id:this.role_id,
        phone:this.phone,
      };
      await axios('')
      .then(()=>{
        this.getClientsList();
        this.$refs.closeEditModal.click();
      })
    },
    async deleteUser(id){
      if(confirm("تأكيد حذف هذا المستخدم")){
      await this.api('users/'+id,'delete')
      .then(()=>{
        this.getClientsList()
      })};
    }
  },
  mounted(){
    this.getClientsList();
  }
}
</script>

<style>

</style>