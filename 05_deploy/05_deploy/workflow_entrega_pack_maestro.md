# Workflow GHL — Entrega Automática Pack Maestro de Asistentes Ejecutivos de IA
## Diego Páramo · Entendiendo AI

---

## 📋 Resumen del Workflow

| Campo | Valor |
|---|---|
| **Nombre del Workflow** | [Entrega] Pack Maestro - Post Pago |
| **Trigger** | Payment Received |
| **Producto** | Pack Maestro de Asistentes Ejecutivos de IA |
| **Resultado** | Tag + Email de entrega + Pipeline update |

---

## 🔧 Paso a paso para crear en GHL

### 1. Crear el Workflow

1. Ir a **Automation → Workflows → Create Workflow**
2. Nombre: `[Entrega] Pack Maestro - Post Pago`
3. Seleccionar **Start from Scratch**

---

### 2. Configurar el Trigger

- **Trigger Type:** `Payment Received`
- **Filters:**
  - Product Name → `equals` → `Pack Maestro de Asistentes Ejecutivos de IA`

> ⚠️ Si "Payment Received" no aparece como trigger, usar **"Invoice"** o **"Order Form Submission"** y filtrar por el producto.

---

### 3. Acción 1 — Agregar Tag

- **Action:** `Add Contact Tag`
- **Tag:** `[Purchase] Pack Maestro IA`

> Este tag permite segmentar a todos los compradores del pack para futuras campañas.

---

### 4. Acción 2 — Enviar Email de Entrega

- **Action:** `Send Email`
- **Subject:** `🚀 ¡Tu Pack Maestro está listo, {{contact.first_name}}!`
- **From Name:** `Diego Páramo`
- **From Email:** (el email configurado en la location)
- **Body:** Usar el HTML del archivo `02_funnel_ghl/email_entrega_pack_maestro.html`
  - Copiar TODO el contenido HTML del archivo
  - En GHL, al crear el email, cambiar a vista **"Code"** o **"HTML"**
  - Pegar el HTML completo

> 📌 El email contiene el CTA que redirige a: `https://entendiendo.ai/packdeasistentesejecutivos`

---

### 5. Acción 3 — Agregar a Pipeline (Opcional)

- **Action:** `Create/Update Opportunity`
- **Pipeline:** (crear o usar pipeline existente de ventas digitales)
- **Stage:** `Compra Completada`
- **Opportunity Name:** `Pack Maestro IA - {{contact.full_name}}`
- **Opportunity Value:** `20`

---

### 6. Acción 4 — Notificación Interna (Opcional)

- **Action:** `Internal Notification`
- **Type:** Email o In-App
- **Notify:** Diego Páramo
- **Message:** `🎉 Nueva venta! {{contact.full_name}} compró Pack Maestro IA — $20 USD`

---

### 7. Acción 5 — Wait + Follow-up (Opcional)

- **Action:** `Wait` → 3 días
- **Action:** `Send Email` 
- **Subject:** `¿Ya probaste tus prompts, {{contact.first_name}}?`
- **Body:** Email de seguimiento preguntando si ya descargó el PDF y vio el video, con link de acceso nuevamente.

---

## 📧 Configurar Redirección en el Payment Link

Después de crear el workflow, actualizar el Payment Link en GHL:

1. Ir a **Payments → Payment Links** → editar el link del Pack Maestro
2. Activar **"Habilitar redirección a URL Personalizada"**
3. URL: `https://entendiendo.ai/packdeasistentesejecutivos`
4. Guardar

> Esto hace que inmediatamente después de pagar, el cliente ve la página de entrega Y recibe el email de confirmación.

---

## 🏷️ Tags Utilizados

| Tag | Propósito |
|---|---|
| `[Purchase] Pack Maestro IA` | Identifica compradores del pack |
| `[Webinar] Asistió` | (si viene del webinar — agregar manualmente o con otro workflow) |

---

## ✅ Checklist Final

- [ ] Workflow creado y activado en GHL
- [ ] Trigger configurado con filtro de producto correcto
- [ ] Tag `[Purchase] Pack Maestro IA` creado
- [ ] Email HTML copiado y pegado en el paso de envío
- [ ] Payment Link actualizado con URL de redirección
- [ ] Test de compra realizado para verificar flujo completo

---

*Creado por Sales Velocity · Marzo 2026*
