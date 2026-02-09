# Guía: Cómo Obtener los Datos de Conexión de MySQL

## 📋 Información Necesaria

Para conectar tu aplicación a MySQL necesitas estos datos:
1. **Host** (servidor): generalmente `localhost` o `127.0.0.1`
2. **Puerto**: generalmente `3306`
3. **Usuario**: nombre de usuario de MySQL
4. **Contraseña**: contraseña del usuario
5. **Nombre de la Base de Datos**: el esquema/base de datos que usarás

---

## 🔍 Paso 1: Obtener Host y Puerto desde MySQL Workbench

### Opción A: Desde Server Status
1. En MySQL Workbench, en el panel izquierdo (Navigator), expande **MANAGEMENT**
2. Haz clic en **Server Status**
3. Busca información como:
   - **Host**: generalmente aparece como `localhost` o `127.0.0.1`
   - **Port**: generalmente `3306`

### Opción B: Desde la Barra de Título
- En la parte superior de MySQL Workbench verás algo como: `Local instance MySQL80`
- Esto indica que estás conectado a una instancia local
- El puerto por defecto de MySQL es `3306`

---

## 👤 Paso 2: Obtener Usuario y Contraseña

### Si ya tienes un usuario:
1. En el panel Navigator, expande **MANAGEMENT**
2. Haz clic en **Users and Privileges**
3. Verás una lista de usuarios
4. Haz clic en el usuario que quieres usar (generalmente `root` o uno que hayas creado)
5. En la pestaña **Account Limits** o **Schema Privileges** verás el nombre de usuario
6. **Nota**: MySQL Workbench NO muestra contraseñas por seguridad. Si no la recuerdas, tendrás que cambiarla o usar la que configuraste al instalar MySQL

### Si necesitas crear un nuevo usuario:
1. En **Users and Privileges**, haz clic en el botón **Add Account** (o el símbolo `+`)
2. Completa:
   - **Login Name**: nombre del usuario (ej: `portal_cid_user`)
   - **Password**: contraseña (guárdala bien)
   - **Confirm Password**: confirma la contraseña
3. En la pestaña **Schema Privileges**, selecciona la base de datos y dale permisos:
   - Selecciona tu base de datos
   - Haz clic en **Select "All"** o marca los privilegios necesarios (SELECT, INSERT, UPDATE, DELETE, CREATE, DROP, etc.)
4. Haz clic en **Apply**

---

## 🗄️ Paso 3: Obtener/Crear el Nombre de la Base de Datos

### Si ya existe una base de datos:
1. En el panel Navigator, busca la sección **SCHEMAS** (puede estar en la parte inferior del panel izquierdo)
2. Verás una lista de bases de datos/esquemas
3. Anota el nombre de la que quieres usar

### Si necesitas crear una nueva base de datos:
1. En el panel Navigator, haz clic derecho en un espacio vacío dentro de **SCHEMAS**
2. Selecciona **Create Schema...**
3. Ingresa un nombre (ej: `portal_cid`)
4. Selecciona el **Charset** (recomendado: `utf8mb4`)
5. Selecciona el **Collation** (recomendado: `utf8mb4_unicode_ci`)
6. Haz clic en **Apply**

---

## 📝 Paso 4: Formato de DATABASE_URL

El formato de la URL de conexión es:
```
mysql://usuario:contraseña@host:puerto/nombre_base_datos
```

### Ejemplos:

**Conexión local con usuario root:**
```
DATABASE_URL=mysql://root:mi_password123@localhost:3306/portal_cid
```

**Conexión local con usuario personalizado:**
```
DATABASE_URL=mysql://portal_user:password123@127.0.0.1:3306/portal_cid
```

**Conexión remota:**
```
DATABASE_URL=mysql://usuario:contraseña@192.168.1.100:3306/portal_cid
```

---

## ⚙️ Paso 5: Crear el Archivo .env

1. En la raíz de tu proyecto, crea un archivo llamado `.env` (sin extensión)
2. Copia el contenido de `.env.example`
3. Reemplaza los valores con tus datos reales:

```env
DATABASE_URL=mysql://TU_USUARIO:TU_CONTRASEÑA@localhost:3306/TU_BASE_DATOS
JWT_SECRET=una_clave_secreta_muy_larga_y_aleatoria_aqui
VITE_APP_ID=portal-cid
```

### ⚠️ IMPORTANTE:
- **NUNCA** subas el archivo `.env` a Git (ya está en `.gitignore`)
- Usa contraseñas seguras
- En producción, usa variables de entorno del servidor, no archivos `.env`

---

## 🧪 Paso 6: Probar la Conexión

1. Asegúrate de que MySQL esté corriendo
2. Ejecuta las migraciones:
   ```bash
   pnpm db:push
   ```
3. Si hay errores, verifica:
   - Que MySQL esté corriendo
   - Que el usuario tenga permisos
   - Que la base de datos exista
   - Que la URL esté correctamente formateada

---

## 🔧 Solución de Problemas Comunes

### Error: "Access denied for user"
- Verifica que el usuario y contraseña sean correctos
- Verifica que el usuario tenga permisos en la base de datos

### Error: "Unknown database"
- Verifica que la base de datos exista
- Crea la base de datos si no existe

### Error: "Can't connect to MySQL server"
- Verifica que MySQL esté corriendo
- Verifica que el host y puerto sean correctos
- Si es remoto, verifica el firewall

### Error: "Connection timeout"
- Verifica que MySQL esté accesible desde tu máquina
- Verifica la configuración de red/firewall

---

## 📚 Recursos Adicionales

- [Documentación de Drizzle ORM](https://orm.drizzle.team/docs/overview)
- [Documentación de MySQL](https://dev.mysql.com/doc/)
