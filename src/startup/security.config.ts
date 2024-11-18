import helmet from 'helmet';

// Probably we won't need most of this security measurments XD but it's a good practice to have it
export function initSecurityConfig(app): void {
  app.enableCors({
    origin: '*',
    // origin: ['http://localhost:3500', 'https://localhost:3500'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  app.use(
    helmet({
      crossOriginOpenerPolicy: { policy: 'same-origin' },
    }),
  );
  app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));

  app.use(
    helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", 'example.com'],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ['data:', 'example.com'],
        objectSrc: ["'none'"],
        upgradeInsecureRequests: [],
      },
    }),
  );

  app.use(
    helmet.hsts({
      maxAge: 31536000,
      includeSubDomains: true,
      preload: true,
    }),
  );

  app.use(helmet.frameguard({ action: 'deny' }));
  app.use(helmet.xssFilter());
  app.use(helmet.noSniff());
  app.use(helmet.ieNoOpen());
  app.use(helmet.dnsPrefetchControl());
}
