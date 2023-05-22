const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {path: '', component: () => import('pages/IndexPage.vue')},
      {name:'app_test',path: '/app/test', component: () => import('pages/testPage.vue')},
      {name:'app_projects',path: '/app/projects', component: () => import('pages/application/projectsPage.vue')},
      {name:'app_users',path: '/app/users', component: () => import('pages/application/usersPage.vue')},
      {name:'project_settings',path: '/project/settings', component: () => import('pages/project/settingsPage.vue')},
      {name:'content_characters',path: '/project/characters', component: () => import('pages/project/charactersPage.vue')},
      {name:'content_locations',path: '/project/locations', component: () => import('pages/project/locationsPage.vue')},
      {name:'content_objects',path: '/project/objects', component: () => import('pages/project/objectsPage.vue')},
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
