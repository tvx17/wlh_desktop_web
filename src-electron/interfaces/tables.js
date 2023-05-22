import {characters as tCharacter, locations as tLoctations, objects as tObjects, projects as tProjects, users as tUsers} from 'app/src-electron/dbReference';

export const iTables = {
  projects  : tProjects,
  users     : tUsers,
  characters: tCharacter,
  locations : tLoctations,
  objects   : tObjects
};
