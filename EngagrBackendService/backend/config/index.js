'use strict'

import dotenv from 'dotenv'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import dbConstants from './dbConstants.json' assert { type: "json" }
import queue from './queue.json' assert { type: "json" }

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

dotenv.config({ path: path.resolve(__dirname, '../.env') })

export default {

  HTTP_STATUS_CODES: {
    OK: 200,
    CREATED: 201,
    ACCEPTED: 202,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    UNPROCESSABLE_ENTITY: 422,
    TOO_MANY_REQUESTS: 429,
    INTERNAL_SERVER_ERROR: 500,
    BAD_GATEWAY: 502,
    SERVICE_UNAVAILABLE: 503
  },

  NETWORK: {
    ETH: {
      RPC_API: process.env.RPC_API
    },
    POLYGON: {
      RPC_API: process.env.MATIC_RPC_API,
      CHAINID: 80001,
      NETWORKID: 80001
    },
    CRONOS: {
      RPC_API: 'https://evm-t3.cronos.org',
      CHAINID: 338,
      NETWORKID: 338

    },
    GNOSIS: {
      RPC_API: 'https://rpc.gnosischain.com/',
      CHAINID: 100,
      NETWORKID: 100
    }
  },

  DATABASE: {
    MONGO: {
      URI: process.env.MONGO_URI
    }
  },

  LOGGER: {
    LEVEL: process.env.LOG_LEVEL || 'debug'
  },

  API_KEY: process.env.API_KEY,

  QUEUE: {
    CONNECTION_URL: process.env.RMQ_CONN_URL,
    LIST: queue
  },

  DEPLOY_URL: process.env.DEPLOY_URL || "http://localhost:3002",

  DB_CONSTANTS: dbConstants,

  KEY_SECURE_PASSWORD: process.env.KEY_SECURE_PASSWORD || 'planetx12345',

  EMAIL: {
    HOST: 'smtp.gmail.com',
    USER: '',
    PASS: ''
  },

  USERNAME: '',

  AWS: {
    ACCESS_KEY_ID: 'AKIAXJSA6ABAY2BGTLE4',
    ACCESS_KEY_SECRET: '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'
  },

  OTP: {
    TIMEOUT_WINDOW: 240 // secs
  },

  SESSION_SECRET: '',

  PINATA: {
    URL: '',
    API_KEY: '',
    API_SECRET: ''
  },

  API_KEYS: {
    CRYPTO_COMPARE: ''
  },

  PRIVATE_KEYS: {
    COMMON: process.env.ADMIN_PRIVATE_KEY
  },

  MORALIS: {
    API_KEY: process.env.MORALIS_API_KEY
  },
  POAP:{
    API_KEY: "",
    AUTH_TOKEN:""
  },

  COVALENT: {
    API_KEY: ""
  },

  GITHUB: {
    CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET
  }

}
