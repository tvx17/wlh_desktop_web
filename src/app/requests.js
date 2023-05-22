import {runMode} from 'src/app/config';

const methods = {
  setupCheck : async () => {
    if (runMode === 'app') {
      return await window.db.setupCheck();
    } else {
      //api['get'];
    }
  },
  getAll     : async (table) => {
    if (runMode === 'app') {
      return await window.db.getAll(table);
    }
  },
  getById    : async (table, id) => {
    if (runMode === 'app') {
      return await window.db.getById(table, id);
    }
  },
  get        : async (table, data) => {
    if (runMode === 'app') {
      return await window.db.get(table, data);
    } else {
    }
  },
  post       : async (table, data) => {
    if (runMode === 'app') {
      return await window.db.post(table, methods.cleanUpData(data));
    } else {
    }
  },
  put        : async (table, data) => {
    if (runMode === 'app') {
      return await window.db.put(table, methods.cleanUpData(data));
    } else {
    }
  },
  delete     : async (table, data) => {
    if (runMode === 'app') {
      return await window.db.delete(table, data);
    } else {
    }
  },
  router     : async (table, method, where = null, fields = null, orderBy = null) => {
    if (runMode === 'app') {
      return await window.db.router(table, method, where, fields, orderBy);
    }
  },
  cleanUpData: (data) => {
    const dataKeys = Object.keys(data);
    const cleanedData = {};
    for (const keyIndex in dataKeys) {
      if (dataKeys[keyIndex] !== 'createdAt' && dataKeys[keyIndex] !== 'updatedAt') {
        cleanedData[dataKeys[keyIndex]] = data[dataKeys[keyIndex]];
      }
    }
    return cleanedData;
  }
};
export default methods;
