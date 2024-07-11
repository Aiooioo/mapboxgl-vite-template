import _ from "lodash";

class RouteSchemaApplyUsers {
  constructor(taskId, subId) {
    this.taskId = taskId;

    this.schemaId = subId;

    this.applyUsers = [];
    this.addedUsers = [];
    this.removeUsers = [];
  }

  isDirty() {
    return this.addedUsers.length > 0 || this.removeUsers.length > 0;
  }

  pushSavedUsers(data) {
    this.applyUsers.push(data);
  }

  addUser(id) {
    this.applyUsers.push(id);

    const removeIdx = this.removeUsers.indexOf(id);
    if (removeIdx > -1) {
      this.removeUsers.splice(removeIdx, 1);
    } else {
      this.addedUsers.push(id);
    }
  }

  removeUser(id) {
    const applyIdx = this.applyUsers.indexOf(id);

    this.applyUsers.splice(applyIdx, 1);

    const addIdx = this.addedUsers.indexOf(id);
    if (addIdx > -1) {
      this.addedUsers.splice(addIdx, 1);
    } else {
      this.removeUsers.push(id);
    }
  }
}

export default RouteSchemaApplyUsers;
