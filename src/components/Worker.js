import React, { Component } from "react";
import Navbar from "./Narbar";
import { db } from "./firebase_config";
import "./../css/Worker.css";

class Worker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: null,
      selectedProject: null,
      workers: null,
      attendance: null,
      motion: null,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    let project_id = event.target.value;
    console("value changed to", project_id);
    this.setState({ selectedProject: project_id });
  }

  componentDidMount() {
    // Fetch everything here and push into state
    // Fetch project info
    db.collection("project")
      .get()
      .then((querySnapshot) => {
        const projects = [];
        querySnapshot.forEach((doc) => {
          let project = doc.data();
          project["projectId"] = doc.id;
          //   console.log(project);
          projects.push(project);
        });
        this.setState({ projects: projects });
      });

    //Fetch all user from db
    db.collection("project")
      .doc("DtviKY6dGOgGpgF4pZQ2")
      .collection("worker")
      .get()
      .then((querySnapshot) => {
        const workers = [];
        querySnapshot.forEach((doc) => {
          let worker = doc.data();
          workers.push(worker);
        });
        this.setState({ workers: workers });

        console.log(workers);
      });
  }

  render() {
    return (
      <div>
        <Navbar login="true" />
        <div className="container">
          <br></br>
          <h1>Worker management dashboard</h1>
          <hr></hr>
          <div className="customers">
            <div className="project_labels">Project:</div>
            <div className="selectProject">
              <form>
                <select
                  //   onChange={this.handleChange}
                  className="project_select"
                  name="projects"
                >
                  {this.state.projects &&
                    this.state.projects.map((project) => {
                      return (
                        <option
                          className="project_option"
                          value={project["projectId"]}
                        >
                          {project["projectTitle"]}
                        </option>
                      );
                    })}
                </select>
              </form>
            </div>
          </div>
          <hr></hr>
          <table>
            <thead>
              <tr>
                <th scope="col">worker Name</th>
                <th scope="col">Location</th>
                <th scope="col">Activity</th>
                <th scope="col">Last equipment check time</th>
              </tr>
            </thead>
            <tbody>
              {this.state.workers &&
                this.state.workers.map((worker) => {
                  return (
                    <tr>
                      <td>{worker["user"]}</td>
                      <td>{worker["location"]}</td>
                      <td>{worker["activity"]}</td>
                      <td>{worker["equipment_dateTime"]}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Worker;
