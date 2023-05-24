import fs from 'fs';
import os from 'os';
import path from 'path';
import {DataTypes, Sequelize} from 'sequelize';

let isNew = false;

const dataDir = path.join(os.homedir(), 'wlh');
const databaseFile = path.join(dataDir, 'dwlhC.wd');

const dbReference = new Sequelize(
  {
    dialect: 'sqlite',
    storage: databaseFile
  });


const methods = {
  checkFiles: async () => {
    fs.access(dataDir, async (err) => {
      if (err && err.code === 'ENOENT') {
        await fs.mkdir(dataDir, (err) => {
          isNew = true;
        });
      }
    });
  }
};

const projects = dbReference.define('projects', {
  summary    : {type: DataTypes.STRING(100), allowNull: false},
  description: {type: DataTypes.TEXT, allowNull: true},
  owner      : {type: DataTypes.INTEGER, allowNull: false},
  isActive   : {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true},
  deleted    : {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false},
});

const users = dbReference.define(
  'users',
  {
    summary  : {type: DataTypes.STRING(100), allowNull: false},
    firstname: {type: DataTypes.STRING(100), allowNull: false},
    lastname : {type: DataTypes.STRING(100), allowNull: false},
    pseudonym: {type: DataTypes.STRING(100), allowNull: false},
    sex      : {type: DataTypes.STRING(50), allowNull: false},
    isActive : {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true},
    deleted  : {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false},
  });


const characters = dbReference.define('characters', {
  summary    : {type: DataTypes.STRING(100), allowNull: false},
  description: {type: DataTypes.TEXT, allowNull: true},
  isActive   : {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true},
  deleted    : {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false},
});
const locations = dbReference.define('locations', {
  summary    : {type: DataTypes.STRING(100), allowNull: false},
  description: {type: DataTypes.TEXT, allowNull: true},
  isActive   : {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true},
  deleted    : {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false},
});
const objects = dbReference.define('objects', {
  summary    : {type: DataTypes.STRING(100), allowNull: false},
  description: {type: DataTypes.TEXT, allowNull: true},
  isActive   : {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true},
  deleted    : {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false},
});
// const structure = dbReference.define('structure', {
//   name: {type: DataTypes.STRING(100), allowNull: false},
//   isActive: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true},
//   parent: {type: DataTypes.INTEGER, allowNull: false, defaultValue: 0},
//   type: {type: DataTypes.STRING, allowNull: true},
//   lazy: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false}
// })
// const structureTypes = dbReference.define('structureTypes', {
//   name: {type: DataTypes.STRING(100), allowNull: false},
//   description: {type: DataTypes.TEXT, allowNull: true},
//   isActive: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true},
//   canContain: {type: DataTypes.STRING, allowNull: false},
//   canContainText: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false}
// })
// const texts = dbReference.define('texts', {
//   headline: {type: DataTypes.STRING, allowNull: true},
//   text: {type: DataTypes.TEXT, allowNull: true},
//   isActive: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true},
//   parent: {type: DataTypes.INTEGER, allowNull: false}
// })
// const mapping = dbReference.define('mapping', {
//   type: {type: DataTypes.STRING(200), allowNull: false},
//   leftId: {type: DataTypes.INTEGER, allowNull: false},
//   rightId: {type: DataTypes.INTEGER, allowNull: false}
// })
// const tableDescription = dbReference.define('tableDescription', {
//   table: {type: DataTypes.STRING(100), allowNull: false}, options: {type: DataTypes.JSON, allowNull: true}
// })


export {dbReference, dataDir, databaseFile, methods, projects, users, characters, locations, objects, isNew};
