export const getMenu = (role) => {
     if (role === 'user-coord') {
          const menu = [
               {
                    name: 'Referentes',
                    type: 'dropDown',
                    tooltip: 'Documentation',
                    icon: 'person',
                    sub: [
                         { name: 'Agregar', state: 'elecciones/referente' },
                         { name: 'Ver', state: 'elecciones/referentes' },
                         { name: 'Estadisticas', state: 'elecciones/calculototalref' },
                    ],
               },
               {
                    name: 'Mi planilla',
                    type: 'dropDown',
                    tooltip: 'Charts',
                    icon: 'description',
                    sub: [
                         { name: 'Agregar', state: 'elecciones/planilla' },
                         { name: 'Ver mi Planilla', state: 'elecciones/verPlanilla' },
                         { name: 'Ver Eleccion', state: 'elecciones/verPlanillaEleccion' },
                         //{ name: 'Ver Total Votos', state: 'elecciones/verPlanillas' },
                    ],
               },
               /* {
                    name: 'Estadisticas',
                    type: 'link',
                    tooltip: 'Charts',
                    icon: 'show_chart',
                    state: 'elecciones/indicadores',
               }, */
               {
                    name: 'Padrones',
                    type: 'link',
                    tooltip: 'Buscar',
                    icon: 'list_alt',
                    state: 'elecciones/padrones',
               },
               {
                    name: 'Calculos Totales',
                    type: 'dropDown',
                    tooltip: 'Documentation',
                    icon: 'person',
                    sub: [/* { name: 'Ver', state: 'elecciones/calculototal' } */
                         { name: 'Elecciones', state: 'elecciones/graficaeleccion' }],
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
                         { name: 'Agregar', state: 'elecciones/referente' },
                         { name: 'Ver', state: 'elecciones/referentes' },
                         { name: 'Estadisticas', state: 'elecciones/calculototalresp' },
                    ],
               },
               {
                    name: 'Mi planilla',
                    type: 'dropDown',
                    tooltip: 'Charts',
                    icon: 'description',
                    sub: [
                         { name: 'Agregar', state: 'elecciones/planilla' },
                         { name: 'Ver mi Planilla', state: 'elecciones/verPlanilla' },
                         { name: 'Ver Eleccion', state: 'elecciones/verPlanillaEleccion' },
                         //{ name: 'Ver Total Votos', state: 'elecciones/verPlanillas' },
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
                    sub: [{ name: 'Ver', state: 'elecciones/referentes' },
                    { name: 'Ver Eleccion', state: 'elecciones/verPlanillaEleccion' },],
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
     } else if (role === 'user-calc') {
          const menu = [
               {
                    name: 'Estadisticas',
                    type: 'link',
                    tooltip: 'Charts',
                    icon: 'show_chart',
                    state: 'elecciones/indicadores',
               },
               {
                    name: 'Calculos Totales',
                    type: 'dropDown',
                    tooltip: 'Documentation',
                    icon: 'person',
                    sub: [{ name: 'Ver', state: 'elecciones/calculototal' }],
               },
               {
                    name: 'Mapa',
                    type: 'link',
                    tooltip: 'Charts',
                    icon: 'person_pin_circle',
                    state: 'elecciones/mapa',
               },
               {
                    name: 'Calculos Totales',
                    type: 'dropDown',
                    tooltip: 'Documentation',
                    icon: 'person',
                    sub: [{ name: 'Ver', state: 'elecciones/calculototal' },
                    { name: 'Elecciones', state: 'elecciones/graficaeleccion' },
                    { name: 'Localidades', state: 'elecciones/localidades' }],
               },
          ];
          return menu;
     } else if (role === 'app-movil') {
          const menu = [
               {
                    name: 'Cargar Votos',
                    type: 'link',
                    tooltip: 'Charts',
                    icon: 'show_chart',
                    state: 'elecciones/cargarVoto',
               },
          ];
          return menu;
     } else {
          const menu = [
               {
                    name: 'Coordinador',
                    type: 'dropDown',
                    tooltip: 'Documentation',
                    icon: 'person',
                    sub: [
                         { name: 'Agregar', state: 'elecciones/coordinador' },
                         { name: 'Ver', state: 'elecciones/referentes' },
                    ],
               },
               {
                    name: 'Mi planilla',
                    type: 'dropDown',
                    tooltip: 'Charts',
                    icon: 'description',
                    sub: [
                         { name: 'Ver', state: 'elecciones/verPlanillas' },
                         { name: 'Agregar', state: 'elecciones/planilla' },
                    ],
               },
               {
                    name: 'Referentes',
                    type: 'dropDown',
                    tooltip: 'Documentation',
                    icon: 'person',
                    sub: [
                         { name: 'Agregar', state: 'elecciones/referente' },
                         { name: 'Ver', state: 'elecciones/referentes' },
                    ],
               },
               {
                    name: 'Estadisticas',
                    type: 'link',
                    tooltip: 'Charts',
                    icon: 'show_chart',
                    state: 'elecciones/indicadores',
               },
               /* {
                    name: 'Padrones',
                    type: 'link',
                    tooltip: 'Buscar',
                    icon: 'list_alt',
                    state: 'elecciones/padrones',
               }, */
               {
                    name: 'Mapa',
                    type: 'link',
                    tooltip: 'Charts',
                    icon: 'person_pin_circle',
                    state: 'elecciones/mapa',
               },
               {
                    name: 'Calculos Totales',
                    type: 'dropDown',
                    tooltip: 'Documentation',
                    icon: 'person',
                    sub: [{ name: 'Ver', state: 'elecciones/calculototal' },
                    { name: 'Elecciones', state: 'elecciones/graficaeleccion' },
                    { name: 'Localidades', state: 'elecciones/localidades' }],
               },
          ];
          return menu;
     }
};
