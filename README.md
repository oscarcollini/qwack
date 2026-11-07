# QWACK 0.1.1 — PWA

App autonoma e offline. Repository separato da playFAIR.

## Pubblicazione con GitHub Pages

1. Crea un nuovo repository chiamato `qwack`.
2. Copia **il contenuto** di questa cartella nella radice del repository, senza includere la cartella esterna `QWACK_PWA_0.1.1`.
3. In Settings → Pages scegli Deploy from a branch, branch `main`, cartella `/ (root)`.
4. Apri `https://<utente>.github.io/qwack/` in Chrome e installa dal menu del browser.

`manifest.webmanifest` identifica l'app come `/qwack/` e il service worker opera soltanto nella cartella `/qwack/`. Non sovrascrivere i file di playFAIR.

La versione HTML locale non è installabile come PWA: per l'installazione serve un sito HTTPS (come GitHub Pages).
