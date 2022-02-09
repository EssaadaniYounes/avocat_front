<template>
    <div class="row">
      <div class="col-3"></div>
        <v-app class="col-6">
              <div class="modal-body">
                 <div class="row justify-content-md-center">
                <div class="mb-3">
                  <label>{{$t('products.productTitle')}} :</label>
                  <input type="text" ref="title" class="form-control" v-model="product.title">
                </div>
                <div class="mb-3">
                  <label>{{$t('products.productReference')}} :</label>
                  <input type="text" ref="title" class="form-control" v-model="product.reference">
                </div>
                <div class="mb-3">
                  <label>{{$t('products.productCategory')}} :</label>
                  <select class="form-control" v-model="product.category_id">
                      <option value="1">Water</option>
                  </select>
                </div>
                <div class="mb-3">
                  <label>{{$t('products.productDescription')}} :</label>
                  <textarea class="form-control" v-model="product.description"></textarea>
                </div>
                <div class="mb-3">
                  <label class="form-label">{{ $t('products.mainImage') }} :</label>
                  <input class="form-control" type="file" ref="main_img" accept=".png, .jpg, .jpeg" @change="uploadFile($event,'single')">
                </div>
                <div class="mb-3">
                  <label class="form-label">{{ $t('products.subImages') }} :</label>
                  <input class="form-control" type="file" ref="extra_imgs" accept=".png, .jpg, .jpeg" multiple @change="uploadFile($event,'multiple')">
                </div>
                <div class="mb-3">
                  <label>{{$t('products.productVideoLink')}} :</label>
                  <input type="text" ref="title" class="form-control" v-model="product.video_link">
                </div>
                <div class="mb-3">
                  <label>{{$t('products.productFonctionalities')}} :</label>
                  <input type="text" ref="title" class="form-control" v-model="functionality" @keyup="addFunctionality">
                  <div class="functionalities">
                    <span v-for="functionality in product.functionalities" :key="functionality" class="functionality">{{functionality}}</span>
                  </div>
                </div>
              </div>
              </div>

              <div class="modal-footer">
                <button type="button" class="btn btn-primary" @click="postProduct">Save</button>
              </div>
        </v-app>
    </div>
</template>

<script>

import api from '../../../mixin/'
export default {
  mixins:[api],
  data(){
    return{
        functionality:'',
        product:{
          title :'',
          reference  :'',
          category_id :'',
          description :'',
          video_link :'',
          main_img  :'',
          extra_imgs :[],
          functionalities :[],
        },
    }
  },

  methods:{
    addFunctionality(e){
      if(e.key =="Enter"){
        this.product.functionalities.push(this.functionality);
        this.functionality='';
      }
    },
    uploadFile(e, type) {
      if(type == 'single'){
        this.product.main_img = this.$refs.main_img.files[0];
      }
      else{
          this.product.extra_imgs = this.$refs.extra_imgs.files;
        console.log(this.product.extra_imgs)
      }
    },
    postMainImage() {
      const data = new FormData();
      for(let i=0 ; i<this.product.extra_imgs.length ; i++){
        data.append('main_img',this.product.extra_imgs[i]);
        this.api('products/store_imgs','post',data).then((response)=>{
          console.log(response.data);
        });
      }
    },
    async postProduct(){
      this.postMainImage();
      this.api('products','post',this.product).then((response)=>{
        console.log(response.data);
      })
    }
  }
}
</script>

<style>
.functionality{
  padding: 0 1.5rem;
  background-color: #dadbd9;
  border-radius: 8px;
  font-weight: 700;
}
.functionalities{
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1.5rem;
  padding-top: 1rem;
}
</style>