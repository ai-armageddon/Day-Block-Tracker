module.exports = {
  apps: [
    {
      name: 'day-calc-app',
      script: 'server.js',
      env: {
        NODE_ENV: 'production',
        PORT: 3912,
      },
    },
  ],
};
