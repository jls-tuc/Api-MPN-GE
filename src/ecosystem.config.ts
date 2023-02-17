module.exports = {
    apps: [
        {
            name: 'ApiMpn',
            script: 'dist/src/app.js',
            watch: true,
            watch_delay:3000,
            node_args: '--max-http-header-size=80000',
            exec_mode: 'cluster',
            instances: 1,
            cron_restart: '59 23 * * *',
            /* env: {
                NODE_ENV: 'production',
            },
            env_production: {
                NODE_ENV: 'production',
            }, */
        },
    ],
};