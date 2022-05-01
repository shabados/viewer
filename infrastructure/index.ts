import { Config, getStack } from '@pulumi/pulumi'
import { apps, core, apiextensions } from '@pulumi/kubernetes'
import { join } from 'path'

const { FRONTEND_IMAGE, BACKEND_IMAGE } = process.env

const APP_NAME = 'viewer'
const FRONTEND_PORT = 80
const BACKEND_PORT = 52526
const API_PREFIX = '/api'

const config = new Config()

const GOOGLE_APPLICATION_CREDENTIALS_FOLDER = '/var/auth/google'
const GOOGLE_APPLICATION_CREDENTIALS_FILENAME = 'credentials.json'
const GOOGLE_APPLICATION_CREDENTIALS_PATH = join(
  GOOGLE_APPLICATION_CREDENTIALS_FOLDER,
  GOOGLE_APPLICATION_CREDENTIALS_FILENAME
)
const GOOGLE_APPLICATION_CREDENTIALS_VOLUME = 'google-application-credentials'

const googleApplicationCredentialsSecret = new core.v1.Secret('google-application-credentials', {
  stringData: {
    [GOOGLE_APPLICATION_CREDENTIALS_FILENAME]: config.requireSecret('googleApplicationCredentials'),
  },
})

const appLabels = { app: APP_NAME }

const deployment = new apps.v1.Deployment(APP_NAME, {
  spec: {
    selector: { matchLabels: appLabels },
    replicas: 1,
    template: {
      metadata: { labels: appLabels },
      spec: {
        volumes: [
          {
            name: GOOGLE_APPLICATION_CREDENTIALS_VOLUME,
            secret: { secretName: googleApplicationCredentialsSecret.metadata.name },
          },
        ],
        containers: [
          {
            name: `${APP_NAME}-frontend`,
            image: FRONTEND_IMAGE,
            ports: [{ containerPort: FRONTEND_PORT }],
          },
          {
            name: `${APP_NAME}-backend`,
            image: BACKEND_IMAGE,
            ports: [{ containerPort: BACKEND_PORT }],
            command: ['npm', 'run', 'start:production'],
            volumeMounts: [
              {
                name: GOOGLE_APPLICATION_CREDENTIALS_VOLUME,
                mountPath: GOOGLE_APPLICATION_CREDENTIALS_FOLDER,
              },
            ],
            env: [
              { name: 'PORT', value: BACKEND_PORT.toString() },
              {
                name: 'GOOGLE_APPLICATION_CREDENTIALS',
                value: GOOGLE_APPLICATION_CREDENTIALS_PATH,
              },
            ],
          },
        ],
      },
    },
  },
})

const service = new core.v1.Service(APP_NAME, {
  metadata: { name: APP_NAME, labels: deployment.metadata.labels },
  spec: {
    selector: deployment.spec.template.metadata.labels,
    ports: [
      { name: 'backend', port: BACKEND_PORT, targetPort: BACKEND_PORT },
      { name: 'frontend', port: FRONTEND_PORT, targetPort: FRONTEND_PORT },
    ],
  },
})

const stripPrefixMiddleware = new apiextensions.CustomResource(`${APP_NAME}-strip-prefix-middleware`, {
  apiVersion: 'traefik.containo.us/v1alpha1',
  kind: 'Middleware',
  metadata: { name: `${APP_NAME}-strip-prefix-middleware` },
  spec: {
    stripPrefix: {
      prefixes: [API_PREFIX],
    },
  },
})

const stack = getStack()
const host = stack === 'production' ? 'viewer.shabados.com' : `viewer.${stack}.shabados.com`

new apiextensions.CustomResource(`${APP_NAME}-ingress-route`, {
  apiVersion: 'traefik.containo.us/v1alpha1',
  kind: 'IngressRoute',
  spec: {
    routes: [
      {
        match: `Host(\`${host}\`) && PathPrefix(\`${API_PREFIX}\`)`,
        kind: 'Rule',
        middlewares: [{ name: stripPrefixMiddleware.metadata.name }],
        services: [{ name: service.metadata.name, port: BACKEND_PORT }],
      },
      {
        match: `Host(\`${host}\`)`,
        kind: 'Rule',
        services: [{ name: service.metadata.name, port: FRONTEND_PORT }],
      },
    ],
  },
})
