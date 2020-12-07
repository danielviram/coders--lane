import axios from "axios";

export default {
  // Gets all people/users
  getPeopleList: function() {
    return axios.get("/api/peoplelist");
  }
};


//ADD a axios.post