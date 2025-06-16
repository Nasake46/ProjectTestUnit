const express = require("express");
const Sentry = require("@sentry/node");
const supabase = require("./utils/supabase");
const checkOccupiedPlace = require("./functions/checkOccupiedPlace");
const checkParkedCar = require("./functions/checkParkedCar");
const countFreePlaces = require("./functions/countFreePlaces");

const app = express();
const port = 3000;

// --- Initialisation Sentry v7 ---
Sentry.init({
  dsn: "https://a5e07e663d7f1572fa5440847425f0b5@o4509507365371904.ingest.de.sentry.io/4509507382280272",
  tracesSampleRate: 1.0,
  sendDefaultPii: true,
});

// --- Middlewares Sentry ---
app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

// --- Middlewares Express ---
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- Routes de test Sentry ---
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/debug-sentry", (req, res) => {
  throw new Error("My first Sentry error!");
});

app.get("/force-error", (req, res) => {
  throw new Error("Erreur test Sentry numéro 2 !");
});

app.get("/async-error", async (req, res, next) => {
  try {
    await Promise.reject(new Error("Erreur asynchrone test Sentry numéro 3"));
  } catch (err) {
    next(err);
  }
});

app.get("/message-sentry", (req, res) => {
  Sentry.captureMessage("Message Sentry : une anomalie non bloquante a été détectée", "info");
  res.send("Message capturé par Sentry !");
});

app.get("/perf-error", async (req, res, next) => {
  const transaction = Sentry.startTransaction({
    op: "http.server",
    name: "GET /perf-error",
  });

  Sentry.getCurrentHub().configureScope(scope => {
    scope.setSpan(transaction);
  });

  const span = transaction.startChild({
    op: "traitement.donnee",
    description: "Simulation de traitement lent",
  });

  try {
    await new Promise(resolve => setTimeout(resolve, 1200));
    span.finish();

    throw new Error("Erreur volontaire avec traçage de performance (v7)");
  } catch (err) {
    Sentry.captureException(err);
    next(err);
  } finally {
    transaction.finish();
  }
});

// --- Middleware de gestion d'erreurs Sentry ---
app.use(Sentry.Handlers.errorHandler());

// --- Lancer le serveur ---
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
