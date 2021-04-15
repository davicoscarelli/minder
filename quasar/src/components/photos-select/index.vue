<template>
    <div class="col-12 col-md-6">
      <label class="text-accent text-bold ajust" for="photos">Profile Photos</label>

      <div class="row justify-center q-mt-sm q-gutter-md">
        <div v-for="img in photos" :key="img.id" class=" q-mt-sm image-select flex  cursor-pointer" @click="deleteItem(img)">
          <!-- {{img.title}} -->
          <q-img
            :ratio="1"
            :src="img.url"
          />
          <q-icon name="delete" class="q-ma-sm" size="16pt" color="red" style="position: absolute; opacity: 0.8"/>
        </div>
        <div v-if="photos.length < 6" class="q-mt-sm image-select flex flex-center cursor-pointer" @click="$refs.file.$el.click()">
          <q-icon name="add" size="26pt" color="grey"/>
          <q-file
            ref="file"
            v-model="form.photos"
            style="display:none"
            @input="convert"
            />
        </div>
      </div>
    </div>
        
      <!-- <q-dialog v-model="uploadDialog" @hide="!show ? send : () =>{}">
        <q-card class="q-pa-sm text-center" style="border-radius: 15px; width: 800px" >
          <div class="row">
              <div class=" text-center  q-pt-sm" :class="show ? 'col-11' : 'col-12'">
                <label
                  class="text-primary text-bolder no-margin no-padding"
                  style="font-size: 22pt"
                > Anexos 
                </label>
              </div>
              <div class="col-1  text-right" v-if="show">
                <q-btn class="text-primary q-mr-sm " icon="close" flat round dense v-close-popup />
              </div>
            </div>
          <q-card-section class="row text-center">
            <div class="col-12">
              <template>
                <div class="q-pt-sm">
                  <q-carousel
                    swipeable
                    animated
                    style="border-radius: 20px"
                    v-model="slide"
                    :thumbnails="!firstAdd"
                    infinite
                  >
                    <q-carousel-slide class="cursor-pointer area" v-if="firstAdd" :name="0" @click="$refs.file.$el.click()">
                        <div class="row flex-center " style="height: 100%">
                         <div class="q-gutter-sm"> 
                          <div class="col-12 text-center"> 
                            <q-icon
                                name="mdi-upload"
                                size="5rem"
                                color="primary"
                              />
                            </div>
                          <div class="col-12 "> 
                            <label class="cursor-pointer text-primary text-bold" style="font-size: 18px">Selecionar Arquivo</label>
                          </div>
                        </div>
                      </div>
                      <q-file
                        ref="file"
                        v-model="form.attachments"
                        style="display:none"
                        @input="convert"
                        :accept="extensions"
                        @rejected="invalid('general.invalidTypeUpload')"
                        
                        />
                    </q-carousel-slide>
                    <q-carousel-slide  v-else v-for="file in files" :key="file.name" :name="file.name" :img-src="file.link" >
                      <div v-if="file.type == 'application/pdf'" class="row flex-center " style="height: 100%">
                         <div class="q-gutter-sm"> 
                          <div class="col-8" style="margin-top: 130px"> 
                            <label class="text-primary text-bold" style="font-size: 18px">{{file.title}}</label>
                          </div>
                        </div>
                      </div>
                    </q-carousel-slide>

            
                    <template v-slot:control v-if="!firstAdd">
                      <q-carousel-control
                        v-if="!show"
                        position="top-left"
                        :offset="[18, 18]"
                      >
                        <q-btn
                          color="grey-6"
                          icon="delete"
                          size="15px"
                          class="text-bold q-mb-sm"
                          no-caps
                          rounded
                          @click="deleteItem"
                        />
                      </q-carousel-control>
                      <q-carousel-control
                        v-if="!show"
                        position="top-right"
                        :offset="[18, 18]"
                      >
                        <q-btn
                          :label="$t('general.add')"
                          size="15px"
                          color="primary"
                          class="text-bold q-mb-sm"
                          style="width: 100px; font-size: 12pt"
                          no-caps
                          rounded
                          @click="$refs.file.$el.click()"
                        />
                        
                    
                        <q-file
                          ref="file"
                          v-model="form.attachments"
                          style="display:none"
                          @input="convert"
                          :accept="extensions"
                          @rejected="invalid('general.invalidTypeUpload')"
                          
                        />
                      </q-carousel-control>
                      <q-carousel-control
                        v-if="show"
                        position="top-right"
                        :offset="[18, 18]"
                      >
                        <q-btn
                          :label="$t('general.download')"
                          size="15px"
                          color="primary"
                          class="text-bold q-mb-sm"
                          style="width: 100px; font-size: 12pt"
                          no-caps
                          rounded
                          @click="openLink(files[slide].type == 'application/pdf' ? files[slide].downloadLink : files[slide].link)"
                        />
                      </q-carousel-control>
                    </template>

                    
                  </q-carousel>
                </div>
              </template>
            </div>
            

            <div class="col-12 q-mt-md" v-if="!firstAdd && files[slide] && !show">
              <h6 class="text-accent text-bold ajust q-ma-none" for="name">{{
                $t('general.fileCaption')
              }}</h6>

              <q-input
                class="q-mt-sm"
                id="goals"
                v-if="files[slide]"
                type="textarea"
                rounded
                maxlength="350"
                outlined
                v-model="files[slide].caption"
              />
            </div>
            <div class="col-12 q-mt-md" v-if="!firstAdd && files[slide] && files[slide].caption && show">
              <h6 class="text-accent text-bold ajust q-ma-none" for="name">{{
                $t('general.fileCaption')
              }}</h6>

              <h6
                class="q-mt-sm"
              >
              {{files[slide].caption}}
              </h6>
            </div>
            
          </q-card-section>
          


          <q-card-section class="q-pt-none" v-if="!show">
            <q-card-actions class="col-12 justify-center ">
              <q-btn
                :label="$t('general.back')"
                color="grey-6"
                outline
                size="15px"
                class="text-bold q-mb-sm"
                style="width: 150px; font-size: 12pt"
                no-caps
                rounded
                v-close-popup
                >
              </q-btn
              >
              <q-btn
                :label="$t('general.ok')"
                size="15px"
                color="primary"
                class="text-bold q-mb-sm"
                style="width: 150px; font-size: 12pt"
                no-caps
                rounded
                v-close-popup
                @click="send"
              />
            </q-card-actions>
          </q-card-section>
        </q-card>
      </q-dialog>   -->

</template>

<script>
import { openURL } from 'quasar'
import { User } from 'src/models/User'

export default {
  props: {
    photos: Array,
  },
  data: () => ({
    loading: false,
    form: {photos: []},
  }),
  methods: {
    
    
    async deleteItem(img){
      // this.files.splice(this.files.indexOf(img), 1)
      this.$q.loading.show({
          //spinner: QSpinnerFacebook,
          spinnerColor: 'white',
          thickness:"10",
          spinnerSize: 140,
          backgroundColor: 'primary',
          messageColor: 'white'
        })
      let success = await User.savePhoto({id: img.id, delete: true})
      if (success){
        this.$emit('change')
        this.$q.loading.hide()
      }
    },

    convert(file) {
      let promise =  new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
        this.$q.loading.show({
          //spinner: QSpinnerFacebook,
          spinnerColor: 'white',
          thickness:"10",
          spinnerSize: 140,
          backgroundColor: 'primary',
          messageColor: 'white'
        })
      })
      promise.then(async (base) => {
        await User.savePhoto({base: base})
        this.$emit('change')
        this.$q.loading.hide()
      })
     
    },
    
    
  },
 
  
}
</script>

<style lang="sass" scoped>
 
  .image-container
    width: 100px
    height: 100px
    border-radius: 5px

  .image-select
    width: 100px
    height: 100px
    border: 1px solid grey
    border-radius: 5px



</style>
