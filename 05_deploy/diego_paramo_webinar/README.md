# 📹 Landing Page - Webinar Diego Páramo
## "Crea Tu Asistente de IA en 90 Minutos"

Landing page de alta conversión para registro de webinar EN VIVO.
Diseño: Dark Tech/Professional | Mobile-First | Countdown Timer Funcional

---

## 📦 ARCHIVOS INCLUIDOS

- `index.html` - Estructura HTML5 completa
- `styles.css` - Estilos dark tech/professional con glassmorphism
- `script.js` - Countdown timer + tracking + funcionalidades
- `README.md` - Esta guía de implementación

---

## 🚀 GUÍA DE IMPLEMENTACIÓN PASO A PASO

### Paso 1: Configurar Countdown Timer ⏰

1. Abrir `script.js`
2. Buscar línea 7: `const webinarDate = new Date("Feb 15, 2026 19:00:00 GMT-0500").getTime();`
3. Cambiar a la fecha/hora exacta de tu webinar
   - Formato: `"Mes DD, YYYY HH:MM:SS GMT-XXXX"`
   - Ejemplo: `"Mar 20, 2026 20:00:00 GMT-0500"`
4. Guardar archivo

**Zona horaria:** GMT-0500 es para Colombia/Perú/Ecuador. Ajusta según tu ubicación.

---

### Paso 2: Configurar Google Analytics 📊

1. Abrir `index.html`
2. Buscar (Ctrl+F / Cmd+F): `G-XXXXXXXXXX`
3. Reemplazar **AMBAS apariciones** con tu Google Analytics ID
   - Ejemplo: `G-ABC123XYZ`
4. Guardar archivo

**¿No tienes GA?** Crea una cuenta gratis en [analytics.google.com](https://analytics.google.com)

---

### Paso 3: Configurar Facebook Pixel 📈

1. Abrir `index.html`
2. Buscar: `123456789012345`
3. Reemplazar **AMBAS apariciones** con tu Facebook Pixel ID
   - Ejemplo: `987654321098765`
4. Guardar archivo

**¿No tienes Pixel?** Crea uno en Facebook Business Manager > Eventos > Pixels

---

### Paso 4: Subir Video de Registro 🎥

1. Subir tu video VSL a **Vimeo** o **YouTube**
2. Obtener URL de embed:
   - **Vimeo:** Click en "Share" > "Embed" > copiar URL dentro de `src="..."`
   - **YouTube:** Click en "Share" > "Embed" > copiar URL dentro de `src="..."`
3. Abrir `index.html`
4. Buscar: `[VIDEO_EMBED_URL]`
5. Reemplazar con la URL completa de embed
6. Guardar archivo

**Ejemplo Vimeo:** `https://player.vimeo.com/video/123456789`
**Ejemplo YouTube:** `https://www.youtube.com/embed/abcd1234`

---

### Paso 5: Configurar Plazas Disponibles 🎫

1. Abrir `script.js`
2. Buscar línea 10: `const totalSpots = 50;`
   - Cambiar `50` por el número total deseado
3. Buscar línea 13: `let spotsRegistered = 0;`
   - Actualizar manualmente según registros reales
   - **IMPORTANTE:** Debes actualizar esto manualmente cada vez que alguien se registre
4. Guardar archivo

**Automatización:** Para actualizar automáticamente, integra con tu sistema de registro (Calendly, Typeform, etc.) via Zapier/Make.

---

### Paso 6: Agregar Foto de Diego 📸

1. Subir foto profesional de Diego a una carpeta de imágenes
2. Formatos aceptados: JPG, PNG, WebP (recomendado para mejor performance)
3. Abrir `index.html`
4. Buscar: `[DIEGO_PHOTO_URL]`
5. Reemplazar con la ruta de la imagen
   - Si está en misma carpeta: `diego-paramo.jpg`
   - Si está en subcarpeta: `images/diego-paramo.jpg`
   - Si está en URL externa: `https://tudominio.com/images/diego.jpg`
6. Guardar archivo

**Optimización:** Usa imagen de máximo 300x300px para mejor carga.

---

### Paso 7: Configurar CTA (Botón de Registro) 🔥

Los botones de CTA actualmente tienen `href="#"` (no hacen nada al hacer click).

**Opciones de configuración:**

#### Opción A: Redirigir a Calendly
1. Abrir `index.html`
2. Buscar: `<a href="#" class="cta-button"`
3. Cambiar `href="#"` por `href="https://calendly.com/tu-usuario/webinar"`
4. Guardar archivo

#### Opción B: Redirigir a Formulario (Google Forms, Typeform)
1. Crear formulario de registro
2. Copiar URL pública del formulario
3. En `index.html`, cambiar `href="#"` por la URL del formulario
4. Guardar archivo

#### Opción C: Abrir Modal Popup (Requiere código adicional)
Contacta a un desarrollador para implementar modal inline.

---

### Paso 8: Probar Localmente 💻

1. Abrir `index.html` en tu navegador
   - **Mac/Linux:** Doble click en el archivo
   - **Windows:** Click derecho > "Abrir con" > Chrome/Edge
2. Verificar:
   - ✅ Countdown timer funciona correctamente
   - ✅ Video carga (si ya configuraste URL)
   - ✅ Plazas restantes se muestran correctamente
   - ✅ FAQ se abre/cierra al hacer click
   - ✅ Sticky CTA aparece al hacer scroll (en mobile)
3. Probar en móvil:
   - Abrir Chrome DevTools (F12)
   - Click en icono de teléfono (Toggle Device Toolbar)
   - Seleccionar "iPhone 12 Pro" o "Pixel 5"

---

### Paso 9: Subir a Hosting / Plataforma 🌐

#### Opción A: GoHighLevel
1. Ir a Sites > Custom Code
2. Crear nueva página
3. Copiar TODO el contenido de `index.html`
4. Pegar en el editor de código
5. Subir `styles.css` y `script.js` como archivos externos
6. Publicar

#### Opción B: Netlify (GRATIS - Recomendado)
1. Crear cuenta en [netlify.com](https://netlify.com)
2. Arrastra la carpeta completa a Netlify Drop
3. ¡Listo! Te da URL automática

#### Opción C: WordPress
1. Instalar plugin "Insert HTML Snippet"
2. Crear snippet con el código de `index.html`
3. Insertar snippet en página nueva
4. Subir CSS/JS via Media Library

#### Opción D: Webflow
1. Importar HTML via Custom Code block
2. Configurar CSS en Page Settings
3. Publicar

---

### Paso 10: Testing Pre-Launch ✅

Antes de enviar tráfico, verifica:

- [ ] Video carga correctamente (no da error)
- [ ] Countdown timer muestra fecha correcta del webinar
- [ ] Plazas restantes se muestran en todos los lugares (hero, scarcity, sticky CTA)
- [ ] CTA buttons redirigen correctamente (Calendly/Forms)
- [ ] Google Analytics captura eventos correctamente
  - Usar **Google Tag Assistant** (extensión de Chrome)
- [ ] Facebook Pixel funciona
  - Usar **Meta Pixel Helper** (extensión de Chrome)
- [ ] Responsive funciona en iPhone y Android real (no solo DevTools)
- [ ] Todos los textos están en español (sin lorem ipsum)
- [ ] Foto de Diego carga correctamente

---

## 🎨 PERSONALIZACIÓN (OPCIONAL)

### Cambiar Colores

Abrir `styles.css` y modificar líneas 5-9:

```css
--color-bg: #0A1128;           /* Fondo oscuro */
--color-accent-cyan: #00D4FF;  /* Color principal (cyan) */
--color-accent-blue: #1E90FF;  /* Color secundario (blue) */
```

### Cambiar Fuente

1. Ir a [Google Fonts](https://fonts.google.com)
2. Elegir fuente (ej: "Roboto", "Outfit", "Montserrat")
3. Copiar el link de embed
4. Reemplazar en `index.html` línea 28
5. Actualizar variable en `styles.css` línea 20

---

## 📱 COMPATIBILIDAD

✅ **Mobile:** iOS Safari, Chrome Android
✅ **Desktop:** Chrome, Firefox, Safari, Edge
✅ **No requiere librerías externas** (vanilla JS)
✅ **Sin jQuery, Bootstrap, React, etc.**

---

## 🐛 TROUBLESHOOTING

### El countdown no funciona
- Verifica que la fecha en `script.js` esté en formato correcto
- Abre la consola del navegador (F12) y busca errores en rojo

### El video no carga
- Verifica que la URL de embed sea correcta
- Prueba pegando la URL directamente en el navegador
- Asegúrate de usar URL de **embed**, no la URL normal

### Los CTAs no redirigen
- Verifica que cambiaste `href="#"` por la URL correcta
- Asegúrate de que la URL de Calendly/Forms es pública

### Google Analytics no trackea
- Verifica que reemplazaste **AMBAS** apariciones de `G-XXXXXXXXXX`
- Instala Google Tag Assistant para verificar
- Espera 24-48h para que aparezcan datos en GA

### La sticky CTA no aparece en mobile
- La sticky CTA solo aparece después de scrollear 500px
- Verifica en DevTools en modo mobile (iPhone/Android)

---

## 📊 MÉTRICAS A MONITOREAR

Una vez en producción, monitorea en Google Analytics:

1. **Page Views** - Cuántas personas vieron la página
2. **Video Views** - Cuántos vieron el video
3. **Scroll Depth** - Qué tan abajo scrollean (25%, 50%, 75%, 100%)
4. **CTA Clicks** - Cuántos hicieron click en "Reservar Plaza"
5. **FAQ Clicks** - Qué preguntas abren más

---

## 🔄 ACTUALIZACIONES FUTURAS

Para agregar testimonials, social proof, o nuevas secciones:

1. Edita `index.html` agregando el HTML correspondiente
2. Agrega estilos en `styles.css` (al final del archivo)
3. Si requiere JavaScript, agrégalo en `script.js`

---

## 💡 TIPS DE OPTIMIZACIÓN

1. **Usa WebP para imágenes** - 30% más ligeras que JPG
2. **Minifica CSS/JS antes de producción** - Usar [CSS Minifier](https://cssminifier.com)
3. **Lazy load de video** - El iframe ya tiene lazy loading incluido
4. **Test en dispositivos reales** - No solo en DevTools

---

## 📞 SOPORTE

Si tienes dudas técnicas:

1. Revisa esta guía completa
2. Busca el error en Google (99% de errores ya están resueltos en StackOverflow)
3. Usa ChatGPT/Claude para debugging

---

## ✅ CHECKLIST FINAL PRE-LANZAMIENTO

- [ ] Countdown configurado con fecha correcta
- [ ] Google Analytics ID configurado
- [ ] Facebook Pixel configurado
- [ ] Video VSL subido y URL de embed configurada
- [ ] Foto de Diego agregada
- [ ] Plazas totales configuradas (default: 50)
- [ ] CTA redirige a Calendly/Forms correctamente
- [ ] Probado en Chrome mobile (iPhone y Android)
- [ ] Probado en desktop (Chrome, Safari, Firefox)
- [ ] Analytics funcionando (Google Tag Assistant verde)
- [ ] Pixel funcionando (Meta Pixel Helper verde)
- [ ] Sin errores en consola del navegador (F12)
- [ ] Todos los textos revisados (sin typos)
- [ ] Sticky CTA aparece al scrollear en mobile

---

**¡Listo para generar leads! 🚀**

Última actualización: 10 de Febrero, 2026
