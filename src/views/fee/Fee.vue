<template>
<div>

    <header class="row content-header ">
        <div class="col-6 content-title">
            <i class="fas fa-search-dollar"></i>
          <span> الاتعاب</span>
        </div>
        <div class="col-6 content-actions">
          <!-- <button class="btn btn-secondary btn-sm"> <i class="fas fa-print"></i> حفظ و طباعة</button> -->
          &nbsp;
          <button class="btn btn-warning btn-sm" @click="postFee" v-if="id"> <i class="fas fa-save"></i> حفظ التعديلات</button>
          <button class="btn btn-primary btn-sm" @click="postFee" v-else> <i class="fas fa-save"></i> حفظ</button>
        </div>
    </header>
    <div class="content" style="padding:10px 20px">
      <div class="">
        <div class="col-5 text-end" >
           <div class="fees">
              <span class="bold"> رقم الملف : </span>
              <div class="input-group flex-nowrap add-cnt">
                <!-- <button class="input-group-text" data-bs-toggle="modal" data-bs-target="#modalFee"><i class="fas fa-search"></i></button> -->
                <select v-model="folder_id" class="form-control">
                  <option value="" v-if="!id" disabled>اختر ملف</option>
                  <option v-for="file in files"
                   :key="file.id" 
                   :value="file.id"
                   :selected=" file.id == id ? true : false"
                   >
                    {{file.private_id}}
                  </option>
                </select>
            </div>
          </div>
         </div>
      </div>
      <div style="margin-top:20px" class="row">
        <div class="card text-dark mb-3 text-end">
            <div class="card-header">الاتعاب</div>
             <div class="card-body">
                <div class="row">
                   <div class="card col-md-4 ">
                      <div class="card-header">
                        المحكمة الابتدائية
                        <span class="text-danger">TVA 10%</span>
                      </div>
                      <div class="card-body">
                        <div class="mb-3">
                          <label>الاتعاب المتفق عليها :</label>
                          <input type="number" v-model="fee_agreed_1" @keyup="calcFees(1)" class="form-control currency">
                        </div>
                        <div class="mb-3">
                          <label>الضريبة على القيمة المضافة :</label>
                          <input type="number" v-model="fee_add_1" class="form-control currency" readonly>
                        </div>
                        <div class="mb-3">
                          <label>المجموع مع احتساب الضريبة :</label>
                          <input type="number" v-model="fee_result_1" class="form-control currency" readonly>
                        </div>
                      </div>
                    </div>
                   <div class="card col-md-4">
                      <div class="card-header">
                        محكمة الاستئناف
                        <span class="text-danger">TVA 10%</span>
                      </div>
                      <div class="card-body">
                        <div class="mb-3">
                          <label>الاتعاب المتفق عليها :</label>
                          <input type="number" v-model="fee_agreed_2" @keyup="calcFees(2)" class="form-control currency">
                        </div>
                        <div class="mb-3">
                          <label>الضريبة على القيمة المضافة :</label>
                          <input type="number" v-model="fee_add_2" readonly class="form-control currency">
                        </div>
                        <div class="mb-3">
                          <label>المجموع مع احتساب الضريبة :</label>
                          <input type="number" v-model="fee_result_2" readonly class="form-control currency">
                        </div>
                      </div>
                    </div>
                   <div class="card col-md-4 ">
                      <div class="card-header">
                        المجلس الاعلى
                        <span class="text-danger">TVA 10%</span>
                      </div>
                      <div class="card-body">
                        <div class="mb-3">
                          <label>الاتعاب المتفق عليها :</label>
                          <input type="number" v-model="fee_agreed_3" @keyup="calcFees(3)" class="form-control currency">
                        </div>
                        <div class="mb-3">
                          <label>الضريبة على القيمة المضافة :</label>
                          <input type="number" v-model="fee_add_3" readonly class="form-control currency">
                        </div>
                        <div class="mb-3">
                          <label>المجموع مع احتساب الضريبة :</label>
                          <input type="number" v-model="fee_result_3" readonly class="form-control currency">
                        </div>
                      </div>
                    </div>
                </div>
             </div>
             <div class="row">
               <div class="mb-3 col-md-3">
                 <label>مجموع الاتعاب :</label>
                 <input type="number" v-model="fee" class="form-control currency" readonly>
               </div>
               <div class="mb-3 col-md-3">
                 <label>الاتعاب المسبقة :</label>
                 <input type="number" v-model="advance_fee" @keyup="calcRest" class="form-control currency">
               </div>
              <div class="mb-3 col-md-3">
                 <label>الباقي من الاتعاب :</label>
                 <input type="number" v-model="rest_fee" class="form-control currency" readonly>
               </div>
             </div>
        </div>
        <div class="card text-dark mb-3 text-end">
          <div class="card-header">المصاريف</div>
          <div class="card-body row">
            <div class="col-md-3">
              <div class="mb-3">
                <label class="">المحضر :<span class="text-danger bold">FPV</span></label>
                <input type="number" @keyup="calcExpenses" v-model="record_id" class="form-control col-8 currency">
              </div>

              <div class="mb-3">
                <label class="">الخبرة : <span class="text-danger bold">Expertise</span></label>
                <input type="number" @keyup="calcExpenses"  v-model="experience" class="form-control col-8 currency">
              </div>

              <div class="mb-3">
                <label class="">التنقل :</label>
                <input type="number" @keyup="calcExpenses"  v-model="transport" class="form-control col-8 currency">
              </div>

              <div class="mb-3">
                  <label class="">التنفيد :</label>
                  <input type="number" @keyup="calcExpenses"  v-model="execution" class="form-control col-8 currency">
              </div>
            </div>
            <div class="col-md-3">
                <div class="mb-3">
                  <label class="">مصاريف و رسوم قضائية : <span class="text-danger bold">TFj</span></label>
                  <input type="number" @keyup="calcExpenses"  v-model="outlay" class="form-control col-8 currency">
                </div>
                <div class="mb-3">
                  <label class="">الترجمة :</label>
                  <input type="number" @keyup="calcExpenses"  v-model="translate" class="form-control col-8 currency">
                </div>
                <div class="mb-3">
                  <label class="">مصاريف إضافية :</label>
                  <input type="number" @keyup="calcExpenses"  v-model="extra_outlay" class="form-control col-8 currency">
                </div>
                <div class="mb-3">
                  <label class="">أخرى :</label>
                  <input type="number" @keyup="calcExpenses"  v-model="other" class="form-control col-8 currency">
                </div>
            </div>
            <div class="col-md-3">
              <div class="mb-3">
                  <label class=""> مجموع المصاريف :</label>
                  <input type="number" v-model="sum" class="form-control col-8 currency" readonly>
              </div>
              <div class="mb-3">
                  <label class="">التسبيق :</label>
                  <input type="number" @keyup="calcExpenses"  v-model="preemption" class="form-control col-8 currency">
              </div>
              <div class="mb-3">
                <label class="">الباقي :</label>
                <input type="number" v-model="rest_" class="form-control col-8 currency" readonly>
              </div>
              <div class="mb-3">
                <label class="">تاريخ الاداء :</label>
                <input type="date" v-model="payment_date" class="form-control col-8 currency">
              </div>
            </div>
            <div class="col-md-3 text-end">
                <div>
                    <label>ملاحظات :</label>
                    <textarea v-model="notes" cols="39" class="form-control" rows="10"></textarea>
                </div>
            </div>
          </div>
        </div>
        <div class="card text-dark mb-3 text-end">
            <div class="card-header">الخبرات</div>
            <div class="card-body row">
                <div class="col-4 md-3">
                  <label> الخبرات :</label>
                  <table class="table-striped table">
                    
                  </table>
                </div>
                <div class="table-responsive sub-folders-table col-8">
                  <table class="table table-striped ">
                  <thead >
                      <tr>
                        <th >
                            الرقم
                        </th>
                        <th>
                            الخبرة
                        </th>
                        <th>
                            تاريخها
                        </th>
                        
                        <th>
                          المبلغ
                        </th>
                        <th>
                          المسبق
                        </th>
                        <th>
                          الباقي
                        </th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr v-for="experience in experiences" :key="experience.id">
                          <td>{{ experience.experience_id }}</td>
                          <td>{{ experience.experience_name }}</td>
                          <td>{{ experience.experience_date }}</td>
                          <td >
                            <input type="number" class="form-control" >
                          </td>
                          <td>
                            <input type="number" class="form-control">
                          </td>
                          <td>
                            <input type="number" class="form-control">
                          </td>
                      </tr>
                  </tbody>
                  </table>
                </div>
            </div>

        </div>
        <div class="col-lg-12 text-center">
          <hr>
            <button class="btn btn-primary btn-lg"> <i class="fas fa-save"></i> حفظ</button>
        </div>
      </div>
    </div>
    <!-- Modal -->
<div class="modal fade" id="modalFee" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabelAdd" aria-hidden="true">
    <div class="modal-dialog modal-content modal-lg">
      <div class="modal-header">
        <h5 class="modal-title" id="staticBackdropLabelAdd">لائحة الملفات</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" ref="closeModalFee" aria-label="Close"></button>
      </div>
      <div class="modal-body">
          <div class="row ">
            <input type="text" placeholder="بحث" v-model="search_file" class="col-sm-8">
          </div>
          <table class="table table-striped" v-if="files.length>0">
            <thead >
                <tr>
                  <th></th>
                    <th >
                        رقم الملف
                    </th>
                    <th>
                        الموكل
                    </th>
                    <th>
                        الخصم
                    </th>
                    <th>
                        النوع
                    </th>
                    <th>
                        المحكمة
                    </th>
                    <th>
                        البوليصة
                    </th>
                    <th>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="folder in filterClients" :key="folder.id">
                    <td @click="getFee">
                      <router-link :to="{name:'Fee',params:{id:folder.id}}">
                      <i class="fas fa-arrow-right btn btn-secondary"></i></router-link>
                    </td>
                    <td>{{folder.idFolder}} </td>
                    <td> {{folder.clientName}}</td>
                    <td>{{ folder.oponentName }}</td>
                    <td>{{ folder.type }}</td>
                    <td>{{ folder.court }}</td>
                    <td>{{ folder.assuranceID }}</td>
                </tr>
            </tbody>
        </table>
        <div v-else>
            يتم تحميل البيانات المرجو الانتظار...
            <br>
            <span class="loader">

            </span>
        </div>
      </div>
    </div>
</div>
</div>
</template>

<script>
import api from '../../mixin';

export default {
    mixins:[api],
    props:['id'],
    data(){
      return{
        experiences:[],
        fee_experiences:[],
        folder_id:this.id,
        files:[],
        search_file:'',
        fees:[],
        //1
        fee_agreed_1:0,
        fee_add_1:0,
        fee_result_1:0,
        //2
        fee_agreed_2:0,
        fee_add_2:0,
        fee_result_2:0,
        //3
        fee_agreed_3:0,
        fee_add_3:0,
        fee_result_3:0,
        advance_fee:0,
        rest_fee:0,
        fee:0,
        record_id:0,
        record:0,
        experience:0,
        transport:0,
        help:0,
        execution:0,
        outlay:0,
        translate:0,
        extra_outlay:0,
        other:0,
        sum:0,
        preemption:0,
        rest_:0,
        payment_date:'',
        expenses:0,
        notes:''
      }
    },
    methods:{
      calcFees(type){
        let calc_with_tva;
        let result;
        if(type==1){
        calc_with_tva=parseFloat(this.fee_agreed_1)*0.1;
        //show the calc result
        this.fee_add_1=calc_with_tva;
        //calc the some of tva and the price
        result=this.fee_add_1+parseFloat(this.fee_agreed_1);
        this.fee_result_1=result;
        }
        if(type==2){
        calc_with_tva=parseFloat(this.fee_agreed_2)*0.1;
        this.fee_add_2=calc_with_tva;
        result=this.fee_add_2+parseFloat(this.fee_agreed_2);
        this.fee_result_2=result;
        }
        if(type==3){
        calc_with_tva=parseFloat(this.fee_agreed_3)*0.1;
        this.fee_add_3=calc_with_tva;
        result=this.fee_add_3+parseFloat(this.fee_agreed_3);
        this.fee_result_3=result;
        }
        this.calcRest();
      },
      calcRest(){
        this.fee= this.fee_result_1 + this.fee_result_2 + this.fee_result_3;
        //((this.fee_result_1+this.fee_result_2+this.fee_result_3)-parseInt(this.advance_fee)).toFixed(2);
        this.rest_fee=this.fee-this.advance_fee;
      },
      checkNumber(input){
          if(isNaN(parseFloat(input)))
          {
            console.log("nan")
          }
      },
      async getFee()
      {
        const res=await this.api('fees/'+this.id);
        let _fee=res.data;
        this.fee_agreed_1=_fee.fee_agreed_1,
        this.fee_add_1=_fee.fee_add_1,
        this.fee_result_1=_fee.fee_result_1,
        //2
        this.fee_agreed_2=_fee.fee_agreed_2,
        this.fee_add_2=_fee.fee_add_2,
        this.fee_result_2=_fee.fee_result_2,
        //3
        this.fee_agreed_3=_fee.fee_agreed_3,
        this.fee_add_3=_fee.fee_add_3,
        this.fee_result_3=_fee.fee_result_3,
        this.advance_fee=_fee.fee_advanced_fee,
        this.rest_fee=_fee.rest_fee,
        this.fee=_fee.fee,
        this.record_id=_fee.record_id,
        this.record=_fee.record,
        this.experience=_fee.experience,
        this.transport=_fee.transport,
        this.help=_fee.help,
        this.execution=_fee.execution,
        this.outlay=_fee.outlay,
        this.translate=_fee.translate,
        this.extra_outlay=_fee.extra_outlay,
        this.other=_fee.other,
        this.sum=_fee.sum,
        this.preemption=_fee.preemption,
        this.rest_=_fee.rest_,
        this.payment_date=_fee.payment_date,
        this.expenses=_fee.expenses,
        this.notes=_fee.notes
      },
      async getFilesRef(){
        const res=await this.api('folders');
        this.files=res.data;
        this.files.forEach(file => {
          file.id==this.id?this.experiences=JSON.parse(file.experiences):'';
        });
          console.log(this.experiences);
        
      },
      async postFee(){
        
        if(!this.folder_id){
          alert("يرجى اختيار الملف");
          return;
        }
        const Obj={
        folder_id :this.folder_id,
        fee_agreed_1 : this.fee_agreed_1,
        fee_add_1:this.fee_add_1,
        fee_result_1:this.fee_result_1,
        //2
        fee_agreed_2:this.fee_agreed_2,
        fee_add_2:this.fee_add_2,
        fee_result_2:this.fee_result_2,
        //3
        fee_agreed_3:this.fee_agreed_3,
        fee_add_3:this.fee_add_3,
        fee_result_3:this.fee_result_3,
        fee_advanced_fee:this.advance_fee,
        rest_fee:this.rest_fee,
        fee:this.fee,
        record_id:this.record_id,
        record:this.record,
        experience:this.experience,
        transport:this.transport,
        help:this.help,
        execution:this.execution,
        outlay:this.outlay,
        translate:this.translate,
        extra_outlay:this.extra_outlay,
        other:this.other,
        sum:this.sum,
        preemption:this.preemption,
        rest_:this.rest_,
        payment_date:this.payment_date,
        expenses:this.expenses,
        notes:this.notes}
        await this.api('fees','post',Obj)
        .then((res)=>
        {
          if(res.status==200){
            this.$notify.success("تم الحفظ بنجاح");
          }
          }
        );
      },
      async getFees(){
        const res=await this.api('fees');
        this.fees=res.data;
        console.log(this.fees)
      },
      calcExpenses(){
        this.sum = parseInt(this.record_id)+ parseInt(this.record)+ parseInt(this.experience)+
                   parseInt(this.transport)+ parseInt(this.help)+ parseInt(this.execution)+
                   parseInt(this.outlay)+ parseInt(this.translate)+ parseInt(this.extra_outlay)+ parseInt(this.other);
        this.calcExpensesRest();
      },
      calcExpensesRest(){
        this.rest_=parseInt(this.sum) - parseInt(this.preemption);
      }
      
    },
    mounted(){
       if(this.id){
       this.getFee();
       }
      // this.getFees();
      this.getFilesRef();
    },
    computed:{
      filterClients(){
      return this.files.filter(
        (file)=>
            file.opponent_name.includes(this.search_file)||
            file.insured_name.includes(this.search_file)
        );
      }
    }
  
}

</script>

<style>

</style>