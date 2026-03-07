

## Plan: Hero-Typografie bereinigen

### Änderungen in `src/pages/Index.tsx`:

1. **Zeile 104:** `<BindruneLogo size={48} onDark={true} showRed={false} />` entfernen
2. **Zeilen 134-146:** Kompletten blauen Kanal-Block entfernen
3. **Zeile 123:** Rot-Offset von `left-[-2px]` auf `left-[-1px]` ändern
4. **Zeilen 127, 153:** `letterSpacing` von `"-4px"` auf `"5px"` ändern (alle verbleibenden Layer: Red Channel + Main Channel)

Keine weiteren Dateien betroffen. BindruneLogo-Import bleibt, da es im ProfileSection weiterhin verwendet wird.

