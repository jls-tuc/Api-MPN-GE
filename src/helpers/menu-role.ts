export const getMenu = (role) => {
   if (role === 'user-coord') {
      const menu = [
         {
            name: 'Referentes',
            type: 'dropDown',
            tooltip: 'Documentation',
            icon: 'person',
            sub: [
               { name: 'Ver', state: 'elecciones/referentes' },
               { name: 'Agregar', state: 'elecciones/referente' },
            ],
         },
         {
            name: 'Estadisticas',
            type: 'link',
            tooltip: 'Charts',
            icon: 'show_chart',
            state: 'elecciones/indicadores',
         },
         {
            name: 'Padrones',
            type: 'link',
            tooltip: 'Buscar',
            icon: 'list_alt',
            state: 'elecciones/padrones',
         },
      ];
      return menu;
   } else if (role === 'user-ref') {
      const menu = [
         {
            name: 'Responsables de Planillas',
            type: 'dropDown',
            tooltip: 'Dialogs',
            icon: 'filter_none',
            sub: [
               { name: 'Ver', state: 'elecciones/referentes' },
               { name: 'Agregar', state: 'elecciones/referente' },
            ],
         },
         {
            name: 'Estadisticas',
            type: 'link',
            tooltip: 'Charts',
            icon: 'show_chart',
            state: 'elecciones/indicadores',
         },
         {
            name: 'Padrones',
            type: 'link',
            tooltip: 'Buscar',
            icon: 'list_alt',
            state: 'elecciones/padrones',
         },
      ];
      return menu;
   } else if (role === 'user-resp') {
      const menu = [
         {
            name: 'Responsables de Planillas',
            type: 'dropDown',
            tooltip: 'Dialogs',
            icon: 'filter_none',
            sub: [{ name: 'Ver', state: 'elecciones/referentes' }],
         },

         {
            name: 'Estadisticas',
            type: 'link',
            tooltip: 'Charts',
            icon: 'show_chart',
            state: 'elecciones/indicadores',
         },
         {
            name: 'Padrones',
            type: 'link',
            tooltip: 'Buscar',
            icon: 'list_alt',
            state: 'elecciones/padrones',
         },
      ];
      return menu;
   } else {
   }
};
