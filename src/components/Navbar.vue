 <template>
  <div>
    <div>
      <b-navbar toggleable="lg" type="dark" variant="dark">
        <b-navbar-brand>Ticketing System</b-navbar-brand>
        <b-navbar-toggle target="nav_collapse"/>
        <b-collapse is-nav id="nav_collapse">
          <b-navbar-nav class="ml-auto">
            <b-navbar-nav right>
              <b-navbar-brand v-if="this.currentUser">Welcome: {{currentUser}}</b-navbar-brand>
              <b-button
                size="sm"
                variant="warning"
                class="my-2 my-sm-0"
                type="submit"
                v-on:click="logout"
              >Sign Out</b-button>
            </b-navbar-nav>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  name: "navbar",
  data() {
    return {
      isLoggedIn: false,
      currentUser: false,
      user: ""
    };
  },
  created() {
    if (firebase.auth().currentUser) {
      this.isLoggedIn = true;
      var user = firebase.auth().currentUser.email;
      this.currentUser = user.replace("@npi.com", "");
    }
  },
  methods: {
    logout: function() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.go({ path: this.$router.path });
        });
    }
  }
};
</script>
