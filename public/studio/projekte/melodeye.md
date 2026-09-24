# MELODEYE — ShapeNeural Projekt

> Kann ein digitales System auf erlebte statt nur auf gezeigte Emotion reagieren?

- **Projekttyp:** Experiment
- **Status:** BETA
- **Kategorie:** BIOMETRIC AI
- **Jahr:** 2024
- **Zusammenarbeit:** INDEPENDENT
- **Kanonische Seite:** https://www.shapeneural.com/studio/projekte/melodeye
- **Live-Projekt:** https://aura-soundscape-96.vercel.app

## Kontext

MELODEYE kombiniert Gesichtsausdruck, Blickrichtung und Pupillendynamik direkt im Browser. Aus der Differenz zwischen sichtbarer und erlebter Emotion entsteht eine adaptive musikalische Reaktion.

## Aufgabe

### Emotion ist kein einzelner Messwert.

Ein Lächeln kann Freude, Anspannung oder soziale Anpassung bedeuten. Das Experiment untersucht deshalb nicht nur Ausdruck, sondern die Differenz zwischen mehreren Signalen – und hält biometrische Rohdaten auf dem Gerät.

## System

### Von multimodalen Signalen zu einer vorsichtigen Reaktion.

#### Lokale Wahrnehmung

Gesicht, Blick und Pupillendynamik werden im Browser verarbeitet.

#### Gap-aware interpretation

Das System reagiert auf Abweichungen zwischen sichtbaren und abgeleiteten Signalen.

#### Adaptive Musik

Die ermittelte Situation steuert Auswahl und Generierung einer musikalischen Antwort.

## Übertragbarkeit

### Wo dieses Prinzip anschlussfähig ist.

Der Case zeigt, wie sensible Signale lokal verarbeitet und in eine zurückhaltende, erklärbare Reaktion übersetzt werden können.

#### Adaptive Interfaces

Digitale Produkte können ihre Dichte oder Unterstützung an Nutzungssignale anpassen.

#### Wellbeing

Reflexions- und Entspannungsangebote können kontextbezogener reagieren, ohne Rohdaten zentral zu speichern.

#### Privacy by design

Sensible Modelle können gezielt auf dem Gerät statt in der Cloud laufen.

## Wert und Erkenntnis

- **Value:** Das Projekt untersucht personalisierte Interaktion, ohne biometrische Rohdaten an einen Server zu übertragen.
- **Learning:** Multimodale Signale sind aussagekräftiger als ein einzelner Klassifikator – erfordern aber klare Sicherheitslogik und eine bescheidene Interpretation.

## Fakten

- **kombinierte Signalschichten:** 3
- **Verarbeitung biometrischer Daten:** LOCAL
- **aktiver Experimentstatus:** BETA

## Technologie

React, TypeScript, MediaPipe, WebEyeTrack, LibreFace ONNX, Tone.js, Mureka API, Supabase

## English summary

**Question:** Can a digital system respond to felt emotion rather than only displayed emotion?

MELODEYE combines facial expression, gaze and pupil dynamics directly in the browser. The gap between visible and experienced emotion becomes the input for an adaptive musical response.

**Challenge:** Emotion is not a single measurement. A smile may signal joy, tension or social adaptation. The experiment therefore explores the gap between several signals rather than treating one classifier as truth — while raw biometric data remains on-device.

**Transfer:** Where this principle can be applied. The case shows how sensitive signals can be processed locally and translated into a cautious, explainable response.

**Value:** The project explores personalised interaction without sending raw biometric data to a server.
