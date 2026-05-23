# 🎵 FEEL HIGH - Audio Behavior Guide

## 🎧 Sistema de Reprodução de Áudio Refatorado

### Versão 2.0 - Cinematográfica & Estável

---

## ✨ Comportamento Esperado

### 1️⃣ **Ao Entrar no Site**

```
Estado: SILÊNCIO INICIAL
- ❌ Música NÃO toca automaticamente
- ❌ Player NÃO inicia
- ✅ Interface visual ativa (animations, layouts)
- ✅ Audio engine pronto, apenas pausado
- ✅ Volume em 75% (pronto para usar)
```

### 2️⃣ **Primeira Interação do Usuário** (Scroll / Click / Tap)

```
Trigger: wheel event || click event || touchstart event
Ação: Reprodução começa UMA VEZ

Extra:
- Fade-in suave ate 75% em ~3-4s

NUNCA:
- ❌ Reinicia no scroll
- ❌ Altera volume automaticamente
- ❌ Pausa e toca novamente
```

### 3️⃣ **Reprodução Normal**

```
Estado: REPRODUZINDO
- ✅ Música toca continuamente
- ✅ Volume mantém valor (75% default)
- ✅ Player inferior sincronizado
- ✅ Scroll não afeta áudio
- ✅ Apenas UI/Visual afetados pelo scroll
```

---

## 🏗️ Arquitetura

### PlayerProvider (Nova Versão)

```typescript
// Estados Globais
- currentIndex: número da faixa atual
- isPlaying: boolean
- hasUserInteracted: boolean ← NEW!
- volume: 0-100
- position/duration: posição do áudio
- isReady: widget SoundCloud pronto

// Métodos Disponíveis
- play(url?)
- pause()
- toggle(url?)
- next()
- prev()
- seekFraction(f)
- setVolume(v)

// ❌ REMOVIDO (Depreciado)
- fadeIn()
- fadeToVolume()
- loadAtVolume()
```

### ScrollSoundtrack

```typescript
// ❌ COMPLETAMENTE REMOVIDO
export function ScrollSoundtrack() {
  return null;
}
```

**Razão:** Causava:

- Auto-play indesejado
- Volume alterando com scroll
- Conflitos entre players

---

## 🎯 Fluxo de Eventos

```
┌─────────────────────────────┐
│  USUÁRIO ACESSA SITE        │
└──────────────┬──────────────┘
               ↓
┌─────────────────────────────┐
│  PlayerProvider Inicializa  │
│  - Load track               │
│  - Player paused            │
│  - hasUserInteracted = false│
└──────────────┬──────────────┘
               ↓
┌─────────────────────────────┐
│  AGUARDA PRIMEIRA INTERAÇÃO │
│  (wheel/click/touchstart)   │
└──────────────┬──────────────┘
               ↓
┌─────────────────────────────┐
│  PLAYBACK ATIVA             │
│  - hasUserInteracted = true │
│  - widget.play()            │
│  - Remove event listeners   │
└──────────────┬──────────────┘
               ↓
┌─────────────────────────────┐
│  REPRODUÇÃO CONTÍNUA        │
│  - Scroll = SÓ VISUAL       │
│  - Volume = Manual apenas   │
│  - Player sincronizado      │
└─────────────────────────────┘
```

---

## 🎛️ GlobalPlayer (UI Inferior)

### Sempre Sincronizado

- ✅ Play/Pause state
- ✅ Progress bar
- ✅ Artwork
- ✅ Volume control
- ✅ Next/Prev buttons
- ✅ Waveform animation

### Never:

- ❌ Múltiplos renders desnecessários
- ❌ Dessincronia com áudio
- ❌ Delays no feedback visual

---

## 🔄 Scroll Effects (APENAS VISUAL)

✅ **O Scroll Afeta:**

- Parallax das imagens
- Animações de seções
- Opacity/fade efeitos
- Positioning

❌ **O Scroll NÃO Afeta:**

- Volume de áudio
- Play/Pause state
- Progresso da faixa
- Qual música toca

---

## 📱 Experiência Por Dispositivo

### Desktop

- Scroll roda com `wheel` event
- Playback inicia ao first scroll
- Volume via slider no player
- Qualidade premium

### Mobile/Tablet

- Playback inicia ao `touchstart` ou `click`
- Volume via slider ou botões
- Responsivo e rápido
- Mesmo comportamento que desktop

---

## 🚀 Teste o Novo Sistema

```bash
# Build
npm run build

# Dev mode
npm run dev

# Ações a testar:
✅ Entrar no site → nenhum som
✅ Fazer scroll → música inicia
✅ Fazer scroll mais → volume NÃO muda
✅ Clicar pause → pausa
✅ Clicar next → próxima faixa
✅ Player inferior sincronizado
```

---

## 🧩 Exemplo Pronto (HTML + JS)

Use este exemplo quando precisar de um audio de fundo que inicia no primeiro scroll, com fade-in suave e fallback amigavel caso o autoplay seja bloqueado.

### HTML

```html
<audio id="bg-audio" preload="auto" loop>
  <source src="/assets/audio/musica.mp3" type="audio/mpeg" />
  <source src="/assets/audio/musica.ogg" type="audio/ogg" />
  Seu navegador nao suporta audio HTML5.
</audio>

<button id="enable-audio" type="button" hidden>Ativar som</button>
```

### JavaScript

```js
const audio = document.getElementById("bg-audio");
const enableButton = document.getElementById("enable-audio");

const MAX_VOLUME = 0.75;
const FADE_DURATION_MS = 3500; // ~3.5s
const STEP_MS = 50;
const STEP_VOLUME = MAX_VOLUME / (FADE_DURATION_MS / STEP_MS);
const SCROLL_THRESHOLD_PX = 80;

let started = false;

function fadeInAudio() {
  const interval = setInterval(() => {
    const next = Math.min(audio.volume + STEP_VOLUME, MAX_VOLUME);
    audio.volume = next;

    if (next >= MAX_VOLUME) {
      clearInterval(interval);
    }
  }, STEP_MS);
}

function startAudioWithFade() {
  if (started) return;
  started = true;

  audio.volume = 0;

  const playPromise = audio.play();

  if (playPromise && typeof playPromise.then === "function") {
    playPromise
      .then(() => {
        enableButton.hidden = true;
        fadeInAudio();
      })
      .catch(() => {
        // Autoplay bloqueado: exibe botao para o usuario iniciar.
        enableButton.hidden = false;
        started = false;
      });
  } else {
    fadeInAudio();
  }
}

function onFirstScroll() {
  if (window.scrollY < SCROLL_THRESHOLD_PX) return;
  startAudioWithFade();
  window.removeEventListener("scroll", onFirstScroll);
}

function onEnableButtonClick() {
  startAudioWithFade();
}

window.addEventListener("scroll", onFirstScroll, { passive: true });
enableButton.addEventListener("click", onEnableButtonClick);
```

---

## 📊 Comparação: Antes vs Depois

| Aspecto            | ❌ Antes          | ✅ Depois       |
| ------------------ | ----------------- | --------------- |
| Auto-play          | Sim (bug)         | Não             |
| Primeira Interação | Scroll automático | Controlado      |
| Volume no Scroll   | Aumentava (bug)   | Não afeta       |
| Conflitos Player   | Sim (2 players)   | Não (1 player)  |
| Sincronização      | Dessinc.          | Perfeita        |
| Experiência        | Buggy             | Cinematográfica |
| Status             | Instável          | Estável         |

---

## 🎬 Sensação Final

Comportamento similar a:

- 🎵 **Apple Music** → Silêncio inicial, ativa com interação
- 🎶 **Spotify** → Interface pronta, música sob demanda
- 🎧 **Cercle** → Premium, sincronizado, cinematográfico

O site "desperta musicalmente" após a primeira ação do usuário.

---

## 🔧 Troubleshooting

**Problema:** Música não inicia com scroll

- Solução: Verificar se `hasUserInteracted` está sendo setado

**Problema:** Volume alterando sozinho

- Solução: Confirmado removido, não deve acontecer

**Problema:** Player dessincronizado

- Solução: Limpar cache, verificar SoundCloud API

---

**Versão:** 2.0  
**Data:** 2026-05-23  
**Status:** ✅ Estável e Pronto para Produção
