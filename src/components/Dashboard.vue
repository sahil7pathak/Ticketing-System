<template>
  <div>
    <Navbar/>
    <Summary/>
    <b-card no-body>
      <b-nav pills slot="header" v-b-scrollspy:nav-scroller>
        <b-container class="bv-example-row">
          <b-row>
            <b-col>
              <b-form-select v-model="sortVariable" :options="options1" size="sm" class="mt-3"/>
            </b-col>
            <b-col>
              <b-form-select v-model="orderVariable" :options="options2" size="sm" class="mt-3"/>
            </b-col>
          </b-row>
          <br>
          <center>
            <b-button
              disabled
              v-if="!this.orderVariable"
              size="md"
              class="my-2 my-sm-0"
              type="submit"
            >Sort Tickets</b-button>

            <b-button
              v-if="this.orderVariable"
              size="md"
              class="my-2 my-sm-0"
              type="submit"
              variant="primary"
              v-on:click="rows"
            >Sort Tickets</b-button>
          </center>
          <hr>
          <div>
            <router-link to="/search">
              <b-button id="exButton1" variant="outline-primary">
                Search
                <i class="fa fa-search"></i>
              </b-button>
            </router-link>
          </div>
        </b-container>
      </b-nav>

      <b-card-body
        id="nav-scroller"
        ref="content"
        style="position:relative; height:450px; overflow-y:scroll;"
      >
        <b-table striped bordered small hover :busy="isBusy" :items="sample_data" :fields="fields">
          <div slot="table-busy" class="text-center text-danger my-2">
            <b-spinner variant="primary" type="grow" class="align-middle"/>
            <b-nav-item>
              <strong>Loading...</strong>
            </b-nav-item>
          </div>
          <template slot="Show Details" slot-scope="row">
            <b-button
              ref="btnShow"
              size="sm"
              class="my-2 my-sm-0"
              variant="primary"
              @click="info(row.item, row.index, $event.target)"
            >Details</b-button>
          </template>
        </b-table>

        <b-modal scrollable centered class="d-block text-center" id="info" ok-only>
          <b-table stacked :items="this.infoModalA"/>
        </b-modal>
        <b-button
          v-if="this.tableBoolean"
          size="sm"
          class="my-2 my-sm-0"
          type="submit"
          variant="primary"
          v-on:click="nextRows"
        >Next Rows</b-button>
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
import db from "./FirebaseInit";
import Navbar from "./Navbar";
import Summary from "./Summary";
export default {
  name: "dashboard",
  data() {
    return {
      isBusy: false,
      tableBoolean: false,
      sortVariable: null,
      orderVariable: null,
      searchVariable: null,
      options1: [
        { value: null, text: "Please select an option to sort" },
        { value: "FiledAgainst", text: "FiledAgainst" },
        { value: "Priority", text: "Priority" },
        { value: "RequestorSeniority", text: "RequestorSeniority" },
        { value: "Satisfaction", text: "Satisfaction" },
        { value: "Severity", text: "Severity" },
        { value: "daysOpen", text: "daysOpen" },
        { value: "ticket", text: "ticket" }
      ],
      options2: [
        { value: null, text: "Order to be sorted in" },
        { value: "asc", text: "Ascending" },
        { value: "desc", text: "Descending" }
      ],
      lastVisible: "",
      sample_data: [],
      fields: [
        "FiledAgainst",
        "Priority",
        "RequestorSeniority",
        "Satisfaction",
        "Severity",
        "TicketCreationDate",
        "daysOpen",
        "ticket",
        "Show Details"
      ],

      infoModalA: []
    };
  },
  components: {
    Navbar,
    Summary
  },
  created() {
    db.collection("sample_data")
      .orderBy("ticket", "desc")
      .limit(50)
      .get()
      .then(querySnapshot => {
        this.loading = false;
        querySnapshot.forEach(doc => {
          const data = {
            FiledAgainst: doc.data().FiledAgainst,
            ITOwner: doc.data().ITOwner,
            Priority: doc.data().Priority,
            Requestor: doc.data().Requestor,
            RequestorSeniority: doc.data().RequestorSeniority,
            Satisfaction: doc.data().Satisfaction,
            Severity: doc.data().Severity,
            TicketCreationDate: doc.data()["Ticket Creation Date"],
            TicketType: doc.data().TicketType,
            daysOpen: doc.data().daysOpen,
            ticket: doc.data().ticket
          };
          this.sample_data.push(data);
          this.lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
        });
        this.tableBoolean = true;
      });
  },
  methods: {
    info(item, index, button) {
      this.infoModalA = [];
      this.$root.$emit("bv::show::modal", "info", "#btnShow");
      this.infoModalA.push(item);
    },
    rows() {
      this.isBusy = true;
      this.sample_data = [];
      db.collection("sample_data")
        .orderBy(this.sortVariable, this.orderVariable)
        .limit(200)
        .get()
        .then(querySnapshot => {
          this.isBusy = false;
          querySnapshot.forEach(doc => {
            const data = {
              FiledAgainst: doc.data().FiledAgainst,
              ITOwner: doc.data().ITOwner,
              Priority: doc.data().Priority,
              Requestor: doc.data().Requestor,
              RequestorSeniority: doc.data().RequestorSeniority,
              Satisfaction: doc.data().Satisfaction,
              Severity: doc.data().Severity,
              TicketCreationDate: doc.data()["Ticket Creation Date"],
              TicketType: doc.data().TicketType,
              daysOpen: doc.data().daysOpen,
              ticket: doc.data().ticket
            };
            this.sample_data.push(data);
            this.lastVisible =
              querySnapshot.docs[querySnapshot.docs.length - 1];
          });
        });
      this.tableBoolean = true;
    },
    nextRows() {
      if (!this.orderVariable) {
        this.sortVariable = "ticket";
        this.orderVariable = "desc";
      }
      db.collection("sample_data")
        .orderBy(this.sortVariable, this.orderVariable)
        .startAfter(this.lastVisible)
        .limit(200)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            const data = {
              FiledAgainst: doc.data().FiledAgainst,
              ITOwner: doc.data().ITOwner,
              Priority: doc.data().Priority,
              Requestor: doc.data().Requestor,
              RequestorSeniority: doc.data().RequestorSeniority,
              Satisfaction: doc.data().Satisfaction,
              Severity: doc.data().Severity,
              TicketCreationDate: doc.data()["Ticket Creation Date"],
              TicketType: doc.data().TicketType,
              daysOpen: doc.data().daysOpen,
              ticket: doc.data().ticket
            };
            this.sample_data.push(data);
            this.lastVisible =
              querySnapshot.docs[querySnapshot.docs.length - 1];
          });
        });
    }
  }
};
</script>

