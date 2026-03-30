package main

import (
	"errors"
	"log/slog"
	"os"
	"time"
)

func main() {
	textLogger := slog.New(slog.NewTextHandler(os.Stdout, &slog.HandlerOptions{
		Level: slog.LevelInfo,
	}))
	textLogger.Info("server start", "port", 8080)

	requestLogger := textLogger.With(
		"service", "slog-demo",
		"version", "v1",
	)
	requestLogger.Warn("slow request", "duration", 120*time.Millisecond)

	jsonLogger := slog.New(slog.NewJSONHandler(os.Stdout, &slog.HandlerOptions{Level: slog.LevelDebug}))
	err := errors.New("db timeout")
	jsonLogger.Error("query failed", "err", err, "retry", true)
}
