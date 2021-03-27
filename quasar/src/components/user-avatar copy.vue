<style lang="sass" scoped>
.user-menu-content 
  width: 270px;
  max-width: 300px;
  font-size: 12px;

.notifications
  width: 350px

.notificationsList
    width: 350px

@media (max-width: 400px)
  .notifications
    width: 320px

  .notificationsList
    width: 320px

@media (max-width: 370px)
  .notifications
    width: 250px

  .notificationsList
    width: 250px

</style>

<template>
  <div class="row q-gutter-sm" >
    <q-btn flat padding="xs sm" round>
      <q-badge v-if="(reminders && reminders.filter(reminder => !reminder.checked).length > 0) || this.storageWarning.length > 0" color="red" floating style="border-radius: 100px">{{numReminders()}}</q-badge>

      <q-icon name="mdi-bell" class="cursor-pointer"/>
      <q-menu fit class="notifications">
            <q-list class="q-py-md notificationsList">
              <q-item-label class="q-pb-md q-px-md text-subtitle1">
                {{  $t('reminder.title') }}
              </q-item-label>
              <q-separator />
               
               <q-item
                active-class="text-positive"
                clickable
                v-if="storageWarning.length > 0"
                v-ripple
                @click="storageReminder = true"
                exact
              >
                <q-item-section  class="text-primary text-bold">{{$t(`general.${storageWarning}`)}}</q-item-section>
              <q-item-section avatar>
                    <q-icon class="cursor-pointer" name="lens" size="xs" color="red"/>
                  </q-item-section>
              </q-item>
              
        

              <div v-if="reminders && reminders.length > 0">
                <q-item
                  v-for="n in reminders"
                  :key="n.title"
                  active-class="text-positive"
                  clickable
                  v-ripple
                  @click="openReminder(n)"
                  exact
                  
                >
                  <q-item-section side class="q-pr-xs">
                    <q-checkbox
                      color="dark"
                      style="opacity: 50%"
                      v-model="n.checked"
                      dense
                      @click.native="check([n])"
                    />
                  </q-item-section>
                  <q-item-section class="text-primary text-bold">{{n.start_time== '00:00:00' && n.end_time == '23:59:00' ? '' : `${n.start_time.slice(0,5)} |` }} {{pipeText(n.title, 15)}}</q-item-section>
                  <q-item-section avatar>
                    <q-icon class="cursor-pointer" name="lens" size="xs" :style="`color: ${n.color ? n.color : '#51407e'}`"/>
                  </q-item-section>
                </q-item>
              </div>

            <q-item-label v-else-if="this.storageWarning.length == 0" class="q-pt-md q-px-md text-subtitle2">
                {{  $t('reminder.none') }}
              </q-item-label>
            </q-list>
            <div class="col-12" v-if="reminders && reminders.length > 0">
              <div class=" row q-pa-md justify-between">
                <div class="col-12 col-sm-7 text-center q-px-none q-pb-xs">
                  <q-btn
                    :label="$t('reminder.checkAll')"
                    color="primary"
                    class="text-bold"
                    style="width: 190px; font-size: 8pt"
                    no-caps
                    @click="check(reminders, true)"
                    rounded
                  />
                </div>
                <div class="col-12 col-sm-5 text-center q-pb-xsq-px-none">
                  <q-btn
                  :label="$t('reminder.cleanChecked')"
                  color="red"
                  class="text-bold "
                  style="width: 110px; font-size: 8pt"
                  no-caps
                  rounded
                  @click="cleanChecked()"
                />
                </div>
              </div>
            </div>
      </q-menu>
    </q-btn>


    <q-avatar class="cursor-pointer" v-show="!loading && user">
      <img :src="user.avatar ? user.avatar_url : 'images/avatar.png'" />
      <q-menu max-width="320px">
        <div class="q-py-md">
          <div class="user-menu-content">
            <q-list>
              <q-item-label class="q-pb-md q-px-md text-subtitle1">
                {{ user.name }}
              </q-item-label>
              <q-separator />
              <!-- <q-item clickable v-ripple @click="changeTheme()">
                <q-item-section avatar>
                  <q-icon
                    :color="iconColor"
                    :name="`mdi-brightness-${$q.dark.isActive ? '7' : '4'}`"
                  />
                </q-item-section>
                <q-item-section>
                  {{ `${$q.dark.isActive ? $t('userAvatar.clearTheme') : $t('userAvatar.clearTheme')}` }}
                </q-item-section>
              </q-item> -->

              <q-item
                active-class="text-positive"
                clickable
                v-ripple
                to="/my-account"
                exact
              >
                <q-item-section avatar>
                  <q-icon :color="iconColor" name="mdi-account" />
                </q-item-section>
                <q-item-section>{{$t('userAvatar.myAccount')}}</q-item-section>
              </q-item>

              <q-item clickable v-ripple @click="logout()">
                <q-item-section avatar>
                  <q-icon :color="iconColor" name="mdi-exit-run" />
                </q-item-section>
                <q-item-section>{{$t('userAvatar.logout')}}</q-item-section>
              </q-item>
            </q-list>
          </div>
        </div>
      </q-menu>
    </q-avatar>
    <div v-show="loading">
      <q-circular-progress
        indeterminate
        size="32px"
        color="white"
        class="q-ma-xs"
      />
    </div>
    <Reminder :event.sync="reminder" :isOpenReminder.sync="reminder.isOpenReminder" @changeEvent="val => reminder.isOpenReminder = val" />
  

  <q-dialog v-model="storageReminder">
        <q-card class="text-center q-px-md" style="border-radius: 15px; width: 500px">
          <q-card-section class=" col-12 text-center q-mt-md">
           <!--  <img
              src="~assets/error.png"
              size="20px"
              
            />
          </q-card-section> -->
          
            <label
              class="text-primary text-bold"
              style="font-size: 18pt; "
            >
              {{percentage >= 80 ? $t(`general.storage${percentage}reminder`) : ''}}
            </label>
            <br/>

            </q-card-section>
            <!-- <label
              class="text-primary text-bold"
              style="font-size: 18pt; "
            >
              {{$t('general.upgrade')}}
            </label> -->

          
          <q-card-section>
            <q-card-actions class="col-12 justify-center ">
              <q-btn
                :label="$t('general.ok')"
                color="primary"
                size="15px"
                class="text-bold q-mb-sm"
                style="width: 150px; font-size: 12pt"
                no-caps
                rounded
                v-close-popup
                >
              </q-btn
              >
            </q-card-actions>
          </q-card-section>
        </q-card>
      </q-dialog>

      
  </div>
  
</template>

<script>
import { Notify } from 'quasar'
import { User } from 'src/models/User'
import { BaseModel } from 'src/models/BaseModel'
import { Reminder } from 'src/models/Reminder'

// import Auth from 'src/api/Services/Auth'

export default {
  data: () => ({
    reminders: [],
    loading: false,
    goPay: false,
    timer: '',
    percentage: '0',
    storageWarning: "",
    storageReminder: false,
    rules: '',
    reminder: {isOpenReminder: false}

  }),
  computed: {
    user() {
      return User.getUser()
    },
    plan() {
      return User.getPlan()
    },
    iconColor() {
      return this.$q.dark.isActive ? 'secondary' : 'primary'
    }
  },
  created() {
    this.getReminders()
    this.timer = setInterval(this.checkReminder, 1000)

  },
  mounted(){
  },
  components: {
      Reminder: () => import('src/pages/Reminders/components/reminder'),
  },
  methods: {
    numReminders(){
      let nReminders = 0
      if (this.reminders) nReminders = this.reminders.filter(reminder => !reminder.checked).length
      if (this.storageWarning.length > 0) nReminders += 1
      return nReminders

    },
    checkReminder(){
      try{
      this.checkStoragePercentage()
      const now = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', hour12: false})

      this.reminders = JSON.parse(localStorage.getItem('reminders'))
      let remindertime = null

      this.reminders.map(async (reminder) => {
          if (reminder.start_time == '00:00:00' && reminder.end_time == '23:59:00') {
            remindertime = 540
          }else{
            remindertime = (parseInt(reminder.start_time.slice(0,2)) * 60) + parseInt(reminder.start_time.slice(3,5)) - parseInt(reminder.warnBefore) 
          }
          let timeNow = (parseInt(now.slice(0,2)) * 60) + parseInt(now.slice(3,5))
          
          if (remindertime === timeNow){
            if (!reminder.checked){
                this.openReminder(reminder)
            }
            return
          }
      })
      }catch(e){
        //console.log(e)
      }

    },
    
    async checkStoragePercentage(){
      const { data } = await this.$http.get('myaccount')
      const { storage, user } = data

      this.getRules()
      
      let limit = this.rules.storage

      let percentage = ((storage * 100) / limit).toFixed(1) * 1

      if (percentage >= 80 && percentage < 90){
          this.storageWarning = "storage80warning"
          this.percentage = 80
      }else if (percentage >= 90 && percentage < 100){
        this.storageWarning = "storage90warning"
        this.percentage = 90
      }else if (percentage >= 100){
        this.storageWarning = "storage100warning"
        this.percentage = 100
      }else{
        this.storageWarning = ""
      }

    },
    async check(reminders, all = false){
      
      const success = await Reminder.checkReminder(reminders, all)
      
    },
    async openReminder(reminder){
      const success = await Reminder.checkReminder([{...reminder, checked: true}])
      this.reminder = {...success, isOpenReminder: true}
    },

    cancelAutoUpdate () { 
      clearInterval(this.timer) 
    },

    pipeText(text, size) {
      if(text){
        text = text.replace(/(\r\n|\n|\r)/gm, "")
      if (text.length > size) {
        text = `${text.substring(0,size)}...`;
      }
      return text;}
      
    },
    async cleanChecked(){
      let localreminders = JSON.parse(localStorage.getItem('reminders'))
      let cleanedReminders = JSON.parse(localStorage.getItem('cleanedReminders'))


      localreminders.map((reminder) => {
        if (cleanedReminders && cleanedReminders.length == 0 || !cleanedReminders) {
          if (reminder.checked){
            cleanedReminders = []
            cleanedReminders.push(reminder)
          }
        }else{
          cleanedReminders.map((cleaned) => {
            localreminders = localreminders.filter(reminder => reminder.id !== cleaned.id && reminder.checked)
          })
        cleanedReminders = [...cleanedReminders, ...localreminders]
        }
      })
      
      if(cleanedReminders && cleanedReminders.length > 0) localStorage.setItem('cleanedReminders', JSON.stringify(cleanedReminders))
      if(cleanedReminders && cleanedReminders.length > 0) this.getReminders()
    },
    async getReminders() { 
      let url = 'reminders'
      let localreminders = []
      let reminders = []
      // computed student
      
      try{
        const currentDate = BaseModel.formatToOriginal(new Date())

        
        url = `${url}/${currentDate}`
      
        
        const { data } = await this.$http.get(url)
        

        reminders = data
        
        let cleanedReminders = JSON.parse(localStorage.getItem('cleanedReminders'))
        if(!cleanedReminders) localStorage.setItem('cleanedReminders', '[]')
        
        
        reminders.map((reminder) => {
          if (cleanedReminders && cleanedReminders.length == 0 || !cleanedReminders) {
            
            localreminders.push(reminder)
          }else if (cleanedReminders) {
            

            cleanedReminders.map((cleaned) => {
              reminders = reminders.filter(reminder => reminder.id !== cleaned.id)
            })
            localreminders = reminders
          } 
        })
        
        localStorage.reminders = JSON.stringify(localreminders)

      }catch(e){
        //console.log(e)
      }
      

    },
    async getRules() {
      const url = `plans/${this.plan.plan}`
      const { data } = await this.$http.get(url)
      this.rules = JSON.parse(data.rules)
    },
    changeTheme() {
      const dark = !this.$q.dark.isActive
      this.$q.dark.set(dark)
      localStorage.setItem('theme', JSON.stringify({ dark }))
    },
    async logout() {
      const userName = this.user.name
      this.loading = true
      await User.logout()
      clearTimeout(this.timer)
      this.loading = false
      this.$router.push('/auth/login')
      this.showAlert({
        message: `Tchau ${userName}! Até logo... 😉`,
        icon: 'check',
        color: 'positive'
      })
    },
    showAlert({ message, icon, color }) {
      Notify.create({
        progress: true,
        timeout: 3000,
        message,
        icon,
        color,
        position: 'bottom'
      })
    }
  }
}
</script>
