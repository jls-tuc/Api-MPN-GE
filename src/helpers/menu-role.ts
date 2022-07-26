export const getMenu = (role) => {
     switch (role) {
          case 'user-ref': {
               let menu = [
                    {
                         name: 'Responsables de Planillas',
                         type: 'dropDown',
                         tooltip: 'Dialogs',
                         icon: 'filter_none',
                         sub: [
                              /* { name: 'Agregar', state: 'elecciones/referente' }, */
                              { name: 'Ver', state: 'elecciones/referentes' },
                              /*  { name: 'Estadisticas', state: 'elecciones/calculototalresp' }, */
                         ],
                    },
                    {
                         name: 'Mi planilla',
                         type: 'dropDown',
                         tooltip: 'Charts',
                         icon: 'description',
                         sub: [
                              /* { name: 'Agregar', state: 'elecciones/planilla' }, */
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
               ];
               return menu;
          }

          case 'user-resp': {
               let menu = [
                    {
                         name: 'Responsables de Planillas',
                         type: 'dropDown',
                         tooltip: 'Dialogs',
                         icon: 'filter_none',
                         sub: [
                              /* { name: 'Agregar', state: 'elecciones/referente' }, */
                              { name: 'Ver', state: 'elecciones/referentes' },
                              /*  { name: 'Estadisticas', state: 'elecciones/calculototalresp' }, */
                         ],
                    },
                    {
                         name: 'Mi planilla',
                         type: 'dropDown',
                         tooltip: 'Charts',
                         icon: 'description',
                         sub: [
                              /* { name: 'Agregar', state: 'elecciones/planilla' }, */
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
               ];
               return menu;
          }
          case 'user-calc': {
               let menu = [
                    {
                         name: 'Responsables de Planillas',
                         type: 'dropDown',
                         tooltip: 'Dialogs',
                         icon: 'filter_none',
                         sub: [
                              /* { name: 'Agregar', state: 'elecciones/referente' }, */
                              { name: 'Ver', state: 'elecciones/referentes' },
                              /*  { name: 'Estadisticas', state: 'elecciones/calculototalresp' }, */
                         ],
                    },
                    {
                         name: 'Mi planilla',
                         type: 'dropDown',
                         tooltip: 'Charts',
                         icon: 'description',
                         sub: [
                              /* { name: 'Agregar', state: 'elecciones/planilla' }, */
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
               ];
               return menu;
          }
          case 'user-afilia': {
               let menu = [
                    {
                         name: 'Lotes afiliacion',
                         type: 'dropDown',
                         tooltip: 'Dialogs',
                         icon: 'filter_none',
                         sub: [
                              { name: 'Ver Lote/Afiliar', state: 'afiliacion/lotes' },
                              /*  { name: 'Estadisticas', state: 'elecciones/calculototalresp' }, */
                         ],
                    },
                    {
                         name: 'Planillas',
                         type: 'link',
                         tooltip: 'Planillas cargadas en los Lotes',
                         icon: 'list_alt',
                         state: 'afiliacion/planillas',
                    },
                    {
                         name: 'Padrones',
                         type: 'link',
                         tooltip: 'Buscar por dni en los padrones',
                         icon: 'person_search',
                         state: 'elecciones/padrones',
                    },
               ];
               return menu;
          }
          case 'user-Adminafilia': {
               let menu = [
                    {
                         name: 'Admin. de Lotes',
                         type: 'dropDown',
                         tooltip: 'Dialogs',
                         icon: 'filter_none',
                         sub: [
                              { name: 'ABM de Lotes', state: 'afiliacion/lote' },
                              { name: 'Ver Lote/Afiliar', state: 'afiliacion/lotes' },
                              /*  { name: 'Estadisticas', state: 'elecciones/calculototalresp' }, */
                         ],
                    },

                    {
                         name: 'Planillas',
                         type: 'link',
                         tooltip: 'Planillas cargadas en los Lotes',
                         icon: 'list_alt',
                         state: 'afiliacion/planillas',
                    },
                    {
                         name: 'Padrones',
                         type: 'link',
                         tooltip: 'Buscar por dni en los padrones',
                         icon: 'person_search',
                         state: 'elecciones/padrones',
                    },
                    {
                         name: 'Listados Padron Afiliados',
                         type: 'link',
                         tooltip: 'Listados de Empadronados',
                         icon: 'list_alt',
                         state: 'afiliacion/listados',
                    },
               ];
               return menu;
          }
          case 'app-movil': {
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
          }
          default: {
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
                    /* {
                         name: 'Estadisticas',
                         type: 'link',
                         tooltip: 'Charts',
                         icon: 'show_chart',
                         state: 'elecciones/indicadores',
                    }, */
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
                         sub: [
                              /* { name: 'Ver', state: 'elecciones/calculototal' }, */
                              { name: 'Elecciones', state: 'elecciones/graficaeleccion' },
                              { name: 'Localidades', state: 'elecciones/localidades' },
                         ],
                    },
               ];
               return menu;
          }
     }
};
