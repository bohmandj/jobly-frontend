import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = (method === "get")
      ? data
      : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get user data from username,
   * returns { username, firstName, lastName, isAdmin, jobs }
   */

  static async getUser(username) {
    let res = await this.request(
      `users/${username}`
    );
    return res.user;
  }

  /** Register a new user, 
   * returns auth token.
   **/

  static async registerUser(username, password, firstName, lastName, email) {
    let res = await this.request(
      `auth/register`,
      { username, password, firstName, lastName, email },
      "post"
    );
    return res.token;
  }

  /** Log in an existing user, 
   * returns auth token. 
   **/

  static async loginUser(username, password) {
    let res = await this.request(
      `auth/token`,
      { username, password },
      "post"
    );
    return res.token;
  }

  /** Update an existing user, 
   * returns { username, firstName, lastName, email, isAdmin }
   **/

  static async updateUser(username, firstName, lastName, email) {
    let res = await this.request(
      `users/${username}`,
      { firstName, lastName, email },
      "patch"
    );
    return res.user;
  }

  /** Get details on a all companies or filtered subset, 
   * returns [ { handle, name, description, numEmployees, logoUrl }, ...]. 
   **/

  static async getAllCompanies(query = "") {
    let res = await this.request(
      query
        ? `companies?name=${query}`
        : `companies`
    );
    return res.companies;
  }

  /** Get details on a company by handle, 
   * returns { handle, name, description, numEmployees, logoUrl, jobs }
   * where jobs is [{ id, title, salary, equity }, ...] 
   **/

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  /** Get details on a all jobs, 
   * returns [ { id, title, salary, equity, companyHandle, companyName }, ...] 
   **/

  static async getAllJobs(query = "") {
    let res = await this.request(
      query
        ? `jobs?title=${query}`
        : `jobs`
    );
    // let res = await this.request(`jobs`);
    return res.jobs;
  }

  /** Have user apply to a job by job id, 
   * returns job id 
   **/

  static async applyToJob(username, id) {
    let res = await this.request(
      `users/${username}/jobs/${id}`,
      {},
      "post"
    );
    return res.applied;
  }

}

// for now, put token ("testuser" / "password" on class)
// JoblyApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
//   "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
//   "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

export default JoblyApi;
