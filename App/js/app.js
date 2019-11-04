const app = new Vue({
  el: "#app",
  data: {
    title: "GYM",
    activity: [],
    newActivity: ""
  },
  methods: {
    addActivity: function() {
      //console.log("diste click", this.newActivity);
      if (this.activityValidation(this.newActivity)) {
        this.activity.push({
          name: this.newActivity,
          status: false
        });
        console.log(this.activity);
        this.newActivity = "";
        this.updateDB();
      } else {
        alert("Field empty, insert some text");
      }
    },
    editActivty: function(index) {
      this.activity[index].status = !this.activity[index].status;
      this.updateDB();
    },
    deleteActivity: function(index) {
      this.activity.splice(index, 1);
      this.updateDB();
    },
    updateDB: function() {
      localStorage.setItem("activityListVue", JSON.stringify(this.activity));
    },
    activityValidation: function(activity) {
      if (activity.length === 0) return false;
      let haveText = false;
      for (let i = 0; i < activity.length; i++) {
        if (activity.charAt(i) !== " ") {
          console.log(activity.charAt(i));
          haveText = true;
          break;
        }
      }
      return haveText;
    }
  },
  created: function() {
    let dataDB = JSON.parse(localStorage.getItem("activityListVue"));
    console.log(dataDB);
    if (dataDB === null) {
      this.activity = [];
    } else {
      this.activity = dataDB;
    }
  }
});
