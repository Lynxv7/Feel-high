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
- ✅ Volume em 80% (pronto para usar)
```

### 2️⃣ **Primeira Interação do Usuário** (Scroll / Click / Tap)

```
Trigger: wheel event || click event || touchstart event
Ação: Reprodução começa UMA VEZ

NUNCA:
- ❌ Reinicia no scroll
- ❌ Altera volume automaticamente
- ❌ Pausa e toca novamente
```

### 3️⃣ **Reprodução Normal**

```
Estado: REPRODUZINDO
- ✅ Música toca continuamente
- ✅ Volume mantém valor (80% default)
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
