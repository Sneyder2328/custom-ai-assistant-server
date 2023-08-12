export const corsOptions = {
  origin:
    process.env.NODE_ENV === "production"
      ? [/to-be-defined/]
      : [/localhost/],
  credentials: true,
  allowedHeaders:
    "Content-Type, authorization, authorization-refresh-token, X-Requested-With, Accept",
  methods: "GET,POST,PUT,DELETE,OPTIONS,PATCH",
  exposedHeaders: "authorization",
};
