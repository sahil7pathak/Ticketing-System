<template>
  <div>
    <Navbar/>
    <b-card no-body>
      <b-nav pills slot="header" v-b-scrollspy:nav-scroller>
        <b-container class="bv-example-row">
          <b-row>
            <b-col>
              <b-form-select v-model="optionVariable" :options="options1" size="sm" class="mt-3"/>
            </b-col>
            <b-col v-if="this.optionVariable=='FiledAgainst'">
              <b-form-select v-model="subTypeVariable" :options="optionsFA" size="sm" class="mt-3"/>
            </b-col>
            <b-col v-if="this.optionVariable=='Priority'">
              <b-form-select v-model="subTypeVariable" :options="optionsP" size="sm" class="mt-3"/>
            </b-col>
            <b-col v-if="this.optionVariable=='RequestorSeniority'">
              <b-form-select v-model="subTypeVariable" :options="optionsRS" size="sm" class="mt-3"/>
            </b-col>
            <b-col v-if="this.optionVariable=='Satisfaction'">
              <b-form-select v-model="subTypeVariable" :options="optionsS" size="sm" class="mt-3"/>
            </b-col>

            <b-col v-if="this.optionVariable=='Severity'">
              <b-form-select v-model="subTypeVariable" :options="optionsSV" size="sm" class="mt-3"/>
            </b-col>
          </b-row>
          <br>
          <b-button
            disabled
            v-if="!this.subTypeVariable"
            size="md"
            class="my-2 my-sm-0"
            type="submit"
            v-on:click="parameterSearch"
          >Search</b-button>
          <b-button
            v-if="this.subTypeVariable"
            size="md"
            class="my-2 my-sm-0"
            type="submit"
            variant="primary"
            v-on:click="parameterSearch"
          >Search</b-button>
          <hr>
        </b-container>
        <b-container class="bv-example-row">
          <b-row>
            <b-col>
              <b-form-input
                id="textVal"
                v-model="searchVariable"
                type="text"
                placeholder="Search Based On The Ticket Number"
              />
            </b-col>
            <b-button
              disabled
              v-if="!this.searchVariable"
              size="sm"
              class="my-2 my-sm-0"
              type="submit"
              v-on:click="search"
            >Search Ticket</b-button>
            <b-button
              v-if="this.searchVariable"
              size="sm"
              class="my-2 my-sm-0"
              type="submit"
              variant="primary"
              v-on:click="search"
            >Search Ticket</b-button>
          </b-row>
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
          v-on:click="updateRows"
        >Update Rows</b-button>
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
import Navbar from "./Navbar";
import db from "./FirebaseInit";
export default {
  name: "search",
  data() {
    return {
      sample_data: [],
      isBusy: false,
      searchVariable: null,
      optionVariable: null,
      subTypeVariable: null,
      lastVisible: null,
      tableBoolean: false,
      options1: [
        { value: null, text: "Please select an option to search" },
        { value: "FiledAgainst", text: "FiledAgainst" },
        { value: "Priority", text: "Priority" },
        { value: "RequestorSeniority", text: "RequestorSeniority" },
        { value: "Satisfaction", text: "Satisfaction" },
        { value: "Severity", text: "Severity" }
      ],
      optionsFA: [
        { value: null, text: "Please select the sub-type" },
        { value: "Access/Login", text: "Access/Login" },
        { value: "Systems", text: "Systems" },
        { value: "Software", text: "Software" },
        { value: "Hardware", text: "Hardware" }
      ],
      optionsP: [
        { value: null, text: "Please select the sub-type" },
        { value: "0 - Unassigned", text: "Unassigned" },
        { value: "1 - Low", text: "Low" },
        { value: "2 - Medium", text: "Medium" },
        { value: "3 - High", text: "High" }
      ],
      optionsRS: [
        { value: null, text: "Please select the sub-type" },
        { value: "1 - Junior", text: "Junior" },
        { value: "2 - Regular", text: "Regular" },
        { value: "3 - Senior", text: "Senior" },
        { value: "4 - Management", text: "Management" }
      ],
      optionsS: [
        { value: null, text: "Please select the sub-type" },
        { value: "0 - Unknown", text: "Unknown" },
        { value: "1 - Unsatisfied", text: "Unsatisfied" },
        { value: "2 - Satisfied", text: "Satisfied" },
        { value: "3 - Highly satisfied", text: "Highly satisfied" }
      ],
      optionsSV: [
        { value: null, text: "Please select the sub-type" },
        { value: "0 - Unclassified", text: "Unclassified" },
        { value: "1 - Minor", text: "Minor" },
        { value: "2 - Normal", text: "Normal" },
        { value: "3 - Major", text: "Major" },
        { value: "4 - Critical", text: "Critical" }
      ],

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
    Navbar
  },
  methods: {
    info(item, index, button) {
      this.infoModalA = [];
      this.$root.$emit("bv::show::modal", "info", "#btnShow");
      this.infoModalA.push(item);
    },
    search() {
      this.sample_data = [];
      this.optionVariable = null;
      this.subTypeVariable = null;
      this.searchVariable = +document.getElementById("textVal").value;
      if (this.searchVariable > 0 && this.searchVariable <= 25268) {
        db.collection("sample_data")
          .where("ticket", "==", this.searchVariable)
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
            });
          });
        this.tableBoolean = false;
      } else {
        alert("Please enter a numeric value");
        this.searchVariable = null;
      }
    },
    parameterSearch() {
      this.sample_data = [];
      this.isBusy = true;
      db.collection("sample_data")
        .where(this.optionVariable, "==", this.subTypeVariable)
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
            console.log(this.sample_data);
            this.lastVisible =
              querySnapshot.docs[querySnapshot.docs.length - 1];
          });
        });
      this.tableBoolean = true;
    },
    updateRows() {
      // this.isBusy = true
      db.collection("sample_data")
        .where(this.optionVariable, "==", this.subTypeVariable)
        .startAfter(this.lastVisible)
        .limit(200)
        .get()
        .then(querySnapshot => {
          //this.isBusy = false;
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
