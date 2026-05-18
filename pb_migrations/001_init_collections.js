// pb_migrations/001_init_collections.js
// PocketBase automatically runs this on first startup
migrate((db) => {
  // ── sessions collection ──
  const sessions = new Collection({
    name: "sessions",
    type: "base",
    schema: [
      { name: "day",          type: "text",   required: true },
      { name: "patients",     type: "json",   required: false },
      { name: "nextToken",    type: "number", required: false },
      { name: "doctorStatus", type: "text",   required: false },
      { name: "consultTs",    type: "json",   required: false },
      { name: "refMeta",      type: "json",   required: false },
    ],
    indexes: ["CREATE UNIQUE INDEX idx_sessions_day ON sessions (day)"],
    listRule:   "",
    viewRule:   "",
    createRule: "",
    updateRule: "",
    deleteRule: "",
  });
  db.saveCollection(sessions);

  // ── audit_logs collection ──
  const audit = new Collection({
    name: "audit_logs",
    type: "base",
    schema: [
      { name: "day",    type: "text",   required: true },
      { name: "type",   type: "text",   required: false },
      { name: "icon",   type: "text",   required: false },
      { name: "action", type: "text",   required: false },
      { name: "detail", type: "text",   required: false },
      { name: "by",     type: "text",   required: false },
      { name: "reason", type: "text",   required: false },
      { name: "time",   type: "text",   required: false },
      { name: "ts",     type: "number", required: false },
    ],
    listRule:   "",
    viewRule:   "",
    createRule: "",
    updateRule: "",
    deleteRule: "",
  });
  db.saveCollection(audit);
}, (db) => {
  db.dropCollection("sessions");
  db.dropCollection("audit_logs");
});
