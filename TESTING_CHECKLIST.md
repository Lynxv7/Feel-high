# 🧪 Checklist de Testes - Audio System Refactor

## ✅ Testes Funcionais

### 1. Inicialização

- [ ] Entrar no site → nenhum som
- [ ] Player inferior NÃO aparece até primeira interação
- [ ] Volume padrão está em 80%
- [ ] Interface carrega normalmente

### 2. Primeira Interação

- [ ] Scroll do mouse → reprodução começa
- [ ] Click na página → reprodução começa
- [ ] Tap no mobile → reprodução começa
- [ ] Event listeners removidos após primeira interação

### 3. Reprodução

- [ ] Música toca continuamente sem reiniciar
- [ ] GlobalPlayer aparece com faixa
- [ ] Play/Pause sincronizado
- [ ] Waveform anima corretamente
- [ ] Timer de posição correto

### 4. Scroll (NÃO deve afetar áudio)

- [ ] Scroll não pausa/retoma
- [ ] Scroll não altera volume
- [ ] Scroll NÃO reinicia faixa
- [ ] Visual (parallax/animations) funciona normalmente

### 5. Controles Manuais

- [ ] Play button → toca
- [ ] Pause button → pausa
- [ ] Next button → próxima faixa
- [ ] Prev button → faixa anterior
- [ ] Seek bar → pula para posição

### 6. Volume

- [ ] Slider volume 0 → som mudo
- [ ] Slider volume 100 → volume máximo
- [ ] Slider volume 50 → volume médio
- [ ] Volume mantém mesmo durante scroll

### 7. Mudança de Faixa

- [ ] Next → carrega próxima faixa
- [ ] Prev → carrega faixa anterior
- [ ] Click em track → toca essa track
- [ ] Fim da faixa → carrega próxima automaticamente

### 8. Player Inferior (GlobalPlayer)

- [ ] Artwork correto da faixa
- [ ] Título e artista corretos
- [ ] Tempo decorrido atualiza
- [ ] Progress bar avança com música
- [ ] Botões responsivos

### 9. Responsividade

- [ ] Desktop: controles visíveis
- [ ] Tablet: layout adaptado
- [ ] Mobile: funciona com touch
- [ ] Muito grande: escalável

### 10. Casos Extremos

- [ ] Volume 0 → sem som mas player funciona
- [ ] Fim da playlist → para ou recicla
- [ ] Mudança rápida de faixas → sem crash
- [ ] Fechar/reabrir → estado correto

## 🚨 Regressão (Não Deve Acontecer)

- [ ] ❌ Auto-play ao carregar
- [ ] ❌ Volume aumentando com scroll
- [ ] ❌ Player inicializando tocando
- [ ] ❌ Conflitos entre 2 players
- [ ] ❌ Dessincronização UI/áudio

## 📱 Testes por Dispositivo

### Desktop (Windows/Mac/Linux)

- [ ] Chrome: OK
- [ ] Firefox: OK
- [ ] Safari: OK
- [ ] Edge: OK

### Mobile (iOS/Android)

- [ ] Chrome Mobile: OK
- [ ] Safari Mobile: OK
- [ ] Landscape mode: OK
- [ ] Portrait mode: OK

### Tablet

- [ ] iPad: OK
- [ ] Android tablet: OK
- [ ] Orientação: OK

## 🔊 Testes de Áudio (Audio Context)

- [ ] SoundCloud API carrega
- [ ] Widget se inicializa
- [ ] Audio pode ser ouvido (com volume > 0)
- [ ] Sem console errors
- [ ] Sem warnings

## 📊 Performance

- [ ] Build não aumentou em tamanho
- [ ] Dev mode rápido
- [ ] Sem memory leaks
- [ ] Sem eventos listeners duplicados

## 🎬 UX/Experiência

- [ ] Sensação premium
- [ ] Cinematográfica
- [ ] Responsiva
- [ ] Intuitiva

## ✨ Instruções de Teste Manual

```bash
# 1. Build
npm run build

# 2. Dev mode
npm run dev

# 3. Abrir localhost:5173

# 4. Teste:
- Espere 2 segundos → sem som ✓
- Faça scroll → música toca ✓
- Teste controles do player ✓
- Teste volume ✓
- Teste scroll sem afetar audio ✓
```

## 📋 Checklist Final

- [ ] Todos os testes funcionais passam
- [ ] Nenhuma regressão
- [ ] Todos os dispositivos OK
- [ ] Build sem erros
- [ ] Performance boa
- [ ] UX premium

---

**Assinado:** Audio System v2.0  
**Data de Teste:** 2026-05-23
