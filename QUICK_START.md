# ⚡ Quick Start - Audio System v2.0

## 🚀 Para Desenvolvedores

### Como Usar o Player

```typescript
import { usePlayer } from "@/components/player/PlayerProvider";

export function MyComponent() {
  const player = usePlayer();

  return (
    <div>
      <h1>{player.currentTrack?.title}</h1>

      <button onClick={() => player.play()}>
        Play
      </button>

      <button onClick={() => player.pause()}>
        Pause
      </button>

      <button onClick={() => player.next()}>
        Next
      </button>

      <div style={{ width: `${player.progress * 100}%` }}>
        Progress: {player.position}ms / {player.duration}ms
      </div>

      <input
        type="range"
        min={0}
        max={100}
        value={player.volume}
        onChange={(e) => player.setVolume(Number(e.target.value))}
      />
    </div>
  );
}
```

### API Disponível

```typescript
// Estados
player.currentTrack      // Track atual (null se nenhuma)
player.isPlaying        // boolean
player.isReady          // boolean (widget pronto)
player.hasUserInteracted // boolean (primeira interação ocorreu)
player.tracks           // Array de faixas
player.volume           // 0-100
player.duration         // ms
player.position         // ms
player.progress         // 0-1 (fração)

// Métodos
player.play(url?)       // Toca (default = current)
player.pause()          // Pausa
player.toggle(url?)     // Play/Pause
player.next()           // Próxima
player.prev()           // Anterior
player.seekFraction(f)  // Pula para fração (0-1)
player.setVolume(v)     // Define volume (0-100)
```

---

## 🚫 O Que NÃO Usar Mais

```typescript
// ❌ ESTAS FUNÇÕES NÃO EXISTEM
player.fadeIn(); // TypeError
player.fadeToVolume(); // TypeError
player.loadAtVolume(); // TypeError

// ❌ ESTE COMPONENTE FOI REMOVIDO
import { ScrollSoundtrack } from "@/components/player"; // Não encontrado
```

---

## 📋 Checklist de Desenvolvimento

### Se você quer...

#### Tocar música ao clicar

```typescript
<button onClick={() => player.play()}>
  Play
</button>
```

#### Mostrar controles só se música carregou

```typescript
{player.currentTrack && (
  <PlayerControls />
)}
```

#### Detectar primeira interação

```typescript
if (player.hasUserInteracted) {
  console.log("Usuário já interagiu!");
}
```

#### Mostrar progresso da música

```typescript
<div style={{ width: `${player.progress * 100}%` }}>
  Progresso
</div>
```

#### Controlar volume

```typescript
<input
  type="range"
  value={player.volume}
  onChange={(e) => player.setVolume(Number(e.target.value))}
/>
```

#### Auto-play quando player pronto

```typescript
useEffect(() => {
  if (player.isReady && !player.hasUserInteracted) {
    // Aguarde primeira interação
    console.log("Pronto para tocar, aguardando interação");
  }
}, [player.isReady, player.hasUserInteracted]);
```

---

## 🐛 Troubleshooting

### Música não toca

```
✓ Verificar se hasUserInteracted = true
✓ Verificar se isReady = true
✓ Verificar se currentTrack existe
✓ Check console para erros
```

### Volume não muda

```
✓ Usar setVolume(value)
✓ Não usar ScrollSoundtrack
✓ Verificar se widget está pronto
```

### Player dessincronizado

```
✓ Hard refresh (Ctrl+Shift+R)
✓ Limpar cache do navegador
✓ Testar em outro navegador
```

### Múltiplas instâncias

```
✓ Garantir só 1 PlayerProvider na app
✓ Usar usePlayer() apenas em filhos do Provider
```

---

## 🔧 Debugging

### Log do Estado Atual

```typescript
const player = usePlayer();

useEffect(() => {
  console.log({
    currentTrack: player.currentTrack?.title,
    isPlaying: player.isPlaying,
    isReady: player.isReady,
    hasUserInteracted: player.hasUserInteracted,
    volume: player.volume,
    progress: `${(player.progress * 100).toFixed(2)}%`,
    time: `${Math.floor(player.position / 1000)}s / ${Math.floor(player.duration / 1000)}s`,
  });
}, [player]);
```

### Verificar Widget SoundCloud

```typescript
// No console do navegador
window.SC?.Widget; // Deve existir
// ou
console.log(window.SC?.Widget);
```

---

## 📚 Documentação Completa

- **AUDIO_BEHAVIOR.md** - Especificação completa
- **TECHNICAL_DOCUMENTATION.md** - Detalhes técnicos
- **TESTING_CHECKLIST.md** - Testes
- **CODE_COMPARISON.md** - Antes vs Depois

---

## 🎬 Exemplo Completo

```typescript
import { usePlayer } from "@/components/player/PlayerProvider";
import { useEffect, useState } from "react";

export function AudioPlayer() {
  const player = usePlayer();
  const [timeDisplay, setTimeDisplay] = useState("0:00 / 0:00");

  // Atualizar display de tempo
  useEffect(() => {
    const current = Math.floor(player.position / 1000);
    const total = Math.floor(player.duration / 1000);
    const currentMin = Math.floor(current / 60);
    const currentSec = current % 60;
    const totalMin = Math.floor(total / 60);
    const totalSec = total % 60;
    setTimeDisplay(
      `${currentMin}:${String(currentSec).padStart(2, "0")} / ${totalMin}:${String(totalSec).padStart(2, "0")}`
    );
  }, [player.position, player.duration]);

  if (!player.currentTrack) return null;

  return (
    <div className="player">
      <img src={player.currentTrack.cover} alt="" />

      <div>
        <h3>{player.currentTrack.title}</h3>
        <p>{timeDisplay}</p>
      </div>

      <div>
        <button onClick={() => player.prev()}>Anterior</button>
        <button onClick={() => player.toggle()}>
          {player.isPlaying ? "Pausar" : "Tocar"}
        </button>
        <button onClick={() => player.next()}>Próxima</button>
      </div>

      <input
        type="range"
        min={0}
        max={100}
        value={player.volume}
        onChange={(e) => player.setVolume(Number(e.target.value))}
      />

      <div style={{ width: `${player.progress * 100}%`, height: "4px", backgroundColor: "#f00" }} />
    </div>
  );
}
```

---

## ✅ Ready?

- ✓ Build compilando
- ✓ API simples
- ✓ Documentação completa
- ✓ Exemplos disponíveis
- ✓ Pronto para usar

**Comece agora!** 🚀
