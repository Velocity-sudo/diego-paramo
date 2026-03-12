# Workflow: Sorteo Mentoría $2,500 — GHL Webhook + Automatización

## Resumen
El formulario de la página `sorteo.html` envía datos via **webhook** directo a GHL. 
Esto crea/actualiza contacto + dispara una automatización que envía email de confirmación.

---

## PASO 1: Crear el Webhook en GHL

1. Ir a **Automation → Workflows** en GHL (sub-cuenta de Diego)
2. Click **"+ Create Workflow"** → **"Start from Scratch"**
3. Nombre del workflow: `Sorteo Mentoría Webinar`

### Configurar el Trigger:
1. Click en **"Add New Trigger"**
2. Seleccionar: **Inbound Webhook**
3. GHL te generará un **Webhook URL** — luce así:
   ```
   https://services.leadconnectorhq.com/hooks/XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
   ```
4. **COPIA ESE URL** — lo necesitas para el paso 2

---

## PASO 2: Pegar el Webhook URL en la Página

Una vez tengas el URL del webhook, dámelo y yo lo actualizo en el código.

O si quieres hacerlo tú, en el archivo `sorteo_mentoria.html`, busca esta línea (~línea 558):
```javascript
const webhookUrl = 'https://services.leadconnectorhq.com/hooks/REPLACE_WITH_WEBHOOK_ID';
```
Reemplaza `REPLACE_WITH_WEBHOOK_ID` con el ID real del webhook.

---

## PASO 3: Configurar las Acciones del Workflow

En el workflow de GHL, después del trigger Inbound Webhook, agregar estos pasos EN ORDEN:

### Acción 1: Create/Update Contact
- **Action:** Create or Update Contact
- **Mapping de campos** (el formulario envía estos campos JSON):
  | Campo del formulario | Campo en GHL |
  |---|---|
  | `nombre` | First Name (split) / Full Name |
  | `email` | Email |
  | `celular` | Phone |
  | `industria` | Custom Field (crear uno llamado "Industria") |
  | `motivacion` | Custom Field (crear uno llamado "Motivación Sorteo") |
  | `fuente` | Tags → valor fijo: `[Sorteo] Mentoría Webinar` |

### Acción 2: Add Tag
- **Tag:** `[Sorteo] Mentoría Webinar`

### Acción 3: Send Email (Confirmación)
- **Subject:** 🏆 ¡Estás participando por la mentoría de $2,500 USD!
- **Body:** Pegar el HTML del archivo `email_confirmacion_sorteo.html`
- **From Name:** Diego Páramo
- **From Email:** (el email configurado)

### Acción 4: Internal Notification (Slack)
- **Action:** Custom Webhook (POST)
- **URL:** Ver `slack_webhook_url` en `~/Desktop/Clientes/LuchoBranding/config/clients_config.json`
- **Body:**
```json
{
  "text": "🏆 *Nuevo registro en sorteo de mentoría*\n📧 {{contact.email}}\n👤 {{contact.name}}\n📱 {{contact.phone}}\n🏢 Industria: {{contact.industria}}\n✍️ Motivación: {{contact.motivacion_sorteo}}"
}
```

### Acción 5 (Opcional): Internal Email Notification
- **To:** lucho@salesvelocity.co (o el email de Diego)
- **Subject:** 🏆 Nuevo registro sorteo mentoría — {{contact.name}}
- **Body:**  
  Nuevo participante registrado:
  - Nombre: {{contact.name}}
  - Email: {{contact.email}}
  - Teléfono: {{contact.phone}}
  - Industria: {{contact.industria}}
  - Motivación: {{contact.motivacion_sorteo}}

---

## PASO 4: Publicar el Workflow

1. Revisar que todos los pasos estén conectados
2. Toggle **"Publish"** → ON
3. El workflow está activo

---

## PASO 5: Probar

1. Ir a la página: `https://velocity-sudo.github.io/diego-paramo/sorteo.html`
2. Llenar el formulario con datos de prueba
3. Verificar:
   - ✅ Se creó el contacto en GHL
   - ✅ Se aplicó el tag `[Sorteo] Mentoría Webinar`
   - ✅ Se envió el email de confirmación
   - ✅ Llegó notificación a Slack

---

## Campos Custom Necesarios en GHL

Antes de configurar el workflow, crear estos **Custom Fields** en GHL:

1. **Settings → Custom Fields → + Add Field**
   - `Industria` — tipo: Single Line Text
   - `Motivación Sorteo` — tipo: Multi Line Text

---

## Datos que envía el formulario (JSON)

```json
{
  "nombre": "Juan Pérez",
  "email": "juan@email.com",
  "celular": "+57 300 123 4567",
  "industria": "Tecnología / SaaS",
  "motivacion": "Quiero implementar IA en mi empresa para...",
  "fuente": "sorteo_mentoria_webinar",
  "fecha": "2026-03-12T14:30:00.000Z"
}
```
