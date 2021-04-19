import React, { Component } from "react";
import Navbar from "./Narbar";
import { db } from "./firebase_config";
import "./../css/Project.css";

function isNumeric(value) {
  return /^-?\d+$/.test(value);
}

class Project extends Component {
  constructor(props) {
    super(props);
    let formValues = { minor: "", major: "", locationName: "" };
    this.state = {
      zones: null,
      formValues,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
    this.addZone = this.addZone.bind(this);
  }

  addZone(event) {
    console.log(this.state.formValues);
    let form = this.state.formValues;
    form["uuid"] = "B9407F30-F5F8-466E-AFF9-25556B57FE6D";
    event.preventDefault();
    if (!isNumeric(form["major"])) {
      alert("major must be number");
      return;
    }

    if (!isNumeric(form["minor"])) {
      alert("minor must be number");
      return;
    }
    if (
      form["major"] === "" ||
      form["minor"] === "" ||
      form["locationName"] === ""
    ) {
      alert("please fill everything!");
      return;
    }

    db.collection("project")
      .doc("DtviKY6dGOgGpgF4pZQ2")
      .collection("zone")
      .doc()
      .set(form)
      .then(() => {
        alert("Added!");
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error on adding zone ", error);
        alert("fail!");
      });
  }

  handleChange(event) {
    let zone_id = event.target.value;
    //delete the zone
    console.log(zone_id);
    db.collection("project")
      .doc("DtviKY6dGOgGpgF4pZQ2")
      .collection("zone")
      .doc(zone_id)
      .delete()
      .then(() => {
        alert("Deleted!");
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  }
  handleFormChange(event) {
    let formValues = this.state.formValues;
    let key = event.target.name;
    formValues[key] = event.target.value;
    this.setState({ formValues: formValues });
    //add to db
  }

  componentDidMount() {
    db.collection("project")
      .doc("DtviKY6dGOgGpgF4pZQ2")
      .collection("zone")
      .get()
      .then((querySnapshot) => {
        const zones = [];
        querySnapshot.forEach((doc) => {
          let zone = doc.data();
          zone["zoneId"] = doc.id;
          //   console.log(project);
          zones.push(zone);
        });
        this.setState({ zones: zones });
        console.log(zones);
      });
  }
  render() {
    return (
      <div>
        <Navbar login="true" />
        <div className="container">
          <br></br>
          <h1>Current Setting:</h1>
          <hr></hr>
          <table>
            <thead>
              <tr>
                <th scope="col">LocationName</th>
                <th scope="col">Major</th>
                <th scope="col">Minor</th>
                <th scope="col">Option</th>
              </tr>
            </thead>
            <tbody>
              {this.state.zones &&
                this.state.zones.map((zone) => {
                  return (
                    <tr>
                      <td>{zone["locationName"]}</td>
                      <td>{zone["major"]}</td>
                      <td>{zone["minor"]}</td>
                      <td>
                        <button
                          value={zone["zoneId"]}
                          type="button"
                          onClick={this.handleChange}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>

          <hr></hr>
          <form onSubmit={this.addZone}>
            <label className="form-controls">
              Major: <br></br>
              <input
                className="input-controls"
                value={this.state.formValues["major"]}
                onChange={this.handleFormChange}
                placeholder="major value..."
                name="major"
                type="text"
              />
            </label>

            <label className="form-controls">
              Minor: <br></br>
              <input
                className="input-controls"
                value={this.state.formValues["minor"]}
                onChange={this.handleFormChange}
                placeholder="minor value..."
                name="minor"
                type="text"
              />
            </label>

            <label className="form-controls">
              Location: <br></br>
              <input
                className="input-controls"
                value={this.state.formValues["locationName"]}
                onChange={this.handleFormChange}
                placeholder="e.g. Zone A"
                name="locationName"
                type="text"
              />
            </label>
            <br></br>
            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
    );
  }
}

export default Project;
