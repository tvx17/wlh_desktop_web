import {characters, dbReference, isNew, locations, methods, objects, projects, users} from 'app/src-electron/dbReference';
import {iTables} from 'app/src-electron/interfaces/tables';

export default {
  setupCheck: async () => {
    await methods.checkFiles();

    try {
      await dbReference.authenticate();
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
      return;
    }

    //await projects.sync({alter: true})
    await projects.sync();
    await users.sync();
    await characters.sync();
    await locations.sync();
    await objects.sync();


    if (isNew) {
      const user = users.build({summary: 'User created at first start', firstname: 'Firstname', lastname: 'Lastname', pseudonym: 'Not set'});
      await user.save();
      await projects.build({summary: 'My first project', owner: user.id}).save();
    }

    //await sequelize.sync({alter: true});

  },
  getAll    : async (table) => {
    console.log('Get all');
    return await iTables[table].findAll({raw: true});
  },
  getById   : async (table, id) => {
    console.log('GETBYID');
    const result = await iTables[table].findByPk(id, {raw: true});
    result['isActive'] = result['isActive'] === 1;
    return result;
  },
  get       : async (table, data) => {
    console.log('In the getter');
    let results = await iTables[table].findAll({where: data, raw: true});

    for (let result of results) {
      result['isActive'] = result['isActive'] === 1;
    }
    return results;
  },
  post      : async (table, data) => {
    const new_dataset = iTables[table].build(data);
    await new_dataset.save();
  },
  put       : async (table, data) => {
    const {id} = data;
    delete data.id;
    data['isActive'] = data['isActive'] ? 1 : 0;

    await iTables[table].update(data, {where: {id: id}});


    //return await iRouter[table]['put'](data);
  },
  delete    : async (table, id) => {
    await iTables[table].update({deleted: true}, {where: {id: id}});
    //await iTables[table].destroy({where: {id: id}});
  },
  //router    : async (table, method, args) => {
  //  return await iRouter[table][method](args);
  //}

};

