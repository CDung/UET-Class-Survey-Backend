const env = process.env.NODE_ENV || 'development'

if (env === 'development' || env === 'test') {
  const config = {
  	"development": {
      "PORT": 3000,
   	  "JWT_SECRET": "bebongcute",
      "TOKEN_EXPIRES_IN": "86400s",
      "RESET_PASSWORD_EXPIRES_IN": "120s",
      "TOTAL_SEATS": "30"
  	},
  	"test": {
      "PORT": 3000, 
      "JWT_SECRET": "bebongcute",
      "TOKEN_EXPIRES_IN": "86400s",
      "RESET_PASSWORD_EXPIRES_IN": "120s",
      "TOTAL_SEATS": "30"
  	},
  }
  const envConfig = config[env]
  
  Object.keys(envConfig).forEach(key => {
    process.env[key] = envConfig[key]
  })
}