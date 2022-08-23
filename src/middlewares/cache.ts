import expeditious from 'express-expeditious';

const cacheoptions: expeditious.ExpeditiousOptions = {
     namespace: 'expresscache',
     engine: require('expeditious-engine-memory')(),
     defaultTtl: '10 minute',
     statusCodeExpires: {
          300: '5 minutes',
          400: '5 minutes',
          404: '5 minutes',
          500: '5 minutes',
     },
};

const cache = expeditious(cacheoptions);

export default cache;
