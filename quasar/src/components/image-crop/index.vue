
<template>
  <div class="q-mb-lg text-center">
      <div>
        <q-avatar
          class="text-uppercase text-bold shadow-8 cursor-pointer"
          :size="size || '140px'"
          text-color="white"
          @click="openEdit"
        >
          <q-img
            :ratio="ratio"
            ref="current_photo"
            :src="photo || 'images/avatar.png'"
           
          />
          
        </q-avatar>
      </div>
      
    <q-dialog v-model="modal" persistent>
      <q-card class="upload-modal text-center">
        <div class="upload text-center" v-if="buffer">
          <cropper
            classname="upload-cropper"
            stencilComponent="circle-stencil"
            :src="buffer"
            :stencilProps="{
              minAspectRatio: ratio,
              maxAspectRatio: ratio
            }"
            ref="cropper"
          />
        </div>
        <div v-else class="upload text-center q-my-md">
          <q-avatar
            class="text-uppercase shadow-8 text-bold"
            color="dark"
            size="240px"
            text-color="white"
            :ratio="ratio"
          >
            <div style="font-size: 16px">
              {{ $t('imageCrop.noImage') }}
            </div>
          </q-avatar>
        </div>
        <q-btn
          :label="photo ? $t('imageCrop.change') : $t('imageCrop.select')"
          class="text-bold"
          rounded
          no-caps
          color="primary"
          @click="$refs.file.click()"
          :disabled="loading"
          style="width: 180px; font-size: 12pt"
          size="15px"
        >
          <input
            type="file"
            ref="file"
            @change="handleImage($event)"
          />
        </q-btn>
        <q-separator class="q-mt-md q-mb-xs" />
        <q-card-actions align="around" class="q-pb-md q-pt-sm">
          <q-btn
            :label="$t('general.cancel')"
            rounded
            no-caps
            class="text-bold"
            color="grey-6"
            outline
            @click="closeCrop"
            :disabled="loading"
            style="width: 150px; font-size: 12pt"
            size="15px"
          />
          <q-btn
            :label="$t('general.confirm')"
            rounded
            no-caps
            class="text-bold"
            color="positive"
            @click="crop"
            :disabled="loading"
            :loading="loading"
            style="width: 150px; font-size: 12pt"
            size="15px"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { Cropper } from 'vue-advanced-cropper'

export default {
  props: {
    photo: String,
    ratio: Number,
    size: String
  },
  data: () => ({
    loading: false,
    modal: false,
    buffer: null,
    imageSize: null,
  }),
  methods: {
    openEdit() {
      this.modal = true
    },
    closeCrop() {
      this.buffer = null
      this.modal = false
      this.loading = false
    },
    crop() {
      if(this.$refs.cropper.getResult()){
        
        const { canvas } = this.$refs.cropper.getResult()
        const photo = canvas.toDataURL()
        this.$emit('change', {photo: photo, size: this.imageSize})
        this.closeCrop()
      }
      
    },
    handleImage(e) {
      const input = e.target
      const [file] = input.files
      
      if (!file) return
      this.imageSize = file.size
      if (file.type.search('jpeg') === -1) return this.invalid('v')
      if (file.size > 12582912) return this.invalid('s')
      
      const reader = new FileReader()
      reader.onload = e => {
        this.buffer = e.target.result
      }
      reader.readAsDataURL(file)
    },
    // invalid(type) {
    //   const message =
    //     type === 'v'
    //       ? this.$t('general.invalidTypeImage')
    //       : this.$t('general.invalidSize')

    //   Notify.create({
    //     message: message,
    //     type: 'negative',
    //     timer: 2500,
    //     position: 'bottom'
    //   })
    // },
    
  },
  comments: {
    Cropper
  },
  
}
</script>

<style lang="scss" scoped>
.upload-cropper {
  height: 100%;
  width: 450px;
  max-width: 90%;
  margin: 5% auto;
}
.upload-modal {
  width: 450px;
  max-width: 100%;
  border-radius: 15px;
}

input {
  display: none;
}
</style>
