module.exports = {
    apps : [{
        name: "Express",
        script: "app.js",
        log_file: "./logs/pm2/combined.outerr.log",
        error_file: "./logs/pm2/err.log",
        out_file: "./logs/pm2/out.log",
        merge_logs: true,
        interpreter_args: "--harmony",
        watch: false,
        ignore_watch: ["node_modules", "public", "\.git", "logs", "uploads", "npm-debug\.log"],
        instances: "1", // String type
        exec_mode: "cluster",
        log_date_format: "YYYY-MM-DD HH:mm Z",
        env: {
            "NODE_ENV": "development",
            "NODE_PORT": 3000
        },
        env_development: {
            "NODE_ENV": "development",
            "NODE_PORT": 3000
        },
        env_production: {
            "NODE_ENV": "production",
            "NODE_PORT": 80
        }
    }],
    deploy: {
        // "production" is the environment name
        production: {
          // SSH key path, default to $HOME/.ssh
          key: "/path/to/some.pem",
          // SSH user
          user: "ubuntu",
          // SSH host
          host: ["192.168.0.13"],
          // SSH options with no command-line flag, see 'man ssh'
          // can be either a single string or an array of strings
          ssh_options: "StrictHostKeyChecking=no",
          // GIT remote/branch
          ref: "origin/master",
          // GIT remote
          repo: "git@github.com:Username/repository.git",
          // path in the server
          path: "/var/www/my-repository",
          // Pre-setup command or path to a script on your local machine
          'pre-setup': "",
          // Post-setup commands or path to a script on the host machine
          // eg: placing configurations in the shared dir etc
          'post-setup': "ls -la",
          // pre-deploy action
          'pre-deploy-local': "echo 'This is a local executed command'",
          // post-deploy action
          'post-deploy': "rm -rf /srv/www/* && cp -r /var/www/source/* /srv/www && cd /srv/www && npm install && npm run pm2_prod",
        }
    }
}